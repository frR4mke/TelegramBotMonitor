"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBodyFrom = void 0;
const httpm = __importStar(require("typed-rest-client/HttpClient"));
const HTMLParser = __importStar(require("node-html-parser"));
let httpc = new httpm.HttpClient('vsts-node-api');
async function readBodyFrom(url) {
    let res = await get(url);
    let body = await res.readBody();
    const root = HTMLParser.parse(body, {
        lowerCaseTagName: false,
        comment: false,
        blockTextElements: {
            script: true,
            noscript: true,
            style: false,
            pre: true // keep text content when parsing
        }
    });
    return root;
}
exports.readBodyFrom = readBodyFrom;
async function get(url) {
    return await httpc.get(url);
}
//# sourceMappingURL=rest.js.map