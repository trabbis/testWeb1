describe('GroupsViewDevicesEditCtrl', function() {
	var $rootScope, $scope, $state, $stateParams, $filter, $translate, $log, $timeout, dialogs, DeviceService, GroupService, Constants, UtilityFunctions, Messages;

	beforeEach(module('temsWeb.groups'));
	beforeEach(inject(function($controller) {
		ngTableParams = function () {};
		$scope = {$on : function() {}};
		$log = {debug : function() {}};
		$stateParams = {group : {}};
		$rootScope = {filterNone : {}};
		
		$controller('GroupsViewDevicesEditCtrl', {
			$rootScope : $rootScope,
			$scope : $scope,
			$state : $state,
			$stateParams : $stateParams,
			$filter : $filter,
			$translate : $translate,
			ngTableParams : ngTableParams,
			$log : $log,
			$timeout : $timeout,
			dialogs : dialogs,
			DeviceService : DeviceService,
			GroupService : GroupService,
			GroupService : GroupService,
			Constants : Constants,
			UtilityFunctions : UtilityFunctions,
			Messages : Messages
		});
		
	}));
	
	describe('deviceIdsSelectedAppendIfNotContains', function() {
		it('should add one more if new deviceId is added', function() {
			$scope.deviceIdsSelected = [];
			$scope.deviceIdsSelected.push(1);
			$scope.deviceIdsSelected.push(2);
			$scope.deviceIdsSelected.push(3);

			$scope.allSelectedDeviceCount = $scope.deviceIdsSelected.length;
			
			$scope.deviceIdsSelectedAppendIfNotContains(500);
			expect($scope.allSelectedDeviceCount).toBe(4);
		});
		
		it('should not add if existing deviceId is tried to be added', function() {
			$scope.deviceIdsSelected = [];
			$scope.deviceIdsSelected.push(1);
			$scope.deviceIdsSelected.push(2);
			$scope.deviceIdsSelected.push(3);

			$scope.allSelectedDeviceCount = $scope.deviceIdsSelected.length;
			
			$scope.deviceIdsSelectedAppendIfNotContains(2);
			expect($scope.allSelectedDeviceCount).toBe(3);
		});
	});
	
	describe('deviceIdsSelectedRemoveIfContains', function() {
		it('should return allSelectedDeviceCount two if trying to remove existing deviceId', function() {
			$scope.deviceIdsSelected = [];
			$scope.deviceIdsSelected.push(1);
			$scope.deviceIdsSelected.push(2);
			$scope.deviceIdsSelected.push(3);
			$scope.deviceIdsSelected.push(4);
			
			$scope.allSelectedDeviceCount = $scope.deviceIdsSelected.length;
			
			$scope.deviceIdsSelectedRemoveIfContains(2);
			expect($scope.allSelectedDeviceCount).toBe(3);
		});
		
		it('should not decrease allSelectedDeviceCount size if trying to remove non-existing deviceId', function() {
			$scope.deviceIdsSelected = [];
			$scope.deviceIdsSelected.push(1);
			$scope.deviceIdsSelected.push(2);
			$scope.deviceIdsSelected.push(3);
			$scope.deviceIdsSelected.push(4);
			
			$scope.allSelectedDeviceCount = $scope.deviceIdsSelected.length;
			
			$scope.deviceIdsSelectedRemoveIfContains(200);
			expect($scope.allSelectedDeviceCount).toBe(4);
		});
	});
	
	describe('onDeviceChBoxValuesChange', function() {
		it('should call deviceIdsSelectedAppendIfNotContains function if deviceId is checked in the UI', function() {
			$scope.deviceChBoxValues[1] = {value : true};
			spyOn($scope, 'deviceIdsSelectedAppendIfNotContains');
			spyOn($scope, 'deviceIdsSelectedRemoveIfContains');
			
			$scope.onDeviceChBoxValuesChange(1);
			expect($scope.deviceIdsSelectedAppendIfNotContains).toHaveBeenCalled();
		});
		
		it('should call deviceIdsSelectedRemoveIfContains function if deviceId is not checked in the UI', function() {
			$scope.deviceChBoxValues[1] = {value : false};
			spyOn($scope, 'deviceIdsSelectedAppendIfNotContains');
			spyOn($scope, 'deviceIdsSelectedRemoveIfContains');
			
			$scope.onDeviceChBoxValuesChange(1);
			expect($scope.deviceIdsSelectedRemoveIfContains).toHaveBeenCalled();
		});
	});
	
	describe('toggleSelectAll', function() {
		it('should set all deviceChBoxValues false if toggeled from checked to unchecked', function() {
			$scope.selectAllChBox = true;
			$scope.deviceChBoxValues = [];
			$scope.deviceChBoxValues.push({id : 1, value : true});
			$scope.deviceChBoxValues.push({id : 2, value : false});
			$scope.deviceChBoxValues.push({id : 3, value : false});

			$scope.tableParams = {filter : function() {}};
			
			spyOn($scope, 'onDeviceChBoxValuesChange');
			$scope.toggleSelectAll();
			
			for (var i =0; i < $scope.deviceChBoxValues.length; i++) {
				expect($scope.deviceChBoxValues[i].value).toBe(false);
			}
			expect($scope.onDeviceChBoxValuesChange.calls.count()).toEqual(3);
		});
		
		it('should set all deviceChBoxValues true if toggeled from unchecked to checked', function() {
			$scope.selectAllChBox = false;
			$scope.deviceChBoxValues = [];
			$scope.deviceChBoxValues.push({id : 1, value : true});
			$scope.deviceChBoxValues.push({id : 2, value : false});
			$scope.deviceChBoxValues.push({id : 3, value : false});
			$scope.deviceChBoxValues.push({id : 4, value : false});

			$scope.tableParams = {filter : function() {}};
			
			spyOn($scope, 'onDeviceChBoxValuesChange');
			$scope.toggleSelectAll();
			
			for (var i =0; i < $scope.deviceChBoxValues.length; i++) {
				expect($scope.deviceChBoxValues[i].value).toBe(true);
			}
			expect($scope.onDeviceChBoxValuesChange.calls.count()).toEqual(4);
		});
	});
	
	
});
