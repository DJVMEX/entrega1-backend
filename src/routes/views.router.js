import { Router } from "express";

const router = Router();

router.get('/vista1', (req, res) =>{
    res.render('vista1', {layout:'main2.handlebars'});
})

router.get('/vista2', (req, res) =>{
    res.render('vista2');
})

router.get('/vista3', (req, res) =>{
    let usuario = {
        name: 'juan',
        apellido: 'gomez'
    }
    res.render('vista3', usuario);
})

export default router;