"use strict";
exports.__esModule = true;
exports.read = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function read(options) {
    var length = options.length, offset = options.offset, position = options.position;
    return function (fd, buffer) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.read(fd, buffer, offset, length, position === "current" ? null : position, function (e, bytesRead, newBuffer) {
                    return !e ? resolve([fd, newBuffer, bytesRead]) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.read = read;
