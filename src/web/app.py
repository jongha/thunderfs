#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
from flask import Flask
from application import app

sys.path.insert(1, os.path.join(os.path.abspath('.'), 'extensions'))

# Pull in URL dispatch routes
import application.urls

app.debug = True

if __name__ == '__main__':
  try:
    app.run(debug=True)
  except Exception:
    app.logger.exception('Failed')