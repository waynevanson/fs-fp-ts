"use strict";
exports.__esModule = true;
exports.readFile = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function readFile(encoding, flag) {
    var options = {
        encoding: encoding === "Buffer" ? null : encoding,
        flag: flag
    };
    return function (path) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.readFile(path, options, function (e, data) {
                    return !e
                        ? resolve(data)
                        : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.readFile = readFile;
