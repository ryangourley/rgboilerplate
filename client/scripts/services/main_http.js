/*
 * main_http.js
 *
 * Author: Ryan Gourley
 * Date: 11 July 2014
 *
 * Functionality: Handle the http requests
 * Use In Controller: $simple.<function>.then(function(response){
 *	dosomething(response);
 *	}
 *
 */

app.factory('$simple', ['$http', function($http){
	return {
		gettest: function(getitem) {
			var promise = $http.get('/api/main/', {params:getitem}).then(function(response){
				//make any edits to response.data.message here
				return response.data;
			})
			return promise;
		}, //gettest

		getalltest: function(getitem) {
			var promise = $http.get('/api/main/').then(function(response){
				//make any edits to response.data.message here
				return response.data;
			})
			return promise;
		}, //getalltest

		posttest: function(postitem) {
			var promise = $http.post('/api/main/', postitem).then(function(response){
				//make any edits to response.data.message here
				return response.data.message;
			})
			return promise;
		}, //posttest

		puttest: function(putitem) {
			var promise = $http.put('/api/main/', putitem).then(function(response){
				//make any edits to response.data.message here
				return response.data.message;
			})
			return promise;
		}, //puttest

		deletetest: function(deleteitem) {
			console.log(deleteitem);
			var promise = $http.delete('/api/main/', deleteitem).then(function(response){
				//make any edits to response.data.message here
				return response.data.message;
			})
			return promise;
		}, //posttest

	};
	
}])