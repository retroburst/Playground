// requires
var request = require('request');
var fs = require('fs');

// vars
var uri = 'http://www.anz.com/productdata/productdata.asp?output=json&callback=callbackFunction';

// functions
var handleRequestRes = function(error, response, body){
    if (!error && response.statusCode == 200) {
        console.log(body);
    } else {
        console.log(error);
    }
};

// pull down the product info json from ANZ bank
request(uri, handleRequestRes);