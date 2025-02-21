const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


const USER_ID = "Tushar_Pareenja_05052005";
const EMAIL = "22bcs16825@cuchd.in";
const ROLL_NUMBER = "22BCS16825"

app.post("/bfhl", (req, res)=>{
    try{
        const {data} = req.body;
        if (!data || !Array.isArray(data)) {
            console.log('Data is not entered or not in array format');
        }
        const numbers = data.filter(item=>!isNaN(item));
        const alphabets = data.filter(item=>/^[a-zA-Z]$/.test(item));
        const biggestAlphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }))[0]] : [];
        return res.json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_alphabet: biggestAlphabet
        });
    } catch(error){
        console.log(error);
    }
});

app.get("/bfhl", (req, res)=>{
    res.json({operation_code: 1});
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

