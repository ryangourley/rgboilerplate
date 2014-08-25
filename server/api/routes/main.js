/*
 * main.js
 *
 * Author: Ryan Gourley
 * Date: 15 July 2014
 *
 * Functionality: CRUD routing for the main.html view
 *
 */


//start server and load modules
var express 			 = require('express'); //framework
var path 					 = require('path');  //resolve changing folders

module.exports = function(app) {

	//**************************************
	//LOCAL SERVER VARS AND HELPER FUNCTIONS
	//**************************************
	var test = ['Gandalf', 'Saruman', 'Frodo', 'Aragorn'];
	function genString(){
    //Purpose: Generate a string with all the list items
    //Input: null
    //Output: a string containing all the list items
		var str = '';
		for (item in test){
			var additem = String(test[item]);
			//MAKE PRETTY THE LIST
			if (item == test.length-1){
				str = str.concat(additem);
			}
			else{
				str = str.concat(additem+', ');
			}
		}
		return str;
	}

	function isInTest(search){
    //Purpose: Searches to see if an item is in our test array
    //Input: search, a string to test for
    //Output: boolean
		for (item in test){
  		query = test[item];
  		if (search === query){
  			return true;
  		}
    }
    return false;
	}

	function getIndex(search){
    //Purpose: Searches to see if an item is in our test array and retrieves its index
    //Input: search, a string to test for
    //Output: index if item is in array, -1 otherwise
		for (item in test){
  		query = test[item];
  		if (search === query){
  			return item;
  		}
    }
    return -1;
	}
	

  //**************************************
  //ROUTING
  //**************************************
  app.get('/api/main/', function(req, res, next) {
    //Main route to access the information stored in the array test
    var search = req.query.params;
    if (typeof search == 'undefined'){
    	//we want all items
    	res.send(200, {message:'GET response handled by Node', result:'These items are in the list: '+genString()});
	    	res.end();
    }
    else{
    	//WE ARE LOOKING FOR AN ITEM IN THE LIST
    	if (isInTest(search)){
    		res.send(200, {message:'GET response handled by Node', result:'Item was in list'});
		    	res.end();
		    	return;
    	}
    	//ITEM WAS NOT IN LIST
    	res.send(200, {message:'GET response handled by Node', result:'Item was NOT in list'});
    	res.end();
    }
  });


  app.post('/api/main/', function(req, res, next) {
    //Main route to add a new item in the list;
    var search = req.body.params;
    if (isInTest(search)){
    	//item is already in list so there is no reason to add it again
    	res.send(200, {message:'POST not accepted & handled by Node'});
    	res.end();
    	return;
    }
    //add item to list
    test.push(req.body.params);
    	res.send(200, {message:'POST accepted & handled by Node'});
    	res.end();
    
  });

  app.put('/api/main/', function(req, res, next) {
    //Main route to replace one item in the list with another
  	var search = req.body.params;
  	var index = getIndex(search[0]);
    if (index !== -1){
    	//we will update the list
    	test[index] = search[1];
    	res.send(200, {message:'PUT accepted & handled by Node'});
    	res.end();
    	return;
    }
    res.send(200, {message:'PUT not accepted & handled by Node'});
    res.end();    
  });

  app.delete('/api/main/', function(req, res, next) {
  	//Main route to delete an item from the list
    var search = req.query.name;
  	var index = getIndex(search);
    if (index !== -1){
    	//item is in list, so delete
    	test.splice(index, 1);
    	res.send(200, {message:'DELETE accepted & handled by Node'});
    	res.end();
    	return;
    }
    //add item to list
    test.push(req.body.params);
    	res.send(200, {message:'DELETE not accepted & handled by Node'});
    	res.end();
    
  });


	app.use(function(err, req, res, next) {
    //Error routing - if a route is called that does not exist it will throw this error
	  console.error(err.stack);
	  res.send(500, { message: err.message });
	});

  //resolve path for front end to load javascript correctly
	app.use(express.static(path.resolve('../client')));


	//sends a request to load the index.html page within the same folder as the path
	app.get('/', function(req, res, next) {
	    res.sendfile(path.resolve('./index.html')); //angular takes care of view routing
	    res.end();
	});
};