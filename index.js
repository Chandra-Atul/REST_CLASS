const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
// const methodOverride = require('method-override');

const {v4: uuidv4} = require('uuid');
uuidv4();


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {   
        id: uuidv4(),
        username: "apnacollege",
        content: "I love coding!",
    },
    {
        id: uuidv4(),
        username: "Atul",
        content: "competitive Programming",
    },
    {
        id: uuidv4(),
        username: "chandra", 
        content: "Hard work is important to achieve the success",
    },
];


app.get("/posts",(req, res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req, res)=>{
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post}); 
});



app.patch("/posts/:id", (req, res) =>{
    let {id} = req.params;

    let newContent = req.body.content;
    console.log("newContent is: ",newContent);
    let post = posts.find((p)=>id === p.id);
    post.content = newContent;
    console.log(post);

    res.send("patch request working");
});

app.listen(port, ()=>{
    console.log(`listening to port:  ${port}`);
})
