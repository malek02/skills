const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;
app.post('/',(req,res)=>res.send('HELOO FROM FFFSERVER'))











app.listen(PORT, ()=>console.log(`server ranuning in prot ${PORT}`));
