/* js/tunderfs.cookie.js */
define(["jquery"], function ($) {
  var i = 0;
  function increase() {
    i++;
  };

  function get() {
    return i;
  };

  return {
    increase: increase,
    get: get
  };
});