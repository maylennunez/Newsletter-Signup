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
  auth: "may1:ac78a32bdc2ae6da3b2af914578e9bb6-us17"
}

var request = https.request(url, options, function(response) {
  response.on("data", function(data){
  console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();


})




// API key ac78a32bdc2ae6da3b2af914578e9bb6-us17

// List ID 1769d48af7

 app.listen(3000, function(){
  console.log("Server is running on port 3000")
})
