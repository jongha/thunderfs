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

def allowed_file(filename):
  return True # all allowed
  #return '.' in filename and filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']

def put():
  if request.method == 'POST':
  
    files = []
    
    for file in request.files.getlist('file'):
      print(file)
      
      if file and allowed_file(file.filename):
         
        org_filename = file.filename
        filename = secure_filename(org_filename)
        mongo_filename = '%s/%s' % (strftime('%Y/%m/%d/%H/%M/%S', gmtime()), filename)
        
        #path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        #file.save(path)
        #return redirect(url_for('get', filename=filename))
        
        # save to mongodb
        db = MongoClient(app.config['MONGO_HOST'], app.config['MONGO_PORT'])
        fs = gridfs.GridFS(db.thunderfs, collection=app.config['MONGO_COLLECTION'])
        id = fs.put(file, filename=mongo_filename)
        
        files.append({ 
          'host': request.headers['Host'],
          'link': '/get/' + mongo_filename, 
          'filename': org_filename,
          })
        
    return json.dumps({ 'files': files  }), 200

  return '', 500

def get(id):
  db = MongoClient(app.config['MONGO_HOST'], app.config['MONGO_PORT'])
  fs = gridfs.GridFS(db.thunderfs, collection=app.config['MONGO_COLLECTION'])
  
  file = fs.get(ObjectId(id))
  return Response(
    file.read(), 
    headers = { 
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename=' + file.filename
      }
    )
