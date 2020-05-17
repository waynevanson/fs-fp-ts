"use strict";
/**
 * @since 0.0.0
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.enforcePartialFields = exports.enforceErrnoException = void 0;
/**
 * @summary
 * An identity function that always
 * types the output as `NodeJS.ErrnoException`
 *
 * @since 0.0.0
 */
function enforceErrnoException(e) {
    return e;
}
exports.enforceErrnoException = enforceErrnoException;
/**
 * @summary
 * Use to enforce that all properties in a `Record` are present.
 *
 * If they're not, the callback (`fa`) returns all partial fields as non-nullable fields.
 *
 * @since 0.0.0
 *
 */
function enforcePartialFields(fa) {
    return function (a) { return (__assign(__assign({}, fa(a)), a)); };
}
exports.enforcePartialFields = enforcePartialFields;
