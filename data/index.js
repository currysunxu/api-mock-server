'use strict'

const fs = require('fs')
const path = require('path')

module.exports = function() {

  let data = {}

  let filenames = fs.readdirSync(__dirname)
  filenames.forEach(filename => {
    if(path.extname(filename) == '.json') {
      let key = filename.replace('.json', '')
      let value = JSON.parse(fs.readFileSync(path.join(__dirname, filename)))
      data[key] = value
    }
  })

  return data
}
