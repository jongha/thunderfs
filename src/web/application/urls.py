#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import render_template

from application import app, get_context
from application.views import index
from application.views import file

from flask.ext.babel import Babel, gettext, ngettext, lazy_gettext
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash
     
## URL dispatch rules
app.add_url_rule('/', view_func=index.main)
app.add_url_rule('/put', view_func=file.put, methods=['POST', 'GET'])
app.add_url_rule('/<id>', view_func=file.get, methods=['GET'])

## Error handlers
# Handle 404 errors
@app.errorhandler(404)
def page_not_found(e):
    return render_template('errors/404.html', context=get_context()), 404

# Handle 500 errors
@app.errorhandler(500)
def server_error(e):
    return render_template('errors/500.html', context=get_context()), 500
