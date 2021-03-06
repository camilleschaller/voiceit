const config = require('./config.js');

const formatLinkHeader = require('format-link-header');
const User = require('./models/userSchema');
const jwt = require('jsonwebtoken');

exports.requireJson = function (req, res, next) {
    if (req.is('application/json')) {
        return next();
    }
}

exports.getPaginationParameters = function (req) {

    // Parse the "page" URL query parameter indicating the index of the first element that should be in the response
    let page = parseInt(req.query.page, 10);
    if (isNaN(page) || page < 1) {
        page = 1;
    }

    // Parse the "pageSize" URL query parameter indicating how many elements should be in the response
    let pageSize = parseInt(req.query.pageSize, 10);
    if (isNaN(pageSize) || pageSize < 0 || pageSize > 5) {
        pageSize = 5;
    }

    return { page, pageSize };
};

/**
 * Adds a Link header to the response (if applicable).
 *
 * @param {String} resourceHref - The hyperlink reference of the collection (e.g. "/api/people")
 * @param {Number} page - The page being listed
 * @param {Number} pageSize - The page size
 * @param {Number} total - The total number of elements
 * @param {ExpressResponse} res - The Exprss response object
 */
exports.addLinkHeader = function (resourceHref, page, pageSize, total, res) {

    const links = {};
    const url = config.databaseUrl + resourceHref;
    const maxPage = Math.ceil(total / pageSize);

    // Add first & prev links if current page is not the first one
    if (page > 1) {
        links.first = { rel: 'first', url: `${url}?page=1&pageSize=${pageSize}` };
        links.prev = { rel: 'prev', url: `${url}?page=${page - 1}&pageSize=${pageSize}` };
    }

    // Add next & last links if current page is not the last one
    if (page < maxPage) {
        links.next = { rel: 'next', url: `${url}?page=${page + 1}&pageSize=${pageSize}` };
        links.last = { rel: 'last', url: `${url}?page=${maxPage}&pageSize=${pageSize}` };
    }

    // If there are any links (i.e. if there is more than one page),
    // add the Link header to the response
    if (Object.keys(links).length >= 1) {
        res.set('Link', formatLinkHeader(links));
    }
}

/**
 * Returns true if the specified property is among the "include" URL query parameters sent by the client
 */
exports.responseShouldInclude = function (req, property) {

    // Get the "include" URL query parameter
    let propertiesToInclude = req.query.include;
    if (!propertiesToInclude) {
        return false;
    }

    // If it's not an array, wrap it into an array
    if (!Array.isArray(propertiesToInclude)) {
        propertiesToInclude = [propertiesToInclude];
    }

    // Check whether the property is inside the array
    return propertiesToInclude.indexOf(property) >= 0;
};

exports.authenticate = function (req, res, next) {

    // Ensure the header is present.

    const authorization = req.get('Authorization');

    if (!authorization) {
        return res.status(401).send('Authorization header is missing');
    }

    // Check that the header has the correct format.

    const match = authorization.match(/^Bearer (.+)$/);
    if (!match) {
        return res.status(401).send('Authorization header is not a bearer token');
    }

    // Extract and verify the JWT.

    const token = match[1];

    jwt.verify(token, config.secretKey, function (err, payload) {
        if (err) {
            return res.status(401).send('Your token is invalid or has expired');
        } else {
            req.currentUserId = payload.sub;
            next(); // Pass the ID of the authenticated user to the next middleware.
        }
    });
}