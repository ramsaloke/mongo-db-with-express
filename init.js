const mongoose = require("mongoose");
const Chat = require('./models/chat');

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp', {
   
    });
    console.log("Connection successful");

    let allChats = [
      { from: "neha", to: "preethi", msg: "hello how are you", created_at: new Date() },
      { from: "rahul", to: "kridhna", msg: "hello how are you", created_at: new Date() },
      { from: "ram", to: "krish", msg: "are you okay", created_at: new Date() },
      { from: "kl", to: "anand", msg: "happy holi", created_at: new Date() },
    ];

    await Chat.insertMany(allChats);
    console.log("Data inserted successfully");
    
  } catch (err) {
    console.error("Database connection failed or data insertion failed:", err);
  } 
}

main();
