/* js/tunderfs.js */
require(["jquery"], function ($) { // jquery load first

  require(["thunderfs.cookie"], function (cookie) { // thunderfs modules
    console.log(cookie.get());
    
  });
});
