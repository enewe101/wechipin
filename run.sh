#!/bin/bash
cd /wechipin
npm install
npm install -g sails
npm install -g bower
bower install --allow-root
sails lift
