/* js/tunderfs.js */
require(["jquery"], function ($) { // jquery load first

    require(["thunderfs.list", "thunderfs.upload", "thunderfs.dragdrop"], function (list, upload, dragdrop) { // thunderfs modules

        // fro string format
        if (!String.prototype.format) {
            String.prototype.format = function() {
                var args = arguments;
                return this.replace(/{(\d+)}/g, function(match, number) {
                    return typeof args[number] != "undefined" ? args[number] : match;
                });
            };
        }

        var servers = [
            "file1.10away.net",
            "file2.10away.net",
            "file3.10away.net"
        ];
        
        var options = {
            putURL: "//" + servers[0] + "/put",
            getURL: "/get",
            type: "POST",
            dataType: "json",
            ttl: 600,
            kakaoAPI: "2993c26d5c1f052494b9610b45340a30",
            resources: {
                COPY_LINK: "링크 복사",
                SEND_HTML: "HTML 보기",
                SEND_MAIL: "메일 보내기",
                SEND_MAIL_SUBJECT: "[10away] 파일을 공유합니다.",
                SEND_MAIL_BODY: "파일명:{0}%0D%0A링크:{1}",
                SEND_KAKAOTALK: "카카오 톡으로 보내기",

                DRAG: "여기로 파일을 드래그 해주세요.",
                TTL: "남은시간",
                TTL_DESC: "초 후에 자동으로 링크가 삭제됩니다.",
                FILE: "파일명",
                SIZE: "파일크기",
                REALLY_DELETE: "정말로 삭제하시겠습니까?"
            }
        };

        list.init(".filelist", ".progress-clone", options);

        var _uploadCallback = function(filelist, data) {
            filelist.complete(data);
        };

        upload.init(".fileupload", list, options, _uploadCallback);

        dragdrop.init(".filelist", upload);
    });
});
