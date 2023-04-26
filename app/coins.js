"use strict";

const btc = require("./coins/btc.js");
const skydoge = require("./coins/skydoge.js");

module.exports = {
	"BTC": btc,
	"SKYDOGE": skydoge,

	"coins":["BTC","SKYDOGE"]
};
