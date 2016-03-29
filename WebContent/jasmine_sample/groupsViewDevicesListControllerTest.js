describe('GroupsViewDevicesListCtrl', function() {
	
	var $rootScope, $scope, $state, $stateParams, $filter, $translate, $log, $timeout, dialogs, GroupService, Constants, UtilityFunctions, DeviceTypeService, Messages;
	
	beforeEach(module('temsWeb.groups'));
	beforeEach(inject(function($controller) {
		ngTableParams = function() {};
		
		$scope = {$on :function() {}};
		$log = {debug : function() {}};
		$stateParams = {group : {}};
		$rootScope = {filterNone : {}};
		UtilityFunctions = {callPromise : function() {}};
		DeviceTypeService = {getDeviceTypesList : function() {}};
		Messages = {messages : null};

		$controller('GroupsViewDevicesListCtrl', {
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
			GroupService : GroupService,
			Constants : Constants,
			UtilityFunctions : UtilityFunctions,
			DeviceTypeService : DeviceTypeService,
			Messages : Messages
		});
		
	}));
	
	describe('setDeviceTypeIdNameArray', function() {
		it('should return deviceType1 in the 1st element of the deviceTypeIdNameArray array',function() {
		    $scope.deviceTypeIdNameArray = [];
			$rootScope.deviceTypes = [];
			$rootScope.deviceTypes.push({id : 1, name : "deviceType1"});
			$rootScope.deviceTypes.push({id : 2, name : "deviceType2"});
			$rootScope.deviceTypes.push({id : 3, name : "deviceType3"});

			$scope.setDeviceTypeIdNameArray();
			expect($scope.deviceTypeIdNameArray[1]).toBe("deviceType1");
		});
		
		it('should return deviceType10 in the 10th element of the deviceTypeIdNameArray array',function() {
		    $scope.deviceTypeIdNameArray = [];
			$rootScope.deviceTypes = [];
			$rootScope.deviceTypes.push({id : 1, name : "deviceType1"});
			$rootScope.deviceTypes.push({id : 2, name : "deviceType2"});
			$rootScope.deviceTypes.push({id : 4, name : "deviceType4"});
			$rootScope.deviceTypes.push({id : 10, name : "deviceType10"});

			$scope.setDeviceTypeIdNameArray();
			expect($scope.deviceTypeIdNameArray[10]).toBe("deviceType10");
		});
		
	});
	
	describe('translateDeviceState', function() {
		it('should return DescriptionA when asked for users.device_state.A', function() {
			Messages.messages = {'users.device_state.A' : 'DescriptionA'};
			
			var description = $scope.translateDeviceState('A');
			expect(description).toBe('DescriptionA');
		});
		
		it('should return DescriptionB when asked for users.device_state.B', function() {
			Messages.messages = {'users.device_state.A' : 'DescriptionA'};
			_.extend(Messages.messages, {'users.device_state.B' : 'DescriptionB'});
			_.extend(Messages.messages, {'users.device_state.C' : 'DescriptionC'});
			_.extend(Messages.messages, {'users.device_state.D' : 'DescriptionD'});
			
			var description = $scope.translateDeviceState('B');
			expect(description).toBe('DescriptionB');
		});
		
	});
	
});
