describe('terminalAlertTableWidget', function() {

	var compile, scope, $rootScope, directiveElem;
	
	beforeEach(module('temsWeb.appTerminalAlertTableWidget'));
	beforeEach(module('src/common/directives/widgets/terminalAlertTable/terminalAlertTable.widget.tpl.html'));
	
	beforeEach(module(function ($provide) {
	    $provide.provider('dialogs', function () { 
	        this.$get = function () {
	            return {};
	        }
	    });
	    $provide.provider('Constants', function () { 
	        this.$get = function () {
	            return {};
	        }
	    });
	    $provide.provider('DashBoardService', function () { 
	        this.$get = function () {
	            return {getAlertSummary : function() {}};
	        }
	    });
	    $provide.provider('UtilityFunctions', function () { 
	        this.$get = function () {
	            return {callPromise : function() {}};
	        }
	    });
	}));
	
	beforeEach(function() {
		inject(function($compile, $rootScope) {
			compile = $compile;
			scope = $rootScope.$new();
			
			scope.widget = 	{
		            "id": "wdgId",
		            "class": "widgetClassName",
		            "staticCfg": {
		              "timeUnit": "day",
		              "timeUnitCount": 7
		            },
		            "dynamicCfg": {
		              "deviceUIds": [],
		              "groupIds": []
		            }
		          };
			
			scope.runtimeData = {anydata : {}};
			scope.onSaveDashboard = jasmine.createSpy('parentFunction');
			
			$rootScope = $rootScope;
			$rootScope.findGroup = function() {};

		});
		
		directiveElem = getCompiledElement();
	});
	
	function getCompiledElement() {
		var element = angular.element('<div terminal-alert-table-widget="" view="view" widget="widget" runtime-data="widgetsRuntimeWorkspace[widget.id]" edit-mode="dashboardEditMode" on-save-dashboard="onSaveDashboard(true)" class="ng-scope ng-isolate-scope"><div class="widget">');
		var compiledElement = compile(element)(scope);
		scope.$digest();
		
		return compiledElement;
	}
	
	describe('iscolateScope', function() {
		it('should be able to update scope widget class value', function() {
			isolateScope = directiveElem.isolateScope();
			var oldData = scope.widget['class'];
			isolateScope.widget['class'] = "newWidgetClass";
			var newData = isolateScope.widget['class'];
			scope.$digest();
			
			expect(oldData).not.toEqual(newData);
		});

		it('should be able to modify runtimeData', function() {
			isolateScope = directiveElem.isolateScope();
			var oldData = scope.runtimeData;
			isolateScope.runtimeData = {anydata : {}};
			_.extend(isolateScope.runtimeData, {addtionalData : {}});
			var newData = isolateScope.runtimeData;
			isolateScope.$digest();
			
			expect(oldData).not.toEqual(newData);
		});

		it('should treat onSaveDashboard as parent function', function() {
			isolateScope = directiveElem.isolateScope();
			
			isolateScope.onSaveDashboard();
			expect(scope.onSaveDashboard).toHaveBeenCalled();
			expect(typeof(isolateScope.onSaveDashboard)).toEqual('function');
		});

	});
	
	describe('stopLoadingData', function() {
		it('should cancel $timout if loadDataUpdateTimer is set earlier', inject(function($timeout) {
			isolateScope = directiveElem.isolateScope();
			
			isolateScope.loadDataUpdateTimer = {};
			spyOn($timeout, 'cancel');
			isolateScope.stopLoadingData();
			
			expect($timeout.cancel).toHaveBeenCalled();
		}));
		
		it('do not need $timeout cancel if loadDataUpdateTimer is not set earlier', inject(function($timeout) {
			isolateScope = directiveElem.isolateScope();
			
			isolateScope.loadDataUpdateTimer = null;
			spyOn($timeout, 'cancel');
			isolateScope.stopLoadingData();
			
			expect($timeout.cancel).not.toHaveBeenCalled();
		}));
	});
	
	describe('checkIfRefreshRequired', function() {
		it('should call $timeout if widdget.staticCfg.refresh value is greater than 0', inject(function($timeout) {
			isolateScope = directiveElem.isolateScope();
			isolateScope.loadDataUpdateTimer = null;
			isolateScope.widget = {staticCfg : {refresh : 1}};
			spyOn(isolateScope, 'stopLoadingData');

			isolateScope.checkIfRefreshRequired(isolateScope.widget);
			$timeout.flush();

			expect(isolateScope.loadDataUpdateTimer).not.toBeFalsy();
		}));
		
		it('should not call $timeout if widdget.staticCfg.refresh value is not greater than 0', inject(function($timeout) {
			isolateScope = directiveElem.isolateScope();
			isolateScope.loadDataUpdateTimer = null;
			isolateScope.widget = {staticCfg : {refresh : 0}};
			spyOn(isolateScope, 'stopLoadingData');

			isolateScope.checkIfRefreshRequired(scope.widget);
			expect(isolateScope.loadDataUpdateTimer).toBeFalsy();
		}));
		
	});
	
	
});
