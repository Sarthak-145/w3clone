import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    //getting header 
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("bearer ")) {
        return res.status().json({ message: "Unauthorized: No token provided" })
    }

    //Extracting token part
    const token = authHeader.split(" ")[1]

    try {
        //verifying usin jwt-secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //ataching user info to req object
        req.user = decoded;

        next();
    }
    catch(error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token"})
    }
}

