"use strict";
exports.__esModule = true;
exports.lutimes = void 0;
/**
 * @summary
 * Hello world
 *
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function lutimes(accessTime, modifyTime) {
    return function (path) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.lutimes(path, accessTime, modifyTime, function (e) {
                    return !e ? resolve(path) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.lutimes = lutimes;
