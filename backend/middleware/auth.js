const jwt = require('jsonwebtoken')


const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
    console.log(authHeader)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(400).send({msg:"No token provided"})
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { Email ,Password} = decoded
    req.user = { Email, Password}
    next()
  } catch (error) {
    res.status(404).send({msg:"Not authorized to access this route"})
  }
}

const studentAuthMiddleware=async(req,res,next)=>{
  const uniqueid = req.cookies.uniqueid;
  const name = req.cookies.name;

  try{
    const data=await db.promise().query('SELECT * FROM student_2026 WHERE name like ? AND unique_Id like ?',[name,uniqueid])
    console.log(data[0][0]);
    if(data[0].length>0)
    {
        next();
    }
    else{
        res.status(400).json({msg:"Invalid credentials"})
    }

}
catch(error)
{
    res.status(200).json({
        msg:"Internal Error occured"
    })

}

}


module.exports = authenticationMiddleware
