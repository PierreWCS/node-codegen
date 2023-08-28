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
exports.resolvers = void 0;
require("../generated/graphql");
var user_1 = require("../features/user");
exports.resolvers = {
    Query: __assign({}, user_1.Queries),
    Mutation: __assign({}, user_1.Mutations),
};
