"use strict";
exports.__esModule = true;
exports.mkdtemp = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function mkdtemp(options) {
    return function (prefix) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.mkdtemp(prefix, options, function (e, folder) {
                    return !e ? resolve(folder) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.mkdtemp = mkdtemp;
