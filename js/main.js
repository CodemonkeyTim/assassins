var assassinsApp = angular.module('assassinsApp', [
	'ngRoute',
	'assassinsControllers'
]);

//Setting up routes
assassinsApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
		.when('/etusivu', {
			templateUrl: 'templates/main.html',
			controller: 'mainCtrl'
		})
		.when('/saannot', {
			templateUrl: 'templates/rules.html',
			controller: 'rulesCtrl'
		})
		.when('/aseet', {
			templateUrl: 'templates/weapons.html',
			controller: 'weaponsCtrl'
		})
		.when('/ilmoittautuminen', {
			templateUrl: 'templates/signup.html',
			controller: 'signupCtrl'
		})
		.when('/kirjautuminen', {
			templateUrl: 'templates/login.html',
			controller: 'loginCtrl'
		})
		.when('/omasivu', {
			templateUrl: 'templates/ownpage.html',
			controller: 'ownpageCtrl'
		})
		.otherwise({
			redirectTo: '/etusivu'
		});
	}
]).run(function ($rootScope) {
	if (localStorage.loggedIn == "true") {
		$rootScope.loggedIn = true;
	} else {
		$rootScope.loggedIn = false;
	}
});