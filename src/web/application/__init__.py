#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys

from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

from flask.ext.babel import Babel, gettext, ngettext, lazy_gettext
     
app = Flask(__name__)
app.config.update(dict(
    #DATABASE=os.path.join(app.root_path, 'flaskr.db'),
    DEBUG=False,
    #SECRET_KEY='development key',
    #USERNAME='admin',
    #PASSWORD='default',
    
    SERVICE_NAME='10away',
    BASE_DOMAIN='10away.net',
    UPLOAD_FOLDER='/tmp/upload',

    FILE_ALLOWED_EXTENSIONS=set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif']),
    FILE_EXPIRE_SECONDS=600,
    
    MONGO_HOST='localhost',
    MONGO_PORT=27017,
    
    MONGO_COLLECTION_FS='fs', # mongodb
    MONGO_COLLECTION_NAME='names', # names
    MONGO_COLLECTION_LINK='links', # links
    
    #BABEL_DEFAULT_LOCALE='ko',
))

app.debug = app.config['DEBUG']

babel = Babel(app)

if os.getenv('FLASK_CONF') == 'DEV':
  app.config.from_object('application.settings.Development')

elif os.getenv('FLASK_CONF') == 'TEST':
  app.config.from_object('application.settings.Testing')

else:
  app.config.from_object('application.settings.Production')

# Enable jinja2 loop controls extension
app.jinja_env.add_extension('jinja2.ext.loopcontrols')


def localeselector():
  return request.accept_languages.best_match(['en', 'ko'])
  
babel.localeselector(localeselector)

def get_context():
  return {
    'debug': True,
    'service.name': app.config['SERVICE_NAME'],
    'service.slogan': gettext(u'쉽고 빠른 파일 공유'),
    
    'menu.home': gettext(u'처음으로'),
    'menu.upload': gettext(u'업로드'),
    'menu.about': gettext(u'소개'),
    'menu.usecase': gettext(u'활용 방법'),
    'menu.contact': gettext(u'연락하기'),
    
    'file.add': gettext(u'파일 추가'),
    'file.draghere': gettext(u'여기로 파일을 드래그 해주세요.'),
    'file.ttl': gettext(u'남은시간'),
    'file.name': gettext(u'파일명'),
    'file.size': gettext(u'파일크기'),
    'file.uploading': gettext(u'업로드 중'),
    'file.delete.confirm': gettext(u'정말로 파일을 삭제 하시겠습니까?'),
    'file.not.found': gettext(u'파일을 찾을 수 없습니다.'),
    'file.link.copy': gettext(u'링크 복사'),
    'file.show.html': gettext(u'HTML 보기'),
    'file.send.mail': gettext(u'메일 보내기'),
    'file.send.mail.subject': gettext(u'{0} 파일이 도착했습니다.'),
    'file.send.mail.body': gettext(u'파일명') + ':' '{0}%0D%0A' + gettext(u'링크') + "{1}",
    'file.send.sns.message': gettext(u'메시지를 입력해 주세요.'),
    'file.send.sns.subject': gettext(u'{0} 파일이 도착했습니다.'),
    'file.send.kakaotalk': gettext(u'카카오톡으로 보내기'),
    'file.send.line': gettext(u'라인으로 보내기'),
    'file.send.facebook': gettext(u'페이스북으로 보내기'),
    'file.send.twitter': gettext(u'트위터로 보내기'),
    'file.send.title': gettext(u'파일을 공유했습니다.'),
    
    'about.section1.title': gettext(u'10 분'),
    'about.section1.content1': gettext(u'업로드한 파일은 10분간 공유할 수 있습니다.'),
    'about.section1.content2': gettext(u'나도 모르게 파일이 공유되는 것을 걱정하지 않아도 됩니다.'),
    
    'about.section2.title': gettext(u'업로드'),
    'about.section2.content1': gettext(u'파일당 최대 4GB까지 무료로 업로드 할 수 있습니다.'),
    
    'about.section3.title': gettext(u'모바일'),
    'about.section3.content1': gettext(u'iPhone 또는 Android 등 모바일에서도 사용 가능합니다.'),
    'about.section3.content2': gettext(u'이동 중에도 파일 공유가 가능합니다.'),
    
    'usecase.title': gettext(u'활용 방법'),
    'usecase.section1.title': gettext(u'친구와 파일을 공유하고 싶을 때'),
    'usecase.section1.content1': gettext(u'클라우드 서비스의 파일 공유는 불편하지 않았나요?'),
    'usecase.section1.content2': gettext(u'파일을 간편하게 공유할 수 있습니다.'),
    
    'usecase.section2.title': gettext(u'임시 저장소가 필요할 때'),
    'usecase.section2.content1': gettext(u'짧은 시간 많은 사람에게 전달할 파일이 있나요?'),
    'usecase.section2.content2': gettext(u'쉽고 빠르게 링크를 만들 수 있습니다.'),    
    
    'contact.title': gettext(u'연락하기'),
    'contact.section1.content1': gettext(u'개선 사항 또는 아이디어가 있다면 메일 주세요.'),
    'contact.section1.content2': gettext(u'의견을 반영할 수 있도록 최선을 다하겠습니다.'),        
  }
