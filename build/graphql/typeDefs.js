"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = exports.root = void 0;
var user_1 = require("../features/user");
exports.root = "#graphql\n  scalar Date\n  scalar JSON\n\n  type Query {\n    _void: String\n  }\n\n  type Mutation {\n    _void: String\n  }\n";
exports.typeDefs = [exports.root, user_1.typeDefs];
