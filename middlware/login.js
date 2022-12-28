
function authenticate(req, res, next) {
    // Get the JWT from the request header
    const token = req.header('Authorization');

    // Verify the JWT
    try {
        const decoded = jwt.verify(token, secret);
        // JWT is valid, set the user on the request object
        req.user = decoded;
        next();
    } catch (err) {
        // JWT is invalid, return 401 Unauthorized
        return res.status(401).send('Unauthorized');
    }
}
