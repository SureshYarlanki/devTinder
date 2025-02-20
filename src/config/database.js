const mongoose= require("mongoose")

const connectDB = async () => {
   await mongoose.connect("mongodb+srv://suresh:bej8bjtybDjrWdFo@namastenode.mvqlr.mongodb.net/devTinder" )
}

module.exports = connectDB;