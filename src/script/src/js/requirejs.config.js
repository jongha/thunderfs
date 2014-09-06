require.config({
  paths: {
    'jquery': '../../../../libs/jquery/dist/jquery-1.11.1.min',
    'bootstrap': '../../../../libs/bootstrap/3.2.0/js/bootstrap.min',
    'jquery.ellipsis': '../../../../libs/jquery-ellipsis/dist/jquery.ellipsis.min',
    'zeroclipboard': '../../../../libs/zeroclipboard/dist/ZeroClipboard.min',
    'kakao': '../../../../libs/kakao-link/kakao.link'
  },
  deps: [
    'jquery', 
    'bootstrap', 
    'jquery.ellipsis', 
    'zeroclipboard', 
    'kakao',
    'thunderfs.share', 
    'thunderfs.list', 
    'thunderfs.upload', 
    'thunderfs.dragdrop'
    ]
});
