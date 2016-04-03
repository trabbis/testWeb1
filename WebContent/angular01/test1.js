//http://www.sitepoint.com/5-typical-javascript-interview-exercises/
//01. what will be printed
(function() {
   var a = b = 5;
})();

console.log("01.." + b); //will print 5


//02. write newe method will repeat number of times
String.prototype.repeatify = String.prototype.repeatify || function(times) {
	   var str = '';

	   for (var i = 0; i < times; i++) {
	      str += this;
	   }

	   return str;
	};

console.log("02...");
console.log('hello '.repeatify(3));
	

//03 how this works in the javascript
var fullname = 'John Doe';
var obj = {
   fullname: 'Colin Ihrig',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname;
      }
   }
};

console.log("03..." + obj.prop.getFullname());   //Aurelio De Rosa

var test = obj.prop.getFullname;
console.log("03..." + test()); //John Doe

console.log("03..." + test.call(obj.prop)); //Aurelio De Rosa

