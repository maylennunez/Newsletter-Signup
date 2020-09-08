const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
  members: [
    {
       email_address: email,
       status: "subscribed",
       merge_fields: {
         FNAME: firstName,
         LNAME: lastName
       }
    }
]
};
const jsonData = JSON.stringify(data);

const url = "https://us17.api.mailchimp.com/3.0/lists/1769d48af7";

const options = {
  method: "POST",

}

var request = https.request(url, options, function(response) {

if   (response.statusCode === 200){
  res.send("Susccessfully subscribed!");

} else {
  res.send("There was an error with signing up, please try again!");
}


  response.on("data", function(data){
  console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();


})





// List ID 1769d48af7

 app.listen(3000, function(){
  console.log("Server is running on port 3000")
})
