#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
from flask import Flask

app = Flask(__name__)

if os.getenv('FLASK_CONF') == 'DEV':
	app.config.from_object('application.settings.Development')

elif os.getenv('FLASK_CONF') == 'TEST':
  app.config.from_object('application.settings.Testing')

else:
  app.config.from_object('application.settings.Production')

# Enable jinja2 loop controls extension
app.jinja_env.add_extension('jinja2.ext.loopcontrols')

# Pull in URL dispatch routes
import application.urls
