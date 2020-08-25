const mongoose= require('mongoose');
const config = require('config');
const db = config.get('URI');
console.log(db)

const connectDB = async ()=> {
    try{
        
        await mongoose.connect(db, {useNewUrlParser: true,useUnifiedTopology: true })
        console.log("work goood......");
    }
    catch(err){
console.error(err.message);
process.exit(1)
    }
}


module.exports = connectDB;
