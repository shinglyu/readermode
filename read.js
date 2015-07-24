var token = "YOUR_READABILITY_ACCESS_TOKEN";
if (navigator.mozSetMessageHandler) {
  navigator.mozSetMessageHandler('activity', function onActivity(activity) {
    var data = activity.source.data;
    var oReq = new XMLHttpRequest({mozSystem: true});

    var parseUrl = "https://readability.com/api/content/v1/parser" + "?url=" + data.url + "&token=" + token;

    oReq.onreadystatechange = function(){
      if (oReq.readyState==4 && oReq.status==200)
        {
          var res = JSON.parse(oReq.responseText)
          var content = "<h3>" + res.title + "</h3>"
                        + "<small>By " + (res.author === null ? "Unknown Author": res.author) + ", " + res.domain + "<small>"
                        + res.content;
          document.getElementById('article_content').innerHTML = content;
          //document.write(res.content)
        }
    } 
    /*oReq.onload = function(e) {
      alert(oReq.response);
      }
      */
    oReq.open("GET", parseUrl, true);
    oReq.send();
  });
}
