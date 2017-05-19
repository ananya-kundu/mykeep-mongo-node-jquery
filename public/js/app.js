if (typeof window.location.origin === "undefined") {
  window.location.origin = window.location.protocol + "//" + window.location.host;
}

var utils = {
  renderPageTemplate: function(templateId, data) {
    var newData = data || {};
    var templateScript = $(templateId).html();
    var template = Handlebars.compile(templateScript);
    $("#page-container").empty();
    $("#page-container").append(template(newData));
  },
  pageNotFoundError: function() {
    var data = {
      errorMessage: "404 - Page Not Found"
    };
    this.renderPageTemplate("#error-page-template", data);
  },
  fetch: function(url, data) {
    var newData = data || {};
    return $.ajax({
      context: this,
      url: window.location.origin + "/" + url,
      data: newData,
      method: "GET",
      dataType: "JSON"
    });
  }
};

var router = {

  routes: {},
  init: function() {

    this.bindEvents();
    $(window).trigger("hashchange");
  },
  bindEvents: function() {
    $(window).on("hashchange", this.render.bind(this));
  },
  render: function() {

    var keyName = window.location.hash.split("/")[0];
    var url = window.location.hash;

    $("#page-container")
      .find(".active")
      .hide()
      .removeClass("active");

    if (this.routes[keyName]) {
      this.routes[keyName](url);

    } else {
      utils.pageNotFoundError();
    }
  }
};

var spaRoutes = {
  "#home": function(url) {
    console.log('home was called...');
    utils.renderPageTemplate("#home-page-template");
  },
  "#login": function(url) {
    console.log('login was called...');
    utils.renderPageTemplate("#login-page-template");
  },
  "#signup": function(url) {
    console.log('signin was called...');
    utils.renderPageTemplate("#signin-page-template");
  }
};
var spaRouter = $.extend({}, router, {
  routes: spaRoutes
});
spaRouter.init();
