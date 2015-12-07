define([
	'app'
], function(app) {
	app.registerController('UserCtrl', ['$scope', '$state', function($scope, $state) {
		$scope.delete = function () {
			$scope.user.delete();
            $('.modal-backdrop').hide();
			$state.transitionTo('users.list');
		}
	}]);
});
