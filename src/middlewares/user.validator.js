export const userValidator = (req, res, next) =>{
    const user = req.body
    if(user.role === 'admin') next()
    else res.status(403).json({ msg: "No autorizado" } )
}