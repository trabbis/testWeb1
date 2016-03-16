describe('usersListController', function() {
	
	var $controller;
    var $rootScope, scope, controller, $state, $stateParams, dialogs={},
	UserService, Constants, $translate, UtilityFunctions;
    
	beforeEach(module('temsWeb.users'));
	beforeEach(inject(function($controller) {
        scope = {};
        
        //TODO same
        $rootScope = {organization:{}, isServiceAdminUser :function() {}};
//    	$rootScope.isServiceAdminUser = function () {
//    		return false;
//    	};

        
        //TODO same
        UtilityFunctions = {callPromise : function() {}};
//    	UtilityFunctions.callPromise = function() {
//    	};
        
        
        //TODO same
        UserService = {getUsers : function() {}};
//    	UserService.getUsers = function() {
//    	};
    	
		dialogs.confirm = function() {
			return {result : {then : function() {}}};
		};
        
        //TODO same
		$translate = {instant : function() {}};
//		$translate.instant = function() {
//		};

        
        controller = $controller('UsersListCtrl', 
        		{$rootScope: $rootScope,
        	$scope: scope,
        	$state: $state,
        	$stateParams: $stateParams,
			dialogs: dialogs,
			UserService: UserService,
			Constants: Constants,
			$translate: $translate,
			UtilityFunctions: UtilityFunctions
        })
    }));

	describe('shouldHideDeleteLink()', function() {
	    it("should hide delete link if logged in  user tries to access their own profile", function () {
	    	$rootScope.userProfile = {id : 2};
	    	var user = {id : 2};
	    	$rootScope.organization = {};
	    	
	    	expect(scope.shouldHideDeleteLink(user)).toBe(true);
	    });
	    
	    it("should hide delete link if logged in user tries to access org primary user", function () {
	    	$rootScope.userProfile = {id : 2};
	    	var user = {id : 3};
	    	$rootScope.organization = {primaryUserId : 3};
	    	
	    	expect(scope.shouldHideDeleteLink(user)).toBe(true);
	    });
	});
	
	describe('shouldHideEditLink()', function() {
		it('should return turn if logged in user(non-admin) tries to access org primary user profile ', function() {
	    	$rootScope.userProfile = {id : 2};
	    	
	        //TODO same
	    	spyOn($rootScope, "isServiceAdminUser").and.callFake(function() {
	    		return false;
	    	});
//	    	spyOn($rootScope, "isServiceAdminUser").and.returnValue(false);
	    	
	    	
	    	var user = {id : 1};
	    	$rootScope.organization = {primaryUserId : 1};
			
	    	expect(scope.shouldHideEditLink(user)).toBe(true);
		});
		
		it('should return false if logged in user(admin) tries to access org primary user profile ', function() {
	    	$rootScope.userProfile = {id : 2};
	    	spyOn($rootScope, "isServiceAdminUser").and.returnValue(true);
	    			
	    	var user = {id : 1};
	    	$rootScope.organization = {primaryUserId : 1};
	    	
	    	expect(scope.shouldHideEditLink(user)).toBe(false);
		});
	});
	
	describe('others', function() {
		it('onUserDelete() can be called', function() {
			var user = null;
			spyOn(scope, "onUserDelete").and.callThrough();
			scope.onUserDelete(user);
			
			expect(scope.onUserDelete).toHaveBeenCalled();
		});
		
		it('loadingUsers() can be called', function() {
			loadingUsers = jasmine.createSpy("loadingUsers");
			loadingUsers();
			
	        //TODO same
			expect(loadingUsers).toHaveBeenCalled();
//			expect(loadingUsers.calls.any()).toBe(true);
		});
		
		
	});
	
	
	
});


