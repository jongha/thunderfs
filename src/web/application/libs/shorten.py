#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import codecs
import json
from application.libs import bitly

def get(url):
  api = bitly.Api(login='o_1gc6gttus8', apikey='R_a6ce0adb432e4e42b48c7635cc62571a')
  shorten_url = api.shorten(url,{'history':1})
  
  return shorten_url