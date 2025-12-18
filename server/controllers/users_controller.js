const getAllUsers = (req, res)=>{
    res.send("Users")
};

const getUser = (req, res)=>{
    const userID = req.params.user_id;
    res.send("User ID: " + userID);
};

module.exports = {
    getAllUsers,
    getUser
}