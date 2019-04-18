'use strict'

module.exports = {
  lowerJSONKey: function (jsonObj) {
    for (var key in jsonObj){
        jsonObj[key.toLowerCase()] = jsonObj[key]
        delete(jsonObj[key]);
    }
    return jsonObj;
  }
}
