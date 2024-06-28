const bcrypt=require('bcryptjs')

const hashPassword= async (password)=>{
    const saltRound=10
    return await bcrypt.hash(password,saltRound)
}

const comparePassword= async (password,existingPassword)=>{
    return await bcrypt.compare(password,existingPassword)
}

module.exports={hashPassword,comparePassword}