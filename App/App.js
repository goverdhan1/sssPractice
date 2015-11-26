$(document).ready(function () {
    var myTable=null;
    var selectedRow=[];
    var personInfo=[];

    var createTable=function(personInfo){
        myTable = $('#table-javascript').bootstrapTable({
                    data: personInfo,
                    cache: false,
                    height: 400,
                    striped: true,
                    pagination: true,
                    pageSize: 50,
                    pageList: [10, 25, 50, 100, 200],
                    search: true,
                    showColumns: true,
                    showRefresh: true,
                    minimumCountColumns: 2,
                    clickToSelect: true,
                    singleSelect:true,
                    columns: [{
                        field: 'identity',
                        title: 'id',
                        checkbox: true

                }, {
                        field: 'name',
                        title: 'Name',
                        align: 'right',
                        valign: 'bottom',
                        sortable: true
                }, {
                        field: 'phone',
                        title: 'Phone',
                        align: 'center',
                        valign: 'middle',
                        sortable: true
                }, {
                        field: 'email',
                        title: 'email',
                        align: 'left',
                        valign: 'top',
                        sortable: true
                }]
                });
    };

    $('#table-javascript').on('click-row.bs.table', function (e, row, $el) {

        selectedRow=row;
        alert(selectedRow)
        console.log(selectedRow);
    });


    var loadJosnData = function () {
        $.ajax({
            url: "/components",
            type: "get",
            dataType: "json",
            success: function (result) {
                personInfo=result;
                createTable(personInfo);
                console.log(JSON.stringify(result));
            },
            error: function () {
                alert("error");
            }
        });
    };

loadJosnData();

$("#addbtn").on("click", function(){

var addRecord = $('#myModal').modal('show');

});

$("#editbtn").on("click", function(){

var addRecord = $('#editModal').modal('show');
$("#editForm #id").val(selectedRow.id);
$("#editForm #name").val(selectedRow.name);
$("#editForm #email").val(selectedRow.email);
$("#editForm #phone").val(selectedRow.phone);

});

$("#deletebtn").on("click", function(){

var addRecord = $('#deleteModal').modal('show');
$("#editForm #id").val(selectedRow.id);


});

$("#submitbtn").on("click", function(e){
    //alert("hi");
    $("#myform").validate();
    if($("#myform").valid()){
        var formData = {name:$("#name").val(),phone:$("#phone").val(), email:$("#email").val()};
        console.log(JSON.stringify(formData));
       $.ajax({
            url: "/components",
            data:formData, 
            type: "put",
            dataType: "json",
            success: function (result) {
            console.log(result)
            myTable.append(result);
            $('#myModal').modal('hide');

            },
           error:function(){
           
           } 
       });
    }
});


$("#editSubmitBtn").on("click", function(e){
    $("#editForm").validate();
    if($("#editForm").valid()){
        var formData = {
            "id":$("#editForm #id").val(), 
            "name":$("#editForm #name").val(), 
            "phone":$("#editForm #phone").val(), 
            "email":$("#editForm #email").val()
        };
            console.log(JSON.stringify(formData));
    
       $.ajax({
            url: "/components",
            data:JSON.stringify(formData), 
            type: "post",
            dataType: "json",
            success: function (result) {
            console.log(result)
            myTable.append(result);
            $('#editModal').modal('hide');
                console.log(JSON.stringify(formData));

            },
           error:function(){
           
           } 
       });
    }
});
$("#confirmDeleteBtn").on("click", function(e){
    // $("#editForm").validate();
    // if($("#editForm").valid()){
    //     var formData = {
    //         "id":$("#editForm #id").val(), 
    //         "name":$("#editForm #name").val(), 
    //         "phone":$("#editForm #phone").val(), 
    //         "email":$("#editForm #email").val()
    //     };
    //         console.log(JSON.stringify(formData));


    
       $.ajax({
            url: "/components",
            data:{"id":selectedRow.id}, 
            type: "delete",
            dataType: "json",
            success: function (result) {
            console.log(result)
            myTable.append(result);
            $('#deleteModal').modal('hide');
                //console.log(JSON.stringify(formData));
            },
           error:function(){
           
           }

       });
   })

});