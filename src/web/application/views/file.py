#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

def put():
  if request.method == 'POST':
    file = request.files['file']
    if file and allowed_file(file.filename):
      filename = secure_filename(file.filename)
      file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
      return redirect(url_for('uploaded_file', filename=filename))

  return '''
  <!doctype html>
  <title>Upload new File</title>
  <h1>Upload new File</h1>
  <form action="" method="post" enctype="multipart/form-data">
    <p><input type=file name=file>
       <input type=submit value=Upload>
  </form>
  '''

def get():
  return 'get'