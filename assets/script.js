$( function() {
    $( "#sortable1, #sortable2" ).sortable({
      connectWith: ".connectedSortable",
      containment: ".sortable-containment"
    }).disableSelection();
  } );

  $( function() {
    $( "#sortable3, #sortable4" ).sortable({
      connectWith: ".connectedSortable",
      containment: ".sortable-containment"
    }).disableSelection();
  } );