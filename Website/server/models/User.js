import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    Name : {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,

    },
    symbols: [{type: mongoose.Schema.Types.ObjectId, ref: "Symbol"}]

});

const User = mongoose.model('User', userSchema);

export default User;