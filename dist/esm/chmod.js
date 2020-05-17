"use strict";
exports.__esModule = true;
exports.chmod = void 0;
/**
 * @since 0.0.0
 */
var fs = require("fs");
var fp_ts_1 = require("fp-ts");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function chmod(permissions) {
    return function (pathLike) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.chmod(pathLike, permissions, function (e) {
                    !e ? resolve(pathLike) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.chmod = chmod;
