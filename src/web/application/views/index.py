#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

def main():
  return render_template('index.html')