function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}

$(document).ready(function() {
  const fullUrl = window.location;
	let pathname = fullUrl.pathname;
  const tradeIdFromURL = pathname.substring(pathname.lastIndexOf('/') + 1);


    $(".remove-item").on('click', function () {
      const thisElem = $( this );
      const itemId = thisElem.val();
      console.log('item id: ', itemId );
      thisElem.closest(".item-col").remove();
      $("#complete-trade-btn").remove();
      if ($("#negotiate-trade-btn").length){
        // do nothing. it's already there
      } else {
        $("#trade-details-button-row").append('<p><a href="/negotiate/<%=trade._id%>" id="negotiate-trade-btn" class="btn btn-primary" role="button">Negotiate Trade</a></p>');
      }

      $.ajax({
        url: '/removeFromTrade',
        type: 'DELETE',
        data: {tradeId: tradeIdFromURL, itemId: itemId},
        success: function (response){
          console.log('removed item from db');
          let trade = response;
          console.log('new trade obj: ', trade);
          if (trade.items1.length === 0 && trade.items2.length === 0){
            $("#negotiate-trade-btn").remove();
          }

        },
        error: function (err){
          console.log(err);
        }
      });

      // change approve button to renegotiate.

    });
});
