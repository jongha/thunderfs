/* js/tunderfs.list.js */
define(['jquery', 'jquery.ellipsis', 'thunderfs.share', 'thunderfs.capability'], function ($, ellipsis, share, capability) {
  var _list = null;
  var _progress = null;
  var _list_ul = null;
  var _options = null;
  var _expire = null;

  function init(selector, progress, options) {
    _options = $.extend({}, options);

    _list = $(selector);
    _progress = $(progress);
    _list_ul = _list.find('ul');

    share.init(options);

    $(window).bind('resize', function() {
      var data = $('.ellipsis').data('filename');
      $('.ellipsis').html(data).ellipsis({ position: 'middle' });
    });

    if(_list.length > 0) {
      _list.append(
        $('<div></div>')
          .addClass('filedesc')
          .append(capability.drag() ? options.resources.DRAG : null)
          .append(
            $('<div></div>').append($('.fileinput-button:first').clone())
          )
      );
    }
  }

  function append(file, xhr) {

    if(_list) {
      if(_list_ul.length === 0) {
        _list_ul = $('<ul></ul>');
        _list.append(_list_ul);
      }

      var timer = null;
      var filedelete = $('<div></div>')
        .append($('<i></i>').addClass('glyphicon glyphicon-remove'))
        .addClass('filedelete lnk')
        .bind('click', function() {
          if(confirm(_options.resources.REALLY_DELETE)) {
            if(timer) {
              clearInterval(timer);
              timer = null;
            }

            xhr.abort();
            $(this).parent().parent().remove();
            setFilledStyle();
          }
        });

      var ttl = $('<div></div>')
        .addClass('ttl')
        .append($('<span></span>').addClass('ttl-remain').html(_options.ttl));

      var filename = $('<div></div>')
        .html(file.name)
        .data({ 'filename': file.name })
        .addClass('filename ellipsis');

      var filelink = $('<div></div>')
        .addClass('filelink')
        .hide();

      var filesize = $('<div></div>')
        .append('0')
        .addClass('filesize');

      var progress = _progress.clone().show('slow');

      var item = function(title, body, extra) {
        return $('<div></div>')
          .addClass('list-group-item')
          .append($('<h5></h5>').append($('<strong></strong>').html(title)))
          .append($('<p></p>').append(body).append(extra));
      };

      var extra_expire = $('<div></div>').addClass('text-right small').html(Date(_expire));

      var itemgroup = $('<li></li>')
        .append(
          $('<div></div>')
            .addClass('tile')
            .append(filedelete)
            .append(progress)
            .append(filelink)
            .append(
              $('<div ></div >')
                .addClass('list-group')
                .append(item(_options.resources.TTL, ttl, extra_expire))
                .append(item(_options.resources.FILE, filename))
                .append(item(_options.resources.SIZE, filesize))
            )
            .append($('<div></div>').addClass('clearfix'))
          )
        .addClass('active');

      _list_ul.prepend(itemgroup); // add to list
      setFilledStyle();

      filename.ellipsis({ position: 'middle' });

      var complete = function(data) {
        var file = data.files[0];
        var url = file.link;
        _expire = file.expire;

        filelink
          .show()
          .append(share.get(file.filename, url));

        itemgroup.removeClass('active');
      };
      return {
        'progress': progress,
        'ttl': ttl,
        'filesize': filesize,
        'complete': complete,
        'timer': timer,
        'filelink': filelink
        };
    }

    return null;
  }

  function bytesToSize(bytes) {
    if(bytes === 0) {
      return '0 Byte';
    }

    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  }

  function setFilledStyle() {
    if(_list && _list.find('li').length > 0) {
      _list.addClass('filled');
    }else {
      _list.removeClass('filled');
    }
  }

  function progress(filelist, loaded, total) {
    if(_list && filelist) {
      var progressbar = filelist.progress.find('.progress');
      var percentage = ((loaded / total) * 100).toFixed(0);

      progressbar.attr({ 'data-progress': ((loaded / total) * 100).toFixed(0) });

      if(percentage >= 100 && filelist.timer === null) {

        filelist.progress
          .data({ 'ttl': _options.ttl })
          .addClass('ttl')
          .fadeOut(1000);

        filelist.timer = setInterval(function() {
          var ttl = parseInt(filelist.progress.data('ttl'));

          filelist.progress.data({ 'ttl': --ttl });
          var percentage = parseInt((--ttl / _options.ttl) * 100);

          progressbar.attr({ 'data-progress': percentage });

          filelist.ttl
            .empty()
            .append($('<span></span>').addClass('ttl-remain').html(ttl));

          if(ttl === 0 || ttl < 0) {
            clearInterval(filelist.timer);
            filelist.timer = null;
            filelist.filelink.hide('slow');
          }
        }, 1000);
      }

      filelist.filesize.html(bytesToSize(loaded) + ' / ' + bytesToSize(total));
    }
  }

  return {
    init: init,
    append: append,
    progress: progress
  };
});
