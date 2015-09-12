$(document).ready(function(){

//alert("hi");
$("#myform").validate({
	
	alert("hi");
  submitHandler: function(form) {
  	if(myform.val()==null){
  		alert("Please insert the values");
  	}
    form.submit();
  }
 });


});


