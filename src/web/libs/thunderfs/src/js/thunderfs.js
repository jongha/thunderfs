/* js/tunderfs.js */
require(["jquery"], function ($) { // jquery load first

    require(["thunderfs.list", "thunderfs.upload", "thunderfs.dragdrop"], function (list, upload, dragdrop) { // thunderfs modules

        var options = { putURL: "/put", getURL: "/get", type: "POST", dataType: "json" };
        
        list.init("#filelist", ".progress-clone", options);

        var _uploadCallback = function(filelist, data) {
            filelist.complete(data);
        };

        upload.init("#fileupload", list, options, _uploadCallback);

        dragdrop.init("#filelist", upload);
    });
});
