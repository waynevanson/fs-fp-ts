"use strict";
exports.__esModule = true;
exports.readlink = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function readlink(type) {
    var options = { encoding: type === "Buffer" ? null : type };
    return function (path) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.readlink(path, options, function (e, string) {
                    return !e ? resolve(string) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.readlink = readlink;
