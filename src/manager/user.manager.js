import fs from "fs"
import { v4 as uuidv4} from 'uuid'

export default class UserManager {
    constructor(path) {
        this.path = path;
    }

    async getUsers() 
    {
        try
        {
            if(fs.existsSync(this.path))
            {
                const users = await fs.promises.readFile(this.path, 'utf8');
                return JSON.parse(users);
            } else return [];
        }
        catch(error)
        {
            console.log(error);
        }
    }
 
    async createUser(obj) 
    {
       try
       {
            const user = {
                id:uuidv4(),
                ...obj
            }
            const users = await this.getUsers();
            const userExist = users.find((u)=>u.nombre === user.nombre)            
            if(userExist) return "User already Exists"
            users.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(users));
            return user;
       }
       catch(error)
       {
        console.log(error)
       }
    }

    async getUserById(id)
    {
        try
        {
            const user = await this.getUsers();
            const userExist = user.find((u)=>u.id == id)
            if(!userExist) return null;
            else return userExist;
        }
        catch(error)
        {
            console.log(error)
        }
    }

    async updateUser(obj, id)
    {
        try
        {
            const users = await this.getUsers();
            let userExist = await this.getUserById(id);
            if(!userExist)
            {
                return "User Not Found"                
            }
            else
            {
                console.log(userExist)
                userExist = { ...userExist, ...obj};

                const newArray = users.filter((u)=>u.id != id)
                newArray.push(userExist);

                await fs.promises.writeFile(this.path, JSON.stringify(newArray));
                return userExist;
            }
        }
        catch(error)
        {
            console.log(error)
        }
    }

    async deleteUser(id)
    {
        const users = await this.getUsers();
        if(users.length > 0 )
        {
            const userExist = await this.getUserById(id);
            if(userExist)
            {
                const newArray =  users.filter((u)=>u.id != id)
                await fs.promises.writeFile(this.path, JSON.stringify(newArray));
                return true;    
            } return false;
        }
        else
        {
            return false
        }
    }
}
