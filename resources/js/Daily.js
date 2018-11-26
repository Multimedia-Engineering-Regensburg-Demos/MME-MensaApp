/* eslint-env browser */
var Daily = Daily || {};

Daily.App = (function() {
  "use strict";

  var that = {};

  function init() {
    console.log("in: Daily.App.init()");
  }

  that.init = init;
  return that;
}());

Daily.App.init();