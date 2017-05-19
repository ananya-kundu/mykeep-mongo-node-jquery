$(document).ready(function() {

  $.ajax({
    url: "http://localhost:8081/pinup",
    datatype: "json",
    type: "GET",
    success: function(data) {
      console.log(data);
      console.log(data.msg);
      console.log(data.status);

      if (data.status) {
        // $("#note").empty();
        // $('#note').html("");
        for (var i = 0; i < data.msg.length; i++) {
          console.log("vkkkbkbk");
          noteMsg = "<h3><strong>" + data.msg[i].title1 + "</strong></h3><br>" + data.msg[i].content + "<br>";
          newDiv = $('<div  class="smallNotes col-md-3" id="oriNewDiv">' + noteMsg + '</div>');
          console.log("ggggggggggggggggg", newDiv);
          $('#note').prepend(newDiv);

          var elem = document.querySelector('#note');
          var pckry = new Packery(elem, {
            itemSelector: '.smallNotes',
            gutter: 10
          });
          pckry.getItemElements().forEach(function(itemElem) {
            var draggie = new Draggabilly(itemElem);
            pckry.bindDraggabillyEvents(draggie);
          });

        }
        console.log("data is there");
      } else {
        console.log("data is not there");
      }
    }
  });
});

// $(document).on("click", "#gridview", function() {
//   // $("#").show();
//   $("#listview").hide();
//   $('#gridview').show();
//   localStorage.setItem("type","list_v");
//
// }



$(document).on("click", "#done", function() {
  var title1 = $("#title1").html(); //html() takes value for div from user
  var content = $("#content").html();
  console.log(title1);
  console.log(content);

  if (title1 == "" && content == "") {
    return;
  } else {
    noteMsg = "<h4>" + title1 + "</h4><br>" + content + "<br>";
    var data = {
      title1: title1,
      content: content
    };
    newDiv = $('<div class="smallNotes col-md-3" id="oriNewDiv"> ' + noteMsg + '</div>');
    $('#note').prepend(newDiv);

  }
  $.ajax({
    url: "http://localhost:8081/dashboardmsgbox",
    datatype: "json",
    type: "POST",
    data: data,
    //  contentType: 'application/json',

    success: function(data) {
      console.log(data);
      if (data.status) {
        // loginSuccessPage();
        console.log("Data Saved");
      } else {
        // $('span').remove();
        // $("#fetchUser").after('<br><br><span>' + data.message +"Please Enter Valid Email and Password" + '</span>');
        //  welcomePage();
        console.log("data not saved");
      }
    }
  });
});

function welcomePage() {
  $.ajax({
    url: "index.html",
    datatype: "text",
    type: "GET",
    success: function(res) {
      $("#body").html(res);
    }
  });
}
$(document).on("click", "#logOutId", function() {
  $.ajax({
    url: "http://localhost:8081/logout",
    datatype: "json",
    type: "GET",
    success: function(data) {
      if (data.status == false) {
        welcomePage();
      }
    }
  });
});
