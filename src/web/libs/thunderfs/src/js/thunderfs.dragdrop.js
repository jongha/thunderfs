/* js/tunderfs.dragdrop.js */
define(["jquery"], function ($) {

    function init(selector, upload) {
        $(selector)
            .bind("dragenter", function(event) {
                $(this).addClass("active");

                event.stopPropagation();
                event.preventDefault();
            })
            .bind("dragleave", function(event) {
                $(this).removeClass("active");

                event.stopPropagation();
                event.preventDefault();
            })
            .bind("dragover", function(event) {
                $(this).addClass("active");

                event.stopPropagation();
                event.preventDefault();
            })
            .bind("drop", function(event) {
                $(this).removeClass("active");

                event.stopPropagation();
                event.preventDefault();

                var i = 0;
                for(i=0; i<event.dataTransfer.files.length; ++i) {
                    console.log(event.dataTransfer.files[i]);

                    upload.uploadFiles(event.dataTransfer.files[i]);
                }
            });
    }

    return {
        init: init
    };
});
