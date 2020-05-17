"use strict";
exports.__esModule = true;
exports.link = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function link(existingPath) {
    return function (newPath) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.link(existingPath, newPath, function (e) {
                    return !e ? resolve(newPath) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.link = link;
