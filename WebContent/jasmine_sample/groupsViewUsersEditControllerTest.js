describe('GroupsViewUsersEditCtrl', function() {

	var $rootScope, $scope, $state, $stateParams, 
	$log, $filter, ngTableParams, dialogs, GroupService, UserService, Constants, $translate, UtilityFunctions;
	var origizalSize;
	
	beforeEach(module('temsWeb.groups'));
	
	beforeEach(inject(function($controller) {
		
		$scope = {$on : function() {}};
		$log = {debug : function() {}};
		$stateParams = {group :{}};
		
		UserService = {getUsers : function() {}};
		$rootScope = {organization : {}};
		UtilityFunctions = {callPromise : function() {}};
		ngTableParams = function() {};
		GroupService = {saveGroupUsers : function() {}};
		
		$controller('GroupsViewUsersEditCtrl', {
			$rootScope : $rootScope,
			$scope : $scope,
			$state : $state,
			$stateParams : $stateParams,
			$log : $log,
			$filter : $filter,
			ngTableParams : ngTableParams,
			dialogs : dialogs,
			GroupService : GroupService,
			UserService : UserService,
			Constants : Constants,
			$translate : $translate,
			UtilityFunctions : UtilityFunctions
		});
		
		
	}));

	describe('getOnlygAvailableUsers', function() {
		it('should return all users if nothing selected under $scope.selectedGroup.users collection', function() {
			$scope.allUsers = [];
			$scope.allUsers.push({id:1, loginId:"user1"});
			$scope.allUsers.push({id:2, loginId:"user2"});
			$scope.allUsers.push({id:3, loginId:"user3"});
			$scope.allUsers.push({id:4, loginId:"user4"});
			
			$scope.selectedGroup.users = [];

			$scope.getOnlygAvailableUsers();
			expect($scope.availableUsers.length).toBe($scope.allUsers.length);
		});
		
		it('should return three users which is not selected yet under $scope.selectedGroup.users collection', function() {
			$scope.allUsers = [];
			$scope.allUsers.push({id:1, loginId:"user1"});
			$scope.allUsers.push({id:2, loginId:"user2"});
			$scope.allUsers.push({id:3, loginId:"user3"});
			$scope.allUsers.push({id:4, loginId:"user4"});
			
			$scope.selectedGroup.users = [];
			$scope.selectedGroup.users.push({id:1, loginId:"user1"});

			$scope.getOnlygAvailableUsers();
			expect($scope.availableUsers.length).toBe($scope.allUsers.length - $scope.selectedGroup.users.length);
		});
		
	});
	
	describe('toggleAvailableSelectUnselectAll', function() {
		it('will make all the users selected when toggled from non selected option', function() {
			$scope.toggleAvailableSelectUnselectAllStatus = false;
			$scope.availableUsers = [];
			$scope.availableUsers.push({id:1, selected:false});
			$scope.availableUsers.push({id:2, selected:true});
			$scope.availableUsers.push({id:3, selected:false});
			
			$scope.toggleAvailableSelectUnselectAll();
			
			_.each($scope.availableUsers, function(user) {
				expect(user.selected).toBe(true);
			});
		});
		
		it('will make all the users selected when toggled from non selected option', function() {
			$scope.toggleAvailableSelectUnselectAllStatus = false;
			$scope.availableUsers = [];
			$scope.availableUsers.push({id:1, selected:false});
			$scope.availableUsers.push({id:2, selected:true});
			$scope.availableUsers.push({id:3, selected:false});
			
			$scope.toggleAvailableSelectUnselectAll();
			
			_.each($scope.availableUsers, function(user) {
				expect(user.selected).toBe(true);
			});
		});
		
	});
	
	describe('onAddToSelected', function() {
		it('should not add any user to $scope.selectedUsers collection if nothing is selected from $scope.availableUsers', function() {
			$scope.availableUsers = [];
			$scope.availableUsers.push({id:1, selected:false, firstName : "firstName1"});
			$scope.availableUsers.push({id:2, selected:false, firstName : "firstName2"});
			$scope.availableUsers.push({id:3, selected:false, firstName : "firstName3"});
			origizalSize = $scope.availableUsers.length;
			
			$scope.selectedUsers = [];
			
			$scope.availableUsersTableParams = {reload :function(){}};
			$scope.selectedUsersTableParams = {reload :function(){}};
			
			$scope.onAddToSelected();
			expect($scope.selectedUsers.length).toBe(0);
			expect($scope.availableUsers.length).toBe(origizalSize - $scope.selectedUsers.length);
		});
		
		it('should add one user to $scope.selectedUsers collection while reducing one from $scope.availableUsers', function() {
			$scope.availableUsers = [];
			$scope.availableUsers.push({id:1, selected:false, firstName : "firstName1"});
			$scope.availableUsers.push({id:2, selected:false, firstName : "firstName2"});
			$scope.availableUsers.push({id:3, selected:true, firstName : "firstName3"});
			origizalSize = $scope.availableUsers.length;
			
			$scope.selectedUsers = [];
			
			$scope.availableUsersTableParams = {reload :function(){}};
			$scope.selectedUsersTableParams = {reload :function(){}};
			
			$scope.onAddToSelected();
			expect($scope.selectedUsers.length).toBe(1);
			expect($scope.availableUsers.length).toBe(origizalSize - $scope.selectedUsers.length);
		});
		
		it('should add all user(s) to $scope.selectedUsers collection if all user(s) were selected from $scope.availableUsers', function() {
			$scope.availableUsers = [];
			$scope.availableUsers.push({id:1, selected:true, firstName : "firstName1"});
			$scope.availableUsers.push({id:2, selected:true, firstName : "firstName2"});
			$scope.availableUsers.push({id:3, selected:true, firstName : "firstName3"});
			origizalSize = $scope.availableUsers.length;
			
			$scope.selectedUsers = [];
			
			$scope.availableUsersTableParams = {reload :function(){}};
			$scope.selectedUsersTableParams = {reload :function(){}};
			
			$scope.onAddToSelected();
			expect($scope.selectedUsers.length).toBe(3);
			expect($scope.availableUsers.length).toBe(origizalSize - $scope.selectedUsers.length);
		});
	});
	
	describe('onRemoveFromSelected', function() {
		it('should not add any user to $scope.availableUsers collection if nothing is selected from $scope.selectedUsers', function() {
			$scope.selectedUsers = [];
			$scope.selectedUsers.push({id:1, selected:false, firstName : "firstName1"});
			$scope.selectedUsers.push({id:2, selected:false, firstName : "firstName2"});
			$scope.selectedUsers.push({id:3, selected:false, firstName : "firstName3"});
			origizalSize = $scope.selectedUsers.length;
			
			$scope.availableUsers = [];
			
			$scope.availableUsersTableParams = {reload :function(){}};
			$scope.selectedUsersTableParams = {reload :function(){}};
			
			$scope.onRemoveFromSelected();
			expect($scope.availableUsers.length).toBe(0);
			expect($scope.selectedUsers.length).toBe(origizalSize - $scope.availableUsers.length);
		});
		
		it('should add all user(s) to $scope.availableUsers collection if all user(s) were selected from $scope.selectedUsers', function() {
			$scope.selectedUsers = [];
			$scope.selectedUsers.push({id:1, selected:true, firstName : "firstName1"});
			$scope.selectedUsers.push({id:2, selected:true, firstName : "firstName2"});
			$scope.selectedUsers.push({id:3, selected:true, firstName : "firstName3"});
			origizalSize = $scope.selectedUsers.length;
			
			$scope.availableUsers = [];
			
			$scope.availableUsersTableParams = {reload :function(){}};
			$scope.selectedUsersTableParams = {reload :function(){}};
			
			$scope.onRemoveFromSelected();
			expect($scope.availableUsers.length).toBe(3);
			expect($scope.selectedUsers.length).toBe(origizalSize - $scope.availableUsers.length);
		});
		
	});
	
	describe('onSaveGroupUsers', function() {
		it('should pass empty userId(s) if there is zero selectedUsers', function() {
			$scope.selectedUsers = [];

			$scope.selectedGroup = {id : 1};
			spyOn(GroupService, "saveGroupUsers");

			$scope.onSaveGroupUsers();
			expect(GroupService.saveGroupUsers).toHaveBeenCalledWith($scope.selectedGroup, []);
		});
		
		it('should pass three userId(s) if there are three users in the selectedUsers collection', function() {
			$scope.selectedUsers = [];
			$scope.selectedUsers.push({id:1, firstName : "firstName1"});
			$scope.selectedUsers.push({id:2, firstName : "firstName2"});
			$scope.selectedUsers.push({id:3, firstName : "firstName3"});

			$scope.selectedGroup = {id : 1};
			spyOn(GroupService, "saveGroupUsers");

			$scope.onSaveGroupUsers();
			expect(GroupService.saveGroupUsers).toHaveBeenCalledWith($scope.selectedGroup, [1,2,3]);
		});
		
	});
	
	
});
