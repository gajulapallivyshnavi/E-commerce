const authorizeUser=(permittedroles)=>{
    return (req,res,next)=>{
        if(permittedroles.includes(req.currentUser.role)){
            next()
        }
        else{
            return res.status(403).json({error:"unauthorized access"})
        }

    }

}
export default authorizeUser