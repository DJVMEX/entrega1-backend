export const cartVerify = (req, res, next) => {
    const cart = req.body; // Cambiar a req.body si los datos vienen en el cuerpo de la solicitud
    
    if (!cart.products) {
        return res.status(400).json({ msg: "El campo 'products' es obligatorio" });
    }
    
    next();
}
