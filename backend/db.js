const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

main().catch(err => console.log(err));

// Create the new database name as inotebook
async function main() {
    await mongoose.connect('mongodb+srv://chintan243:Cp%40954572309492@inotebook.apguckx.mongodb.net/inotebook');
    console.log("mongoose");
}