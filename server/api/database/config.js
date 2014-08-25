/*
 * config.js
 *
 * Author: Ryan Gourley
 * Date: 8 July 2014
 *
 * Functionality: Store the configuration string for the database connections
 *
 */

function config(){
	return'db://user:port/table';
};

exports.val = config();
