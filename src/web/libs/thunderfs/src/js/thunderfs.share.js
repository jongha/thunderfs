/* js/tunderfs.share.js */
define(["jquery", "kakao", "thunderfs.capability", "zeroclipboard"], function ($, kakao, capability, ZeroClipboard) {
    var _options = null;
    var _html = null;
    var __link = null;

    var _init = {};
    function clickHandler() {
        var type = $(this).data("type");
        var url = $(this).data("url");
        var filename = $(this).data("filename");

        switch(type) {
            case "copy":
                break;

            case "link":
                if(_html) { _html.hide(); }
                if(_link) { _link.show(); }
                break;

            case "html":
                if(_link) { _link.hide(); }
                if(_html) { _html.show(); }
                break;

            case "email":
                location.href = "mailto:" +
                    "?subject=" + _options.resources.SEND_MAIL_SUBJECT.format(filename, url) +
                    "&body=" + _options.resources.SEND_MAIL_BODY.format(filename, url);

                break;

            case "kakaotalk":
                // https://developers.kakao.com/docs/js-reference
                if(!!!_init.kakao) {
                    _init.kakao = true;
                    Kakao.init(_options.kakaoAPI);
                }
                Kakao.Link.sendTalkLink({
                    label: url
                });
                break;
        }
    };

    function init(options) {
        _options = $.extend({}, options);
    };

    function get(filename, url) {
        _link = $("<textarea />")
            .attr({ "rows": 2, "wrap": "off" })
            .val(url)
            .hide();

        _html = $("<textarea />")
            .attr({ "rows": 3, "wrap": "off" })
            .val("<a href=\"" + url + "\" target=\"_blank\">" + filename + "</a>")
            .hide();

        var copy = null;
        if(!capability.mobile()) {
            copy = $("<button></button>")
                .attr({ "type": "button" })
                .addClass("btn btn-xs btn-danger")
                .append($("<i></i>").addClass("fa fa-clipboard"))
                .append(" " + _options.resources.COPY_LINK)
                .data({ "type": "copy", "url": url, "filename": filename })
                .bind("click", clickHandler);
        };

        var pane = $("<div></div>")
            .append(_link)
            .append(_html)
            .append(copy)
            .append(
                $("<button></button>")
                    .attr({ "type": "button" })
                    .addClass("btn btn-xs btn-danger")
                    .append($("<i></i>").addClass("fa fa-link"))
                    .append(" " + _options.resources.SEND_LINK)
                    .data({ "type": "link", "url": url, "filename": filename })
                    .bind("click", clickHandler)
            )
            .append(
                $("<button></button>")
                    .attr({ "type": "button" })
                    .addClass("btn btn-xs btn-primary")
                    .append($("<i></i>").addClass("fa fa-code"))
                    .append(" " + _options.resources.SEND_HTML)
                    .data({ "type": "html", "url": url, "filename": filename })
                    .bind("click", clickHandler)
            )
            .append(
                $("<button></button>")
                    .attr({ "type": "button" })
                    .addClass("btn btn-xs btn-primary")
                    .append($("<i></i>").addClass("fa fa-envelope-o"))
                    .append(" " + _options.resources.SEND_MAIL)
                    .data({ "type": "email", "url": url, "filename": filename })
                    .bind("click", clickHandler)
            );

        if(capability.mobile()) {
            pane.append(
                $("<button></button>")
                    .attr({ "type": "button" })
                    .addClass("btn btn-xs btn-warning")
                    .append($("<i></i>").addClass("fa fa-share-alt"))
                    .append(" " + _options.resources.SEND_KAKAOTALK)
                    .data({ "type": "kakaotalk", "url": url, "filename": filename })
                    .bind("click", clickHandler)
            );
        }

        if(!!copy) {
            var clipboard = new ZeroClipboard(copy[0]);
            clipboard.setText(url);
        }
        return pane;
    };

    return {
        init: init,
        get: get
    };
});
