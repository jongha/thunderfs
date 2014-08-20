/* js/tunderfs.cookie.js */
define(["jquery"], function ($) {
    var progress = null;
    var active = false;
    
    function init(selector) {
        progress = $(selector);
    };

    function set(percentage) {
        var text = percentage + "%";
        progress.attr({ "aria-valuenow": percentage }).css({ "width": text }).html(text);
        if(!active) {
            progress.addClass("active").
            active = true;
        }
        
        console.log(percentage);
        
        if(percentage >= 100) {
            active = false;
            progress.removeClass("active");
        }
    };

    return {
        init: init,
        set: set
    };
});