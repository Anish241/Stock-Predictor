import mongoose from "mongoose";

const symbolSchema = mongoose.Schema({
    Name :{
        type: String,
        required: true,
    },
    Market :{
        type: String,
        required: true,
    },
    userOwner :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    }
});

const Symbol = mongoose.model('Symbol', symbolSchema);

export default Symbol;