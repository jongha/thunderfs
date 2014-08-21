/* js/tunderfs.dragdrop.js */
define(["jquery"], function ($) {

    function init(selector, upload) {
        $(selector)
            .bind("dragenter", function(event) {
                console.log("dragenter");
                
                $(this).addClass("active");
                event.stopPropagation();
                event.preventDefault();
            })
            .bind("dragleave", function(event) {
                console.log("dragleave");
            
                $(this).removeClass("active");
                event.stopPropagation();
                event.preventDefault();
            })
            .bind("dragover", function(event) {
                console.log("dragleave");
                event.stopPropagation();
                event.preventDefault();
            })
            .bind("drop", function(e) {
            
                event.stopPropagation();
                event.preventDefault();
                
                console.log("drop");
                
                var i = 0;
                for(i=0; i<event.dataTransfer.files.length; ++i) {
                    console.log(event.dataTransfer.files[i]);
                    
                    upload.uploadFiles(event.dataTransfer.files[i]);
                }
            });
    };

    return {
        init: init
    };
});