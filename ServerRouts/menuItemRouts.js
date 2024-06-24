const express = require('express')
const router = express.Router()

const menuItem = require('../Schemas/menuSchema')

router.post('/', async (req, res)=>{
    try {
        const data = req.body
        const newPerson = new menuItem(data);
        const response = await newPerson.save();
        console.log("Item has been successfully saved");
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Error"}) 
    }
})

router.get('/', async (req, res)=>{
    try {
        const response = await menuItem.find();
        
        console.log("Item has been successfully displayed");
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Error while fatching data"}) 
    }
})


router.get('/:taste', async (req, res)=>{
    try{
        const tasteType = req.params.taste; // // Extract the taste type from the URL parameter
        if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy' ){
            const response = await menuItem.find({taste: tasteType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid Taste type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const updateItem = req.body;

        const response = await menuItem.findByIdAndUpdate(itemId, updateItem, {
            new: true,
            runValidators:true
        })

        if (!response) {
            res.status(404).json({error: 'Internal Server Error'});
        }

        console.log('Item Updated Successfully');
        res.status(200).json(response);
        
    } catch (error) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const response = await menuItem.findByIdAndDelete(itemId);

        if (!response) {
            res.status(404).json({error: 'Internal Server Error'});
        }
        console.log('Item deleted Successfully');
        res.status(200).json(response);
    } catch (error) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;