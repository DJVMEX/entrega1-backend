export const productVerify = (req, res, next) => {
    const product = req.body; // Cambiar a req.body si los datos vienen en el cuerpo de la solicitud
    
    if (!product.title) {
        return res.status(400).json({ msg: "El campo 'title' es obligatorio" });
    }
    if (!product.description) {
        return res.status(400).json({ msg: "El campo 'description' es obligatorio" });
    }
    if (!product.code) {
        return res.status(400).json({ msg: "El campo 'code' es obligatorio" });
    }
    if (!product.price) {
        return res.status(400).json({ msg: "El campo 'price' es obligatorio" });
    }
    if (!product.status) {
        product.status = true;
    }
    if (!product.stock) {
        return res.status(400).json({ msg: "El campo 'stock' es obligatorio" });
    }
    if (!product.category) {
        return res.status(400).json({ msg: "El campo 'category' es obligatorio" });
    }

    next();
}
