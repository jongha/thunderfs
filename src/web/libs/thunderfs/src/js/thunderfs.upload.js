/* js/tunderfs.upload.js */
define(["jquery"], function ($) {
    var _list = null,
        _options = null
        _callback = null;

    var uploadFiles = function (file) {
	    var form = new FormData();
        
        /*
	    $.each(files, function(key, value) {
		    form.append("file", value);
	    });
        */
        
        // append to list and get progressbar.
        var filelist = null;
        if(_list) {
            filelist = _list.append(file);
        }
        
        form.append("file", file);

        $.ajax({
            xhr: function() {
                var xhr = new window.XMLHttpRequest();
                var _progressEventListener = function(event) {

                    if (event.lengthComputable) {
                        _list.progress(filelist, event.loaded, event.total);
                    }
                };

                xhr.upload.addEventListener("progress", _progressEventListener, false);
                xhr.addEventListener("progress",_progressEventListener, false);

                return xhr;
            },
            url: _options.putURL || "/put",
            type: _options.type || "POST",
            data: form,
            cache: false,
            contentType: false,
            processData: false,
            dataType: _options.dataType || "json",
            beforeSend: function() {
                _list.progress(filelist, 0, 0);
            },
            success: function(data, textStatus, jqXHR) {
                if(typeof data.error === "undefined") {
                    if(_callback) { // callback function
                        _callback(filelist, data);
                    }

                    console.log("SUCCESS: " + data.success);
                }else {
                    // Handle errors here
                    console.log("ERRORS: " + data.error);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // Handle errors here
                console.log("ERRORS: " + textStatus);
            },
            complete: function() {
                // STOP LOADING SPINNER
            }
        });
    };

    var _uploadFilesHandler = function(event) {
        event.stopPropagation(); // Stop stuff happening
        event.preventDefault(); // Totally stop stuff happening

        var i = 0;
        for(i=0; i<event.target.files.length; ++i) {
            uploadFiles(event.target.files[i]);
        }
        
        $(this).val("");
    }

    function init(selector, list, options, callback) {
        _list = list;
        _options = options;
        _callback = callback;

        $(selector).bind("change", _uploadFilesHandler);
    };

    return {
        init: init,
        uploadFiles: uploadFiles
    };

});
