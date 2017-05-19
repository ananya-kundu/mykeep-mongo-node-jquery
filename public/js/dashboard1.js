
$.ajax({
  url: "http://localhost:8081/session",
  datatype: "json",
  type: "GET",
  success: function(data) {
    if (data.session == true) {
      console.log("session..");
      loginSuccessPage();
    }
  }
});

function loginSuccessPage() {
  $.ajax({
    url: "dashboard.html",
    datatype: "text",
    type: "GET",
    success: function(res) {
      $("#body").html(res);

      readmsgcards();
      // console.log("success");
    }
  });
}
// });
// $(function($) {
//         $.fn.editableContent = function() {
//             return this.html().replace("<div>", "<br>");
//         };
//     });
var readmsgcards = function() {
  $.ajax({
    url: "http://localhost:8081/pinup",
    datatype: "json",
    type: "GET",
    success: function(data) {
      console.log("rddhhf", data);
      console.log(data.message);
      // console.log(data.status);
      if (data.status == true) {
        $('#notes').html('');

        for (var i = data.message.length - 1; i >= 0; i--) {
          console.log("hi");
          title1 = "title1" + i;
          content = "content" + i;
          console.log(title1);

          cardsid = data.message[i]._id;
          // console.log(cardsid);
          // console.log(localStorage.getItem("type"));

          if (localStorage.getItem("type") == "grid_view") {
            console.log("grid view");
            var delup = "<div class='footer'><div class='deletebutton'><a onclick = deletecards('" + cardsid + "')>delete</a></div><div class='updatebutton'><a >update</a></div></div>";

            var div = $("<div class='note' data-toggle='modal' data-target='#myModal' onclick=popupCards('" + cardsid + "')><div class='note-inner' ><div class='title' id=" + title1 + "></div><div id='content'><div class='insidecontent' id=" + content + "></div></div>" + delup + "</div>").appendTo('#notes');
            var border = div.css('word-wrap', 'break-word').css('width', '300').css('border-shadow', '2px 2px 2px #888888');
            // $("#close").attr("onclick","updatecard('"+cardsid+"')");
            $("#" + content).append(data.message[i].content);
            $("#" + title1).append(data.message[i].title1);
            var pckry = new Packery('#notes', {
              itemSelector: '.note',
              gutter: 20
            });

            pckry.getItemElements().forEach(function(itemElem) {
              var draggie = new Draggabilly(itemElem);
              pckry.bindDraggabillyEvents(draggie);
            });
          } else {
            var delup = "<div class='footer'><div class='deletebutton'><a onclick = deletecards('" + cardsid + "')>delete</a></div><div class='updatebutton'><a >update</a></div></div>";

            console.log("i am in else list view");
            var div = $("<div class= 'note' data-toggle='modal' data-target='#myModal' onclick=popupCards('" + cardsid + "')><div class='note-inner' ><div class='title' id=" + title1 + "></div><div id='content'><div class='insidecontent' id=" + content + "></div></div>" + delup + "</div>").appendTo('#notes');
            var border = div.css('word-wrap', 'break-word').css('width', '400').css('width', '75%');;
            // $("#close").attr("onclick","updatecard('"+cardsid+"')");
            console.log("list view.............");
            $("#" + content).append(data.message[i].content);
            $("#" + title1).append(data.message[i].title1);

          }

        }
        console.log("data is there");
      } else {
        console.log("data is not there");
      }
    }
  });
}

$(document).on("click", "#listview", (function() {
  $('#listview').hide();
  $('#gridview').show();
  localStorage.setItem("type", "list_view");

  console.log('lsdlsdlsdv');
  readmsgcards();
}));
$(document).on('click', "#gridview", (function() {
  $("#listview").show();
  $("#gridview").hide();
  $('#list_cards').hide();
  localStorage.setItem("type", "grid_view");
  readmsgcards();
  // console.log("lsdvllsvnbd");
}));




var savemsgcards = function(data) {
  $.ajax({
    type: "POST",
    dataType: "json",
    data: data,
    url: "http://localhost:8081/createcards",
    success: function(data) {
      console.log("data", data);
      if (data.status == true) {
        readmsgcards();
      } else {

      }
    },
    error: function(error) {

    }
  });
}

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

// $(document).ready(function() {
$(document).on("click", "#done", function() {
  var title1 = $("#title1").html(); //html() takes value for div from user
  var content = $("#content").html();
  // console.log("hhhhhhhhhhhhhhhh", title1);
  // console.log("fnnnnnnnnnnn", content);
  var data = {
    title1: title1,
    content: content
  };
  $("#title1").html('');
  $("#content").html('');
  if (title1 == "" && content == "") {
    console.log("dfbb");
    return;
  } else {
    savemsgcards(data);
  }

});

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

function deletecards(cardsid) {
  //  $(document).on("click", ".deletebutton", function() {
  $.ajax({
    url: "http://localhost:8081/deletemsgcard/" + cardsid + "",
    //  datatype: "json",
    type: "DELETE",
    success: function(data) {
      console.log(data.status);
      if (data.status == true) {
        //  deletemsgcards();
        readmsgcards();
      }
    }
  });
  //  });
}

function popupCards(cardsid) {

  $.ajax({
    url: "http://localhost:8081/popupcard/" + cardsid + "",
    //  datatype: "json",
    type: "POST",
    success: function(data) {
      $("#popupTitle").text('');
      $("#popupContent").html('');

      // console.log(data.status);
      if (data.status == true) {
        // console.log(data.message);
        var newTitle = data.message[0].title1;
        var newContent = data.message[0].content;
        $("#popupTitle").append(newTitle);

        $("#popupContent").append(newContent);
        $("#close").attr("onclick", "updatecard('" + data.message[0]._id + "')");
        //  deletemsgcards();
        //  readmsgcards();
      }
    }
  });

}


function updatecard(cardsid) {
  console.log('card id', cardsid);

  var updatedTitle = $("#popupTitle").html();
  var updatedContent = $("#popupContent").html();
  var updatedData = {
    title1: updatedTitle,
    content: updatedContent
  }

  // console.log("updated data", updatedData);
  $.ajax({
    url: "http://localhost:8081/updatemsgcards/" + cardsid + "",

    type: "POST",
    datatype: "json",
    data: updatedData,
    success: function(data) {
      if (data.status == true) {
        // console.log("status", data);
        readmsgcards();
      }
    },
    error: function(error) {
      console.log("ERROR.....", error);
    }
  });
}


// })


// var readcards = function() {
//     $.ajax({
//         type: "GET",
//         // data: carddata,
//         dataType: "json",
//         url: "http://localhost:8081/readcard",
//         success: function(data) {
//             console.log("data", data);
//             if (data.status == true) {
//                 console.log(data.message);
//                 $('.notes').html('');
//
//                 for (var i = data.message.length - 1; i >= 0; i--) {
//                     tit = "title" + i;
//                     con = "content" + i;
//                     console.log(tit);
//
//                     // var div = $("<div class='note' id=''><div class='card-2'><div class='title' id=" + tit + "></div><div id='content'><div class='insidecontent' id="+ con +"></div></div></div>").appendTo(".notes");
//                     var div = $("<div class=' note'><div class='note-inner' ><div class='title' id=" + tit + "></div><div id='content'><div class='insidecontent' id=" + con + "></div></div></div>").appendTo('.notes');
//                     var border = div.css('word-wrap', 'break-word').css('width','228');
//                     $("#" + con).append(data.message[i].description);
//                     $("#" + tit).append(data.message[i].title);
//
//                     var pckry = new Packery('.notes', {
//                         itemSelector: '.note',
//                         gutter: 20
//                     });
//
//                     pckry.getItemElements().forEach(function(itemElem) {
//                         var draggie = new Draggabilly(itemElem);
//                         pckry.bindDraggabillyEvents(draggie);
//                     });


// $.ajax({
//   url: "http://localhost:8081/dashboardmsgbox",
//   datatype: "json",
//   type: "POST",
//   data: data,
//   //  contentType: 'application/json',
//   success: function(data) {
//     console.log(data);
//     if (data.status) {
//       // loginSuccessPage();
//       console.log("Data Saved");
//       readmsgcard();
//     } else {
//       console.log("data not saved");
//     }
//   }
// });




// noteMsg = "<h3><strong>" + data.msg[i].title1 + "</strong></h3><br>" + data.msg[i].content + "<br>";
// newDiv = $('<div  class="smallNotes col-md-3" id="oriNewDiv">' + noteMsg + '</div>');
// console.log("ggggggggggggggggg", newDiv);
// $('#note').prepend(newDiv);
