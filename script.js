var page = 1;
var html = ''
$(document).ready(function() {
    $('#tastybg').css('height', $(document).height() * 0.75 + 'px');
    APIcall(page);
    page = 2
    APIcall(page);
    page = 3;
});
$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() >= $(document).height() - 50) {
      APIcall(page);
      page+=1;
    }
});
function APIcall(pagenumber) {
  $.ajax({
    url: "http://www.buzzfeed.com/api/v2/feeds/tasty?p=" + pagenumber + "&jsonp=callback",
    dataType: 'JSONP',
    jsonpCallback: 'callback',
    type: 'GET',
    success: function (data) {
        addData(data['buzzes']);
    },
    error: function(request,status,errorThrown) {
        console.log("Status: " + status);
        console.log("Error: " + errorThrown);
        console.log(request);
   }
});
}
function addData(data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i]['country_code'] != 'en-us') {
      continue;
    }
    var img = data[i]['images']['dblwide'];
    var desc = data[i]['description'];
    var title = data[i]['uri'].split('-').join(' ').replace(/\b\w/g, l => l.toUpperCase());
    var url = "https://www.buzzfeed.com/" + data[i]['username'] + "/" + data[i]['uri'];
    html = '<div onclick = \"window.location = \'' + url + '\'\"class = \"clickable-image xs-border block-grid__item\"><img class = \"xs-col-12 xs-block\" src =' + img + '><div class =\".xs-pt2 .xs-text-left\"><h3 class = \"bold\">'+ title +'</h3><h5>'+ desc +'</h5><div>';
    $("#infinite-scroll").append(html);
  }
  //reset html
}
