#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import codecs
import json

from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash, Response

from application import app
from werkzeug.utils import secure_filename

from pymongo import MongoClient
import gridfs

from bson import ObjectId
from time import gmtime, strftime
from application.libs import shorten
from application.libs import awaylink
import random

def allowed_file(filename):
  return True # all allowed
  #return '.' in filename and filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']

def put():
  if request.method == 'POST':
  
    files = []
    
    for file in request.files.getlist('file'):
      if file and allowed_file(file.filename):
         
        org_filename = file.filename
        filename = secure_filename(org_filename)
        
        mongo_filename = '%s/%d/%s' % (
          strftime('%Y/%m/%d/%H/%M/%S', gmtime()), 
          int(random.random() * 10000), 
          filename
          )
        
        # save to mongodb
        db = MongoClient(app.config['MONGO_HOST'], app.config['MONGO_PORT'])
        fs = gridfs.GridFS(db.thunderfs, collection=app.config['MONGO_COLLECTION_FS'])
        id = fs.put(file, filename=mongo_filename)
        link = 'http://' + request.headers['Host'] + '/get/' + mongo_filename
        
        #shorten_link = shorten.get(link)
        away_link = awaylink.get(
          db, 
          app.config['MONGO_COLLECTION_LINK'], 
          app.config['MONGO_COLLECTION_NAME'], 
          app.config['BASE_DOMAIN'], 
          link)
        
        files.append({ 
          'link': away_link if away_link is not None else '', 
          'filename': org_filename,
          })
        
    return json.dumps({ 'files': files  }), 200

  return '', 500

def get(id):
  db = MongoClient(app.config['MONGO_HOST'], app.config['MONGO_PORT'])
  links = db.thunderfs[app.config['MONGO_COLLECTION_LINK']].find_one({ 'name': id.lower() })
  
  if links is not None:
    return redirect(links['link'], code=302)
  
  return '404', 404  
