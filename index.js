const express = require('express')
const request = require('request')
const path = require('path')
const fs = require('fs')
const osc = require('node-osc')

const app = express()

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

app.set('port', port)

