#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
from flask import Flask
from flask.ext.babel import Babel

app = Flask(__name__)
app.config.update(dict(
    #DATABASE=os.path.join(app.root_path, 'flaskr.db'),
    DEBUG=True,
    #SECRET_KEY='development key',
    #USERNAME='admin',
    #PASSWORD='default',
    
    BASE_DOMAIN='dev.10away.net',
    UPLOAD_FOLDER='/tmp/upload',
    ALLOWED_EXTENSIONS=set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif']),
    
    MONGO_HOST='localhost',
    MONGO_PORT=27017,
    
    MONGO_COLLECTION_FS='fs', # mongodb
    MONGO_COLLECTION_NAME='names', # names
    MONGO_COLLECTION_LINK='links', # links
    
    #BABEL_DEFAULT_LOCALE='ko',
))

app.debug = True

babel = Babel(app)

if os.getenv('FLASK_CONF') == 'DEV':
  app.config.from_object('application.settings.Development')

elif os.getenv('FLASK_CONF') == 'TEST':
  app.config.from_object('application.settings.Testing')

else:
  app.config.from_object('application.settings.Production')

# Enable jinja2 loop controls extension
app.jinja_env.add_extension('jinja2.ext.loopcontrols')
