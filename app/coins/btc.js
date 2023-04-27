"use strict";

const Decimal = require("decimal.js");
const Decimal8 = Decimal.clone({ precision:8, rounding:8 });

const btcFun = require("./btcFun.js");

const blockRewardEras = [ new Decimal8(50) ];
for (let i = 1; i < 34; i++) {
	let previous = blockRewardEras[i - 1];
	blockRewardEras.push(new Decimal8(previous).dividedBy(2));
}

const currencyUnits = [
	{
		type:"native",
		name:"SKYDOGE",
		multiplier:1,
		default:true,
		values:["", "skydoge", "SKYDOGE"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mSKYDOGE",
		multiplier:1000,
		values:["mskydoge"],
		decimalPlaces:5
	},
	{
		type:"native",
		name:"bits",
		multiplier:1000000,
		values:["bits"],
		decimalPlaces:2
	},
	{
		type:"native",
		name:"sat",
		multiplier:100000000,
		values:["sat", "satoshi"],
		decimalPlaces:0
	},
	{
		type:"exchanged",
		name:"USD",
		multiplier:"usd",
		values:["usd"],
		decimalPlaces:2,
		symbol:"$"
	},
	{
		type:"exchanged",
		name:"EUR",
		multiplier:"eur",
		values:["eur"],
		decimalPlaces:2,
		symbol:"€"
	},
];

module.exports = {
	name:"Skydoge",
	ticker:"SKYDOGE",
	logoUrlsByNetwork:{
		"main":"./img/logo/mainnet/logo.svg"
	},
	coinIconUrlsByNetwork:{
		"main":"./img/logo/mainnet/coin-icon.svg"
	},
	coinColorsByNetwork: {
		"main": "#F7931A"
	},
	siteTitlesByNetwork: {
		"main":"skyDoge Explorer",
	},
	demoSiteUrlsByNetwork: {
		"main": "https://bitcoinexplorer.org",
	},
	knownTransactionsByNetwork: {
		main: "40117374767de4f62403451bbd13bd8a34ad8e7cb998beaacaccb6412b2bd080"
	},
	maxBlockWeight: 40000000,
	maxBlockSize: 1000000,
	minTxBytes: 166, // ref: https://en.bitcoin.it/wiki/Maximum_transaction_rate
	minTxWeight: 166 * 4, // hack
	difficultyAdjustmentBlockCount: 60,
	maxSupplyByNetwork: {
		"main": new Decimal(210000000000)// ref: https://bitcoin.stackexchange.com/a/38998
	},
	targetBlockTimeSeconds: 60,
	targetBlockTimeMinutes: 1,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"SKYDOGE":currencyUnits[0], "mSKYDOGE":currencyUnits[1], "bits":currencyUnits[2], "sat":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],
	
	halvingBlockIntervalsByNetwork: {
		"main": 2100000
	},

	// used for supply estimates that don't need full gettxoutset accuracy
	coinSupplyCheckpointsByNetwork: {
		"main": [ 190508, new Decimal(19525350000) ]
	},

	utxoSetCheckpointsByNetwork: {
		"main": {"height":190508,"bestblock":"00000000000b9091094791e29f7d0ca39422eabe23cee1dad131fbc12958934d","transactions":1,"txouts":50000,"bogosize":198,"hash_serialized_2":"67e00c32c5b3708f89da8f6989c65a17f30dd718d11f56d82b2f149663130d5b","disk_size":171,"total_amount":"50000","lastUpdated":1680071949775}
	},
	
	genesisBlockHashesByNetwork:{
		"main":	"00000053c1473192ef842e0b2b1015b19b3d06238f8bb2621e748cb076606e96"
	},
	genesisCoinbaseTransactionIdsByNetwork: {
		"main":	"04329718c379bf85c16715a41613d45f08a4729203a9491cbf0008d28eb7faae"
	},
	genesisCoinbaseTransactionsByNetwork:{
		"main": {
			"txid": "04329718c379bf85c16715a41613d45f08a4729203a9491cbf0008d28eb7faae",
			"hash": "00000053c1473192ef842e0b2b1015b19b3d06238f8bb2621e748cb076606e96",
			"size": 262,
			"vsize": 226,
			"version": 536870912,
			"confirmations":190521,
			"blockhash": "00000053c1473192ef842e0b2b1015b19b3d06238f8bb2621e748cb076606e96",
			"time": 1670658201,
			"blocktime": 1670658201
		}
	},
	genesisBlockStatsByNetwork:{
		"main": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "00000053c1473192ef842e0b2b1015b19b3d06238f8bb2621e748cb076606e96",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1231006505,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 5000000000,
			"swtotal_size": 0,
			"swtotal_weight": 0,
			"swtxs": 0,
			"time": 1231006505,
			"total_out": 0,
			"total_size": 0,
			"total_weight": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		}
	},
	genesisCoinbaseOutputAddressScripthash:"04329718c379bf85c16715a41613d45f08a4729203a9491cbf0008d28eb7faae",
	historicalData: btcFun.items,
	exchangeRateData:{
		jsonUrl:"https://api.coindesk.com/v1/bpi/currentprice.json",
		responseBodySelectorFunction:function(responseBody) {
			//console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

			var exchangedCurrencies = ["USD", "GBP", "EUR"];

			if (responseBody.bpi) {
				var exchangeRates = {};

				for (var i = 0; i < exchangedCurrencies.length; i++) {
					if (responseBody.bpi[exchangedCurrencies[i]]) {
						exchangeRates[exchangedCurrencies[i].toLowerCase()] = responseBody.bpi[exchangedCurrencies[i]].rate_float;
					}
				}

				return exchangeRates;
			}
			
			return null;
		}
	},
	goldExchangeRateData:{
		jsonUrl:"https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD",
		responseBodySelectorFunction:function(responseBody) {
			//console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

			if (responseBody[0].topo && responseBody[0].topo.platform == "MT5") {
				var prices = responseBody[0].spreadProfilePrices[0];
				
				return {
					usd: prices.ask
				};
			}
			
			return null;
		}
	},
	blockRewardFunction:function(blockHeight, chain) {
		let halvingBlockInterval = (chain == "regtest" ? 150 : 2100000);
		let index = Math.floor(blockHeight / halvingBlockInterval);

		return blockRewardEras[index];
	}
};
