//01. Define first function
$rootScope.retrievingUserAllowedGroups = function() {
        	var deferred = $q.defer();
        	var service = null;
        	//Primary User or Admin user will have an access to the all Groups
        	if (($rootScope.userProfile.id === $rootScope.organization.primaryUserId) ||
        		$rootScope.userProfile.organizationId === 1) {
        		service = GroupService.getGroups($rootScope.organization.id);
        	} else {
        		service = GroupService.getUserGroups($rootScope.userProfile);
        	}
        	
        	UtilityFunctions.callPromise(service, function (response) {
        		$rootScope.userAllowedGroups = response.data.data.groups;
        		deferred.resolve({message:"pocessed successfully"});
        	}, $scope, function() {
        		deferred.reject({message:"calling retrievingUserAllowedGroups() failed."});
        	});
        	
        	return deferred.promise;
        };

//02. when you execute, make sure that first function is called first. 
// And then call. 
        var callLoadTerminalStatusFunctiuon = function() {
        	$rootScope.retrievingUserAllowedGroups().then(
        			function() {
                        $scope.loadTerminalStatusData();
        			},
        			function(data) {
        				$log.warn(data);
        			}
        	);
        };
        
    	callLoadTerminalStatusFunctiuon();
        

    	