$(document).ready(function() {

  // $.ajax({
  //   url: "http://localhost:8081/session",
  //   datatype: "json",
  //   type: "GET",
  //   success: function(data) {
  //     if (data.session == true) {
  //       console.log("session..");
  //       loginSuccessPage();
  //     }
  //   }
  // });
  // function loginSuccessPage() {
  //   $.ajax({
  //     url: "dashboard.html",
  //     datatype: "text",
  //     type: "GET",
  //     success: function(res) {
  //       $("#body").html(res);
  //       readmsgcards();
  //     }
  //   });
  // }
  // $(function($){
  // $.fn.editableContent = function()
  //     {
  //         return this.html().replace(/<div>/gi,'<br>').replace(/<\/div>/gi,'');
  //     };
  // });
  var User = function(userName,mobileNo,email, password) {
    this.userName = userName;
    this.mobileNo = mobileNo;
    this.email = email;
    this.password = password;
  };
  var UserLogin = function(email,password) {
    this.email = email;
    this.password = password;

  };
  // value takes by user

    $(document).on("click", "#signinBtn", function() {
      var userName = $("#userName").val();
      var mobileNo = $("#mobileNo").val();
      var email = $("#email").val();
      var password = $("#password").val();

      var userObj = new User(userName,mobileNo,email, password);
      console.log(userObj);
      $.ajax({
        url: "http://localhost:8081/signup",
        datatype: "json",
        type: "POST",
        data: JSON.stringify(userObj),
        contentType: 'application/json',
        success: function(data) {
          $('span').remove();
          $("#signinBtn").after('<br><br><span>' + data.message + '</span>');
        }
      });
    });

    $(document).on("click", "#fetchUser", function() {
      var email = $("#exampleInputEmaillog").val();
      var password = $("#loginPassword").val();
      console.log(password);

      var userNewObj = new UserLogin(email, password);

      console.log(userNewObj);
      $.ajax({
        url: "http://localhost:8081/login",
        datatype: "json",
        type: "POST",
        data: JSON.stringify(userNewObj),
        contentType: 'application/json',

        success: function(data) {
          console.log(data.message);
          if (data.status) {
            loginSuccessPage();
            console.log("login success");
          } else {
            $('span').remove();
            $("#fetchUser").after('<br><br><span>' + data.message +"Please Enter Valid Email and Password" + '</span>');
            //  welcomePage();
            console.log("login unsuccess");
          }
        }
      });



  function welcomePage() {
            $.ajax({
              url: "index.html",
              type: "GET",
              datatype: "text",
              success: function(res) {
                  console.log('the page was loaded', res);
                  $('#body').html(res);
                  console.log('the page was not loaded', res);
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
  });
});
