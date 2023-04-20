const userDB = {
    users: require("../model/users.json"),
    setUsers: function (data) { this.users = data }
}

const path = require("path");
const fsPromises = require("fs").promises;
const bcrypt = require("bcrypt");

handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user && !pwd) {
        return res.status(400).json({ message: "Username and Password are required" });
    }

    const duplicate = userDB.users.find(usr => usr.username === user);
    if (duplicate) {
        return res.status(409).json({ message: "Username already exist" });
    }
    try {
        const hashedPassword = await bcrypt.hash(pwd, 10);
        const newUser = {
            username: user,
            password: hashedPassword
        }
        userDB.setUsers([...userDB.users, newUser]);

        await fsPromises.writeFile(
            path.join(__dirname,"..", "model", "users.json"),
            JSON.stringify(userDB.users)
        );
        console.log(userDB.users);
        res.status(201).json({message:"New user created!"});

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports={handleNewUser};