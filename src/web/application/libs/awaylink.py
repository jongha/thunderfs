#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import codecs
import json
import uuid
import datetime
from application.libs import shorten

def init_names(db, collection_name):
  names = [ 
    'obama', 
    'lincoln', 
    'roosevelt', 
    'washington', 
    'kennedy', 
    'bush', 
    'johnson',
    'reagan',
    'clinton',
    'truman',
    'nixon',
    'jefferson',
    'eisenhower',
    'cleveland',
    'adams',
    'ford',
    'wilson',
    'jobs',
    'gates',
    'zuckerberg',
    'slim',
    'buffett',
    'allen',
    'ballmer',
    'page',
    'brin',
    'bezos',
    'cook',
    'branson',
  ]
  
  for name in names:
    db.thunderfs[collection_name].insert({ 'name': name, 'desc': '' })
  
  return db.thunderfs[collection_name].count()
  
def get_name(db, collection_link, collection_name):
  names = []
  for data in db.thunderfs[collection_link].find():
    names.append(data['name'])
  
  selected_data = db.thunderfs[collection_name].find_one({ 'name': { '$nin': names.lower() } })
  
  if selected_data is not None:
    return selected_data['name']
    
  return None

def get(db, collection_link, collection_name, domain, link):
  if db is not None:
    name_count = db.thunderfs[collection_name].count()
    if name_count == 0:
      name_count = init_names(db, collection_name)
      
    link_count = db.thunderfs[collection_link].count()
    
    long_link = False
    if link_count < name_count:
      name = get_name(db, collection_link, collection_name)
    else:
      long_link = True
      name = uuid.uuid4().hex

    data = {
      'name': name,
      'link': link,
      'date': datetime.datetime.utcnow(),
    }
    
    id = db.thunderfs[collection_link].insert(data)
    if id is not None:
      link = 'http://%s/%s' % (domain, name)
      if long_link:
        link = shorten.get(link) 
      
      return link
    
  return None  
