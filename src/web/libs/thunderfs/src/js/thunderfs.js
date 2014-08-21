/* js/tunderfs.js */
require(["jquery"], function ($) { // jquery load first

    require(["thunderfs.list", "thunderfs.upload", "thunderfs.dragdrop"], function (list, upload, dragdrop) { // thunderfs modules

        list.init("#filelist");

        var options = { url: "/put", type: "POST", dataType: "json" };
        var _uploadCallback = function(filelist, data) {
            filelist.complete(data);
        };

        upload.init("#fileupload", list, options, _uploadCallback);

        dragdrop.init("body", upload);
    });
});
