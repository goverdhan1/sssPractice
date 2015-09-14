$(document).ready(function () {
    var loadJosnData = function () {
        $.ajax({
            url: "js/service/sample.json",
            type: "get",
            dataType: "json",
            success: function (result) {

                console.log(result);
                console.log(JSON.stringify(result));

                var myTable = $('#table-javascript').bootstrapTable({
                    data: result,
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
                    columns: [{
                        field: 'id',
                        title: 'Identity',
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
                        field: 'address',
                        title: 'Address',
                        align: 'left',
                        valign: 'top',
                        sortable: true
                }]
                });
            },
            error: function () {
                alert("error");


            }
        });

    }();
    //  loadJosnData()


$("#submitbtn").on("click", function(e){
    alert("hi");
    $("#myform").validate();
    if($("#myform").valid()){
        var formData = {name:$("#name").val(),phone:$("#phone").val(), address:$("#address").val()};
        console.log(JSON.stringify(formData));
       $.ajax({
            url: "js/service/save",
            data:formData, 
            type: "post",
            dataType: "json",
            success: function (result) {},
           error:function(){
           
           }

    
  
       });
    }
});

});