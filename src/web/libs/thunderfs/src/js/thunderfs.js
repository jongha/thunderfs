/* js/tunderfs.js */
require(["jquery"], function ($) { // jquery load first

  require(["thunderfs.cookie"], function (cookie) { // thunderfs modules
  
    $("#fileupload").bind("change", function(evt) {
      var files = evt.target.files;
      var file = files[0];
      console.log(file.name);
    });
    
  });
});
