const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
console.log('hhh')
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError({'message': 'Unauthorized'}, 401)
    }
    
    const token = authHeader.split(' ')[1]
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        console.log(decoded)
        // { id: 18, name: 'yyy', iat: 1768723272, exp: 1771315272 }

        const {name} = decoded
        req.user = {name}


        next()
    } catch(error){

        throw new CustomAPIError('Not authorized to access this route', 401)
    }


}
module.exports = authenticationMiddleware