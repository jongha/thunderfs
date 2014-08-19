#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
from flask import Flask

import application
app = application.app # for uWSGI callable setting

sys.path.insert(1, os.path.join(os.path.abspath('.'), 'extensions'))
