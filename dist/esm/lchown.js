"use strict";
exports.__esModule = true;
exports.lchown = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function lchown(uid, gid) {
    return function (path) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.lchown(path, uid, gid, function (e) { return (!e ? resolve(path) : reject(e)); });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.lchown = lchown;
