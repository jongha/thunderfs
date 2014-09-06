/* js/tunderfs.share.js */
define(['jquery', 'kakao', 'thunderfs.capability', 'zeroclipboard'], function ($, kakao, capability, ZeroClipboard) {
  var _options = null;
  var _html = null;

  function clickHandler() {
    var type = $(this).data('type');
    var url = $(this).data('url');
    var filename = $(this).data('filename');

    switch(type) {
      case 'copy':
        break;

      case 'html':
        if(_html) { _html.show(); }
        break;

      case 'facebook':
        window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' +
          _options.resources.SEND_SNS_TITLE +
          '&p[summary]=' + filename +
          '&p[url]=' + encodeURIComponent(url),
          //'&p[images][0]=' + image
          'facebook_sharer',
          'toolbar=0,status=0,width=520,height=350'
          );

        break;

      case 'twitter':
        window.open('http://twitter.com/share?text=' + _options.resources.SEND_SNS_TITLE +
          ' ' + encodeURIComponent(url) +
          '&hashtags=10away',
          'twitter_sharer',
          'toolbar=0,status=0,width=520,height=350'
          );
        break;

      case 'email':
        location.href = 'mailto:' +
          '?subject=' + _options.resources.SEND_MAIL_SUBJECT.format(filename, url) +
          '&body=' + _options.resources.SEND_MAIL_BODY.format(filename, url);

        break;

      case 'kakaotalk':
        var kakao_subject = _options.resources.SEND_SNS_SUBJECT.format(filename, url);
        var message = prompt(_options.resources.SEND_SNS_MESSAGE, kakao_subject);
        if (message != null) {
          window.kakao.link('talk').send({
            msg : kakao_subject + '\n' + message,
            url : url,
            appid : '10away.net',
            appver : '2.0',
            appname : '10away',
            type : 'link'
          });
        }
        break;

      case 'line':
        window.open('http://line.naver.jp/R/msg/text/' +
          _options.resources.SEND_MAIL_SUBJECT.format(filename, url) +
          '%0D%0A' + _options.resources.SEND_MAIL_BODY.format(filename, url),
          '_blank');
        break;
    }
  }

  function init(options) {
    _options = $.extend({}, options);
  }

  function get(filename, url) {
    _html = $('<textarea />')
      .attr({ 'rows': 3, 'wrap': 'off' })
      .val('<a href=\'' + url + '\' target=\'_blank\'>' + filename + '</a>')
      .hide();

    var copy = null;
    if(!capability.mobile()) {
      copy = $('<button></button>')
        .attr({ 'type': 'button' })
        .addClass('btn btn-sm btn-danger')
        .append($('<i></i>').addClass('fa fa-clipboard'))
        .append(' ' + _options.resources.COPY_LINK)
        .data({ 'type': 'copy', 'url': url, 'filename': filename })
        .bind('click', clickHandler);
    }

    var pane = $('<div></div>')
      .append($('<div></div>').addClass('clearfix'))
      .append(
        $('<div></div>')
          .addClass('text-center filelink-url')
          .append(
            $('<a></a>')
            .addClass('alert alert-danger')
            .attr({ 'target': '_blank', 'href': url })
            .html(url.replace(/.*?:\/\//g, ''))
          )
      )
      .append(_html)
      .append(copy)
      .append(
        $('<button></button>')
          .attr({ 'type': 'button' })
          .addClass('btn btn-sm btn-primary')
          .append($('<i></i>').addClass('fa fa-facebook-square'))
          .append(' ' + _options.resources.SEND_FACEBOOK)
          .data({ 'type': 'facebook', 'url': url, 'filename': filename })
          .bind('click', clickHandler)
      )
      .append(
        $('<button></button>')
          .attr({ 'type': 'button' })
          .addClass('btn btn-sm btn-primary')
          .append($('<i></i>').addClass('fa fa-twitter-square'))
          .append(' ' + _options.resources.SEND_TWITTER)
          .data({ 'type': 'twitter', 'url': url, 'filename': filename })
          .bind('click', clickHandler)
      )
      .append(
        $('<button></button>')
          .attr({ 'type': 'button' })
          .addClass('btn btn-sm btn-primary')
          .append($('<i></i>').addClass('fa fa-envelope-o'))
          .append(' ' + _options.resources.SEND_MAIL)
          .data({ 'type': 'email', 'url': url, 'filename': filename })
          .bind('click', clickHandler)
      )
      .append(
        $('<button></button>')
          .attr({ 'type': 'button' })
          .addClass('btn btn-sm btn-info')
          .append($('<i></i>').addClass('fa fa-code'))
          .append(' ' + _options.resources.SEND_HTML)
          .data({ 'type': 'html', 'url': url, 'filename': filename })
          .bind('click', clickHandler)
      );

    if(capability.mobile()) {
      pane.append(
        $('<button></button>')
          .attr({ 'type': 'button' })
          .addClass('btn btn-sm btn-primary')
          .append($('<i></i>').addClass('fa fa-share-alt'))
          .append(' ' + _options.resources.SEND_KAKAOTALK)
          .data({ 'type': 'kakaotalk', 'url': url, 'filename': filename })
          .bind('click', clickHandler)
      )
      .append(
        $('<button></button>')
          .attr({ 'type': 'button' })
          .addClass('btn btn-sm btn-primary')
          .append($('<i></i>').addClass('fa fa-share-alt'))
          .append(' ' + _options.resources.SEND_LINE)
          .data({ 'type': 'line', 'url': url, 'filename': filename })
          .bind('click', clickHandler)
      );
    }

    if(!!copy) {
      var clipboard = new ZeroClipboard(copy[0]);
      clipboard.setText(url);
    }
    return pane;
  }

  return {
    init: init,
    get: get
  };
});
