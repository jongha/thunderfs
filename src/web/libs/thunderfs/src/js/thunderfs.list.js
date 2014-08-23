/* js/tunderfs.list.js */
define(["jquery", "jquery.ellipsis"], function ($, ellipsis) {
    var _list = null;
    var _progress = null;
    var _list_ul = null;
    var _options = null;
    var active = false;

    function init(selector, progress, options) {
        _list = $(selector);
        _progress = $(progress);
        
        _options = options;
        _list_ul = _list.find("ul");
    };
    
    function setFilledStatus() {
        if(_list) {
            if(_list.find("li").length === 0) {
                _list.removeClass("filled");
            }else {
                _list.addClass("filled");
            }
        }
    };
   
    function append(file) {
        if(_list) {
            if(_list_ul.length === 0) {
              _list_ul = $("<ul></ul>");
              _list.append(_list_ul);
            }

            var filedelete = $("<div></div>")
                .append($("<i></i>").addClass("fa fa-trash-o"))
                .addClass("filedelete")
                .bind("click", function() {
                    $(this).parent().parent().remove();
                    setFilledStatus();
                });
                			    
            var filename = $("<div></div>")
                .html(file.name)
                .addClass("filename");

            var fileicon = $("<div></div>")
                .append($("<i></i>").addClass("fa fa-arrow-down"))
                .append(" ")
                .addClass("fileicon");
                     
            var filelink = $("<div></div>")
                .addClass("filelink");
                
            var filesize = $("<div></div>")
                .append("size")
                .addClass("filesize");
                      
            /*var progress = $("<div></div>")
                .addClass("progress");
                
            var progressbar = $("<div></div>")
                .addClass("progress-bar progress-bar-striped")
                .attr({
                    "role": "progressbar",
                    "aria-valuenow": 0,
                    "aria-valuemin": 0,
                    "aria-valuemax": 100 })
                .css({ "width": "0%" })
                .html("0%");

            progress.append(progressbar);
            */
            
            var progress = _progress.clone().show();
            
                            
            var item = $("<li></li>")
                .append(
                    $("<div></div>")
                        .addClass("tile")
                        .append(filedelete)
                        .append(filename)
                        .append(fileicon)
                        .append(filelink)
                        .append(progress)
                        .append(filesize)
                    )
                .addClass("active col-sx-3 col-md-3");

            _list_ul.prepend(item); // add to list
            setFilledStatus();
            
            filename.ellipsis({ position: "middle" });

            var complete = function(data) {
                var file = data.files[0];
                var url = location.protocol + "//" + location.host + (_options.getURL || "/get") + "/" + file.id;
                
                filelink.html(url);
                item.removeClass("active");
            };
            return { 
                "progress": progress, 
                "filesize": filesize, 
                "complete": complete 
                };
        }

        return null;
    };

    function bytesToSize(bytes) {
       if(bytes == 0) return '0 Byte';
       var k = 1000;
       var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
       var i = Math.floor(Math.log(bytes) / Math.log(k));
       return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    }

    function progress(filelist, loaded, total) {
        if(_list && filelist) {
            var percentage = ((loaded / total) * 100).toFixed(0);
            
            filelist.progress.attr("data-progress", ((loaded / total) * 100).toFixed(0));
            
            /*            
            var text = percentage + "%";
            filelist.progressbar.attr({ "aria-valuenow": percentage }).css({ "width": text }).html(text);
            if(!active) {
                filelist.progressbar.addClass("active").
                active = true;
            }

            console.log(loaded, total);
            console.log(percentage);

            if(percentage >= 100) {
                active = false;
                filelist.progressbar.removeClass("active");
            }
            */
            
            
            filelist.filesize.html(bytesToSize(loaded) + " / " + bytesToSize(total));
        }
    };

    return {
        init: init,
        append: append,
        progress: progress
    };
});
