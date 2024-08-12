import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL,{
        dbName : "MERN_HOSPITAL_MANAGEMENT",
    }).then(()=>{
        console.log("connected to database!");
    }).catch((err)=>{
        console.log(`Error occured ${err}`);
    });
} 

export default dbConnection;