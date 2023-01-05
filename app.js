//jshint esversion:6

var express = require("express");
var bodyParser = require("body-parser");
var ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//Push the written blogs in one array
var posts=[];


// use res.render to load up an ejs view file
// res.render() will look in a views folder for the view. So you only have to define home since the full path is views/home.

app.get("/",(req,res)=>{
  res.render("home", {
    StartingContent:homeStartingContent, 
    posts:posts
  });
});

//Routing Parameters
app.get('/posts/:postName', (req, res) => {
  for(var i=0; i<posts.length; i++){
    if(_.lowerCase(posts[i].title)==_.lowerCase(req.params.postName)){
      res.render("post", {
        Topic:posts[i].title,
        Content:posts[i].content
      });
    }
  }
});

//About page get request
app.get("/about",(req,res)=>{
  res.render("about", {
    aboutContent
  });
});

//Contact page request
app.get("/contact",(req,res)=>{
  res.render("contact", {
    contactcontent:contactContent
  });
});

//Compose Page
app.get("/compose",(req,res)=>{
  res.render("compose");
});

//Publish button (clicked) post request
app.post("/compose",(req,res)=>{
  var post = {
    title : req.body.postTitle,
    content : req.body.postBody
  };
  posts.push(post);
  
  res.redirect('/');     //To redirect the page to home
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
