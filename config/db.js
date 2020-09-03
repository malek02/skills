const mongoose= require('mongoose');
const config = require('config');
const db = config.get('URI');


const connectDB = async ()=> {
    try{
        
        await mongoose.connect(db, {useFindAndModify:false,useCreateIndex:true,useNewUrlParser: true,useUnifiedTopology: true })
        console.log("work goood......");
    }
    catch(err){
console.error(err.message);
process.exit(1)
    }
}


module.exports = connectDB;
