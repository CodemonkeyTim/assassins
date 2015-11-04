assassinsApp.factory('ResourceService', function($http, $q) {
	return {
		signup: function (formData) {
			return $q(function (resolve, reject) {
				$.ajax({
					url: '/api/api.php',
					type: 'POST',
					data: formData,
					processData: false,  // tell jQuery not to process the data
					contentType: false,  // tell jQuery not to set contentType
					success: function (response) {
						resolve(response);
					},
					error: function (req, status, message) {
						resolve("duh");
					}
				});
			});
		},
		getTargetData: function () {
			var data = {};
			data.action = "getTargetData";
			
			return $http({
				url: '/api/api.php',
				method: 'POST',
				data: data
			}).then(function (response) {
				return response.data;
			}).then(function(error) {
				return error;
			});
		},
		sendMessage: function (msg) {
			var data = {};
			data.msg = msg;
			data.action = 'saveMessage';
			
			return $http({
				url: '/api/api.php',
				method: 'POST',
				data: data
			}).then(function (response) {
				return response.data
			});
		}
	}
});