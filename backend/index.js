const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();


const app = express();



mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/inv_system' )
.then(()=> {
    console.log("mongodb chai connect vayo haita");
}

)

.catch((err)=>{
    console.log("Database chai connect vayena", err)
})


app.get('/', (req, res)=>{

    res.json({
        message: 'SERVER CHAI CHALNA THALYO HAITA '
    })
}) 





const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on the port ${PORT}`)
})