/* js/tunderfs.js */
require(["jquery"], function ($) { // jquery load first

    require(["thunderfs.list", "thunderfs.upload", "thunderfs.dragdrop"], function (list, upload, dragdrop) { // thunderfs modules

        var options = { 
            putURL: "/put", 
            getURL: "/get", 
            type: "POST", 
            dataType: "json",
            ttl: 600,
            kakaoAPI: "2993c26d5c1f052494b9610b45340a30",
            resources: {
                DRAG: "여기로 파일을 드래그 해주세요.",
                TTL: "남은시간",
                TTL_DESC: "초 후에 삭제됩니다.",
                FILE: "파일명",
                SIZE: "파일크기",
                LINK: "파일링크",
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
