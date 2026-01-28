
const CustomAPIError = require('../errors/custom-error')
//jwt.io
const jwt = require('jsonwebtoken')


const logon = async (req, res) => {
console.log('hhh')
    const {name, password} = req.body;

     console.log(name, password)
    if (!name || !password) {
        throw new CustomAPIError('Please provide a username and password', 400)
    }
    //just for demo, usually from DB
    const id = new Date().getDate()

    const token = jwt.sign( { id, name }, 
                            process.env.JWT_SECRET,
                            { expiresIn: '30d'}
                        )
    res.status(200).json({ msg: 'user created', token })
}

const hello = async (req, res) => {
    console.log(req.user)
    // { name: 'yyy' }
    res.status(200).json({'message': `Hello, ${req.user.name}`})
    
}

module.exports = { logon, hello }