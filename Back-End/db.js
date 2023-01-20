const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://chintan243:Cp%40954572309492@inotebook.apguckx.mongodb.net/test');
    console.log("mongoose");
}