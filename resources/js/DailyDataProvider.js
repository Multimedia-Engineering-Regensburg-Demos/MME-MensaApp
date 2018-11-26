/* eslint-env browser */
var Daily = Daily || {};

Daily.DataProvider = function() {
  "use strict";

  const BASE_MENU_URL =
    "https://regensburger-forscher.de:9001/mensa/uni/{{day}}";

  var that = new EventTarget();

  return that;
};