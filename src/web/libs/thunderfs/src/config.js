/*
require.config({
    baseUrl: "/static/js",
    paths: {
            "jquery": "//code.jquery.com/jquery-1.11.1.min",
            "bootstrap": "//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
            "jquery.ellipsis": "/static/js/jquery.ellipsis.min",
            "zeroclipboard": "/static/js/ZeroClipboard.min",
            "kakao": "https://developers.kakao.com/sdk/js/kakao.min"
    },
    deps: ["jquery", "bootstrap", "jquery.ellipsis", "zeroclipboard", "kakao"]
});
*/

require.config({
    paths: {
            "jquery": "../../../jquery/dist/jquery-1.11.1.min",
            "bootstrap": "../../..//bootstrap/3.2.0/js/bootstrap.min",
            "jquery.ellipsis": "../../../jquery-ellipsis/dist/jquery.ellipsis.min",
            "zeroclipboard": "../../../zeroclipboard/dist/ZeroClipboard.min",
            "kakao": "../../../kakao/sdk/js/kakao.min"
    },
    deps: ["jquery", "bootstrap", "jquery.ellipsis", "zeroclipboard", "kakao", 
      "thunderfs.list", "thunderfs.upload", "thunderfs.dragdrop"]
});
