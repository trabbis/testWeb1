describe('GroupsListCtrl', function() {
	
    var $rootScope, scope, $state, dialogs, $stateParams,
    GroupService, Constants, $translate, UtilityFunctions;
	
	beforeEach(module('temsWeb.groups'));
	beforeEach(inject(function($controller) {
		scope = {};
		$rootScope = {organization : {}};
		GroupService = {getGroups : function() {}, deleteGroup : function() {}};
		UtilityFunctions = {callPromise :function() {}};
        dialogs = {confirm : function() {
			return {result : {then : function() {}}}}};
		$translate = {instant : function() {}};
		
		$controller('GroupsListCtrl',
				{'$rootScope' : $rootScope,
				'$scope' : scope,
				'$state' : $state,
				'$stateParams' : $stateParams,
				'dialogs' : dialogs,
				'GroupService' : GroupService,
				'Constants' : Constants,
				'$translate' : $translate,
				'UtilityFunctions' : UtilityFunctions}
		);
	}));
	
	describe('loadingGroups', function() {
		it('can be called without error', function() {
			expect(scope.loadingGroups).not.toThrow;
		});
	});
	
	describe('onGroupDelete', function() {
		it('can be called without error', function() {
			var group = {};
			//TODO is there any ways whether GroupService.deleteGroup() is checked?
			expect(scope.onGroupDelete(group)).not.toThrow;
		});
	});
	
});
