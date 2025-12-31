import User from '../models/users-model.js';

export async function getAllUsers (req, res){    
    try{        
        const users = await User.find().sort({ createdAt: -1 }); // sorts by most recently created
        res.status(200).json(users);
    } catch (error) {
        console.error("Error in users_controller");
        res.status(500).json({message: "Internal server error"})
    }
};

export async function getUser (req, res){
    const userID = req.params.user_id;
    try{        
        const user = await User.findById(userID);        
        res.status(200).json(user);
    } catch (error) {
        console.error("Error in users_controller");
        res.status(500).json({message: "Internal server error"})
    }
};

export async function addUser (req, res){   
    try{        
        const {first_name, last_name, role} = req.body;
        const newUser = new User({first_name, last_name, role});
        await newUser.save();
        res.status(201).json({message: "User created successfully!"});
    } catch (error) {
        console.error("Error in users_controller");
        res.status(500).json({message: "Internal server error"})
    }
};

export async function updateUser (req, res){   
    const userID = req.params.user_id;
    try{     
        const {first_name, last_name, role} = req.body;   
        const user = await User.findByIdAndUpdate(userID, { first_name, last_name, role });        
        res.status(200).json({message: "User updated successfully!"});
    } catch (error) {
        console.error("Error in users_controller");
        res.status(500).json({message: "Internal server error"})
    }
};

export async function deleteUser (req, res){   
    const userID = req.params.user_id;
    try{               
        const user = await User.findByIdAndDelete(userID);        
        res.status(200).json({message: "User has been deleted."});
    } catch (error) {
        console.error("Error in users_controller");
        res.status(500).json({message: "Internal server error"})
    }
};