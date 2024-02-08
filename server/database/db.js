
import mongoose from "mongoose"

const DBConnection=async ()=>{
    const MONGODB_URL=`mongodb://kanchana:kanchana22@ac-zb7awbr-shard-00-00.6btkbqv.mongodb.net:27017,ac-zb7awbr-shard-00-01.6btkbqv.mongodb.net:27017,ac-zb7awbr-shard-00-02.6btkbqv.mongodb.net:27017/?ssl=true&replicaSet=atlas-6ckp84-shard-0&authSource=admin&retryWrites=true&w=majority`
    try{
 await mongoose.connect(MONGODB_URL,{useNewUrlParser:true})
console.log("database connected successfully");
    }
    catch(error){
        console.log("Error while connecting with the database",error.message)
    }
}
export default DBConnection