"use strict"
const fs = require('fs')
const fileNames = process.argv.slice(2) // get array of all extra arguments
const XRegExp = require('xregexp')

// Using sync rather than async should guarantee that the file order is preserved
const data = fileNames.map($_=>{
   const a = fs.readFileSync($_, 'utf8')
   return a
})

const docs = []
const result = []
const segmentsOnly = data.map($_=>{
   return XRegExp.replace(
      $_, // element to operate on
      XRegExp('.*<body>(.*?)</body>.*', 's'), // pattern
      '$1') // flag(s)
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
