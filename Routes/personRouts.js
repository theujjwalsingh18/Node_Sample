const express = require("express");
const router = express.Router();

const aadmi = require("../Schemas/personSchema");
const { jwtMiddleWare, generateToken } = require("./../jwt_auth");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const getPerson = new aadmi(data);
    const response = await getPerson.save();

    // Setuping for tokens

    const payload = {
      id: response.id,
      username: response.username,
    };

    console.log(JSON.stringify(payload));
    // Genrating tokens

    const token = generateToken(payload);
    console.log("Token is : ", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        error: `Internal Server Error . Might username , email already in use. Please change and try again `,
      });
  }
});

// Creating login rout such that token can re genrated in case of lost

router.post("/login", jwtMiddleWare, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await aadmi.findOne({ username: username });

    // If username or password doesn't match the database

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Genrating token again for login chache or cookies
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);
    // resturn token as response
    res.json({ token });
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Genrating profile routes or Admin Pannel

router.get("/profile", jwtMiddleWare, async (req, res) => {
  try {
    // Fetching data from url
    const userData = req.body;

    const userId = userData.id;
    const user = await aadmi.findById(userId);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", jwtMiddleWare, async (req, res) => {
  try {
    const response = await aadmi.find();

    console.log("Data has been successfully displayed");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Error while fatching data" });
  }
});

router.get("/:workType", jwtMiddleWare, async (req, res) => {
  try {
    const workType = req.params.workType; // // Extract the work type from the URL parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await aadmi.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatePerson = req.body;

    const response = await aadmi.findByIdAndUpdate(userId, updatePerson, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      res.status(404).json("User not found in Database");
    }
    console.log("Data Updated into Database");
    res.status(200).json(response);
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await aadmi.findByIdAndDelete(userId);

    if (!deleteUser) {
      res.status(404).json("User not found in Database");
    }
    console.log("User Deleted from Database");
    res.status(200).json(deleteUser);
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
