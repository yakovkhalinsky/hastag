var bodyHandler = function(req, res, next) {
    req.body = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { req.body += chunk });
    req.on('end', next);
};

module.exports = bodyHandler;
