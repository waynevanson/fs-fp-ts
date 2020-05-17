"use strict";
exports.__esModule = true;
exports.appendFile = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @summary
 *
 * @since 0.0.0
 */
function appendFile(options) {
    return function (pathLikeOrFileDescriptor, data) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.appendFile(pathLikeOrFileDescriptor, data, options, function (e) {
                    !e ? resolve(pathLikeOrFileDescriptor) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.appendFile = appendFile;
