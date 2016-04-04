"use strict";

// You can run this

// Create a module
var hippo = angular.module('hippo', []);

// Register an object provider
hippo.provider('awesome', {
    $get: function() {
        return 'awesome data';
    }
});

// Get the injector (this happens behind the scenes in angular apps)
var injector = angular.injector(['hippo', 'ng']);

// Call a function with dependency injection
injector.invoke(function(awesome) {
    console.log('awesome == ' + awesome);
});
