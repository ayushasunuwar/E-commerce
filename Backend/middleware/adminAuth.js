import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {
    try {
        //get token from response header
        const { token } = req.header;

        //check for token availability
        if (!token) {
            //if not available stop execution
            return res.status(401).json({success: false, message: "Not authorized Login Again"})
        }

        //if available decode token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        //verify decoded token
        if (token_decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD) {
            return res.status(401).json({success: false, message: "Not authorized Login again"})
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

export default adminAuth