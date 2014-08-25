/* js/tunderfs.share.js */
define(["jquery", "kakao", "thunderfs.capability", "zeroclipboard"], function ($, kakao, capability, ZeroClipboard) {
    var _options = null;
    var _textarea = null;
    var _clipboard = null;
    
    var _init = {};

    function setText(val) {
        if(_textarea) {
            _textarea.val(val);
        }
        
        if(_clipboard) {
            _clipboard.setText(val);
        }
    };
    
    function clickHandler() {
        var type = $(this).data("type");
        var url = $(this).data("url");
        var filename = $(this).data("filename");

        switch(type) {
            case "copy":
                break;

            case "html":
                setText("<a href=\"" + url + "\" target=\"_blank\">" + filename + "</a>");
                break;

            case "email":
                location.href = "mailto:?subject=10away share file&body=Filename: " + filename + "%0D%0AURL: " + url;
                break;

            case "kakaotalk":
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
        _options = options;
    };

    function get(filename, url) {
        _textarea = $("<textarea />")
            .attr({ "rows": 3, "wrap": "off" })
            .data({ "filename": filename });

        var pane = $("<div></div>").addClass("text-right")
            .append(_textarea);

        if(!capability.mobile()) {
            var clip = $("<button></button>")
                    .attr({ "type": "button" })
                    .addClass("btn btn-xs btn-link")
                    .append($("<i></i>").addClass("fa fa-clipboard"))
                    .append(" Copy")
                    .data({ "type": "copy", "url": url, "filename": filename })
                    .bind("click", clickHandler);
            
            pane.append(clip);

            _clipboard = new ZeroClipboard(clip[0]); // click to clipboard
        }

        pane.append(
                $("<button></button>")
                    .attr({ "type": "button" })
                    .addClass("btn btn-xs btn-link")
                    .append($("<i></i>").addClass("fa fa-code"))
                    .append(" HTML")
                    .data({ "type": "html", "url": url, "filename": filename })
                    .bind("click", clickHandler)
            )
            .append(
                $("<button></button>")
                    .attr({ "type": "button" })
                    .addClass("btn btn-xs btn-link")
                    .append($("<i></i>").addClass("fa fa-envelope-o"))
                    .append(" E-mail")
                    .data({ "type": "email", "url": url, "filename": filename })
                    .bind("click", clickHandler)
            );

        if(capability.mobile()) {
            pane.append(
                $("<button></button>")
                    .attr({ "type": "button" })
                    .addClass("btn btn-xs btn-link")
                    .append($("<i></i>").addClass("fa fa-share-alt"))
                    .append(" Kakao Talk")
                    .data({ "type": "kakaotalk", "url": url, "filename": filename })
                    .bind("click", clickHandler)
            );
        }

        setText(url);
        
        return pane;
    };

    return {
        init: init,
        get: get
    };
});
