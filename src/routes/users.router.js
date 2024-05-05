import Router from "express";
const router = Router();


import UserManager from "../manager/user.manager.js";
import { userValidator } from "../middlewares/user.validator.js";
import { upload } from "../middlewares/multer.js";

const userManager = new UserManager('./src/data/user.json');


//consultar todos los usuarios
router.get('/', async (req, res) => {
    try
    {
        const users = await userManager.getUsers();
        res.status(200).json(users);    
    }
    catch(error)
    {
        res.status(500).json({ msg: error.message})
    }
})

//crear un nuevo usuario.
router.post('/', userValidator, async(req, res) => {
    try
    {
        const user = await userManager.createUser(req.body);
        res.status(200).json(user);    
    }
    catch(error)
    {         
        res.status(500).json({ msg: error.message})
    }
})

//consultar un usuario por id
router.get('/:id', async (req,res)=>{
    try
    {
        const {id} = req.params;
        const user = await userManager.getUserById(id);
        res.status(200).json(user);
    }
    catch(error)
    {
        res.status(500).json({ msg: error.message})
    }
})

//actualizar un usuario por id
router.put('/:id', async(req, res)=>{
    try
    {
        const { id } = req.params;
        const user = await userManager.updateUser(req.body, id);
        if( !user ) res.status(500).json({ msg: "Error Update"})
        else res.status(200).json(user);
    }
    catch(error)
    {
        res.status(500).json({ msg: error.message})
    }
})

//eliminar un usuario por id
router.delete("/:id", async (req, res) => {

    try
    {
        const {id} = req.params;
        const deluser = await userManager.deleteUser(id);
        if(!deluser) res.status(500).json({ msg: "User already Exists"})
        else res.status(200).json({msg:`User id: ${id} deleted `});
    }
    catch(error)
    {
        res.status(500).json({ msg: error.message})
    }

})

router.post('/profile', upload.single('profile'), async (req, res) => {
    try {        
        console.log(req.file);
        const user = req.body;
        user.profile = req.file.path;
        const userCreated = await userManager.createUser(user);
        res.json(userCreated);
    } 
    catch (error) {
        res.status(500).json({ msg: error.message})
    }
})

export default router;