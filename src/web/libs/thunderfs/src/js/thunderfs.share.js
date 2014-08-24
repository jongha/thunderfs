/* js/tunderfs.share.js */
define(["jquery", "kakao"], function ($, kakao) {
    var _options = null;
    
    var _textarea = null;
    var _init = {};
    
    function _click() {
      var type = $(this).data("type");
      var url = $(this).data("url");
      var filename = $(this).data("filename");
      
      switch(type) {
          case "html":
              if(_textarea) {
                  _textarea.val("<a href=\"" + url + "\" target=\"_blank\">" + filename + "</a>")
              }
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
            .attr({ "rows": 3 })
            .data({ "filename": filename })
            .val(url);
            
        console.log(filename);
        
        var pane = $("<div></div>").addClass("text-right")
            .append(_textarea)
            .append(
                $("<button></button>")
                    .attr({ "type": "button" })
                    .addClass("btn btn-xs btn-link")
                    .append($("<i></i>").addClass("fa fa-code"))
                    .append(" HTML")
                    .data({ "type": "html", "url": url, "filename": filename })
                    .bind("click", _click)
            )
            .append(
                $("<button></button>")
                    .attr({ "type": "button" })
                    .addClass("btn btn-xs btn-link")
                    .append($("<i></i>").addClass("fa fa-envelope-o"))
                    .append(" E-mail")
                    .data({ "type": "email", "url": url, "filename": filename })
                    .bind("click", _click)
            );
            
        if((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
            pane.append(
                $("<button></button>")
                    .attr({ "type": "button" })
                    .addClass("btn btn-xs btn-link")
                    .append($("<i></i>").addClass("fa fa-share-alt"))
                    .append(" Kakao Talk")
                    .data({ "type": "kakaotalk", "url": url, "filename": filename })
                    .bind("click", _click)
            );
        }
        
        return pane;
    };

    return {
        init: init,
        get: get
    };
});
