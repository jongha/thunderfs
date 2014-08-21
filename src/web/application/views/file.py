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

def allowed_file(filename):
  return True # all allowed
  #return '.' in filename and filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']

def put():
  if request.method == 'POST':
  
    files = []
    
    for file in request.files.getlist('file'):
      print(file)
      
      if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        
        #path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        #file.save(path)
        #return redirect(url_for('get', filename=filename))
        
        # save to mongodb
        db = MongoClient(app.config['MONGO_HOST'], app.config['MONGO_PORT'])
        fs = gridfs.GridFS(db.thunderfs, collection=app.config['MONGO_COLLECTION'])
        files.append({ 'id': str(fs.put(file, filename=filename)), 'filename': filename })
        
    return json.dumps({ 'files': files  }), 200

  return '', 500

def get(id):
  db = MongoClient(app.config['MONGO_HOST'], app.config['MONGO_PORT'])
  fs = gridfs.GridFS(db.thunderfs, collection=app.config['MONGO_COLLECTION'])
  
  return Response(
    fs.get(ObjectId(id)).read(), 
    mimetype='application/octet-stream'
    )
