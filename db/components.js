'use strict';

var path = require('path');
var fs = require('fs');
var dbfile = path.join('./db/dashboard.db');

var sqlite3 = require('sqlite3').verbose();


function safeId(id) {
  return String(Number(id));
}

function rowToComponent(row) {
  var component = {};
  component.name = row.name;
  component.id = String(row.id);
  component.email = row.email;
  component.endpoint = row.endpoint;
  component.phone = row.phone;  
  return component;
}

exports.queryDb = function(callback) {
  var db = new sqlite3.Database(dbfile);
  db.serialize(function() {
      db.run("CREATE TABLE IF NOT EXISTS Components (name TEXT, email TEXT, endpoint TEXT, phone TEXT)");
      
      //USE ONLY POST API's to create components - Below are sample queries

      /*db.run("INSERT INTO Components(name, email, endpoint) VALUES ('GetSubjectRelationships','ranjithnair@northwesternmutual.com','http://ws41test.nml.com:80/RelationshipServer/GetSubjectRelationshipsV2')");
      db.run("INSERT INTO Components(name, email, endpoint) VALUES ('FAS','ranjithnair@northwesternmutual.com', '9885514982', http://ws41test.nml.com/cltccvsws/FinancialAssetsSummaryServiceV8')");
      db.run("INSERT INTO Components(name, email, endpoint) VALUES ('ProdSummary','ranjithnair@northwesternmutual.com', '9885514982','http://ws41test.nml.com/cltccvsws/CCVProdSummaryServiceV10')");
      db.run("INSERT INTO Components(name, email, endpoint) VALUES ('Report Service','ranjithnair@northwesternmutual.com', '9885514982', 'http://ws41test.nml.com/cltccvsws/CCVReportServiceV7')");*/
      callback(db);
  });
};

exports.queryRows = function(sql, callback) {
  exports.queryDb(function(db) {
    db.all(sql, function(err, rows) {
      callback(err, rows);
      db.close();
    });
  });
};



exports.getComponents = function(callback) {
  exports.queryRows(
    'SELECT rowid AS id, name, email, endpoint, phone FROM Components',
    function(err, rows) {
      if (err) {
        callback(err);
      } else {
        callback(null, rows.map(rowToComponent));
      }
    }
  );
};

exports.getComponent = function(id, callback) {
  id = safeId(id);
  exports.queryRows(
    'SELECT rowid AS id, name, email, endpoint, phone FROM Components WHERE id = ' + id,
    function(err, rows) {
      var row = rows[0];
      if (err) {
        callback(err);
      } else if (!row) {
        callback(new Error('Component not found'));
      } else {
        callback(null, rowToComponent(row));
      }
    }
  );
};
exports.addComponent = function(dataUri, callback) {
  exports.queryDb(function(db) {
    var stmt = db.prepare('INSERT INTO Components VALUES (?,?,?,?)');
    stmt.run(dataUri.name,dataUri.email,dataUri.endpoint,dataUri.phone);
    stmt.finalize();
    db.each('SELECT last_insert_rowid() as id', function(err, row) {
      if (err) {
        callback(err);
      } else {
        exports.getComponent(row['id'], callback);
      }
    });
  });
};



exports.updateComponent = function(dataUri, callback) {
  exports.queryDb(function(db) {
    var stmt = db.prepare('UPDATE Components SET name=' + dataUri.name + 'email=' + dataUri.email + 'endpoint=' +dataUri.endpoint+ 'phone=' +dataUri.phone);
    stmt.finalize();
    exports.getComponent(dataUri.id, callback);
  });
};

exports.deleteComponent = function(id, callback) {
  id = safeId(id);
  exports.queryDb(function(db) {
    var stmt = db.prepare('DELETE FROM Components WHERE id =' + id);
    stmt.finalize();
  });
};

