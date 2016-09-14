"use strict";
var index_1 = require('./+home/index');
var index_2 = require('./+question/index');
exports.routes = index_1.HomeRoutes.concat(index_2.QuestionRoutes);
