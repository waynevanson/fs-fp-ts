"use strict";
exports.__esModule = true;
exports.exists = void 0;
var access = require("./access");
var pipeable_1 = require("fp-ts/lib/pipeable");
var fp_ts_1 = require("fp-ts");
/**
 * @since 0.0.0
 */
function exists(pathLike) {
    return pipeable_1.pipe(pathLike, access.access("visible"), fp_ts_1.taskEither.fold(function () { return fp_ts_1.task.of(false); }, function () { return fp_ts_1.task.of(true); }));
}
exports.exists = exists;
