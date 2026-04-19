module.exports = [
"[project]/Documents/GitHub/billing-failure-email/node_modules/@esbuild/darwin-arm64/bin/esbuild [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/Documents/GitHub/billing-failure-email/node_modules/@esbuild/darwin-arm64/bin/esbuild'\n\nfailed to convert rope into string\n\nCaused by:\n- invalid utf-8 sequence of 1 bytes from index 0");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@esbuild/darwin-arm64/package.json.[json].cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "name": "@esbuild/darwin-arm64",
    "version": "0.27.5",
    "description": "The macOS ARM 64-bit binary for esbuild, a JavaScript bundler.",
    "repository": {
        "type": "git",
        "url": "git+https://github.com/evanw/esbuild.git"
    },
    "license": "MIT",
    "preferUnplugged": true,
    "engines": {
        "node": ">=18"
    },
    "os": [
        "darwin"
    ],
    "cpu": [
        "arm64"
    ]
};
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/esbuild/lib/main.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toESM = (mod, isNodeMode, target)=>(target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(// If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod));
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// lib/npm/node.ts
var node_exports = {};
__export(node_exports, {
    analyzeMetafile: ()=>analyzeMetafile,
    analyzeMetafileSync: ()=>analyzeMetafileSync,
    build: ()=>build,
    buildSync: ()=>buildSync,
    context: ()=>context,
    default: ()=>node_default,
    formatMessages: ()=>formatMessages,
    formatMessagesSync: ()=>formatMessagesSync,
    initialize: ()=>initialize,
    stop: ()=>stop,
    transform: ()=>transform,
    transformSync: ()=>transformSync,
    version: ()=>version
});
module.exports = __toCommonJS(node_exports);
// lib/shared/stdio_protocol.ts
function encodePacket(packet) {
    let visit = (value)=>{
        if (value === null) {
            bb.write8(0);
        } else if (typeof value === "boolean") {
            bb.write8(1);
            bb.write8(+value);
        } else if (typeof value === "number") {
            bb.write8(2);
            bb.write32(value | 0);
        } else if (typeof value === "string") {
            bb.write8(3);
            bb.write(encodeUTF8(value));
        } else if (value instanceof Uint8Array) {
            bb.write8(4);
            bb.write(value);
        } else if (value instanceof Array) {
            bb.write8(5);
            bb.write32(value.length);
            for (let item of value){
                visit(item);
            }
        } else {
            let keys = Object.keys(value);
            bb.write8(6);
            bb.write32(keys.length);
            for (let key of keys){
                bb.write(encodeUTF8(key));
                visit(value[key]);
            }
        }
    };
    let bb = new ByteBuffer();
    bb.write32(0);
    bb.write32(packet.id << 1 | +!packet.isRequest);
    visit(packet.value);
    writeUInt32LE(bb.buf, bb.len - 4, 0);
    return bb.buf.subarray(0, bb.len);
}
function decodePacket(bytes) {
    let visit = ()=>{
        switch(bb.read8()){
            case 0:
                return null;
            case 1:
                return !!bb.read8();
            case 2:
                return bb.read32();
            case 3:
                return decodeUTF8(bb.read());
            case 4:
                return bb.read();
            case 5:
                {
                    let count = bb.read32();
                    let value2 = [];
                    for(let i = 0; i < count; i++){
                        value2.push(visit());
                    }
                    return value2;
                }
            case 6:
                {
                    let count = bb.read32();
                    let value2 = {};
                    for(let i = 0; i < count; i++){
                        value2[decodeUTF8(bb.read())] = visit();
                    }
                    return value2;
                }
            default:
                throw new Error("Invalid packet");
        }
    };
    let bb = new ByteBuffer(bytes);
    let id = bb.read32();
    let isRequest = (id & 1) === 0;
    id >>>= 1;
    let value = visit();
    if (bb.ptr !== bytes.length) {
        throw new Error("Invalid packet");
    }
    return {
        id,
        isRequest,
        value
    };
}
var ByteBuffer = class {
    constructor(buf = new Uint8Array(1024)){
        this.buf = buf;
        this.len = 0;
        this.ptr = 0;
    }
    _write(delta) {
        if (this.len + delta > this.buf.length) {
            let clone = new Uint8Array((this.len + delta) * 2);
            clone.set(this.buf);
            this.buf = clone;
        }
        this.len += delta;
        return this.len - delta;
    }
    write8(value) {
        let offset = this._write(1);
        this.buf[offset] = value;
    }
    write32(value) {
        let offset = this._write(4);
        writeUInt32LE(this.buf, value, offset);
    }
    write(bytes) {
        let offset = this._write(4 + bytes.length);
        writeUInt32LE(this.buf, bytes.length, offset);
        this.buf.set(bytes, offset + 4);
    }
    _read(delta) {
        if (this.ptr + delta > this.buf.length) {
            throw new Error("Invalid packet");
        }
        this.ptr += delta;
        return this.ptr - delta;
    }
    read8() {
        return this.buf[this._read(1)];
    }
    read32() {
        return readUInt32LE(this.buf, this._read(4));
    }
    read() {
        let length = this.read32();
        let bytes = new Uint8Array(length);
        let ptr = this._read(bytes.length);
        bytes.set(this.buf.subarray(ptr, ptr + length));
        return bytes;
    }
};
var encodeUTF8;
var decodeUTF8;
var encodeInvariant;
if (typeof TextEncoder !== "undefined" && typeof TextDecoder !== "undefined") {
    let encoder = new TextEncoder();
    let decoder = new TextDecoder();
    encodeUTF8 = (text)=>encoder.encode(text);
    decodeUTF8 = (bytes)=>decoder.decode(bytes);
    encodeInvariant = 'new TextEncoder().encode("")';
} else if (typeof Buffer !== "undefined") {
    encodeUTF8 = (text)=>Buffer.from(text);
    decodeUTF8 = (bytes)=>{
        let { buffer, byteOffset, byteLength } = bytes;
        return Buffer.from(buffer, byteOffset, byteLength).toString();
    };
    encodeInvariant = 'Buffer.from("")';
} else {
    throw new Error("No UTF-8 codec found");
}
if (!(encodeUTF8("") instanceof Uint8Array)) throw new Error(`Invariant violation: "${encodeInvariant} instanceof Uint8Array" is incorrectly false

This indicates that your JavaScript environment is broken. You cannot use
esbuild in this environment because esbuild relies on this invariant. This
is not a problem with esbuild. You need to fix your environment instead.
`);
function readUInt32LE(buffer, offset) {
    return (buffer[offset++] | buffer[offset++] << 8 | buffer[offset++] << 16 | buffer[offset++] << 24) >>> 0;
}
function writeUInt32LE(buffer, value, offset) {
    buffer[offset++] = value;
    buffer[offset++] = value >> 8;
    buffer[offset++] = value >> 16;
    buffer[offset++] = value >> 24;
}
// lib/shared/uint8array_json_parser.ts
var fromCharCode = String.fromCharCode;
function throwSyntaxError(bytes, index, message) {
    const c = bytes[index];
    let line = 1;
    let column = 0;
    for(let i = 0; i < index; i++){
        if (bytes[i] === 10 /* Newline */ ) {
            line++;
            column = 0;
        } else {
            column++;
        }
    }
    throw new SyntaxError(message ? message : index === bytes.length ? "Unexpected end of input while parsing JSON" : c >= 32 && c <= 126 ? `Unexpected character ${fromCharCode(c)} in JSON at position ${index} (line ${line}, column ${column})` : `Unexpected byte 0x${c.toString(16)} in JSON at position ${index} (line ${line}, column ${column})`);
}
function JSON_parse(bytes) {
    if (!(bytes instanceof Uint8Array)) {
        throw new Error(`JSON input must be a Uint8Array`);
    }
    const propertyStack = [];
    const objectStack = [];
    const stateStack = [];
    const length = bytes.length;
    let property = null;
    let state = 0 /* TopLevel */ ;
    let object;
    let i = 0;
    while(i < length){
        let c = bytes[i++];
        if (c <= 32 /* Space */ ) {
            continue;
        }
        let value;
        if (state === 2 /* Object */  && property === null && c !== 34 /* Quote */  && c !== 125 /* CloseBrace */ ) {
            throwSyntaxError(bytes, --i);
        }
        switch(c){
            // True
            case 116 /* LowerT */ :
                {
                    if (bytes[i++] !== 114 /* LowerR */  || bytes[i++] !== 117 /* LowerU */  || bytes[i++] !== 101 /* LowerE */ ) {
                        throwSyntaxError(bytes, --i);
                    }
                    value = true;
                    break;
                }
            // False
            case 102 /* LowerF */ :
                {
                    if (bytes[i++] !== 97 /* LowerA */  || bytes[i++] !== 108 /* LowerL */  || bytes[i++] !== 115 /* LowerS */  || bytes[i++] !== 101 /* LowerE */ ) {
                        throwSyntaxError(bytes, --i);
                    }
                    value = false;
                    break;
                }
            // Null
            case 110 /* LowerN */ :
                {
                    if (bytes[i++] !== 117 /* LowerU */  || bytes[i++] !== 108 /* LowerL */  || bytes[i++] !== 108 /* LowerL */ ) {
                        throwSyntaxError(bytes, --i);
                    }
                    value = null;
                    break;
                }
            // Number begin
            case 45 /* Minus */ :
            case 46 /* Dot */ :
            case 48 /* Digit0 */ :
            case 49 /* Digit1 */ :
            case 50 /* Digit2 */ :
            case 51 /* Digit3 */ :
            case 52 /* Digit4 */ :
            case 53 /* Digit5 */ :
            case 54 /* Digit6 */ :
            case 55 /* Digit7 */ :
            case 56 /* Digit8 */ :
            case 57 /* Digit9 */ :
                {
                    let index = i;
                    value = fromCharCode(c);
                    c = bytes[i];
                    while(true){
                        switch(c){
                            case 43 /* Plus */ :
                            case 45 /* Minus */ :
                            case 46 /* Dot */ :
                            case 48 /* Digit0 */ :
                            case 49 /* Digit1 */ :
                            case 50 /* Digit2 */ :
                            case 51 /* Digit3 */ :
                            case 52 /* Digit4 */ :
                            case 53 /* Digit5 */ :
                            case 54 /* Digit6 */ :
                            case 55 /* Digit7 */ :
                            case 56 /* Digit8 */ :
                            case 57 /* Digit9 */ :
                            case 101 /* LowerE */ :
                            case 69 /* UpperE */ :
                                {
                                    value += fromCharCode(c);
                                    c = bytes[++i];
                                    continue;
                                }
                        }
                        break;
                    }
                    value = +value;
                    if (isNaN(value)) {
                        throwSyntaxError(bytes, --index, "Invalid number");
                    }
                    break;
                }
            // String begin
            case 34 /* Quote */ :
                {
                    value = "";
                    while(true){
                        if (i >= length) {
                            throwSyntaxError(bytes, length);
                        }
                        c = bytes[i++];
                        if (c === 34 /* Quote */ ) {
                            break;
                        } else if (c === 92 /* Backslash */ ) {
                            switch(bytes[i++]){
                                // Normal escape sequence
                                case 34 /* Quote */ :
                                    value += '"';
                                    break;
                                case 47 /* Slash */ :
                                    value += "/";
                                    break;
                                case 92 /* Backslash */ :
                                    value += "\\";
                                    break;
                                case 98 /* LowerB */ :
                                    value += "\b";
                                    break;
                                case 102 /* LowerF */ :
                                    value += "\f";
                                    break;
                                case 110 /* LowerN */ :
                                    value += "\n";
                                    break;
                                case 114 /* LowerR */ :
                                    value += "\r";
                                    break;
                                case 116 /* LowerT */ :
                                    value += "	";
                                    break;
                                // Unicode escape sequence
                                case 117 /* LowerU */ :
                                    {
                                        let code = 0;
                                        for(let j = 0; j < 4; j++){
                                            c = bytes[i++];
                                            code <<= 4;
                                            if (c >= 48 /* Digit0 */  && c <= 57 /* Digit9 */ ) code |= c - 48 /* Digit0 */ ;
                                            else if (c >= 97 /* LowerA */  && c <= 102 /* LowerF */ ) code |= c + (10 - 97 /* LowerA */ );
                                            else if (c >= 65 /* UpperA */  && c <= 70 /* UpperF */ ) code |= c + (10 - 65 /* UpperA */ );
                                            else throwSyntaxError(bytes, --i);
                                        }
                                        value += fromCharCode(code);
                                        break;
                                    }
                                // Invalid escape sequence
                                default:
                                    throwSyntaxError(bytes, --i);
                                    break;
                            }
                        } else if (c <= 127) {
                            value += fromCharCode(c);
                        } else if ((c & 224) === 192) {
                            value += fromCharCode((c & 31) << 6 | bytes[i++] & 63);
                        } else if ((c & 240) === 224) {
                            value += fromCharCode((c & 15) << 12 | (bytes[i++] & 63) << 6 | bytes[i++] & 63);
                        } else if ((c & 248) == 240) {
                            let codePoint = (c & 7) << 18 | (bytes[i++] & 63) << 12 | (bytes[i++] & 63) << 6 | bytes[i++] & 63;
                            if (codePoint > 65535) {
                                codePoint -= 65536;
                                value += fromCharCode(codePoint >> 10 & 1023 | 55296);
                                codePoint = 56320 | codePoint & 1023;
                            }
                            value += fromCharCode(codePoint);
                        }
                    }
                    value[0];
                    break;
                }
            // Array begin
            case 91 /* OpenBracket */ :
                {
                    value = [];
                    propertyStack.push(property);
                    objectStack.push(object);
                    stateStack.push(state);
                    property = null;
                    object = value;
                    state = 1 /* Array */ ;
                    continue;
                }
            // Object begin
            case 123 /* OpenBrace */ :
                {
                    value = {};
                    propertyStack.push(property);
                    objectStack.push(object);
                    stateStack.push(state);
                    property = null;
                    object = value;
                    state = 2 /* Object */ ;
                    continue;
                }
            // Array end
            case 93 /* CloseBracket */ :
                {
                    if (state !== 1 /* Array */ ) {
                        throwSyntaxError(bytes, --i);
                    }
                    value = object;
                    property = propertyStack.pop();
                    object = objectStack.pop();
                    state = stateStack.pop();
                    break;
                }
            // Object end
            case 125 /* CloseBrace */ :
                {
                    if (state !== 2 /* Object */ ) {
                        throwSyntaxError(bytes, --i);
                    }
                    value = object;
                    property = propertyStack.pop();
                    object = objectStack.pop();
                    state = stateStack.pop();
                    break;
                }
            default:
                {
                    throwSyntaxError(bytes, --i);
                }
        }
        c = bytes[i];
        while(c <= 32 /* Space */ ){
            c = bytes[++i];
        }
        switch(state){
            case 0 /* TopLevel */ :
                {
                    if (i === length) {
                        return value;
                    }
                    break;
                }
            case 1 /* Array */ :
                {
                    object.push(value);
                    if (c === 44 /* Comma */ ) {
                        i++;
                        continue;
                    }
                    if (c === 93 /* CloseBracket */ ) {
                        continue;
                    }
                    break;
                }
            case 2 /* Object */ :
                {
                    if (property === null) {
                        property = value;
                        if (c === 58 /* Colon */ ) {
                            i++;
                            continue;
                        }
                    } else {
                        object[property] = value;
                        property = null;
                        if (c === 44 /* Comma */ ) {
                            i++;
                            continue;
                        }
                        if (c === 125 /* CloseBrace */ ) {
                            continue;
                        }
                    }
                    break;
                }
        }
        break;
    }
    throwSyntaxError(bytes, i);
}
// lib/shared/common.ts
var quote = JSON.stringify;
var buildLogLevelDefault = "warning";
var transformLogLevelDefault = "silent";
function validateAndJoinStringArray(values, what) {
    const toJoin = [];
    for (const value of values){
        validateStringValue(value, what);
        if (value.indexOf(",") >= 0) throw new Error(`Invalid ${what}: ${value}`);
        toJoin.push(value);
    }
    return toJoin.join(",");
}
var canBeAnything = ()=>null;
var mustBeBoolean = (value)=>typeof value === "boolean" ? null : "a boolean";
var mustBeString = (value)=>typeof value === "string" ? null : "a string";
var mustBeRegExp = (value)=>value instanceof RegExp ? null : "a RegExp object";
var mustBeInteger = (value)=>typeof value === "number" && value === (value | 0) ? null : "an integer";
var mustBeValidPortNumber = (value)=>typeof value === "number" && value === (value | 0) && value >= 0 && value <= 65535 ? null : "a valid port number";
var mustBeFunction = (value)=>typeof value === "function" ? null : "a function";
var mustBeArray = (value)=>Array.isArray(value) ? null : "an array";
var mustBeArrayOfStrings = (value)=>Array.isArray(value) && value.every((x)=>typeof x === "string") ? null : "an array of strings";
var mustBeObject = (value)=>typeof value === "object" && value !== null && !Array.isArray(value) ? null : "an object";
var mustBeEntryPoints = (value)=>typeof value === "object" && value !== null ? null : "an array or an object";
var mustBeWebAssemblyModule = (value)=>value instanceof WebAssembly.Module ? null : "a WebAssembly.Module";
var mustBeObjectOrNull = (value)=>typeof value === "object" && !Array.isArray(value) ? null : "an object or null";
var mustBeStringOrBoolean = (value)=>typeof value === "string" || typeof value === "boolean" ? null : "a string or a boolean";
var mustBeStringOrObject = (value)=>typeof value === "string" || typeof value === "object" && value !== null && !Array.isArray(value) ? null : "a string or an object";
var mustBeStringOrArrayOfStrings = (value)=>typeof value === "string" || Array.isArray(value) && value.every((x)=>typeof x === "string") ? null : "a string or an array of strings";
var mustBeStringOrUint8Array = (value)=>typeof value === "string" || value instanceof Uint8Array ? null : "a string or a Uint8Array";
var mustBeStringOrURL = (value)=>typeof value === "string" || value instanceof URL ? null : "a string or a URL";
function getFlag(object, keys, key, mustBeFn) {
    let value = object[key];
    keys[key + ""] = true;
    if (value === void 0) return void 0;
    let mustBe = mustBeFn(value);
    if (mustBe !== null) throw new Error(`${quote(key)} must be ${mustBe}`);
    return value;
}
function checkForInvalidFlags(object, keys, where) {
    for(let key in object){
        if (!(key in keys)) {
            throw new Error(`Invalid option ${where}: ${quote(key)}`);
        }
    }
}
function validateInitializeOptions(options) {
    let keys = /* @__PURE__ */ Object.create(null);
    let wasmURL = getFlag(options, keys, "wasmURL", mustBeStringOrURL);
    let wasmModule = getFlag(options, keys, "wasmModule", mustBeWebAssemblyModule);
    let worker = getFlag(options, keys, "worker", mustBeBoolean);
    checkForInvalidFlags(options, keys, "in initialize() call");
    return {
        wasmURL,
        wasmModule,
        worker
    };
}
function validateMangleCache(mangleCache) {
    let validated;
    if (mangleCache !== void 0) {
        validated = /* @__PURE__ */ Object.create(null);
        for(let key in mangleCache){
            let value = mangleCache[key];
            if (typeof value === "string" || value === false) {
                validated[key] = value;
            } else {
                throw new Error(`Expected ${quote(key)} in mangle cache to map to either a string or false`);
            }
        }
    }
    return validated;
}
function pushLogFlags(flags, options, keys, isTTY2, logLevelDefault) {
    let color = getFlag(options, keys, "color", mustBeBoolean);
    let logLevel = getFlag(options, keys, "logLevel", mustBeString);
    let logLimit = getFlag(options, keys, "logLimit", mustBeInteger);
    if (color !== void 0) flags.push(`--color=${color}`);
    else if (isTTY2) flags.push(`--color=true`);
    flags.push(`--log-level=${logLevel || logLevelDefault}`);
    flags.push(`--log-limit=${logLimit || 0}`);
}
function validateStringValue(value, what, key) {
    if (typeof value !== "string") {
        throw new Error(`Expected value for ${what}${key !== void 0 ? " " + quote(key) : ""} to be a string, got ${typeof value} instead`);
    }
    return value;
}
function pushCommonFlags(flags, options, keys) {
    let legalComments = getFlag(options, keys, "legalComments", mustBeString);
    let sourceRoot = getFlag(options, keys, "sourceRoot", mustBeString);
    let sourcesContent = getFlag(options, keys, "sourcesContent", mustBeBoolean);
    let target = getFlag(options, keys, "target", mustBeStringOrArrayOfStrings);
    let format = getFlag(options, keys, "format", mustBeString);
    let globalName = getFlag(options, keys, "globalName", mustBeString);
    let mangleProps = getFlag(options, keys, "mangleProps", mustBeRegExp);
    let reserveProps = getFlag(options, keys, "reserveProps", mustBeRegExp);
    let mangleQuoted = getFlag(options, keys, "mangleQuoted", mustBeBoolean);
    let minify = getFlag(options, keys, "minify", mustBeBoolean);
    let minifySyntax = getFlag(options, keys, "minifySyntax", mustBeBoolean);
    let minifyWhitespace = getFlag(options, keys, "minifyWhitespace", mustBeBoolean);
    let minifyIdentifiers = getFlag(options, keys, "minifyIdentifiers", mustBeBoolean);
    let lineLimit = getFlag(options, keys, "lineLimit", mustBeInteger);
    let drop = getFlag(options, keys, "drop", mustBeArrayOfStrings);
    let dropLabels = getFlag(options, keys, "dropLabels", mustBeArrayOfStrings);
    let charset = getFlag(options, keys, "charset", mustBeString);
    let treeShaking = getFlag(options, keys, "treeShaking", mustBeBoolean);
    let ignoreAnnotations = getFlag(options, keys, "ignoreAnnotations", mustBeBoolean);
    let jsx = getFlag(options, keys, "jsx", mustBeString);
    let jsxFactory = getFlag(options, keys, "jsxFactory", mustBeString);
    let jsxFragment = getFlag(options, keys, "jsxFragment", mustBeString);
    let jsxImportSource = getFlag(options, keys, "jsxImportSource", mustBeString);
    let jsxDev = getFlag(options, keys, "jsxDev", mustBeBoolean);
    let jsxSideEffects = getFlag(options, keys, "jsxSideEffects", mustBeBoolean);
    let define = getFlag(options, keys, "define", mustBeObject);
    let logOverride = getFlag(options, keys, "logOverride", mustBeObject);
    let supported = getFlag(options, keys, "supported", mustBeObject);
    let pure = getFlag(options, keys, "pure", mustBeArrayOfStrings);
    let keepNames = getFlag(options, keys, "keepNames", mustBeBoolean);
    let platform = getFlag(options, keys, "platform", mustBeString);
    let tsconfigRaw = getFlag(options, keys, "tsconfigRaw", mustBeStringOrObject);
    let absPaths = getFlag(options, keys, "absPaths", mustBeArrayOfStrings);
    if (legalComments) flags.push(`--legal-comments=${legalComments}`);
    if (sourceRoot !== void 0) flags.push(`--source-root=${sourceRoot}`);
    if (sourcesContent !== void 0) flags.push(`--sources-content=${sourcesContent}`);
    if (target) flags.push(`--target=${validateAndJoinStringArray(Array.isArray(target) ? target : [
        target
    ], "target")}`);
    if (format) flags.push(`--format=${format}`);
    if (globalName) flags.push(`--global-name=${globalName}`);
    if (platform) flags.push(`--platform=${platform}`);
    if (tsconfigRaw) flags.push(`--tsconfig-raw=${typeof tsconfigRaw === "string" ? tsconfigRaw : JSON.stringify(tsconfigRaw)}`);
    if (minify) flags.push("--minify");
    if (minifySyntax) flags.push("--minify-syntax");
    if (minifyWhitespace) flags.push("--minify-whitespace");
    if (minifyIdentifiers) flags.push("--minify-identifiers");
    if (lineLimit) flags.push(`--line-limit=${lineLimit}`);
    if (charset) flags.push(`--charset=${charset}`);
    if (treeShaking !== void 0) flags.push(`--tree-shaking=${treeShaking}`);
    if (ignoreAnnotations) flags.push(`--ignore-annotations`);
    if (drop) for (let what of drop)flags.push(`--drop:${validateStringValue(what, "drop")}`);
    if (dropLabels) flags.push(`--drop-labels=${validateAndJoinStringArray(dropLabels, "drop label")}`);
    if (absPaths) flags.push(`--abs-paths=${validateAndJoinStringArray(absPaths, "abs paths")}`);
    if (mangleProps) flags.push(`--mangle-props=${jsRegExpToGoRegExp(mangleProps)}`);
    if (reserveProps) flags.push(`--reserve-props=${jsRegExpToGoRegExp(reserveProps)}`);
    if (mangleQuoted !== void 0) flags.push(`--mangle-quoted=${mangleQuoted}`);
    if (jsx) flags.push(`--jsx=${jsx}`);
    if (jsxFactory) flags.push(`--jsx-factory=${jsxFactory}`);
    if (jsxFragment) flags.push(`--jsx-fragment=${jsxFragment}`);
    if (jsxImportSource) flags.push(`--jsx-import-source=${jsxImportSource}`);
    if (jsxDev) flags.push(`--jsx-dev`);
    if (jsxSideEffects) flags.push(`--jsx-side-effects`);
    if (define) {
        for(let key in define){
            if (key.indexOf("=") >= 0) throw new Error(`Invalid define: ${key}`);
            flags.push(`--define:${key}=${validateStringValue(define[key], "define", key)}`);
        }
    }
    if (logOverride) {
        for(let key in logOverride){
            if (key.indexOf("=") >= 0) throw new Error(`Invalid log override: ${key}`);
            flags.push(`--log-override:${key}=${validateStringValue(logOverride[key], "log override", key)}`);
        }
    }
    if (supported) {
        for(let key in supported){
            if (key.indexOf("=") >= 0) throw new Error(`Invalid supported: ${key}`);
            const value = supported[key];
            if (typeof value !== "boolean") throw new Error(`Expected value for supported ${quote(key)} to be a boolean, got ${typeof value} instead`);
            flags.push(`--supported:${key}=${value}`);
        }
    }
    if (pure) for (let fn of pure)flags.push(`--pure:${validateStringValue(fn, "pure")}`);
    if (keepNames) flags.push(`--keep-names`);
}
function flagsForBuildOptions(callName, options, isTTY2, logLevelDefault, writeDefault) {
    var _a2;
    let flags = [];
    let entries = [];
    let keys = /* @__PURE__ */ Object.create(null);
    let stdinContents = null;
    let stdinResolveDir = null;
    pushLogFlags(flags, options, keys, isTTY2, logLevelDefault);
    pushCommonFlags(flags, options, keys);
    let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
    let bundle = getFlag(options, keys, "bundle", mustBeBoolean);
    let splitting = getFlag(options, keys, "splitting", mustBeBoolean);
    let preserveSymlinks = getFlag(options, keys, "preserveSymlinks", mustBeBoolean);
    let metafile = getFlag(options, keys, "metafile", mustBeBoolean);
    let outfile = getFlag(options, keys, "outfile", mustBeString);
    let outdir = getFlag(options, keys, "outdir", mustBeString);
    let outbase = getFlag(options, keys, "outbase", mustBeString);
    let tsconfig = getFlag(options, keys, "tsconfig", mustBeString);
    let resolveExtensions = getFlag(options, keys, "resolveExtensions", mustBeArrayOfStrings);
    let nodePathsInput = getFlag(options, keys, "nodePaths", mustBeArrayOfStrings);
    let mainFields = getFlag(options, keys, "mainFields", mustBeArrayOfStrings);
    let conditions = getFlag(options, keys, "conditions", mustBeArrayOfStrings);
    let external = getFlag(options, keys, "external", mustBeArrayOfStrings);
    let packages = getFlag(options, keys, "packages", mustBeString);
    let alias = getFlag(options, keys, "alias", mustBeObject);
    let loader = getFlag(options, keys, "loader", mustBeObject);
    let outExtension = getFlag(options, keys, "outExtension", mustBeObject);
    let publicPath = getFlag(options, keys, "publicPath", mustBeString);
    let entryNames = getFlag(options, keys, "entryNames", mustBeString);
    let chunkNames = getFlag(options, keys, "chunkNames", mustBeString);
    let assetNames = getFlag(options, keys, "assetNames", mustBeString);
    let inject = getFlag(options, keys, "inject", mustBeArrayOfStrings);
    let banner = getFlag(options, keys, "banner", mustBeObject);
    let footer = getFlag(options, keys, "footer", mustBeObject);
    let entryPoints = getFlag(options, keys, "entryPoints", mustBeEntryPoints);
    let absWorkingDir = getFlag(options, keys, "absWorkingDir", mustBeString);
    let stdin = getFlag(options, keys, "stdin", mustBeObject);
    let write = (_a2 = getFlag(options, keys, "write", mustBeBoolean)) != null ? _a2 : writeDefault;
    let allowOverwrite = getFlag(options, keys, "allowOverwrite", mustBeBoolean);
    let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
    keys.plugins = true;
    checkForInvalidFlags(options, keys, `in ${callName}() call`);
    if (sourcemap) flags.push(`--sourcemap${sourcemap === true ? "" : `=${sourcemap}`}`);
    if (bundle) flags.push("--bundle");
    if (allowOverwrite) flags.push("--allow-overwrite");
    if (splitting) flags.push("--splitting");
    if (preserveSymlinks) flags.push("--preserve-symlinks");
    if (metafile) flags.push(`--metafile`);
    if (outfile) flags.push(`--outfile=${outfile}`);
    if (outdir) flags.push(`--outdir=${outdir}`);
    if (outbase) flags.push(`--outbase=${outbase}`);
    if (tsconfig) flags.push(`--tsconfig=${tsconfig}`);
    if (packages) flags.push(`--packages=${packages}`);
    if (resolveExtensions) flags.push(`--resolve-extensions=${validateAndJoinStringArray(resolveExtensions, "resolve extension")}`);
    if (publicPath) flags.push(`--public-path=${publicPath}`);
    if (entryNames) flags.push(`--entry-names=${entryNames}`);
    if (chunkNames) flags.push(`--chunk-names=${chunkNames}`);
    if (assetNames) flags.push(`--asset-names=${assetNames}`);
    if (mainFields) flags.push(`--main-fields=${validateAndJoinStringArray(mainFields, "main field")}`);
    if (conditions) flags.push(`--conditions=${validateAndJoinStringArray(conditions, "condition")}`);
    if (external) for (let name of external)flags.push(`--external:${validateStringValue(name, "external")}`);
    if (alias) {
        for(let old in alias){
            if (old.indexOf("=") >= 0) throw new Error(`Invalid package name in alias: ${old}`);
            flags.push(`--alias:${old}=${validateStringValue(alias[old], "alias", old)}`);
        }
    }
    if (banner) {
        for(let type in banner){
            if (type.indexOf("=") >= 0) throw new Error(`Invalid banner file type: ${type}`);
            flags.push(`--banner:${type}=${validateStringValue(banner[type], "banner", type)}`);
        }
    }
    if (footer) {
        for(let type in footer){
            if (type.indexOf("=") >= 0) throw new Error(`Invalid footer file type: ${type}`);
            flags.push(`--footer:${type}=${validateStringValue(footer[type], "footer", type)}`);
        }
    }
    if (inject) for (let path3 of inject)flags.push(`--inject:${validateStringValue(path3, "inject")}`);
    if (loader) {
        for(let ext in loader){
            if (ext.indexOf("=") >= 0) throw new Error(`Invalid loader extension: ${ext}`);
            flags.push(`--loader:${ext}=${validateStringValue(loader[ext], "loader", ext)}`);
        }
    }
    if (outExtension) {
        for(let ext in outExtension){
            if (ext.indexOf("=") >= 0) throw new Error(`Invalid out extension: ${ext}`);
            flags.push(`--out-extension:${ext}=${validateStringValue(outExtension[ext], "out extension", ext)}`);
        }
    }
    if (entryPoints) {
        if (Array.isArray(entryPoints)) {
            for(let i = 0, n = entryPoints.length; i < n; i++){
                let entryPoint = entryPoints[i];
                if (typeof entryPoint === "object" && entryPoint !== null) {
                    let entryPointKeys = /* @__PURE__ */ Object.create(null);
                    let input = getFlag(entryPoint, entryPointKeys, "in", mustBeString);
                    let output = getFlag(entryPoint, entryPointKeys, "out", mustBeString);
                    checkForInvalidFlags(entryPoint, entryPointKeys, "in entry point at index " + i);
                    if (input === void 0) throw new Error('Missing property "in" for entry point at index ' + i);
                    if (output === void 0) throw new Error('Missing property "out" for entry point at index ' + i);
                    entries.push([
                        output,
                        input
                    ]);
                } else {
                    entries.push([
                        "",
                        validateStringValue(entryPoint, "entry point at index " + i)
                    ]);
                }
            }
        } else {
            for(let key in entryPoints){
                entries.push([
                    key,
                    validateStringValue(entryPoints[key], "entry point", key)
                ]);
            }
        }
    }
    if (stdin) {
        let stdinKeys = /* @__PURE__ */ Object.create(null);
        let contents = getFlag(stdin, stdinKeys, "contents", mustBeStringOrUint8Array);
        let resolveDir = getFlag(stdin, stdinKeys, "resolveDir", mustBeString);
        let sourcefile = getFlag(stdin, stdinKeys, "sourcefile", mustBeString);
        let loader2 = getFlag(stdin, stdinKeys, "loader", mustBeString);
        checkForInvalidFlags(stdin, stdinKeys, 'in "stdin" object');
        if (sourcefile) flags.push(`--sourcefile=${sourcefile}`);
        if (loader2) flags.push(`--loader=${loader2}`);
        if (resolveDir) stdinResolveDir = resolveDir;
        if (typeof contents === "string") stdinContents = encodeUTF8(contents);
        else if (contents instanceof Uint8Array) stdinContents = contents;
    }
    let nodePaths = [];
    if (nodePathsInput) {
        for (let value of nodePathsInput){
            value += "";
            nodePaths.push(value);
        }
    }
    return {
        entries,
        flags,
        write,
        stdinContents,
        stdinResolveDir,
        absWorkingDir,
        nodePaths,
        mangleCache: validateMangleCache(mangleCache)
    };
}
function flagsForTransformOptions(callName, options, isTTY2, logLevelDefault) {
    let flags = [];
    let keys = /* @__PURE__ */ Object.create(null);
    pushLogFlags(flags, options, keys, isTTY2, logLevelDefault);
    pushCommonFlags(flags, options, keys);
    let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
    let sourcefile = getFlag(options, keys, "sourcefile", mustBeString);
    let loader = getFlag(options, keys, "loader", mustBeString);
    let banner = getFlag(options, keys, "banner", mustBeString);
    let footer = getFlag(options, keys, "footer", mustBeString);
    let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
    checkForInvalidFlags(options, keys, `in ${callName}() call`);
    if (sourcemap) flags.push(`--sourcemap=${sourcemap === true ? "external" : sourcemap}`);
    if (sourcefile) flags.push(`--sourcefile=${sourcefile}`);
    if (loader) flags.push(`--loader=${loader}`);
    if (banner) flags.push(`--banner=${banner}`);
    if (footer) flags.push(`--footer=${footer}`);
    return {
        flags,
        mangleCache: validateMangleCache(mangleCache)
    };
}
function createChannel(streamIn) {
    const requestCallbacksByKey = {};
    const closeData = {
        didClose: false,
        reason: ""
    };
    let responseCallbacks = {};
    let nextRequestID = 0;
    let nextBuildKey = 0;
    let stdout = new Uint8Array(16 * 1024);
    let stdoutUsed = 0;
    let readFromStdout = (chunk)=>{
        let limit = stdoutUsed + chunk.length;
        if (limit > stdout.length) {
            let swap = new Uint8Array(limit * 2);
            swap.set(stdout);
            stdout = swap;
        }
        stdout.set(chunk, stdoutUsed);
        stdoutUsed += chunk.length;
        let offset = 0;
        while(offset + 4 <= stdoutUsed){
            let length = readUInt32LE(stdout, offset);
            if (offset + 4 + length > stdoutUsed) {
                break;
            }
            offset += 4;
            handleIncomingPacket(stdout.subarray(offset, offset + length));
            offset += length;
        }
        if (offset > 0) {
            stdout.copyWithin(0, offset, stdoutUsed);
            stdoutUsed -= offset;
        }
    };
    let afterClose = (error)=>{
        closeData.didClose = true;
        if (error) closeData.reason = ": " + (error.message || error);
        const text = "The service was stopped" + closeData.reason;
        for(let id in responseCallbacks){
            responseCallbacks[id](text, null);
        }
        responseCallbacks = {};
    };
    let sendRequest = (refs, value, callback)=>{
        if (closeData.didClose) return callback("The service is no longer running" + closeData.reason, null);
        let id = nextRequestID++;
        responseCallbacks[id] = (error, response)=>{
            try {
                callback(error, response);
            } finally{
                if (refs) refs.unref();
            }
        };
        if (refs) refs.ref();
        streamIn.writeToStdin(encodePacket({
            id,
            isRequest: true,
            value
        }));
    };
    let sendResponse = (id, value)=>{
        if (closeData.didClose) throw new Error("The service is no longer running" + closeData.reason);
        streamIn.writeToStdin(encodePacket({
            id,
            isRequest: false,
            value
        }));
    };
    let handleRequest = async (id, request)=>{
        try {
            if (request.command === "ping") {
                sendResponse(id, {});
                return;
            }
            if (typeof request.key === "number") {
                const requestCallbacks = requestCallbacksByKey[request.key];
                if (!requestCallbacks) {
                    return;
                }
                const callback = requestCallbacks[request.command];
                if (callback) {
                    await callback(id, request);
                    return;
                }
            }
            throw new Error(`Invalid command: ` + request.command);
        } catch (e) {
            const errors = [
                extractErrorMessageV8(e, streamIn, null, void 0, "")
            ];
            try {
                sendResponse(id, {
                    errors
                });
            } catch  {}
        }
    };
    let isFirstPacket = true;
    let handleIncomingPacket = (bytes)=>{
        if (isFirstPacket) {
            isFirstPacket = false;
            let binaryVersion = String.fromCharCode(...bytes);
            if (binaryVersion !== "0.27.5") {
                throw new Error(`Cannot start service: Host version "${"0.27.5"}" does not match binary version ${quote(binaryVersion)}`);
            }
            return;
        }
        let packet = decodePacket(bytes);
        if (packet.isRequest) {
            handleRequest(packet.id, packet.value);
        } else {
            let callback = responseCallbacks[packet.id];
            delete responseCallbacks[packet.id];
            if (packet.value.error) callback(packet.value.error, {});
            else callback(null, packet.value);
        }
    };
    let buildOrContext = ({ callName, refs, options, isTTY: isTTY2, defaultWD: defaultWD2, callback })=>{
        let refCount = 0;
        const buildKey = nextBuildKey++;
        const requestCallbacks = {};
        const buildRefs = {
            ref () {
                if (++refCount === 1) {
                    if (refs) refs.ref();
                }
            },
            unref () {
                if (--refCount === 0) {
                    delete requestCallbacksByKey[buildKey];
                    if (refs) refs.unref();
                }
            }
        };
        requestCallbacksByKey[buildKey] = requestCallbacks;
        buildRefs.ref();
        buildOrContextImpl(callName, buildKey, sendRequest, sendResponse, buildRefs, streamIn, requestCallbacks, options, isTTY2, defaultWD2, (err, res)=>{
            try {
                callback(err, res);
            } finally{
                buildRefs.unref();
            }
        });
    };
    let transform2 = ({ callName, refs, input, options, isTTY: isTTY2, fs: fs3, callback })=>{
        const details = createObjectStash();
        let start = (inputPath)=>{
            try {
                if (typeof input !== "string" && !(input instanceof Uint8Array)) throw new Error('The input to "transform" must be a string or a Uint8Array');
                let { flags, mangleCache } = flagsForTransformOptions(callName, options, isTTY2, transformLogLevelDefault);
                let request = {
                    command: "transform",
                    flags,
                    inputFS: inputPath !== null,
                    input: inputPath !== null ? encodeUTF8(inputPath) : typeof input === "string" ? encodeUTF8(input) : input
                };
                if (mangleCache) request.mangleCache = mangleCache;
                sendRequest(refs, request, (error, response)=>{
                    if (error) return callback(new Error(error), null);
                    let errors = replaceDetailsInMessages(response.errors, details);
                    let warnings = replaceDetailsInMessages(response.warnings, details);
                    let outstanding = 1;
                    let next = ()=>{
                        if (--outstanding === 0) {
                            let result = {
                                warnings,
                                code: response.code,
                                map: response.map,
                                mangleCache: void 0,
                                legalComments: void 0
                            };
                            if ("legalComments" in response) result.legalComments = response == null ? void 0 : response.legalComments;
                            if (response.mangleCache) result.mangleCache = response == null ? void 0 : response.mangleCache;
                            callback(null, result);
                        }
                    };
                    if (errors.length > 0) return callback(failureErrorWithLog("Transform failed", errors, warnings), null);
                    if (response.codeFS) {
                        outstanding++;
                        fs3.readFile(response.code, (err, contents)=>{
                            if (err !== null) {
                                callback(err, null);
                            } else {
                                response.code = contents;
                                next();
                            }
                        });
                    }
                    if (response.mapFS) {
                        outstanding++;
                        fs3.readFile(response.map, (err, contents)=>{
                            if (err !== null) {
                                callback(err, null);
                            } else {
                                response.map = contents;
                                next();
                            }
                        });
                    }
                    next();
                });
            } catch (e) {
                let flags = [];
                try {
                    pushLogFlags(flags, options, {}, isTTY2, transformLogLevelDefault);
                } catch  {}
                const error = extractErrorMessageV8(e, streamIn, details, void 0, "");
                sendRequest(refs, {
                    command: "error",
                    flags,
                    error
                }, ()=>{
                    error.detail = details.load(error.detail);
                    callback(failureErrorWithLog("Transform failed", [
                        error
                    ], []), null);
                });
            }
        };
        if ((typeof input === "string" || input instanceof Uint8Array) && input.length > 1024 * 1024) {
            let next = start;
            start = ()=>fs3.writeFile(input, next);
        }
        start(null);
    };
    let formatMessages2 = ({ callName, refs, messages, options, callback })=>{
        if (!options) throw new Error(`Missing second argument in ${callName}() call`);
        let keys = {};
        let kind = getFlag(options, keys, "kind", mustBeString);
        let color = getFlag(options, keys, "color", mustBeBoolean);
        let terminalWidth = getFlag(options, keys, "terminalWidth", mustBeInteger);
        checkForInvalidFlags(options, keys, `in ${callName}() call`);
        if (kind === void 0) throw new Error(`Missing "kind" in ${callName}() call`);
        if (kind !== "error" && kind !== "warning") throw new Error(`Expected "kind" to be "error" or "warning" in ${callName}() call`);
        let request = {
            command: "format-msgs",
            messages: sanitizeMessages(messages, "messages", null, "", terminalWidth),
            isWarning: kind === "warning"
        };
        if (color !== void 0) request.color = color;
        if (terminalWidth !== void 0) request.terminalWidth = terminalWidth;
        sendRequest(refs, request, (error, response)=>{
            if (error) return callback(new Error(error), null);
            callback(null, response.messages);
        });
    };
    let analyzeMetafile2 = ({ callName, refs, metafile, options, callback })=>{
        if (options === void 0) options = {};
        let keys = {};
        let color = getFlag(options, keys, "color", mustBeBoolean);
        let verbose = getFlag(options, keys, "verbose", mustBeBoolean);
        checkForInvalidFlags(options, keys, `in ${callName}() call`);
        let request = {
            command: "analyze-metafile",
            metafile
        };
        if (color !== void 0) request.color = color;
        if (verbose !== void 0) request.verbose = verbose;
        sendRequest(refs, request, (error, response)=>{
            if (error) return callback(new Error(error), null);
            callback(null, response.result);
        });
    };
    return {
        readFromStdout,
        afterClose,
        service: {
            buildOrContext,
            transform: transform2,
            formatMessages: formatMessages2,
            analyzeMetafile: analyzeMetafile2
        }
    };
}
function buildOrContextImpl(callName, buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, options, isTTY2, defaultWD2, callback) {
    const details = createObjectStash();
    const isContext = callName === "context";
    const handleError = (e, pluginName)=>{
        const flags = [];
        try {
            pushLogFlags(flags, options, {}, isTTY2, buildLogLevelDefault);
        } catch  {}
        const message = extractErrorMessageV8(e, streamIn, details, void 0, pluginName);
        sendRequest(refs, {
            command: "error",
            flags,
            error: message
        }, ()=>{
            message.detail = details.load(message.detail);
            callback(failureErrorWithLog(isContext ? "Context failed" : "Build failed", [
                message
            ], []), null);
        });
    };
    let plugins;
    if (typeof options === "object") {
        const value = options.plugins;
        if (value !== void 0) {
            if (!Array.isArray(value)) return handleError(new Error(`"plugins" must be an array`), "");
            plugins = value;
        }
    }
    if (plugins && plugins.length > 0) {
        if (streamIn.isSync) return handleError(new Error("Cannot use plugins in synchronous API calls"), "");
        handlePlugins(buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, options, plugins, details).then((result)=>{
            if (!result.ok) return handleError(result.error, result.pluginName);
            try {
                buildOrContextContinue(result.requestPlugins, result.runOnEndCallbacks, result.scheduleOnDisposeCallbacks);
            } catch (e) {
                handleError(e, "");
            }
        }, (e)=>handleError(e, ""));
        return;
    }
    try {
        buildOrContextContinue(null, (result, done)=>done([], []), ()=>{});
    } catch (e) {
        handleError(e, "");
    }
    function buildOrContextContinue(requestPlugins, runOnEndCallbacks, scheduleOnDisposeCallbacks) {
        const writeDefault = streamIn.hasFS;
        const { entries, flags, write, stdinContents, stdinResolveDir, absWorkingDir, nodePaths, mangleCache } = flagsForBuildOptions(callName, options, isTTY2, buildLogLevelDefault, writeDefault);
        if (write && !streamIn.hasFS) throw new Error(`The "write" option is unavailable in this environment`);
        const request = {
            command: "build",
            key: buildKey,
            entries,
            flags,
            write,
            stdinContents,
            stdinResolveDir,
            absWorkingDir: absWorkingDir || defaultWD2,
            nodePaths,
            context: isContext
        };
        if (requestPlugins) request.plugins = requestPlugins;
        if (mangleCache) request.mangleCache = mangleCache;
        const buildResponseToResult = (response, callback2)=>{
            const result = {
                errors: replaceDetailsInMessages(response.errors, details),
                warnings: replaceDetailsInMessages(response.warnings, details),
                outputFiles: void 0,
                metafile: void 0,
                mangleCache: void 0
            };
            const originalErrors = result.errors.slice();
            const originalWarnings = result.warnings.slice();
            if (response.outputFiles) result.outputFiles = response.outputFiles.map(convertOutputFiles);
            if (response.metafile && response.metafile.length) result.metafile = parseJSON(response.metafile);
            if (response.mangleCache) result.mangleCache = response.mangleCache;
            if (response.writeToStdout !== void 0) console.log(decodeUTF8(response.writeToStdout).replace(/\n$/, ""));
            runOnEndCallbacks(result, (onEndErrors, onEndWarnings)=>{
                if (originalErrors.length > 0 || onEndErrors.length > 0) {
                    const error = failureErrorWithLog("Build failed", originalErrors.concat(onEndErrors), originalWarnings.concat(onEndWarnings));
                    return callback2(error, null, onEndErrors, onEndWarnings);
                }
                callback2(null, result, onEndErrors, onEndWarnings);
            });
        };
        let latestResultPromise;
        let provideLatestResult;
        if (isContext) requestCallbacks["on-end"] = (id, request2)=>new Promise((resolve)=>{
                buildResponseToResult(request2, (err, result, onEndErrors, onEndWarnings)=>{
                    const response = {
                        errors: onEndErrors,
                        warnings: onEndWarnings
                    };
                    if (provideLatestResult) provideLatestResult(err, result);
                    latestResultPromise = void 0;
                    provideLatestResult = void 0;
                    sendResponse(id, response);
                    resolve();
                });
            });
        sendRequest(refs, request, (error, response)=>{
            if (error) return callback(new Error(error), null);
            if (!isContext) {
                return buildResponseToResult(response, (err, res)=>{
                    scheduleOnDisposeCallbacks();
                    return callback(err, res);
                });
            }
            if (response.errors.length > 0) {
                return callback(failureErrorWithLog("Context failed", response.errors, response.warnings), null);
            }
            let didDispose = false;
            const result = {
                rebuild: ()=>{
                    if (!latestResultPromise) latestResultPromise = new Promise((resolve, reject)=>{
                        let settlePromise;
                        provideLatestResult = (err, result2)=>{
                            if (!settlePromise) settlePromise = ()=>err ? reject(err) : resolve(result2);
                        };
                        const triggerAnotherBuild = ()=>{
                            const request2 = {
                                command: "rebuild",
                                key: buildKey
                            };
                            sendRequest(refs, request2, (error2, response2)=>{
                                if (error2) {
                                    reject(new Error(error2));
                                } else if (settlePromise) {
                                    settlePromise();
                                } else {
                                    triggerAnotherBuild();
                                }
                            });
                        };
                        triggerAnotherBuild();
                    });
                    return latestResultPromise;
                },
                watch: (options2 = {})=>new Promise((resolve, reject)=>{
                        if (!streamIn.hasFS) throw new Error(`Cannot use the "watch" API in this environment`);
                        const keys = {};
                        const delay = getFlag(options2, keys, "delay", mustBeInteger);
                        checkForInvalidFlags(options2, keys, `in watch() call`);
                        const request2 = {
                            command: "watch",
                            key: buildKey
                        };
                        if (delay) request2.delay = delay;
                        sendRequest(refs, request2, (error2)=>{
                            if (error2) reject(new Error(error2));
                            else resolve(void 0);
                        });
                    }),
                serve: (options2 = {})=>new Promise((resolve, reject)=>{
                        if (!streamIn.hasFS) throw new Error(`Cannot use the "serve" API in this environment`);
                        const keys = {};
                        const port = getFlag(options2, keys, "port", mustBeValidPortNumber);
                        const host = getFlag(options2, keys, "host", mustBeString);
                        const servedir = getFlag(options2, keys, "servedir", mustBeString);
                        const keyfile = getFlag(options2, keys, "keyfile", mustBeString);
                        const certfile = getFlag(options2, keys, "certfile", mustBeString);
                        const fallback = getFlag(options2, keys, "fallback", mustBeString);
                        const cors = getFlag(options2, keys, "cors", mustBeObject);
                        const onRequest = getFlag(options2, keys, "onRequest", mustBeFunction);
                        checkForInvalidFlags(options2, keys, `in serve() call`);
                        const request2 = {
                            command: "serve",
                            key: buildKey,
                            onRequest: !!onRequest
                        };
                        if (port !== void 0) request2.port = port;
                        if (host !== void 0) request2.host = host;
                        if (servedir !== void 0) request2.servedir = servedir;
                        if (keyfile !== void 0) request2.keyfile = keyfile;
                        if (certfile !== void 0) request2.certfile = certfile;
                        if (fallback !== void 0) request2.fallback = fallback;
                        if (cors) {
                            const corsKeys = {};
                            const origin = getFlag(cors, corsKeys, "origin", mustBeStringOrArrayOfStrings);
                            checkForInvalidFlags(cors, corsKeys, `on "cors" object`);
                            if (Array.isArray(origin)) request2.corsOrigin = origin;
                            else if (origin !== void 0) request2.corsOrigin = [
                                origin
                            ];
                        }
                        sendRequest(refs, request2, (error2, response2)=>{
                            if (error2) return reject(new Error(error2));
                            if (onRequest) {
                                requestCallbacks["serve-request"] = (id, request3)=>{
                                    onRequest(request3.args);
                                    sendResponse(id, {});
                                };
                            }
                            resolve(response2);
                        });
                    }),
                cancel: ()=>new Promise((resolve)=>{
                        if (didDispose) return resolve();
                        const request2 = {
                            command: "cancel",
                            key: buildKey
                        };
                        sendRequest(refs, request2, ()=>{
                            resolve();
                        });
                    }),
                dispose: ()=>new Promise((resolve)=>{
                        if (didDispose) return resolve();
                        didDispose = true;
                        const request2 = {
                            command: "dispose",
                            key: buildKey
                        };
                        sendRequest(refs, request2, ()=>{
                            resolve();
                            scheduleOnDisposeCallbacks();
                            refs.unref();
                        });
                    })
            };
            refs.ref();
            callback(null, result);
        });
    }
}
var handlePlugins = async (buildKey, sendRequest, sendResponse, refs, streamIn, requestCallbacks, initialOptions, plugins, details)=>{
    let onStartCallbacks = [];
    let onEndCallbacks = [];
    let onResolveCallbacks = {};
    let onLoadCallbacks = {};
    let onDisposeCallbacks = [];
    let nextCallbackID = 0;
    let i = 0;
    let requestPlugins = [];
    let isSetupDone = false;
    plugins = [
        ...plugins
    ];
    for (let item of plugins){
        let keys = {};
        if (typeof item !== "object") throw new Error(`Plugin at index ${i} must be an object`);
        const name = getFlag(item, keys, "name", mustBeString);
        if (typeof name !== "string" || name === "") throw new Error(`Plugin at index ${i} is missing a name`);
        try {
            let setup = getFlag(item, keys, "setup", mustBeFunction);
            if (typeof setup !== "function") throw new Error(`Plugin is missing a setup function`);
            checkForInvalidFlags(item, keys, `on plugin ${quote(name)}`);
            let plugin = {
                name,
                onStart: false,
                onEnd: false,
                onResolve: [],
                onLoad: []
            };
            i++;
            let resolve = (path3, options = {})=>{
                if (!isSetupDone) throw new Error('Cannot call "resolve" before plugin setup has completed');
                if (typeof path3 !== "string") throw new Error(`The path to resolve must be a string`);
                let keys2 = /* @__PURE__ */ Object.create(null);
                let pluginName = getFlag(options, keys2, "pluginName", mustBeString);
                let importer = getFlag(options, keys2, "importer", mustBeString);
                let namespace = getFlag(options, keys2, "namespace", mustBeString);
                let resolveDir = getFlag(options, keys2, "resolveDir", mustBeString);
                let kind = getFlag(options, keys2, "kind", mustBeString);
                let pluginData = getFlag(options, keys2, "pluginData", canBeAnything);
                let importAttributes = getFlag(options, keys2, "with", mustBeObject);
                checkForInvalidFlags(options, keys2, "in resolve() call");
                return new Promise((resolve2, reject)=>{
                    const request = {
                        command: "resolve",
                        path: path3,
                        key: buildKey,
                        pluginName: name
                    };
                    if (pluginName != null) request.pluginName = pluginName;
                    if (importer != null) request.importer = importer;
                    if (namespace != null) request.namespace = namespace;
                    if (resolveDir != null) request.resolveDir = resolveDir;
                    if (kind != null) request.kind = kind;
                    else throw new Error(`Must specify "kind" when calling "resolve"`);
                    if (pluginData != null) request.pluginData = details.store(pluginData);
                    if (importAttributes != null) request.with = sanitizeStringMap(importAttributes, "with");
                    sendRequest(refs, request, (error, response)=>{
                        if (error !== null) reject(new Error(error));
                        else resolve2({
                            errors: replaceDetailsInMessages(response.errors, details),
                            warnings: replaceDetailsInMessages(response.warnings, details),
                            path: response.path,
                            external: response.external,
                            sideEffects: response.sideEffects,
                            namespace: response.namespace,
                            suffix: response.suffix,
                            pluginData: details.load(response.pluginData)
                        });
                    });
                });
            };
            let promise = setup({
                initialOptions,
                resolve,
                onStart (callback) {
                    let registeredText = `This error came from the "onStart" callback registered here:`;
                    let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onStart");
                    onStartCallbacks.push({
                        name,
                        callback,
                        note: registeredNote
                    });
                    plugin.onStart = true;
                },
                onEnd (callback) {
                    let registeredText = `This error came from the "onEnd" callback registered here:`;
                    let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onEnd");
                    onEndCallbacks.push({
                        name,
                        callback,
                        note: registeredNote
                    });
                    plugin.onEnd = true;
                },
                onResolve (options, callback) {
                    let registeredText = `This error came from the "onResolve" callback registered here:`;
                    let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onResolve");
                    let keys2 = {};
                    let filter = getFlag(options, keys2, "filter", mustBeRegExp);
                    let namespace = getFlag(options, keys2, "namespace", mustBeString);
                    checkForInvalidFlags(options, keys2, `in onResolve() call for plugin ${quote(name)}`);
                    if (filter == null) throw new Error(`onResolve() call is missing a filter`);
                    let id = nextCallbackID++;
                    onResolveCallbacks[id] = {
                        name,
                        callback,
                        note: registeredNote
                    };
                    plugin.onResolve.push({
                        id,
                        filter: jsRegExpToGoRegExp(filter),
                        namespace: namespace || ""
                    });
                },
                onLoad (options, callback) {
                    let registeredText = `This error came from the "onLoad" callback registered here:`;
                    let registeredNote = extractCallerV8(new Error(registeredText), streamIn, "onLoad");
                    let keys2 = {};
                    let filter = getFlag(options, keys2, "filter", mustBeRegExp);
                    let namespace = getFlag(options, keys2, "namespace", mustBeString);
                    checkForInvalidFlags(options, keys2, `in onLoad() call for plugin ${quote(name)}`);
                    if (filter == null) throw new Error(`onLoad() call is missing a filter`);
                    let id = nextCallbackID++;
                    onLoadCallbacks[id] = {
                        name,
                        callback,
                        note: registeredNote
                    };
                    plugin.onLoad.push({
                        id,
                        filter: jsRegExpToGoRegExp(filter),
                        namespace: namespace || ""
                    });
                },
                onDispose (callback) {
                    onDisposeCallbacks.push(callback);
                },
                esbuild: streamIn.esbuild
            });
            if (promise) await promise;
            requestPlugins.push(plugin);
        } catch (e) {
            return {
                ok: false,
                error: e,
                pluginName: name
            };
        }
    }
    requestCallbacks["on-start"] = async (id, request)=>{
        details.clear();
        let response = {
            errors: [],
            warnings: []
        };
        await Promise.all(onStartCallbacks.map(async ({ name, callback, note })=>{
            try {
                let result = await callback();
                if (result != null) {
                    if (typeof result !== "object") throw new Error(`Expected onStart() callback in plugin ${quote(name)} to return an object`);
                    let keys = {};
                    let errors = getFlag(result, keys, "errors", mustBeArray);
                    let warnings = getFlag(result, keys, "warnings", mustBeArray);
                    checkForInvalidFlags(result, keys, `from onStart() callback in plugin ${quote(name)}`);
                    if (errors != null) response.errors.push(...sanitizeMessages(errors, "errors", details, name, void 0));
                    if (warnings != null) response.warnings.push(...sanitizeMessages(warnings, "warnings", details, name, void 0));
                }
            } catch (e) {
                response.errors.push(extractErrorMessageV8(e, streamIn, details, note && note(), name));
            }
        }));
        sendResponse(id, response);
    };
    requestCallbacks["on-resolve"] = async (id, request)=>{
        let response = {}, name = "", callback, note;
        for (let id2 of request.ids){
            try {
                ({ name, callback, note } = onResolveCallbacks[id2]);
                let result = await callback({
                    path: request.path,
                    importer: request.importer,
                    namespace: request.namespace,
                    resolveDir: request.resolveDir,
                    kind: request.kind,
                    pluginData: details.load(request.pluginData),
                    with: request.with
                });
                if (result != null) {
                    if (typeof result !== "object") throw new Error(`Expected onResolve() callback in plugin ${quote(name)} to return an object`);
                    let keys = {};
                    let pluginName = getFlag(result, keys, "pluginName", mustBeString);
                    let path3 = getFlag(result, keys, "path", mustBeString);
                    let namespace = getFlag(result, keys, "namespace", mustBeString);
                    let suffix = getFlag(result, keys, "suffix", mustBeString);
                    let external = getFlag(result, keys, "external", mustBeBoolean);
                    let sideEffects = getFlag(result, keys, "sideEffects", mustBeBoolean);
                    let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
                    let errors = getFlag(result, keys, "errors", mustBeArray);
                    let warnings = getFlag(result, keys, "warnings", mustBeArray);
                    let watchFiles = getFlag(result, keys, "watchFiles", mustBeArrayOfStrings);
                    let watchDirs = getFlag(result, keys, "watchDirs", mustBeArrayOfStrings);
                    checkForInvalidFlags(result, keys, `from onResolve() callback in plugin ${quote(name)}`);
                    response.id = id2;
                    if (pluginName != null) response.pluginName = pluginName;
                    if (path3 != null) response.path = path3;
                    if (namespace != null) response.namespace = namespace;
                    if (suffix != null) response.suffix = suffix;
                    if (external != null) response.external = external;
                    if (sideEffects != null) response.sideEffects = sideEffects;
                    if (pluginData != null) response.pluginData = details.store(pluginData);
                    if (errors != null) response.errors = sanitizeMessages(errors, "errors", details, name, void 0);
                    if (warnings != null) response.warnings = sanitizeMessages(warnings, "warnings", details, name, void 0);
                    if (watchFiles != null) response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
                    if (watchDirs != null) response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
                    break;
                }
            } catch (e) {
                response = {
                    id: id2,
                    errors: [
                        extractErrorMessageV8(e, streamIn, details, note && note(), name)
                    ]
                };
                break;
            }
        }
        sendResponse(id, response);
    };
    requestCallbacks["on-load"] = async (id, request)=>{
        let response = {}, name = "", callback, note;
        for (let id2 of request.ids){
            try {
                ({ name, callback, note } = onLoadCallbacks[id2]);
                let result = await callback({
                    path: request.path,
                    namespace: request.namespace,
                    suffix: request.suffix,
                    pluginData: details.load(request.pluginData),
                    with: request.with
                });
                if (result != null) {
                    if (typeof result !== "object") throw new Error(`Expected onLoad() callback in plugin ${quote(name)} to return an object`);
                    let keys = {};
                    let pluginName = getFlag(result, keys, "pluginName", mustBeString);
                    let contents = getFlag(result, keys, "contents", mustBeStringOrUint8Array);
                    let resolveDir = getFlag(result, keys, "resolveDir", mustBeString);
                    let pluginData = getFlag(result, keys, "pluginData", canBeAnything);
                    let loader = getFlag(result, keys, "loader", mustBeString);
                    let errors = getFlag(result, keys, "errors", mustBeArray);
                    let warnings = getFlag(result, keys, "warnings", mustBeArray);
                    let watchFiles = getFlag(result, keys, "watchFiles", mustBeArrayOfStrings);
                    let watchDirs = getFlag(result, keys, "watchDirs", mustBeArrayOfStrings);
                    checkForInvalidFlags(result, keys, `from onLoad() callback in plugin ${quote(name)}`);
                    response.id = id2;
                    if (pluginName != null) response.pluginName = pluginName;
                    if (contents instanceof Uint8Array) response.contents = contents;
                    else if (contents != null) response.contents = encodeUTF8(contents);
                    if (resolveDir != null) response.resolveDir = resolveDir;
                    if (pluginData != null) response.pluginData = details.store(pluginData);
                    if (loader != null) response.loader = loader;
                    if (errors != null) response.errors = sanitizeMessages(errors, "errors", details, name, void 0);
                    if (warnings != null) response.warnings = sanitizeMessages(warnings, "warnings", details, name, void 0);
                    if (watchFiles != null) response.watchFiles = sanitizeStringArray(watchFiles, "watchFiles");
                    if (watchDirs != null) response.watchDirs = sanitizeStringArray(watchDirs, "watchDirs");
                    break;
                }
            } catch (e) {
                response = {
                    id: id2,
                    errors: [
                        extractErrorMessageV8(e, streamIn, details, note && note(), name)
                    ]
                };
                break;
            }
        }
        sendResponse(id, response);
    };
    let runOnEndCallbacks = (result, done)=>done([], []);
    if (onEndCallbacks.length > 0) {
        runOnEndCallbacks = (result, done)=>{
            (async ()=>{
                const onEndErrors = [];
                const onEndWarnings = [];
                for (const { name, callback, note } of onEndCallbacks){
                    let newErrors;
                    let newWarnings;
                    try {
                        const value = await callback(result);
                        if (value != null) {
                            if (typeof value !== "object") throw new Error(`Expected onEnd() callback in plugin ${quote(name)} to return an object`);
                            let keys = {};
                            let errors = getFlag(value, keys, "errors", mustBeArray);
                            let warnings = getFlag(value, keys, "warnings", mustBeArray);
                            checkForInvalidFlags(value, keys, `from onEnd() callback in plugin ${quote(name)}`);
                            if (errors != null) newErrors = sanitizeMessages(errors, "errors", details, name, void 0);
                            if (warnings != null) newWarnings = sanitizeMessages(warnings, "warnings", details, name, void 0);
                        }
                    } catch (e) {
                        newErrors = [
                            extractErrorMessageV8(e, streamIn, details, note && note(), name)
                        ];
                    }
                    if (newErrors) {
                        onEndErrors.push(...newErrors);
                        try {
                            result.errors.push(...newErrors);
                        } catch  {}
                    }
                    if (newWarnings) {
                        onEndWarnings.push(...newWarnings);
                        try {
                            result.warnings.push(...newWarnings);
                        } catch  {}
                    }
                }
                done(onEndErrors, onEndWarnings);
            })();
        };
    }
    let scheduleOnDisposeCallbacks = ()=>{
        for (const cb of onDisposeCallbacks){
            setTimeout(()=>cb(), 0);
        }
    };
    isSetupDone = true;
    return {
        ok: true,
        requestPlugins,
        runOnEndCallbacks,
        scheduleOnDisposeCallbacks
    };
};
function createObjectStash() {
    const map = /* @__PURE__ */ new Map();
    let nextID = 0;
    return {
        clear () {
            map.clear();
        },
        load (id) {
            return map.get(id);
        },
        store (value) {
            if (value === void 0) return -1;
            const id = nextID++;
            map.set(id, value);
            return id;
        }
    };
}
function extractCallerV8(e, streamIn, ident) {
    let note;
    let tried = false;
    return ()=>{
        if (tried) return note;
        tried = true;
        try {
            let lines = (e.stack + "").split("\n");
            lines.splice(1, 1);
            let location = parseStackLinesV8(streamIn, lines, ident);
            if (location) {
                note = {
                    text: e.message,
                    location
                };
                return note;
            }
        } catch  {}
    };
}
function extractErrorMessageV8(e, streamIn, stash, note, pluginName) {
    let text = "Internal error";
    let location = null;
    try {
        text = (e && e.message || e) + "";
    } catch  {}
    try {
        location = parseStackLinesV8(streamIn, (e.stack + "").split("\n"), "");
    } catch  {}
    return {
        id: "",
        pluginName,
        text,
        location,
        notes: note ? [
            note
        ] : [],
        detail: stash ? stash.store(e) : -1
    };
}
function parseStackLinesV8(streamIn, lines, ident) {
    let at = "    at ";
    if (streamIn.readFileSync && !lines[0].startsWith(at) && lines[1].startsWith(at)) {
        for(let i = 1; i < lines.length; i++){
            let line = lines[i];
            if (!line.startsWith(at)) continue;
            line = line.slice(at.length);
            while(true){
                let match = /^(?:new |async )?\S+ \((.*)\)$/.exec(line);
                if (match) {
                    line = match[1];
                    continue;
                }
                match = /^eval at \S+ \((.*)\)(?:, \S+:\d+:\d+)?$/.exec(line);
                if (match) {
                    line = match[1];
                    continue;
                }
                match = /^(\S+):(\d+):(\d+)$/.exec(line);
                if (match) {
                    let contents;
                    try {
                        contents = streamIn.readFileSync(match[1], "utf8");
                    } catch  {
                        break;
                    }
                    let lineText = contents.split(/\r\n|\r|\n|\u2028|\u2029/)[+match[2] - 1] || "";
                    let column = +match[3] - 1;
                    let length = lineText.slice(column, column + ident.length) === ident ? ident.length : 0;
                    return {
                        file: match[1],
                        namespace: "file",
                        line: +match[2],
                        column: encodeUTF8(lineText.slice(0, column)).length,
                        length: encodeUTF8(lineText.slice(column, column + length)).length,
                        lineText: lineText + "\n" + lines.slice(1).join("\n"),
                        suggestion: ""
                    };
                }
                break;
            }
        }
    }
    return null;
}
function failureErrorWithLog(text, errors, warnings) {
    let limit = 5;
    text += errors.length < 1 ? "" : ` with ${errors.length} error${errors.length < 2 ? "" : "s"}:` + errors.slice(0, limit + 1).map((e, i)=>{
        if (i === limit) return "\n...";
        if (!e.location) return `
error: ${e.text}`;
        let { file, line, column } = e.location;
        let pluginText = e.pluginName ? `[plugin: ${e.pluginName}] ` : "";
        return `
${file}:${line}:${column}: ERROR: ${pluginText}${e.text}`;
    }).join("");
    let error = new Error(text);
    for (const [key, value] of [
        [
            "errors",
            errors
        ],
        [
            "warnings",
            warnings
        ]
    ]){
        Object.defineProperty(error, key, {
            configurable: true,
            enumerable: true,
            get: ()=>value,
            set: (value2)=>Object.defineProperty(error, key, {
                    configurable: true,
                    enumerable: true,
                    value: value2
                })
        });
    }
    return error;
}
function replaceDetailsInMessages(messages, stash) {
    for (const message of messages){
        message.detail = stash.load(message.detail);
    }
    return messages;
}
function sanitizeLocation(location, where, terminalWidth) {
    if (location == null) return null;
    let keys = {};
    let file = getFlag(location, keys, "file", mustBeString);
    let namespace = getFlag(location, keys, "namespace", mustBeString);
    let line = getFlag(location, keys, "line", mustBeInteger);
    let column = getFlag(location, keys, "column", mustBeInteger);
    let length = getFlag(location, keys, "length", mustBeInteger);
    let lineText = getFlag(location, keys, "lineText", mustBeString);
    let suggestion = getFlag(location, keys, "suggestion", mustBeString);
    checkForInvalidFlags(location, keys, where);
    if (lineText) {
        const relevantASCII = lineText.slice(0, (column && column > 0 ? column : 0) + (length && length > 0 ? length : 0) + (terminalWidth && terminalWidth > 0 ? terminalWidth : 80));
        if (!/[\x7F-\uFFFF]/.test(relevantASCII) && !/\n/.test(lineText)) {
            lineText = relevantASCII;
        }
    }
    return {
        file: file || "",
        namespace: namespace || "",
        line: line || 0,
        column: column || 0,
        length: length || 0,
        lineText: lineText || "",
        suggestion: suggestion || ""
    };
}
function sanitizeMessages(messages, property, stash, fallbackPluginName, terminalWidth) {
    let messagesClone = [];
    let index = 0;
    for (const message of messages){
        let keys = {};
        let id = getFlag(message, keys, "id", mustBeString);
        let pluginName = getFlag(message, keys, "pluginName", mustBeString);
        let text = getFlag(message, keys, "text", mustBeString);
        let location = getFlag(message, keys, "location", mustBeObjectOrNull);
        let notes = getFlag(message, keys, "notes", mustBeArray);
        let detail = getFlag(message, keys, "detail", canBeAnything);
        let where = `in element ${index} of "${property}"`;
        checkForInvalidFlags(message, keys, where);
        let notesClone = [];
        if (notes) {
            for (const note of notes){
                let noteKeys = {};
                let noteText = getFlag(note, noteKeys, "text", mustBeString);
                let noteLocation = getFlag(note, noteKeys, "location", mustBeObjectOrNull);
                checkForInvalidFlags(note, noteKeys, where);
                notesClone.push({
                    text: noteText || "",
                    location: sanitizeLocation(noteLocation, where, terminalWidth)
                });
            }
        }
        messagesClone.push({
            id: id || "",
            pluginName: pluginName || fallbackPluginName,
            text: text || "",
            location: sanitizeLocation(location, where, terminalWidth),
            notes: notesClone,
            detail: stash ? stash.store(detail) : -1
        });
        index++;
    }
    return messagesClone;
}
function sanitizeStringArray(values, property) {
    const result = [];
    for (const value of values){
        if (typeof value !== "string") throw new Error(`${quote(property)} must be an array of strings`);
        result.push(value);
    }
    return result;
}
function sanitizeStringMap(map, property) {
    const result = /* @__PURE__ */ Object.create(null);
    for(const key in map){
        const value = map[key];
        if (typeof value !== "string") throw new Error(`key ${quote(key)} in object ${quote(property)} must be a string`);
        result[key] = value;
    }
    return result;
}
function convertOutputFiles({ path: path3, contents, hash }) {
    let text = null;
    return {
        path: path3,
        contents,
        hash,
        get text () {
            const binary = this.contents;
            if (text === null || binary !== contents) {
                contents = binary;
                text = decodeUTF8(binary);
            }
            return text;
        }
    };
}
function jsRegExpToGoRegExp(regexp) {
    let result = regexp.source;
    if (regexp.flags) result = `(?${regexp.flags})${result}`;
    return result;
}
function parseJSON(bytes) {
    let text;
    try {
        text = decodeUTF8(bytes);
    } catch  {
        return JSON_parse(bytes);
    }
    return JSON.parse(text);
}
// lib/npm/node-platform.ts
var fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
var os = __turbopack_context__.r("[externals]/os [external] (os, cjs)");
var path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
var ESBUILD_BINARY_PATH = process.env.ESBUILD_BINARY_PATH || ESBUILD_BINARY_PATH;
var isValidBinaryPath = (x)=>!!x && x !== "/usr/bin/esbuild";
var packageDarwin_arm64 = "@esbuild/darwin-arm64";
var packageDarwin_x64 = "@esbuild/darwin-x64";
var knownWindowsPackages = {
    "win32 arm64 LE": "@esbuild/win32-arm64",
    "win32 ia32 LE": "@esbuild/win32-ia32",
    "win32 x64 LE": "@esbuild/win32-x64"
};
var knownUnixlikePackages = {
    "aix ppc64 BE": "@esbuild/aix-ppc64",
    "android arm64 LE": "@esbuild/android-arm64",
    "darwin arm64 LE": "@esbuild/darwin-arm64",
    "darwin x64 LE": "@esbuild/darwin-x64",
    "freebsd arm64 LE": "@esbuild/freebsd-arm64",
    "freebsd x64 LE": "@esbuild/freebsd-x64",
    "linux arm LE": "@esbuild/linux-arm",
    "linux arm64 LE": "@esbuild/linux-arm64",
    "linux ia32 LE": "@esbuild/linux-ia32",
    "linux mips64el LE": "@esbuild/linux-mips64el",
    "linux ppc64 LE": "@esbuild/linux-ppc64",
    "linux riscv64 LE": "@esbuild/linux-riscv64",
    "linux s390x BE": "@esbuild/linux-s390x",
    "linux x64 LE": "@esbuild/linux-x64",
    "linux loong64 LE": "@esbuild/linux-loong64",
    "netbsd arm64 LE": "@esbuild/netbsd-arm64",
    "netbsd x64 LE": "@esbuild/netbsd-x64",
    "openbsd arm64 LE": "@esbuild/openbsd-arm64",
    "openbsd x64 LE": "@esbuild/openbsd-x64",
    "sunos x64 LE": "@esbuild/sunos-x64"
};
var knownWebAssemblyFallbackPackages = {
    "android arm LE": "@esbuild/android-arm",
    "android x64 LE": "@esbuild/android-x64",
    "openharmony arm64 LE": "@esbuild/openharmony-arm64"
};
function pkgAndSubpathForCurrentPlatform() {
    let pkg;
    let subpath;
    let isWASM = false;
    let platformKey = `${process.platform} ${os.arch()} ${os.endianness()}`;
    if (platformKey in knownWindowsPackages) {
        pkg = knownWindowsPackages[platformKey];
        subpath = "esbuild.exe";
    } else if (platformKey in knownUnixlikePackages) {
        pkg = knownUnixlikePackages[platformKey];
        subpath = "bin/esbuild";
    } else if (platformKey in knownWebAssemblyFallbackPackages) {
        pkg = knownWebAssemblyFallbackPackages[platformKey];
        subpath = "bin/esbuild";
        isWASM = true;
    } else {
        throw new Error(`Unsupported platform: ${platformKey}`);
    }
    return {
        pkg,
        subpath,
        isWASM
    };
}
function pkgForSomeOtherPlatform() {
    const libMainJS = "[project]/Documents/GitHub/billing-failure-email/node_modules/esbuild/lib/main.js [app-route] (ecmascript)";
    const nodeModulesDirectory = path.dirname(path.dirname(path.dirname(libMainJS)));
    if (path.basename(nodeModulesDirectory) === "node_modules") {
        for(const unixKey in knownUnixlikePackages){
            try {
                const pkg = knownUnixlikePackages[unixKey];
                if (fs.existsSync(path.join(nodeModulesDirectory, pkg))) return pkg;
            } catch  {}
        }
        for(const windowsKey in knownWindowsPackages){
            try {
                const pkg = knownWindowsPackages[windowsKey];
                if (fs.existsSync(path.join(nodeModulesDirectory, pkg))) return pkg;
            } catch  {}
        }
    }
    return null;
}
function downloadedBinPath(pkg, subpath) {
    const esbuildLibDir = path.dirname("[project]/Documents/GitHub/billing-failure-email/node_modules/esbuild/lib/main.js [app-route] (ecmascript)");
    return path.join(esbuildLibDir, `downloaded-${pkg.replace("/", "-")}-${path.basename(subpath)}`);
}
function generateBinPath() {
    if (isValidBinaryPath(ESBUILD_BINARY_PATH)) {
        if (!fs.existsSync(ESBUILD_BINARY_PATH)) {
            console.warn(`[esbuild] Ignoring bad configuration: ESBUILD_BINARY_PATH=${ESBUILD_BINARY_PATH}`);
        } else {
            return {
                binPath: ESBUILD_BINARY_PATH,
                isWASM: false
            };
        }
    }
    const { pkg, subpath, isWASM } = pkgAndSubpathForCurrentPlatform();
    let binPath;
    try {
        binPath = __turbopack_context__.f({
            "@esbuild/darwin-arm64/README.md": {
                id: ()=>(()=>{
                        const e = new Error("Cannot find module 'unknown module type'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })(),
                module: ()=>(()=>{
                        const e = new Error("Cannot find module 'unknown module type'");
                        e.code = 'MODULE_NOT_FOUND';
                        throw e;
                    })()
            },
            "@esbuild/darwin-arm64/bin/esbuild": {
                id: ()=>"[project]/Documents/GitHub/billing-failure-email/node_modules/@esbuild/darwin-arm64/bin/esbuild [app-route] (ecmascript)",
                module: ()=>__turbopack_context__.r("[project]/Documents/GitHub/billing-failure-email/node_modules/@esbuild/darwin-arm64/bin/esbuild [app-route] (ecmascript)")
            },
            "@esbuild/darwin-arm64/package.json": {
                id: ()=>"[project]/Documents/GitHub/billing-failure-email/node_modules/@esbuild/darwin-arm64/package.json.[json].cjs [app-route] (ecmascript)",
                module: ()=>__turbopack_context__.r("[project]/Documents/GitHub/billing-failure-email/node_modules/@esbuild/darwin-arm64/package.json.[json].cjs [app-route] (ecmascript)")
            },
            "@esbuild/darwin-arm64/package": {
                id: ()=>"[project]/Documents/GitHub/billing-failure-email/node_modules/@esbuild/darwin-arm64/package.json.[json].cjs [app-route] (ecmascript)",
                module: ()=>__turbopack_context__.r("[project]/Documents/GitHub/billing-failure-email/node_modules/@esbuild/darwin-arm64/package.json.[json].cjs [app-route] (ecmascript)")
            }
        }).resolve(`${pkg}/${subpath}`);
    } catch (e1) {
        binPath = downloadedBinPath(pkg, subpath);
        if (!fs.existsSync(binPath)) {
            try {
                (()=>{
                    const e = new Error("Cannot find module 'unknown'");
                    e.code = 'MODULE_NOT_FOUND';
                    throw e;
                })();
            } catch  {
                const otherPkg = pkgForSomeOtherPlatform();
                if (otherPkg) {
                    let suggestions = `
Specifically the "${otherPkg}" package is present but this platform
needs the "${pkg}" package instead. People often get into this
situation by installing esbuild on Windows or macOS and copying "node_modules"
into a Docker image that runs Linux, or by copying "node_modules" between
Windows and WSL environments.

If you are installing with npm, you can try not copying the "node_modules"
directory when you copy the files over, and running "npm ci" or "npm install"
on the destination platform after the copy. Or you could consider using yarn
instead of npm which has built-in support for installing a package on multiple
platforms simultaneously.

If you are installing with yarn, you can try listing both this platform and the
other platform in your ".yarnrc.yml" file using the "supportedArchitectures"
feature: https://yarnpkg.com/configuration/yarnrc/#supportedArchitectures
Keep in mind that this means multiple copies of esbuild will be present.
`;
                    if (pkg === packageDarwin_x64 && otherPkg === packageDarwin_arm64 || pkg === packageDarwin_arm64 && otherPkg === packageDarwin_x64) {
                        suggestions = `
Specifically the "${otherPkg}" package is present but this platform
needs the "${pkg}" package instead. People often get into this
situation by installing esbuild with npm running inside of Rosetta 2 and then
trying to use it with node running outside of Rosetta 2, or vice versa (Rosetta
2 is Apple's on-the-fly x86_64-to-arm64 translation service).

If you are installing with npm, you can try ensuring that both npm and node are
not running under Rosetta 2 and then reinstalling esbuild. This likely involves
changing how you installed npm and/or node. For example, installing node with
the universal installer here should work: https://nodejs.org/en/download/. Or
you could consider using yarn instead of npm which has built-in support for
installing a package on multiple platforms simultaneously.

If you are installing with yarn, you can try listing both "arm64" and "x64"
in your ".yarnrc.yml" file using the "supportedArchitectures" feature:
https://yarnpkg.com/configuration/yarnrc/#supportedArchitectures
Keep in mind that this means multiple copies of esbuild will be present.
`;
                    }
                    throw new Error(`
You installed esbuild for another platform than the one you're currently using.
This won't work because esbuild is written with native code and needs to
install a platform-specific binary executable.
${suggestions}
Another alternative is to use the "esbuild-wasm" package instead, which works
the same way on all platforms. But it comes with a heavy performance cost and
can sometimes be 10x slower than the "esbuild" package, so you may also not
want to do that.
`);
                }
                throw new Error(`The package "${pkg}" could not be found, and is needed by esbuild.

If you are installing esbuild with npm, make sure that you don't specify the
"--no-optional" or "--omit=optional" flags. The "optionalDependencies" feature
of "package.json" is used by esbuild to install the correct binary executable
for your current platform.`);
            }
            throw e1;
        }
    }
    if (/\.zip\//.test(binPath)) {
        let pnpapi;
        try {
            pnpapi = __turbopack_context__.r("[externals]/pnpapi [external] (pnpapi, cjs)");
        } catch (e) {}
        if (pnpapi) {
            const root = pnpapi.getPackageInformation(pnpapi.topLevel).packageLocation;
            const binTargetPath = path.join(root, "node_modules", ".cache", "esbuild", `pnpapi-${pkg.replace("/", "-")}-${"0.27.5"}-${path.basename(subpath)}`);
            if (!fs.existsSync(binTargetPath)) {
                fs.mkdirSync(path.dirname(binTargetPath), {
                    recursive: true
                });
                fs.copyFileSync(binPath, binTargetPath);
                fs.chmodSync(binTargetPath, 493);
            }
            return {
                binPath: binTargetPath,
                isWASM
            };
        }
    }
    return {
        binPath,
        isWASM
    };
}
// lib/npm/node.ts
var child_process = __turbopack_context__.r("[externals]/child_process [external] (child_process, cjs)");
var crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
var path2 = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
var fs2 = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
var os2 = __turbopack_context__.r("[externals]/os [external] (os, cjs)");
var tty = __turbopack_context__.r("[externals]/tty [external] (tty, cjs)");
var worker_threads;
if (process.env.ESBUILD_WORKER_THREADS !== "0") {
    try {
        worker_threads = __turbopack_context__.r("[externals]/worker_threads [external] (worker_threads, cjs)");
    } catch  {}
    let [major, minor] = process.versions.node.split(".");
    if (// <v12.17.0 does not work
    +major < 12 || +major === 12 && +minor < 17 || +major === 13 && +minor < 13) {
        worker_threads = void 0;
    }
}
var _a;
var isInternalWorkerThread = ((_a = worker_threads == null ? void 0 : worker_threads.workerData) == null ? void 0 : _a.esbuildVersion) === "0.27.5";
var esbuildCommandAndArgs = ()=>{
    if ((!ESBUILD_BINARY_PATH || false) && (path2.basename(("TURBOPACK compile-time value", "/ROOT/Documents/GitHub/billing-failure-email/node_modules/esbuild/lib/main.js")) !== "main.js" || path2.basename(("TURBOPACK compile-time value", "/ROOT/Documents/GitHub/billing-failure-email/node_modules/esbuild/lib")) !== "lib")) {
        throw new Error(`The esbuild JavaScript API cannot be bundled. Please mark the "esbuild" package as external so it's not included in the bundle.

More information: The file containing the code for esbuild's JavaScript API (${("TURBOPACK compile-time value", "/ROOT/Documents/GitHub/billing-failure-email/node_modules/esbuild/lib/main.js")}) does not appear to be inside the esbuild package on the file system, which usually means that the esbuild package was bundled into another file. This is problematic because the API needs to run a binary executable inside the esbuild package which is located using a relative path from the API code to the executable. If the esbuild package is bundled, the relative path will be incorrect and the executable won't be found.`);
    }
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        const { binPath, isWASM } = generateBinPath();
        if (isWASM) {
            return [
                "node",
                [
                    binPath
                ]
            ];
        } else {
            return [
                binPath,
                []
            ];
        }
    }
};
var isTTY = ()=>tty.isatty(2);
var fsSync = {
    readFile (tempFile, callback) {
        try {
            let contents = fs2.readFileSync(tempFile, "utf8");
            try {
                fs2.unlinkSync(tempFile);
            } catch  {}
            callback(null, contents);
        } catch (err) {
            callback(err, null);
        }
    },
    writeFile (contents, callback) {
        try {
            let tempFile = randomFileName();
            fs2.writeFileSync(tempFile, contents);
            callback(tempFile);
        } catch  {
            callback(null);
        }
    }
};
var fsAsync = {
    readFile (tempFile, callback) {
        try {
            fs2.readFile(tempFile, "utf8", (err, contents)=>{
                try {
                    fs2.unlink(tempFile, ()=>callback(err, contents));
                } catch  {
                    callback(err, contents);
                }
            });
        } catch (err) {
            callback(err, null);
        }
    },
    writeFile (contents, callback) {
        try {
            let tempFile = randomFileName();
            fs2.writeFile(tempFile, contents, (err)=>err !== null ? callback(null) : callback(tempFile));
        } catch  {
            callback(null);
        }
    }
};
var version = "0.27.5";
var build = (options)=>ensureServiceIsRunning().build(options);
var context = (buildOptions)=>ensureServiceIsRunning().context(buildOptions);
var transform = (input, options)=>ensureServiceIsRunning().transform(input, options);
var formatMessages = (messages, options)=>ensureServiceIsRunning().formatMessages(messages, options);
var analyzeMetafile = (messages, options)=>ensureServiceIsRunning().analyzeMetafile(messages, options);
var buildSync = (options)=>{
    if (worker_threads && !isInternalWorkerThread) {
        if (!workerThreadService) workerThreadService = startWorkerThreadService(worker_threads);
        return workerThreadService.buildSync(options);
    }
    let result;
    runServiceSync((service)=>service.buildOrContext({
            callName: "buildSync",
            refs: null,
            options,
            isTTY: isTTY(),
            defaultWD,
            callback: (err, res)=>{
                if (err) throw err;
                result = res;
            }
        }));
    return result;
};
var transformSync = (input, options)=>{
    if (worker_threads && !isInternalWorkerThread) {
        if (!workerThreadService) workerThreadService = startWorkerThreadService(worker_threads);
        return workerThreadService.transformSync(input, options);
    }
    let result;
    runServiceSync((service)=>service.transform({
            callName: "transformSync",
            refs: null,
            input,
            options: options || {},
            isTTY: isTTY(),
            fs: fsSync,
            callback: (err, res)=>{
                if (err) throw err;
                result = res;
            }
        }));
    return result;
};
var formatMessagesSync = (messages, options)=>{
    if (worker_threads && !isInternalWorkerThread) {
        if (!workerThreadService) workerThreadService = startWorkerThreadService(worker_threads);
        return workerThreadService.formatMessagesSync(messages, options);
    }
    let result;
    runServiceSync((service)=>service.formatMessages({
            callName: "formatMessagesSync",
            refs: null,
            messages,
            options,
            callback: (err, res)=>{
                if (err) throw err;
                result = res;
            }
        }));
    return result;
};
var analyzeMetafileSync = (metafile, options)=>{
    if (worker_threads && !isInternalWorkerThread) {
        if (!workerThreadService) workerThreadService = startWorkerThreadService(worker_threads);
        return workerThreadService.analyzeMetafileSync(metafile, options);
    }
    let result;
    runServiceSync((service)=>service.analyzeMetafile({
            callName: "analyzeMetafileSync",
            refs: null,
            metafile: typeof metafile === "string" ? metafile : JSON.stringify(metafile),
            options,
            callback: (err, res)=>{
                if (err) throw err;
                result = res;
            }
        }));
    return result;
};
var stop = ()=>{
    if (stopService) stopService();
    if (workerThreadService) workerThreadService.stop();
    return Promise.resolve();
};
var initializeWasCalled = false;
var initialize = (options)=>{
    options = validateInitializeOptions(options || {});
    if (options.wasmURL) throw new Error(`The "wasmURL" option only works in the browser`);
    if (options.wasmModule) throw new Error(`The "wasmModule" option only works in the browser`);
    if (options.worker) throw new Error(`The "worker" option only works in the browser`);
    if (initializeWasCalled) throw new Error('Cannot call "initialize" more than once');
    ensureServiceIsRunning();
    initializeWasCalled = true;
    return Promise.resolve();
};
var defaultWD = process.cwd();
var longLivedService;
var stopService;
var ensureServiceIsRunning = ()=>{
    if (longLivedService) return longLivedService;
    let [command, args] = esbuildCommandAndArgs();
    let child = child_process.spawn(command, args.concat(`--service=${"0.27.5"}`, "--ping"), {
        windowsHide: true,
        stdio: [
            "pipe",
            "pipe",
            "inherit"
        ],
        cwd: defaultWD
    });
    let { readFromStdout, afterClose, service } = createChannel({
        writeToStdin (bytes) {
            child.stdin.write(bytes, (err)=>{
                if (err) afterClose(err);
            });
        },
        readFileSync: fs2.readFileSync,
        isSync: false,
        hasFS: true,
        esbuild: node_exports
    });
    child.stdin.on("error", afterClose);
    child.on("error", afterClose);
    const stdin = child.stdin;
    const stdout = child.stdout;
    stdout.on("data", readFromStdout);
    stdout.on("end", afterClose);
    stopService = ()=>{
        stdin.destroy();
        stdout.destroy();
        child.kill();
        initializeWasCalled = false;
        longLivedService = void 0;
        stopService = void 0;
    };
    let refCount = 0;
    child.unref();
    if (stdin.unref) {
        stdin.unref();
    }
    if (stdout.unref) {
        stdout.unref();
    }
    const refs = {
        ref () {
            if (++refCount === 1) child.ref();
        },
        unref () {
            if (--refCount === 0) child.unref();
        }
    };
    longLivedService = {
        build: (options)=>new Promise((resolve, reject)=>{
                service.buildOrContext({
                    callName: "build",
                    refs,
                    options,
                    isTTY: isTTY(),
                    defaultWD,
                    callback: (err, res)=>err ? reject(err) : resolve(res)
                });
            }),
        context: (options)=>new Promise((resolve, reject)=>service.buildOrContext({
                    callName: "context",
                    refs,
                    options,
                    isTTY: isTTY(),
                    defaultWD,
                    callback: (err, res)=>err ? reject(err) : resolve(res)
                })),
        transform: (input, options)=>new Promise((resolve, reject)=>service.transform({
                    callName: "transform",
                    refs,
                    input,
                    options: options || {},
                    isTTY: isTTY(),
                    fs: fsAsync,
                    callback: (err, res)=>err ? reject(err) : resolve(res)
                })),
        formatMessages: (messages, options)=>new Promise((resolve, reject)=>service.formatMessages({
                    callName: "formatMessages",
                    refs,
                    messages,
                    options,
                    callback: (err, res)=>err ? reject(err) : resolve(res)
                })),
        analyzeMetafile: (metafile, options)=>new Promise((resolve, reject)=>service.analyzeMetafile({
                    callName: "analyzeMetafile",
                    refs,
                    metafile: typeof metafile === "string" ? metafile : JSON.stringify(metafile),
                    options,
                    callback: (err, res)=>err ? reject(err) : resolve(res)
                }))
    };
    return longLivedService;
};
var runServiceSync = (callback)=>{
    let [command, args] = esbuildCommandAndArgs();
    let stdin = new Uint8Array();
    let { readFromStdout, afterClose, service } = createChannel({
        writeToStdin (bytes) {
            if (stdin.length !== 0) throw new Error("Must run at most one command");
            stdin = bytes;
        },
        isSync: true,
        hasFS: true,
        esbuild: node_exports
    });
    callback(service);
    let stdout = child_process.execFileSync(command, args.concat(`--service=${"0.27.5"}`), {
        cwd: defaultWD,
        windowsHide: true,
        input: stdin,
        // We don't know how large the output could be. If it's too large, the
        // command will fail with ENOBUFS. Reserve 16mb for now since that feels
        // like it should be enough. Also allow overriding this with an environment
        // variable.
        maxBuffer: +process.env.ESBUILD_MAX_BUFFER || 16 * 1024 * 1024
    });
    readFromStdout(stdout);
    afterClose(null);
};
var randomFileName = ()=>{
    return path2.join(os2.tmpdir(), `esbuild-${crypto.randomBytes(32).toString("hex")}`);
};
var workerThreadService = null;
var startWorkerThreadService = (worker_threads2)=>{
    let { port1: mainPort, port2: workerPort } = new worker_threads2.MessageChannel();
    let worker = new worker_threads2.Worker(("TURBOPACK compile-time value", "/ROOT/Documents/GitHub/billing-failure-email/node_modules/esbuild/lib/main.js"), {
        workerData: {
            workerPort,
            defaultWD,
            esbuildVersion: "0.27.5"
        },
        transferList: [
            workerPort
        ],
        // From node's documentation: https://nodejs.org/api/worker_threads.html
        //
        //   Take care when launching worker threads from preload scripts (scripts loaded
        //   and run using the `-r` command line flag). Unless the `execArgv` option is
        //   explicitly set, new Worker threads automatically inherit the command line flags
        //   from the running process and will preload the same preload scripts as the main
        //   thread. If the preload script unconditionally launches a worker thread, every
        //   thread spawned will spawn another until the application crashes.
        //
        execArgv: []
    });
    let nextID = 0;
    let fakeBuildError = (text)=>{
        let error = new Error(`Build failed with 1 error:
error: ${text}`);
        let errors = [
            {
                id: "",
                pluginName: "",
                text,
                location: null,
                notes: [],
                detail: void 0
            }
        ];
        error.errors = errors;
        error.warnings = [];
        return error;
    };
    let validateBuildSyncOptions = (options)=>{
        if (!options) return;
        let plugins = options.plugins;
        if (plugins && plugins.length > 0) throw fakeBuildError(`Cannot use plugins in synchronous API calls`);
    };
    let applyProperties = (object, properties)=>{
        for(let key in properties){
            object[key] = properties[key];
        }
    };
    let runCallSync = (command, args)=>{
        let id = nextID++;
        let sharedBuffer = new SharedArrayBuffer(8);
        let sharedBufferView = new Int32Array(sharedBuffer);
        let msg = {
            sharedBuffer,
            id,
            command,
            args
        };
        worker.postMessage(msg);
        let status = Atomics.wait(sharedBufferView, 0, 0);
        if (status !== "ok" && status !== "not-equal") throw new Error("Internal error: Atomics.wait() failed: " + status);
        let { message: { id: id2, resolve, reject, properties } } = worker_threads2.receiveMessageOnPort(mainPort);
        if (id !== id2) throw new Error(`Internal error: Expected id ${id} but got id ${id2}`);
        if (reject) {
            applyProperties(reject, properties);
            throw reject;
        }
        return resolve;
    };
    worker.unref();
    return {
        buildSync (options) {
            validateBuildSyncOptions(options);
            return runCallSync("build", [
                options
            ]);
        },
        transformSync (input, options) {
            return runCallSync("transform", [
                input,
                options
            ]);
        },
        formatMessagesSync (messages, options) {
            return runCallSync("formatMessages", [
                messages,
                options
            ]);
        },
        analyzeMetafileSync (metafile, options) {
            return runCallSync("analyzeMetafile", [
                metafile,
                options
            ]);
        },
        stop () {
            worker.terminate();
            workerThreadService = null;
        }
    };
};
var startSyncServiceWorker = ()=>{
    let workerPort = worker_threads.workerData.workerPort;
    let parentPort = worker_threads.parentPort;
    let extractProperties = (object)=>{
        let properties = {};
        if (object && typeof object === "object") {
            for(let key in object){
                properties[key] = object[key];
            }
        }
        return properties;
    };
    try {
        let service = ensureServiceIsRunning();
        defaultWD = worker_threads.workerData.defaultWD;
        parentPort.on("message", (msg)=>{
            (async ()=>{
                let { sharedBuffer, id, command, args } = msg;
                let sharedBufferView = new Int32Array(sharedBuffer);
                try {
                    switch(command){
                        case "build":
                            workerPort.postMessage({
                                id,
                                resolve: await service.build(args[0])
                            });
                            break;
                        case "transform":
                            workerPort.postMessage({
                                id,
                                resolve: await service.transform(args[0], args[1])
                            });
                            break;
                        case "formatMessages":
                            workerPort.postMessage({
                                id,
                                resolve: await service.formatMessages(args[0], args[1])
                            });
                            break;
                        case "analyzeMetafile":
                            workerPort.postMessage({
                                id,
                                resolve: await service.analyzeMetafile(args[0], args[1])
                            });
                            break;
                        default:
                            throw new Error(`Invalid command: ${command}`);
                    }
                } catch (reject) {
                    workerPort.postMessage({
                        id,
                        reject,
                        properties: extractProperties(reject)
                    });
                }
                Atomics.add(sharedBufferView, 0, 1);
                Atomics.notify(sharedBufferView, 0, Infinity);
            })();
        });
    } catch (reject) {
        parentPort.on("message", (msg)=>{
            let { sharedBuffer, id } = msg;
            let sharedBufferView = new Int32Array(sharedBuffer);
            workerPort.postMessage({
                id,
                reject,
                properties: extractProperties(reject)
            });
            Atomics.add(sharedBufferView, 0, 1);
            Atomics.notify(sharedBufferView, 0, Infinity);
        });
    }
};
if (isInternalWorkerThread) {
    startSyncServiceWorker();
}
var node_default = node_exports;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    analyzeMetafile,
    analyzeMetafileSync,
    build,
    buildSync,
    context,
    formatMessages,
    formatMessagesSync,
    initialize,
    stop,
    transform,
    transformSync,
    version
});
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/domelementtype/lib/esm/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Types of elements found in htmlparser2's DOM */ __turbopack_context__.s([
    "CDATA",
    ()=>CDATA,
    "Comment",
    ()=>Comment,
    "Directive",
    ()=>Directive,
    "Doctype",
    ()=>Doctype,
    "ElementType",
    ()=>ElementType,
    "Root",
    ()=>Root,
    "Script",
    ()=>Script,
    "Style",
    ()=>Style,
    "Tag",
    ()=>Tag,
    "Text",
    ()=>Text,
    "isTag",
    ()=>isTag
]);
var ElementType;
(function(ElementType) {
    /** Type for the root element of a document */ ElementType["Root"] = "root";
    /** Type for Text */ ElementType["Text"] = "text";
    /** Type for <? ... ?> */ ElementType["Directive"] = "directive";
    /** Type for <!-- ... --> */ ElementType["Comment"] = "comment";
    /** Type for <script> tags */ ElementType["Script"] = "script";
    /** Type for <style> tags */ ElementType["Style"] = "style";
    /** Type for Any tag */ ElementType["Tag"] = "tag";
    /** Type for <![CDATA[ ... ]]> */ ElementType["CDATA"] = "cdata";
    /** Type for <!doctype ...> */ ElementType["Doctype"] = "doctype";
})(ElementType || (ElementType = {}));
function isTag(elem) {
    return elem.type === ElementType.Tag || elem.type === ElementType.Script || elem.type === ElementType.Style;
}
const Root = ElementType.Root;
const Text = ElementType.Text;
const Directive = ElementType.Directive;
const Comment = ElementType.Comment;
const Script = ElementType.Script;
const Style = ElementType.Style;
const Tag = ElementType.Tag;
const CDATA = ElementType.CDATA;
const Doctype = ElementType.Doctype;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/domhandler/lib/esm/node.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CDATA",
    ()=>CDATA,
    "Comment",
    ()=>Comment,
    "DataNode",
    ()=>DataNode,
    "Document",
    ()=>Document,
    "Element",
    ()=>Element,
    "Node",
    ()=>Node,
    "NodeWithChildren",
    ()=>NodeWithChildren,
    "ProcessingInstruction",
    ()=>ProcessingInstruction,
    "Text",
    ()=>Text,
    "cloneNode",
    ()=>cloneNode,
    "hasChildren",
    ()=>hasChildren,
    "isCDATA",
    ()=>isCDATA,
    "isComment",
    ()=>isComment,
    "isDirective",
    ()=>isDirective,
    "isDocument",
    ()=>isDocument,
    "isTag",
    ()=>isTag,
    "isText",
    ()=>isText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domelementtype/lib/esm/index.js [app-route] (ecmascript)");
;
class Node {
    constructor(){
        /** Parent of the node */ this.parent = null;
        /** Previous sibling */ this.prev = null;
        /** Next sibling */ this.next = null;
        /** The start index of the node. Requires `withStartIndices` on the handler to be `true. */ this.startIndex = null;
        /** The end index of the node. Requires `withEndIndices` on the handler to be `true. */ this.endIndex = null;
    }
    // Read-write aliases for properties
    /**
     * Same as {@link parent}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */ get parentNode() {
        return this.parent;
    }
    set parentNode(parent) {
        this.parent = parent;
    }
    /**
     * Same as {@link prev}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */ get previousSibling() {
        return this.prev;
    }
    set previousSibling(prev) {
        this.prev = prev;
    }
    /**
     * Same as {@link next}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */ get nextSibling() {
        return this.next;
    }
    set nextSibling(next) {
        this.next = next;
    }
    /**
     * Clone this node, and optionally its children.
     *
     * @param recursive Clone child nodes as well.
     * @returns A clone of the node.
     */ cloneNode(recursive = false) {
        return cloneNode(this, recursive);
    }
}
class DataNode extends Node {
    /**
     * @param data The content of the data node
     */ constructor(data){
        super();
        this.data = data;
    }
    /**
     * Same as {@link data}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */ get nodeValue() {
        return this.data;
    }
    set nodeValue(data) {
        this.data = data;
    }
}
class Text extends DataNode {
    constructor(){
        super(...arguments);
        this.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ElementType"].Text;
    }
    get nodeType() {
        return 3;
    }
}
class Comment extends DataNode {
    constructor(){
        super(...arguments);
        this.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ElementType"].Comment;
    }
    get nodeType() {
        return 8;
    }
}
class ProcessingInstruction extends DataNode {
    constructor(name, data){
        super(data);
        this.name = name;
        this.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ElementType"].Directive;
    }
    get nodeType() {
        return 1;
    }
}
class NodeWithChildren extends Node {
    /**
     * @param children Children of the node. Only certain node types can have children.
     */ constructor(children){
        super();
        this.children = children;
    }
    // Aliases
    /** First child of the node. */ get firstChild() {
        var _a;
        return (_a = this.children[0]) !== null && _a !== void 0 ? _a : null;
    }
    /** Last child of the node. */ get lastChild() {
        return this.children.length > 0 ? this.children[this.children.length - 1] : null;
    }
    /**
     * Same as {@link children}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */ get childNodes() {
        return this.children;
    }
    set childNodes(children) {
        this.children = children;
    }
}
class CDATA extends NodeWithChildren {
    constructor(){
        super(...arguments);
        this.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ElementType"].CDATA;
    }
    get nodeType() {
        return 4;
    }
}
class Document extends NodeWithChildren {
    constructor(){
        super(...arguments);
        this.type = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ElementType"].Root;
    }
    get nodeType() {
        return 9;
    }
}
class Element extends NodeWithChildren {
    /**
     * @param name Name of the tag, eg. `div`, `span`.
     * @param attribs Object mapping attribute names to attribute values.
     * @param children Children of the node.
     */ constructor(name, attribs, children = [], type = name === "script" ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ElementType"].Script : name === "style" ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ElementType"].Style : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ElementType"].Tag){
        super(children);
        this.name = name;
        this.attribs = attribs;
        this.type = type;
    }
    get nodeType() {
        return 1;
    }
    // DOM Level 1 aliases
    /**
     * Same as {@link name}.
     * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
     */ get tagName() {
        return this.name;
    }
    set tagName(name) {
        this.name = name;
    }
    get attributes() {
        return Object.keys(this.attribs).map((name)=>{
            var _a, _b;
            return {
                name,
                value: this.attribs[name],
                namespace: (_a = this["x-attribsNamespace"]) === null || _a === void 0 ? void 0 : _a[name],
                prefix: (_b = this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name]
            };
        });
    }
}
function isTag(node) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(node);
}
function isCDATA(node) {
    return node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ElementType"].CDATA;
}
function isText(node) {
    return node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ElementType"].Text;
}
function isComment(node) {
    return node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ElementType"].Comment;
}
function isDirective(node) {
    return node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ElementType"].Directive;
}
function isDocument(node) {
    return node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ElementType"].Root;
}
function hasChildren(node) {
    return Object.prototype.hasOwnProperty.call(node, "children");
}
function cloneNode(node, recursive = false) {
    let result;
    if (isText(node)) {
        result = new Text(node.data);
    } else if (isComment(node)) {
        result = new Comment(node.data);
    } else if (isTag(node)) {
        const children = recursive ? cloneChildren(node.children) : [];
        const clone = new Element(node.name, {
            ...node.attribs
        }, children);
        children.forEach((child)=>child.parent = clone);
        if (node.namespace != null) {
            clone.namespace = node.namespace;
        }
        if (node["x-attribsNamespace"]) {
            clone["x-attribsNamespace"] = {
                ...node["x-attribsNamespace"]
            };
        }
        if (node["x-attribsPrefix"]) {
            clone["x-attribsPrefix"] = {
                ...node["x-attribsPrefix"]
            };
        }
        result = clone;
    } else if (isCDATA(node)) {
        const children = recursive ? cloneChildren(node.children) : [];
        const clone = new CDATA(children);
        children.forEach((child)=>child.parent = clone);
        result = clone;
    } else if (isDocument(node)) {
        const children = recursive ? cloneChildren(node.children) : [];
        const clone = new Document(children);
        children.forEach((child)=>child.parent = clone);
        if (node["x-mode"]) {
            clone["x-mode"] = node["x-mode"];
        }
        result = clone;
    } else if (isDirective(node)) {
        const instruction = new ProcessingInstruction(node.name, node.data);
        if (node["x-name"] != null) {
            instruction["x-name"] = node["x-name"];
            instruction["x-publicId"] = node["x-publicId"];
            instruction["x-systemId"] = node["x-systemId"];
        }
        result = instruction;
    } else {
        throw new Error(`Not implemented yet: ${node.type}`);
    }
    result.startIndex = node.startIndex;
    result.endIndex = node.endIndex;
    if (node.sourceCodeLocation != null) {
        result.sourceCodeLocation = node.sourceCodeLocation;
    }
    return result;
}
function cloneChildren(childs) {
    const children = childs.map((child)=>cloneNode(child, true));
    for(let i = 1; i < children.length; i++){
        children[i].prev = children[i - 1];
        children[i - 1].next = children[i];
    }
    return children;
}
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/domhandler/lib/esm/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DomHandler",
    ()=>DomHandler,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domelementtype/lib/esm/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domhandler/lib/esm/node.js [app-route] (ecmascript)");
;
;
;
// Default options
const defaultOpts = {
    withStartIndices: false,
    withEndIndices: false,
    xmlMode: false
};
class DomHandler {
    /**
     * @param callback Called once parsing has completed.
     * @param options Settings for the handler.
     * @param elementCB Callback whenever a tag is closed.
     */ constructor(callback, options, elementCB){
        /** The elements of the DOM */ this.dom = [];
        /** The root element for the DOM */ this.root = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Document"](this.dom);
        /** Indicated whether parsing has been completed. */ this.done = false;
        /** Stack of open tags. */ this.tagStack = [
            this.root
        ];
        /** A data node that is still being written to. */ this.lastNode = null;
        /** Reference to the parser instance. Used for location information. */ this.parser = null;
        // Make it possible to skip arguments, for backwards-compatibility
        if (typeof options === "function") {
            elementCB = options;
            options = defaultOpts;
        }
        if (typeof callback === "object") {
            options = callback;
            callback = undefined;
        }
        this.callback = callback !== null && callback !== void 0 ? callback : null;
        this.options = options !== null && options !== void 0 ? options : defaultOpts;
        this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
    }
    onparserinit(parser) {
        this.parser = parser;
    }
    // Resets the handler back to starting state
    onreset() {
        this.dom = [];
        this.root = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Document"](this.dom);
        this.done = false;
        this.tagStack = [
            this.root
        ];
        this.lastNode = null;
        this.parser = null;
    }
    // Signals the handler that parsing is done
    onend() {
        if (this.done) return;
        this.done = true;
        this.parser = null;
        this.handleCallback(null);
    }
    onerror(error) {
        this.handleCallback(error);
    }
    onclosetag() {
        this.lastNode = null;
        const elem = this.tagStack.pop();
        if (this.options.withEndIndices) {
            elem.endIndex = this.parser.endIndex;
        }
        if (this.elementCB) this.elementCB(elem);
    }
    onopentag(name, attribs) {
        const type = this.options.xmlMode ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ElementType"].Tag : undefined;
        const element = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Element"](name, attribs, undefined, type);
        this.addNode(element);
        this.tagStack.push(element);
    }
    ontext(data) {
        const { lastNode } = this;
        if (lastNode && lastNode.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ElementType"].Text) {
            lastNode.data += data;
            if (this.options.withEndIndices) {
                lastNode.endIndex = this.parser.endIndex;
            }
        } else {
            const node = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"](data);
            this.addNode(node);
            this.lastNode = node;
        }
    }
    oncomment(data) {
        if (this.lastNode && this.lastNode.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ElementType"].Comment) {
            this.lastNode.data += data;
            return;
        }
        const node = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Comment"](data);
        this.addNode(node);
        this.lastNode = node;
    }
    oncommentend() {
        this.lastNode = null;
    }
    oncdatastart() {
        const text = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"]("");
        const node = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CDATA"]([
            text
        ]);
        this.addNode(node);
        text.parent = node;
        this.lastNode = text;
    }
    oncdataend() {
        this.lastNode = null;
    }
    onprocessinginstruction(name, data) {
        const node = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ProcessingInstruction"](name, data);
        this.addNode(node);
    }
    handleCallback(error) {
        if (typeof this.callback === "function") {
            this.callback(error, this.dom);
        } else if (error) {
            throw error;
        }
    }
    addNode(node) {
        const parent = this.tagStack[this.tagStack.length - 1];
        const previousSibling = parent.children[parent.children.length - 1];
        if (this.options.withStartIndices) {
            node.startIndex = this.parser.startIndex;
        }
        if (this.options.withEndIndices) {
            node.endIndex = this.parser.endIndex;
        }
        parent.children.push(node);
        if (previousSibling) {
            node.prev = previousSibling;
            previousSibling.next = node;
        }
        node.parent = parent;
        this.lastNode = null;
    }
}
const __TURBOPACK__default__export__ = DomHandler;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/leac/lib/leac.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createLexer",
    ()=>o
]);
const e = /\n/g;
function n(n) {
    const o = [
        ...n.matchAll(e)
    ].map((e)=>e.index || 0);
    o.unshift(-1);
    const s = t(o, 0, o.length);
    return (e)=>r(s, e);
}
function t(e, n, r) {
    if (r - n == 1) return {
        offset: e[n],
        index: n + 1
    };
    const o = Math.ceil((n + r) / 2), s = t(e, n, o), l = t(e, o, r);
    return {
        offset: s.offset,
        low: s,
        high: l
    };
}
function r(e, n) {
    return function(e) {
        return Object.prototype.hasOwnProperty.call(e, "index");
    }(e) ? {
        line: e.index,
        column: n - e.offset
    } : r(e.high.offset < n ? e.high : e.low, n);
}
function o(e, t = "", r = {}) {
    const o1 = "string" != typeof t ? t : r, l = "string" == typeof t ? t : "", c = e.map(s), f = !!o1.lineNumbers;
    return function(e, t = 0) {
        const r = f ? n(e) : ()=>({
                line: 0,
                column: 0
            });
        let o = t;
        const s = [];
        e: for(; o < e.length;){
            let n = !1;
            for (const t of c){
                t.regex.lastIndex = o;
                const c = t.regex.exec(e);
                if (c && c[0].length > 0) {
                    if (!t.discard) {
                        const e = r(o), n = "string" == typeof t.replace ? c[0].replace(new RegExp(t.regex.source, t.regex.flags), t.replace) : c[0];
                        s.push({
                            state: l,
                            name: t.name,
                            text: n,
                            offset: o,
                            len: c[0].length,
                            line: e.line,
                            column: e.column
                        });
                    }
                    if (o = t.regex.lastIndex, n = !0, t.push) {
                        const n = t.push(e, o);
                        s.push(...n.tokens), o = n.offset;
                    }
                    if (t.pop) break e;
                    break;
                }
            }
            if (!n) break;
        }
        return {
            tokens: s,
            offset: o,
            complete: e.length <= o
        };
    };
}
function s(e, n) {
    return {
        ...e,
        regex: l(e, n)
    };
}
function l(e, n) {
    if (0 === e.name.length) throw new Error(`Rule #${n} has empty name, which is not allowed.`);
    if (function(e) {
        return Object.prototype.hasOwnProperty.call(e, "regex");
    }(e)) return function(e) {
        if (e.global) throw new Error(`Regular expression /${e.source}/${e.flags} contains the global flag, which is not allowed.`);
        return e.sticky ? e : new RegExp(e.source, e.flags + "y");
    }(e.regex);
    if (function(e) {
        return Object.prototype.hasOwnProperty.call(e, "str");
    }(e)) {
        if (0 === e.str.length) throw new Error(`Rule #${n} ("${e.name}") has empty "str" property, which is not allowed.`);
        return new RegExp(c(e.str), "y");
    }
    return new RegExp(c(e.name), "y");
}
function c(e) {
    return e.replace(/[-[\]{}()*+!<=:?./\\^$|#\s,]/g, "\\$&");
}
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/peberminta/lib/util.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clamp",
    ()=>clamp,
    "escapeWhitespace",
    ()=>escapeWhitespace
]);
function clamp(left, x, right) {
    return Math.max(left, Math.min(x, right));
}
function escapeWhitespace(str) {
    return str.replace(/(\t)|(\r)|(\n)/g, (m, t, r)=>t ? '\\t' : r ? '\\r' : '\\n');
}
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/peberminta/lib/core.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ab",
    ()=>ab,
    "abc",
    ()=>abc,
    "action",
    ()=>action,
    "ahead",
    ()=>ahead,
    "all",
    ()=>all,
    "and",
    ()=>all,
    "any",
    ()=>any,
    "chain",
    ()=>chain,
    "chainReduce",
    ()=>chainReduce,
    "choice",
    ()=>choice,
    "condition",
    ()=>condition,
    "decide",
    ()=>decide,
    "discard",
    ()=>skip,
    "eitherOr",
    ()=>otherwise,
    "emit",
    ()=>emit,
    "end",
    ()=>end,
    "eof",
    ()=>end,
    "error",
    ()=>error,
    "fail",
    ()=>fail,
    "flatten",
    ()=>flatten,
    "flatten1",
    ()=>flatten1,
    "left",
    ()=>left,
    "leftAssoc1",
    ()=>leftAssoc1,
    "leftAssoc2",
    ()=>leftAssoc2,
    "longest",
    ()=>longest,
    "lookAhead",
    ()=>ahead,
    "make",
    ()=>make,
    "many",
    ()=>many,
    "many1",
    ()=>many1,
    "map",
    ()=>map,
    "map1",
    ()=>map1,
    "match",
    ()=>match,
    "middle",
    ()=>middle,
    "not",
    ()=>not,
    "of",
    ()=>emit,
    "option",
    ()=>option,
    "or",
    ()=>choice,
    "otherwise",
    ()=>otherwise,
    "parse",
    ()=>parse,
    "parserPosition",
    ()=>parserPosition,
    "peek",
    ()=>peek,
    "recursive",
    ()=>recursive,
    "reduceLeft",
    ()=>reduceLeft,
    "reduceRight",
    ()=>reduceRight,
    "remainingTokensNumber",
    ()=>remainingTokensNumber,
    "right",
    ()=>right,
    "rightAssoc1",
    ()=>rightAssoc1,
    "rightAssoc2",
    ()=>rightAssoc2,
    "satisfy",
    ()=>satisfy,
    "sepBy",
    ()=>sepBy,
    "sepBy1",
    ()=>sepBy1,
    "skip",
    ()=>skip,
    "some",
    ()=>many1,
    "start",
    ()=>start,
    "takeUntil",
    ()=>takeUntil,
    "takeUntilP",
    ()=>takeUntilP,
    "takeWhile",
    ()=>takeWhile,
    "takeWhileP",
    ()=>takeWhileP,
    "token",
    ()=>token,
    "tryParse",
    ()=>tryParse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$util$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/peberminta/lib/util.mjs [app-route] (ecmascript)");
;
function emit(value) {
    return (data, i)=>({
            matched: true,
            position: i,
            value: value
        });
}
function make(f) {
    return (data, i)=>({
            matched: true,
            position: i,
            value: f(data, i)
        });
}
function action(f) {
    return (data, i)=>{
        f(data, i);
        return {
            matched: true,
            position: i,
            value: null
        };
    };
}
function fail(data, i) {
    return {
        matched: false
    };
}
function error(message) {
    return (data, i)=>{
        throw new Error(message instanceof Function ? message(data, i) : message);
    };
}
function token(onToken, onEnd) {
    return (data, i)=>{
        let position = i;
        let value = undefined;
        if (i < data.tokens.length) {
            value = onToken(data.tokens[i], data, i);
            if (value !== undefined) {
                position++;
            }
        } else {
            onEnd?.(data, i);
        }
        return value === undefined ? {
            matched: false
        } : {
            matched: true,
            position: position,
            value: value
        };
    };
}
function any(data, i) {
    return i < data.tokens.length ? {
        matched: true,
        position: i + 1,
        value: data.tokens[i]
    } : {
        matched: false
    };
}
function satisfy(test) {
    return (data, i)=>i < data.tokens.length && test(data.tokens[i], data, i) ? {
            matched: true,
            position: i + 1,
            value: data.tokens[i]
        } : {
            matched: false
        };
}
function mapInner(r, f) {
    return r.matched ? {
        matched: true,
        position: r.position,
        value: f(r.value, r.position)
    } : r;
}
function mapOuter(r, f) {
    return r.matched ? f(r) : r;
}
function map(p, mapper) {
    return (data, i)=>mapInner(p(data, i), (v, j)=>mapper(v, data, i, j));
}
function map1(p, mapper) {
    return (data, i)=>mapOuter(p(data, i), (m)=>mapper(m, data, i));
}
function peek(p, f) {
    return (data, i)=>{
        const r = p(data, i);
        f(r, data, i);
        return r;
    };
}
function option(p, def) {
    return (data, i)=>{
        const r = p(data, i);
        return r.matched ? r : {
            matched: true,
            position: i,
            value: def
        };
    };
}
function not(p) {
    return (data, i)=>{
        const r = p(data, i);
        return r.matched ? {
            matched: false
        } : {
            matched: true,
            position: i,
            value: true
        };
    };
}
function choice(...ps) {
    return (data, i)=>{
        for (const p of ps){
            const result = p(data, i);
            if (result.matched) {
                return result;
            }
        }
        return {
            matched: false
        };
    };
}
function otherwise(pa, pb) {
    return (data, i)=>{
        const r1 = pa(data, i);
        return r1.matched ? r1 : pb(data, i);
    };
}
function longest(...ps) {
    return (data, i)=>{
        let match = undefined;
        for (const p of ps){
            const result = p(data, i);
            if (result.matched && (!match || match.position < result.position)) {
                match = result;
            }
        }
        return match || {
            matched: false
        };
    };
}
function takeWhile(p, test) {
    return (data, i)=>{
        const values = [];
        let success = true;
        do {
            const r = p(data, i);
            if (r.matched && test(r.value, values.length + 1, data, i, r.position)) {
                values.push(r.value);
                i = r.position;
            } else {
                success = false;
            }
        }while (success)
        return {
            matched: true,
            position: i,
            value: values
        };
    };
}
function takeUntil(p, test) {
    return takeWhile(p, (value, n, data, i, j)=>!test(value, n, data, i, j));
}
function takeWhileP(pValue, pTest) {
    return takeWhile(pValue, (value, n, data, i)=>pTest(data, i).matched);
}
function takeUntilP(pValue, pTest) {
    return takeWhile(pValue, (value, n, data, i)=>!pTest(data, i).matched);
}
function many(p) {
    return takeWhile(p, ()=>true);
}
function many1(p) {
    return ab(p, many(p), (head, tail)=>[
            head,
            ...tail
        ]);
}
function ab(pa, pb, join) {
    return (data, i)=>mapOuter(pa(data, i), (ma)=>mapInner(pb(data, ma.position), (vb, j)=>join(ma.value, vb, data, i, j)));
}
function left(pa, pb) {
    return ab(pa, pb, (va)=>va);
}
function right(pa, pb) {
    return ab(pa, pb, (va, vb)=>vb);
}
function abc(pa, pb, pc, join) {
    return (data, i)=>mapOuter(pa(data, i), (ma)=>mapOuter(pb(data, ma.position), (mb)=>mapInner(pc(data, mb.position), (vc, j)=>join(ma.value, mb.value, vc, data, i, j))));
}
function middle(pa, pb, pc) {
    return abc(pa, pb, pc, (ra, rb)=>rb);
}
function all(...ps) {
    return (data, i)=>{
        const result = [];
        let position = i;
        for (const p of ps){
            const r1 = p(data, position);
            if (r1.matched) {
                result.push(r1.value);
                position = r1.position;
            } else {
                return {
                    matched: false
                };
            }
        }
        return {
            matched: true,
            position: position,
            value: result
        };
    };
}
function skip(...ps) {
    return map(all(...ps), ()=>null);
}
function flatten(...ps) {
    return flatten1(all(...ps));
}
function flatten1(p) {
    return map(p, (vs)=>vs.flatMap((v)=>v));
}
function sepBy1(pValue, pSep) {
    return ab(pValue, many(right(pSep, pValue)), (head, tail)=>[
            head,
            ...tail
        ]);
}
function sepBy(pValue, pSep) {
    return otherwise(sepBy1(pValue, pSep), emit([]));
}
function chainReduce(acc, f) {
    return (data, i)=>{
        let loop = true;
        let acc1 = acc;
        let pos = i;
        do {
            const r = f(acc1, data, pos)(data, pos);
            if (r.matched) {
                acc1 = r.value;
                pos = r.position;
            } else {
                loop = false;
            }
        }while (loop)
        return {
            matched: true,
            position: pos,
            value: acc1
        };
    };
}
function reduceLeft(acc, p, reducer) {
    return chainReduce(acc, (acc)=>map(p, (v, data, i, j)=>reducer(acc, v, data, i, j)));
}
function reduceRight(p, acc, reducer) {
    return map(many(p), (vs, data, i, j)=>vs.reduceRight((acc, v)=>reducer(v, acc, data, i, j), acc));
}
function leftAssoc1(pLeft, pOper) {
    return chain(pLeft, (v0)=>reduceLeft(v0, pOper, (acc, f)=>f(acc)));
}
function rightAssoc1(pOper, pRight) {
    return ab(reduceRight(pOper, (y)=>y, (f, acc)=>(y)=>f(acc(y))), pRight, (f, v)=>f(v));
}
function leftAssoc2(pLeft, pOper, pRight) {
    return chain(pLeft, (v0)=>reduceLeft(v0, ab(pOper, pRight, (f, y)=>[
                f,
                y
            ]), (acc, [f, y])=>f(acc, y)));
}
function rightAssoc2(pLeft, pOper, pRight) {
    return ab(reduceRight(ab(pLeft, pOper, (x, f)=>[
            x,
            f
        ]), (y)=>y, ([x, f], acc)=>(y)=>f(x, acc(y))), pRight, (f, v)=>f(v));
}
function condition(cond, pTrue, pFalse) {
    return (data, i)=>cond(data, i) ? pTrue(data, i) : pFalse(data, i);
}
function decide(p) {
    return (data, i)=>mapOuter(p(data, i), (m1)=>m1.value(data, m1.position));
}
function chain(p, f) {
    return (data, i)=>mapOuter(p(data, i), (m1)=>f(m1.value, data, i, m1.position)(data, m1.position));
}
function ahead(p) {
    return (data, i)=>mapOuter(p(data, i), (m1)=>({
                matched: true,
                position: i,
                value: m1.value
            }));
}
function recursive(f) {
    return function(data, i) {
        return f()(data, i);
    };
}
function start(data, i) {
    return i !== 0 ? {
        matched: false
    } : {
        matched: true,
        position: i,
        value: true
    };
}
function end(data, i) {
    return i < data.tokens.length ? {
        matched: false
    } : {
        matched: true,
        position: i,
        value: true
    };
}
function remainingTokensNumber(data, i) {
    return data.tokens.length - i;
}
function parserPosition(data, i, formatToken, contextTokens = 3) {
    const len = data.tokens.length;
    const lowIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$util$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clamp"])(0, i - contextTokens, len - contextTokens);
    const highIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$util$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clamp"])(contextTokens, i + 1 + contextTokens, len);
    const tokensSlice = data.tokens.slice(lowIndex, highIndex);
    const lines = [];
    const indexWidth = String(highIndex - 1).length + 1;
    if (i < 0) {
        lines.push(`${String(i).padStart(indexWidth)} >>`);
    }
    if (0 < lowIndex) {
        lines.push('...'.padStart(indexWidth + 6));
    }
    for(let j = 0; j < tokensSlice.length; j++){
        const index = lowIndex + j;
        lines.push(`${String(index).padStart(indexWidth)} ${index === i ? '>' : ' '} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$util$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["escapeWhitespace"])(formatToken(tokensSlice[j]))}`);
    }
    if (highIndex < len) {
        lines.push('...'.padStart(indexWidth + 6));
    }
    if (len <= i) {
        lines.push(`${String(i).padStart(indexWidth)} >>`);
    }
    return lines.join('\n');
}
function parse(parser, tokens, options, formatToken = JSON.stringify) {
    const data = {
        tokens: tokens,
        options: options
    };
    const result = parser(data, 0);
    if (!result.matched) {
        throw new Error('No match');
    }
    if (result.position < data.tokens.length) {
        throw new Error(`Partial match. Parsing stopped at:\n${parserPosition(data, result.position, formatToken)}`);
    }
    return result.value;
}
function tryParse(parser, tokens, options) {
    const result = parser({
        tokens: tokens,
        options: options
    }, 0);
    return result.matched ? result.value : undefined;
}
function match(matcher, tokens, options) {
    const result = matcher({
        tokens: tokens,
        options: options
    }, 0);
    return result.value;
}
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/parseley/lib/parseley.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Ast",
    ()=>ast,
    "compareSelectors",
    ()=>compareSelectors,
    "compareSpecificity",
    ()=>compareSpecificity,
    "normalize",
    ()=>normalize,
    "parse",
    ()=>parse,
    "parse1",
    ()=>parse1,
    "serialize",
    ()=>serialize
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$leac$2f$lib$2f$leac$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/leac/lib/leac.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/peberminta/lib/core.mjs [app-route] (ecmascript)");
;
;
var ast = /*#__PURE__*/ Object.freeze({
    __proto__: null
});
const ws = `(?:[ \\t\\r\\n\\f]*)`;
const nl = `(?:\\n|\\r\\n|\\r|\\f)`;
const nonascii = `[^\\x00-\\x7F]`;
const unicode = `(?:\\\\[0-9a-f]{1,6}(?:\\r\\n|[ \\n\\r\\t\\f])?)`;
const escape = `(?:\\\\[^\\n\\r\\f0-9a-f])`;
const nmstart = `(?:[_a-z]|${nonascii}|${unicode}|${escape})`;
const nmchar = `(?:[_a-z0-9-]|${nonascii}|${unicode}|${escape})`;
const name = `(?:${nmchar}+)`;
const ident = `(?:[-]?${nmstart}${nmchar}*)`;
const string1 = `'([^\\n\\r\\f\\\\']|\\\\${nl}|${nonascii}|${unicode}|${escape})*'`;
const string2 = `"([^\\n\\r\\f\\\\"]|\\\\${nl}|${nonascii}|${unicode}|${escape})*"`;
const lexSelector = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$leac$2f$lib$2f$leac$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLexer"])([
    {
        name: 'ws',
        regex: new RegExp(ws)
    },
    {
        name: 'hash',
        regex: new RegExp(`#${name}`, 'i')
    },
    {
        name: 'ident',
        regex: new RegExp(ident, 'i')
    },
    {
        name: 'str1',
        regex: new RegExp(string1, 'i')
    },
    {
        name: 'str2',
        regex: new RegExp(string2, 'i')
    },
    {
        name: '*'
    },
    {
        name: '.'
    },
    {
        name: ','
    },
    {
        name: '['
    },
    {
        name: ']'
    },
    {
        name: '='
    },
    {
        name: '>'
    },
    {
        name: '|'
    },
    {
        name: '+'
    },
    {
        name: '~'
    },
    {
        name: '^'
    },
    {
        name: '$'
    }
]);
const lexEscapedString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$leac$2f$lib$2f$leac$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLexer"])([
    {
        name: 'unicode',
        regex: new RegExp(unicode, 'i')
    },
    {
        name: 'escape',
        regex: new RegExp(escape, 'i')
    },
    {
        name: 'any',
        regex: new RegExp('[\\s\\S]', 'i')
    }
]);
function sumSpec([a0, a1, a2], [b0, b1, b2]) {
    return [
        a0 + b0,
        a1 + b1,
        a2 + b2
    ];
}
function sumAllSpec(ss) {
    return ss.reduce(sumSpec, [
        0,
        0,
        0
    ]);
}
const unicodeEscapedSequence_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["token"]((t)=>t.name === 'unicode' ? String.fromCodePoint(parseInt(t.text.slice(1), 16)) : undefined);
const escapedSequence_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["token"]((t)=>t.name === 'escape' ? t.text.slice(1) : undefined);
const anyChar_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["token"]((t)=>t.name === 'any' ? t.text : undefined);
const escapedString_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["many"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["or"](unicodeEscapedSequence_, escapedSequence_, anyChar_)), (cs)=>cs.join(''));
function unescape(escapedString) {
    const lexerResult = lexEscapedString(escapedString);
    const result = escapedString_({
        tokens: lexerResult.tokens,
        options: undefined
    }, 0);
    return result.value;
}
function literal(name) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["token"]((t)=>t.name === name ? true : undefined);
}
const whitespace_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["token"]((t)=>t.name === 'ws' ? null : undefined);
const optionalWhitespace_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["option"](whitespace_, null);
function optionallySpaced(parser) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["middle"](optionalWhitespace_, parser, optionalWhitespace_);
}
const identifier_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["token"]((t)=>t.name === 'ident' ? unescape(t.text) : undefined);
const hashId_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["token"]((t)=>t.name === 'hash' ? unescape(t.text.slice(1)) : undefined);
const string_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["token"]((t)=>t.name.startsWith('str') ? unescape(t.text.slice(1, -1)) : undefined);
const namespace_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["left"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["option"](identifier_, ''), literal('|'));
const qualifiedName_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eitherOr"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ab"](namespace_, identifier_, (ns, name)=>({
        name: name,
        namespace: ns
    })), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"](identifier_, (name)=>({
        name: name,
        namespace: null
    })));
const uniSelector_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eitherOr"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ab"](namespace_, literal('*'), (ns)=>({
        type: 'universal',
        namespace: ns,
        specificity: [
            0,
            0,
            0
        ]
    })), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"](literal('*'), ()=>({
        type: 'universal',
        namespace: null,
        specificity: [
            0,
            0,
            0
        ]
    })));
const tagSelector_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"](qualifiedName_, ({ name, namespace })=>({
        type: 'tag',
        name: name,
        namespace: namespace,
        specificity: [
            0,
            0,
            1
        ]
    }));
const classSelector_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ab"](literal('.'), identifier_, (fullstop, name)=>({
        type: 'class',
        name: name,
        specificity: [
            0,
            1,
            0
        ]
    }));
const idSelector_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"](hashId_, (name)=>({
        type: 'id',
        name: name,
        specificity: [
            1,
            0,
            0
        ]
    }));
const attrModifier_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["token"]((t)=>{
    if (t.name === 'ident') {
        if (t.text === 'i' || t.text === 'I') {
            return 'i';
        }
        if (t.text === 's' || t.text === 'S') {
            return 's';
        }
    }
    return undefined;
});
const attrValue_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eitherOr"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ab"](string_, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["option"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["right"](optionalWhitespace_, attrModifier_), null), (v, mod)=>({
        value: v,
        modifier: mod
    })), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ab"](identifier_, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["option"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["right"](whitespace_, attrModifier_), null), (v, mod)=>({
        value: v,
        modifier: mod
    })));
const attrMatcher_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["choice"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"](literal('='), ()=>'='), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ab"](literal('~'), literal('='), ()=>'~='), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ab"](literal('|'), literal('='), ()=>'|='), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ab"](literal('^'), literal('='), ()=>'^='), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ab"](literal('$'), literal('='), ()=>'$='), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ab"](literal('*'), literal('='), ()=>'*='));
const attrPresenceSelector_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["abc"](literal('['), optionallySpaced(qualifiedName_), literal(']'), (lbr, { name, namespace })=>({
        type: 'attrPresence',
        name: name,
        namespace: namespace,
        specificity: [
            0,
            1,
            0
        ]
    }));
const attrValueSelector_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["middle"](literal('['), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["abc"](optionallySpaced(qualifiedName_), attrMatcher_, optionallySpaced(attrValue_), ({ name, namespace }, matcher, { value, modifier })=>({
        type: 'attrValue',
        name: name,
        namespace: namespace,
        matcher: matcher,
        value: value,
        modifier: modifier,
        specificity: [
            0,
            1,
            0
        ]
    })), literal(']'));
const attrSelector_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eitherOr"](attrPresenceSelector_, attrValueSelector_);
const typeSelector_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eitherOr"](uniSelector_, tagSelector_);
const subclassSelector_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["choice"](idSelector_, classSelector_, attrSelector_);
const compoundSelector_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eitherOr"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["flatten"](typeSelector_, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["many"](subclassSelector_)), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["many1"](subclassSelector_)), (ss)=>{
    return {
        type: 'compound',
        list: ss,
        specificity: sumAllSpec(ss.map((s)=>s.specificity))
    };
});
const combinator_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["choice"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"](literal('>'), ()=>'>'), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"](literal('+'), ()=>'+'), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"](literal('~'), ()=>'~'), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ab"](literal('|'), literal('|'), ()=>'||'));
const combinatorSeparator_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eitherOr"](optionallySpaced(combinator_), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"](whitespace_, ()=>' '));
const complexSelector_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["leftAssoc2"](compoundSelector_, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"](combinatorSeparator_, (c)=>(left, right)=>({
            type: 'compound',
            list: [
                ...right.list,
                {
                    type: 'combinator',
                    combinator: c,
                    left: left,
                    specificity: left.specificity
                }
            ],
            specificity: sumSpec(left.specificity, right.specificity)
        })), compoundSelector_);
const listSelector_ = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["leftAssoc2"](__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"](complexSelector_, (s)=>({
        type: 'list',
        list: [
            s
        ]
    })), __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$peberminta$2f$lib$2f$core$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"](optionallySpaced(literal(',')), ()=>(acc, next)=>({
            type: 'list',
            list: [
                ...acc.list,
                next
            ]
        })), complexSelector_);
function parse_(parser, str) {
    if (!(typeof str === 'string' || str instanceof String)) {
        throw new Error('Expected a selector string. Actual input is not a string!');
    }
    const lexerResult = lexSelector(str);
    if (!lexerResult.complete) {
        throw new Error(`The input "${str}" was only partially tokenized, stopped at offset ${lexerResult.offset}!\n` + prettyPrintPosition(str, lexerResult.offset));
    }
    const result = optionallySpaced(parser)({
        tokens: lexerResult.tokens,
        options: undefined
    }, 0);
    if (!result.matched) {
        throw new Error(`No match for "${str}" input!`);
    }
    if (result.position < lexerResult.tokens.length) {
        const token = lexerResult.tokens[result.position];
        throw new Error(`The input "${str}" was only partially parsed, stopped at offset ${token.offset}!\n` + prettyPrintPosition(str, token.offset, token.len));
    }
    return result.value;
}
function prettyPrintPosition(str, offset, len = 1) {
    return `${str.replace(/(\t)|(\r)|(\n)/g, (m, t, r)=>t ? '\u2409' : r ? '\u240d' : '\u240a')}\n${''.padEnd(offset)}${'^'.repeat(len)}`;
}
function parse(str) {
    return parse_(listSelector_, str);
}
function parse1(str) {
    return parse_(complexSelector_, str);
}
function serialize(selector) {
    if (!selector.type) {
        throw new Error('This is not an AST node.');
    }
    switch(selector.type){
        case 'universal':
            return _serNs(selector.namespace) + '*';
        case 'tag':
            return _serNs(selector.namespace) + _serIdent(selector.name);
        case 'class':
            return '.' + _serIdent(selector.name);
        case 'id':
            return '#' + _serIdent(selector.name);
        case 'attrPresence':
            return `[${_serNs(selector.namespace)}${_serIdent(selector.name)}]`;
        case 'attrValue':
            return `[${_serNs(selector.namespace)}${_serIdent(selector.name)}${selector.matcher}"${_serStr(selector.value)}"${selector.modifier ? selector.modifier : ''}]`;
        case 'combinator':
            return serialize(selector.left) + selector.combinator;
        case 'compound':
            return selector.list.reduce((acc, node)=>{
                if (node.type === 'combinator') {
                    return serialize(node) + acc;
                } else {
                    return acc + serialize(node);
                }
            }, '');
        case 'list':
            return selector.list.map(serialize).join(',');
    }
}
function _serNs(ns) {
    return ns || ns === '' ? _serIdent(ns) + '|' : '';
}
function _codePoint(char) {
    return `\\${char.codePointAt(0).toString(16)} `;
}
function _serIdent(str) {
    return str.replace(/(^[0-9])|(^-[0-9])|(^-$)|([-0-9a-zA-Z_]|[^\x00-\x7F])|(\x00)|([\x01-\x1f]|\x7f)|([\s\S])/g, (m, d1, d2, hy, safe, nl, ctrl, other)=>d1 ? _codePoint(d1) : d2 ? '-' + _codePoint(d2.slice(1)) : hy ? '\\-' : safe ? safe : nl ? '\ufffd' : ctrl ? _codePoint(ctrl) : '\\' + other);
}
function _serStr(str) {
    return str.replace(/(")|(\\)|(\x00)|([\x01-\x1f]|\x7f)/g, (m, dq, bs, nl, ctrl)=>dq ? '\\"' : bs ? '\\\\' : nl ? '\ufffd' : _codePoint(ctrl));
}
function normalize(selector) {
    if (!selector.type) {
        throw new Error('This is not an AST node.');
    }
    switch(selector.type){
        case 'compound':
            {
                selector.list.forEach(normalize);
                selector.list.sort((a, b)=>_compareArrays(_getSelectorPriority(a), _getSelectorPriority(b)));
                break;
            }
        case 'combinator':
            {
                normalize(selector.left);
                break;
            }
        case 'list':
            {
                selector.list.forEach(normalize);
                selector.list.sort((a, b)=>serialize(a) < serialize(b) ? -1 : 1);
                break;
            }
    }
    return selector;
}
function _getSelectorPriority(selector) {
    switch(selector.type){
        case 'universal':
            return [
                1
            ];
        case 'tag':
            return [
                1
            ];
        case 'id':
            return [
                2
            ];
        case 'class':
            return [
                3,
                selector.name
            ];
        case 'attrPresence':
            return [
                4,
                serialize(selector)
            ];
        case 'attrValue':
            return [
                5,
                serialize(selector)
            ];
        case 'combinator':
            return [
                15,
                serialize(selector)
            ];
    }
}
function compareSelectors(a, b) {
    return _compareArrays(a.specificity, b.specificity);
}
function compareSpecificity(a, b) {
    return _compareArrays(a, b);
}
function _compareArrays(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) {
        throw new Error('Arguments must be arrays.');
    }
    const shorter = a.length < b.length ? a.length : b.length;
    for(let i = 0; i < shorter; i++){
        if (a[i] === b[i]) {
            continue;
        }
        return a[i] < b[i] ? -1 : 1;
    }
    return a.length - b.length;
}
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/selderee/lib/selderee.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Ast",
    ()=>Ast,
    "DecisionTree",
    ()=>DecisionTree,
    "Picker",
    ()=>Picker,
    "Treeify",
    ()=>TreeifyBuilder,
    "Types",
    ()=>Types
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$parseley$2f$lib$2f$parseley$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/parseley/lib/parseley.mjs [app-route] (ecmascript)");
;
;
var Ast = /*#__PURE__*/ Object.freeze({
    __proto__: null
});
var Types = /*#__PURE__*/ Object.freeze({
    __proto__: null
});
const treeify = (nodes)=>'▽\n' + treeifyArray(nodes, thinLines);
const thinLines = [
    [
        '├─',
        '│ '
    ],
    [
        '└─',
        '  '
    ]
];
const heavyLines = [
    [
        '┠─',
        '┃ '
    ],
    [
        '┖─',
        '  '
    ]
];
const doubleLines = [
    [
        '╟─',
        '║ '
    ],
    [
        '╙─',
        '  '
    ]
];
function treeifyArray(nodes, tpl = heavyLines) {
    return prefixItems(tpl, nodes.map((n)=>treeifyNode(n)));
}
function treeifyNode(node) {
    switch(node.type){
        case 'terminal':
            {
                const vctr = node.valueContainer;
                return `◁ #${vctr.index} ${JSON.stringify(vctr.specificity)} ${vctr.value}`;
            }
        case 'tagName':
            return `◻ Tag name\n${treeifyArray(node.variants, doubleLines)}`;
        case 'attrValue':
            return `▣ Attr value: ${node.name}\n${treeifyArray(node.matchers, doubleLines)}`;
        case 'attrPresence':
            return `◨ Attr presence: ${node.name}\n${treeifyArray(node.cont)}`;
        case 'pushElement':
            return `◉ Push element: ${node.combinator}\n${treeifyArray(node.cont, thinLines)}`;
        case 'popElement':
            return `◌ Pop element\n${treeifyArray(node.cont, thinLines)}`;
        case 'variant':
            return `◇ = ${node.value}\n${treeifyArray(node.cont)}`;
        case 'matcher':
            return `◈ ${node.matcher} "${node.value}"${node.modifier || ''}\n${treeifyArray(node.cont)}`;
    }
}
function prefixItems(tpl, items) {
    return items.map((item, i, { length })=>prefixItem(tpl, item, i === length - 1)).join('\n');
}
function prefixItem(tpl, item, tail = true) {
    const tpl1 = tpl[tail ? 1 : 0];
    return tpl1[0] + item.split('\n').join('\n' + tpl1[1]);
}
var TreeifyBuilder = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    treeify: treeify
});
class DecisionTree {
    constructor(input){
        this.branches = weave(toAstTerminalPairs(input));
    }
    build(builder) {
        return builder(this.branches);
    }
}
function toAstTerminalPairs(array) {
    const len = array.length;
    const results = new Array(len);
    for(let i = 0; i < len; i++){
        const [selectorString, val] = array[i];
        const ast = preprocess(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$parseley$2f$lib$2f$parseley$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parse1"](selectorString));
        results[i] = {
            ast: ast,
            terminal: {
                type: 'terminal',
                valueContainer: {
                    index: i,
                    value: val,
                    specificity: ast.specificity
                }
            }
        };
    }
    return results;
}
function preprocess(ast) {
    reduceSelectorVariants(ast);
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$parseley$2f$lib$2f$parseley$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalize"](ast);
    return ast;
}
function reduceSelectorVariants(ast) {
    const newList = [];
    ast.list.forEach((sel)=>{
        switch(sel.type){
            case 'class':
                newList.push({
                    matcher: '~=',
                    modifier: null,
                    name: 'class',
                    namespace: null,
                    specificity: sel.specificity,
                    type: 'attrValue',
                    value: sel.name
                });
                break;
            case 'id':
                newList.push({
                    matcher: '=',
                    modifier: null,
                    name: 'id',
                    namespace: null,
                    specificity: sel.specificity,
                    type: 'attrValue',
                    value: sel.name
                });
                break;
            case 'combinator':
                reduceSelectorVariants(sel.left);
                newList.push(sel);
                break;
            case 'universal':
                break;
            default:
                newList.push(sel);
                break;
        }
    });
    ast.list = newList;
}
function weave(items) {
    const branches = [];
    while(items.length){
        const topKind = findTopKey(items, (sel)=>true, getSelectorKind);
        const { matches, nonmatches, empty } = breakByKind(items, topKind);
        items = nonmatches;
        if (matches.length) {
            branches.push(branchOfKind(topKind, matches));
        }
        if (empty.length) {
            branches.push(...terminate(empty));
        }
    }
    return branches;
}
function terminate(items) {
    const results = [];
    for (const item of items){
        const terminal = item.terminal;
        if (terminal.type === 'terminal') {
            results.push(terminal);
        } else {
            const { matches, rest } = partition(terminal.cont, (node)=>node.type === 'terminal');
            matches.forEach((node)=>results.push(node));
            if (rest.length) {
                terminal.cont = rest;
                results.push(terminal);
            }
        }
    }
    return results;
}
function breakByKind(items, selectedKind) {
    const matches = [];
    const nonmatches = [];
    const empty = [];
    for (const item of items){
        const simpsels = item.ast.list;
        if (simpsels.length) {
            const isMatch = simpsels.some((node)=>getSelectorKind(node) === selectedKind);
            (isMatch ? matches : nonmatches).push(item);
        } else {
            empty.push(item);
        }
    }
    return {
        matches,
        nonmatches,
        empty
    };
}
function getSelectorKind(sel) {
    switch(sel.type){
        case 'attrPresence':
            return `attrPresence ${sel.name}`;
        case 'attrValue':
            return `attrValue ${sel.name}`;
        case 'combinator':
            return `combinator ${sel.combinator}`;
        default:
            return sel.type;
    }
}
function branchOfKind(kind, items) {
    if (kind === 'tag') {
        return tagNameBranch(items);
    }
    if (kind.startsWith('attrValue ')) {
        return attrValueBranch(kind.substring(10), items);
    }
    if (kind.startsWith('attrPresence ')) {
        return attrPresenceBranch(kind.substring(13), items);
    }
    if (kind === 'combinator >') {
        return combinatorBranch('>', items);
    }
    if (kind === 'combinator +') {
        return combinatorBranch('+', items);
    }
    throw new Error(`Unsupported selector kind: ${kind}`);
}
function tagNameBranch(items) {
    const groups = spliceAndGroup(items, (x)=>x.type === 'tag', (x)=>x.name);
    const variants = Object.entries(groups).map(([name, group])=>({
            type: 'variant',
            value: name,
            cont: weave(group.items)
        }));
    return {
        type: 'tagName',
        variants: variants
    };
}
function attrPresenceBranch(name, items) {
    for (const item of items){
        spliceSimpleSelector(item, (x)=>x.type === 'attrPresence' && x.name === name);
    }
    return {
        type: 'attrPresence',
        name: name,
        cont: weave(items)
    };
}
function attrValueBranch(name, items) {
    const groups = spliceAndGroup(items, (x)=>x.type === 'attrValue' && x.name === name, (x)=>`${x.matcher} ${x.modifier || ''} ${x.value}`);
    const matchers = [];
    for (const group of Object.values(groups)){
        const sel = group.oneSimpleSelector;
        const predicate = getAttrPredicate(sel);
        const continuation = weave(group.items);
        matchers.push({
            type: 'matcher',
            matcher: sel.matcher,
            modifier: sel.modifier,
            value: sel.value,
            predicate: predicate,
            cont: continuation
        });
    }
    return {
        type: 'attrValue',
        name: name,
        matchers: matchers
    };
}
function getAttrPredicate(sel) {
    if (sel.modifier === 'i') {
        const expected = sel.value.toLowerCase();
        switch(sel.matcher){
            case '=':
                return (actual)=>expected === actual.toLowerCase();
            case '~=':
                return (actual)=>actual.toLowerCase().split(/[ \t]+/).includes(expected);
            case '^=':
                return (actual)=>actual.toLowerCase().startsWith(expected);
            case '$=':
                return (actual)=>actual.toLowerCase().endsWith(expected);
            case '*=':
                return (actual)=>actual.toLowerCase().includes(expected);
            case '|=':
                return (actual)=>{
                    const lower = actual.toLowerCase();
                    return expected === lower || lower.startsWith(expected) && lower[expected.length] === '-';
                };
        }
    } else {
        const expected = sel.value;
        switch(sel.matcher){
            case '=':
                return (actual)=>expected === actual;
            case '~=':
                return (actual)=>actual.split(/[ \t]+/).includes(expected);
            case '^=':
                return (actual)=>actual.startsWith(expected);
            case '$=':
                return (actual)=>actual.endsWith(expected);
            case '*=':
                return (actual)=>actual.includes(expected);
            case '|=':
                return (actual)=>expected === actual || actual.startsWith(expected) && actual[expected.length] === '-';
        }
    }
}
function combinatorBranch(combinator, items) {
    const groups = spliceAndGroup(items, (x)=>x.type === 'combinator' && x.combinator === combinator, (x)=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$parseley$2f$lib$2f$parseley$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serialize"](x.left));
    const leftItems = [];
    for (const group of Object.values(groups)){
        const rightCont = weave(group.items);
        const leftAst = group.oneSimpleSelector.left;
        leftItems.push({
            ast: leftAst,
            terminal: {
                type: 'popElement',
                cont: rightCont
            }
        });
    }
    return {
        type: 'pushElement',
        combinator: combinator,
        cont: weave(leftItems)
    };
}
function spliceAndGroup(items, predicate, keyCallback) {
    const groups = {};
    while(items.length){
        const bestKey = findTopKey(items, predicate, keyCallback);
        const bestKeyPredicate = (sel)=>predicate(sel) && keyCallback(sel) === bestKey;
        const hasBestKeyPredicate = (item)=>item.ast.list.some(bestKeyPredicate);
        const { matches, rest } = partition1(items, hasBestKeyPredicate);
        let oneSimpleSelector = null;
        for (const item of matches){
            const splicedNode = spliceSimpleSelector(item, bestKeyPredicate);
            if (!oneSimpleSelector) {
                oneSimpleSelector = splicedNode;
            }
        }
        if (oneSimpleSelector == null) {
            throw new Error('No simple selector is found.');
        }
        groups[bestKey] = {
            oneSimpleSelector: oneSimpleSelector,
            items: matches
        };
        items = rest;
    }
    return groups;
}
function spliceSimpleSelector(item, predicate) {
    const simpsels = item.ast.list;
    const matches = new Array(simpsels.length);
    let firstIndex = -1;
    for(let i = simpsels.length; i-- > 0;){
        if (predicate(simpsels[i])) {
            matches[i] = true;
            firstIndex = i;
        }
    }
    if (firstIndex == -1) {
        throw new Error(`Couldn't find the required simple selector.`);
    }
    const result = simpsels[firstIndex];
    item.ast.list = simpsels.filter((sel, i)=>!matches[i]);
    return result;
}
function findTopKey(items, predicate, keyCallback) {
    const candidates = {};
    for (const item of items){
        const candidates1 = {};
        for (const node of item.ast.list.filter(predicate)){
            candidates1[keyCallback(node)] = true;
        }
        for (const key of Object.keys(candidates1)){
            if (candidates[key]) {
                candidates[key]++;
            } else {
                candidates[key] = 1;
            }
        }
    }
    let topKind = '';
    let topCounter = 0;
    for (const entry of Object.entries(candidates)){
        if (entry[1] > topCounter) {
            topKind = entry[0];
            topCounter = entry[1];
        }
    }
    return topKind;
}
function partition(src, predicate) {
    const matches = [];
    const rest = [];
    for (const x of src){
        if (predicate(x)) {
            matches.push(x);
        } else {
            rest.push(x);
        }
    }
    return {
        matches,
        rest
    };
}
function partition1(src, predicate) {
    const matches = [];
    const rest = [];
    for (const x of src){
        if (predicate(x)) {
            matches.push(x);
        } else {
            rest.push(x);
        }
    }
    return {
        matches,
        rest
    };
}
class Picker {
    constructor(f){
        this.f = f;
    }
    pickAll(el) {
        return this.f(el);
    }
    pick1(el, preferFirst = false) {
        const results = this.f(el);
        const len = results.length;
        if (len === 0) {
            return null;
        }
        if (len === 1) {
            return results[0].value;
        }
        const comparator = preferFirst ? comparatorPreferFirst : comparatorPreferLast;
        let result = results[0];
        for(let i = 1; i < len; i++){
            const next = results[i];
            if (comparator(result, next)) {
                result = next;
            }
        }
        return result.value;
    }
}
function comparatorPreferFirst(acc, next) {
    const diff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$parseley$2f$lib$2f$parseley$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["compareSpecificity"])(next.specificity, acc.specificity);
    return diff > 0 || diff === 0 && next.index < acc.index;
}
function comparatorPreferLast(acc, next) {
    const diff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$parseley$2f$lib$2f$parseley$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["compareSpecificity"])(next.specificity, acc.specificity);
    return diff > 0 || diff === 0 && next.index > acc.index;
}
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@selderee/plugin-htmlparser2/lib/hp2-builder.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hp2Builder",
    ()=>hp2Builder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domhandler/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domhandler/lib/esm/node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$selderee$2f$lib$2f$selderee$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/selderee/lib/selderee.mjs [app-route] (ecmascript)");
;
;
function hp2Builder(nodes) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$selderee$2f$lib$2f$selderee$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Picker"](handleArray(nodes));
}
function handleArray(nodes) {
    const matchers = nodes.map(handleNode);
    return (el, ...tail)=>matchers.flatMap((m)=>m(el, ...tail));
}
function handleNode(node) {
    switch(node.type){
        case 'terminal':
            {
                const result = [
                    node.valueContainer
                ];
                return (el, ...tail)=>result;
            }
        case 'tagName':
            return handleTagName(node);
        case 'attrValue':
            return handleAttrValueName(node);
        case 'attrPresence':
            return handleAttrPresenceName(node);
        case 'pushElement':
            return handlePushElementNode(node);
        case 'popElement':
            return handlePopElementNode(node);
    }
}
function handleTagName(node) {
    const variants = {};
    for (const variant of node.variants){
        variants[variant.value] = handleArray(variant.cont);
    }
    return (el, ...tail)=>{
        const continuation = variants[el.name];
        return continuation ? continuation(el, ...tail) : [];
    };
}
function handleAttrPresenceName(node) {
    const attrName = node.name;
    const continuation = handleArray(node.cont);
    return (el, ...tail)=>Object.prototype.hasOwnProperty.call(el.attribs, attrName) ? continuation(el, ...tail) : [];
}
function handleAttrValueName(node) {
    const callbacks = [];
    for (const matcher of node.matchers){
        const predicate = matcher.predicate;
        const continuation = handleArray(matcher.cont);
        callbacks.push((attr, el, ...tail)=>predicate(attr) ? continuation(el, ...tail) : []);
    }
    const attrName = node.name;
    return (el, ...tail)=>{
        const attr = el.attribs[attrName];
        return attr || attr === '' ? callbacks.flatMap((cb)=>cb(attr, el, ...tail)) : [];
    };
}
function handlePushElementNode(node) {
    const continuation = handleArray(node.cont);
    const leftElementGetter = node.combinator === '+' ? getPrecedingElement : getParentElement;
    return (el, ...tail)=>{
        const next = leftElementGetter(el);
        if (next === null) {
            return [];
        }
        return continuation(next, el, ...tail);
    };
}
const getPrecedingElement = (el)=>{
    const prev = el.prev;
    if (prev === null) {
        return null;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(prev) ? prev : getPrecedingElement(prev);
};
const getParentElement = (el)=>{
    const parent = el.parent;
    return parent && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(parent) ? parent : null;
};
function handlePopElementNode(node) {
    const continuation = handleArray(node.cont);
    return (el, next, ...tail)=>continuation(next, ...tail);
}
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/htmlparser2/lib/esm/Tokenizer.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuoteType",
    ()=>QuoteType,
    "default",
    ()=>Tokenizer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$decode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/entities/lib/esm/decode.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$generated$2f$decode$2d$data$2d$html$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__htmlDecodeTree$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/entities/lib/esm/generated/decode-data-html.js [app-route] (ecmascript) <export default as htmlDecodeTree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$generated$2f$decode$2d$data$2d$xml$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__xmlDecodeTree$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/entities/lib/esm/generated/decode-data-xml.js [app-route] (ecmascript) <export default as xmlDecodeTree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$decode_codepoint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/entities/lib/esm/decode_codepoint.js [app-route] (ecmascript)");
;
var CharCodes;
(function(CharCodes) {
    CharCodes[CharCodes["Tab"] = 9] = "Tab";
    CharCodes[CharCodes["NewLine"] = 10] = "NewLine";
    CharCodes[CharCodes["FormFeed"] = 12] = "FormFeed";
    CharCodes[CharCodes["CarriageReturn"] = 13] = "CarriageReturn";
    CharCodes[CharCodes["Space"] = 32] = "Space";
    CharCodes[CharCodes["ExclamationMark"] = 33] = "ExclamationMark";
    CharCodes[CharCodes["Number"] = 35] = "Number";
    CharCodes[CharCodes["Amp"] = 38] = "Amp";
    CharCodes[CharCodes["SingleQuote"] = 39] = "SingleQuote";
    CharCodes[CharCodes["DoubleQuote"] = 34] = "DoubleQuote";
    CharCodes[CharCodes["Dash"] = 45] = "Dash";
    CharCodes[CharCodes["Slash"] = 47] = "Slash";
    CharCodes[CharCodes["Zero"] = 48] = "Zero";
    CharCodes[CharCodes["Nine"] = 57] = "Nine";
    CharCodes[CharCodes["Semi"] = 59] = "Semi";
    CharCodes[CharCodes["Lt"] = 60] = "Lt";
    CharCodes[CharCodes["Eq"] = 61] = "Eq";
    CharCodes[CharCodes["Gt"] = 62] = "Gt";
    CharCodes[CharCodes["Questionmark"] = 63] = "Questionmark";
    CharCodes[CharCodes["UpperA"] = 65] = "UpperA";
    CharCodes[CharCodes["LowerA"] = 97] = "LowerA";
    CharCodes[CharCodes["UpperF"] = 70] = "UpperF";
    CharCodes[CharCodes["LowerF"] = 102] = "LowerF";
    CharCodes[CharCodes["UpperZ"] = 90] = "UpperZ";
    CharCodes[CharCodes["LowerZ"] = 122] = "LowerZ";
    CharCodes[CharCodes["LowerX"] = 120] = "LowerX";
    CharCodes[CharCodes["OpeningSquareBracket"] = 91] = "OpeningSquareBracket";
})(CharCodes || (CharCodes = {}));
/** All the states the tokenizer can be in. */ var State;
(function(State) {
    State[State["Text"] = 1] = "Text";
    State[State["BeforeTagName"] = 2] = "BeforeTagName";
    State[State["InTagName"] = 3] = "InTagName";
    State[State["InSelfClosingTag"] = 4] = "InSelfClosingTag";
    State[State["BeforeClosingTagName"] = 5] = "BeforeClosingTagName";
    State[State["InClosingTagName"] = 6] = "InClosingTagName";
    State[State["AfterClosingTagName"] = 7] = "AfterClosingTagName";
    // Attributes
    State[State["BeforeAttributeName"] = 8] = "BeforeAttributeName";
    State[State["InAttributeName"] = 9] = "InAttributeName";
    State[State["AfterAttributeName"] = 10] = "AfterAttributeName";
    State[State["BeforeAttributeValue"] = 11] = "BeforeAttributeValue";
    State[State["InAttributeValueDq"] = 12] = "InAttributeValueDq";
    State[State["InAttributeValueSq"] = 13] = "InAttributeValueSq";
    State[State["InAttributeValueNq"] = 14] = "InAttributeValueNq";
    // Declarations
    State[State["BeforeDeclaration"] = 15] = "BeforeDeclaration";
    State[State["InDeclaration"] = 16] = "InDeclaration";
    // Processing instructions
    State[State["InProcessingInstruction"] = 17] = "InProcessingInstruction";
    // Comments & CDATA
    State[State["BeforeComment"] = 18] = "BeforeComment";
    State[State["CDATASequence"] = 19] = "CDATASequence";
    State[State["InSpecialComment"] = 20] = "InSpecialComment";
    State[State["InCommentLike"] = 21] = "InCommentLike";
    // Special tags
    State[State["BeforeSpecialS"] = 22] = "BeforeSpecialS";
    State[State["SpecialStartSequence"] = 23] = "SpecialStartSequence";
    State[State["InSpecialTag"] = 24] = "InSpecialTag";
    State[State["BeforeEntity"] = 25] = "BeforeEntity";
    State[State["BeforeNumericEntity"] = 26] = "BeforeNumericEntity";
    State[State["InNamedEntity"] = 27] = "InNamedEntity";
    State[State["InNumericEntity"] = 28] = "InNumericEntity";
    State[State["InHexEntity"] = 29] = "InHexEntity";
})(State || (State = {}));
function isWhitespace(c) {
    return c === CharCodes.Space || c === CharCodes.NewLine || c === CharCodes.Tab || c === CharCodes.FormFeed || c === CharCodes.CarriageReturn;
}
function isEndOfTagSection(c) {
    return c === CharCodes.Slash || c === CharCodes.Gt || isWhitespace(c);
}
function isNumber(c) {
    return c >= CharCodes.Zero && c <= CharCodes.Nine;
}
function isASCIIAlpha(c) {
    return c >= CharCodes.LowerA && c <= CharCodes.LowerZ || c >= CharCodes.UpperA && c <= CharCodes.UpperZ;
}
function isHexDigit(c) {
    return c >= CharCodes.UpperA && c <= CharCodes.UpperF || c >= CharCodes.LowerA && c <= CharCodes.LowerF;
}
var QuoteType;
(function(QuoteType) {
    QuoteType[QuoteType["NoValue"] = 0] = "NoValue";
    QuoteType[QuoteType["Unquoted"] = 1] = "Unquoted";
    QuoteType[QuoteType["Single"] = 2] = "Single";
    QuoteType[QuoteType["Double"] = 3] = "Double";
})(QuoteType || (QuoteType = {}));
/**
 * Sequences used to match longer strings.
 *
 * We don't have `Script`, `Style`, or `Title` here. Instead, we re-use the *End
 * sequences with an increased offset.
 */ const Sequences = {
    Cdata: new Uint8Array([
        0x43,
        0x44,
        0x41,
        0x54,
        0x41,
        0x5b
    ]),
    CdataEnd: new Uint8Array([
        0x5d,
        0x5d,
        0x3e
    ]),
    CommentEnd: new Uint8Array([
        0x2d,
        0x2d,
        0x3e
    ]),
    ScriptEnd: new Uint8Array([
        0x3c,
        0x2f,
        0x73,
        0x63,
        0x72,
        0x69,
        0x70,
        0x74
    ]),
    StyleEnd: new Uint8Array([
        0x3c,
        0x2f,
        0x73,
        0x74,
        0x79,
        0x6c,
        0x65
    ]),
    TitleEnd: new Uint8Array([
        0x3c,
        0x2f,
        0x74,
        0x69,
        0x74,
        0x6c,
        0x65
    ])
};
class Tokenizer {
    constructor({ xmlMode = false, decodeEntities = true }, cbs){
        this.cbs = cbs;
        /** The current state the tokenizer is in. */ this.state = State.Text;
        /** The read buffer. */ this.buffer = "";
        /** The beginning of the section that is currently being read. */ this.sectionStart = 0;
        /** The index within the buffer that we are currently looking at. */ this.index = 0;
        /** Some behavior, eg. when decoding entities, is done while we are in another state. This keeps track of the other state type. */ this.baseState = State.Text;
        /** For special parsing behavior inside of script and style tags. */ this.isSpecial = false;
        /** Indicates whether the tokenizer has been paused. */ this.running = true;
        /** The offset of the current buffer. */ this.offset = 0;
        this.currentSequence = undefined;
        this.sequenceIndex = 0;
        this.trieIndex = 0;
        this.trieCurrent = 0;
        /** For named entities, the index of the value. For numeric entities, the code point. */ this.entityResult = 0;
        this.entityExcess = 0;
        this.xmlMode = xmlMode;
        this.decodeEntities = decodeEntities;
        this.entityTrie = xmlMode ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$generated$2f$decode$2d$data$2d$xml$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__xmlDecodeTree$3e$__["xmlDecodeTree"] : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$generated$2f$decode$2d$data$2d$html$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__htmlDecodeTree$3e$__["htmlDecodeTree"];
    }
    reset() {
        this.state = State.Text;
        this.buffer = "";
        this.sectionStart = 0;
        this.index = 0;
        this.baseState = State.Text;
        this.currentSequence = undefined;
        this.running = true;
        this.offset = 0;
    }
    write(chunk) {
        this.offset += this.buffer.length;
        this.buffer = chunk;
        this.parse();
    }
    end() {
        if (this.running) this.finish();
    }
    pause() {
        this.running = false;
    }
    resume() {
        this.running = true;
        if (this.index < this.buffer.length + this.offset) {
            this.parse();
        }
    }
    /**
     * The current index within all of the written data.
     */ getIndex() {
        return this.index;
    }
    /**
     * The start of the current section.
     */ getSectionStart() {
        return this.sectionStart;
    }
    stateText(c) {
        if (c === CharCodes.Lt || !this.decodeEntities && this.fastForwardTo(CharCodes.Lt)) {
            if (this.index > this.sectionStart) {
                this.cbs.ontext(this.sectionStart, this.index);
            }
            this.state = State.BeforeTagName;
            this.sectionStart = this.index;
        } else if (this.decodeEntities && c === CharCodes.Amp) {
            this.state = State.BeforeEntity;
        }
    }
    stateSpecialStartSequence(c) {
        const isEnd = this.sequenceIndex === this.currentSequence.length;
        const isMatch = isEnd ? isEndOfTagSection(c) : (c | 0x20) === this.currentSequence[this.sequenceIndex];
        if (!isMatch) {
            this.isSpecial = false;
        } else if (!isEnd) {
            this.sequenceIndex++;
            return;
        }
        this.sequenceIndex = 0;
        this.state = State.InTagName;
        this.stateInTagName(c);
    }
    /** Look for an end tag. For <title> tags, also decode entities. */ stateInSpecialTag(c) {
        if (this.sequenceIndex === this.currentSequence.length) {
            if (c === CharCodes.Gt || isWhitespace(c)) {
                const endOfText = this.index - this.currentSequence.length;
                if (this.sectionStart < endOfText) {
                    // Spoof the index so that reported locations match up.
                    const actualIndex = this.index;
                    this.index = endOfText;
                    this.cbs.ontext(this.sectionStart, endOfText);
                    this.index = actualIndex;
                }
                this.isSpecial = false;
                this.sectionStart = endOfText + 2; // Skip over the `</`
                this.stateInClosingTagName(c);
                return; // We are done; skip the rest of the function.
            }
            this.sequenceIndex = 0;
        }
        if ((c | 0x20) === this.currentSequence[this.sequenceIndex]) {
            this.sequenceIndex += 1;
        } else if (this.sequenceIndex === 0) {
            if (this.currentSequence === Sequences.TitleEnd) {
                // We have to parse entities in <title> tags.
                if (this.decodeEntities && c === CharCodes.Amp) {
                    this.state = State.BeforeEntity;
                }
            } else if (this.fastForwardTo(CharCodes.Lt)) {
                // Outside of <title> tags, we can fast-forward.
                this.sequenceIndex = 1;
            }
        } else {
            // If we see a `<`, set the sequence index to 1; useful for eg. `<</script>`.
            this.sequenceIndex = Number(c === CharCodes.Lt);
        }
    }
    stateCDATASequence(c) {
        if (c === Sequences.Cdata[this.sequenceIndex]) {
            if (++this.sequenceIndex === Sequences.Cdata.length) {
                this.state = State.InCommentLike;
                this.currentSequence = Sequences.CdataEnd;
                this.sequenceIndex = 0;
                this.sectionStart = this.index + 1;
            }
        } else {
            this.sequenceIndex = 0;
            this.state = State.InDeclaration;
            this.stateInDeclaration(c); // Reconsume the character
        }
    }
    /**
     * When we wait for one specific character, we can speed things up
     * by skipping through the buffer until we find it.
     *
     * @returns Whether the character was found.
     */ fastForwardTo(c) {
        while(++this.index < this.buffer.length + this.offset){
            if (this.buffer.charCodeAt(this.index - this.offset) === c) {
                return true;
            }
        }
        /*
         * We increment the index at the end of the `parse` loop,
         * so set it to `buffer.length - 1` here.
         *
         * TODO: Refactor `parse` to increment index before calling states.
         */ this.index = this.buffer.length + this.offset - 1;
        return false;
    }
    /**
     * Comments and CDATA end with `-->` and `]]>`.
     *
     * Their common qualities are:
     * - Their end sequences have a distinct character they start with.
     * - That character is then repeated, so we have to check multiple repeats.
     * - All characters but the start character of the sequence can be skipped.
     */ stateInCommentLike(c) {
        if (c === this.currentSequence[this.sequenceIndex]) {
            if (++this.sequenceIndex === this.currentSequence.length) {
                if (this.currentSequence === Sequences.CdataEnd) {
                    this.cbs.oncdata(this.sectionStart, this.index, 2);
                } else {
                    this.cbs.oncomment(this.sectionStart, this.index, 2);
                }
                this.sequenceIndex = 0;
                this.sectionStart = this.index + 1;
                this.state = State.Text;
            }
        } else if (this.sequenceIndex === 0) {
            // Fast-forward to the first character of the sequence
            if (this.fastForwardTo(this.currentSequence[0])) {
                this.sequenceIndex = 1;
            }
        } else if (c !== this.currentSequence[this.sequenceIndex - 1]) {
            // Allow long sequences, eg. --->, ]]]>
            this.sequenceIndex = 0;
        }
    }
    /**
     * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
     *
     * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
     * We allow anything that wouldn't end the tag.
     */ isTagStartChar(c) {
        return this.xmlMode ? !isEndOfTagSection(c) : isASCIIAlpha(c);
    }
    startSpecial(sequence, offset) {
        this.isSpecial = true;
        this.currentSequence = sequence;
        this.sequenceIndex = offset;
        this.state = State.SpecialStartSequence;
    }
    stateBeforeTagName(c) {
        if (c === CharCodes.ExclamationMark) {
            this.state = State.BeforeDeclaration;
            this.sectionStart = this.index + 1;
        } else if (c === CharCodes.Questionmark) {
            this.state = State.InProcessingInstruction;
            this.sectionStart = this.index + 1;
        } else if (this.isTagStartChar(c)) {
            const lower = c | 0x20;
            this.sectionStart = this.index;
            if (!this.xmlMode && lower === Sequences.TitleEnd[2]) {
                this.startSpecial(Sequences.TitleEnd, 3);
            } else {
                this.state = !this.xmlMode && lower === Sequences.ScriptEnd[2] ? State.BeforeSpecialS : State.InTagName;
            }
        } else if (c === CharCodes.Slash) {
            this.state = State.BeforeClosingTagName;
        } else {
            this.state = State.Text;
            this.stateText(c);
        }
    }
    stateInTagName(c) {
        if (isEndOfTagSection(c)) {
            this.cbs.onopentagname(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
        }
    }
    stateBeforeClosingTagName(c) {
        if (isWhitespace(c)) {
        // Ignore
        } else if (c === CharCodes.Gt) {
            this.state = State.Text;
        } else {
            this.state = this.isTagStartChar(c) ? State.InClosingTagName : State.InSpecialComment;
            this.sectionStart = this.index;
        }
    }
    stateInClosingTagName(c) {
        if (c === CharCodes.Gt || isWhitespace(c)) {
            this.cbs.onclosetag(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.state = State.AfterClosingTagName;
            this.stateAfterClosingTagName(c);
        }
    }
    stateAfterClosingTagName(c) {
        // Skip everything until ">"
        if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.state = State.Text;
            this.baseState = State.Text;
            this.sectionStart = this.index + 1;
        }
    }
    stateBeforeAttributeName(c) {
        if (c === CharCodes.Gt) {
            this.cbs.onopentagend(this.index);
            if (this.isSpecial) {
                this.state = State.InSpecialTag;
                this.sequenceIndex = 0;
            } else {
                this.state = State.Text;
            }
            this.baseState = this.state;
            this.sectionStart = this.index + 1;
        } else if (c === CharCodes.Slash) {
            this.state = State.InSelfClosingTag;
        } else if (!isWhitespace(c)) {
            this.state = State.InAttributeName;
            this.sectionStart = this.index;
        }
    }
    stateInSelfClosingTag(c) {
        if (c === CharCodes.Gt) {
            this.cbs.onselfclosingtag(this.index);
            this.state = State.Text;
            this.baseState = State.Text;
            this.sectionStart = this.index + 1;
            this.isSpecial = false; // Reset special state, in case of self-closing special tags
        } else if (!isWhitespace(c)) {
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
        }
    }
    stateInAttributeName(c) {
        if (c === CharCodes.Eq || isEndOfTagSection(c)) {
            this.cbs.onattribname(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.state = State.AfterAttributeName;
            this.stateAfterAttributeName(c);
        }
    }
    stateAfterAttributeName(c) {
        if (c === CharCodes.Eq) {
            this.state = State.BeforeAttributeValue;
        } else if (c === CharCodes.Slash || c === CharCodes.Gt) {
            this.cbs.onattribend(QuoteType.NoValue, this.index);
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
        } else if (!isWhitespace(c)) {
            this.cbs.onattribend(QuoteType.NoValue, this.index);
            this.state = State.InAttributeName;
            this.sectionStart = this.index;
        }
    }
    stateBeforeAttributeValue(c) {
        if (c === CharCodes.DoubleQuote) {
            this.state = State.InAttributeValueDq;
            this.sectionStart = this.index + 1;
        } else if (c === CharCodes.SingleQuote) {
            this.state = State.InAttributeValueSq;
            this.sectionStart = this.index + 1;
        } else if (!isWhitespace(c)) {
            this.sectionStart = this.index;
            this.state = State.InAttributeValueNq;
            this.stateInAttributeValueNoQuotes(c); // Reconsume token
        }
    }
    handleInAttributeValue(c, quote) {
        if (c === quote || !this.decodeEntities && this.fastForwardTo(quote)) {
            this.cbs.onattribdata(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.cbs.onattribend(quote === CharCodes.DoubleQuote ? QuoteType.Double : QuoteType.Single, this.index);
            this.state = State.BeforeAttributeName;
        } else if (this.decodeEntities && c === CharCodes.Amp) {
            this.baseState = this.state;
            this.state = State.BeforeEntity;
        }
    }
    stateInAttributeValueDoubleQuotes(c) {
        this.handleInAttributeValue(c, CharCodes.DoubleQuote);
    }
    stateInAttributeValueSingleQuotes(c) {
        this.handleInAttributeValue(c, CharCodes.SingleQuote);
    }
    stateInAttributeValueNoQuotes(c) {
        if (isWhitespace(c) || c === CharCodes.Gt) {
            this.cbs.onattribdata(this.sectionStart, this.index);
            this.sectionStart = -1;
            this.cbs.onattribend(QuoteType.Unquoted, this.index);
            this.state = State.BeforeAttributeName;
            this.stateBeforeAttributeName(c);
        } else if (this.decodeEntities && c === CharCodes.Amp) {
            this.baseState = this.state;
            this.state = State.BeforeEntity;
        }
    }
    stateBeforeDeclaration(c) {
        if (c === CharCodes.OpeningSquareBracket) {
            this.state = State.CDATASequence;
            this.sequenceIndex = 0;
        } else {
            this.state = c === CharCodes.Dash ? State.BeforeComment : State.InDeclaration;
        }
    }
    stateInDeclaration(c) {
        if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.cbs.ondeclaration(this.sectionStart, this.index);
            this.state = State.Text;
            this.sectionStart = this.index + 1;
        }
    }
    stateInProcessingInstruction(c) {
        if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.cbs.onprocessinginstruction(this.sectionStart, this.index);
            this.state = State.Text;
            this.sectionStart = this.index + 1;
        }
    }
    stateBeforeComment(c) {
        if (c === CharCodes.Dash) {
            this.state = State.InCommentLike;
            this.currentSequence = Sequences.CommentEnd;
            // Allow short comments (eg. <!-->)
            this.sequenceIndex = 2;
            this.sectionStart = this.index + 1;
        } else {
            this.state = State.InDeclaration;
        }
    }
    stateInSpecialComment(c) {
        if (c === CharCodes.Gt || this.fastForwardTo(CharCodes.Gt)) {
            this.cbs.oncomment(this.sectionStart, this.index, 0);
            this.state = State.Text;
            this.sectionStart = this.index + 1;
        }
    }
    stateBeforeSpecialS(c) {
        const lower = c | 0x20;
        if (lower === Sequences.ScriptEnd[3]) {
            this.startSpecial(Sequences.ScriptEnd, 4);
        } else if (lower === Sequences.StyleEnd[3]) {
            this.startSpecial(Sequences.StyleEnd, 4);
        } else {
            this.state = State.InTagName;
            this.stateInTagName(c); // Consume the token again
        }
    }
    stateBeforeEntity(c) {
        // Start excess with 1 to include the '&'
        this.entityExcess = 1;
        this.entityResult = 0;
        if (c === CharCodes.Number) {
            this.state = State.BeforeNumericEntity;
        } else if (c === CharCodes.Amp) {
        // We have two `&` characters in a row. Stay in the current state.
        } else {
            this.trieIndex = 0;
            this.trieCurrent = this.entityTrie[0];
            this.state = State.InNamedEntity;
            this.stateInNamedEntity(c);
        }
    }
    stateInNamedEntity(c) {
        this.entityExcess += 1;
        this.trieIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$decode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["determineBranch"])(this.entityTrie, this.trieCurrent, this.trieIndex + 1, c);
        if (this.trieIndex < 0) {
            this.emitNamedEntity();
            this.index--;
            return;
        }
        this.trieCurrent = this.entityTrie[this.trieIndex];
        const masked = this.trieCurrent & __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$decode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BinTrieFlags"].VALUE_LENGTH;
        // If the branch is a value, store it and continue
        if (masked) {
            // The mask is the number of bytes of the value, including the current byte.
            const valueLength = (masked >> 14) - 1;
            // If we have a legacy entity while parsing strictly, just skip the number of bytes
            if (!this.allowLegacyEntity() && c !== CharCodes.Semi) {
                this.trieIndex += valueLength;
            } else {
                // Add 1 as we have already incremented the excess
                const entityStart = this.index - this.entityExcess + 1;
                if (entityStart > this.sectionStart) {
                    this.emitPartial(this.sectionStart, entityStart);
                }
                // If this is a surrogate pair, consume the next two bytes
                this.entityResult = this.trieIndex;
                this.trieIndex += valueLength;
                this.entityExcess = 0;
                this.sectionStart = this.index + 1;
                if (valueLength === 0) {
                    this.emitNamedEntity();
                }
            }
        }
    }
    emitNamedEntity() {
        this.state = this.baseState;
        if (this.entityResult === 0) {
            return;
        }
        const valueLength = (this.entityTrie[this.entityResult] & __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$decode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BinTrieFlags"].VALUE_LENGTH) >> 14;
        switch(valueLength){
            case 1:
                {
                    this.emitCodePoint(this.entityTrie[this.entityResult] & ~__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$decode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BinTrieFlags"].VALUE_LENGTH);
                    break;
                }
            case 2:
                {
                    this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
                    break;
                }
            case 3:
                {
                    this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
                    this.emitCodePoint(this.entityTrie[this.entityResult + 2]);
                }
        }
    }
    stateBeforeNumericEntity(c) {
        if ((c | 0x20) === CharCodes.LowerX) {
            this.entityExcess++;
            this.state = State.InHexEntity;
        } else {
            this.state = State.InNumericEntity;
            this.stateInNumericEntity(c);
        }
    }
    emitNumericEntity(strict) {
        const entityStart = this.index - this.entityExcess - 1;
        const numberStart = entityStart + 2 + Number(this.state === State.InHexEntity);
        if (numberStart !== this.index) {
            // Emit leading data if any
            if (entityStart > this.sectionStart) {
                this.emitPartial(this.sectionStart, entityStart);
            }
            this.sectionStart = this.index + Number(strict);
            this.emitCodePoint((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$decode_codepoint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["replaceCodePoint"])(this.entityResult));
        }
        this.state = this.baseState;
    }
    stateInNumericEntity(c) {
        if (c === CharCodes.Semi) {
            this.emitNumericEntity(true);
        } else if (isNumber(c)) {
            this.entityResult = this.entityResult * 10 + (c - CharCodes.Zero);
            this.entityExcess++;
        } else {
            if (this.allowLegacyEntity()) {
                this.emitNumericEntity(false);
            } else {
                this.state = this.baseState;
            }
            this.index--;
        }
    }
    stateInHexEntity(c) {
        if (c === CharCodes.Semi) {
            this.emitNumericEntity(true);
        } else if (isNumber(c)) {
            this.entityResult = this.entityResult * 16 + (c - CharCodes.Zero);
            this.entityExcess++;
        } else if (isHexDigit(c)) {
            this.entityResult = this.entityResult * 16 + ((c | 0x20) - CharCodes.LowerA + 10);
            this.entityExcess++;
        } else {
            if (this.allowLegacyEntity()) {
                this.emitNumericEntity(false);
            } else {
                this.state = this.baseState;
            }
            this.index--;
        }
    }
    allowLegacyEntity() {
        return !this.xmlMode && (this.baseState === State.Text || this.baseState === State.InSpecialTag);
    }
    /**
     * Remove data that has already been consumed from the buffer.
     */ cleanup() {
        // If we are inside of text or attributes, emit what we already have.
        if (this.running && this.sectionStart !== this.index) {
            if (this.state === State.Text || this.state === State.InSpecialTag && this.sequenceIndex === 0) {
                this.cbs.ontext(this.sectionStart, this.index);
                this.sectionStart = this.index;
            } else if (this.state === State.InAttributeValueDq || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueNq) {
                this.cbs.onattribdata(this.sectionStart, this.index);
                this.sectionStart = this.index;
            }
        }
    }
    shouldContinue() {
        return this.index < this.buffer.length + this.offset && this.running;
    }
    /**
     * Iterates through the buffer, calling the function corresponding to the current state.
     *
     * States that are more likely to be hit are higher up, as a performance improvement.
     */ parse() {
        while(this.shouldContinue()){
            const c = this.buffer.charCodeAt(this.index - this.offset);
            switch(this.state){
                case State.Text:
                    {
                        this.stateText(c);
                        break;
                    }
                case State.SpecialStartSequence:
                    {
                        this.stateSpecialStartSequence(c);
                        break;
                    }
                case State.InSpecialTag:
                    {
                        this.stateInSpecialTag(c);
                        break;
                    }
                case State.CDATASequence:
                    {
                        this.stateCDATASequence(c);
                        break;
                    }
                case State.InAttributeValueDq:
                    {
                        this.stateInAttributeValueDoubleQuotes(c);
                        break;
                    }
                case State.InAttributeName:
                    {
                        this.stateInAttributeName(c);
                        break;
                    }
                case State.InCommentLike:
                    {
                        this.stateInCommentLike(c);
                        break;
                    }
                case State.InSpecialComment:
                    {
                        this.stateInSpecialComment(c);
                        break;
                    }
                case State.BeforeAttributeName:
                    {
                        this.stateBeforeAttributeName(c);
                        break;
                    }
                case State.InTagName:
                    {
                        this.stateInTagName(c);
                        break;
                    }
                case State.InClosingTagName:
                    {
                        this.stateInClosingTagName(c);
                        break;
                    }
                case State.BeforeTagName:
                    {
                        this.stateBeforeTagName(c);
                        break;
                    }
                case State.AfterAttributeName:
                    {
                        this.stateAfterAttributeName(c);
                        break;
                    }
                case State.InAttributeValueSq:
                    {
                        this.stateInAttributeValueSingleQuotes(c);
                        break;
                    }
                case State.BeforeAttributeValue:
                    {
                        this.stateBeforeAttributeValue(c);
                        break;
                    }
                case State.BeforeClosingTagName:
                    {
                        this.stateBeforeClosingTagName(c);
                        break;
                    }
                case State.AfterClosingTagName:
                    {
                        this.stateAfterClosingTagName(c);
                        break;
                    }
                case State.BeforeSpecialS:
                    {
                        this.stateBeforeSpecialS(c);
                        break;
                    }
                case State.InAttributeValueNq:
                    {
                        this.stateInAttributeValueNoQuotes(c);
                        break;
                    }
                case State.InSelfClosingTag:
                    {
                        this.stateInSelfClosingTag(c);
                        break;
                    }
                case State.InDeclaration:
                    {
                        this.stateInDeclaration(c);
                        break;
                    }
                case State.BeforeDeclaration:
                    {
                        this.stateBeforeDeclaration(c);
                        break;
                    }
                case State.BeforeComment:
                    {
                        this.stateBeforeComment(c);
                        break;
                    }
                case State.InProcessingInstruction:
                    {
                        this.stateInProcessingInstruction(c);
                        break;
                    }
                case State.InNamedEntity:
                    {
                        this.stateInNamedEntity(c);
                        break;
                    }
                case State.BeforeEntity:
                    {
                        this.stateBeforeEntity(c);
                        break;
                    }
                case State.InHexEntity:
                    {
                        this.stateInHexEntity(c);
                        break;
                    }
                case State.InNumericEntity:
                    {
                        this.stateInNumericEntity(c);
                        break;
                    }
                default:
                    {
                        // `this._state === State.BeforeNumericEntity`
                        this.stateBeforeNumericEntity(c);
                    }
            }
            this.index++;
        }
        this.cleanup();
    }
    finish() {
        if (this.state === State.InNamedEntity) {
            this.emitNamedEntity();
        }
        // If there is remaining data, emit it in a reasonable way
        if (this.sectionStart < this.index) {
            this.handleTrailingData();
        }
        this.cbs.onend();
    }
    /** Handle any trailing data. */ handleTrailingData() {
        const endIndex = this.buffer.length + this.offset;
        if (this.state === State.InCommentLike) {
            if (this.currentSequence === Sequences.CdataEnd) {
                this.cbs.oncdata(this.sectionStart, endIndex, 0);
            } else {
                this.cbs.oncomment(this.sectionStart, endIndex, 0);
            }
        } else if (this.state === State.InNumericEntity && this.allowLegacyEntity()) {
            this.emitNumericEntity(false);
        // All trailing data will have been consumed
        } else if (this.state === State.InHexEntity && this.allowLegacyEntity()) {
            this.emitNumericEntity(false);
        // All trailing data will have been consumed
        } else if (this.state === State.InTagName || this.state === State.BeforeAttributeName || this.state === State.BeforeAttributeValue || this.state === State.AfterAttributeName || this.state === State.InAttributeName || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueDq || this.state === State.InAttributeValueNq || this.state === State.InClosingTagName) {
        /*
             * If we are currently in an opening or closing tag, us not calling the
             * respective callback signals that the tag should be ignored.
             */ } else {
            this.cbs.ontext(this.sectionStart, endIndex);
        }
    }
    emitPartial(start, endIndex) {
        if (this.baseState !== State.Text && this.baseState !== State.InSpecialTag) {
            this.cbs.onattribdata(start, endIndex);
        } else {
            this.cbs.ontext(start, endIndex);
        }
    }
    emitCodePoint(cp) {
        if (this.baseState !== State.Text && this.baseState !== State.InSpecialTag) {
            this.cbs.onattribentity(cp);
        } else {
            this.cbs.ontextentity(cp);
        }
    }
}
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/htmlparser2/lib/esm/Parser.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Parser",
    ()=>Parser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$htmlparser2$2f$lib$2f$esm$2f$Tokenizer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/htmlparser2/lib/esm/Tokenizer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$decode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/entities/lib/esm/decode.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$decode_codepoint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/entities/lib/esm/decode_codepoint.js [app-route] (ecmascript)");
;
;
const formTags = new Set([
    "input",
    "option",
    "optgroup",
    "select",
    "button",
    "datalist",
    "textarea"
]);
const pTag = new Set([
    "p"
]);
const tableSectionTags = new Set([
    "thead",
    "tbody"
]);
const ddtTags = new Set([
    "dd",
    "dt"
]);
const rtpTags = new Set([
    "rt",
    "rp"
]);
const openImpliesClose = new Map([
    [
        "tr",
        new Set([
            "tr",
            "th",
            "td"
        ])
    ],
    [
        "th",
        new Set([
            "th"
        ])
    ],
    [
        "td",
        new Set([
            "thead",
            "th",
            "td"
        ])
    ],
    [
        "body",
        new Set([
            "head",
            "link",
            "script"
        ])
    ],
    [
        "li",
        new Set([
            "li"
        ])
    ],
    [
        "p",
        pTag
    ],
    [
        "h1",
        pTag
    ],
    [
        "h2",
        pTag
    ],
    [
        "h3",
        pTag
    ],
    [
        "h4",
        pTag
    ],
    [
        "h5",
        pTag
    ],
    [
        "h6",
        pTag
    ],
    [
        "select",
        formTags
    ],
    [
        "input",
        formTags
    ],
    [
        "output",
        formTags
    ],
    [
        "button",
        formTags
    ],
    [
        "datalist",
        formTags
    ],
    [
        "textarea",
        formTags
    ],
    [
        "option",
        new Set([
            "option"
        ])
    ],
    [
        "optgroup",
        new Set([
            "optgroup",
            "option"
        ])
    ],
    [
        "dd",
        ddtTags
    ],
    [
        "dt",
        ddtTags
    ],
    [
        "address",
        pTag
    ],
    [
        "article",
        pTag
    ],
    [
        "aside",
        pTag
    ],
    [
        "blockquote",
        pTag
    ],
    [
        "details",
        pTag
    ],
    [
        "div",
        pTag
    ],
    [
        "dl",
        pTag
    ],
    [
        "fieldset",
        pTag
    ],
    [
        "figcaption",
        pTag
    ],
    [
        "figure",
        pTag
    ],
    [
        "footer",
        pTag
    ],
    [
        "form",
        pTag
    ],
    [
        "header",
        pTag
    ],
    [
        "hr",
        pTag
    ],
    [
        "main",
        pTag
    ],
    [
        "nav",
        pTag
    ],
    [
        "ol",
        pTag
    ],
    [
        "pre",
        pTag
    ],
    [
        "section",
        pTag
    ],
    [
        "table",
        pTag
    ],
    [
        "ul",
        pTag
    ],
    [
        "rt",
        rtpTags
    ],
    [
        "rp",
        rtpTags
    ],
    [
        "tbody",
        tableSectionTags
    ],
    [
        "tfoot",
        tableSectionTags
    ]
]);
const voidElements = new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
]);
const foreignContextElements = new Set([
    "math",
    "svg"
]);
const htmlIntegrationElements = new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignobject",
    "desc",
    "title"
]);
const reNameEnd = /\s|\//;
class Parser {
    constructor(cbs, options = {}){
        var _a, _b, _c, _d, _e;
        this.options = options;
        /** The start index of the last event. */ this.startIndex = 0;
        /** The end index of the last event. */ this.endIndex = 0;
        /**
         * Store the start index of the current open tag,
         * so we can update the start index for attributes.
         */ this.openTagStart = 0;
        this.tagname = "";
        this.attribname = "";
        this.attribvalue = "";
        this.attribs = null;
        this.stack = [];
        this.foreignContext = [];
        this.buffers = [];
        this.bufferOffset = 0;
        /** The index of the last written buffer. Used when resuming after a `pause()`. */ this.writeIndex = 0;
        /** Indicates whether the parser has finished running / `.end` has been called. */ this.ended = false;
        this.cbs = cbs !== null && cbs !== void 0 ? cbs : {};
        this.lowerCaseTagNames = (_a = options.lowerCaseTags) !== null && _a !== void 0 ? _a : !options.xmlMode;
        this.lowerCaseAttributeNames = (_b = options.lowerCaseAttributeNames) !== null && _b !== void 0 ? _b : !options.xmlMode;
        this.tokenizer = new ((_c = options.Tokenizer) !== null && _c !== void 0 ? _c : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$htmlparser2$2f$lib$2f$esm$2f$Tokenizer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(this.options, this);
        (_e = (_d = this.cbs).onparserinit) === null || _e === void 0 ? void 0 : _e.call(_d, this);
    }
    // Tokenizer event handlers
    /** @internal */ ontext(start, endIndex) {
        var _a, _b;
        const data = this.getSlice(start, endIndex);
        this.endIndex = endIndex - 1;
        (_b = (_a = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a, data);
        this.startIndex = endIndex;
    }
    /** @internal */ ontextentity(cp) {
        var _a, _b;
        /*
         * Entities can be emitted on the character, or directly after.
         * We use the section start here to get accurate indices.
         */ const index = this.tokenizer.getSectionStart();
        this.endIndex = index - 1;
        (_b = (_a = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$decode_codepoint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromCodePoint"])(cp));
        this.startIndex = index;
    }
    isVoidElement(name) {
        return !this.options.xmlMode && voidElements.has(name);
    }
    /** @internal */ onopentagname(start, endIndex) {
        this.endIndex = endIndex;
        let name = this.getSlice(start, endIndex);
        if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        this.emitOpenTag(name);
    }
    emitOpenTag(name) {
        var _a, _b, _c, _d;
        this.openTagStart = this.startIndex;
        this.tagname = name;
        const impliesClose = !this.options.xmlMode && openImpliesClose.get(name);
        if (impliesClose) {
            while(this.stack.length > 0 && impliesClose.has(this.stack[this.stack.length - 1])){
                const element = this.stack.pop();
                (_b = (_a = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a, element, true);
            }
        }
        if (!this.isVoidElement(name)) {
            this.stack.push(name);
            if (foreignContextElements.has(name)) {
                this.foreignContext.push(true);
            } else if (htmlIntegrationElements.has(name)) {
                this.foreignContext.push(false);
            }
        }
        (_d = (_c = this.cbs).onopentagname) === null || _d === void 0 ? void 0 : _d.call(_c, name);
        if (this.cbs.onopentag) this.attribs = {};
    }
    endOpenTag(isImplied) {
        var _a, _b;
        this.startIndex = this.openTagStart;
        if (this.attribs) {
            (_b = (_a = this.cbs).onopentag) === null || _b === void 0 ? void 0 : _b.call(_a, this.tagname, this.attribs, isImplied);
            this.attribs = null;
        }
        if (this.cbs.onclosetag && this.isVoidElement(this.tagname)) {
            this.cbs.onclosetag(this.tagname, true);
        }
        this.tagname = "";
    }
    /** @internal */ onopentagend(endIndex) {
        this.endIndex = endIndex;
        this.endOpenTag(false);
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    }
    /** @internal */ onclosetag(start, endIndex) {
        var _a, _b, _c, _d, _e, _f;
        this.endIndex = endIndex;
        let name = this.getSlice(start, endIndex);
        if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        if (foreignContextElements.has(name) || htmlIntegrationElements.has(name)) {
            this.foreignContext.pop();
        }
        if (!this.isVoidElement(name)) {
            const pos = this.stack.lastIndexOf(name);
            if (pos !== -1) {
                if (this.cbs.onclosetag) {
                    let count = this.stack.length - pos;
                    while(count--){
                        // We know the stack has sufficient elements.
                        this.cbs.onclosetag(this.stack.pop(), count !== 0);
                    }
                } else this.stack.length = pos;
            } else if (!this.options.xmlMode && name === "p") {
                // Implicit open before close
                this.emitOpenTag("p");
                this.closeCurrentTag(true);
            }
        } else if (!this.options.xmlMode && name === "br") {
            // We can't use `emitOpenTag` for implicit open, as `br` would be implicitly closed.
            (_b = (_a = this.cbs).onopentagname) === null || _b === void 0 ? void 0 : _b.call(_a, "br");
            (_d = (_c = this.cbs).onopentag) === null || _d === void 0 ? void 0 : _d.call(_c, "br", {}, true);
            (_f = (_e = this.cbs).onclosetag) === null || _f === void 0 ? void 0 : _f.call(_e, "br", false);
        }
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    }
    /** @internal */ onselfclosingtag(endIndex) {
        this.endIndex = endIndex;
        if (this.options.xmlMode || this.options.recognizeSelfClosing || this.foreignContext[this.foreignContext.length - 1]) {
            this.closeCurrentTag(false);
            // Set `startIndex` for next node
            this.startIndex = endIndex + 1;
        } else {
            // Ignore the fact that the tag is self-closing.
            this.onopentagend(endIndex);
        }
    }
    closeCurrentTag(isOpenImplied) {
        var _a, _b;
        const name = this.tagname;
        this.endOpenTag(isOpenImplied);
        // Self-closing tags will be on the top of the stack
        if (this.stack[this.stack.length - 1] === name) {
            // If the opening tag isn't implied, the closing tag has to be implied.
            (_b = (_a = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a, name, !isOpenImplied);
            this.stack.pop();
        }
    }
    /** @internal */ onattribname(start, endIndex) {
        this.startIndex = start;
        const name = this.getSlice(start, endIndex);
        this.attribname = this.lowerCaseAttributeNames ? name.toLowerCase() : name;
    }
    /** @internal */ onattribdata(start, endIndex) {
        this.attribvalue += this.getSlice(start, endIndex);
    }
    /** @internal */ onattribentity(cp) {
        this.attribvalue += (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$decode_codepoint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromCodePoint"])(cp);
    }
    /** @internal */ onattribend(quote, endIndex) {
        var _a, _b;
        this.endIndex = endIndex;
        (_b = (_a = this.cbs).onattribute) === null || _b === void 0 ? void 0 : _b.call(_a, this.attribname, this.attribvalue, quote === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$htmlparser2$2f$lib$2f$esm$2f$Tokenizer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QuoteType"].Double ? '"' : quote === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$htmlparser2$2f$lib$2f$esm$2f$Tokenizer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QuoteType"].Single ? "'" : quote === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$htmlparser2$2f$lib$2f$esm$2f$Tokenizer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["QuoteType"].NoValue ? undefined : null);
        if (this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname)) {
            this.attribs[this.attribname] = this.attribvalue;
        }
        this.attribvalue = "";
    }
    getInstructionName(value) {
        const index = value.search(reNameEnd);
        let name = index < 0 ? value : value.substr(0, index);
        if (this.lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        return name;
    }
    /** @internal */ ondeclaration(start, endIndex) {
        this.endIndex = endIndex;
        const value = this.getSlice(start, endIndex);
        if (this.cbs.onprocessinginstruction) {
            const name = this.getInstructionName(value);
            this.cbs.onprocessinginstruction(`!${name}`, `!${value}`);
        }
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    }
    /** @internal */ onprocessinginstruction(start, endIndex) {
        this.endIndex = endIndex;
        const value = this.getSlice(start, endIndex);
        if (this.cbs.onprocessinginstruction) {
            const name = this.getInstructionName(value);
            this.cbs.onprocessinginstruction(`?${name}`, `?${value}`);
        }
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    }
    /** @internal */ oncomment(start, endIndex, offset) {
        var _a, _b, _c, _d;
        this.endIndex = endIndex;
        (_b = (_a = this.cbs).oncomment) === null || _b === void 0 ? void 0 : _b.call(_a, this.getSlice(start, endIndex - offset));
        (_d = (_c = this.cbs).oncommentend) === null || _d === void 0 ? void 0 : _d.call(_c);
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    }
    /** @internal */ oncdata(start, endIndex, offset) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.endIndex = endIndex;
        const value = this.getSlice(start, endIndex - offset);
        if (this.options.xmlMode || this.options.recognizeCDATA) {
            (_b = (_a = this.cbs).oncdatastart) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_d = (_c = this.cbs).ontext) === null || _d === void 0 ? void 0 : _d.call(_c, value);
            (_f = (_e = this.cbs).oncdataend) === null || _f === void 0 ? void 0 : _f.call(_e);
        } else {
            (_h = (_g = this.cbs).oncomment) === null || _h === void 0 ? void 0 : _h.call(_g, `[CDATA[${value}]]`);
            (_k = (_j = this.cbs).oncommentend) === null || _k === void 0 ? void 0 : _k.call(_j);
        }
        // Set `startIndex` for next node
        this.startIndex = endIndex + 1;
    }
    /** @internal */ onend() {
        var _a, _b;
        if (this.cbs.onclosetag) {
            // Set the end index for all remaining tags
            this.endIndex = this.startIndex;
            for(let index = this.stack.length; index > 0; this.cbs.onclosetag(this.stack[--index], true));
        }
        (_b = (_a = this.cbs).onend) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    /**
     * Resets the parser to a blank state, ready to parse a new HTML document
     */ reset() {
        var _a, _b, _c, _d;
        (_b = (_a = this.cbs).onreset) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.tokenizer.reset();
        this.tagname = "";
        this.attribname = "";
        this.attribs = null;
        this.stack.length = 0;
        this.startIndex = 0;
        this.endIndex = 0;
        (_d = (_c = this.cbs).onparserinit) === null || _d === void 0 ? void 0 : _d.call(_c, this);
        this.buffers.length = 0;
        this.bufferOffset = 0;
        this.writeIndex = 0;
        this.ended = false;
    }
    /**
     * Resets the parser, then parses a complete document and
     * pushes it to the handler.
     *
     * @param data Document to parse.
     */ parseComplete(data) {
        this.reset();
        this.end(data);
    }
    getSlice(start, end) {
        while(start - this.bufferOffset >= this.buffers[0].length){
            this.shiftBuffer();
        }
        let slice = this.buffers[0].slice(start - this.bufferOffset, end - this.bufferOffset);
        while(end - this.bufferOffset > this.buffers[0].length){
            this.shiftBuffer();
            slice += this.buffers[0].slice(0, end - this.bufferOffset);
        }
        return slice;
    }
    shiftBuffer() {
        this.bufferOffset += this.buffers[0].length;
        this.writeIndex--;
        this.buffers.shift();
    }
    /**
     * Parses a chunk of data and calls the corresponding callbacks.
     *
     * @param chunk Chunk to parse.
     */ write(chunk) {
        var _a, _b;
        if (this.ended) {
            (_b = (_a = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a, new Error(".write() after done!"));
            return;
        }
        this.buffers.push(chunk);
        if (this.tokenizer.running) {
            this.tokenizer.write(chunk);
            this.writeIndex++;
        }
    }
    /**
     * Parses the end of the buffer and clears the stack, calls onend.
     *
     * @param chunk Optional final chunk to parse.
     */ end(chunk) {
        var _a, _b;
        if (this.ended) {
            (_b = (_a = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a, new Error(".end() after done!"));
            return;
        }
        if (chunk) this.write(chunk);
        this.ended = true;
        this.tokenizer.end();
    }
    /**
     * Pauses parsing. The parser won't emit events until `resume` is called.
     */ pause() {
        this.tokenizer.pause();
    }
    /**
     * Resumes parsing after `pause` was called.
     */ resume() {
        this.tokenizer.resume();
        while(this.tokenizer.running && this.writeIndex < this.buffers.length){
            this.tokenizer.write(this.buffers[this.writeIndex++]);
        }
        if (this.ended) this.tokenizer.end();
    }
    /**
     * Alias of `write`, for backwards compatibility.
     *
     * @param chunk Chunk to parse.
     * @deprecated
     */ parseChunk(chunk) {
        this.write(chunk);
    }
    /**
     * Alias of `end`, for backwards compatibility.
     *
     * @param chunk Optional final chunk to parse.
     * @deprecated
     */ done(chunk) {
        this.end(chunk);
    }
}
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/htmlparser2/lib/esm/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDomStream",
    ()=>createDomStream,
    "parseDOM",
    ()=>parseDOM,
    "parseDocument",
    ()=>parseDocument,
    "parseFeed",
    ()=>parseFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$htmlparser2$2f$lib$2f$esm$2f$Parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/htmlparser2/lib/esm/Parser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domhandler/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$htmlparser2$2f$lib$2f$esm$2f$Tokenizer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/htmlparser2/lib/esm/Tokenizer.js [app-route] (ecmascript)");
/*
 * All of the following exports exist for backwards-compatibility.
 * They should probably be removed eventually.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domelementtype/lib/esm/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$feeds$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/feeds.js [app-route] (ecmascript)");
;
;
;
;
function parseDocument(data, options) {
    const handler = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DomHandler"](undefined, options);
    new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$htmlparser2$2f$lib$2f$esm$2f$Parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Parser"](handler, options).end(data);
    return handler.root;
}
function parseDOM(data, options) {
    return parseDocument(data, options).children;
}
function createDomStream(callback, options, elementCallback) {
    const handler = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DomHandler"](callback, options, elementCallback);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$htmlparser2$2f$lib$2f$esm$2f$Parser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Parser"](handler, options);
}
;
;
;
;
const parseFeedDefaultOptions = {
    xmlMode: true
};
function parseFeed(feed, options = parseFeedDefaultOptions) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$feeds$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFeed"])(parseDOM(feed, options));
}
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/dom-serializer/lib/esm/foreignNames.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "attributeNames",
    ()=>attributeNames,
    "elementNames",
    ()=>elementNames
]);
const elementNames = new Map([
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "clipPath",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "foreignObject",
    "glyphRef",
    "linearGradient",
    "radialGradient",
    "textPath"
].map((val)=>[
        val.toLowerCase(),
        val
    ]));
const attributeNames = new Map([
    "definitionURL",
    "attributeName",
    "attributeType",
    "baseFrequency",
    "baseProfile",
    "calcMode",
    "clipPathUnits",
    "diffuseConstant",
    "edgeMode",
    "filterUnits",
    "glyphRef",
    "gradientTransform",
    "gradientUnits",
    "kernelMatrix",
    "kernelUnitLength",
    "keyPoints",
    "keySplines",
    "keyTimes",
    "lengthAdjust",
    "limitingConeAngle",
    "markerHeight",
    "markerUnits",
    "markerWidth",
    "maskContentUnits",
    "maskUnits",
    "numOctaves",
    "pathLength",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "preserveAspectRatio",
    "primitiveUnits",
    "refX",
    "refY",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "specularConstant",
    "specularExponent",
    "spreadMethod",
    "startOffset",
    "stdDeviation",
    "stitchTiles",
    "surfaceScale",
    "systemLanguage",
    "tableValues",
    "targetX",
    "targetY",
    "textLength",
    "viewBox",
    "viewTarget",
    "xChannelSelector",
    "yChannelSelector",
    "zoomAndPan"
].map((val)=>[
        val.toLowerCase(),
        val
    ]));
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/dom-serializer/lib/esm/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "render",
    ()=>render
]);
/*
 * Module dependencies
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domelementtype/lib/esm/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/entities/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$escape$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/entities/lib/esm/escape.js [app-route] (ecmascript)");
/**
 * Mixed-case SVG and MathML tags & attributes
 * recognized by the HTML parser.
 *
 * @see https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-inforeign
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$dom$2d$serializer$2f$lib$2f$esm$2f$foreignNames$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/dom-serializer/lib/esm/foreignNames.js [app-route] (ecmascript)");
;
;
;
const unencodedElements = new Set([
    "style",
    "script",
    "xmp",
    "iframe",
    "noembed",
    "noframes",
    "plaintext",
    "noscript"
]);
function replaceQuotes(value) {
    return value.replace(/"/g, "&quot;");
}
/**
 * Format attributes
 */ function formatAttributes(attributes, opts) {
    var _a;
    if (!attributes) return;
    const encode = ((_a = opts.encodeEntities) !== null && _a !== void 0 ? _a : opts.decodeEntities) === false ? replaceQuotes : opts.xmlMode || opts.encodeEntities !== "utf8" ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$escape$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeXML"] : __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$escape$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["escapeAttribute"];
    return Object.keys(attributes).map((key)=>{
        var _a, _b;
        const value = (_a = attributes[key]) !== null && _a !== void 0 ? _a : "";
        if (opts.xmlMode === "foreign") {
            /* Fix up mixed-case attribute names */ key = (_b = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$dom$2d$serializer$2f$lib$2f$esm$2f$foreignNames$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["attributeNames"].get(key)) !== null && _b !== void 0 ? _b : key;
        }
        if (!opts.emptyAttrs && !opts.xmlMode && value === "") {
            return key;
        }
        return `${key}="${encode(value)}"`;
    }).join(" ");
}
/**
 * Self-enclosing tags
 */ const singleTag = new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
]);
function render(node, options = {}) {
    const nodes = "length" in node ? node : [
        node
    ];
    let output = "";
    for(let i = 0; i < nodes.length; i++){
        output += renderNode(nodes[i], options);
    }
    return output;
}
const __TURBOPACK__default__export__ = render;
function renderNode(node, options) {
    switch(node.type){
        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Root"]:
            return render(node.children, options);
        // @ts-expect-error We don't use `Doctype` yet
        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Doctype"]:
        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Directive"]:
            return renderDirective(node);
        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Comment"]:
            return renderComment(node);
        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CDATA"]:
            return renderCdata(node);
        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Script"]:
        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Style"]:
        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Tag"]:
            return renderTag(node, options);
        case __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"]:
            return renderText(node, options);
    }
}
const foreignModeIntegrationPoints = new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignObject",
    "desc",
    "title"
]);
const foreignElements = new Set([
    "svg",
    "math"
]);
function renderTag(elem, opts) {
    var _a;
    // Handle SVG / MathML in HTML
    if (opts.xmlMode === "foreign") {
        /* Fix up mixed-case element names */ elem.name = (_a = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$dom$2d$serializer$2f$lib$2f$esm$2f$foreignNames$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["elementNames"].get(elem.name)) !== null && _a !== void 0 ? _a : elem.name;
        /* Exit foreign mode at integration points */ if (elem.parent && foreignModeIntegrationPoints.has(elem.parent.name)) {
            opts = {
                ...opts,
                xmlMode: false
            };
        }
    }
    if (!opts.xmlMode && foreignElements.has(elem.name)) {
        opts = {
            ...opts,
            xmlMode: "foreign"
        };
    }
    let tag = `<${elem.name}`;
    const attribs = formatAttributes(elem.attribs, opts);
    if (attribs) {
        tag += ` ${attribs}`;
    }
    if (elem.children.length === 0 && (opts.xmlMode ? opts.selfClosingTags !== false : opts.selfClosingTags && singleTag.has(elem.name))) {
        if (!opts.xmlMode) tag += " ";
        tag += "/>";
    } else {
        tag += ">";
        if (elem.children.length > 0) {
            tag += render(elem.children, opts);
        }
        if (opts.xmlMode || !singleTag.has(elem.name)) {
            tag += `</${elem.name}>`;
        }
    }
    return tag;
}
function renderDirective(elem) {
    return `<${elem.data}>`;
}
function renderText(elem, opts) {
    var _a;
    let data = elem.data || "";
    // If entities weren't decoded, no need to encode them back
    if (((_a = opts.encodeEntities) !== null && _a !== void 0 ? _a : opts.decodeEntities) !== false && !(!opts.xmlMode && elem.parent && unencodedElements.has(elem.parent.name))) {
        data = opts.xmlMode || opts.encodeEntities !== "utf8" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$escape$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeXML"])(data) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$entities$2f$lib$2f$esm$2f$escape$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["escapeText"])(data);
    }
    return data;
}
function renderCdata(elem) {
    return `<![CDATA[${elem.children[0].data}]]>`;
}
function renderComment(elem) {
    return `<!--${elem.data}-->`;
}
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/stringify.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getInnerHTML",
    ()=>getInnerHTML,
    "getOuterHTML",
    ()=>getOuterHTML,
    "getText",
    ()=>getText,
    "innerText",
    ()=>innerText,
    "textContent",
    ()=>textContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domhandler/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domhandler/lib/esm/node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$dom$2d$serializer$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/dom-serializer/lib/esm/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domelementtype/lib/esm/index.js [app-route] (ecmascript)");
;
;
;
function getOuterHTML(node, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$dom$2d$serializer$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(node, options);
}
function getInnerHTML(node, options) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(node) ? node.children.map((node)=>getOuterHTML(node, options)).join("") : "";
}
function getText(node) {
    if (Array.isArray(node)) return node.map(getText).join("");
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(node)) return node.name === "br" ? "\n" : getText(node.children);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isCDATA"])(node)) return getText(node.children);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isText"])(node)) return node.data;
    return "";
}
function textContent(node) {
    if (Array.isArray(node)) return node.map(textContent).join("");
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(node) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isComment"])(node)) {
        return textContent(node.children);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isText"])(node)) return node.data;
    return "";
}
function innerText(node) {
    if (Array.isArray(node)) return node.map(innerText).join("");
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(node) && (node.type === __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ElementType"].Tag || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isCDATA"])(node))) {
        return innerText(node.children);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isText"])(node)) return node.data;
    return "";
}
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/traversal.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAttributeValue",
    ()=>getAttributeValue,
    "getChildren",
    ()=>getChildren,
    "getName",
    ()=>getName,
    "getParent",
    ()=>getParent,
    "getSiblings",
    ()=>getSiblings,
    "hasAttrib",
    ()=>hasAttrib,
    "nextElementSibling",
    ()=>nextElementSibling,
    "prevElementSibling",
    ()=>prevElementSibling
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domhandler/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domhandler/lib/esm/node.js [app-route] (ecmascript)");
;
function getChildren(elem) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(elem) ? elem.children : [];
}
function getParent(elem) {
    return elem.parent || null;
}
function getSiblings(elem) {
    const parent = getParent(elem);
    if (parent != null) return getChildren(parent);
    const siblings = [
        elem
    ];
    let { prev, next } = elem;
    while(prev != null){
        siblings.unshift(prev);
        ({ prev } = prev);
    }
    while(next != null){
        siblings.push(next);
        ({ next } = next);
    }
    return siblings;
}
function getAttributeValue(elem, name) {
    var _a;
    return (_a = elem.attribs) === null || _a === void 0 ? void 0 : _a[name];
}
function hasAttrib(elem, name) {
    return elem.attribs != null && Object.prototype.hasOwnProperty.call(elem.attribs, name) && elem.attribs[name] != null;
}
function getName(elem) {
    return elem.name;
}
function nextElementSibling(elem) {
    let { next } = elem;
    while(next !== null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(next))({ next } = next);
    return next;
}
function prevElementSibling(elem) {
    let { prev } = elem;
    while(prev !== null && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(prev))({ prev } = prev);
    return prev;
}
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/querying.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "existsOne",
    ()=>existsOne,
    "filter",
    ()=>filter,
    "find",
    ()=>find,
    "findAll",
    ()=>findAll,
    "findOne",
    ()=>findOne,
    "findOneChild",
    ()=>findOneChild
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domhandler/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domhandler/lib/esm/node.js [app-route] (ecmascript)");
;
function filter(test, node, recurse = true, limit = Infinity) {
    return find(test, Array.isArray(node) ? node : [
        node
    ], recurse, limit);
}
function find(test, nodes, recurse, limit) {
    const result = [];
    /** Stack of the arrays we are looking at. */ const nodeStack = [
        Array.isArray(nodes) ? nodes : [
            nodes
        ]
    ];
    /** Stack of the indices within the arrays. */ const indexStack = [
        0
    ];
    for(;;){
        // First, check if the current array has any more elements to look at.
        if (indexStack[0] >= nodeStack[0].length) {
            // If we have no more arrays to look at, we are done.
            if (indexStack.length === 1) {
                return result;
            }
            // Otherwise, remove the current array from the stack.
            nodeStack.shift();
            indexStack.shift();
            continue;
        }
        const elem = nodeStack[0][indexStack[0]++];
        if (test(elem)) {
            result.push(elem);
            if (--limit <= 0) return result;
        }
        if (recurse && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(elem) && elem.children.length > 0) {
            /*
             * Add the children to the stack. We are depth-first, so this is
             * the next array we look at.
             */ indexStack.unshift(0);
            nodeStack.unshift(elem.children);
        }
    }
}
function findOneChild(test, nodes) {
    return nodes.find(test);
}
function findOne(test, nodes, recurse = true) {
    const searchedNodes = Array.isArray(nodes) ? nodes : [
        nodes
    ];
    for(let i = 0; i < searchedNodes.length; i++){
        const node = searchedNodes[i];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(node) && test(node)) {
            return node;
        }
        if (recurse && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(node) && node.children.length > 0) {
            const found = findOne(test, node.children, true);
            if (found) return found;
        }
    }
    return null;
}
function existsOne(test, nodes) {
    return (Array.isArray(nodes) ? nodes : [
        nodes
    ]).some((node)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(node) && test(node) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(node) && existsOne(test, node.children));
}
function findAll(test, nodes) {
    const result = [];
    const nodeStack = [
        Array.isArray(nodes) ? nodes : [
            nodes
        ]
    ];
    const indexStack = [
        0
    ];
    for(;;){
        if (indexStack[0] >= nodeStack[0].length) {
            if (nodeStack.length === 1) {
                return result;
            }
            // Otherwise, remove the current array from the stack.
            nodeStack.shift();
            indexStack.shift();
            continue;
        }
        const elem = nodeStack[0][indexStack[0]++];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(elem) && test(elem)) result.push(elem);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(elem) && elem.children.length > 0) {
            indexStack.unshift(0);
            nodeStack.unshift(elem.children);
        }
    }
}
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/legacy.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getElementById",
    ()=>getElementById,
    "getElements",
    ()=>getElements,
    "getElementsByClassName",
    ()=>getElementsByClassName,
    "getElementsByTagName",
    ()=>getElementsByTagName,
    "getElementsByTagType",
    ()=>getElementsByTagType,
    "testElement",
    ()=>testElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domhandler/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domhandler/lib/esm/node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$querying$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/querying.js [app-route] (ecmascript)");
;
;
/**
 * A map of functions to check nodes against.
 */ const Checks = {
    tag_name (name) {
        if (typeof name === "function") {
            return (elem)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(elem) && name(elem.name);
        } else if (name === "*") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"];
        }
        return (elem)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(elem) && elem.name === name;
    },
    tag_type (type) {
        if (typeof type === "function") {
            return (elem)=>type(elem.type);
        }
        return (elem)=>elem.type === type;
    },
    tag_contains (data) {
        if (typeof data === "function") {
            return (elem)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isText"])(elem) && data(elem.data);
        }
        return (elem)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isText"])(elem) && elem.data === data;
    }
};
/**
 * Returns a function to check whether a node has an attribute with a particular
 * value.
 *
 * @param attrib Attribute to check.
 * @param value Attribute value to look for.
 * @returns A function to check whether the a node has an attribute with a
 *   particular value.
 */ function getAttribCheck(attrib, value) {
    if (typeof value === "function") {
        return (elem)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(elem) && value(elem.attribs[attrib]);
    }
    return (elem)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(elem) && elem.attribs[attrib] === value;
}
/**
 * Returns a function that returns `true` if either of the input functions
 * returns `true` for a node.
 *
 * @param a First function to combine.
 * @param b Second function to combine.
 * @returns A function taking a node and returning `true` if either of the input
 *   functions returns `true` for the node.
 */ function combineFuncs(a, b) {
    return (elem)=>a(elem) || b(elem);
}
/**
 * Returns a function that executes all checks in `options` and returns `true`
 * if any of them match a node.
 *
 * @param options An object describing nodes to look for.
 * @returns A function that executes all checks in `options` and returns `true`
 *   if any of them match a node.
 */ function compileTest(options) {
    const funcs = Object.keys(options).map((key)=>{
        const value = options[key];
        return Object.prototype.hasOwnProperty.call(Checks, key) ? Checks[key](value) : getAttribCheck(key, value);
    });
    return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
}
function testElement(options, node) {
    const test = compileTest(options);
    return test ? test(node) : true;
}
function getElements(options, nodes, recurse, limit = Infinity) {
    const test = compileTest(options);
    return test ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$querying$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["filter"])(test, nodes, recurse, limit) : [];
}
function getElementById(id, nodes, recurse = true) {
    if (!Array.isArray(nodes)) nodes = [
        nodes
    ];
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$querying$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findOne"])(getAttribCheck("id", id), nodes, recurse);
}
function getElementsByTagName(tagName, nodes, recurse = true, limit = Infinity) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$querying$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["filter"])(Checks["tag_name"](tagName), nodes, recurse, limit);
}
function getElementsByClassName(className, nodes, recurse = true, limit = Infinity) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$querying$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["filter"])(getAttribCheck("class", className), nodes, recurse, limit);
}
function getElementsByTagType(type, nodes, recurse = true, limit = Infinity) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$querying$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["filter"])(Checks["tag_type"](type), nodes, recurse, limit);
}
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/helpers.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DocumentPosition",
    ()=>DocumentPosition,
    "compareDocumentPosition",
    ()=>compareDocumentPosition,
    "removeSubsets",
    ()=>removeSubsets,
    "uniqueSort",
    ()=>uniqueSort
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domhandler/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domhandler/lib/esm/node.js [app-route] (ecmascript)");
;
function removeSubsets(nodes) {
    let idx = nodes.length;
    /*
     * Check if each node (or one of its ancestors) is already contained in the
     * array.
     */ while(--idx >= 0){
        const node = nodes[idx];
        /*
         * Remove the node if it is not unique.
         * We are going through the array from the end, so we only
         * have to check nodes that preceed the node under consideration in the array.
         */ if (idx > 0 && nodes.lastIndexOf(node, idx - 1) >= 0) {
            nodes.splice(idx, 1);
            continue;
        }
        for(let ancestor = node.parent; ancestor; ancestor = ancestor.parent){
            if (nodes.includes(ancestor)) {
                nodes.splice(idx, 1);
                break;
            }
        }
    }
    return nodes;
}
var DocumentPosition;
(function(DocumentPosition) {
    DocumentPosition[DocumentPosition["DISCONNECTED"] = 1] = "DISCONNECTED";
    DocumentPosition[DocumentPosition["PRECEDING"] = 2] = "PRECEDING";
    DocumentPosition[DocumentPosition["FOLLOWING"] = 4] = "FOLLOWING";
    DocumentPosition[DocumentPosition["CONTAINS"] = 8] = "CONTAINS";
    DocumentPosition[DocumentPosition["CONTAINED_BY"] = 16] = "CONTAINED_BY";
})(DocumentPosition || (DocumentPosition = {}));
function compareDocumentPosition(nodeA, nodeB) {
    const aParents = [];
    const bParents = [];
    if (nodeA === nodeB) {
        return 0;
    }
    let current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(nodeA) ? nodeA : nodeA.parent;
    while(current){
        aParents.unshift(current);
        current = current.parent;
    }
    current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(nodeB) ? nodeB : nodeB.parent;
    while(current){
        bParents.unshift(current);
        current = current.parent;
    }
    const maxIdx = Math.min(aParents.length, bParents.length);
    let idx = 0;
    while(idx < maxIdx && aParents[idx] === bParents[idx]){
        idx++;
    }
    if (idx === 0) {
        return DocumentPosition.DISCONNECTED;
    }
    const sharedParent = aParents[idx - 1];
    const siblings = sharedParent.children;
    const aSibling = aParents[idx];
    const bSibling = bParents[idx];
    if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
        if (sharedParent === nodeB) {
            return DocumentPosition.FOLLOWING | DocumentPosition.CONTAINED_BY;
        }
        return DocumentPosition.FOLLOWING;
    }
    if (sharedParent === nodeA) {
        return DocumentPosition.PRECEDING | DocumentPosition.CONTAINS;
    }
    return DocumentPosition.PRECEDING;
}
function uniqueSort(nodes) {
    nodes = nodes.filter((node, i, arr)=>!arr.includes(node, i + 1));
    nodes.sort((a, b)=>{
        const relative = compareDocumentPosition(a, b);
        if (relative & DocumentPosition.PRECEDING) {
            return -1;
        } else if (relative & DocumentPosition.FOLLOWING) {
            return 1;
        }
        return 0;
    });
    return nodes;
}
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/feeds.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFeed",
    ()=>getFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/stringify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$legacy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/legacy.js [app-route] (ecmascript)");
;
;
function getFeed(doc) {
    const feedRoot = getOneElement(isValidFeed, doc);
    return !feedRoot ? null : feedRoot.name === "feed" ? getAtomFeed(feedRoot) : getRssFeed(feedRoot);
}
/**
 * Parse an Atom feed.
 *
 * @param feedRoot The root of the feed.
 * @returns The parsed feed.
 */ function getAtomFeed(feedRoot) {
    var _a;
    const childs = feedRoot.children;
    const feed = {
        type: "atom",
        items: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$legacy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getElementsByTagName"])("entry", childs).map((item)=>{
            var _a;
            const { children } = item;
            const entry = {
                media: getMediaElements(children)
            };
            addConditionally(entry, "id", "id", children);
            addConditionally(entry, "title", "title", children);
            const href = (_a = getOneElement("link", children)) === null || _a === void 0 ? void 0 : _a.attribs["href"];
            if (href) {
                entry.link = href;
            }
            const description = fetch("summary", children) || fetch("content", children);
            if (description) {
                entry.description = description;
            }
            const pubDate = fetch("updated", children);
            if (pubDate) {
                entry.pubDate = new Date(pubDate);
            }
            return entry;
        })
    };
    addConditionally(feed, "id", "id", childs);
    addConditionally(feed, "title", "title", childs);
    const href = (_a = getOneElement("link", childs)) === null || _a === void 0 ? void 0 : _a.attribs["href"];
    if (href) {
        feed.link = href;
    }
    addConditionally(feed, "description", "subtitle", childs);
    const updated = fetch("updated", childs);
    if (updated) {
        feed.updated = new Date(updated);
    }
    addConditionally(feed, "author", "email", childs, true);
    return feed;
}
/**
 * Parse a RSS feed.
 *
 * @param feedRoot The root of the feed.
 * @returns The parsed feed.
 */ function getRssFeed(feedRoot) {
    var _a, _b;
    const childs = (_b = (_a = getOneElement("channel", feedRoot.children)) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : [];
    const feed = {
        type: feedRoot.name.substr(0, 3),
        id: "",
        items: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$legacy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getElementsByTagName"])("item", feedRoot.children).map((item)=>{
            const { children } = item;
            const entry = {
                media: getMediaElements(children)
            };
            addConditionally(entry, "id", "guid", children);
            addConditionally(entry, "title", "title", children);
            addConditionally(entry, "link", "link", children);
            addConditionally(entry, "description", "description", children);
            const pubDate = fetch("pubDate", children) || fetch("dc:date", children);
            if (pubDate) entry.pubDate = new Date(pubDate);
            return entry;
        })
    };
    addConditionally(feed, "title", "title", childs);
    addConditionally(feed, "link", "link", childs);
    addConditionally(feed, "description", "description", childs);
    const updated = fetch("lastBuildDate", childs);
    if (updated) {
        feed.updated = new Date(updated);
    }
    addConditionally(feed, "author", "managingEditor", childs, true);
    return feed;
}
const MEDIA_KEYS_STRING = [
    "url",
    "type",
    "lang"
];
const MEDIA_KEYS_INT = [
    "fileSize",
    "bitrate",
    "framerate",
    "samplingrate",
    "channels",
    "duration",
    "height",
    "width"
];
/**
 * Get all media elements of a feed item.
 *
 * @param where Nodes to search in.
 * @returns Media elements.
 */ function getMediaElements(where) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$legacy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getElementsByTagName"])("media:content", where).map((elem)=>{
        const { attribs } = elem;
        const media = {
            medium: attribs["medium"],
            isDefault: !!attribs["isDefault"]
        };
        for (const attrib of MEDIA_KEYS_STRING){
            if (attribs[attrib]) {
                media[attrib] = attribs[attrib];
            }
        }
        for (const attrib of MEDIA_KEYS_INT){
            if (attribs[attrib]) {
                media[attrib] = parseInt(attribs[attrib], 10);
            }
        }
        if (attribs["expression"]) {
            media.expression = attribs["expression"];
        }
        return media;
    });
}
/**
 * Get one element by tag name.
 *
 * @param tagName Tag name to look for
 * @param node Node to search in
 * @returns The element or null
 */ function getOneElement(tagName, node) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$legacy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getElementsByTagName"])(tagName, node, true, 1)[0];
}
/**
 * Get the text content of an element with a certain tag name.
 *
 * @param tagName Tag name to look for.
 * @param where Node to search in.
 * @param recurse Whether to recurse into child nodes.
 * @returns The text content of the element.
 */ function fetch(tagName, where, recurse = false) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["textContent"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$legacy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getElementsByTagName"])(tagName, where, recurse, 1)).trim();
}
/**
 * Adds a property to an object if it has a value.
 *
 * @param obj Object to be extended
 * @param prop Property name
 * @param tagName Tag name that contains the conditionally added property
 * @param where Element to search for the property
 * @param recurse Whether to recurse into child nodes.
 */ function addConditionally(obj, prop, tagName, where, recurse = false) {
    const val = fetch(tagName, where, recurse);
    if (val) obj[prop] = val;
}
/**
 * Checks if an element is a feed root node.
 *
 * @param value The name of the element to check.
 * @returns Whether an element is a feed root node.
 */ function isValidFeed(value) {
    return value === "rss" || value === "feed" || value === "rdf:RDF";
}
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/stringify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$traversal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/traversal.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$querying$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/querying.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$legacy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/legacy.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/helpers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$feeds$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domutils/lib/esm/feeds.js [app-route] (ecmascript)");
/** @deprecated Use these methods from `domhandler` directly. */ var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/domhandler/lib/esm/index.js [app-route] (ecmascript) <locals>");
;
;
;
;
;
;
;
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/deepmerge/dist/cjs.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var isMergeableObject = function isMergeableObject(value) {
    return isNonNullObject(value) && !isSpecial(value);
};
function isNonNullObject(value) {
    return !!value && typeof value === 'object';
}
function isSpecial(value) {
    var stringValue = Object.prototype.toString.call(value);
    return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
}
// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;
function isReactElement(value) {
    return value.$$typeof === REACT_ELEMENT_TYPE;
}
function emptyTarget(val) {
    return Array.isArray(val) ? [] : {};
}
function cloneUnlessOtherwiseSpecified(value, options) {
    return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
}
function defaultArrayMerge(target, source, options) {
    return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
    });
}
function getMergeFunction(key, options) {
    if (!options.customMerge) {
        return deepmerge;
    }
    var customMerge = options.customMerge(key);
    return typeof customMerge === 'function' ? customMerge : deepmerge;
}
function getEnumerableOwnPropertySymbols(target) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return Object.propertyIsEnumerable.call(target, symbol);
    }) : [];
}
function getKeys(target) {
    return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}
function propertyIsOnObject(object, property) {
    try {
        return property in object;
    } catch (_) {
        return false;
    }
}
// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
    return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
     && !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
     && Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
    ;
}
function mergeObject(target, source, options) {
    var destination = {};
    if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
            destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
    }
    getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
            return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
            destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
            destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
    });
    return destination;
}
function deepmerge(target, source, options) {
    options = options || {};
    options.arrayMerge = options.arrayMerge || defaultArrayMerge;
    options.isMergeableObject = options.isMergeableObject || isMergeableObject;
    // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
    // implementations can use it. The caller may not replace it.
    options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
    if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
    } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
    } else {
        return mergeObject(target, source, options);
    }
}
deepmerge.all = function deepmergeAll(array, options) {
    if (!Array.isArray(array)) {
        throw new Error('first argument should be an array');
    }
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, options);
    }, {});
};
var deepmerge_1 = deepmerge;
module.exports = deepmerge_1;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/html-to-text/lib/html-to-text.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compile",
    ()=>compile,
    "convert",
    ()=>convert,
    "htmlToText",
    ()=>convert
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$selderee$2f$plugin$2d$htmlparser2$2f$lib$2f$hp2$2d$builder$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@selderee/plugin-htmlparser2/lib/hp2-builder.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$htmlparser2$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/htmlparser2/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$selderee$2f$lib$2f$selderee$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/selderee/lib/selderee.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$deepmerge$2f$dist$2f$cjs$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/deepmerge/dist/cjs.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$dom$2d$serializer$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/dom-serializer/lib/esm/index.js [app-route] (ecmascript)");
;
;
;
;
;
/**
 * Make a recursive function that will only run to a given depth
 * and switches to an alternative function at that depth. \
 * No limitation if `n` is `undefined` (Just wraps `f` in that case).
 *
 * @param   { number | undefined } n   Allowed depth of recursion. `undefined` for no limitation.
 * @param   { Function }           f   Function that accepts recursive callback as the first argument.
 * @param   { Function }           [g] Function to run instead, when maximum depth was reached. Do nothing by default.
 * @returns { Function }
 */ function limitedDepthRecursive(n, f, g = ()=>undefined) {
    if (n === undefined) {
        const f1 = function(...args) {
            return f(f1, ...args);
        };
        return f1;
    }
    if (n >= 0) {
        return function(...args) {
            return f(limitedDepthRecursive(n - 1, f, g), ...args);
        };
    }
    return g;
}
/**
 * Return the same string or a substring with
 * the given character occurrences removed from each side.
 *
 * @param   { string } str  A string to trim.
 * @param   { string } char A character to be trimmed.
 * @returns { string }
 */ function trimCharacter(str, char) {
    let start = 0;
    let end = str.length;
    while(start < end && str[start] === char){
        ++start;
    }
    while(end > start && str[end - 1] === char){
        --end;
    }
    return start > 0 || end < str.length ? str.substring(start, end) : str;
}
/**
 * Return the same string or a substring with
 * the given character occurrences removed from the end only.
 *
 * @param   { string } str  A string to trim.
 * @param   { string } char A character to be trimmed.
 * @returns { string }
 */ function trimCharacterEnd(str, char) {
    let end = str.length;
    while(end > 0 && str[end - 1] === char){
        --end;
    }
    return end < str.length ? str.substring(0, end) : str;
}
/**
 * Return a new string will all characters replaced with unicode escape sequences.
 * This extreme kind of escaping can used to be safely compose regular expressions.
 *
 * @param { string } str A string to escape.
 * @returns { string } A string of unicode escape sequences.
 */ function unicodeEscape(str) {
    return str.replace(/[\s\S]/g, (c)=>'\\u' + c.charCodeAt().toString(16).padStart(4, '0'));
}
/**
 * Deduplicate an array by a given key callback.
 * Item properties are merged recursively and with the preference for last defined values.
 * Of items with the same key, merged item takes the place of the last item,
 * others are omitted.
 *
 * @param { any[] } items An array to deduplicate.
 * @param { (x: any) => string } getKey Callback to get a value that distinguishes unique items.
 * @returns { any[] }
 */ function mergeDuplicatesPreferLast(items, getKey) {
    const map = new Map();
    for(let i = items.length; i-- > 0;){
        const item = items[i];
        const key = getKey(item);
        map.set(key, map.has(key) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$deepmerge$2f$dist$2f$cjs$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(item, map.get(key), {
            arrayMerge: overwriteMerge$1
        }) : item);
    }
    return [
        ...map.values()
    ].reverse();
}
const overwriteMerge$1 = (acc, src, options)=>[
        ...src
    ];
/**
 * Get a nested property from an object.
 *
 * @param   { object }   obj  The object to query for the value.
 * @param   { string[] } path The path to the property.
 * @returns { any }
 */ function get(obj, path) {
    for (const key of path){
        if (!obj) {
            return undefined;
        }
        obj = obj[key];
    }
    return obj;
}
/**
 * Convert a number into alphabetic sequence representation (Sequence without zeroes).
 *
 * For example: `a, ..., z, aa, ..., zz, aaa, ...`.
 *
 * @param   { number } num              Number to convert. Must be >= 1.
 * @param   { string } [baseChar = 'a'] Character for 1 in the sequence.
 * @param   { number } [base = 26]      Number of characters in the sequence.
 * @returns { string }
 */ function numberToLetterSequence(num, baseChar = 'a', base = 26) {
    const digits = [];
    do {
        num -= 1;
        digits.push(num % base);
        num = num / base >> 0; // quick `floor`
    }while (num > 0)
    const baseCode = baseChar.charCodeAt(0);
    return digits.reverse().map((n)=>String.fromCharCode(baseCode + n)).join('');
}
const I = [
    'I',
    'X',
    'C',
    'M'
];
const V = [
    'V',
    'L',
    'D'
];
/**
 * Convert a number to it's Roman representation. No large numbers extension.
 *
 * @param   { number } num Number to convert. `0 < num <= 3999`.
 * @returns { string }
 */ function numberToRoman(num) {
    return [
        ...num + ''
    ].map((n)=>+n).reverse().map((v, i)=>v % 5 < 4 ? (v < 5 ? '' : V[i]) + I[i].repeat(v % 5) : I[i] + (v < 5 ? V[i] : I[i + 1])).reverse().join('');
}
/**
 * Helps to build text from words.
 */ class InlineTextBuilder {
    /**
   * Creates an instance of InlineTextBuilder.
   *
   * If `maxLineLength` is not provided then it is either `options.wordwrap` or unlimited.
   *
   * @param { Options } options           HtmlToText options.
   * @param { number }  [ maxLineLength ] This builder will try to wrap text to fit this line length.
   */ constructor(options, maxLineLength = undefined){
        /** @type { string[][] } */ this.lines = [];
        /** @type { string[] }   */ this.nextLineWords = [];
        this.maxLineLength = maxLineLength || options.wordwrap || Number.MAX_VALUE;
        this.nextLineAvailableChars = this.maxLineLength;
        this.wrapCharacters = get(options, [
            'longWordSplit',
            'wrapCharacters'
        ]) || [];
        this.forceWrapOnLimit = get(options, [
            'longWordSplit',
            'forceWrapOnLimit'
        ]) || false;
        this.stashedSpace = false;
        this.wordBreakOpportunity = false;
    }
    /**
   * Add a new word.
   *
   * @param { string } word A word to add.
   * @param { boolean } [noWrap] Don't wrap text even if the line is too long.
   */ pushWord(word, noWrap = false) {
        if (this.nextLineAvailableChars <= 0 && !noWrap) {
            this.startNewLine();
        }
        const isLineStart = this.nextLineWords.length === 0;
        const cost = word.length + (isLineStart ? 0 : 1);
        if (cost <= this.nextLineAvailableChars || noWrap) {
            this.nextLineWords.push(word);
            this.nextLineAvailableChars -= cost;
        } else {
            // The word is moved to a new line - prefer to wrap between words.
            const [first, ...rest] = this.splitLongWord(word);
            if (!isLineStart) {
                this.startNewLine();
            }
            this.nextLineWords.push(first);
            this.nextLineAvailableChars -= first.length;
            for (const part of rest){
                this.startNewLine();
                this.nextLineWords.push(part);
                this.nextLineAvailableChars -= part.length;
            }
        }
    }
    /**
   * Pop a word from the currently built line.
   * This doesn't affect completed lines.
   *
   * @returns { string }
   */ popWord() {
        const lastWord = this.nextLineWords.pop();
        if (lastWord !== undefined) {
            const isLineStart = this.nextLineWords.length === 0;
            const cost = lastWord.length + (isLineStart ? 0 : 1);
            this.nextLineAvailableChars += cost;
        }
        return lastWord;
    }
    /**
   * Concat a word to the last word already in the builder.
   * Adds a new word in case there are no words yet in the last line.
   *
   * @param { string } word A word to be concatenated.
   * @param { boolean } [noWrap] Don't wrap text even if the line is too long.
   */ concatWord(word, noWrap = false) {
        if (this.wordBreakOpportunity && word.length > this.nextLineAvailableChars) {
            this.pushWord(word, noWrap);
            this.wordBreakOpportunity = false;
        } else {
            const lastWord = this.popWord();
            this.pushWord(lastWord ? lastWord.concat(word) : word, noWrap);
        }
    }
    /**
   * Add current line (and more empty lines if provided argument > 1) to the list of complete lines and start a new one.
   *
   * @param { number } n Number of line breaks that will be added to the resulting string.
   */ startNewLine(n = 1) {
        this.lines.push(this.nextLineWords);
        if (n > 1) {
            this.lines.push(...Array.from({
                length: n - 1
            }, ()=>[]));
        }
        this.nextLineWords = [];
        this.nextLineAvailableChars = this.maxLineLength;
    }
    /**
   * No words in this builder.
   *
   * @returns { boolean }
   */ isEmpty() {
        return this.lines.length === 0 && this.nextLineWords.length === 0;
    }
    clear() {
        this.lines.length = 0;
        this.nextLineWords.length = 0;
        this.nextLineAvailableChars = this.maxLineLength;
    }
    /**
   * Join all lines of words inside the InlineTextBuilder into a complete string.
   *
   * @returns { string }
   */ toString() {
        return [
            ...this.lines,
            this.nextLineWords
        ].map((words)=>words.join(' ')).join('\n');
    }
    /**
   * Split a long word up to fit within the word wrap limit.
   * Use either a character to split looking back from the word wrap limit,
   * or truncate to the word wrap limit.
   *
   * @param   { string }   word Input word.
   * @returns { string[] }      Parts of the word.
   */ splitLongWord(word) {
        const parts = [];
        let idx = 0;
        while(word.length > this.maxLineLength){
            const firstLine = word.substring(0, this.maxLineLength);
            const remainingChars = word.substring(this.maxLineLength);
            const splitIndex = firstLine.lastIndexOf(this.wrapCharacters[idx]);
            if (splitIndex > -1) {
                word = firstLine.substring(splitIndex + 1) + remainingChars;
                parts.push(firstLine.substring(0, splitIndex + 1));
            } else {
                idx++;
                if (idx < this.wrapCharacters.length) {
                    word = firstLine + remainingChars;
                } else {
                    if (this.forceWrapOnLimit) {
                        parts.push(firstLine);
                        word = remainingChars;
                        if (word.length > this.maxLineLength) {
                            continue;
                        }
                    } else {
                        word = firstLine + remainingChars;
                    }
                    break;
                }
            }
        }
        parts.push(word); // Add remaining part to array
        return parts;
    }
}
/* eslint-disable max-classes-per-file */ class StackItem {
    constructor(next = null){
        this.next = next;
    }
    getRoot() {
        return this.next ? this.next : this;
    }
}
class BlockStackItem extends StackItem {
    constructor(options, next = null, leadingLineBreaks = 1, maxLineLength = undefined){
        super(next);
        this.leadingLineBreaks = leadingLineBreaks;
        this.inlineTextBuilder = new InlineTextBuilder(options, maxLineLength);
        this.rawText = '';
        this.stashedLineBreaks = 0;
        this.isPre = next && next.isPre;
        this.isNoWrap = next && next.isNoWrap;
    }
}
class ListStackItem extends BlockStackItem {
    constructor(options, next = null, { interRowLineBreaks = 1, leadingLineBreaks = 2, maxLineLength = undefined, maxPrefixLength = 0, prefixAlign = 'left' } = {}){
        super(options, next, leadingLineBreaks, maxLineLength);
        this.maxPrefixLength = maxPrefixLength;
        this.prefixAlign = prefixAlign;
        this.interRowLineBreaks = interRowLineBreaks;
    }
}
class ListItemStackItem extends BlockStackItem {
    constructor(options, next = null, { leadingLineBreaks = 1, maxLineLength = undefined, prefix = '' } = {}){
        super(options, next, leadingLineBreaks, maxLineLength);
        this.prefix = prefix;
    }
}
class TableStackItem extends StackItem {
    constructor(next = null){
        super(next);
        this.rows = [];
        this.isPre = next && next.isPre;
        this.isNoWrap = next && next.isNoWrap;
    }
}
class TableRowStackItem extends StackItem {
    constructor(next = null){
        super(next);
        this.cells = [];
        this.isPre = next && next.isPre;
        this.isNoWrap = next && next.isNoWrap;
    }
}
class TableCellStackItem extends StackItem {
    constructor(options, next = null, maxColumnWidth = undefined){
        super(next);
        this.inlineTextBuilder = new InlineTextBuilder(options, maxColumnWidth);
        this.rawText = '';
        this.stashedLineBreaks = 0;
        this.isPre = next && next.isPre;
        this.isNoWrap = next && next.isNoWrap;
    }
}
class TransformerStackItem extends StackItem {
    constructor(next = null, transform){
        super(next);
        this.transform = transform;
    }
}
function charactersToCodes(str) {
    return [
        ...str
    ].map((c)=>'\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join('');
}
/**
 * Helps to handle HTML whitespaces.
 *
 * @class WhitespaceProcessor
 */ class WhitespaceProcessor {
    /**
   * Creates an instance of WhitespaceProcessor.
   *
   * @param { Options } options    HtmlToText options.
   * @memberof WhitespaceProcessor
   */ constructor(options){
        this.whitespaceChars = options.preserveNewlines ? options.whitespaceCharacters.replace(/\n/g, '') : options.whitespaceCharacters;
        const whitespaceCodes = charactersToCodes(this.whitespaceChars);
        this.leadingWhitespaceRe = new RegExp(`^[${whitespaceCodes}]`);
        this.trailingWhitespaceRe = new RegExp(`[${whitespaceCodes}]$`);
        this.allWhitespaceOrEmptyRe = new RegExp(`^[${whitespaceCodes}]*$`);
        this.newlineOrNonWhitespaceRe = new RegExp(`(\\n|[^\\n${whitespaceCodes}])`, 'g');
        this.newlineOrNonNewlineStringRe = new RegExp(`(\\n|[^\\n]+)`, 'g');
        if (options.preserveNewlines) {
            const wordOrNewlineRe = new RegExp(`\\n|[^\\n${whitespaceCodes}]+`, 'gm');
            /**
       * Shrink whitespaces and wrap text, add to the builder.
       *
       * @param { string }                  text              Input text.
       * @param { InlineTextBuilder }       inlineTextBuilder A builder to receive processed text.
       * @param { (str: string) => string } [ transform ]     A transform to be applied to words.
       * @param { boolean }                 [noWrap] Don't wrap text even if the line is too long.
       */ this.shrinkWrapAdd = function(text, inlineTextBuilder, transform = (str)=>str, noWrap = false) {
                if (!text) {
                    return;
                }
                const previouslyStashedSpace = inlineTextBuilder.stashedSpace;
                let anyMatch = false;
                let m = wordOrNewlineRe.exec(text);
                if (m) {
                    anyMatch = true;
                    if (m[0] === '\n') {
                        inlineTextBuilder.startNewLine();
                    } else if (previouslyStashedSpace || this.testLeadingWhitespace(text)) {
                        inlineTextBuilder.pushWord(transform(m[0]), noWrap);
                    } else {
                        inlineTextBuilder.concatWord(transform(m[0]), noWrap);
                    }
                    while((m = wordOrNewlineRe.exec(text)) !== null){
                        if (m[0] === '\n') {
                            inlineTextBuilder.startNewLine();
                        } else {
                            inlineTextBuilder.pushWord(transform(m[0]), noWrap);
                        }
                    }
                }
                inlineTextBuilder.stashedSpace = previouslyStashedSpace && !anyMatch || this.testTrailingWhitespace(text);
            // No need to stash a space in case last added item was a new line,
            // but that won't affect anything later anyway.
            };
        } else {
            const wordRe = new RegExp(`[^${whitespaceCodes}]+`, 'g');
            this.shrinkWrapAdd = function(text, inlineTextBuilder, transform = (str)=>str, noWrap = false) {
                if (!text) {
                    return;
                }
                const previouslyStashedSpace = inlineTextBuilder.stashedSpace;
                let anyMatch = false;
                let m = wordRe.exec(text);
                if (m) {
                    anyMatch = true;
                    if (previouslyStashedSpace || this.testLeadingWhitespace(text)) {
                        inlineTextBuilder.pushWord(transform(m[0]), noWrap);
                    } else {
                        inlineTextBuilder.concatWord(transform(m[0]), noWrap);
                    }
                    while((m = wordRe.exec(text)) !== null){
                        inlineTextBuilder.pushWord(transform(m[0]), noWrap);
                    }
                }
                inlineTextBuilder.stashedSpace = previouslyStashedSpace && !anyMatch || this.testTrailingWhitespace(text);
            };
        }
    }
    /**
   * Add text with only minimal processing.
   * Everything between newlines considered a single word.
   * No whitespace is trimmed.
   * Not affected by preserveNewlines option - `\n` always starts a new line.
   *
   * `noWrap` argument is `true` by default - this won't start a new line
   * even if there is not enough space left in the current line.
   *
   * @param { string }            text              Input text.
   * @param { InlineTextBuilder } inlineTextBuilder A builder to receive processed text.
   * @param { boolean }           [noWrap] Don't wrap text even if the line is too long.
   */ addLiteral(text, inlineTextBuilder, noWrap = true) {
        if (!text) {
            return;
        }
        const previouslyStashedSpace = inlineTextBuilder.stashedSpace;
        let anyMatch = false;
        let m = this.newlineOrNonNewlineStringRe.exec(text);
        if (m) {
            anyMatch = true;
            if (m[0] === '\n') {
                inlineTextBuilder.startNewLine();
            } else if (previouslyStashedSpace) {
                inlineTextBuilder.pushWord(m[0], noWrap);
            } else {
                inlineTextBuilder.concatWord(m[0], noWrap);
            }
            while((m = this.newlineOrNonNewlineStringRe.exec(text)) !== null){
                if (m[0] === '\n') {
                    inlineTextBuilder.startNewLine();
                } else {
                    inlineTextBuilder.pushWord(m[0], noWrap);
                }
            }
        }
        inlineTextBuilder.stashedSpace = previouslyStashedSpace && !anyMatch;
    }
    /**
   * Test whether the given text starts with HTML whitespace character.
   *
   * @param   { string }  text  The string to test.
   * @returns { boolean }
   */ testLeadingWhitespace(text) {
        return this.leadingWhitespaceRe.test(text);
    }
    /**
   * Test whether the given text ends with HTML whitespace character.
   *
   * @param   { string }  text  The string to test.
   * @returns { boolean }
   */ testTrailingWhitespace(text) {
        return this.trailingWhitespaceRe.test(text);
    }
    /**
   * Test whether the given text contains any non-whitespace characters.
   *
   * @param   { string }  text  The string to test.
   * @returns { boolean }
   */ testContainsWords(text) {
        return !this.allWhitespaceOrEmptyRe.test(text);
    }
    /**
   * Return the number of newlines if there are no words.
   *
   * If any word is found then return zero regardless of the actual number of newlines.
   *
   * @param   { string }  text  Input string.
   * @returns { number }
   */ countNewlinesNoWords(text) {
        this.newlineOrNonWhitespaceRe.lastIndex = 0;
        let counter = 0;
        let match;
        while((match = this.newlineOrNonWhitespaceRe.exec(text)) !== null){
            if (match[0] === '\n') {
                counter++;
            } else {
                return 0;
            }
        }
        return counter;
    }
}
/**
 * Helps to build text from inline and block elements.
 *
 * @class BlockTextBuilder
 */ class BlockTextBuilder {
    /**
   * Creates an instance of BlockTextBuilder.
   *
   * @param { Options } options HtmlToText options.
   * @param { import('selderee').Picker<DomNode, TagDefinition> } picker Selectors decision tree picker.
   * @param { any} [metadata] Optional metadata for HTML document, for use in formatters.
   */ constructor(options, picker, metadata = undefined){
        this.options = options;
        this.picker = picker;
        this.metadata = metadata;
        this.whitespaceProcessor = new WhitespaceProcessor(options);
        /** @type { StackItem } */ this._stackItem = new BlockStackItem(options);
        /** @type { TransformerStackItem } */ this._wordTransformer = undefined;
    }
    /**
   * Put a word-by-word transform function onto the transformations stack.
   *
   * Mainly used for uppercasing. Can be bypassed to add unformatted text such as URLs.
   *
   * Word transformations applied before wrapping.
   *
   * @param { (str: string) => string } wordTransform Word transformation function.
   */ pushWordTransform(wordTransform) {
        this._wordTransformer = new TransformerStackItem(this._wordTransformer, wordTransform);
    }
    /**
   * Remove a function from the word transformations stack.
   *
   * @returns { (str: string) => string } A function that was removed.
   */ popWordTransform() {
        if (!this._wordTransformer) {
            return undefined;
        }
        const transform = this._wordTransformer.transform;
        this._wordTransformer = this._wordTransformer.next;
        return transform;
    }
    /**
   * Ignore wordwrap option in followup inline additions and disable automatic wrapping.
   */ startNoWrap() {
        this._stackItem.isNoWrap = true;
    }
    /**
   * Return automatic wrapping to behavior defined by options.
   */ stopNoWrap() {
        this._stackItem.isNoWrap = false;
    }
    /** @returns { (str: string) => string } */ _getCombinedWordTransformer() {
        const wt = this._wordTransformer ? (str)=>applyTransformer(str, this._wordTransformer) : undefined;
        const ce = this.options.encodeCharacters;
        return wt ? ce ? (str)=>ce(wt(str)) : wt : ce;
    }
    _popStackItem() {
        const item = this._stackItem;
        this._stackItem = item.next;
        return item;
    }
    /**
   * Add a line break into currently built block.
   */ addLineBreak() {
        if (!(this._stackItem instanceof BlockStackItem || this._stackItem instanceof ListItemStackItem || this._stackItem instanceof TableCellStackItem)) {
            return;
        }
        if (this._stackItem.isPre) {
            this._stackItem.rawText += '\n';
        } else {
            this._stackItem.inlineTextBuilder.startNewLine();
        }
    }
    /**
   * Allow to break line in case directly following text will not fit.
   */ addWordBreakOpportunity() {
        if (this._stackItem instanceof BlockStackItem || this._stackItem instanceof ListItemStackItem || this._stackItem instanceof TableCellStackItem) {
            this._stackItem.inlineTextBuilder.wordBreakOpportunity = true;
        }
    }
    /**
   * Add a node inline into the currently built block.
   *
   * @param { string } str
   * Text content of a node to add.
   *
   * @param { object } [param1]
   * Object holding the parameters of the operation.
   *
   * @param { boolean } [param1.noWordTransform]
   * Ignore word transformers if there are any.
   * Don't encode characters as well.
   * (Use this for things like URL addresses).
   */ addInline(str, { noWordTransform = false } = {}) {
        if (!(this._stackItem instanceof BlockStackItem || this._stackItem instanceof ListItemStackItem || this._stackItem instanceof TableCellStackItem)) {
            return;
        }
        if (this._stackItem.isPre) {
            this._stackItem.rawText += str;
            return;
        }
        if (str.length === 0 || this._stackItem.stashedLineBreaks && // stashed linebreaks make whitespace irrelevant
        !this.whitespaceProcessor.testContainsWords(str) // no words to add
        ) {
            return;
        }
        if (this.options.preserveNewlines) {
            const newlinesNumber = this.whitespaceProcessor.countNewlinesNoWords(str);
            if (newlinesNumber > 0) {
                this._stackItem.inlineTextBuilder.startNewLine(newlinesNumber);
                // keep stashedLineBreaks unchanged
                return;
            }
        }
        if (this._stackItem.stashedLineBreaks) {
            this._stackItem.inlineTextBuilder.startNewLine(this._stackItem.stashedLineBreaks);
        }
        this.whitespaceProcessor.shrinkWrapAdd(str, this._stackItem.inlineTextBuilder, noWordTransform ? undefined : this._getCombinedWordTransformer(), this._stackItem.isNoWrap);
        this._stackItem.stashedLineBreaks = 0; // inline text doesn't introduce line breaks
    }
    /**
   * Add a string inline into the currently built block.
   *
   * Use this for markup elements that don't have to adhere
   * to text layout rules.
   *
   * @param { string } str Text to add.
   */ addLiteral(str) {
        if (!(this._stackItem instanceof BlockStackItem || this._stackItem instanceof ListItemStackItem || this._stackItem instanceof TableCellStackItem)) {
            return;
        }
        if (str.length === 0) {
            return;
        }
        if (this._stackItem.isPre) {
            this._stackItem.rawText += str;
            return;
        }
        if (this._stackItem.stashedLineBreaks) {
            this._stackItem.inlineTextBuilder.startNewLine(this._stackItem.stashedLineBreaks);
        }
        this.whitespaceProcessor.addLiteral(str, this._stackItem.inlineTextBuilder, this._stackItem.isNoWrap);
        this._stackItem.stashedLineBreaks = 0;
    }
    /**
   * Start building a new block.
   *
   * @param { object } [param0]
   * Object holding the parameters of the block.
   *
   * @param { number } [param0.leadingLineBreaks]
   * This block should have at least this number of line breaks to separate it from any preceding block.
   *
   * @param { number }  [param0.reservedLineLength]
   * Reserve this number of characters on each line for block markup.
   *
   * @param { boolean } [param0.isPre]
   * Should HTML whitespace be preserved inside this block.
   */ openBlock({ leadingLineBreaks = 1, reservedLineLength = 0, isPre = false } = {}) {
        const maxLineLength = Math.max(20, this._stackItem.inlineTextBuilder.maxLineLength - reservedLineLength);
        this._stackItem = new BlockStackItem(this.options, this._stackItem, leadingLineBreaks, maxLineLength);
        if (isPre) {
            this._stackItem.isPre = true;
        }
    }
    /**
   * Finalize currently built block, add it's content to the parent block.
   *
   * @param { object } [param0]
   * Object holding the parameters of the block.
   *
   * @param { number } [param0.trailingLineBreaks]
   * This block should have at least this number of line breaks to separate it from any following block.
   *
   * @param { (str: string) => string } [param0.blockTransform]
   * A function to transform the block text before adding to the parent block.
   * This happens after word wrap and should be used in combination with reserved line length
   * in order to keep line lengths correct.
   * Used for whole block markup.
   */ closeBlock({ trailingLineBreaks = 1, blockTransform = undefined } = {}) {
        const block = this._popStackItem();
        const blockText = blockTransform ? blockTransform(getText(block)) : getText(block);
        addText(this._stackItem, blockText, block.leadingLineBreaks, Math.max(block.stashedLineBreaks, trailingLineBreaks));
    }
    /**
   * Start building a new list.
   *
   * @param { object } [param0]
   * Object holding the parameters of the list.
   *
   * @param { number } [param0.maxPrefixLength]
   * Length of the longest list item prefix.
   * If not supplied or too small then list items won't be aligned properly.
   *
   * @param { 'left' | 'right' } [param0.prefixAlign]
   * Specify how prefixes of different lengths have to be aligned
   * within a column.
   *
   * @param { number } [param0.interRowLineBreaks]
   * Minimum number of line breaks between list items.
   *
   * @param { number } [param0.leadingLineBreaks]
   * This list should have at least this number of line breaks to separate it from any preceding block.
   */ openList({ maxPrefixLength = 0, prefixAlign = 'left', interRowLineBreaks = 1, leadingLineBreaks = 2 } = {}) {
        this._stackItem = new ListStackItem(this.options, this._stackItem, {
            interRowLineBreaks: interRowLineBreaks,
            leadingLineBreaks: leadingLineBreaks,
            maxLineLength: this._stackItem.inlineTextBuilder.maxLineLength,
            maxPrefixLength: maxPrefixLength,
            prefixAlign: prefixAlign
        });
    }
    /**
   * Start building a new list item.
   *
   * @param {object} param0
   * Object holding the parameters of the list item.
   *
   * @param { string } [param0.prefix]
   * Prefix for this list item (item number, bullet point, etc).
   */ openListItem({ prefix = '' } = {}) {
        if (!(this._stackItem instanceof ListStackItem)) {
            throw new Error('Can\'t add a list item to something that is not a list! Check the formatter.');
        }
        const list = this._stackItem;
        const prefixLength = Math.max(prefix.length, list.maxPrefixLength);
        const maxLineLength = Math.max(20, list.inlineTextBuilder.maxLineLength - prefixLength);
        this._stackItem = new ListItemStackItem(this.options, list, {
            prefix: prefix,
            maxLineLength: maxLineLength,
            leadingLineBreaks: list.interRowLineBreaks
        });
    }
    /**
   * Finalize currently built list item, add it's content to the parent list.
   */ closeListItem() {
        const listItem = this._popStackItem();
        const list = listItem.next;
        const prefixLength = Math.max(listItem.prefix.length, list.maxPrefixLength);
        const spacing = '\n' + ' '.repeat(prefixLength);
        const prefix = list.prefixAlign === 'right' ? listItem.prefix.padStart(prefixLength) : listItem.prefix.padEnd(prefixLength);
        const text = prefix + getText(listItem).replace(/\n/g, spacing);
        addText(list, text, listItem.leadingLineBreaks, Math.max(listItem.stashedLineBreaks, list.interRowLineBreaks));
    }
    /**
   * Finalize currently built list, add it's content to the parent block.
   *
   * @param { object } param0
   * Object holding the parameters of the list.
   *
   * @param { number } [param0.trailingLineBreaks]
   * This list should have at least this number of line breaks to separate it from any following block.
   */ closeList({ trailingLineBreaks = 2 } = {}) {
        const list = this._popStackItem();
        const text = getText(list);
        if (text) {
            addText(this._stackItem, text, list.leadingLineBreaks, trailingLineBreaks);
        }
    }
    /**
   * Start building a table.
   */ openTable() {
        this._stackItem = new TableStackItem(this._stackItem);
    }
    /**
   * Start building a table row.
   */ openTableRow() {
        if (!(this._stackItem instanceof TableStackItem)) {
            throw new Error('Can\'t add a table row to something that is not a table! Check the formatter.');
        }
        this._stackItem = new TableRowStackItem(this._stackItem);
    }
    /**
   * Start building a table cell.
   *
   * @param { object } [param0]
   * Object holding the parameters of the cell.
   *
   * @param { number } [param0.maxColumnWidth]
   * Wrap cell content to this width. Fall back to global wordwrap value if undefined.
   */ openTableCell({ maxColumnWidth = undefined } = {}) {
        if (!(this._stackItem instanceof TableRowStackItem)) {
            throw new Error('Can\'t add a table cell to something that is not a table row! Check the formatter.');
        }
        this._stackItem = new TableCellStackItem(this.options, this._stackItem, maxColumnWidth);
    }
    /**
   * Finalize currently built table cell and add it to parent table row's cells.
   *
   * @param { object } [param0]
   * Object holding the parameters of the cell.
   *
   * @param { number } [param0.colspan] How many columns this cell should occupy.
   * @param { number } [param0.rowspan] How many rows this cell should occupy.
   */ closeTableCell({ colspan = 1, rowspan = 1 } = {}) {
        const cell = this._popStackItem();
        const text = trimCharacter(getText(cell), '\n');
        cell.next.cells.push({
            colspan: colspan,
            rowspan: rowspan,
            text: text
        });
    }
    /**
   * Finalize currently built table row and add it to parent table's rows.
   */ closeTableRow() {
        const row = this._popStackItem();
        row.next.rows.push(row.cells);
    }
    /**
   * Finalize currently built table and add the rendered text to the parent block.
   *
   * @param { object } param0
   * Object holding the parameters of the table.
   *
   * @param { TablePrinter } param0.tableToString
   * A function to convert a table of stringified cells into a complete table.
   *
   * @param { number } [param0.leadingLineBreaks]
   * This table should have at least this number of line breaks to separate if from any preceding block.
   *
   * @param { number } [param0.trailingLineBreaks]
   * This table should have at least this number of line breaks to separate it from any following block.
   */ closeTable({ tableToString, leadingLineBreaks = 2, trailingLineBreaks = 2 }) {
        const table = this._popStackItem();
        const output = tableToString(table.rows);
        if (output) {
            addText(this._stackItem, output, leadingLineBreaks, trailingLineBreaks);
        }
    }
    /**
   * Return the rendered text content of this builder.
   *
   * @returns { string }
   */ toString() {
        return getText(this._stackItem.getRoot());
    // There should only be the root item if everything is closed properly.
    }
}
function getText(stackItem) {
    if (!(stackItem instanceof BlockStackItem || stackItem instanceof ListItemStackItem || stackItem instanceof TableCellStackItem)) {
        throw new Error('Only blocks, list items and table cells can be requested for text contents.');
    }
    return stackItem.inlineTextBuilder.isEmpty() ? stackItem.rawText : stackItem.rawText + stackItem.inlineTextBuilder.toString();
}
function addText(stackItem, text, leadingLineBreaks, trailingLineBreaks) {
    if (!(stackItem instanceof BlockStackItem || stackItem instanceof ListItemStackItem || stackItem instanceof TableCellStackItem)) {
        throw new Error('Only blocks, list items and table cells can contain text.');
    }
    const parentText = getText(stackItem);
    const lineBreaks = Math.max(stackItem.stashedLineBreaks, leadingLineBreaks);
    stackItem.inlineTextBuilder.clear();
    if (parentText) {
        stackItem.rawText = parentText + '\n'.repeat(lineBreaks) + text;
    } else {
        stackItem.rawText = text;
        stackItem.leadingLineBreaks = lineBreaks;
    }
    stackItem.stashedLineBreaks = trailingLineBreaks;
}
/**
 * @param { string } str A string to transform.
 * @param { TransformerStackItem } transformer A transformer item (with possible continuation).
 * @returns { string }
 */ function applyTransformer(str, transformer) {
    return transformer ? applyTransformer(transformer.transform(str), transformer.next) : str;
}
/**
 * Compile selectors into a decision tree,
 * return a function intended for batch processing.
 *
 * @param   { Options } [options = {}]   HtmlToText options (defaults, formatters, user options merged, deduplicated).
 * @returns { (html: string, metadata?: any) => string } Pre-configured converter function.
 * @static
 */ function compile$1(options = {}) {
    const selectorsWithoutFormat = options.selectors.filter((s)=>!s.format);
    if (selectorsWithoutFormat.length) {
        throw new Error('Following selectors have no specified format: ' + selectorsWithoutFormat.map((s)=>`\`${s.selector}\``).join(', '));
    }
    const picker = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$selderee$2f$lib$2f$selderee$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DecisionTree"](options.selectors.map((s)=>[
            s.selector,
            s
        ])).build(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$selderee$2f$plugin$2d$htmlparser2$2f$lib$2f$hp2$2d$builder$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hp2Builder"]);
    if (typeof options.encodeCharacters !== 'function') {
        options.encodeCharacters = makeReplacerFromDict(options.encodeCharacters);
    }
    const baseSelectorsPicker = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$selderee$2f$lib$2f$selderee$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DecisionTree"](options.baseElements.selectors.map((s, i)=>[
            s,
            i + 1
        ])).build(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$selderee$2f$plugin$2d$htmlparser2$2f$lib$2f$hp2$2d$builder$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hp2Builder"]);
    function findBaseElements(dom) {
        return findBases(dom, options, baseSelectorsPicker);
    }
    const limitedWalk = limitedDepthRecursive(options.limits.maxDepth, recursiveWalk, function(dom, builder) {
        builder.addInline(options.limits.ellipsis || '');
    });
    return function(html, metadata = undefined) {
        return process(html, metadata, options, picker, findBaseElements, limitedWalk);
    };
}
/**
 * Convert given HTML according to preprocessed options.
 *
 * @param { string } html HTML content to convert.
 * @param { any } metadata Optional metadata for HTML document, for use in formatters.
 * @param { Options } options HtmlToText options (preprocessed).
 * @param { import('selderee').Picker<DomNode, TagDefinition> } picker
 * Tag definition picker for DOM nodes processing.
 * @param { (dom: DomNode[]) => DomNode[] } findBaseElements
 * Function to extract elements from HTML DOM
 * that will only be present in the output text.
 * @param { RecursiveCallback } walk Recursive callback.
 * @returns { string }
 */ function process(html, metadata, options, picker, findBaseElements, walk) {
    const maxInputLength = options.limits.maxInputLength;
    if (maxInputLength && html && html.length > maxInputLength) {
        console.warn(`Input length ${html.length} is above allowed limit of ${maxInputLength}. Truncating without ellipsis.`);
        html = html.substring(0, maxInputLength);
    }
    const document = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$htmlparser2$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parseDocument"])(html, {
        decodeEntities: options.decodeEntities
    });
    const bases = findBaseElements(document.children);
    const builder = new BlockTextBuilder(options, picker, metadata);
    walk(bases, builder);
    return builder.toString();
}
function findBases(dom, options, baseSelectorsPicker) {
    const results = [];
    function recursiveWalk(walk, /** @type { DomNode[] } */ dom) {
        dom = dom.slice(0, options.limits.maxChildNodes);
        for (const elem of dom){
            if (elem.type !== 'tag') {
                continue;
            }
            const pickedSelectorIndex = baseSelectorsPicker.pick1(elem);
            if (pickedSelectorIndex > 0) {
                results.push({
                    selectorIndex: pickedSelectorIndex,
                    element: elem
                });
            } else if (elem.children) {
                walk(elem.children);
            }
            if (results.length >= options.limits.maxBaseElements) {
                return;
            }
        }
    }
    const limitedWalk = limitedDepthRecursive(options.limits.maxDepth, recursiveWalk);
    limitedWalk(dom);
    if (options.baseElements.orderBy !== 'occurrence') {
        results.sort((a, b)=>a.selectorIndex - b.selectorIndex);
    }
    return options.baseElements.returnDomByDefault && results.length === 0 ? dom : results.map((x)=>x.element);
}
/**
 * Function to walk through DOM nodes and accumulate their string representations.
 *
 * @param   { RecursiveCallback } walk    Recursive callback.
 * @param   { DomNode[] }         [dom]   Nodes array to process.
 * @param   { BlockTextBuilder }  builder Passed around to accumulate output text.
 * @private
 */ function recursiveWalk(walk, dom, builder) {
    if (!dom) {
        return;
    }
    const options = builder.options;
    const tooManyChildNodes = dom.length > options.limits.maxChildNodes;
    if (tooManyChildNodes) {
        dom = dom.slice(0, options.limits.maxChildNodes);
        dom.push({
            data: options.limits.ellipsis,
            type: 'text'
        });
    }
    for (const elem of dom){
        switch(elem.type){
            case 'text':
                {
                    builder.addInline(elem.data);
                    break;
                }
            case 'tag':
                {
                    const tagDefinition = builder.picker.pick1(elem);
                    const format = options.formatters[tagDefinition.format];
                    format(elem, walk, builder, tagDefinition.options || {});
                    break;
                }
        }
    }
    return;
}
/**
 * @param { Object<string,string | false> } dict
 * A dictionary where keys are characters to replace
 * and values are replacement strings.
 *
 * First code point from dict keys is used.
 * Compound emojis with ZWJ are not supported (not until Node 16).
 *
 * @returns { ((str: string) => string) | undefined }
 */ function makeReplacerFromDict(dict) {
    if (!dict || Object.keys(dict).length === 0) {
        return undefined;
    }
    /** @type { [string, string][] } */ const entries = Object.entries(dict).filter(([, v])=>v !== false);
    const regex = new RegExp(entries.map(([c])=>`(${unicodeEscape([
            ...c
        ][0])})`).join('|'), 'g');
    const values = entries.map(([, v])=>v);
    const replacer = (m, ...cgs)=>values[cgs.findIndex((cg)=>cg)];
    return (str)=>str.replace(regex, replacer);
}
/**
 * Dummy formatter that discards the input and does nothing.
 *
 * @type { FormatCallback }
 */ function formatSkip(elem, walk, builder, formatOptions) {
/* do nothing */ }
/**
 * Insert the given string literal inline instead of a tag.
 *
 * @type { FormatCallback }
 */ function formatInlineString(elem, walk, builder, formatOptions) {
    builder.addLiteral(formatOptions.string || '');
}
/**
 * Insert a block with the given string literal instead of a tag.
 *
 * @type { FormatCallback }
 */ function formatBlockString(elem, walk, builder, formatOptions) {
    builder.openBlock({
        leadingLineBreaks: formatOptions.leadingLineBreaks || 2
    });
    builder.addLiteral(formatOptions.string || '');
    builder.closeBlock({
        trailingLineBreaks: formatOptions.trailingLineBreaks || 2
    });
}
/**
 * Process an inline-level element.
 *
 * @type { FormatCallback }
 */ function formatInline(elem, walk, builder, formatOptions) {
    walk(elem.children, builder);
}
/**
 * Process a block-level container.
 *
 * @type { FormatCallback }
 */ function formatBlock$1(elem, walk, builder, formatOptions) {
    builder.openBlock({
        leadingLineBreaks: formatOptions.leadingLineBreaks || 2
    });
    walk(elem.children, builder);
    builder.closeBlock({
        trailingLineBreaks: formatOptions.trailingLineBreaks || 2
    });
}
function renderOpenTag(elem) {
    const attrs = elem.attribs && elem.attribs.length ? ' ' + Object.entries(elem.attribs).map(([k, v])=>v === '' ? k : `${k}=${v.replace(/"/g, '&quot;')}`).join(' ') : '';
    return `<${elem.name}${attrs}>`;
}
function renderCloseTag(elem) {
    return `</${elem.name}>`;
}
/**
 * Render an element as inline HTML tag, walk through it's children.
 *
 * @type { FormatCallback }
 */ function formatInlineTag(elem, walk, builder, formatOptions) {
    builder.startNoWrap();
    builder.addLiteral(renderOpenTag(elem));
    builder.stopNoWrap();
    walk(elem.children, builder);
    builder.startNoWrap();
    builder.addLiteral(renderCloseTag(elem));
    builder.stopNoWrap();
}
/**
 * Render an element as HTML block bag, walk through it's children.
 *
 * @type { FormatCallback }
 */ function formatBlockTag(elem, walk, builder, formatOptions) {
    builder.openBlock({
        leadingLineBreaks: formatOptions.leadingLineBreaks || 2
    });
    builder.startNoWrap();
    builder.addLiteral(renderOpenTag(elem));
    builder.stopNoWrap();
    walk(elem.children, builder);
    builder.startNoWrap();
    builder.addLiteral(renderCloseTag(elem));
    builder.stopNoWrap();
    builder.closeBlock({
        trailingLineBreaks: formatOptions.trailingLineBreaks || 2
    });
}
/**
 * Render an element with all it's children as inline HTML.
 *
 * @type { FormatCallback }
 */ function formatInlineHtml(elem, walk, builder, formatOptions) {
    builder.startNoWrap();
    builder.addLiteral((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$dom$2d$serializer$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["render"])(elem, {
        decodeEntities: builder.options.decodeEntities
    }));
    builder.stopNoWrap();
}
/**
 * Render an element with all it's children as HTML block.
 *
 * @type { FormatCallback }
 */ function formatBlockHtml(elem, walk, builder, formatOptions) {
    builder.openBlock({
        leadingLineBreaks: formatOptions.leadingLineBreaks || 2
    });
    builder.startNoWrap();
    builder.addLiteral((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$dom$2d$serializer$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["render"])(elem, {
        decodeEntities: builder.options.decodeEntities
    }));
    builder.stopNoWrap();
    builder.closeBlock({
        trailingLineBreaks: formatOptions.trailingLineBreaks || 2
    });
}
/**
 * Render inline element wrapped with given strings.
 *
 * @type { FormatCallback }
 */ function formatInlineSurround(elem, walk, builder, formatOptions) {
    builder.addLiteral(formatOptions.prefix || '');
    walk(elem.children, builder);
    builder.addLiteral(formatOptions.suffix || '');
}
var genericFormatters = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    block: formatBlock$1,
    blockHtml: formatBlockHtml,
    blockString: formatBlockString,
    blockTag: formatBlockTag,
    inline: formatInline,
    inlineHtml: formatInlineHtml,
    inlineString: formatInlineString,
    inlineSurround: formatInlineSurround,
    inlineTag: formatInlineTag,
    skip: formatSkip
});
function getRow(matrix, j) {
    if (!matrix[j]) {
        matrix[j] = [];
    }
    return matrix[j];
}
function findFirstVacantIndex(row, x = 0) {
    while(row[x]){
        x++;
    }
    return x;
}
function transposeInPlace(matrix, maxSize) {
    for(let i = 0; i < maxSize; i++){
        const rowI = getRow(matrix, i);
        for(let j = 0; j < i; j++){
            const rowJ = getRow(matrix, j);
            if (rowI[j] || rowJ[i]) {
                const temp = rowI[j];
                rowI[j] = rowJ[i];
                rowJ[i] = temp;
            }
        }
    }
}
function putCellIntoLayout(cell, layout, baseRow, baseCol) {
    for(let r = 0; r < cell.rowspan; r++){
        const layoutRow = getRow(layout, baseRow + r);
        for(let c = 0; c < cell.colspan; c++){
            layoutRow[baseCol + c] = cell;
        }
    }
}
function getOrInitOffset(offsets, index) {
    if (offsets[index] === undefined) {
        offsets[index] = index === 0 ? 0 : 1 + getOrInitOffset(offsets, index - 1);
    }
    return offsets[index];
}
function updateOffset(offsets, base, span, value) {
    offsets[base + span] = Math.max(getOrInitOffset(offsets, base + span), getOrInitOffset(offsets, base) + value);
}
/**
 * Render a table into a string.
 * Cells can contain multiline text and span across multiple rows and columns.
 *
 * Modifies cells to add lines array.
 *
 * @param { TablePrinterCell[][] } tableRows Table to render.
 * @param { number } rowSpacing Number of spaces between columns.
 * @param { number } colSpacing Number of empty lines between rows.
 * @returns { string }
 */ function tableToString(tableRows, rowSpacing, colSpacing) {
    const layout = [];
    let colNumber = 0;
    const rowNumber = tableRows.length;
    const rowOffsets = [
        0
    ];
    // Fill the layout table and row offsets row-by-row.
    for(let j = 0; j < rowNumber; j++){
        const layoutRow = getRow(layout, j);
        const cells = tableRows[j];
        let x = 0;
        for(let i = 0; i < cells.length; i++){
            const cell = cells[i];
            x = findFirstVacantIndex(layoutRow, x);
            putCellIntoLayout(cell, layout, j, x);
            x += cell.colspan;
            cell.lines = cell.text.split('\n');
            const cellHeight = cell.lines.length;
            updateOffset(rowOffsets, j, cell.rowspan, cellHeight + rowSpacing);
        }
        colNumber = layoutRow.length > colNumber ? layoutRow.length : colNumber;
    }
    transposeInPlace(layout, rowNumber > colNumber ? rowNumber : colNumber);
    const outputLines = [];
    const colOffsets = [
        0
    ];
    // Fill column offsets and output lines column-by-column.
    for(let x = 0; x < colNumber; x++){
        let y = 0;
        let cell;
        const rowsInThisColumn = Math.min(rowNumber, layout[x].length);
        while(y < rowsInThisColumn){
            cell = layout[x][y];
            if (cell) {
                if (!cell.rendered) {
                    let cellWidth = 0;
                    for(let j = 0; j < cell.lines.length; j++){
                        const line = cell.lines[j];
                        const lineOffset = rowOffsets[y] + j;
                        outputLines[lineOffset] = (outputLines[lineOffset] || '').padEnd(colOffsets[x]) + line;
                        cellWidth = line.length > cellWidth ? line.length : cellWidth;
                    }
                    updateOffset(colOffsets, x, cell.colspan, cellWidth + colSpacing);
                    cell.rendered = true;
                }
                y += cell.rowspan;
            } else {
                const lineOffset = rowOffsets[y];
                outputLines[lineOffset] = outputLines[lineOffset] || '';
                y++;
            }
        }
    }
    return outputLines.join('\n');
}
/**
 * Process a line-break.
 *
 * @type { FormatCallback }
 */ function formatLineBreak(elem, walk, builder, formatOptions) {
    builder.addLineBreak();
}
/**
 * Process a `wbr` tag (word break opportunity).
 *
 * @type { FormatCallback }
 */ function formatWbr(elem, walk, builder, formatOptions) {
    builder.addWordBreakOpportunity();
}
/**
 * Process a horizontal line.
 *
 * @type { FormatCallback }
 */ function formatHorizontalLine(elem, walk, builder, formatOptions) {
    builder.openBlock({
        leadingLineBreaks: formatOptions.leadingLineBreaks || 2
    });
    builder.addInline('-'.repeat(formatOptions.length || builder.options.wordwrap || 40));
    builder.closeBlock({
        trailingLineBreaks: formatOptions.trailingLineBreaks || 2
    });
}
/**
 * Process a paragraph.
 *
 * @type { FormatCallback }
 */ function formatParagraph(elem, walk, builder, formatOptions) {
    builder.openBlock({
        leadingLineBreaks: formatOptions.leadingLineBreaks || 2
    });
    walk(elem.children, builder);
    builder.closeBlock({
        trailingLineBreaks: formatOptions.trailingLineBreaks || 2
    });
}
/**
 * Process a preformatted content.
 *
 * @type { FormatCallback }
 */ function formatPre(elem, walk, builder, formatOptions) {
    builder.openBlock({
        isPre: true,
        leadingLineBreaks: formatOptions.leadingLineBreaks || 2
    });
    walk(elem.children, builder);
    builder.closeBlock({
        trailingLineBreaks: formatOptions.trailingLineBreaks || 2
    });
}
/**
 * Process a heading.
 *
 * @type { FormatCallback }
 */ function formatHeading(elem, walk, builder, formatOptions) {
    builder.openBlock({
        leadingLineBreaks: formatOptions.leadingLineBreaks || 2
    });
    if (formatOptions.uppercase !== false) {
        builder.pushWordTransform((str)=>str.toUpperCase());
        walk(elem.children, builder);
        builder.popWordTransform();
    } else {
        walk(elem.children, builder);
    }
    builder.closeBlock({
        trailingLineBreaks: formatOptions.trailingLineBreaks || 2
    });
}
/**
 * Process a blockquote.
 *
 * @type { FormatCallback }
 */ function formatBlockquote(elem, walk, builder, formatOptions) {
    builder.openBlock({
        leadingLineBreaks: formatOptions.leadingLineBreaks || 2,
        reservedLineLength: 2
    });
    walk(elem.children, builder);
    builder.closeBlock({
        trailingLineBreaks: formatOptions.trailingLineBreaks || 2,
        blockTransform: (str)=>(formatOptions.trimEmptyLines !== false ? trimCharacter(str, '\n') : str).split('\n').map((line)=>'> ' + line).join('\n')
    });
}
function withBrackets(str, brackets) {
    if (!brackets) {
        return str;
    }
    const lbr = typeof brackets[0] === 'string' ? brackets[0] : '[';
    const rbr = typeof brackets[1] === 'string' ? brackets[1] : ']';
    return lbr + str + rbr;
}
function pathRewrite(path, rewriter, baseUrl, metadata, elem) {
    const modifiedPath = typeof rewriter === 'function' ? rewriter(path, metadata, elem) : path;
    return modifiedPath[0] === '/' && baseUrl ? trimCharacterEnd(baseUrl, '/') + modifiedPath : modifiedPath;
}
/**
 * Process an image.
 *
 * @type { FormatCallback }
 */ function formatImage(elem, walk, builder, formatOptions) {
    const attribs = elem.attribs || {};
    const alt = attribs.alt ? attribs.alt : '';
    const src = !attribs.src ? '' : pathRewrite(attribs.src, formatOptions.pathRewrite, formatOptions.baseUrl, builder.metadata, elem);
    const text = !src ? alt : !alt ? withBrackets(src, formatOptions.linkBrackets) : alt + ' ' + withBrackets(src, formatOptions.linkBrackets);
    builder.addInline(text, {
        noWordTransform: true
    });
}
// a img baseUrl
// a img pathRewrite
// a img linkBrackets
// a     ignoreHref: false
//            ignoreText ?
// a     noAnchorUrl: true
//            can be replaced with selector
// a     hideLinkHrefIfSameAsText: false
//            how to compare, what to show (text, href, normalized) ?
// a     mailto protocol removed without options
// a     protocols: mailto, tel, ...
//            can be matched with selector?
// anchors, protocols - only if no pathRewrite fn is provided
// normalize-url ?
// a
// a[href^="#"] - format:skip by default
// a[href^="mailto:"] - ?
/**
 * Process an anchor.
 *
 * @type { FormatCallback }
 */ function formatAnchor(elem, walk, builder, formatOptions) {
    function getHref() {
        if (formatOptions.ignoreHref) {
            return '';
        }
        if (!elem.attribs || !elem.attribs.href) {
            return '';
        }
        let href = elem.attribs.href.replace(/^mailto:/, '');
        if (formatOptions.noAnchorUrl && href[0] === '#') {
            return '';
        }
        href = pathRewrite(href, formatOptions.pathRewrite, formatOptions.baseUrl, builder.metadata, elem);
        return href;
    }
    const href = getHref();
    if (!href) {
        walk(elem.children, builder);
    } else {
        let text = '';
        builder.pushWordTransform((str)=>{
            if (str) {
                text += str;
            }
            return str;
        });
        walk(elem.children, builder);
        builder.popWordTransform();
        const hideSameLink = formatOptions.hideLinkHrefIfSameAsText && href === text;
        if (!hideSameLink) {
            builder.addInline(!text ? href : ' ' + withBrackets(href, formatOptions.linkBrackets), {
                noWordTransform: true
            });
        }
    }
}
/**
 * @param { DomNode }           elem               List items with their prefixes.
 * @param { RecursiveCallback } walk               Recursive callback to process child nodes.
 * @param { BlockTextBuilder }  builder            Passed around to accumulate output text.
 * @param { FormatOptions }     formatOptions      Options specific to a formatter.
 * @param { () => string }      nextPrefixCallback Function that returns increasing index each time it is called.
 */ function formatList(elem, walk, builder, formatOptions, nextPrefixCallback) {
    const isNestedList = get(elem, [
        'parent',
        'name'
    ]) === 'li';
    // With Roman numbers, index length is not as straightforward as with Arabic numbers or letters,
    // so the dumb length comparison is the most robust way to get the correct value.
    let maxPrefixLength = 0;
    const listItems = (elem.children || [])// it might be more accurate to check only for html spaces here, but no significant benefit
    .filter((child)=>child.type !== 'text' || !/^\s*$/.test(child.data)).map(function(child) {
        if (child.name !== 'li') {
            return {
                node: child,
                prefix: ''
            };
        }
        const prefix = isNestedList ? nextPrefixCallback().trimStart() : nextPrefixCallback();
        if (prefix.length > maxPrefixLength) {
            maxPrefixLength = prefix.length;
        }
        return {
            node: child,
            prefix: prefix
        };
    });
    if (!listItems.length) {
        return;
    }
    builder.openList({
        interRowLineBreaks: 1,
        leadingLineBreaks: isNestedList ? 1 : formatOptions.leadingLineBreaks || 2,
        maxPrefixLength: maxPrefixLength,
        prefixAlign: 'left'
    });
    for (const { node, prefix } of listItems){
        builder.openListItem({
            prefix: prefix
        });
        walk([
            node
        ], builder);
        builder.closeListItem();
    }
    builder.closeList({
        trailingLineBreaks: isNestedList ? 1 : formatOptions.trailingLineBreaks || 2
    });
}
/**
 * Process an unordered list.
 *
 * @type { FormatCallback }
 */ function formatUnorderedList(elem, walk, builder, formatOptions) {
    const prefix = formatOptions.itemPrefix || ' * ';
    return formatList(elem, walk, builder, formatOptions, ()=>prefix);
}
/**
 * Process an ordered list.
 *
 * @type { FormatCallback }
 */ function formatOrderedList(elem, walk, builder, formatOptions) {
    let nextIndex = Number(elem.attribs.start || '1');
    const indexFunction = getOrderedListIndexFunction(elem.attribs.type);
    const nextPrefixCallback = ()=>' ' + indexFunction(nextIndex++) + '. ';
    return formatList(elem, walk, builder, formatOptions, nextPrefixCallback);
}
/**
 * Return a function that can be used to generate index markers of a specified format.
 *
 * @param   { string } [olType='1'] Marker type.
 * @returns { (i: number) => string }
 */ function getOrderedListIndexFunction(olType = '1') {
    switch(olType){
        case 'a':
            return (i)=>numberToLetterSequence(i, 'a');
        case 'A':
            return (i)=>numberToLetterSequence(i, 'A');
        case 'i':
            return (i)=>numberToRoman(i).toLowerCase();
        case 'I':
            return (i)=>numberToRoman(i);
        case '1':
        default:
            return (i)=>i.toString();
    }
}
/**
 * Given a list of class and ID selectors (prefixed with '.' and '#'),
 * return them as separate lists of names without prefixes.
 *
 * @param { string[] } selectors Class and ID selectors (`[".class", "#id"]` etc).
 * @returns { { classes: string[], ids: string[] } }
 */ function splitClassesAndIds(selectors) {
    const classes = [];
    const ids = [];
    for (const selector of selectors){
        if (selector.startsWith('.')) {
            classes.push(selector.substring(1));
        } else if (selector.startsWith('#')) {
            ids.push(selector.substring(1));
        }
    }
    return {
        classes: classes,
        ids: ids
    };
}
function isDataTable(attr, tables) {
    if (tables === true) {
        return true;
    }
    if (!attr) {
        return false;
    }
    const { classes, ids } = splitClassesAndIds(tables);
    const attrClasses = (attr['class'] || '').split(' ');
    const attrIds = (attr['id'] || '').split(' ');
    return attrClasses.some((x)=>classes.includes(x)) || attrIds.some((x)=>ids.includes(x));
}
/**
 * Process a table (either as a container or as a data table, depending on options).
 *
 * @type { FormatCallback }
 */ function formatTable(elem, walk, builder, formatOptions) {
    return isDataTable(elem.attribs, builder.options.tables) ? formatDataTable(elem, walk, builder, formatOptions) : formatBlock(elem, walk, builder, formatOptions);
}
function formatBlock(elem, walk, builder, formatOptions) {
    builder.openBlock({
        leadingLineBreaks: formatOptions.leadingLineBreaks
    });
    walk(elem.children, builder);
    builder.closeBlock({
        trailingLineBreaks: formatOptions.trailingLineBreaks
    });
}
/**
 * Process a data table.
 *
 * @type { FormatCallback }
 */ function formatDataTable(elem, walk, builder, formatOptions) {
    builder.openTable();
    elem.children.forEach(walkTable);
    builder.closeTable({
        tableToString: (rows)=>tableToString(rows, formatOptions.rowSpacing ?? 0, formatOptions.colSpacing ?? 3),
        leadingLineBreaks: formatOptions.leadingLineBreaks,
        trailingLineBreaks: formatOptions.trailingLineBreaks
    });
    function formatCell(cellNode) {
        const colspan = +get(cellNode, [
            'attribs',
            'colspan'
        ]) || 1;
        const rowspan = +get(cellNode, [
            'attribs',
            'rowspan'
        ]) || 1;
        builder.openTableCell({
            maxColumnWidth: formatOptions.maxColumnWidth
        });
        walk(cellNode.children, builder);
        builder.closeTableCell({
            colspan: colspan,
            rowspan: rowspan
        });
    }
    function walkTable(elem) {
        if (elem.type !== 'tag') {
            return;
        }
        const formatHeaderCell = formatOptions.uppercaseHeaderCells !== false ? (cellNode)=>{
            builder.pushWordTransform((str)=>str.toUpperCase());
            formatCell(cellNode);
            builder.popWordTransform();
        } : formatCell;
        switch(elem.name){
            case 'thead':
            case 'tbody':
            case 'tfoot':
            case 'center':
                elem.children.forEach(walkTable);
                return;
            case 'tr':
                {
                    builder.openTableRow();
                    for (const childOfTr of elem.children){
                        if (childOfTr.type !== 'tag') {
                            continue;
                        }
                        switch(childOfTr.name){
                            case 'th':
                                {
                                    formatHeaderCell(childOfTr);
                                    break;
                                }
                            case 'td':
                                {
                                    formatCell(childOfTr);
                                    break;
                                }
                        }
                    }
                    builder.closeTableRow();
                    break;
                }
        }
    }
}
var textFormatters = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    anchor: formatAnchor,
    blockquote: formatBlockquote,
    dataTable: formatDataTable,
    heading: formatHeading,
    horizontalLine: formatHorizontalLine,
    image: formatImage,
    lineBreak: formatLineBreak,
    orderedList: formatOrderedList,
    paragraph: formatParagraph,
    pre: formatPre,
    table: formatTable,
    unorderedList: formatUnorderedList,
    wbr: formatWbr
});
/**
 * Default options.
 *
 * @constant
 * @type { Options }
 * @default
 * @private
 */ const DEFAULT_OPTIONS = {
    baseElements: {
        selectors: [
            'body'
        ],
        orderBy: 'selectors',
        returnDomByDefault: true
    },
    decodeEntities: true,
    encodeCharacters: {},
    formatters: {},
    limits: {
        ellipsis: '...',
        maxBaseElements: undefined,
        maxChildNodes: undefined,
        maxDepth: undefined,
        maxInputLength: 1 << 24
    },
    longWordSplit: {
        forceWrapOnLimit: false,
        wrapCharacters: []
    },
    preserveNewlines: false,
    selectors: [
        {
            selector: '*',
            format: 'inline'
        },
        {
            selector: 'a',
            format: 'anchor',
            options: {
                baseUrl: null,
                hideLinkHrefIfSameAsText: false,
                ignoreHref: false,
                linkBrackets: [
                    '[',
                    ']'
                ],
                noAnchorUrl: true
            }
        },
        {
            selector: 'article',
            format: 'block',
            options: {
                leadingLineBreaks: 1,
                trailingLineBreaks: 1
            }
        },
        {
            selector: 'aside',
            format: 'block',
            options: {
                leadingLineBreaks: 1,
                trailingLineBreaks: 1
            }
        },
        {
            selector: 'blockquote',
            format: 'blockquote',
            options: {
                leadingLineBreaks: 2,
                trailingLineBreaks: 2,
                trimEmptyLines: true
            }
        },
        {
            selector: 'br',
            format: 'lineBreak'
        },
        {
            selector: 'div',
            format: 'block',
            options: {
                leadingLineBreaks: 1,
                trailingLineBreaks: 1
            }
        },
        {
            selector: 'footer',
            format: 'block',
            options: {
                leadingLineBreaks: 1,
                trailingLineBreaks: 1
            }
        },
        {
            selector: 'form',
            format: 'block',
            options: {
                leadingLineBreaks: 1,
                trailingLineBreaks: 1
            }
        },
        {
            selector: 'h1',
            format: 'heading',
            options: {
                leadingLineBreaks: 3,
                trailingLineBreaks: 2,
                uppercase: true
            }
        },
        {
            selector: 'h2',
            format: 'heading',
            options: {
                leadingLineBreaks: 3,
                trailingLineBreaks: 2,
                uppercase: true
            }
        },
        {
            selector: 'h3',
            format: 'heading',
            options: {
                leadingLineBreaks: 3,
                trailingLineBreaks: 2,
                uppercase: true
            }
        },
        {
            selector: 'h4',
            format: 'heading',
            options: {
                leadingLineBreaks: 2,
                trailingLineBreaks: 2,
                uppercase: true
            }
        },
        {
            selector: 'h5',
            format: 'heading',
            options: {
                leadingLineBreaks: 2,
                trailingLineBreaks: 2,
                uppercase: true
            }
        },
        {
            selector: 'h6',
            format: 'heading',
            options: {
                leadingLineBreaks: 2,
                trailingLineBreaks: 2,
                uppercase: true
            }
        },
        {
            selector: 'header',
            format: 'block',
            options: {
                leadingLineBreaks: 1,
                trailingLineBreaks: 1
            }
        },
        {
            selector: 'hr',
            format: 'horizontalLine',
            options: {
                leadingLineBreaks: 2,
                length: undefined,
                trailingLineBreaks: 2
            }
        },
        {
            selector: 'img',
            format: 'image',
            options: {
                baseUrl: null,
                linkBrackets: [
                    '[',
                    ']'
                ]
            }
        },
        {
            selector: 'main',
            format: 'block',
            options: {
                leadingLineBreaks: 1,
                trailingLineBreaks: 1
            }
        },
        {
            selector: 'nav',
            format: 'block',
            options: {
                leadingLineBreaks: 1,
                trailingLineBreaks: 1
            }
        },
        {
            selector: 'ol',
            format: 'orderedList',
            options: {
                leadingLineBreaks: 2,
                trailingLineBreaks: 2
            }
        },
        {
            selector: 'p',
            format: 'paragraph',
            options: {
                leadingLineBreaks: 2,
                trailingLineBreaks: 2
            }
        },
        {
            selector: 'pre',
            format: 'pre',
            options: {
                leadingLineBreaks: 2,
                trailingLineBreaks: 2
            }
        },
        {
            selector: 'section',
            format: 'block',
            options: {
                leadingLineBreaks: 1,
                trailingLineBreaks: 1
            }
        },
        {
            selector: 'table',
            format: 'table',
            options: {
                colSpacing: 3,
                leadingLineBreaks: 2,
                maxColumnWidth: 60,
                rowSpacing: 0,
                trailingLineBreaks: 2,
                uppercaseHeaderCells: true
            }
        },
        {
            selector: 'ul',
            format: 'unorderedList',
            options: {
                itemPrefix: ' * ',
                leadingLineBreaks: 2,
                trailingLineBreaks: 2
            }
        },
        {
            selector: 'wbr',
            format: 'wbr'
        }
    ],
    tables: [],
    whitespaceCharacters: ' \t\r\n\f\u200b',
    wordwrap: 80
};
const concatMerge = (acc, src, options)=>[
        ...acc,
        ...src
    ];
const overwriteMerge = (acc, src, options)=>[
        ...src
    ];
const selectorsMerge = (acc, src, options)=>acc.some((s)=>typeof s === 'object') ? concatMerge(acc, src) // selectors
     : overwriteMerge(acc, src) // baseElements.selectors
;
/**
 * Preprocess options, compile selectors into a decision tree,
 * return a function intended for batch processing.
 *
 * @param   { Options } [options = {}]   HtmlToText options.
 * @returns { (html: string, metadata?: any) => string } Pre-configured converter function.
 * @static
 */ function compile(options = {}) {
    options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$deepmerge$2f$dist$2f$cjs$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(DEFAULT_OPTIONS, options, {
        arrayMerge: overwriteMerge,
        customMerge: (key)=>key === 'selectors' ? selectorsMerge : undefined
    });
    options.formatters = Object.assign({}, genericFormatters, textFormatters, options.formatters);
    options.selectors = mergeDuplicatesPreferLast(options.selectors, (s)=>s.selector);
    handleDeprecatedOptions(options);
    return compile$1(options);
}
/**
 * Convert given HTML content to plain text string.
 *
 * @param   { string }  html           HTML content to convert.
 * @param   { Options } [options = {}] HtmlToText options.
 * @param   { any }     [metadata]     Optional metadata for HTML document, for use in formatters.
 * @returns { string }                 Plain text string.
 * @static
 *
 * @example
 * const { convert } = require('html-to-text');
 * const text = convert('<h1>Hello World</h1>', {
 *   wordwrap: 130
 * });
 * console.log(text); // HELLO WORLD
 */ function convert(html, options = {}, metadata = undefined) {
    return compile(options)(html, metadata);
}
/**
 * Map previously existing and now deprecated options to the new options layout.
 * This is a subject for cleanup in major releases.
 *
 * @param { Options } options HtmlToText options.
 */ function handleDeprecatedOptions(options) {
    if (options.tags) {
        const tagDefinitions = Object.entries(options.tags).map(([selector, definition])=>({
                ...definition,
                selector: selector || '*'
            }));
        options.selectors.push(...tagDefinitions);
        options.selectors = mergeDuplicatesPreferLast(options.selectors, (s)=>s.selector);
    }
    function set(obj, path, value) {
        const valueKey = path.pop();
        for (const key of path){
            let nested = obj[key];
            if (!nested) {
                nested = {};
                obj[key] = nested;
            }
            obj = nested;
        }
        obj[valueKey] = value;
    }
    if (options['baseElement']) {
        const baseElement = options['baseElement'];
        set(options, [
            'baseElements',
            'selectors'
        ], Array.isArray(baseElement) ? baseElement : [
            baseElement
        ]);
    }
    if (options['returnDomByDefault'] !== undefined) {
        set(options, [
            'baseElements',
            'returnDomByDefault'
        ], options['returnDomByDefault']);
    }
    for (const definition of options.selectors){
        if (definition.format === 'anchor' && get(definition, [
            'options',
            'noLinkBrackets'
        ])) {
            set(definition, [
                'options',
                'linkBrackets'
            ], false);
        }
    }
}
;
}),
"[externals]/prettier/plugins/html [external] (prettier/plugins/html, esm_import, [project]/Documents/GitHub/billing-failure-email/node_modules/prettier)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("prettier-fb6ff661bc3eda58/plugins/html");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/prettier/standalone [external] (prettier/standalone, esm_import, [project]/Documents/GitHub/billing-failure-email/node_modules/prettier)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("prettier-fb6ff661bc3eda58/standalone");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/components/node_modules/@react-email/render/dist/node/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "plainTextSelectors",
    ()=>plainTextSelectors,
    "render",
    ()=>render,
    "renderAsync",
    ()=>renderAsync
]);
// src/node/render.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$html$2d$to$2d$text$2f$lib$2f$html$2d$to$2d$text$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/html-to-text/lib/html-to-text.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
// src/shared/utils/pretty.ts
var __TURBOPACK__imported__module__$5b$externals$5d2f$prettier$2f$plugins$2f$html__$5b$external$5d$__$28$prettier$2f$plugins$2f$html$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$prettier$29$__ = __turbopack_context__.i("[externals]/prettier/plugins/html [external] (prettier/plugins/html, esm_import, [project]/Documents/GitHub/billing-failure-email/node_modules/prettier)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$prettier$2f$standalone__$5b$external$5d$__$28$prettier$2f$standalone$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$prettier$29$__ = __turbopack_context__.i("[externals]/prettier/standalone [external] (prettier/standalone, esm_import, [project]/Documents/GitHub/billing-failure-email/node_modules/prettier)");
// src/node/read-stream.ts
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$stream__$5b$external$5d$__$28$node$3a$stream$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:stream [external] (node:stream, cjs)");
// src/node/render.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$prettier$2f$plugins$2f$html__$5b$external$5d$__$28$prettier$2f$plugins$2f$html$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$prettier$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$prettier$2f$standalone__$5b$external$5d$__$28$prettier$2f$standalone$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$prettier$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$prettier$2f$plugins$2f$html__$5b$external$5d$__$28$prettier$2f$plugins$2f$html$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$prettier$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$prettier$2f$standalone__$5b$external$5d$__$28$prettier$2f$standalone$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$prettier$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator)=>{
    return new Promise((resolve, reject)=>{
        var fulfilled = (value)=>{
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        };
        var rejected = (value)=>{
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        };
        var step = (x)=>x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
        step((generator = generator.apply(__this, __arguments)).next());
    });
};
;
;
// src/shared/plain-text-selectors.ts
var plainTextSelectors = [
    {
        selector: "img",
        format: "skip"
    },
    {
        selector: "#__react-email-preview",
        format: "skip"
    },
    {
        selector: "a",
        options: {
            linkBrackets: false
        }
    }
];
;
;
function recursivelyMapDoc(doc, callback) {
    if (Array.isArray(doc)) {
        return doc.map((innerDoc)=>recursivelyMapDoc(innerDoc, callback));
    }
    if (typeof doc === "object") {
        if (doc.type === "group") {
            return __spreadProps(__spreadValues({}, doc), {
                contents: recursivelyMapDoc(doc.contents, callback),
                expandedStates: recursivelyMapDoc(doc.expandedStates, callback)
            });
        }
        if ("contents" in doc) {
            return __spreadProps(__spreadValues({}, doc), {
                contents: recursivelyMapDoc(doc.contents, callback)
            });
        }
        if ("parts" in doc) {
            return __spreadProps(__spreadValues({}, doc), {
                parts: recursivelyMapDoc(doc.parts, callback)
            });
        }
        if (doc.type === "if-break") {
            return __spreadProps(__spreadValues({}, doc), {
                breakContents: recursivelyMapDoc(doc.breakContents, callback),
                flatContents: recursivelyMapDoc(doc.flatContents, callback)
            });
        }
    }
    return callback(doc);
}
var modifiedHtml = __spreadValues({}, __TURBOPACK__imported__module__$5b$externals$5d2f$prettier$2f$plugins$2f$html__$5b$external$5d$__$28$prettier$2f$plugins$2f$html$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$prettier$29$__["default"]);
if (modifiedHtml.printers) {
    const previousPrint = modifiedHtml.printers.html.print;
    modifiedHtml.printers.html.print = (path, options, print, args)=>{
        const node = path.getNode();
        const rawPrintingResult = previousPrint(path, options, print, args);
        if (node.type === "ieConditionalComment") {
            const printingResult = recursivelyMapDoc(rawPrintingResult, (doc)=>{
                if (typeof doc === "object" && doc.type === "line") {
                    return doc.soft ? "" : " ";
                }
                return doc;
            });
            return printingResult;
        }
        return rawPrintingResult;
    };
}
var defaults = {
    endOfLine: "lf",
    tabWidth: 2,
    plugins: [
        modifiedHtml
    ],
    bracketSameLine: true,
    parser: "html"
};
var pretty = (str, options = {})=>{
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$prettier$2f$standalone__$5b$external$5d$__$28$prettier$2f$standalone$2c$__esm_import$2c$__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$prettier$29$__["format"])(str.replaceAll("\0", ""), __spreadValues(__spreadValues({}, defaults), options));
};
;
var decoder = new TextDecoder("utf-8");
var readStream = (stream)=>__async(void 0, null, function*() {
        let result = "";
        if ("pipeTo" in stream) {
            const writableStream = new WritableStream({
                write (chunk) {
                    result += decoder.decode(chunk);
                }
            });
            yield stream.pipeTo(writableStream);
        } else {
            const writable = new __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$stream__$5b$external$5d$__$28$node$3a$stream$2c$__cjs$29$__["Writable"]({
                write (chunk, _encoding, callback) {
                    result += decoder.decode(chunk);
                    callback();
                }
            });
            stream.pipe(writable);
            yield new Promise((resolve, reject)=>{
                writable.on("error", reject);
                writable.on("close", ()=>{
                    resolve();
                });
            });
        }
        return result;
    });
;
var render = (element, options)=>__async(void 0, null, function*() {
        const suspendedElement = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Suspense"], {
            children: element
        });
        const reactDOMServer = yield __turbopack_context__.A("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/compiled/react-dom/server.node.js [app-route] (ecmascript, async loader)");
        let html2;
        if (Object.hasOwn(reactDOMServer, "renderToReadableStream")) {
            html2 = yield readStream((yield reactDOMServer.renderToReadableStream(suspendedElement)));
        } else {
            yield new Promise((resolve, reject)=>{
                const stream = reactDOMServer.renderToPipeableStream(suspendedElement, {
                    onAllReady () {
                        return __async(this, null, function*() {
                            html2 = yield readStream(stream);
                            resolve();
                        });
                    },
                    onError (error) {
                        reject(error);
                    }
                });
            });
        }
        if (options == null ? void 0 : options.plainText) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$html$2d$to$2d$text$2f$lib$2f$html$2d$to$2d$text$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["convert"])(html2, __spreadValues({
                selectors: plainTextSelectors
            }, options.htmlToTextOptions));
        }
        const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
        const document = `${doctype}${html2.replace(/<!DOCTYPE.*?>/, "")}`;
        if (options == null ? void 0 : options.pretty) {
            return pretty(document);
        }
        return document;
    });
// src/node/index.ts
var renderAsync = (element, options)=>{
    return render(element, options);
};
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/components/dist/index.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// src/index.ts
__turbopack_context__.s([]);
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/components/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "Body",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$body$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Body"],
    "Button",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$button$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Button"],
    "CodeBlock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CodeBlock"],
    "CodeInline",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$inline$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CodeInline"],
    "Column",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$column$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Column"],
    "Container",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$container$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Container"],
    "Font",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$font$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Font"],
    "Head",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$head$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Head"],
    "Heading",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$heading$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Heading"],
    "Hr",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$hr$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Hr"],
    "Html",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$html$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Html"],
    "Img",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$img$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Img"],
    "Link",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$link$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Link"],
    "Markdown",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$markdown$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Markdown"],
    "Preview",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$preview$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Preview"],
    "Row",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$row$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Row"],
    "Section",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$section$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Section"],
    "Tailwind",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$tailwind$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Tailwind"],
    "Text",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$text$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"],
    "a11yDark",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["a11yDark"],
    "atomDark",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["atomDark"],
    "baseAteliersulphurpoolLight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["baseAteliersulphurpoolLight"],
    "cb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cb"],
    "coldarkCold",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["coldarkCold"],
    "coldarkDark",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["coldarkDark"],
    "coyWithoutShadows",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["coyWithoutShadows"],
    "darcula",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["darcula"],
    "dracula",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["dracula"],
    "duotoneDark",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["duotoneDark"],
    "duotoneEarth",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["duotoneEarth"],
    "duotoneForest",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["duotoneForest"],
    "duotoneLight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["duotoneLight"],
    "duotoneSea",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["duotoneSea"],
    "duotoneSpace",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["duotoneSpace"],
    "ghcolors",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ghcolors"],
    "gruvboxDark",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["gruvboxDark"],
    "gruvboxLight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["gruvboxLight"],
    "holiTheme",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["holiTheme"],
    "hopscotch",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hopscotch"],
    "laserwave",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["laserwave"],
    "lucario",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["lucario"],
    "materialDark",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["materialDark"],
    "materialLight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["materialLight"],
    "materialOceanic",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["materialOceanic"],
    "nightOwl",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nightOwl"],
    "nord",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nord"],
    "oneDark",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["oneDark"],
    "oneLight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["oneLight"],
    "plainTextSelectors",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$components$2f$node_modules$2f40$react$2d$email$2f$render$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["plainTextSelectors"],
    "pojoaque",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pojoaque"],
    "render",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$components$2f$node_modules$2f40$react$2d$email$2f$render$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["render"],
    "renderAsync",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$components$2f$node_modules$2f40$react$2d$email$2f$render$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["renderAsync"],
    "renderWhiteSpace",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$preview$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["renderWhiteSpace"],
    "shadesOfPurple",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["shadesOfPurple"],
    "solarizedDarkAtom",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["solarizedDarkAtom"],
    "synthwave84",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["synthwave84"],
    "vesper",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vesper"],
    "vs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vs"],
    "vscDarkPlus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vscDarkPlus"],
    "xonokai",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["xonokai"],
    "zTouch",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["zTouch"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$components$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/components/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$body$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/body/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$button$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/button/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$block$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/code-block/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$code$2d$inline$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/code-inline/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$column$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/column/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$container$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/container/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$font$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/font/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$head$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/head/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$heading$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/heading/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$hr$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/hr/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$html$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/html/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$img$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/img/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$link$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/link/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$markdown$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/markdown/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$preview$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/preview/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$components$2f$node_modules$2f40$react$2d$email$2f$render$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/components/node_modules/@react-email/render/dist/node/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$row$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/row/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$section$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/section/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$tailwind$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/tailwind/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$text$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/text/dist/index.mjs [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$components$2f$node_modules$2f40$react$2d$email$2f$render$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f40$react$2d$email$2f$components$2f$node_modules$2f40$react$2d$email$2f$render$2f$dist$2f$node$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/body/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Body",
    ()=>Body
]);
// src/body.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude)=>{
    var target = {};
    for(var prop in source)if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)){
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
};
;
;
var Body = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardRef"]((_a, ref)=>{
    var _b = _a, { children, style } = _b, props = __objRest(_b, [
        "children",
        "style"
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("body", __spreadProps(__spreadValues({}, props), {
        ref,
        style,
        children
    }));
});
Body.displayName = "Body";
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/button/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
// src/button.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
// src/button.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude)=>{
    var target = {};
    for(var prop in source)if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)){
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
};
;
// src/utils/parse-padding.ts
function convertToPx(value) {
    let px = 0;
    if (!value) {
        return px;
    }
    if (typeof value === "number") {
        return value;
    }
    const matches = /^([\d.]+)(px|em|rem|%)$/.exec(value);
    if (matches && matches.length === 3) {
        const numValue = parseFloat(matches[1]);
        const unit = matches[2];
        switch(unit){
            case "px":
                return numValue;
            case "em":
            case "rem":
                px = numValue * 16;
                return px;
            case "%":
                px = numValue / 100 * 600;
                return px;
            default:
                return numValue;
        }
    } else {
        return 0;
    }
}
function parsePadding({ padding = "", paddingTop, paddingRight, paddingBottom, paddingLeft }) {
    let pt = 0;
    let pr = 0;
    let pb = 0;
    let pl = 0;
    if (typeof padding === "number") {
        pt = padding;
        pr = padding;
        pb = padding;
        pl = padding;
    } else {
        const values = padding.split(/\s+/);
        switch(values.length){
            case 1:
                pt = convertToPx(values[0]);
                pr = convertToPx(values[0]);
                pb = convertToPx(values[0]);
                pl = convertToPx(values[0]);
                break;
            case 2:
                pt = convertToPx(values[0]);
                pb = convertToPx(values[0]);
                pr = convertToPx(values[1]);
                pl = convertToPx(values[1]);
                break;
            case 3:
                pt = convertToPx(values[0]);
                pr = convertToPx(values[1]);
                pl = convertToPx(values[1]);
                pb = convertToPx(values[2]);
                break;
            case 4:
                pt = convertToPx(values[0]);
                pr = convertToPx(values[1]);
                pb = convertToPx(values[2]);
                pl = convertToPx(values[3]);
                break;
            default:
                break;
        }
    }
    return {
        pt: paddingTop ? convertToPx(paddingTop) : pt,
        pr: paddingRight ? convertToPx(paddingRight) : pr,
        pb: paddingBottom ? convertToPx(paddingBottom) : pb,
        pl: paddingLeft ? convertToPx(paddingLeft) : pl
    };
}
// src/utils/px-to-pt.ts
var pxToPt = (px)=>typeof px === "number" && !isNaN(Number(px)) ? px * 3 / 4 : null;
;
var maxFontWidth = 5;
function computeFontWidthAndSpaceCount(expectedWidth) {
    if (expectedWidth === 0) return [
        0,
        0
    ];
    let smallestSpaceCount = 0;
    const computeRequiredFontWidth = ()=>{
        if (smallestSpaceCount > 0) {
            return expectedWidth / smallestSpaceCount / 2;
        }
        return Infinity;
    };
    while(computeRequiredFontWidth() > maxFontWidth){
        smallestSpaceCount++;
    }
    return [
        computeRequiredFontWidth(),
        smallestSpaceCount
    ];
}
var Button = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardRef"]((_a, ref)=>{
    var _b = _a, { children, style, target = "_blank" } = _b, props = __objRest(_b, [
        "children",
        "style",
        "target"
    ]);
    var _a2, _b2, _c, _d;
    const { pt, pr, pb, pl } = parsePadding({
        padding: style == null ? void 0 : style.padding,
        paddingLeft: (_a2 = style == null ? void 0 : style.paddingLeft) != null ? _a2 : style == null ? void 0 : style.paddingInline,
        paddingRight: (_b2 = style == null ? void 0 : style.paddingRight) != null ? _b2 : style == null ? void 0 : style.paddingInline,
        paddingTop: (_c = style == null ? void 0 : style.paddingTop) != null ? _c : style == null ? void 0 : style.paddingBlock,
        paddingBottom: (_d = style == null ? void 0 : style.paddingBottom) != null ? _d : style == null ? void 0 : style.paddingBlock
    });
    const y = pt + pb;
    const textRaise = pxToPt(y);
    const [plFontWidth, plSpaceCount] = computeFontWidthAndSpaceCount(pl);
    const [prFontWidth, prSpaceCount] = computeFontWidthAndSpaceCount(pr);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxs"])("a", __spreadProps(__spreadValues({}, props), {
        ref,
        style: buttonStyle(__spreadProps(__spreadValues({}, style), {
            pt,
            pr,
            pb,
            pl
        })),
        target,
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("span", {
                dangerouslySetInnerHTML: {
                    // The `&#8202;` is as close to `1px` of an empty character as we can get, then, we use the `mso-font-width`
                    // to scale it according to what padding the developer wants. `mso-font-width` also does not allow for percentages
                    // >= 500% so we need to add extra spaces accordingly.
                    //
                    // See https://github.com/resend/react-email/issues/1512 for why we do not use letter-spacing instead.
                    __html: `<!--[if mso]><i style="mso-font-width:${plFontWidth * 100}%;mso-text-raise:${textRaise}" hidden>${"&#8202;".repeat(plSpaceCount)}</i><![endif]-->`
                }
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("span", {
                style: buttonTextStyle(pb),
                children
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("span", {
                dangerouslySetInnerHTML: {
                    __html: `<!--[if mso]><i style="mso-font-width:${prFontWidth * 100}%" hidden>${"&#8202;".repeat(prSpaceCount)}&#8203;</i><![endif]-->`
                }
            })
        ]
    }));
});
Button.displayName = "Button";
var buttonStyle = (style)=>{
    const _a = style || {}, { pt, pr, pb, pl } = _a, rest = __objRest(_a, [
        "pt",
        "pr",
        "pb",
        "pl"
    ]);
    return __spreadProps(__spreadValues({
        lineHeight: "100%",
        textDecoration: "none",
        display: "inline-block",
        maxWidth: "100%",
        msoPaddingAlt: "0px"
    }, rest), {
        padding: `${pt}px ${pr}px ${pb}px ${pl}px`
    });
};
var buttonTextStyle = (pb)=>{
    return {
        maxWidth: "100%",
        display: "inline-block",
        lineHeight: "120%",
        msoPaddingAlt: "0px",
        msoTextRaise: pxToPt(pb || 0)
    };
};
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/prismjs/prism.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/* **********************************************
     Begin prism-core.js
********************************************** */ /// <reference lib="WebWorker"/>
var _self = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" // if in browser
 : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self // if in worker
 : {} // if in node js
;
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */ var Prism = function(_self) {
    // Private helper vars
    var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
    var uniqueId = 0;
    // The grammar object for plaintext
    var plainTextGrammar = {};
    var _ = {
        /**
		 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
		 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
		 * additional languages or plugins yourself.
		 *
		 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
		 *
		 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.manual = true;
		 * // add a new <script> to load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */ manual: _self.Prism && _self.Prism.manual,
        /**
		 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
		 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
		 * own worker, you don't want it to do this.
		 *
		 * By setting this value to `true`, Prism will not add its own listeners to the worker.
		 *
		 * You obviously have to change this value before Prism executes. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.disableWorkerMessageHandler = true;
		 * // Load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */ disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
        /**
		 * A namespace for utility methods.
		 *
		 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
		 * change or disappear at any time.
		 *
		 * @namespace
		 * @memberof Prism
		 */ util: {
            encode: function encode(tokens) {
                if (tokens instanceof Token) {
                    return new Token(tokens.type, encode(tokens.content), tokens.alias);
                } else if (Array.isArray(tokens)) {
                    return tokens.map(encode);
                } else {
                    return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
                }
            },
            /**
			 * Returns the name of the type of the given value.
			 *
			 * @param {any} o
			 * @returns {string}
			 * @example
			 * type(null)      === 'Null'
			 * type(undefined) === 'Undefined'
			 * type(123)       === 'Number'
			 * type('foo')     === 'String'
			 * type(true)      === 'Boolean'
			 * type([1, 2])    === 'Array'
			 * type({})        === 'Object'
			 * type(String)    === 'Function'
			 * type(/abc+/)    === 'RegExp'
			 */ type: function(o) {
                return Object.prototype.toString.call(o).slice(8, -1);
            },
            /**
			 * Returns a unique number for the given object. Later calls will still return the same number.
			 *
			 * @param {Object} obj
			 * @returns {number}
			 */ objId: function(obj) {
                if (!obj['__id']) {
                    Object.defineProperty(obj, '__id', {
                        value: ++uniqueId
                    });
                }
                return obj['__id'];
            },
            /**
			 * Creates a deep clone of the given object.
			 *
			 * The main intended use of this function is to clone language definitions.
			 *
			 * @param {T} o
			 * @param {Record<number, any>} [visited]
			 * @returns {T}
			 * @template T
			 */ clone: function deepClone(o, visited) {
                visited = visited || {};
                var clone;
                var id;
                switch(_.util.type(o)){
                    case 'Object':
                        id = _.util.objId(o);
                        if (visited[id]) {
                            return visited[id];
                        }
                        clone = {};
                        visited[id] = clone;
                        for(var key in o){
                            if (o.hasOwnProperty(key)) {
                                clone[key] = deepClone(o[key], visited);
                            }
                        }
                        return clone;
                    case 'Array':
                        id = _.util.objId(o);
                        if (visited[id]) {
                            return visited[id];
                        }
                        clone = [];
                        visited[id] = clone;
                        o.forEach(function(v, i) {
                            clone[i] = deepClone(v, visited);
                        });
                        return clone;
                    default:
                        return o;
                }
            },
            /**
			 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
			 *
			 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
			 *
			 * @param {Element} element
			 * @returns {string}
			 */ getLanguage: function(element) {
                while(element){
                    var m = lang.exec(element.className);
                    if (m) {
                        return m[1].toLowerCase();
                    }
                    element = element.parentElement;
                }
                return 'none';
            },
            /**
			 * Sets the Prism `language-xxxx` class of the given element.
			 *
			 * @param {Element} element
			 * @param {string} language
			 * @returns {void}
			 */ setLanguage: function(element, language) {
                // remove all `language-xxxx` classes
                // (this might leave behind a leading space)
                element.className = element.className.replace(RegExp(lang, 'gi'), '');
                // add the new `language-xxxx` class
                // (using `classList` will automatically clean up spaces for us)
                element.classList.add('language-' + language);
            },
            /**
			 * Returns the script element that is currently executing.
			 *
			 * This does __not__ work for line script element.
			 *
			 * @returns {HTMLScriptElement | null}
			 */ currentScript: function() {
                if (typeof document === 'undefined') {
                    return null;
                }
                if (document.currentScript && document.currentScript.tagName === 'SCRIPT' && 1 < 2 /* hack to trip TS' flow analysis */ ) {
                    return document.currentScript;
                }
                // IE11 workaround
                // we'll get the src of the current script by parsing IE11's error stack trace
                // this will not work for inline scripts
                try {
                    throw new Error();
                } catch (err) {
                    // Get file src url from stack. Specifically works with the format of stack traces in IE.
                    // A stack will look like this:
                    //
                    // Error
                    //    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
                    //    at Global code (http://localhost/components/prism-core.js:606:1)
                    var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
                    if (src) {
                        var scripts = document.getElementsByTagName('script');
                        for(var i in scripts){
                            if (scripts[i].src == src) {
                                return scripts[i];
                            }
                        }
                    }
                    return null;
                }
            },
            /**
			 * Returns whether a given class is active for `element`.
			 *
			 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
			 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
			 * given class is just the given class with a `no-` prefix.
			 *
			 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
			 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
			 * ancestors have the given class or the negated version of it, then the default activation will be returned.
			 *
			 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
			 * version of it, the class is considered active.
			 *
			 * @param {Element} element
			 * @param {string} className
			 * @param {boolean} [defaultActivation=false]
			 * @returns {boolean}
			 */ isActive: function(element, className, defaultActivation) {
                var no = 'no-' + className;
                while(element){
                    var classList = element.classList;
                    if (classList.contains(className)) {
                        return true;
                    }
                    if (classList.contains(no)) {
                        return false;
                    }
                    element = element.parentElement;
                }
                return !!defaultActivation;
            }
        },
        /**
		 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
		 *
		 * @namespace
		 * @memberof Prism
		 * @public
		 */ languages: {
            /**
			 * The grammar for plain, unformatted text.
			 */ plain: plainTextGrammar,
            plaintext: plainTextGrammar,
            text: plainTextGrammar,
            txt: plainTextGrammar,
            /**
			 * Creates a deep copy of the language with the given id and appends the given tokens.
			 *
			 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
			 * will be overwritten at its original position.
			 *
			 * ## Best practices
			 *
			 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
			 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
			 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
			 *
			 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
			 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
			 *
			 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
			 * @param {Grammar} redef The new tokens to append.
			 * @returns {Grammar} The new language created.
			 * @public
			 * @example
			 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
			 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
			 *     // at its original position
			 *     'comment': { ... },
			 *     // CSS doesn't have a 'color' token, so this token will be appended
			 *     'color': /\b(?:red|green|blue)\b/
			 * });
			 */ extend: function(id, redef) {
                var lang = _.util.clone(_.languages[id]);
                for(var key in redef){
                    lang[key] = redef[key];
                }
                return lang;
            },
            /**
			 * Inserts tokens _before_ another token in a language definition or any other grammar.
			 *
			 * ## Usage
			 *
			 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
			 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
			 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
			 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
			 * this:
			 *
			 * ```js
			 * Prism.languages.markup.style = {
			 *     // token
			 * };
			 * ```
			 *
			 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
			 * before existing tokens. For the CSS example above, you would use it like this:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'cdata', {
			 *     'style': {
			 *         // token
			 *     }
			 * });
			 * ```
			 *
			 * ## Special cases
			 *
			 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
			 * will be ignored.
			 *
			 * This behavior can be used to insert tokens after `before`:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'comment', {
			 *     'comment': Prism.languages.markup.comment,
			 *     // tokens after 'comment'
			 * });
			 * ```
			 *
			 * ## Limitations
			 *
			 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
			 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
			 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
			 * deleting properties which is necessary to insert at arbitrary positions.
			 *
			 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
			 * Instead, it will create a new object and replace all references to the target object with the new one. This
			 * can be done without temporarily deleting properties, so the iteration order is well-defined.
			 *
			 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
			 * you hold the target object in a variable, then the value of the variable will not change.
			 *
			 * ```js
			 * var oldMarkup = Prism.languages.markup;
			 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
			 *
			 * assert(oldMarkup !== Prism.languages.markup);
			 * assert(newMarkup === Prism.languages.markup);
			 * ```
			 *
			 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
			 * object to be modified.
			 * @param {string} before The key to insert before.
			 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
			 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
			 * object to be modified.
			 *
			 * Defaults to `Prism.languages`.
			 * @returns {Grammar} The new grammar object.
			 * @public
			 */ insertBefore: function(inside, before, insert, root) {
                root = root || _.languages;
                var grammar = root[inside];
                /** @type {Grammar} */ var ret = {};
                for(var token in grammar){
                    if (grammar.hasOwnProperty(token)) {
                        if (token == before) {
                            for(var newToken in insert){
                                if (insert.hasOwnProperty(newToken)) {
                                    ret[newToken] = insert[newToken];
                                }
                            }
                        }
                        // Do not insert token which also occur in insert. See #1525
                        if (!insert.hasOwnProperty(token)) {
                            ret[token] = grammar[token];
                        }
                    }
                }
                var old = root[inside];
                root[inside] = ret;
                // Update references in other language definitions
                _.languages.DFS(_.languages, function(key, value) {
                    if (value === old && key != inside) {
                        this[key] = ret;
                    }
                });
                return ret;
            },
            // Traverse a language definition with Depth First Search
            DFS: function DFS(o, callback, type, visited) {
                visited = visited || {};
                var objId = _.util.objId;
                for(var i in o){
                    if (o.hasOwnProperty(i)) {
                        callback.call(o, i, o[i], type || i);
                        var property = o[i];
                        var propertyType = _.util.type(property);
                        if (propertyType === 'Object' && !visited[objId(property)]) {
                            visited[objId(property)] = true;
                            DFS(property, callback, null, visited);
                        } else if (propertyType === 'Array' && !visited[objId(property)]) {
                            visited[objId(property)] = true;
                            DFS(property, callback, i, visited);
                        }
                    }
                }
            }
        },
        plugins: {},
        /**
		 * This is the most high-level function in Prism’s API.
		 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
		 * each one of them.
		 *
		 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
		 *
		 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
		 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
		 * @memberof Prism
		 * @public
		 */ highlightAll: function(async, callback) {
            _.highlightAllUnder(document, async, callback);
        },
        /**
		 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
		 * {@link Prism.highlightElement} on each one of them.
		 *
		 * The following hooks will be run:
		 * 1. `before-highlightall`
		 * 2. `before-all-elements-highlight`
		 * 3. All hooks of {@link Prism.highlightElement} for each element.
		 *
		 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
		 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
		 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
		 * @memberof Prism
		 * @public
		 */ highlightAllUnder: function(container, async, callback) {
            var env = {
                callback: callback,
                container: container,
                selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            _.hooks.run('before-highlightall', env);
            env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
            _.hooks.run('before-all-elements-highlight', env);
            for(var i = 0, element; element = env.elements[i++];){
                _.highlightElement(element, async === true, env.callback);
            }
        },
        /**
		 * Highlights the code inside a single element.
		 *
		 * The following hooks will be run:
		 * 1. `before-sanity-check`
		 * 2. `before-highlight`
		 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
		 * 4. `before-insert`
		 * 5. `after-highlight`
		 * 6. `complete`
		 *
		 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
		 * the element's language.
		 *
		 * @param {Element} element The element containing the code.
		 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
		 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
		 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
		 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
		 *
		 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
		 * asynchronous highlighting to work. You can build your own bundle on the
		 * [Download page](https://prismjs.com/download.html).
		 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
		 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
		 * @memberof Prism
		 * @public
		 */ highlightElement: function(element, async, callback) {
            // Find language
            var language = _.util.getLanguage(element);
            var grammar = _.languages[language];
            // Set language on the element, if not present
            _.util.setLanguage(element, language);
            // Set language on the parent, for styling
            var parent = element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === 'pre') {
                _.util.setLanguage(parent, language);
            }
            var code = element.textContent;
            var env = {
                element: element,
                language: language,
                grammar: grammar,
                code: code
            };
            function insertHighlightedCode(highlightedCode) {
                env.highlightedCode = highlightedCode;
                _.hooks.run('before-insert', env);
                env.element.innerHTML = env.highlightedCode;
                _.hooks.run('after-highlight', env);
                _.hooks.run('complete', env);
                callback && callback.call(env.element);
            }
            _.hooks.run('before-sanity-check', env);
            // plugins may change/add the parent/element
            parent = env.element.parentElement;
            if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
                parent.setAttribute('tabindex', '0');
            }
            if (!env.code) {
                _.hooks.run('complete', env);
                callback && callback.call(env.element);
                return;
            }
            _.hooks.run('before-highlight', env);
            if (!env.grammar) {
                insertHighlightedCode(_.util.encode(env.code));
                return;
            }
            if (async && _self.Worker) {
                var worker = new Worker(_.filename);
                worker.onmessage = function(evt) {
                    insertHighlightedCode(evt.data);
                };
                worker.postMessage(JSON.stringify({
                    language: env.language,
                    code: env.code,
                    immediateClose: true
                }));
            } else {
                insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
            }
        },
        /**
		 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
		 * and the language definitions to use, and returns a string with the HTML produced.
		 *
		 * The following hooks will be run:
		 * 1. `before-tokenize`
		 * 2. `after-tokenize`
		 * 3. `wrap`: On each {@link Token}.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @param {string} language The name of the language definition passed to `grammar`.
		 * @returns {string} The highlighted HTML.
		 * @memberof Prism
		 * @public
		 * @example
		 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
		 */ highlight: function(text, grammar, language) {
            var env = {
                code: text,
                grammar: grammar,
                language: language
            };
            _.hooks.run('before-tokenize', env);
            if (!env.grammar) {
                throw new Error('The language "' + env.language + '" has no grammar.');
            }
            env.tokens = _.tokenize(env.code, env.grammar);
            _.hooks.run('after-tokenize', env);
            return Token.stringify(_.util.encode(env.tokens), env.language);
        },
        /**
		 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
		 * and the language definitions to use, and returns an array with the tokenized code.
		 *
		 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
		 *
		 * This method could be useful in other contexts as well, as a very crude parser.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @returns {TokenStream} An array of strings and tokens, a token stream.
		 * @memberof Prism
		 * @public
		 * @example
		 * let code = `var foo = 0;`;
		 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
		 * tokens.forEach(token => {
		 *     if (token instanceof Prism.Token && token.type === 'number') {
		 *         console.log(`Found numeric literal: ${token.content}`);
		 *     }
		 * });
		 */ tokenize: function(text, grammar) {
            var rest = grammar.rest;
            if (rest) {
                for(var token in rest){
                    grammar[token] = rest[token];
                }
                delete grammar.rest;
            }
            var tokenList = new LinkedList();
            addAfter(tokenList, tokenList.head, text);
            matchGrammar(text, tokenList, grammar, tokenList.head, 0);
            return toArray(tokenList);
        },
        /**
		 * @namespace
		 * @memberof Prism
		 * @public
		 */ hooks: {
            all: {},
            /**
			 * Adds the given callback to the list of callbacks for the given hook.
			 *
			 * The callback will be invoked when the hook it is registered for is run.
			 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
			 *
			 * One callback function can be registered to multiple hooks and the same hook multiple times.
			 *
			 * @param {string} name The name of the hook.
			 * @param {HookCallback} callback The callback function which is given environment variables.
			 * @public
			 */ add: function(name, callback) {
                var hooks = _.hooks.all;
                hooks[name] = hooks[name] || [];
                hooks[name].push(callback);
            },
            /**
			 * Runs a hook invoking all registered callbacks with the given environment variables.
			 *
			 * Callbacks will be invoked synchronously and in the order in which they were registered.
			 *
			 * @param {string} name The name of the hook.
			 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
			 * @public
			 */ run: function(name, env) {
                var callbacks = _.hooks.all[name];
                if (!callbacks || !callbacks.length) {
                    return;
                }
                for(var i = 0, callback; callback = callbacks[i++];){
                    callback(env);
                }
            }
        },
        Token: Token
    };
    _self.Prism = _;
    // Typescript note:
    // The following can be used to import the Token type in JSDoc:
    //
    //   @typedef {InstanceType<import("./prism-core")["Token"]>} Token
    /**
	 * Creates a new token.
	 *
	 * @param {string} type See {@link Token#type type}
	 * @param {string | TokenStream} content See {@link Token#content content}
	 * @param {string|string[]} [alias] The alias(es) of the token.
	 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
	 * @class
	 * @global
	 * @public
	 */ function Token(type, content, alias, matchedStr) {
        /**
		 * The type of the token.
		 *
		 * This is usually the key of a pattern in a {@link Grammar}.
		 *
		 * @type {string}
		 * @see GrammarToken
		 * @public
		 */ this.type = type;
        /**
		 * The strings or tokens contained by this token.
		 *
		 * This will be a token stream if the pattern matched also defined an `inside` grammar.
		 *
		 * @type {string | TokenStream}
		 * @public
		 */ this.content = content;
        /**
		 * The alias(es) of the token.
		 *
		 * @type {string|string[]}
		 * @see GrammarToken
		 * @public
		 */ this.alias = alias;
        // Copy of the full string this token was created from
        this.length = (matchedStr || '').length | 0;
    }
    /**
	 * A token stream is an array of strings and {@link Token Token} objects.
	 *
	 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
	 * them.
	 *
	 * 1. No adjacent strings.
	 * 2. No empty strings.
	 *
	 *    The only exception here is the token stream that only contains the empty string and nothing else.
	 *
	 * @typedef {Array<string | Token>} TokenStream
	 * @global
	 * @public
	 */ /**
	 * Converts the given token or token stream to an HTML representation.
	 *
	 * The following hooks will be run:
	 * 1. `wrap`: On each {@link Token}.
	 *
	 * @param {string | Token | TokenStream} o The token or token stream to be converted.
	 * @param {string} language The name of current language.
	 * @returns {string} The HTML representation of the token or token stream.
	 * @memberof Token
	 * @static
	 */ Token.stringify = function stringify(o, language) {
        if (typeof o == 'string') {
            return o;
        }
        if (Array.isArray(o)) {
            var s = '';
            o.forEach(function(e) {
                s += stringify(e, language);
            });
            return s;
        }
        var env = {
            type: o.type,
            content: stringify(o.content, language),
            tag: 'span',
            classes: [
                'token',
                o.type
            ],
            attributes: {},
            language: language
        };
        var aliases = o.alias;
        if (aliases) {
            if (Array.isArray(aliases)) {
                Array.prototype.push.apply(env.classes, aliases);
            } else {
                env.classes.push(aliases);
            }
        }
        _.hooks.run('wrap', env);
        var attributes = '';
        for(var name in env.attributes){
            attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
        }
        return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
    };
    /**
	 * @param {RegExp} pattern
	 * @param {number} pos
	 * @param {string} text
	 * @param {boolean} lookbehind
	 * @returns {RegExpExecArray | null}
	 */ function matchPattern(pattern, pos, text, lookbehind) {
        pattern.lastIndex = pos;
        var match = pattern.exec(text);
        if (match && lookbehind && match[1]) {
            // change the match to remove the text matched by the Prism lookbehind group
            var lookbehindLength = match[1].length;
            match.index += lookbehindLength;
            match[0] = match[0].slice(lookbehindLength);
        }
        return match;
    }
    /**
	 * @param {string} text
	 * @param {LinkedList<string | Token>} tokenList
	 * @param {any} grammar
	 * @param {LinkedListNode<string | Token>} startNode
	 * @param {number} startPos
	 * @param {RematchOptions} [rematch]
	 * @returns {void}
	 * @private
	 *
	 * @typedef RematchOptions
	 * @property {string} cause
	 * @property {number} reach
	 */ function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
        for(var token in grammar){
            if (!grammar.hasOwnProperty(token) || !grammar[token]) {
                continue;
            }
            var patterns = grammar[token];
            patterns = Array.isArray(patterns) ? patterns : [
                patterns
            ];
            for(var j = 0; j < patterns.length; ++j){
                if (rematch && rematch.cause == token + ',' + j) {
                    return;
                }
                var patternObj = patterns[j];
                var inside = patternObj.inside;
                var lookbehind = !!patternObj.lookbehind;
                var greedy = !!patternObj.greedy;
                var alias = patternObj.alias;
                if (greedy && !patternObj.pattern.global) {
                    // Without the global flag, lastIndex won't work
                    var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                    patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
                }
                /** @type {RegExp} */ var pattern = patternObj.pattern || patternObj;
                for(var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next){
                    if (rematch && pos >= rematch.reach) {
                        break;
                    }
                    var str = currentNode.value;
                    if (tokenList.length > text.length) {
                        // Something went terribly wrong, ABORT, ABORT!
                        return;
                    }
                    if (str instanceof Token) {
                        continue;
                    }
                    var removeCount = 1; // this is the to parameter of removeBetween
                    var match;
                    if (greedy) {
                        match = matchPattern(pattern, pos, text, lookbehind);
                        if (!match || match.index >= text.length) {
                            break;
                        }
                        var from = match.index;
                        var to = match.index + match[0].length;
                        var p = pos;
                        // find the node that contains the match
                        p += currentNode.value.length;
                        while(from >= p){
                            currentNode = currentNode.next;
                            p += currentNode.value.length;
                        }
                        // adjust pos (and p)
                        p -= currentNode.value.length;
                        pos = p;
                        // the current node is a Token, then the match starts inside another Token, which is invalid
                        if (currentNode.value instanceof Token) {
                            continue;
                        }
                        // find the last node which is affected by this match
                        for(var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === 'string'); k = k.next){
                            removeCount++;
                            p += k.value.length;
                        }
                        removeCount--;
                        // replace with the new match
                        str = text.slice(pos, p);
                        match.index -= pos;
                    } else {
                        match = matchPattern(pattern, 0, str, lookbehind);
                        if (!match) {
                            continue;
                        }
                    }
                    // eslint-disable-next-line no-redeclare
                    var from = match.index;
                    var matchStr = match[0];
                    var before = str.slice(0, from);
                    var after = str.slice(from + matchStr.length);
                    var reach = pos + str.length;
                    if (rematch && reach > rematch.reach) {
                        rematch.reach = reach;
                    }
                    var removeFrom = currentNode.prev;
                    if (before) {
                        removeFrom = addAfter(tokenList, removeFrom, before);
                        pos += before.length;
                    }
                    removeRange(tokenList, removeFrom, removeCount);
                    var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
                    currentNode = addAfter(tokenList, removeFrom, wrapped);
                    if (after) {
                        addAfter(tokenList, currentNode, after);
                    }
                    if (removeCount > 1) {
                        // at least one Token object was removed, so we have to do some rematching
                        // this can only happen if the current pattern is greedy
                        /** @type {RematchOptions} */ var nestedRematch = {
                            cause: token + ',' + j,
                            reach: reach
                        };
                        matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                        // the reach might have been extended because of the rematching
                        if (rematch && nestedRematch.reach > rematch.reach) {
                            rematch.reach = nestedRematch.reach;
                        }
                    }
                }
            }
        }
    }
    /**
	 * @typedef LinkedListNode
	 * @property {T} value
	 * @property {LinkedListNode<T> | null} prev The previous node.
	 * @property {LinkedListNode<T> | null} next The next node.
	 * @template T
	 * @private
	 */ /**
	 * @template T
	 * @private
	 */ function LinkedList() {
        /** @type {LinkedListNode<T>} */ var head = {
            value: null,
            prev: null,
            next: null
        };
        /** @type {LinkedListNode<T>} */ var tail = {
            value: null,
            prev: head,
            next: null
        };
        head.next = tail;
        /** @type {LinkedListNode<T>} */ this.head = head;
        /** @type {LinkedListNode<T>} */ this.tail = tail;
        this.length = 0;
    }
    /**
	 * Adds a new node with the given value to the list.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {T} value
	 * @returns {LinkedListNode<T>} The added node.
	 * @template T
	 */ function addAfter(list, node, value) {
        // assumes that node != list.tail && values.length >= 0
        var next = node.next;
        var newNode = {
            value: value,
            prev: node,
            next: next
        };
        node.next = newNode;
        next.prev = newNode;
        list.length++;
        return newNode;
    }
    /**
	 * Removes `count` nodes after the given node. The given node will not be removed.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {number} count
	 * @template T
	 */ function removeRange(list, node, count) {
        var next = node.next;
        for(var i = 0; i < count && next !== list.tail; i++){
            next = next.next;
        }
        node.next = next;
        next.prev = node;
        list.length -= i;
    }
    /**
	 * @param {LinkedList<T>} list
	 * @returns {T[]}
	 * @template T
	 */ function toArray(list) {
        var array = [];
        var node = list.head.next;
        while(node !== list.tail){
            array.push(node.value);
            node = node.next;
        }
        return array;
    }
    if (!_self.document) {
        if (!_self.addEventListener) {
            // in Node.js
            return _;
        }
        if (!_.disableWorkerMessageHandler) {
            // In worker
            _self.addEventListener('message', function(evt) {
                var message = JSON.parse(evt.data);
                var lang = message.language;
                var code = message.code;
                var immediateClose = message.immediateClose;
                _self.postMessage(_.highlight(code, _.languages[lang], lang));
                if (immediateClose) {
                    _self.close();
                }
            }, false);
        }
        return _;
    }
    // Get current script and highlight
    var script = _.util.currentScript();
    if (script) {
        _.filename = script.src;
        if (script.hasAttribute('data-manual')) {
            _.manual = true;
        }
    }
    function highlightAutomaticallyCallback() {
        if (!_.manual) {
            _.highlightAll();
        }
    }
    if (!_.manual) {
        // If the document state is "loading", then we'll use DOMContentLoaded.
        // If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
        // DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
        // might take longer one animation frame to execute which can create a race condition where only some plugins have
        // been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
        // See https://github.com/PrismJS/prism/issues/2102
        var readyState = document.readyState;
        if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
            document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
        } else {
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(highlightAutomaticallyCallback);
            } else {
                window.setTimeout(highlightAutomaticallyCallback, 16);
            }
        }
    }
    return _;
}(_self);
if (("TURBOPACK compile-time value", "object") !== 'undefined' && module.exports) {
    module.exports = Prism;
}
// hack for components to work correctly in node.js
if ("TURBOPACK compile-time truthy", 1) {
    /*TURBOPACK member replacement*/ __turbopack_context__.g.Prism = Prism;
}
// some additional documentation/types
/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
 */ /**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */ /**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
 */ /**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */ /* **********************************************
     Begin prism-markup.js
********************************************** */ Prism.languages.markup = {
    'comment': {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: true
    },
    'prolog': {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: true
    },
    'doctype': {
        // https://www.w3.org/TR/xml/#NT-doctypedecl
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: true,
        inside: {
            'internal-subset': {
                pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
                lookbehind: true,
                greedy: true,
                inside: null // see below
            },
            'string': {
                pattern: /"[^"]*"|'[^']*'/,
                greedy: true
            },
            'punctuation': /^<!|>$|[[\]]/,
            'doctype-tag': /^DOCTYPE/i,
            'name': /[^\s<>'"]+/
        }
    },
    'cdata': {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: true
    },
    'tag': {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: true,
        inside: {
            'tag': {
                pattern: /^<\/?[^\s>\/]+/,
                inside: {
                    'punctuation': /^<\/?/,
                    'namespace': /^[^\s>\/:]+:/
                }
            },
            'special-attr': [],
            'attr-value': {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                inside: {
                    'punctuation': [
                        {
                            pattern: /^=/,
                            alias: 'attr-equals'
                        },
                        {
                            pattern: /^(\s*)["']|["']$/,
                            lookbehind: true
                        }
                    ]
                }
            },
            'punctuation': /\/?>/,
            'attr-name': {
                pattern: /[^\s>\/]+/,
                inside: {
                    'namespace': /^[^\s>\/:]+:/
                }
            }
        }
    },
    'entity': [
        {
            pattern: /&[\da-z]{1,8};/i,
            alias: 'named-entity'
        },
        /&#x?[\da-f]{1,8};/i
    ]
};
Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity'];
Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;
// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {
    if (env.type === 'entity') {
        env.attributes['title'] = env.content.replace(/&amp;/, '&');
    }
});
Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
    /**
	 * Adds an inlined language to markup.
	 *
	 * An example of an inlined language is CSS with `<style>` tags.
	 *
	 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addInlined('style', 'css');
	 */ value: function addInlined(tagName, lang) {
        var includedCdataInside = {};
        includedCdataInside['language-' + lang] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: true,
            inside: Prism.languages[lang]
        };
        includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;
        var inside = {
            'included-cdata': {
                pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                inside: includedCdataInside
            }
        };
        inside['language-' + lang] = {
            pattern: /[\s\S]+/,
            inside: Prism.languages[lang]
        };
        var def = {};
        def[tagName] = {
            pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
                return tagName;
            }), 'i'),
            lookbehind: true,
            greedy: true,
            inside: inside
        };
        Prism.languages.insertBefore('markup', 'cdata', def);
    }
});
Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
    /**
	 * Adds an pattern to highlight languages embedded in HTML attributes.
	 *
	 * An example of an inlined language is CSS with `style` attributes.
	 *
	 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addAttribute('style', 'css');
	 */ value: function(attrName, lang) {
        Prism.languages.markup.tag.inside['special-attr'].push({
            pattern: RegExp(/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, 'i'),
            lookbehind: true,
            inside: {
                'attr-name': /^[^\s=]+/,
                'attr-value': {
                    pattern: /=[\s\S]+/,
                    inside: {
                        'value': {
                            pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                            lookbehind: true,
                            alias: [
                                lang,
                                'language-' + lang
                            ],
                            inside: Prism.languages[lang]
                        },
                        'punctuation': [
                            {
                                pattern: /^=/,
                                alias: 'attr-equals'
                            },
                            /"|'/
                        ]
                    }
                }
            }
        });
    }
});
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;
Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;
/* **********************************************
     Begin prism-css.js
********************************************** */ (function(Prism) {
    var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    Prism.languages.css = {
        'comment': /\/\*[\s\S]*?\*\//,
        'atrule': {
            pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
            inside: {
                'rule': /^@[\w-]+/,
                'selector-function-argument': {
                    pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                    lookbehind: true,
                    alias: 'selector'
                },
                'keyword': {
                    pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                    lookbehind: true
                }
            }
        },
        'url': {
            // https://drafts.csswg.org/css-values-3/#urls
            pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
            greedy: true,
            inside: {
                'function': /^url/i,
                'punctuation': /^\(|\)$/,
                'string': {
                    pattern: RegExp('^' + string.source + '$'),
                    alias: 'url'
                }
            }
        },
        'selector': {
            pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
            lookbehind: true
        },
        'string': {
            pattern: string,
            greedy: true
        },
        'property': {
            pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
            lookbehind: true
        },
        'important': /!important\b/i,
        'function': {
            pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
            lookbehind: true
        },
        'punctuation': /[(){};:,]/
    };
    Prism.languages.css['atrule'].inside.rest = Prism.languages.css;
    var markup = Prism.languages.markup;
    if (markup) {
        markup.tag.addInlined('style', 'css');
        markup.tag.addAttribute('style', 'css');
    }
})(Prism);
/* **********************************************
     Begin prism-clike.js
********************************************** */ Prism.languages.clike = {
    'comment': [
        {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true,
            greedy: true
        },
        {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true
        }
    ],
    'string': {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
    },
    'class-name': {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: true,
        inside: {
            'punctuation': /[.\\]/
        }
    },
    'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    'boolean': /\b(?:false|true)\b/,
    'function': /\b\w+(?=\()/,
    'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    'punctuation': /[{}[\];(),.:]/
};
/* **********************************************
     Begin prism-javascript.js
********************************************** */ Prism.languages.javascript = Prism.languages.extend('clike', {
    'class-name': [
        Prism.languages.clike['class-name'],
        {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
            lookbehind: true
        }
    ],
    'keyword': [
        {
            pattern: /((?:^|\})\s*)catch\b/,
            lookbehind: true
        },
        {
            pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
            lookbehind: true
        }
    ],
    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    'number': {
        pattern: RegExp(/(^|[^\w$])/.source + '(?:' + (// constant
        /NaN|Infinity/.source + '|' + // binary integer
        /0[bB][01]+(?:_[01]+)*n?/.source + '|' + // octal integer
        /0[oO][0-7]+(?:_[0-7]+)*n?/.source + '|' + // hexadecimal integer
        /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + '|' + // decimal bigint
        /\d+(?:_\d+)*n/.source + '|' + // decimal number (integer or float) but no bigint
        /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ')' + /(?![\w$])/.source),
        lookbehind: true
    },
    'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});
Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
Prism.languages.insertBefore('javascript', 'keyword', {
    'regex': {
        pattern: RegExp(// lookbehind
        // eslint-disable-next-line regexp/no-dupe-characters-character-class
        /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
        // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
        // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
        // with the only syntax, so we have to define 2 different regex patterns.
        /\//.source + '(?:' + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + '|' + // `v` flag syntax. This supports 3 levels of nested character classes.
        /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ')' + // lookahead
        /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),
        lookbehind: true,
        greedy: true,
        inside: {
            'regex-source': {
                pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                lookbehind: true,
                alias: 'language-regex',
                inside: Prism.languages.regex
            },
            'regex-delimiter': /^\/|\/$/,
            'regex-flags': /^[a-z]+$/
        }
    },
    // This must be declared before keyword because we use "function" inside the look-forward
    'function-variable': {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: 'function'
    },
    'parameter': [
        {
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: true,
            inside: Prism.languages.javascript
        },
        {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: true,
            inside: Prism.languages.javascript
        },
        {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: true,
            inside: Prism.languages.javascript
        },
        {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: true,
            inside: Prism.languages.javascript
        }
    ],
    'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
Prism.languages.insertBefore('javascript', 'string', {
    'hashbang': {
        pattern: /^#!.*/,
        greedy: true,
        alias: 'comment'
    },
    'template-string': {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: true,
        inside: {
            'template-punctuation': {
                pattern: /^`|`$/,
                alias: 'string'
            },
            'interpolation': {
                pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                lookbehind: true,
                inside: {
                    'interpolation-punctuation': {
                        pattern: /^\$\{|\}$/,
                        alias: 'punctuation'
                    },
                    rest: Prism.languages.javascript
                }
            },
            'string': /[\s\S]+/
        }
    },
    'string-property': {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: true,
        greedy: true,
        alias: 'property'
    }
});
Prism.languages.insertBefore('javascript', 'operator', {
    'literal-property': {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: true,
        alias: 'property'
    }
});
if (Prism.languages.markup) {
    Prism.languages.markup.tag.addInlined('script', 'javascript');
    // add attribute support for all DOM events.
    // https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
    Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, 'javascript');
}
Prism.languages.js = Prism.languages.javascript;
/* **********************************************
     Begin prism-file-highlight.js
********************************************** */ (function() {
    if (typeof Prism === 'undefined' || typeof document === 'undefined') {
        return;
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    var LOADING_MESSAGE = 'Loading…';
    var FAILURE_MESSAGE = function(status, message) {
        return '✖ Error ' + status + ' while fetching file: ' + message;
    };
    var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';
    var EXTENSIONS = {
        'js': 'javascript',
        'py': 'python',
        'rb': 'ruby',
        'ps1': 'powershell',
        'psm1': 'powershell',
        'sh': 'bash',
        'bat': 'batch',
        'h': 'c',
        'tex': 'latex'
    };
    var STATUS_ATTR = 'data-src-status';
    var STATUS_LOADING = 'loading';
    var STATUS_LOADED = 'loaded';
    var STATUS_FAILED = 'failed';
    var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])' + ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
    /**
	 * Loads the given file.
	 *
	 * @param {string} src The URL or path of the source file to load.
	 * @param {(result: string) => void} success
	 * @param {(reason: string) => void} error
	 */ function loadFile(src, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', src, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status < 400 && xhr.responseText) {
                    success(xhr.responseText);
                } else {
                    if (xhr.status >= 400) {
                        error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
                    } else {
                        error(FAILURE_EMPTY_MESSAGE);
                    }
                }
            }
        };
        xhr.send(null);
    }
    /**
	 * Parses the given range.
	 *
	 * This returns a range with inclusive ends.
	 *
	 * @param {string | null | undefined} range
	 * @returns {[number, number | undefined] | undefined}
	 */ function parseRange(range) {
        var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '');
        if (m) {
            var start = Number(m[1]);
            var comma = m[2];
            var end = m[3];
            if (!comma) {
                return [
                    start,
                    start
                ];
            }
            if (!end) {
                return [
                    start,
                    undefined
                ];
            }
            return [
                start,
                Number(end)
            ];
        }
        return undefined;
    }
    Prism.hooks.add('before-highlightall', function(env) {
        env.selector += ', ' + SELECTOR;
    });
    Prism.hooks.add('before-sanity-check', function(env) {
        var pre = env.element;
        if (pre.matches(SELECTOR)) {
            env.code = ''; // fast-path the whole thing and go to complete
            pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading
            // add code element with loading message
            var code = pre.appendChild(document.createElement('CODE'));
            code.textContent = LOADING_MESSAGE;
            var src = pre.getAttribute('data-src');
            var language = env.language;
            if (language === 'none') {
                // the language might be 'none' because there is no language set;
                // in this case, we want to use the extension as the language
                var extension = (/\.(\w+)$/.exec(src) || [
                    ,
                    'none'
                ])[1];
                language = EXTENSIONS[extension] || extension;
            }
            // set language classes
            Prism.util.setLanguage(code, language);
            Prism.util.setLanguage(pre, language);
            // preload the language
            var autoloader = Prism.plugins.autoloader;
            if (autoloader) {
                autoloader.loadLanguages(language);
            }
            // load file
            loadFile(src, function(text) {
                // mark as loaded
                pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
                // handle data-range
                var range = parseRange(pre.getAttribute('data-range'));
                if (range) {
                    var lines = text.split(/\r\n?|\n/g);
                    // the range is one-based and inclusive on both ends
                    var start = range[0];
                    var end = range[1] == null ? lines.length : range[1];
                    if (start < 0) {
                        start += lines.length;
                    }
                    start = Math.max(0, Math.min(start - 1, lines.length));
                    if (end < 0) {
                        end += lines.length;
                    }
                    end = Math.max(0, Math.min(end, lines.length));
                    text = lines.slice(start, end).join('\n');
                    // add data-start for line numbers
                    if (!pre.hasAttribute('data-start')) {
                        pre.setAttribute('data-start', String(start + 1));
                    }
                }
                // highlight code
                code.textContent = text;
                Prism.highlightElement(code);
            }, function(error) {
                // mark as failed
                pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
                code.textContent = error;
            });
        }
    });
    Prism.plugins.fileHighlight = {
        /**
		 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
		 *
		 * Note: Elements which are already loaded or currently loading will not be touched by this method.
		 *
		 * @param {ParentNode} [container=document]
		 */ highlight: function highlight(container) {
            var elements = (container || document).querySelectorAll(SELECTOR);
            for(var i = 0, element; element = elements[i++];){
                Prism.highlightElement(element);
            }
        }
    };
    var logged = false;
    /** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */ Prism.fileHighlight = function() {
        if (!logged) {
            console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
            logged = true;
        }
        Prism.plugins.fileHighlight.highlight.apply(this, arguments);
    };
})();
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/code-inline/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CodeInline",
    ()=>CodeInline
]);
// src/code-inline.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude)=>{
    var target = {};
    for(var prop in source)if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)){
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
};
;
;
var CodeInline = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardRef"]((_a, ref)=>{
    var _b = _a, { children } = _b, props = __objRest(_b, [
        "children"
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("style", {
                children: `
        meta ~ .cino {
          display: none !important;
          opacity: 0 !important;
        }

        meta ~ .cio {
          display: block !important;
        }
      `
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("code", __spreadProps(__spreadValues({}, props), {
                className: `${props.className ? props.className : ""} cino`,
                children
            })),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("span", __spreadProps(__spreadValues({}, props), {
                className: `${props.className ? props.className : ""} cio`,
                ref,
                style: __spreadValues({
                    display: "none"
                }, props.style),
                children
            }))
        ]
    });
});
CodeInline.displayName = "CodeInline";
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/column/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Column",
    ()=>Column
]);
// src/column.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude)=>{
    var target = {};
    for(var prop in source)if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)){
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
};
;
;
var Column = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardRef"]((_a, ref)=>{
    var _b = _a, { children, style } = _b, props = __objRest(_b, [
        "children",
        "style"
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("td", __spreadProps(__spreadValues({}, props), {
        "data-id": "__react-email-column",
        ref,
        style,
        children
    }));
});
Column.displayName = "Column";
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/container/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Container",
    ()=>Container
]);
// src/container.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude)=>{
    var target = {};
    for(var prop in source)if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)){
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
};
;
;
var Container = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardRef"]((_a, ref)=>{
    var _b = _a, { children, style } = _b, props = __objRest(_b, [
        "children",
        "style"
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("table", __spreadProps(__spreadValues({
        align: "center",
        width: "100%"
    }, props), {
        border: 0,
        cellPadding: "0",
        cellSpacing: "0",
        ref,
        role: "presentation",
        style: __spreadValues({
            maxWidth: "37.5em"
        }, style),
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("tbody", {
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("tr", {
                style: {
                    width: "100%"
                },
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("td", {
                    children
                })
            })
        })
    }));
});
Container.displayName = "Container";
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/font/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Font",
    ()=>Font
]);
// src/font.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
;
var Font = ({ fontFamily, fallbackFontFamily, webFont, fontStyle = "normal", fontWeight = 400 })=>{
    const src = webFont ? `src: url(${webFont.url}) format('${webFont.format}');` : "";
    const style = `
    @font-face {
      font-family: '${fontFamily}';
      font-style: ${fontStyle};
      font-weight: ${fontWeight};
      mso-font-alt: '${Array.isArray(fallbackFontFamily) ? fallbackFontFamily[0] : fallbackFontFamily}';
      ${src}
    }

    * {
      font-family: '${fontFamily}', ${Array.isArray(fallbackFontFamily) ? fallbackFontFamily.join(", ") : fallbackFontFamily};
    }
  `;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("style", {
        dangerouslySetInnerHTML: {
            __html: style
        }
    });
};
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/head/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Head",
    ()=>Head
]);
// src/head.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude)=>{
    var target = {};
    for(var prop in source)if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)){
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
};
;
;
var Head = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardRef"]((_a, ref)=>{
    var _b = _a, { children } = _b, props = __objRest(_b, [
        "children"
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxs"])("head", __spreadProps(__spreadValues({}, props), {
        ref,
        children: [
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                content: "text/html; charset=UTF-8",
                httpEquiv: "Content-Type"
            }),
            /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("meta", {
                name: "x-apple-disable-message-reformatting"
            }),
            children
        ]
    }));
});
Head.displayName = "Head";
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/heading/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Heading",
    ()=>Heading
]);
// src/heading.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
// src/heading.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude)=>{
    var target = {};
    for(var prop in source)if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)){
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
};
;
// src/utils/spaces.ts
var withMargin = (props)=>{
    const nonEmptyStyles = [
        withSpace(props.m, [
            "margin"
        ]),
        withSpace(props.mx, [
            "marginLeft",
            "marginRight"
        ]),
        withSpace(props.my, [
            "marginTop",
            "marginBottom"
        ]),
        withSpace(props.mt, [
            "marginTop"
        ]),
        withSpace(props.mr, [
            "marginRight"
        ]),
        withSpace(props.mb, [
            "marginBottom"
        ]),
        withSpace(props.ml, [
            "marginLeft"
        ])
    ].filter((s)=>Object.keys(s).length);
    const mergedStyles = nonEmptyStyles.reduce((acc, style)=>{
        return __spreadValues(__spreadValues({}, acc), style);
    }, {});
    return mergedStyles;
};
var withSpace = (value, properties)=>{
    return properties.reduce((styles, property)=>{
        if (!isNaN(parseFloat(value))) {
            return __spreadProps(__spreadValues({}, styles), {
                [property]: `${value}px`
            });
        }
        return styles;
    }, {});
};
;
var Heading = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardRef"]((_a, ref)=>{
    var _b = _a, { as: Tag = "h1", children, style, m, mx, my, mt, mr, mb, ml } = _b, props = __objRest(_b, [
        "as",
        "children",
        "style",
        "m",
        "mx",
        "my",
        "mt",
        "mr",
        "mb",
        "ml"
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])(Tag, __spreadProps(__spreadValues({}, props), {
        ref,
        style: __spreadValues(__spreadValues({}, withMargin({
            m,
            mx,
            my,
            mt,
            mr,
            mb,
            ml
        })), style),
        children
    }));
});
Heading.displayName = "Heading";
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/hr/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hr",
    ()=>Hr
]);
// src/hr.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude)=>{
    var target = {};
    for(var prop in source)if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)){
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
};
;
;
var Hr = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardRef"]((_a, ref)=>{
    var _b = _a, { style } = _b, props = __objRest(_b, [
        "style"
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("hr", __spreadProps(__spreadValues({}, props), {
        ref,
        style: __spreadValues({
            width: "100%",
            border: "none",
            borderTop: "1px solid #eaeaea"
        }, style)
    }));
});
Hr.displayName = "Hr";
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/html/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Html",
    ()=>Html
]);
// src/html.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude)=>{
    var target = {};
    for(var prop in source)if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)){
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
};
;
;
var Html = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardRef"]((_a, ref)=>{
    var _b = _a, { children, lang = "en", dir = "ltr" } = _b, props = __objRest(_b, [
        "children",
        "lang",
        "dir"
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("html", __spreadProps(__spreadValues({}, props), {
        dir,
        lang,
        ref,
        children
    }));
});
Html.displayName = "Html";
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/img/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Img",
    ()=>Img
]);
// src/img.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude)=>{
    var target = {};
    for(var prop in source)if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)){
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
};
;
;
var Img = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardRef"]((_a, ref)=>{
    var _b = _a, { alt, src, width, height, style } = _b, props = __objRest(_b, [
        "alt",
        "src",
        "width",
        "height",
        "style"
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("img", __spreadProps(__spreadValues({}, props), {
        alt,
        height,
        ref,
        src,
        style: __spreadValues({
            display: "block",
            outline: "none",
            border: "none",
            textDecoration: "none"
        }, style),
        width
    }));
});
Img.displayName = "Img";
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/link/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Link",
    ()=>Link
]);
// src/link.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude)=>{
    var target = {};
    for(var prop in source)if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)){
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
};
;
;
var Link = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardRef"]((_a, ref)=>{
    var _b = _a, { target = "_blank", style } = _b, props = __objRest(_b, [
        "target",
        "style"
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("a", __spreadProps(__spreadValues({}, props), {
        ref,
        style: __spreadValues({
            color: "#067df7",
            textDecorationLine: "none"
        }, style),
        target,
        children: props.children
    }));
});
Link.displayName = "Link";
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/marked/lib/marked.esm.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hooks",
    ()=>_Hooks,
    "Lexer",
    ()=>_Lexer,
    "Marked",
    ()=>Marked,
    "Parser",
    ()=>_Parser,
    "Renderer",
    ()=>_Renderer,
    "Slugger",
    ()=>_Slugger,
    "TextRenderer",
    ()=>_TextRenderer,
    "Tokenizer",
    ()=>_Tokenizer,
    "defaults",
    ()=>_defaults,
    "getDefaults",
    ()=>_getDefaults,
    "lexer",
    ()=>lexer,
    "marked",
    ()=>marked,
    "options",
    ()=>options,
    "parse",
    ()=>parse,
    "parseInline",
    ()=>parseInline,
    "parser",
    ()=>parser,
    "setOptions",
    ()=>setOptions,
    "use",
    ()=>use,
    "walkTokens",
    ()=>walkTokens
]);
/**
 * marked v7.0.4 - a markdown parser
 * Copyright (c) 2011-2023, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */ /**
 * DO NOT EDIT THIS FILE
 * The code in this file is generated from files in ./src/
 */ /**
 * Gets the original marked default options.
 */ function _getDefaults() {
    return {
        async: false,
        baseUrl: null,
        breaks: false,
        extensions: null,
        gfm: true,
        headerIds: false,
        headerPrefix: '',
        highlight: null,
        hooks: null,
        langPrefix: 'language-',
        mangle: false,
        pedantic: false,
        renderer: null,
        sanitize: false,
        sanitizer: null,
        silent: false,
        smartypants: false,
        tokenizer: null,
        walkTokens: null,
        xhtml: false
    };
}
let _defaults = _getDefaults();
function changeDefaults(newDefaults) {
    _defaults = newDefaults;
}
/**
 * Helpers
 */ const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, 'g');
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, 'g');
const escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};
const getEscapeReplacement = (ch)=>escapeReplacements[ch];
function escape(html, encode) {
    if (encode) {
        if (escapeTest.test(html)) {
            return html.replace(escapeReplace, getEscapeReplacement);
        }
    } else {
        if (escapeTestNoEncode.test(html)) {
            return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
        }
    }
    return html;
}
const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function unescape(html) {
    // explicitly match decimal, hex, and named HTML entities
    return html.replace(unescapeTest, (_, n)=>{
        n = n.toLowerCase();
        if (n === 'colon') return ':';
        if (n.charAt(0) === '#') {
            return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
        }
        return '';
    });
}
const caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
    regex = typeof regex === 'string' ? regex : regex.source;
    opt = opt || '';
    const obj = {
        replace: (name, val)=>{
            val = typeof val === 'object' && 'source' in val ? val.source : val;
            val = val.replace(caret, '$1');
            regex = regex.replace(name, val);
            return obj;
        },
        getRegex: ()=>{
            return new RegExp(regex, opt);
        }
    };
    return obj;
}
const nonWordAndColonTest = /[^\w:]/g;
const originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function cleanUrl(sanitize, base, href) {
    if (sanitize) {
        let prot;
        try {
            prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, '').toLowerCase();
        } catch (e) {
            return null;
        }
        if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
            return null;
        }
    }
    if (base && !originIndependentUrl.test(href)) {
        href = resolveUrl(base, href);
    }
    try {
        href = encodeURI(href).replace(/%25/g, '%');
    } catch (e) {
        return null;
    }
    return href;
}
const baseUrls = {};
const justDomain = /^[^:]+:\/*[^/]*$/;
const protocol = /^([^:]+:)[\s\S]*$/;
const domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
function resolveUrl(base, href) {
    if (!baseUrls[' ' + base]) {
        // we can ignore everything in base after the last slash of its path component,
        // but we might need to add _that_
        // https://tools.ietf.org/html/rfc3986#section-3
        if (justDomain.test(base)) {
            baseUrls[' ' + base] = base + '/';
        } else {
            baseUrls[' ' + base] = rtrim(base, '/', true);
        }
    }
    base = baseUrls[' ' + base];
    const relativeBase = base.indexOf(':') === -1;
    if (href.substring(0, 2) === '//') {
        if (relativeBase) {
            return href;
        }
        return base.replace(protocol, '$1') + href;
    } else if (href.charAt(0) === '/') {
        if (relativeBase) {
            return href;
        }
        return base.replace(domain, '$1') + href;
    } else {
        return base + href;
    }
}
const noopTest = {
    exec: ()=>null
};
function splitCells(tableRow, count) {
    // ensure that every cell-delimiting pipe has a space
    // before it to distinguish it from an escaped pipe
    const row = tableRow.replace(/\|/g, (match, offset, str)=>{
        let escaped = false;
        let curr = offset;
        while(--curr >= 0 && str[curr] === '\\')escaped = !escaped;
        if (escaped) {
            // odd number of slashes means | is escaped
            // so we leave it alone
            return '|';
        } else {
            // add space before unescaped |
            return ' |';
        }
    }), cells = row.split(/ \|/);
    let i = 0;
    // First/last cell in a row cannot be empty if it has no leading/trailing pipe
    if (!cells[0].trim()) {
        cells.shift();
    }
    if (cells.length > 0 && !cells[cells.length - 1].trim()) {
        cells.pop();
    }
    if (count) {
        if (cells.length > count) {
            cells.splice(count);
        } else {
            while(cells.length < count)cells.push('');
        }
    }
    for(; i < cells.length; i++){
        // leading or trailing whitespace is ignored per the gfm spec
        cells[i] = cells[i].trim().replace(/\\\|/g, '|');
    }
    return cells;
}
/**
 * Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
 * /c*$/ is vulnerable to REDOS.
 *
 * @param str
 * @param c
 * @param invert Remove suffix of non-c chars instead. Default falsey.
 */ function rtrim(str, c, invert) {
    const l = str.length;
    if (l === 0) {
        return '';
    }
    // Length of suffix matching the invert condition.
    let suffLen = 0;
    // Step left until we fail to match the invert condition.
    while(suffLen < l){
        const currChar = str.charAt(l - suffLen - 1);
        if (currChar === c && !invert) {
            suffLen++;
        } else if (currChar !== c && invert) {
            suffLen++;
        } else {
            break;
        }
    }
    return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
        return -1;
    }
    let level = 0;
    for(let i = 0; i < str.length; i++){
        if (str[i] === '\\') {
            i++;
        } else if (str[i] === b[0]) {
            level++;
        } else if (str[i] === b[1]) {
            level--;
            if (level < 0) {
                return i;
            }
        }
    }
    return -1;
}
function checkDeprecations(opt, callback) {
    if (!opt || opt.silent) {
        return;
    }
    if (callback) {
        console.warn('marked(): callback is deprecated since version 5.0.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/using_pro#async');
    }
    if (opt.sanitize || opt.sanitizer) {
        console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
    }
    if (opt.highlight || opt.langPrefix !== 'language-') {
        console.warn('marked(): highlight and langPrefix parameters are deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-highlight.');
    }
    if (opt.mangle) {
        console.warn('marked(): mangle parameter is enabled by default, but is deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install https://www.npmjs.com/package/marked-mangle, or disable by setting `{mangle: false}`.');
    }
    if (opt.baseUrl) {
        console.warn('marked(): baseUrl parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-base-url.');
    }
    if (opt.smartypants) {
        console.warn('marked(): smartypants parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-smartypants.');
    }
    if (opt.xhtml) {
        console.warn('marked(): xhtml parameter is deprecated since version 5.0.0, should not be used and will be removed in the future. Instead use https://www.npmjs.com/package/marked-xhtml.');
    }
    if (opt.headerIds || opt.headerPrefix) {
        console.warn('marked(): headerIds and headerPrefix parameters enabled by default, but are deprecated since version 5.0.0, and will be removed in the future. To clear this warning, install  https://www.npmjs.com/package/marked-gfm-heading-id, or disable by setting `{headerIds: false}`.');
    }
}
function outputLink(cap, link, raw, lexer) {
    const href = link.href;
    const title = link.title ? escape(link.title) : null;
    const text = cap[1].replace(/\\([\[\]])/g, '$1');
    if (cap[0].charAt(0) !== '!') {
        lexer.state.inLink = true;
        const token = {
            type: 'link',
            raw,
            href,
            title,
            text,
            tokens: lexer.inlineTokens(text)
        };
        lexer.state.inLink = false;
        return token;
    }
    return {
        type: 'image',
        raw,
        href,
        title,
        text: escape(text)
    };
}
function indentCodeCompensation(raw, text) {
    const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
    if (matchIndentToCode === null) {
        return text;
    }
    const indentToCode = matchIndentToCode[1];
    return text.split('\n').map((node)=>{
        const matchIndentInNode = node.match(/^\s+/);
        if (matchIndentInNode === null) {
            return node;
        }
        const [indentInNode] = matchIndentInNode;
        if (indentInNode.length >= indentToCode.length) {
            return node.slice(indentToCode.length);
        }
        return node;
    }).join('\n');
}
/**
 * Tokenizer
 */ class _Tokenizer {
    options;
    // TODO: Fix this rules type
    rules;
    lexer;
    constructor(options){
        this.options = options || _defaults;
    }
    space(src) {
        const cap = this.rules.block.newline.exec(src);
        if (cap && cap[0].length > 0) {
            return {
                type: 'space',
                raw: cap[0]
            };
        }
    }
    code(src) {
        const cap = this.rules.block.code.exec(src);
        if (cap) {
            const text = cap[0].replace(/^ {1,4}/gm, '');
            return {
                type: 'code',
                raw: cap[0],
                codeBlockStyle: 'indented',
                text: !this.options.pedantic ? rtrim(text, '\n') : text
            };
        }
    }
    fences(src) {
        const cap = this.rules.block.fences.exec(src);
        if (cap) {
            const raw = cap[0];
            const text = indentCodeCompensation(raw, cap[3] || '');
            return {
                type: 'code',
                raw,
                lang: cap[2] ? cap[2].trim().replace(this.rules.inline._escapes, '$1') : cap[2],
                text
            };
        }
    }
    heading(src) {
        const cap = this.rules.block.heading.exec(src);
        if (cap) {
            let text = cap[2].trim();
            // remove trailing #s
            if (/#$/.test(text)) {
                const trimmed = rtrim(text, '#');
                if (this.options.pedantic) {
                    text = trimmed.trim();
                } else if (!trimmed || / $/.test(trimmed)) {
                    // CommonMark requires space before trailing #s
                    text = trimmed.trim();
                }
            }
            return {
                type: 'heading',
                raw: cap[0],
                depth: cap[1].length,
                text,
                tokens: this.lexer.inline(text)
            };
        }
    }
    hr(src) {
        const cap = this.rules.block.hr.exec(src);
        if (cap) {
            return {
                type: 'hr',
                raw: cap[0]
            };
        }
    }
    blockquote(src) {
        const cap = this.rules.block.blockquote.exec(src);
        if (cap) {
            const text = cap[0].replace(/^ *>[ \t]?/gm, '');
            const top = this.lexer.state.top;
            this.lexer.state.top = true;
            const tokens = this.lexer.blockTokens(text);
            this.lexer.state.top = top;
            return {
                type: 'blockquote',
                raw: cap[0],
                tokens,
                text
            };
        }
    }
    list(src) {
        let cap = this.rules.block.list.exec(src);
        if (cap) {
            let bull = cap[1].trim();
            const isordered = bull.length > 1;
            const list = {
                type: 'list',
                raw: '',
                ordered: isordered,
                start: isordered ? +bull.slice(0, -1) : '',
                loose: false,
                items: []
            };
            bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
            if (this.options.pedantic) {
                bull = isordered ? bull : '[*+-]';
            }
            // Get next list item
            const itemRegex = new RegExp(`^( {0,3}${bull})((?:[\t ][^\\n]*)?(?:\\n|$))`);
            let raw = '';
            let itemContents = '';
            let endsWithBlankLine = false;
            // Check if current bullet point can start a new List Item
            while(src){
                let endEarly = false;
                if (!(cap = itemRegex.exec(src))) {
                    break;
                }
                if (this.rules.block.hr.test(src)) {
                    break;
                }
                raw = cap[0];
                src = src.substring(raw.length);
                let line = cap[2].split('\n', 1)[0].replace(/^\t+/, (t)=>' '.repeat(3 * t.length));
                let nextLine = src.split('\n', 1)[0];
                let indent = 0;
                if (this.options.pedantic) {
                    indent = 2;
                    itemContents = line.trimLeft();
                } else {
                    indent = cap[2].search(/[^ ]/); // Find first non-space char
                    indent = indent > 4 ? 1 : indent; // Treat indented code blocks (> 4 spaces) as having only 1 indent
                    itemContents = line.slice(indent);
                    indent += cap[1].length;
                }
                let blankLine = false;
                if (!line && /^ *$/.test(nextLine)) {
                    raw += nextLine + '\n';
                    src = src.substring(nextLine.length + 1);
                    endEarly = true;
                }
                if (!endEarly) {
                    const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`);
                    const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
                    const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
                    const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
                    // Check if following lines should be included in List Item
                    while(src){
                        const rawLine = src.split('\n', 1)[0];
                        nextLine = rawLine;
                        // Re-align to follow commonmark nesting rules
                        if (this.options.pedantic) {
                            nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, '  ');
                        }
                        // End list item if found code fences
                        if (fencesBeginRegex.test(nextLine)) {
                            break;
                        }
                        // End list item if found start of new heading
                        if (headingBeginRegex.test(nextLine)) {
                            break;
                        }
                        // End list item if found start of new bullet
                        if (nextBulletRegex.test(nextLine)) {
                            break;
                        }
                        // Horizontal rule found
                        if (hrRegex.test(src)) {
                            break;
                        }
                        if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
                            itemContents += '\n' + nextLine.slice(indent);
                        } else {
                            // not enough indentation
                            if (blankLine) {
                                break;
                            }
                            // paragraph continuation unless last line was a different block level element
                            if (line.search(/[^ ]/) >= 4) {
                                break;
                            }
                            if (fencesBeginRegex.test(line)) {
                                break;
                            }
                            if (headingBeginRegex.test(line)) {
                                break;
                            }
                            if (hrRegex.test(line)) {
                                break;
                            }
                            itemContents += '\n' + nextLine;
                        }
                        if (!blankLine && !nextLine.trim()) {
                            blankLine = true;
                        }
                        raw += rawLine + '\n';
                        src = src.substring(rawLine.length + 1);
                        line = nextLine.slice(indent);
                    }
                }
                if (!list.loose) {
                    // If the previous item ended with a blank line, the list is loose
                    if (endsWithBlankLine) {
                        list.loose = true;
                    } else if (/\n *\n *$/.test(raw)) {
                        endsWithBlankLine = true;
                    }
                }
                let istask = null;
                let ischecked;
                // Check for task list items
                if (this.options.gfm) {
                    istask = /^\[[ xX]\] /.exec(itemContents);
                    if (istask) {
                        ischecked = istask[0] !== '[ ] ';
                        itemContents = itemContents.replace(/^\[[ xX]\] +/, '');
                    }
                }
                list.items.push({
                    type: 'list_item',
                    raw,
                    task: !!istask,
                    checked: ischecked,
                    loose: false,
                    text: itemContents,
                    tokens: []
                });
                list.raw += raw;
            }
            // Do not consume newlines at end of final item. Alternatively, make itemRegex *start* with any newlines to simplify/speed up endsWithBlankLine logic
            list.items[list.items.length - 1].raw = raw.trimRight();
            list.items[list.items.length - 1].text = itemContents.trimRight();
            list.raw = list.raw.trimRight();
            // Item child tokens handled here at end because we needed to have the final item to trim it first
            for(let i = 0; i < list.items.length; i++){
                this.lexer.state.top = false;
                list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
                if (!list.loose) {
                    // Check if list should be loose
                    const spacers = list.items[i].tokens.filter((t)=>t.type === 'space');
                    const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t)=>/\n.*\n/.test(t.raw));
                    list.loose = hasMultipleLineBreaks;
                }
            }
            // Set all items to loose if list is loose
            if (list.loose) {
                for(let i = 0; i < list.items.length; i++){
                    list.items[i].loose = true;
                }
            }
            return list;
        }
    }
    html(src) {
        const cap = this.rules.block.html.exec(src);
        if (cap) {
            const token = {
                type: 'html',
                block: true,
                raw: cap[0],
                pre: !this.options.sanitizer && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
                text: cap[0]
            };
            if (this.options.sanitize) {
                const text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]);
                const paragraph = token;
                paragraph.type = 'paragraph';
                paragraph.text = text;
                paragraph.tokens = this.lexer.inline(text);
            }
            return token;
        }
    }
    def(src) {
        const cap = this.rules.block.def.exec(src);
        if (cap) {
            const tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
            const href = cap[2] ? cap[2].replace(/^<(.*)>$/, '$1').replace(this.rules.inline._escapes, '$1') : '';
            const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline._escapes, '$1') : cap[3];
            return {
                type: 'def',
                tag,
                raw: cap[0],
                href,
                title
            };
        }
    }
    table(src) {
        const cap = this.rules.block.table.exec(src);
        if (cap) {
            const item = {
                type: 'table',
                raw: cap[0],
                header: splitCells(cap[1]).map((c)=>{
                    return {
                        text: c,
                        tokens: []
                    };
                }),
                align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, '').split('\n') : []
            };
            if (item.header.length === item.align.length) {
                let l = item.align.length;
                let i, j, k, row;
                for(i = 0; i < l; i++){
                    const align = item.align[i];
                    if (align) {
                        if (/^ *-+: *$/.test(align)) {
                            item.align[i] = 'right';
                        } else if (/^ *:-+: *$/.test(align)) {
                            item.align[i] = 'center';
                        } else if (/^ *:-+ *$/.test(align)) {
                            item.align[i] = 'left';
                        } else {
                            item.align[i] = null;
                        }
                    }
                }
                l = item.rows.length;
                for(i = 0; i < l; i++){
                    item.rows[i] = splitCells(item.rows[i], item.header.length).map((c)=>{
                        return {
                            text: c,
                            tokens: []
                        };
                    });
                }
                // parse child tokens inside headers and cells
                // header child tokens
                l = item.header.length;
                for(j = 0; j < l; j++){
                    item.header[j].tokens = this.lexer.inline(item.header[j].text);
                }
                // cell child tokens
                l = item.rows.length;
                for(j = 0; j < l; j++){
                    row = item.rows[j];
                    for(k = 0; k < row.length; k++){
                        row[k].tokens = this.lexer.inline(row[k].text);
                    }
                }
                return item;
            }
        }
    }
    lheading(src) {
        const cap = this.rules.block.lheading.exec(src);
        if (cap) {
            return {
                type: 'heading',
                raw: cap[0],
                depth: cap[2].charAt(0) === '=' ? 1 : 2,
                text: cap[1],
                tokens: this.lexer.inline(cap[1])
            };
        }
    }
    paragraph(src) {
        const cap = this.rules.block.paragraph.exec(src);
        if (cap) {
            const text = cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1];
            return {
                type: 'paragraph',
                raw: cap[0],
                text,
                tokens: this.lexer.inline(text)
            };
        }
    }
    text(src) {
        const cap = this.rules.block.text.exec(src);
        if (cap) {
            return {
                type: 'text',
                raw: cap[0],
                text: cap[0],
                tokens: this.lexer.inline(cap[0])
            };
        }
    }
    escape(src) {
        const cap = this.rules.inline.escape.exec(src);
        if (cap) {
            return {
                type: 'escape',
                raw: cap[0],
                text: escape(cap[1])
            };
        }
    }
    tag(src) {
        const cap = this.rules.inline.tag.exec(src);
        if (cap) {
            if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
                this.lexer.state.inLink = true;
            } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
                this.lexer.state.inLink = false;
            }
            if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
                this.lexer.state.inRawBlock = true;
            } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
                this.lexer.state.inRawBlock = false;
            }
            return {
                type: this.options.sanitize ? 'text' : 'html',
                raw: cap[0],
                inLink: this.lexer.state.inLink,
                inRawBlock: this.lexer.state.inRawBlock,
                block: false,
                text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0]
            };
        }
    }
    link(src) {
        const cap = this.rules.inline.link.exec(src);
        if (cap) {
            const trimmedUrl = cap[2].trim();
            if (!this.options.pedantic && /^</.test(trimmedUrl)) {
                // commonmark requires matching angle brackets
                if (!/>$/.test(trimmedUrl)) {
                    return;
                }
                // ending angle bracket cannot be escaped
                const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), '\\');
                if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
                    return;
                }
            } else {
                // find closing parenthesis
                const lastParenIndex = findClosingBracket(cap[2], '()');
                if (lastParenIndex > -1) {
                    const start = cap[0].indexOf('!') === 0 ? 5 : 4;
                    const linkLen = start + cap[1].length + lastParenIndex;
                    cap[2] = cap[2].substring(0, lastParenIndex);
                    cap[0] = cap[0].substring(0, linkLen).trim();
                    cap[3] = '';
                }
            }
            let href = cap[2];
            let title = '';
            if (this.options.pedantic) {
                // split pedantic href and title
                const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
                if (link) {
                    href = link[1];
                    title = link[3];
                }
            } else {
                title = cap[3] ? cap[3].slice(1, -1) : '';
            }
            href = href.trim();
            if (/^</.test(href)) {
                if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
                    // pedantic allows starting angle bracket without ending angle bracket
                    href = href.slice(1);
                } else {
                    href = href.slice(1, -1);
                }
            }
            return outputLink(cap, {
                href: href ? href.replace(this.rules.inline._escapes, '$1') : href,
                title: title ? title.replace(this.rules.inline._escapes, '$1') : title
            }, cap[0], this.lexer);
        }
    }
    reflink(src, links) {
        let cap;
        if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
            let link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
            link = links[link.toLowerCase()];
            if (!link) {
                const text = cap[0].charAt(0);
                return {
                    type: 'text',
                    raw: text,
                    text
                };
            }
            return outputLink(cap, link, cap[0], this.lexer);
        }
    }
    emStrong(src, maskedSrc, prevChar = '') {
        let match = this.rules.inline.emStrong.lDelim.exec(src);
        if (!match) return;
        // _ can't be between two alphanumerics. \p{L}\p{N} includes non-english alphabet/numbers as well
        if (match[3] && prevChar.match(/[\p{L}\p{N}]/u)) return;
        const nextChar = match[1] || match[2] || '';
        if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
            // unicode Regex counts emoji as 1 char; spread into array for proper count (used multiple times below)
            const lLength = [
                ...match[0]
            ].length - 1;
            let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
            const endReg = match[0][0] === '*' ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
            endReg.lastIndex = 0;
            // Clip maskedSrc to same section of string as src (move to lexer?)
            maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
            while((match = endReg.exec(maskedSrc)) != null){
                rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
                if (!rDelim) continue; // skip single * in __abc*abc__
                rLength = [
                    ...rDelim
                ].length;
                if (match[3] || match[4]) {
                    delimTotal += rLength;
                    continue;
                } else if (match[5] || match[6]) {
                    if (lLength % 3 && !((lLength + rLength) % 3)) {
                        midDelimTotal += rLength;
                        continue; // CommonMark Emphasis Rules 9-10
                    }
                }
                delimTotal -= rLength;
                if (delimTotal > 0) continue; // Haven't found enough closing delimiters
                // Remove extra characters. *a*** -> *a*
                rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
                const raw = [
                    ...src
                ].slice(0, lLength + match.index + rLength + 1).join('');
                // Create `em` if smallest delimiter has odd char count. *a***
                if (Math.min(lLength, rLength) % 2) {
                    const text = raw.slice(1, -1);
                    return {
                        type: 'em',
                        raw,
                        text,
                        tokens: this.lexer.inlineTokens(text)
                    };
                }
                // Create 'strong' if smallest delimiter has even char count. **a***
                const text = raw.slice(2, -2);
                return {
                    type: 'strong',
                    raw,
                    text,
                    tokens: this.lexer.inlineTokens(text)
                };
            }
        }
    }
    codespan(src) {
        const cap = this.rules.inline.code.exec(src);
        if (cap) {
            let text = cap[2].replace(/\n/g, ' ');
            const hasNonSpaceChars = /[^ ]/.test(text);
            const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
            if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
                text = text.substring(1, text.length - 1);
            }
            text = escape(text, true);
            return {
                type: 'codespan',
                raw: cap[0],
                text
            };
        }
    }
    br(src) {
        const cap = this.rules.inline.br.exec(src);
        if (cap) {
            return {
                type: 'br',
                raw: cap[0]
            };
        }
    }
    del(src) {
        const cap = this.rules.inline.del.exec(src);
        if (cap) {
            return {
                type: 'del',
                raw: cap[0],
                text: cap[2],
                tokens: this.lexer.inlineTokens(cap[2])
            };
        }
    }
    autolink(src, mangle) {
        const cap = this.rules.inline.autolink.exec(src);
        if (cap) {
            let text, href;
            if (cap[2] === '@') {
                text = escape(this.options.mangle ? mangle(cap[1]) : cap[1]);
                href = 'mailto:' + text;
            } else {
                text = escape(cap[1]);
                href = text;
            }
            return {
                type: 'link',
                raw: cap[0],
                text,
                href,
                tokens: [
                    {
                        type: 'text',
                        raw: text,
                        text
                    }
                ]
            };
        }
    }
    url(src, mangle) {
        let cap;
        if (cap = this.rules.inline.url.exec(src)) {
            let text, href;
            if (cap[2] === '@') {
                text = escape(this.options.mangle ? mangle(cap[0]) : cap[0]);
                href = 'mailto:' + text;
            } else {
                // do extended autolink path validation
                let prevCapZero;
                do {
                    prevCapZero = cap[0];
                    cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
                }while (prevCapZero !== cap[0])
                text = escape(cap[0]);
                if (cap[1] === 'www.') {
                    href = 'http://' + cap[0];
                } else {
                    href = cap[0];
                }
            }
            return {
                type: 'link',
                raw: cap[0],
                text,
                href,
                tokens: [
                    {
                        type: 'text',
                        raw: text,
                        text
                    }
                ]
            };
        }
    }
    inlineText(src, smartypants) {
        const cap = this.rules.inline.text.exec(src);
        if (cap) {
            let text;
            if (this.lexer.state.inRawBlock) {
                text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
            } else {
                text = escape(this.options.smartypants ? smartypants(cap[0]) : cap[0]);
            }
            return {
                type: 'text',
                raw: cap[0],
                text
            };
        }
    }
}
/**
 * Block-Level Grammar
 */ // Not all rules are defined in the object literal
// @ts-expect-error
const block = {
    newline: /^(?: *(?:\n|$))+/,
    code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
    fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
    hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
    heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
    blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
    list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
    html: '^ {0,3}(?:' // optional indentation
     + '<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
     + '|comment[^\\n]*(\\n+|$)' // (2)
     + '|<\\?[\\s\\S]*?(?:\\?>\\n*|$)' // (3)
     + '|<![A-Z][\\s\\S]*?(?:>\\n*|$)' // (4)
     + '|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)' // (5)
     + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (6)
     + '|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) open tag
     + '|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) closing tag
     + ')',
    def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
    table: noopTest,
    lheading: /^((?:(?!^bull ).|\n(?!\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    // regex template, placeholders will be replaced according to different paragraph
    // interruption rules of commonmark and the original markdown spec:
    _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
    text: /^[^\n]+/
};
block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def).replace('label', block._label).replace('title', block._title).getRegex();
block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
block.listItemStart = edit(/^( *)(bull) */).replace('bull', block.bullet).getRegex();
block.list = edit(block.list).replace(/bull/g, block.bullet).replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))').replace('def', '\\n+(?=' + block.def.source + ')').getRegex();
block._tag = 'address|article|aside|base|basefont|blockquote|body|caption' + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption' + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe' + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option' + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr' + '|track|ul';
block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
block.html = edit(block.html, 'i').replace('comment', block._comment).replace('tag', block._tag).replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
block.lheading = edit(block.lheading).replace(/bull/g, block.bullet) // lists can interrupt
.getRegex();
block.paragraph = edit(block._paragraph).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
.replace('|table', '').replace('blockquote', ' {0,3}>').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
.replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)').replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
.getRegex();
block.blockquote = edit(block.blockquote).replace('paragraph', block.paragraph).getRegex();
/**
 * Normal Block Grammar
 */ block.normal = {
    ...block
};
/**
 * GFM Block Grammar
 */ block.gfm = {
    ...block.normal,
    table: '^ *([^\\n ].*\\|.*)\\n' // Header
     + ' {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?' // Align
     + '(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)' // Cells
};
block.gfm.table = edit(block.gfm.table).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('blockquote', ' {0,3}>').replace('code', ' {4}[^\\n]').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
.replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)').replace('tag', block._tag) // tables can be interrupted by type (6) html blocks
.getRegex();
block.gfm.paragraph = edit(block._paragraph).replace('hr', block.hr).replace('heading', ' {0,3}#{1,6} ').replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
.replace('table', block.gfm.table) // interrupt paragraphs with table
.replace('blockquote', ' {0,3}>').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
.replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)').replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
.getRegex();
/**
 * Pedantic grammar (original John Gruber's loose markdown specification)
 */ block.pedantic = {
    ...block.normal,
    html: edit('^ *(?:comment *(?:\\n|\\s*$)' + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
     + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))').replace('comment', block._comment).replace(/tag/g, '(?!(?:' + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub' + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)' + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b').getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: noopTest,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: edit(block.normal._paragraph).replace('hr', block.hr).replace('heading', ' *#{1,6} *[^\n]').replace('lheading', block.lheading).replace('blockquote', ' {0,3}>').replace('|fences', '').replace('|list', '').replace('|html', '').getRegex()
};
/**
 * Inline-Level Grammar
 */ // Not all rules are defined in the object literal
// @ts-expect-error
const inline = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: noopTest,
    tag: '^comment' + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
     + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
     + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
     + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
     + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(ref)\]/,
    nolink: /^!?\[(ref)\](?:\[\])?/,
    reflinkSearch: 'reflink|nolink(?!\\()',
    emStrong: {
        lDelim: /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
        //         (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
        //         | Skip orphan inside strong      | Consume to delim | (1) #***              | (2) a***#, a***                    | (3) #***a, ***a                  | (4) ***#                 | (5) #***#                         | (6) a***a
        rDelimAst: /^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,
        rDelimUnd: /^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/ // ^- Not allowed for _
    },
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: noopTest,
    text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
    punctuation: /^((?![*_])[\spunctuation])/
};
// list of unicode punctuation marks, plus any missing characters from CommonMark spec
inline._punctuation = '\\p{P}$+<=>`^|~';
inline.punctuation = edit(inline.punctuation, 'u').replace(/punctuation/g, inline._punctuation).getRegex();
// sequences em should skip over [title](link), `code`, <html>
inline.blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
inline.anyPunctuation = /\\[punct]/g;
inline._escapes = /\\([punct])/g;
inline._comment = edit(block._comment).replace('(?:-->|$)', '-->').getRegex();
inline.emStrong.lDelim = edit(inline.emStrong.lDelim, 'u').replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, 'gu').replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, 'gu').replace(/punct/g, inline._punctuation).getRegex();
inline.anyPunctuation = edit(inline.anyPunctuation, 'gu').replace(/punct/g, inline._punctuation).getRegex();
inline._escapes = edit(inline._escapes, 'gu').replace(/punct/g, inline._punctuation).getRegex();
inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink).replace('scheme', inline._scheme).replace('email', inline._email).getRegex();
inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
inline.tag = edit(inline.tag).replace('comment', inline._comment).replace('attribute', inline._attribute).getRegex();
inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
inline.link = edit(inline.link).replace('label', inline._label).replace('href', inline._href).replace('title', inline._title).getRegex();
inline.reflink = edit(inline.reflink).replace('label', inline._label).replace('ref', block._label).getRegex();
inline.nolink = edit(inline.nolink).replace('ref', block._label).getRegex();
inline.reflinkSearch = edit(inline.reflinkSearch, 'g').replace('reflink', inline.reflink).replace('nolink', inline.nolink).getRegex();
/**
 * Normal Inline Grammar
 */ inline.normal = {
    ...inline
};
/**
 * Pedantic Inline Grammar
 */ inline.pedantic = {
    ...inline.normal,
    strong: {
        start: /^__|\*\*/,
        middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        endAst: /\*\*(?!\*)/g,
        endUnd: /__(?!_)/g
    },
    em: {
        start: /^_|\*/,
        middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
        endAst: /\*(?!\*)/g,
        endUnd: /_(?!_)/g
    },
    link: edit(/^!?\[(label)\]\((.*?)\)/).replace('label', inline._label).getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace('label', inline._label).getRegex()
};
/**
 * GFM Inline Grammar
 */ inline.gfm = {
    ...inline.normal,
    escape: edit(inline.escape).replace('])', '~|])').getRegex(),
    _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};
inline.gfm.url = edit(inline.gfm.url, 'i').replace('email', inline.gfm._extended_email).getRegex();
/**
 * GFM + Line Breaks Inline Grammar
 */ inline.breaks = {
    ...inline.gfm,
    br: edit(inline.br).replace('{2,}', '*').getRegex(),
    text: edit(inline.gfm.text).replace('\\b_', '\\b_| {2,}\\n').replace(/\{2,\}/g, '*').getRegex()
};
/**
 * smartypants text replacement
 */ function smartypants(text) {
    return text// em-dashes
    .replace(/---/g, '\u2014')// en-dashes
    .replace(/--/g, '\u2013')// opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')// closing singles & apostrophes
    .replace(/'/g, '\u2019')// opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')// closing doubles
    .replace(/"/g, '\u201d')// ellipses
    .replace(/\.{3}/g, '\u2026');
}
/**
 * mangle email addresses
 */ function mangle(text) {
    let out = '';
    for(let i = 0; i < text.length; i++){
        const ch = Math.random() > 0.5 ? 'x' + text.charCodeAt(i).toString(16) : text.charCodeAt(i).toString();
        out += '&#' + ch + ';';
    }
    return out;
}
/**
 * Block Lexer
 */ class _Lexer {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;
    constructor(options){
        // TokenList cannot be created in one go
        // @ts-expect-error
        this.tokens = [];
        this.tokens.links = Object.create(null);
        this.options = options || _defaults;
        this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
        this.tokenizer = this.options.tokenizer;
        this.tokenizer.options = this.options;
        this.tokenizer.lexer = this;
        this.inlineQueue = [];
        this.state = {
            inLink: false,
            inRawBlock: false,
            top: true
        };
        const rules = {
            block: block.normal,
            inline: inline.normal
        };
        if (this.options.pedantic) {
            rules.block = block.pedantic;
            rules.inline = inline.pedantic;
        } else if (this.options.gfm) {
            rules.block = block.gfm;
            if (this.options.breaks) {
                rules.inline = inline.breaks;
            } else {
                rules.inline = inline.gfm;
            }
        }
        this.tokenizer.rules = rules;
    }
    /**
     * Expose Rules
     */ static get rules() {
        return {
            block,
            inline
        };
    }
    /**
     * Static Lex Method
     */ static lex(src, options) {
        const lexer = new _Lexer(options);
        return lexer.lex(src);
    }
    /**
     * Static Lex Inline Method
     */ static lexInline(src, options) {
        const lexer = new _Lexer(options);
        return lexer.inlineTokens(src);
    }
    /**
     * Preprocessing
     */ lex(src) {
        src = src.replace(/\r\n|\r/g, '\n');
        this.blockTokens(src, this.tokens);
        let next;
        while(next = this.inlineQueue.shift()){
            this.inlineTokens(next.src, next.tokens);
        }
        return this.tokens;
    }
    blockTokens(src, tokens = []) {
        if (this.options.pedantic) {
            src = src.replace(/\t/g, '    ').replace(/^ +$/gm, '');
        } else {
            src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs)=>{
                return leading + '    '.repeat(tabs.length);
            });
        }
        let token;
        let lastToken;
        let cutSrc;
        let lastParagraphClipped;
        while(src){
            if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer)=>{
                if (token = extTokenizer.call({
                    lexer: this
                }, src, tokens)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    return true;
                }
                return false;
            })) {
                continue;
            }
            // newline
            if (token = this.tokenizer.space(src)) {
                src = src.substring(token.raw.length);
                if (token.raw.length === 1 && tokens.length > 0) {
                    // if there's a single \n as a spacer, it's terminating the last line,
                    // so move it there so that we don't get unecessary paragraph tags
                    tokens[tokens.length - 1].raw += '\n';
                } else {
                    tokens.push(token);
                }
                continue;
            }
            // code
            if (token = this.tokenizer.code(src)) {
                src = src.substring(token.raw.length);
                lastToken = tokens[tokens.length - 1];
                // An indented code block cannot interrupt a paragraph.
                if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text')) {
                    lastToken.raw += '\n' + token.raw;
                    lastToken.text += '\n' + token.text;
                    this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
                } else {
                    tokens.push(token);
                }
                continue;
            }
            // fences
            if (token = this.tokenizer.fences(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // heading
            if (token = this.tokenizer.heading(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // hr
            if (token = this.tokenizer.hr(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // blockquote
            if (token = this.tokenizer.blockquote(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // list
            if (token = this.tokenizer.list(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // html
            if (token = this.tokenizer.html(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // def
            if (token = this.tokenizer.def(src)) {
                src = src.substring(token.raw.length);
                lastToken = tokens[tokens.length - 1];
                if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text')) {
                    lastToken.raw += '\n' + token.raw;
                    lastToken.text += '\n' + token.raw;
                    this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
                } else if (!this.tokens.links[token.tag]) {
                    this.tokens.links[token.tag] = {
                        href: token.href,
                        title: token.title
                    };
                }
                continue;
            }
            // table (gfm)
            if (token = this.tokenizer.table(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // lheading
            if (token = this.tokenizer.lheading(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // top-level paragraph
            // prevent paragraph consuming extensions by clipping 'src' to extension start
            cutSrc = src;
            if (this.options.extensions && this.options.extensions.startBlock) {
                let startIndex = Infinity;
                const tempSrc = src.slice(1);
                let tempStart;
                this.options.extensions.startBlock.forEach((getStartIndex)=>{
                    tempStart = getStartIndex.call({
                        lexer: this
                    }, tempSrc);
                    if (typeof tempStart === 'number' && tempStart >= 0) {
                        startIndex = Math.min(startIndex, tempStart);
                    }
                });
                if (startIndex < Infinity && startIndex >= 0) {
                    cutSrc = src.substring(0, startIndex + 1);
                }
            }
            if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
                lastToken = tokens[tokens.length - 1];
                if (lastParagraphClipped && lastToken.type === 'paragraph') {
                    lastToken.raw += '\n' + token.raw;
                    lastToken.text += '\n' + token.text;
                    this.inlineQueue.pop();
                    this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
                } else {
                    tokens.push(token);
                }
                lastParagraphClipped = cutSrc.length !== src.length;
                src = src.substring(token.raw.length);
                continue;
            }
            // text
            if (token = this.tokenizer.text(src)) {
                src = src.substring(token.raw.length);
                lastToken = tokens[tokens.length - 1];
                if (lastToken && lastToken.type === 'text') {
                    lastToken.raw += '\n' + token.raw;
                    lastToken.text += '\n' + token.text;
                    this.inlineQueue.pop();
                    this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
                } else {
                    tokens.push(token);
                }
                continue;
            }
            if (src) {
                const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
                if (this.options.silent) {
                    console.error(errMsg);
                    break;
                } else {
                    throw new Error(errMsg);
                }
            }
        }
        this.state.top = true;
        return tokens;
    }
    inline(src, tokens = []) {
        this.inlineQueue.push({
            src,
            tokens
        });
        return tokens;
    }
    /**
     * Lexing/Compiling
     */ inlineTokens(src, tokens = []) {
        let token, lastToken, cutSrc;
        // String with links masked to avoid interference with em and strong
        let maskedSrc = src;
        let match;
        let keepPrevChar, prevChar;
        // Mask out reflinks
        if (this.tokens.links) {
            const links = Object.keys(this.tokens.links);
            if (links.length > 0) {
                while((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null){
                    if (links.includes(match[0].slice(match[0].lastIndexOf('[') + 1, -1))) {
                        maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
                    }
                }
            }
        }
        // Mask out other blocks
        while((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null){
            maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        }
        // Mask out escaped characters
        while((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null){
            maskedSrc = maskedSrc.slice(0, match.index) + '++' + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
        }
        while(src){
            if (!keepPrevChar) {
                prevChar = '';
            }
            keepPrevChar = false;
            // extensions
            if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer)=>{
                if (token = extTokenizer.call({
                    lexer: this
                }, src, tokens)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    return true;
                }
                return false;
            })) {
                continue;
            }
            // escape
            if (token = this.tokenizer.escape(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // tag
            if (token = this.tokenizer.tag(src)) {
                src = src.substring(token.raw.length);
                lastToken = tokens[tokens.length - 1];
                if (lastToken && token.type === 'text' && lastToken.type === 'text') {
                    lastToken.raw += token.raw;
                    lastToken.text += token.text;
                } else {
                    tokens.push(token);
                }
                continue;
            }
            // link
            if (token = this.tokenizer.link(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // reflink, nolink
            if (token = this.tokenizer.reflink(src, this.tokens.links)) {
                src = src.substring(token.raw.length);
                lastToken = tokens[tokens.length - 1];
                if (lastToken && token.type === 'text' && lastToken.type === 'text') {
                    lastToken.raw += token.raw;
                    lastToken.text += token.text;
                } else {
                    tokens.push(token);
                }
                continue;
            }
            // em & strong
            if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // code
            if (token = this.tokenizer.codespan(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // br
            if (token = this.tokenizer.br(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // del (gfm)
            if (token = this.tokenizer.del(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // autolink
            if (token = this.tokenizer.autolink(src, mangle)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // url (gfm)
            if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // text
            // prevent inlineText consuming extensions by clipping 'src' to extension start
            cutSrc = src;
            if (this.options.extensions && this.options.extensions.startInline) {
                let startIndex = Infinity;
                const tempSrc = src.slice(1);
                let tempStart;
                this.options.extensions.startInline.forEach((getStartIndex)=>{
                    tempStart = getStartIndex.call({
                        lexer: this
                    }, tempSrc);
                    if (typeof tempStart === 'number' && tempStart >= 0) {
                        startIndex = Math.min(startIndex, tempStart);
                    }
                });
                if (startIndex < Infinity && startIndex >= 0) {
                    cutSrc = src.substring(0, startIndex + 1);
                }
            }
            if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
                src = src.substring(token.raw.length);
                if (token.raw.slice(-1) !== '_') {
                    prevChar = token.raw.slice(-1);
                }
                keepPrevChar = true;
                lastToken = tokens[tokens.length - 1];
                if (lastToken && lastToken.type === 'text') {
                    lastToken.raw += token.raw;
                    lastToken.text += token.text;
                } else {
                    tokens.push(token);
                }
                continue;
            }
            if (src) {
                const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
                if (this.options.silent) {
                    console.error(errMsg);
                    break;
                } else {
                    throw new Error(errMsg);
                }
            }
        }
        return tokens;
    }
}
/**
 * Renderer
 */ class _Renderer {
    options;
    constructor(options){
        this.options = options || _defaults;
    }
    code(code, infostring, escaped) {
        const lang = (infostring || '').match(/^\S*/)?.[0];
        if (this.options.highlight) {
            const out = this.options.highlight(code, lang);
            if (out != null && out !== code) {
                escaped = true;
                code = out;
            }
        }
        code = code.replace(/\n$/, '') + '\n';
        if (!lang) {
            return '<pre><code>' + (escaped ? code : escape(code, true)) + '</code></pre>\n';
        }
        return '<pre><code class="' + this.options.langPrefix + escape(lang) + '">' + (escaped ? code : escape(code, true)) + '</code></pre>\n';
    }
    blockquote(quote) {
        return `<blockquote>\n${quote}</blockquote>\n`;
    }
    html(html, block) {
        return html;
    }
    heading(text, level, raw, slugger) {
        if (this.options.headerIds) {
            const id = this.options.headerPrefix + slugger.slug(raw);
            return `<h${level} id="${id}">${text}</h${level}>\n`;
        }
        // ignore IDs
        return `<h${level}>${text}</h${level}>\n`;
    }
    hr() {
        return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
    }
    list(body, ordered, start) {
        const type = ordered ? 'ol' : 'ul';
        const startatt = ordered && start !== 1 ? ' start="' + start + '"' : '';
        return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
    }
    listitem(text, task, checked) {
        return `<li>${text}</li>\n`;
    }
    checkbox(checked) {
        return '<input ' + (checked ? 'checked="" ' : '') + 'disabled="" type="checkbox"' + (this.options.xhtml ? ' /' : '') + '> ';
    }
    paragraph(text) {
        return `<p>${text}</p>\n`;
    }
    table(header, body) {
        if (body) body = `<tbody>${body}</tbody>`;
        return '<table>\n' + '<thead>\n' + header + '</thead>\n' + body + '</table>\n';
    }
    tablerow(content) {
        return `<tr>\n${content}</tr>\n`;
    }
    tablecell(content, flags) {
        const type = flags.header ? 'th' : 'td';
        const tag = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
        return tag + content + `</${type}>\n`;
    }
    /**
     * span level renderer
     */ strong(text) {
        return `<strong>${text}</strong>`;
    }
    em(text) {
        return `<em>${text}</em>`;
    }
    codespan(text) {
        return `<code>${text}</code>`;
    }
    br() {
        return this.options.xhtml ? '<br/>' : '<br>';
    }
    del(text) {
        return `<del>${text}</del>`;
    }
    link(href, title, text) {
        const cleanHref = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (cleanHref === null) {
            return text;
        }
        href = cleanHref;
        let out = '<a href="' + href + '"';
        if (title) {
            out += ' title="' + title + '"';
        }
        out += '>' + text + '</a>';
        return out;
    }
    image(href, title, text) {
        const cleanHref = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (cleanHref === null) {
            return text;
        }
        href = cleanHref;
        let out = `<img src="${href}" alt="${text}"`;
        if (title) {
            out += ` title="${title}"`;
        }
        out += this.options.xhtml ? '/>' : '>';
        return out;
    }
    text(text) {
        return text;
    }
}
/**
 * TextRenderer
 * returns only the textual part of the token
 */ class _TextRenderer {
    // no need for block level renderers
    strong(text) {
        return text;
    }
    em(text) {
        return text;
    }
    codespan(text) {
        return text;
    }
    del(text) {
        return text;
    }
    html(text) {
        return text;
    }
    text(text) {
        return text;
    }
    link(href, title, text) {
        return '' + text;
    }
    image(href, title, text) {
        return '' + text;
    }
    br() {
        return '';
    }
}
/**
 * Slugger generates header id
 */ class _Slugger {
    seen;
    constructor(){
        this.seen = {};
    }
    serialize(value) {
        return value.toLowerCase().trim()// remove html tags
        .replace(/<[!\/a-z].*?>/ig, '')// remove unwanted chars
        .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '').replace(/\s/g, '-');
    }
    /**
     * Finds the next safe (unique) slug to use
     */ getNextSafeSlug(originalSlug, isDryRun) {
        let slug = originalSlug;
        let occurenceAccumulator = 0;
        if (this.seen.hasOwnProperty(slug)) {
            occurenceAccumulator = this.seen[originalSlug];
            do {
                occurenceAccumulator++;
                slug = originalSlug + '-' + occurenceAccumulator;
            }while (this.seen.hasOwnProperty(slug))
        }
        if (!isDryRun) {
            this.seen[originalSlug] = occurenceAccumulator;
            this.seen[slug] = 0;
        }
        return slug;
    }
    /**
     * Convert string to unique id
     */ slug(value, options = {}) {
        const slug = this.serialize(value);
        return this.getNextSafeSlug(slug, options.dryrun);
    }
}
/**
 * Parsing & Compiling
 */ class _Parser {
    options;
    renderer;
    textRenderer;
    slugger;
    constructor(options){
        this.options = options || _defaults;
        this.options.renderer = this.options.renderer || new _Renderer();
        this.renderer = this.options.renderer;
        this.renderer.options = this.options;
        this.textRenderer = new _TextRenderer();
        this.slugger = new _Slugger();
    }
    /**
     * Static Parse Method
     */ static parse(tokens, options) {
        const parser = new _Parser(options);
        return parser.parse(tokens);
    }
    /**
     * Static Parse Inline Method
     */ static parseInline(tokens, options) {
        const parser = new _Parser(options);
        return parser.parseInline(tokens);
    }
    /**
     * Parse Loop
     */ parse(tokens, top = true) {
        let out = '';
        for(let i = 0; i < tokens.length; i++){
            const token = tokens[i];
            // Run any renderer extensions
            if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
                const genericToken = token;
                const ret = this.options.extensions.renderers[genericToken.type].call({
                    parser: this
                }, genericToken);
                if (ret !== false || ![
                    'space',
                    'hr',
                    'heading',
                    'code',
                    'table',
                    'blockquote',
                    'list',
                    'html',
                    'paragraph',
                    'text'
                ].includes(genericToken.type)) {
                    out += ret || '';
                    continue;
                }
            }
            switch(token.type){
                case 'space':
                    {
                        continue;
                    }
                case 'hr':
                    {
                        out += this.renderer.hr();
                        continue;
                    }
                case 'heading':
                    {
                        const headingToken = token;
                        out += this.renderer.heading(this.parseInline(headingToken.tokens), headingToken.depth, unescape(this.parseInline(headingToken.tokens, this.textRenderer)), this.slugger);
                        continue;
                    }
                case 'code':
                    {
                        const codeToken = token;
                        out += this.renderer.code(codeToken.text, codeToken.lang, !!codeToken.escaped);
                        continue;
                    }
                case 'table':
                    {
                        const tableToken = token;
                        let header = '';
                        // header
                        let cell = '';
                        for(let j = 0; j < tableToken.header.length; j++){
                            cell += this.renderer.tablecell(this.parseInline(tableToken.header[j].tokens), {
                                header: true,
                                align: tableToken.align[j]
                            });
                        }
                        header += this.renderer.tablerow(cell);
                        let body = '';
                        for(let j = 0; j < tableToken.rows.length; j++){
                            const row = tableToken.rows[j];
                            cell = '';
                            for(let k = 0; k < row.length; k++){
                                cell += this.renderer.tablecell(this.parseInline(row[k].tokens), {
                                    header: false,
                                    align: tableToken.align[k]
                                });
                            }
                            body += this.renderer.tablerow(cell);
                        }
                        out += this.renderer.table(header, body);
                        continue;
                    }
                case 'blockquote':
                    {
                        const blockquoteToken = token;
                        const body = this.parse(blockquoteToken.tokens);
                        out += this.renderer.blockquote(body);
                        continue;
                    }
                case 'list':
                    {
                        const listToken = token;
                        const ordered = listToken.ordered;
                        const start = listToken.start;
                        const loose = listToken.loose;
                        let body = '';
                        for(let j = 0; j < listToken.items.length; j++){
                            const item = listToken.items[j];
                            const checked = item.checked;
                            const task = item.task;
                            let itemBody = '';
                            if (item.task) {
                                const checkbox = this.renderer.checkbox(!!checked);
                                if (loose) {
                                    if (item.tokens.length > 0 && item.tokens[0].type === 'paragraph') {
                                        item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;
                                        if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                                            item.tokens[0].tokens[0].text = checkbox + ' ' + item.tokens[0].tokens[0].text;
                                        }
                                    } else {
                                        item.tokens.unshift({
                                            type: 'text',
                                            text: checkbox
                                        });
                                    }
                                } else {
                                    itemBody += checkbox;
                                }
                            }
                            itemBody += this.parse(item.tokens, loose);
                            body += this.renderer.listitem(itemBody, task, !!checked);
                        }
                        out += this.renderer.list(body, ordered, start);
                        continue;
                    }
                case 'html':
                    {
                        const htmlToken = token;
                        out += this.renderer.html(htmlToken.text, htmlToken.block);
                        continue;
                    }
                case 'paragraph':
                    {
                        const paragraphToken = token;
                        out += this.renderer.paragraph(this.parseInline(paragraphToken.tokens));
                        continue;
                    }
                case 'text':
                    {
                        let textToken = token;
                        let body = textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text;
                        while(i + 1 < tokens.length && tokens[i + 1].type === 'text'){
                            textToken = tokens[++i];
                            body += '\n' + (textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text);
                        }
                        out += top ? this.renderer.paragraph(body) : body;
                        continue;
                    }
                default:
                    {
                        const errMsg = 'Token with "' + token.type + '" type was not found.';
                        if (this.options.silent) {
                            console.error(errMsg);
                            return '';
                        } else {
                            throw new Error(errMsg);
                        }
                    }
            }
        }
        return out;
    }
    /**
     * Parse Inline Tokens
     */ parseInline(tokens, renderer) {
        renderer = renderer || this.renderer;
        let out = '';
        for(let i = 0; i < tokens.length; i++){
            const token = tokens[i];
            // Run any renderer extensions
            if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
                const ret = this.options.extensions.renderers[token.type].call({
                    parser: this
                }, token);
                if (ret !== false || ![
                    'escape',
                    'html',
                    'link',
                    'image',
                    'strong',
                    'em',
                    'codespan',
                    'br',
                    'del',
                    'text'
                ].includes(token.type)) {
                    out += ret || '';
                    continue;
                }
            }
            switch(token.type){
                case 'escape':
                    {
                        const escapeToken = token;
                        out += renderer.text(escapeToken.text);
                        break;
                    }
                case 'html':
                    {
                        const tagToken = token;
                        out += renderer.html(tagToken.text);
                        break;
                    }
                case 'link':
                    {
                        const linkToken = token;
                        out += renderer.link(linkToken.href, linkToken.title, this.parseInline(linkToken.tokens, renderer));
                        break;
                    }
                case 'image':
                    {
                        const imageToken = token;
                        out += renderer.image(imageToken.href, imageToken.title, imageToken.text);
                        break;
                    }
                case 'strong':
                    {
                        const strongToken = token;
                        out += renderer.strong(this.parseInline(strongToken.tokens, renderer));
                        break;
                    }
                case 'em':
                    {
                        const emToken = token;
                        out += renderer.em(this.parseInline(emToken.tokens, renderer));
                        break;
                    }
                case 'codespan':
                    {
                        const codespanToken = token;
                        out += renderer.codespan(codespanToken.text);
                        break;
                    }
                case 'br':
                    {
                        out += renderer.br();
                        break;
                    }
                case 'del':
                    {
                        const delToken = token;
                        out += renderer.del(this.parseInline(delToken.tokens, renderer));
                        break;
                    }
                case 'text':
                    {
                        const textToken = token;
                        out += renderer.text(textToken.text);
                        break;
                    }
                default:
                    {
                        const errMsg = 'Token with "' + token.type + '" type was not found.';
                        if (this.options.silent) {
                            console.error(errMsg);
                            return '';
                        } else {
                            throw new Error(errMsg);
                        }
                    }
            }
        }
        return out;
    }
}
class _Hooks {
    options;
    constructor(options){
        this.options = options || _defaults;
    }
    static passThroughHooks = new Set([
        'preprocess',
        'postprocess'
    ]);
    /**
     * Process markdown before marked
     */ preprocess(markdown) {
        return markdown;
    }
    /**
     * Process HTML after marked is finished
     */ postprocess(html) {
        return html;
    }
}
class Marked {
    defaults = _getDefaults();
    options = this.setOptions;
    parse = this.#parseMarkdown(_Lexer.lex, _Parser.parse);
    parseInline = this.#parseMarkdown(_Lexer.lexInline, _Parser.parseInline);
    Parser = _Parser;
    parser = _Parser.parse;
    Renderer = _Renderer;
    TextRenderer = _TextRenderer;
    Lexer = _Lexer;
    lexer = _Lexer.lex;
    Tokenizer = _Tokenizer;
    Slugger = _Slugger;
    Hooks = _Hooks;
    constructor(...args){
        this.use(...args);
    }
    /**
     * Run callback for every token
     */ walkTokens(tokens, callback) {
        let values = [];
        for (const token of tokens){
            values = values.concat(callback.call(this, token));
            switch(token.type){
                case 'table':
                    {
                        const tableToken = token;
                        for (const cell of tableToken.header){
                            values = values.concat(this.walkTokens(cell.tokens, callback));
                        }
                        for (const row of tableToken.rows){
                            for (const cell of row){
                                values = values.concat(this.walkTokens(cell.tokens, callback));
                            }
                        }
                        break;
                    }
                case 'list':
                    {
                        const listToken = token;
                        values = values.concat(this.walkTokens(listToken.items, callback));
                        break;
                    }
                default:
                    {
                        const genericToken = token;
                        if (this.defaults.extensions?.childTokens?.[genericToken.type]) {
                            this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens)=>{
                                values = values.concat(this.walkTokens(genericToken[childTokens], callback));
                            });
                        } else if (genericToken.tokens) {
                            values = values.concat(this.walkTokens(genericToken.tokens, callback));
                        }
                    }
            }
        }
        return values;
    }
    use(...args) {
        const extensions = this.defaults.extensions || {
            renderers: {},
            childTokens: {}
        };
        args.forEach((pack)=>{
            // copy options to new object
            const opts = {
                ...pack
            };
            // set async to true if it was set to true before
            opts.async = this.defaults.async || opts.async || false;
            // ==-- Parse "addon" extensions --== //
            if (pack.extensions) {
                pack.extensions.forEach((ext)=>{
                    if (!ext.name) {
                        throw new Error('extension name required');
                    }
                    if ('renderer' in ext) {
                        const prevRenderer = extensions.renderers[ext.name];
                        if (prevRenderer) {
                            // Replace extension with func to run new extension but fall back if false
                            extensions.renderers[ext.name] = function(...args) {
                                let ret = ext.renderer.apply(this, args);
                                if (ret === false) {
                                    ret = prevRenderer.apply(this, args);
                                }
                                return ret;
                            };
                        } else {
                            extensions.renderers[ext.name] = ext.renderer;
                        }
                    }
                    if ('tokenizer' in ext) {
                        if (!ext.level || ext.level !== 'block' && ext.level !== 'inline') {
                            throw new Error("extension level must be 'block' or 'inline'");
                        }
                        const extLevel = extensions[ext.level];
                        if (extLevel) {
                            extLevel.unshift(ext.tokenizer);
                        } else {
                            extensions[ext.level] = [
                                ext.tokenizer
                            ];
                        }
                        if (ext.start) {
                            if (ext.level === 'block') {
                                if (extensions.startBlock) {
                                    extensions.startBlock.push(ext.start);
                                } else {
                                    extensions.startBlock = [
                                        ext.start
                                    ];
                                }
                            } else if (ext.level === 'inline') {
                                if (extensions.startInline) {
                                    extensions.startInline.push(ext.start);
                                } else {
                                    extensions.startInline = [
                                        ext.start
                                    ];
                                }
                            }
                        }
                    }
                    if ('childTokens' in ext && ext.childTokens) {
                        extensions.childTokens[ext.name] = ext.childTokens;
                    }
                });
                opts.extensions = extensions;
            }
            // ==-- Parse "overwrite" extensions --== //
            if (pack.renderer) {
                const renderer = this.defaults.renderer || new _Renderer(this.defaults);
                for(const prop in pack.renderer){
                    const rendererFunc = pack.renderer[prop];
                    const rendererKey = prop;
                    const prevRenderer = renderer[rendererKey];
                    // Replace renderer with func to run extension, but fall back if false
                    renderer[rendererKey] = (...args)=>{
                        let ret = rendererFunc.apply(renderer, args);
                        if (ret === false) {
                            ret = prevRenderer.apply(renderer, args);
                        }
                        return ret || '';
                    };
                }
                opts.renderer = renderer;
            }
            if (pack.tokenizer) {
                const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
                for(const prop in pack.tokenizer){
                    const tokenizerFunc = pack.tokenizer[prop];
                    const tokenizerKey = prop;
                    const prevTokenizer = tokenizer[tokenizerKey];
                    // Replace tokenizer with func to run extension, but fall back if false
                    tokenizer[tokenizerKey] = (...args)=>{
                        let ret = tokenizerFunc.apply(tokenizer, args);
                        if (ret === false) {
                            ret = prevTokenizer.apply(tokenizer, args);
                        }
                        return ret;
                    };
                }
                opts.tokenizer = tokenizer;
            }
            // ==-- Parse Hooks extensions --== //
            if (pack.hooks) {
                const hooks = this.defaults.hooks || new _Hooks();
                for(const prop in pack.hooks){
                    const hooksFunc = pack.hooks[prop];
                    const hooksKey = prop;
                    const prevHook = hooks[hooksKey];
                    if (_Hooks.passThroughHooks.has(prop)) {
                        hooks[hooksKey] = (arg)=>{
                            if (this.defaults.async) {
                                return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret)=>{
                                    return prevHook.call(hooks, ret);
                                });
                            }
                            const ret = hooksFunc.call(hooks, arg);
                            return prevHook.call(hooks, ret);
                        };
                    } else {
                        hooks[hooksKey] = (...args)=>{
                            let ret = hooksFunc.apply(hooks, args);
                            if (ret === false) {
                                ret = prevHook.apply(hooks, args);
                            }
                            return ret;
                        };
                    }
                }
                opts.hooks = hooks;
            }
            // ==-- Parse WalkTokens extensions --== //
            if (pack.walkTokens) {
                const walkTokens = this.defaults.walkTokens;
                const packWalktokens = pack.walkTokens;
                opts.walkTokens = function(token) {
                    let values = [];
                    values.push(packWalktokens.call(this, token));
                    if (walkTokens) {
                        values = values.concat(walkTokens.call(this, token));
                    }
                    return values;
                };
            }
            this.defaults = {
                ...this.defaults,
                ...opts
            };
        });
        return this;
    }
    setOptions(opt) {
        this.defaults = {
            ...this.defaults,
            ...opt
        };
        return this;
    }
    #parseMarkdown(lexer, parser) {
        return (src, optOrCallback, callback)=>{
            if (typeof optOrCallback === 'function') {
                callback = optOrCallback;
                optOrCallback = null;
            }
            const origOpt = {
                ...optOrCallback
            };
            const opt = {
                ...this.defaults,
                ...origOpt
            };
            // Show warning if an extension set async to true but the parse was called with async: false
            if (this.defaults.async === true && origOpt.async === false) {
                if (!opt.silent) {
                    console.warn('marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.');
                }
                opt.async = true;
            }
            const throwError = this.#onError(!!opt.silent, !!opt.async, callback);
            // throw error in case of non string input
            if (typeof src === 'undefined' || src === null) {
                return throwError(new Error('marked(): input parameter is undefined or null'));
            }
            if (typeof src !== 'string') {
                return throwError(new Error('marked(): input parameter is of type ' + Object.prototype.toString.call(src) + ', string expected'));
            }
            checkDeprecations(opt, callback);
            if (opt.hooks) {
                opt.hooks.options = opt;
            }
            if (callback) {
                const resultCallback = callback;
                const highlight = opt.highlight;
                let tokens;
                try {
                    if (opt.hooks) {
                        src = opt.hooks.preprocess(src);
                    }
                    tokens = lexer(src, opt);
                } catch (e) {
                    return throwError(e);
                }
                const done = (err)=>{
                    let out;
                    if (!err) {
                        try {
                            if (opt.walkTokens) {
                                this.walkTokens(tokens, opt.walkTokens);
                            }
                            out = parser(tokens, opt);
                            if (opt.hooks) {
                                out = opt.hooks.postprocess(out);
                            }
                        } catch (e) {
                            err = e;
                        }
                    }
                    opt.highlight = highlight;
                    return err ? throwError(err) : resultCallback(null, out);
                };
                if (!highlight || highlight.length < 3) {
                    return done();
                }
                delete opt.highlight;
                if (!tokens.length) return done();
                let pending = 0;
                this.walkTokens(tokens, (token)=>{
                    if (token.type === 'code') {
                        pending++;
                        setTimeout(()=>{
                            highlight(token.text, token.lang, (err, code)=>{
                                if (err) {
                                    return done(err);
                                }
                                if (code != null && code !== token.text) {
                                    token.text = code;
                                    token.escaped = true;
                                }
                                pending--;
                                if (pending === 0) {
                                    done();
                                }
                            });
                        }, 0);
                    }
                });
                if (pending === 0) {
                    done();
                }
                return;
            }
            if (opt.async) {
                return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src)=>lexer(src, opt)).then((tokens)=>opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(()=>tokens) : tokens).then((tokens)=>parser(tokens, opt)).then((html)=>opt.hooks ? opt.hooks.postprocess(html) : html).catch(throwError);
            }
            try {
                if (opt.hooks) {
                    src = opt.hooks.preprocess(src);
                }
                const tokens = lexer(src, opt);
                if (opt.walkTokens) {
                    this.walkTokens(tokens, opt.walkTokens);
                }
                let html = parser(tokens, opt);
                if (opt.hooks) {
                    html = opt.hooks.postprocess(html);
                }
                return html;
            } catch (e) {
                return throwError(e);
            }
        };
    }
    #onError(silent, async, callback) {
        return (e)=>{
            e.message += '\nPlease report this to https://github.com/markedjs/marked.';
            if (silent) {
                const msg = '<p>An error occurred:</p><pre>' + escape(e.message + '', true) + '</pre>';
                if (async) {
                    return Promise.resolve(msg);
                }
                if (callback) {
                    callback(null, msg);
                    return;
                }
                return msg;
            }
            if (async) {
                return Promise.reject(e);
            }
            if (callback) {
                callback(e);
                return;
            }
            throw e;
        };
    }
}
const markedInstance = new Marked();
function marked(src, opt, callback) {
    return markedInstance.parse(src, opt, callback);
}
/**
 * Sets the default options.
 *
 * @param options Hash of options
 */ marked.options = marked.setOptions = function(options) {
    markedInstance.setOptions(options);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
};
/**
 * Gets the original marked default options.
 */ marked.getDefaults = _getDefaults;
marked.defaults = _defaults;
/**
 * Use Extension
 */ marked.use = function(...args) {
    markedInstance.use(...args);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
};
/**
 * Run callback for every token
 */ marked.walkTokens = function(tokens, callback) {
    return markedInstance.walkTokens(tokens, callback);
};
/**
 * Compiles markdown to HTML without enclosing `p` tag.
 *
 * @param src String of markdown source to be compiled
 * @param options Hash of options
 * @return String of compiled HTML
 */ marked.parseInline = markedInstance.parseInline;
/**
 * Expose
 */ marked.Parser = _Parser;
marked.parser = _Parser.parse;
marked.Renderer = _Renderer;
marked.TextRenderer = _TextRenderer;
marked.Lexer = _Lexer;
marked.lexer = _Lexer.lex;
marked.Tokenizer = _Tokenizer;
marked.Slugger = _Slugger;
marked.Hooks = _Hooks;
marked.parse = marked;
const options = marked.options;
const setOptions = marked.setOptions;
const use = marked.use;
const walkTokens = marked.walkTokens;
const parseInline = marked.parseInline;
const parse = marked;
const parser = _Parser.parse;
const lexer = _Lexer.lex;
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/md-to-react-email/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmailMarkdown",
    ()=>EmailMarkdown,
    "camelToKebabCase",
    ()=>camelToKebabCase,
    "parseCssInJsToInlineCss",
    ()=>parseCssInJsToInlineCss,
    "parseMarkdownToJSX",
    ()=>parseMarkdownToJSX
]);
// src/parser.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/marked/lib/marked.esm.js [app-route] (ecmascript)");
// src/components/emailMarkdown.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
;
;
// src/styles.ts
var emptyStyle = {};
var baseHeaderStyles = {
    fontWeight: "500",
    paddingTop: 20
};
var h1 = {
    ...baseHeaderStyles,
    fontSize: "2.5rem"
};
var h2 = {
    ...baseHeaderStyles,
    fontSize: "2rem"
};
var h3 = {
    ...baseHeaderStyles,
    fontSize: "1.75rem"
};
var h4 = {
    ...baseHeaderStyles,
    fontSize: "1.5rem"
};
var h5 = {
    ...baseHeaderStyles,
    fontSize: "1.25rem"
};
var h6 = {
    ...baseHeaderStyles,
    fontSize: "1rem"
};
var bold = {
    fontWeight: "bold"
};
var italic = {
    fontStyle: "italic"
};
var blockQuote = {
    background: "#f9f9f9",
    borderLeft: "10px solid #ccc",
    margin: "1.5em 10px",
    padding: "1em 10px"
};
var codeInline = {
    color: "#212529",
    fontSize: "87.5%",
    display: "inline",
    background: " #f8f8f8",
    fontFamily: `SFMono-Regular,Menlo,Monaco,Consolas,monospace`
};
var codeBlock = {
    ...codeInline,
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 1,
    marginBottom: 20,
    background: " #f8f8f8"
};
var link = {
    color: "#007bff",
    textDecoration: "underline",
    backgroundColor: "transparent"
};
var styles = {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    blockQuote,
    bold,
    italic,
    link,
    codeBlock: {
        ...codeBlock,
        wordWrap: "break-word"
    },
    codeInline: {
        ...codeInline,
        wordWrap: "break-word"
    },
    p: emptyStyle,
    li: emptyStyle,
    ul: emptyStyle,
    ol: emptyStyle,
    image: emptyStyle,
    br: emptyStyle,
    hr: emptyStyle,
    table: emptyStyle,
    thead: emptyStyle,
    tbody: emptyStyle,
    th: emptyStyle,
    td: emptyStyle,
    tr: emptyStyle,
    strikethrough: emptyStyle
};
// src/utils.ts
function escapeQuotes(value) {
    if (typeof value === "string" && value.includes('"')) {
        return value.replace(/"/g, "&#x27;");
    }
    return value;
}
function camelToKebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function parseCssInJsToInlineCss(cssProperties) {
    if (!cssProperties) return "";
    const numericalCssProperties = [
        "width",
        "height",
        "margin",
        "marginTop",
        "marginRight",
        "marginBottom",
        "marginLeft",
        "padding",
        "paddingTop",
        "paddingRight",
        "paddingBottom",
        "paddingLeft",
        "borderWidth",
        "borderTopWidth",
        "borderRightWidth",
        "borderBottomWidth",
        "borderLeftWidth",
        "outlineWidth",
        "top",
        "right",
        "bottom",
        "left",
        "fontSize",
        "lineHeight",
        "letterSpacing",
        "wordSpacing",
        "maxWidth",
        "minWidth",
        "maxHeight",
        "minHeight",
        "borderRadius",
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
        "textIndent",
        "gridColumnGap",
        "gridRowGap",
        "gridGap",
        "translateX",
        "translateY"
    ];
    return Object.entries(cssProperties).map(([property, value])=>{
        if (typeof value === "number" && numericalCssProperties.includes(property)) {
            return `${camelToKebabCase(property)}:${value}px`;
        } else {
            const escapedValue = escapeQuotes(value);
            return `${camelToKebabCase(property)}:${escapedValue}`;
        }
    }).join(";");
}
var initRenderer = ({ customStyles })=>{
    const finalStyles = {
        ...styles,
        ...customStyles
    };
    const customRenderer = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Renderer"]();
    customRenderer.blockquote = (quote)=>{
        return `<blockquote${parseCssInJsToInlineCss(finalStyles.blockQuote) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.blockQuote)}"` : ""}>
${quote}</blockquote>
`;
    };
    customRenderer.br = ()=>{
        return `<br${parseCssInJsToInlineCss(finalStyles.br) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.br)}"` : ""} />`;
    };
    customRenderer.code = (code)=>{
        code = code.replace(/\n$/, "") + "\n";
        return `<pre${parseCssInJsToInlineCss(finalStyles.codeBlock) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.codeBlock)}"` : ""}><code>${code}</code></pre>
`;
    };
    customRenderer.codespan = (text)=>{
        return `<code${parseCssInJsToInlineCss(finalStyles.codeInline) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.codeInline)}"` : ""}>${text}</code>`;
    };
    customRenderer.del = (text)=>{
        return `<del${parseCssInJsToInlineCss(finalStyles.strikethrough) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.strikethrough)}"` : ""}>${text}</del>`;
    };
    customRenderer.em = (text)=>{
        return `<em${parseCssInJsToInlineCss(finalStyles.italic) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.italic)}"` : ""}>${text}</em>`;
    };
    customRenderer.heading = (text, level)=>{
        return `<h${level}${parseCssInJsToInlineCss(finalStyles[`h${level}`]) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles[`h${level}`])}"` : ""}>${text}</h${level}>`;
    };
    customRenderer.hr = ()=>{
        return `<hr${parseCssInJsToInlineCss(finalStyles.hr) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.hr)}"` : ""} />
`;
    };
    customRenderer.image = (href, _, text)=>{
        return `<img src="${href}" alt="${text}"${parseCssInJsToInlineCss(finalStyles.image) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.image)}"` : ""}>`;
    };
    customRenderer.link = (href, _, text)=>{
        return `<a href="${href}" target="_blank"${parseCssInJsToInlineCss(finalStyles.link) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.link)}"` : ""}>${text}</a>`;
    };
    customRenderer.list = (body, ordered, start)=>{
        const type = ordered ? "ol" : "ul";
        const startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
        const styles2 = parseCssInJsToInlineCss(finalStyles[ordered ? "ol" : "ul"]);
        return "<" + type + startatt + `${styles2 !== "" ? ` style="${styles2}"` : ""}>
` + body + "</" + type + ">\n";
    };
    customRenderer.listitem = (text)=>{
        return `<li${parseCssInJsToInlineCss(finalStyles.li) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.li)}"` : ""}>${text}</li>
`;
    };
    customRenderer.paragraph = (text)=>{
        return `<p${parseCssInJsToInlineCss(finalStyles.p) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.p)}"` : ""}>${text}</p>
`;
    };
    customRenderer.strong = (text)=>{
        return `<strong${parseCssInJsToInlineCss(finalStyles.bold) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.bold)}"` : ""}>${text}</strong>`;
    };
    customRenderer.table = (header, body)=>{
        if (body) body = `<tbody>${body}</tbody>`;
        return `<table${parseCssInJsToInlineCss(finalStyles.table) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.table)}"` : ""}>
<thead${parseCssInJsToInlineCss(finalStyles.thead) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.thead)}"` : ""}>
${header}</thead>
${body}</table>
`;
    };
    customRenderer.tablecell = (content, flags)=>{
        const type = flags.header ? "th" : "td";
        const tag = flags.align ? `<${type} align="${flags.align}"${parseCssInJsToInlineCss(finalStyles.td) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.td)}"` : ""}>` : `<${type}${parseCssInJsToInlineCss(finalStyles.td) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.td)}"` : ""}>`;
        return tag + content + `</${type}>
`;
    };
    customRenderer.tablerow = (content)=>{
        return `<tr${parseCssInJsToInlineCss(finalStyles.tr) !== "" ? ` style="${parseCssInJsToInlineCss(finalStyles.tr)}"` : ""}>
${content}</tr>
`;
    };
    return customRenderer;
};
// src/parser.ts
var MarkdownParser = class {
    renderer;
    constructor({ customStyles }){
        this.renderer = initRenderer({
            customStyles
        });
    }
    parse(markdown) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["marked"].parse(markdown, {
            renderer: this.renderer
        });
    }
};
// src/parseMarkdownToJSX.ts
var parseMarkdownToJSX = ({ markdown, customStyles })=>{
    const parser = new MarkdownParser({
        customStyles
    });
    return parser.parse(markdown);
};
;
var EmailMarkdown = ({ markdown, markdownCustomStyles, markdownContainerStyles })=>{
    const parsedMarkdown = parseMarkdownToJSX({
        markdown,
        customStyles: markdownCustomStyles
    });
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createElement"]("div", {
        style: markdownContainerStyles,
        dangerouslySetInnerHTML: {
            __html: parsedMarkdown
        }
    });
};
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/markdown/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Markdown",
    ()=>Markdown
]);
// src/markdown.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$md$2d$to$2d$react$2d$email$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/md-to-react-email/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude)=>{
    var target = {};
    for(var prop in source)if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)){
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
};
;
;
;
var Markdown = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardRef"]((_a, ref)=>{
    var _b = _a, { children, markdownContainerStyles, markdownCustomStyles } = _b, props = __objRest(_b, [
        "children",
        "markdownContainerStyles",
        "markdownCustomStyles"
    ]);
    const parsedMarkdown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$md$2d$to$2d$react$2d$email$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseMarkdownToJSX"])({
        markdown: children,
        customStyles: markdownCustomStyles
    });
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("div", __spreadProps(__spreadValues({}, props), {
        dangerouslySetInnerHTML: {
            __html: parsedMarkdown
        },
        "data-id": "react-email-markdown",
        ref,
        style: markdownContainerStyles
    }));
});
Markdown.displayName = "Markdown";
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/preview/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Preview",
    ()=>Preview,
    "renderWhiteSpace",
    ()=>renderWhiteSpace
]);
// src/preview.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude)=>{
    var target = {};
    for(var prop in source)if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)){
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
};
;
;
var PREVIEW_MAX_LENGTH = 150;
var Preview = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardRef"]((_a, ref)=>{
    var _b = _a, { children = "" } = _b, props = __objRest(_b, [
        "children"
    ]);
    const text = (Array.isArray(children) ? children.join("") : children).substring(0, PREVIEW_MAX_LENGTH);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsxs"])("div", __spreadProps(__spreadValues({
        style: {
            display: "none",
            overflow: "hidden",
            lineHeight: "1px",
            opacity: 0,
            maxHeight: 0,
            maxWidth: 0
        }
    }, props), {
        ref,
        children: [
            text,
            renderWhiteSpace(text)
        ]
    }));
});
Preview.displayName = "Preview";
var whiteSpaceCodes = "\xA0\u200C\u200B\u200D\u200E\u200F\uFEFF";
var renderWhiteSpace = (text)=>{
    if (text.length >= PREVIEW_MAX_LENGTH) {
        return null;
    }
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("div", {
        children: whiteSpaceCodes.repeat(PREVIEW_MAX_LENGTH - text.length)
    });
};
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/row/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Row",
    ()=>Row
]);
// src/row.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude)=>{
    var target = {};
    for(var prop in source)if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)){
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
};
;
;
var Row = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardRef"]((_a, ref)=>{
    var _b = _a, { children, style } = _b, props = __objRest(_b, [
        "children",
        "style"
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("table", __spreadProps(__spreadValues({
        align: "center",
        width: "100%",
        border: 0,
        cellPadding: "0",
        cellSpacing: "0",
        role: "presentation"
    }, props), {
        ref,
        style,
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("tbody", {
            style: {
                width: "100%"
            },
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("tr", {
                style: {
                    width: "100%"
                },
                children
            })
        })
    }));
});
Row.displayName = "Row";
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/section/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Section",
    ()=>Section
]);
// src/section.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude)=>{
    var target = {};
    for(var prop in source)if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)){
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
};
;
;
var Section = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardRef"]((_a, ref)=>{
    var _b = _a, { children, style } = _b, props = __objRest(_b, [
        "children",
        "style"
    ]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("table", __spreadProps(__spreadValues({
        align: "center",
        width: "100%",
        border: 0,
        cellPadding: "0",
        cellSpacing: "0",
        role: "presentation"
    }, props), {
        ref,
        style,
        children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("tbody", {
            children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("tr", {
                children: /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("td", {
                    children
                })
            })
        })
    }));
});
Section.displayName = "Section";
;
}),
"[project]/Documents/GitHub/billing-failure-email/node_modules/@react-email/text/dist/index.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Text",
    ()=>Text
]);
// src/text.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
// src/text.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/GitHub/billing-failure-email/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-runtime.js [app-route] (ecmascript)");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude)=>{
    var target = {};
    for(var prop in source)if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols) for (var prop of __getOwnPropSymbols(source)){
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
    }
    return target;
};
;
// src/utils/parse-margins.ts
function parseMargin({ margin, marginTop, marginRight, marginBottom, marginLeft }) {
    let mt = marginTop;
    let mr = marginRight;
    let mb = marginBottom;
    let ml = marginLeft;
    if (typeof margin === "number") {
        mt = margin;
        mr = margin;
        mb = margin;
        ml = margin;
    } else if (typeof margin === "string") {
        const values = margin.split(/\s+/);
        switch(values.length){
            case 1:
                mt = values[0];
                mr = values[0];
                mb = values[0];
                ml = values[0];
                break;
            case 2:
                mt = values[0];
                mb = values[0];
                mr = values[1];
                ml = values[1];
                break;
            case 3:
                mt = values[0];
                mr = values[1];
                mb = values[2];
                ml = values[1];
                break;
            case 4:
                mt = values[0];
                mr = values[1];
                mb = values[2];
                ml = values[3];
                break;
            default:
                break;
        }
    }
    return {
        mt,
        mr,
        mb,
        ml
    };
}
;
var Text = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["forwardRef"]((_a, ref)=>{
    var _b = _a, { style } = _b, props = __objRest(_b, [
        "style"
    ]);
    var _a2, _b2;
    const margins = parseMargin({
        margin: style == null ? void 0 : style.margin,
        marginBottom: (_a2 = style == null ? void 0 : style.marginBottom) != null ? _a2 : "16px",
        marginTop: (_b2 = style == null ? void 0 : style.marginTop) != null ? _b2 : "16px",
        marginLeft: style == null ? void 0 : style.marginLeft,
        marginRight: style == null ? void 0 : style.marginRight
    });
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$GitHub$2f$billing$2d$failure$2d$email$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsx"])("p", __spreadProps(__spreadValues({}, props), {
        ref,
        style: __spreadProps(__spreadValues({
            fontSize: "14px",
            lineHeight: "24px"
        }, style), {
            marginBottom: margins.mb,
            marginTop: margins.mt,
            marginLeft: margins.ml,
            marginRight: margins.mr
        })
    }));
});
Text.displayName = "Text";
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__01vxnbs._.js.map