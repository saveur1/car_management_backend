import mongoose from "mongoose";

const connectDatabase = ()=>{
    mongoose.set("strictQuery",false);
    mongoose.connect(process.env.DB_URL).then(con=>{
        console.log(`MongoDB database connected with Host: ${con.connection.host}`);
    })

}
export default connectDatabase;