$(function() {
  var x;
  var mydata=data;

    
    $( "#autocomplete-4" ).autocomplete({
        autoFocus: true,
        select: function( event, ui ) {
          x = ui.item.value;
          document.getElementById("iii").innerHTML = x.toString();
          $('#myModal').modal('show');
        },
        source: function(request, response) {
        var results = $.ui.autocomplete.filter(mydata, request.term);

        response(results.slice(0, 10));
    }
	});
});