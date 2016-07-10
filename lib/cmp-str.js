'use strict';

var isString = require('is-string');

module.exports = function (s1, s2) {
  if (!isString(s1) || !isString(s2)) return null;
  var len = Math.min(s1.length, s2.length);
  if (s1 === s2) return 0;
  var i = 0;
  for (; i < len; i++) {
    if (s1[i] !== s2[i]) break;
  }if (i == len) return s1.length - s2.length;
  return s1.charCodeAt(i) - s2.charCodeAt(i);
};