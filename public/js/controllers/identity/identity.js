define([
	'app'
], function(app) {
	app.registerController('IdentityCtrl', ['$scope', '$state', function($scope, $state) {
		$scope.delete = function () {
			$scope.identity.delete();
			$('#mvrDisplayModal1').hide();
            $('.modal-backdrop').hide();
			$state.transitionTo('credentials.list');
		}
	}]);
});