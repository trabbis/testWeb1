describe('GroupsViewUsersListCtrl', function() {
	var $rootScope, $scope, $state, $stateParams, $log, $timeout, dialogs, GroupService, Constants, $translate, UtilityFunctions;
	
	beforeEach(module('temsWeb.groups'));
	beforeEach(inject(function($controller) {
		
		$scope = {$on : function() {}};
		$log = {debug : function() {}};
		$stateParams = {group : null};
		dialogs = {confirm : function() {
								return {result : {then : function(){}}};
		}};
		$translate = {instant : function() {}};
		
		GroupService = {getGroupUsers : function() {}};
		UtilityFunctions = {callPromise : function() {}};
		
		$controller('GroupsViewUsersListCtrl', {
			$rootScope : $rootScope,
			$scope : $scope,
			$state : $state,
			$stateParams : $stateParams,
			$log : $log,
			$timeout : $timeout,
			dialogs : dialogs,
			GroupService : GroupService,
			Constants : Constants,
			$translate : $translate,
			UtilityFunctions : UtilityFunctions
		});
		
	}));
	
	describe('getGroupUsers', function() {
		it('can be called without error', function() {
			spyOn(UtilityFunctions, "callPromise");
			$scope.getGroupUsers();
			expect(UtilityFunctions.callPromise).not.toThrowError();
			
		});
	});
	
	describe('onDeleteGroupUser', function() {
		it('can be called without error', function() {
			var user = {};
			$scope.onDeleteGroupUser(user);
		});
	});
	
	
});
