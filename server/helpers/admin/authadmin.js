import jwt from 'jsonwebtoken';


const protect = (async(req,res,next)=>{
    let token ;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
          token = req.headers.authorization.split(' ')[1]
    
          const decoded = jwt.verify(token,process.env.JWT_SEC)
    
          next()
    
        }catch(error){
          console.error(error)
          res.status(401)
          res.json('Not authorized, Token failed')
        }
      }
    
      if(!token){
        res.status(401)
        throw new Error('Not autherized, no token')
      }
})

export {protect}