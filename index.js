const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require('./models/chat');
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded ({extended: true}));

app.use(methodOverride("_method"));

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp', {
     
    });
    console.log("Connection successful");

    let chat1 = new Chat({
      from: "neha",
      to: "priya",
      msg: "send me the syllabus",
      created_at: new Date()
    });
  
  } catch (err) {
    console.error("Database connection failed or data operation failed:", err);
  } 
}

main();
// INDEX Route

app.get("/chats", async (req,res,next) =>{
  try{
    let chats = await Chat.find();
  console.log(chats);
  res.render("index.ejs",{chats});
  }catch(err){
    next(err);
  }

});

// new route
app.get("/chats/new", (req,res) => {
  throw new ExpressError(404, "page not found")
  res.render("new.ejs");
});

//create route
app.post("/chats",(req,res) => {
  let {from,to,msg} = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg:msg,
    created_at: new Date(),
  });
  newChat.save().then((res)=>{
    console.log("chat was saved");
  })
  .catch((err)=>{
    console.log(err);
  });
  res.redirect("/chats");
});

//NEW - Show Route

app.get("/chats/:id", async(req,res,next)=>{
  try{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
      next(new ExpressError(500,"chat not found"));
    }
    res.render("edit.ejs",{ chat })
  } catch (err) {
    next(err);
  }
  
});


// edit route

app.get("/chats/:id/edit" , async (req,res,next)=>{
  try{
    let {id} = req.params;
    let chat = await Chat.findById(id);
     res.render("edit.ejs" , {chat});
  } catch (err) {
    next(err)
  }
 
})

// update route

app.put("/chats/:id", async (req,res,next)=>{
  try{
    let {id} = req.params;
    let {msg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg: msg}, {runValidators:true ,new:true});
    console.log(updatedChat);
    res.redirect("/chats");
  } catch (err) {
    next(err)
  }
  
});

//destroy route

app.delete("/chats/:id", async (req,res,next) => {
  try{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats")
  } catch (err)
{
  next(err)
}
});

app.use((err,req,res,next)=>{
  let {status=500, message="some eerror occurs"} = err;
  res.status(status).send(message);
})

app.get("/", (req, res) => {
  res.send("Root is working");
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
