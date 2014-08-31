#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

from flask.ext.babel import gettext, ngettext, lazy_gettext
   
def main():
  context = {
    'service.name': gettext(u'10away'),
    'service.slogan': gettext(u'Fast and easy file sharing'),
    
    'file.add': gettext(u'Add files'),
    'file.draghere': gettext(u'Drag files here'),
    'file.ttl': gettext(u'Time to live'),
    'file.name': gettext(u'File name'),
    'file.size': gettext(u'File size'),
    'file.delete.confirm': gettext(u'Are you sure you want to delete file'),
    
    'copy.link': gettext(u'Copy link'),
    'show.html': gettext(u'Show HTML'),
    'send.mail': gettext(u'Send mail'),
    'send.mail.subject': gettext(u'[10away] File shared with you'),
    'send.mail.body': gettext(u'Mail body'),
    'send.kakaotalk': gettext(u'Send KakaoTalk'),
  }
  
  return render_template('index.html', context=context)
