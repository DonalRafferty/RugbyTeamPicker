'use strict';

/**
 * Simple index route that is used to
 * render the index page server side
 * @param req
 * @param res
 */
exports.index = function(req, res) {
	res.render('index', {
		request: req
	});
};