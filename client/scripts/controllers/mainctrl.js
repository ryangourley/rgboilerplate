/*
 * mainctrl.js
 *
 * Author: Ryan Gourley
 * Date: 11 July 2014
 *
 * Functionality: Control The Main View
 *
 */

app.controller('MainCtrl', function ($scope, $resource, $simple) {
	//initialize variables
	$scope.list = ['AngularJS', 'Twitter Bootstrap CSS', 'NodeJS with ExpressJS', 'Server Running on Port 8080', 'View Routing Provided by Angular', 'CRUD Services Through Express', 'Form Verification for Client and Server'];
	$scope.CRUDHeaders =[];
	$scope.inputvar = '';
	$scope.tovar = '';
	$scope.main = $resource('/api/main');

	$scope.getit = function(){
		//use the injected service $simple to handle http get requests for a specific item
		$scope.CRUDHeaders.push('GET request from Angular');
		$simple.gettest({params:$scope.inputvar}).then(function(message){
			$scope.CRUDHeaders.push(message.message);
			$scope.CRUDHeaders.push(message.result);
		});
		$scope.inputvar='';
	};

	$scope.getall = function(){
		//use the injected service $simple to handle http get requests to return all items
		$scope.CRUDHeaders.push('GET request from Angular');
		$simple.getalltest().then(function(message){
			$scope.CRUDHeaders.push(message.message);
			$scope.CRUDHeaders.push(message.result);
		});
	};

	$scope.postit = function(){
		//use the injected service $simple to handle http post requests for a specific item
		$scope.CRUDHeaders.push('POST request from Angular');
		$simple.posttest({params:$scope.inputvar}).then(function(message){
			$scope.CRUDHeaders.push(message);
		});
		$scope.inputvar='';
	};

	$scope.putit = function(){
		//use the injected service $simple to handle http put requests to change a specific item
		$scope.CRUDHeaders.push('PUT request from Angular');
		$simple.puttest({params:[$scope.inputvar, $scope.tovar]}).then(function(message){
			$scope.CRUDHeaders.push(message);
		});
		$scope.inputvar='';
		$scope.tovar='';
	};

	$scope.deleteit = function(){
		//use the injected service $simple to handle http delete requests to delete a specific item
		$scope.CRUDHeaders.push('DELETE request from Angular');
		$simple.deletetest({params:{name: $scope.inputvar}}).then(function(message){
			$scope.CRUDHeaders.push(message);
		});
		$scope.inputvar='';
	};

});