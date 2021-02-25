export const zero = () => Buffer.from([]);
export const bufferMonoid = {
    concat: (x, y) => Buffer.concat([x, y]),
    empty: zero(),
};
export const bufferEquals = {
    equals: (x, y) => x.equals(y),
};
export const bufferCompare = Object.assign(Object.assign({}, bufferEquals), { compare: (x, y) => x.compare(y) });
export const encode = (encoding = "utf-8") => (fa) => fa.toString(encoding);
