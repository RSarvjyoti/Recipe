const {connect} = require("mongoose");

const connectDb = async (url) => {
    try{
        await connect(url);
        console.log("Database connected successully....");
    }catch(err) {
        console.log(err);
    }
}

module.exports = connectDb;