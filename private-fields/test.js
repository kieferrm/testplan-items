"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _sideLength;
class Square {
    constructor(sideLength) {
        _sideLength.set(this, void 0);
        __classPrivateFieldSet(this, _sideLength, sideLength);
    }
    equals(other) {
        return __classPrivateFieldGet(this, _sideLength) === __classPrivateFieldGet(other, _sideLength);
    }
}
_sideLength = new WeakMap();
const a = new Square(100);
const b = { rudi: 100 };
// Boom!
// TypeError: attempted to get private field on non-instance
// This fails because 'b' is not an instance of 'Square'.
console.log(a.equals(b));
