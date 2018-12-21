"use strict";

var routes = require("next-routes")();
routes.add("/campaigns/new", "/campaigns/new") // phai dat truoc
.add("/campaigns/:address", "/campaigns/show").add("/campaigns/:address/requests", "/campaigns/requests/index").add("/campaigns/:address/requests/new", "/campaigns/requests/new");

module.exports = routes;