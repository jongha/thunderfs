#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from application import get_context
from application import app

from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

def main():
  if app.config['BASE_DOMAIN'] != request.headers['Host']:
    return redirect('http://' + app.config['BASE_DOMAIN'], code=302)
    
  #return render_template('index_production.html', context=get_context())
  return render_template('index.html', context=get_context())