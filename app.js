const express = require("express");
const  bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const path = require(__dirname + "/index.js");

const app = express();

mongoose.connect("mongodb://localhost:27017/Blogging")

const blogSchema = new mongoose.Schema({
    name:String,
    content:String
});

const Blog = mongoose.model("Blog",blogSchema);



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const Objectarr = [];

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    Blog.find({},function(err,blogs){
        res.render("home",{Homepage:homeStartingContent,Objectarr2:blogs});
    })
    
    
    
});
app.get("/about",function(req,res){
    res.render("about",{Aboutpage:aboutContent});
});
app.get("/contact",function(req,res){
    res.render("contact",{Contactpage:contactContent});
});
app.get("/compose",function(req,res){
    res.render("compose");
});




app.post("/compose",function(req,res){
    // let post = {
    //  title:req.body.title,
    //  post:req.body.post
    // }
    // Objectarr.push(post);
    const newPost = new Blog({
        name:req.body.title,
        content:req.body.post
    })
    newPost.save(function(err){
        if(!err){
            res.redirect('/');
        }
    });

    
    
    
 })

 app.get("/home/:topic2",function(req,res){
//    para = _.lowerCase(req.params.topic2);
    
    // for(let i = 0;i< Objectarr.length;i++){
    //     const check = Objectarr[i].title;
    //     const check2 = _.lowerCase(check);
    //     if( check2 === para){
    //         res.render('post',{title2:Objectarr[i].title,page:Objectarr[i].post});
            
    //     }
    // }
   const para = req.params.topic2
    Blog.findOne({_id: para},function(err,blog){
        res.render('post',{title2:blog.name,page:blog.content});
    });


      
      
   });

app.listen(3000,function(){
    console.log("Server is runnning on port 3000");
})
