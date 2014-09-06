/* js/tunderfs.capability.js */
define([], function () {
  function mobile() {
    if((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
      return true;
    }

    return false;
  }

  function drag() {
    return !mobile();
  }

  return {
    mobile: mobile,
    drag: drag
  };
});
