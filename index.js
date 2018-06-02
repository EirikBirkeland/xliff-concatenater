"use strict"
const fs = require('fs')
const XRegExp = require('xregexp')

// get array of all extra arguments
const fileNames = process.argv.slice(2)

const data = fileNames.map($_ => {
   return fs.readFileSync($_, 'utf8')
})

const docs = []
const result = []
const segmentsOnly = data.map($_ => {
   return XRegExp.replace(
      $_, // element to operate on
      XRegExp('.*<body>(.*?)</body>.*', 's'), // match pattern
      '$1') // replace pattern
})

// Build template and insert data 
const newXliff =
`<?xml version="1.0" encoding="UTF-8"?>
<xliff version='1.2'
xmlns='urn:oasis:names:tc:xliff:document:1.2'>
<file source-language='en' target-language='no'
datatype='plaintext'>
<body>${segmentsOnly.join("")}</body>
</file>
</xliff>`

process.stdout.write(newXliff)
