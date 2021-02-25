"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = exports.bufferCompare = exports.bufferEquals = exports.bufferMonoid = exports.zero = void 0;
var zero = function () { return Buffer.from([]); };
exports.zero = zero;
exports.bufferMonoid = {
    concat: function (x, y) { return Buffer.concat([x, y]); },
    empty: exports.zero(),
};
exports.bufferEquals = {
    equals: function (x, y) { return x.equals(y); },
};
exports.bufferCompare = __assign(__assign({}, exports.bufferEquals), { compare: function (x, y) { return x.compare(y); } });
var encode = function (encoding) {
    if (encoding === void 0) { encoding = "utf-8"; }
    return function (fa) {
        return fa.toString(encoding);
    };
};
exports.encode = encode;
var decode = function (encoding) {
    if (encoding === void 0) { encoding = "utf-8"; }
    return function (fa) {
        return Buffer.from(fa, encoding);
    };
};
exports.decode = decode;
