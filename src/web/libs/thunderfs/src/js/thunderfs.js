/* js/tunderfs.js */
require(["jquery"], function ($) { // jquery load first

  require(["thunderfs.progress"], function (progress) { // thunderfs modules

    var uploadFilesHandler = function (event) {
      event.stopPropagation(); // Stop stuff happening
      event.preventDefault(); // Totally stop stuff happening

      // START A LOADING SPINNER HERE

	    var form = new FormData();
	    var files = event.target.files;

	    $.each(files, function(key, value) {
		    form.append('file', value);
	    });

      progress.init("#progress");

      $.ajax({
        xhr: function() {
          var xhr = new window.XMLHttpRequest();
          var progressEventListener = function(evt) {
              if (evt.lengthComputable) {
                  var percentComplete = evt.loaded / evt.total;
                  progress.set((percentComplete * 100).toFixed(1));
              }
          };

          xhr.upload.addEventListener("progress", progressEventListener, false);
          xhr.addEventListener("progress",progressEventListener, false);

           return xhr;
        },
        url: "/put",
        type: "POST",
        data: form,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        beforeSend: function(){
            progress.set(0);
        },
        success: function(data, textStatus, jqXHR) {
	        if(typeof data.error === "undefined") {
		        // Success so call function to process the form
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
    }

    $("#fileupload").bind("change", uploadFilesHandler);
    /*$("#fileupload").bind("change", function(evt) {
      var files = evt.target.files;
      var file = files[0];
      console.log(file.name);
    });*/
  });
});
