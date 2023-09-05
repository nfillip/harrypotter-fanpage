//Sortable Function through jQueryUI - Fillip
$( function() {
    $( "#sortable1, #sortable2, #sortable3, #sortable4, #sortable5" ).sortable({
      connectWith: ".connectedSortable",
      containment: ".quizsection"
    }).disableSelection();
  } );

