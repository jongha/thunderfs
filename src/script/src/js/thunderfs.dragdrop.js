/* js/tunderfs.dragdrop.js */
define(['jquery'], function ($) {

  function init(selector, upload) {
    $(selector)
      .bind('dragenter', function(event) {
        $(this).addClass('active');

        event.stopPropagation();
        event.preventDefault();
      })
      .bind('dragleave', function(event) {
        $(this).removeClass('active');

        event.stopPropagation();
        event.preventDefault();
      })
      .bind('dragover', function(event) {
        $(this).addClass('active');

        event.stopPropagation();
        event.preventDefault();
      })
      .bind('drop', function(event) {
        $(this).removeClass('active');

        event.stopPropagation();
        event.preventDefault();

        var dataTransfer = null;
        if(event.dataTransfer) {
          dataTransfer = event.dataTransfer;
        }else if(event.originalEvent.dataTransfer) {
          dataTransfer = event.originalEvent.dataTransfer;
        }

        if(dataTransfer) {
          var i = 0;
          for(i=0; i<dataTransfer.files.length; ++i) {
            upload.uploadFiles(dataTransfer.files[i]);
          }
        }
      });
  }

  return {
    init: init
  };
});
