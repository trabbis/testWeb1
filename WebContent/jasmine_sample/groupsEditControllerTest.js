describe('GroupsEditCtrl', function() {
	
    var $rootScope, scope, $state, $stateParams, dialogs, 
    GroupService, Constants, OrgService, $upload, $timeout, $translate, UtilityFunctions;
	
	
	beforeEach(module('temsWeb.groups'));
	beforeEach(inject(function($controller) {
		scope = {};
		$rootScope = {organization :{}};
		$state = {current : {data : {}}};
		$stateParams = {group : {}};
		GroupService = {updateGroup : function() {}, saveGroup : function() {}, deleteGroupAvatar :function() {}};

		UtilityFunctions = {callPromise : function() {}};
		Constants = {groupTypes : {}};
		
		$controller('GroupsEditCtrl', 
				{$rootScope : $rootScope,
				$scope : scope,
				$state : $state,
				$stateParams : $stateParams,
				dialogs : dialogs,
				GroupService : GroupService,
				Constants : Constants,
				OrgService : OrgService,
				$upload : $upload,
				$timeout : $timeout,
				$translate : $translate,
				UtilityFunctions : UtilityFunctions
			});
		
	}));
	
	describe('onSaveGroup', function() {
		it('should call GroupService.saveGroup() when creating new group', function() {
			scope.selectedGroup = {id : -1};
        	spyOn(GroupService, "updateGroup");
        	spyOn(GroupService, "saveGroup");
        	
        	scope.onSaveGroup();
			expect(GroupService.saveGroup).toHaveBeenCalled();
		});
		
		it('should call GroupService.updateGroup() when editing existing group', function() {
			scope.selectedGroup = {id : 22};
        	spyOn(GroupService, "updateGroup");
        	spyOn(GroupService, "saveGroup");
        	
        	scope.onSaveGroup();
			expect(GroupService.updateGroup).toHaveBeenCalled();
		});
		
	});
	
	describe('checkIfEditingExistingGroup', function() {
		it('should scope.selectedGroup be matched with stateParams.group if trying to edit existing gorup', function() {
			$stateParams.group = {id : 22, name : "group22"};
        	scope.checkIfEditingExistingGroup();
			expect(scope.selectedGroup.id).toBe(22);
			expect(scope.selectedGroup.name).toBe("group22");
		});
		
		it('should scope.selectedGroup.id be -1 when creating new gorup', function() {
			$stateParams.group = null;
        	scope.checkIfEditingExistingGroup();
			expect(scope.selectedGroup.id).toBe(-1);
		});
		
	});
	
	describe('onDeleteAvatar', function() {
		it('should call GroupService.deleteGroupAvatar() if called', function() {
			spyOn(GroupService, "deleteGroupAvatar");
			scope.onDeleteAvatar();
			expect(GroupService.deleteGroupAvatar).toHaveBeenCalled();
		});
	});
	
	describe('updateAvatarUrl', function() {
		it('should generate avatarUrl which contains selectedGroup.id in it', function() {
			scope.selectedGroupFinal = {avatarExist : true};
			scope.selectedGroup = {id : 12345};
			scope.updateAvatarUrl();
			expect(scope.avatarUrl).toMatch("12345");
		});
		
		it('should generate avatarUrl which contains \'default.64x64.png\' in it', function() {
			scope.selectedGroupFinal = null;
			scope.updateAvatarUrl();
			expect(scope.avatarUrl).toMatch("default.64x64.png");
		});
		
	});
	
});
