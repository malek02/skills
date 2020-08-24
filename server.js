const express = require('express');
const connectDB = require('./config/db');
const app = express();



app.use(express.json({extended: false}));

const PORT = process.env.PORT || 5000;
app.get('/',(req,res)=>{
    console.log('ffff',req.body);
    res.send('HELOO FROM FFFSERVER')})

app.use('/api/users', require('./router/api/users'));
app.use('/api/auth', require('./router/api/auth'));
app.use('/api/profile', require('./router/api/profile'));
app.use('/api/posts', require('./router/api/posts'));









app.listen(PORT, ()=>console.log(`server ranuning in prot ${PORT}`));
