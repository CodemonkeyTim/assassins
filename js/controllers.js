var assassinsControllers = angular.module('assassinsControllers', []);

assassinsControllers.controller('mainCtrl',
	function ($scope, $routeParams, $location, ResourceService) {
		$scope.$root.activePage = "etusivu";
	}
);

assassinsControllers.controller('rulesCtrl',
	function ($scope, $routeParams, $location, ResourceService) {
		$scope.$root.activePage = "saannot";
	}
);

assassinsControllers.controller('weaponsCtrl',
	function ($scope, $routeParams, $location, ResourceService) {
		$scope.$root.activePage = "aseet";
	}
);

assassinsControllers.controller('signupCtrl',
	function ($scope, $routeParams, $location, $timeout, ResourceService) {
		$scope.$root.activePage = "ilmoittautuminen";
		
		$scope.name = "";
		$scope.email = "";
		$scope.password = "";
		$scope.nickname = "";
		$scope.routines = "";
		$scope.image = function () {
			return $("input[name='image']")[0].files[0];
		}
		
		$scope.showFailuerBox = false;
		$scope.showRedirectBox = false;
		
		$scope.signup = function () {
			var formData = new FormData();
			
			formData.append("name", $scope.name);
			formData.append('email', $scope.email);
			formData.append('password', $scope.password);
			formData.append('nickname', $scope.nickname);
			formData.append('routines', $scope.routines);
			formData.append('image', $scope.image());
			formData.append('action', 'signup');
			
			ResourceService.signup(formData).then(function (data) {
				console.log(data);
				
				data = JSON.parse(data);
				
				if (data.msg == 'signup success') {
					$scope.redirectToLogin();
				} else {
					$scope.showFailureBox = true;
				}
			});
			$scope.redirectToLogin = function () {
				$scope.showRedirectBox = true;
				$scope.showFailureBox = false;
				
				$timeout(function () {
					$location.path("/kirjautuminen");
				}, 3500);
			}
			
		}
		
	}
);

assassinsControllers.controller('loginCtrl',
	function ($scope, $routeParams, $location, $http, ResourceService) {
		$scope.$root.activePage = "kirjautuminen";
		
		$scope.email = "";
		$scope.password = "";
		
		$scope.showInvaliCredentialsBox = false;
		
		$scope.login = function () {
			data = {};
			data.action = "signin";
			data.email = $scope.email;
			data.password = $scope.password;
			
			$http({
				url: '/api/api.php',
				method: 'POST',
				data: data
			}).then(function (response) {
				if (response.data.msg == 'logged in') {
					localStorage.loggedIn = "true";
					$scope.$root.loggedIn = true;
					$location.path("/omasivu");
				} else {
					$scope.showInvaliCredentialsBox = true;
				}
			});
		}
	}
);

assassinsControllers.controller('ownpageCtrl',
	function ($scope, $routeParams, $location, ResourceService) {
		$scope.$root.activePage = "omasivu";
		
		$scope.name = "";
		$scope.nickname = "";
		$scope.routines = "";
		$scope.image = "/images/placeholder.jpg";
		
		$scope.msgHeader = "";
		$scope.msgBody = "";
		
		$scope.showNoTargetBox = false;
		
		ResourceService.getTargetData().then(function (data) {
			if (data.msg == "no target") {
				$scope.showNoTargetBox = true;
			}
			
			$scope.name = data.name;
			$scope.nickname = data.nickname;
			$scope.routines = data.routines;
			$scope.image = data.imageURL;
		});
		
		$scope.sendMessage = function () {
			var msg = {};
			msg.header = $scope.msgHeader;
			msg.body = $scope.msgBody;
			
			ResourceService.sendMessage(msg).then(function (data) {
				if (data.msg == "message saved") {
					$scope.showSaved = true;
				}
			});
		}
	}
);

assassinsControllers.controller('navbarCtrl',
	function ($scope, $routeParams, $location, $http, ResourceService) {
		$scope.logout = function () {
			var data = {};
			data.action = "signout";
			
			$http({
				url: '/api/api.php',
				method: 'POST',
				data: data
			}).then (function (response) {
				if (response.data.msg == "logged out") {
					localStorage.loggedIn = "false";
					$scope.$root.loggedIn = false;
				}
			});
		}
	}
);