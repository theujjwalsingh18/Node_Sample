const express = require('express')
const router = express.Router()

const aadmi = require('../Schemas/personSchema')

router.post('/', async (req, res)=>{
    try {
        const data = req.body
        const getPerson = new aadmi(data);
        const response = await getPerson.save();
        console.log("Data has been successfully saved");
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Error"}) 
    }
})
router.get('/', async (req, res)=>{
    try {
        const response = await aadmi.find();
        
        console.log("Data has been successfully displayed");
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Error while fatching data"}) 
    }
})

router.get('/:workType', async(req, res)=>{
    try{
        const workType = req.params.workType; // // Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter' ){
            const response = await aadmi.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatePerson = req.body;

        const response = await aadmi.findByIdAndUpdate(userId, updatePerson, {
            new: true,
            runValidators: true
        })

        if (!response) {
            res.status(404).json("User not found in Database")
        }
        console.log("Data Updated into Database");
        res.status(200).json(response)
        
    } catch (error) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res) => {
    try {

        const userId = req.params.id;
        const deleteUser = await aadmi.findByIdAndDelete(userId)

        if(!deleteUser)
        {
            res.status(404).json("User not found in Database")
        }
        console.log("User Deleted from Database");
        res.status(200).json(deleteUser)
    } catch (error) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;