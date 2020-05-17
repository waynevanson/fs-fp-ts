"use strict";
exports.__esModule = true;
exports.rmdir = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function rmdir(options) {
  return function (pathLike) {
    return fp_ts_1.taskEither.tryCatch(function () {
      return new Promise(function (resolve, reject) {
        fs.rmdir(pathLike, options, function (e) {
          return !e ? resolve(pathLike) : reject(e);
        });
      });
    }, util_1.enforceErrnoException);
  };
}
exports.rmdir = rmdir;
