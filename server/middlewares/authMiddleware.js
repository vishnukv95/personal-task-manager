import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

export const authenticate = async (req, res, next) => {
    try {
      let token;

      if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
        
      }
    
      else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return res.status(401).json({ error: "Not authorized, no token" });
      }

     
      const verified = jwt.verify(token,process.env.SECRET_KEY);
       
        const account = await userModel.findOne({email:verified.email}).select("-password");
        if (!account) {
        return res.status(401).json({ error: "Account not found" });
      }
    
     

      req.user = account

     

      next()
    } catch (err) {
      console.error(err.message);
      res.status(401).json({ error: "Invalid or expired token" });
    }
  };
