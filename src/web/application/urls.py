#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import render_template

from application import app
from application.views import index
from application.views import file

## URL dispatch rules
app.add_url_rule('/', view_func=index.main)
app.add_url_rule('/put', view_func=file.put, methods=['POST', 'GET'])
app.add_url_rule('/<id>', view_func=file.get, methods=['GET'])

## Error handlers
# Handle 404 errors
@app.errorhandler(404)
def page_not_found(e):
    #return render_template('404.html'), 404
    return '404', 404

# Handle 500 errors
@app.errorhandler(500)
def server_error(e):
    #return render_template('500.html'), 500
    return '500', 500
