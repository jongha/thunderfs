/* js/tunderfs.list.js */
define(["jquery"], function ($) {
    var _list = null;
    var active = false;

    function init(selector) {
        _list = $(selector);
    };

    function append(file) {
        if(_list) {
            var progress = $("<div></div>").addClass("progress");
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

            var item = $("<li></li>")
                .append($("<span></span>").addClass("filename").html(file.name))
                .append(progress);
                
            _list.append(item);
            
            progressbar.complete = function(data) {
                var file = data.files[0];
                item.find(".filename")
                    .html("<a href=\"/get/" + file.id + "\" target=\"_blank\">" + file.filename + "</a>");
            };
            return progressbar;
        }

        return null;
    };

    function progress(progressbar, percentage) {
        if(_list && progressbar) {
            var text = percentage + "%";
            progressbar.attr({ "aria-valuenow": percentage }).css({ "width": text }).html(text);
            if(!active) {
                progressbar.addClass("active").
                active = true;
            }

            console.log(percentage);

            if(percentage >= 100) {
                active = false;
                progressbar.removeClass("active");
            }
        }
    };

    return {
        init: init,
        append: append,
        progress: progress
    };
});