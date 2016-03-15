"use strict";

var test01 = null;
var test02 = null;
var test04 = null;


var counter = (function () {

    var add = function(num1, num2) {
        return num1 + num2;
    };
 
    var subtract = function(num1, num2) {
        return num1 - num2;
    };

    var difference = function(num1, num2) {
        if (num1 > num2) {
            return num1 - num2;
        }
 
        return num2 - num1;
    };
 
    return {
        add: add,
        subtract: subtract,
        difference: difference
    };

var test10 = null;
var test11 = null;
var test14 = null;

    
} ());