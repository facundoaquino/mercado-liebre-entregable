
const authMiddleware = (req, res, next) => {
 

	if (req.session.user) {
        res.locals.user=req.session.user
        // console.log(res.locals.user);
	next()
	} else {
		next()
	}
}

module.exports = authMiddleware