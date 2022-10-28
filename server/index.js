const express = require("express")
var AWS = require('aws-sdk');

AWS.config.update(
  {
    region: 'us-east-1',
    accessKeyId: 'AKIAZUBZUN32QUYGX44I',
    secretAccessKey: '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'
  }
);

const docClient = new AWS.DynamoDB.DocumentClient();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Send all menu items from DB to frontend
app.get("/", (req, res) => {
    /*
        Select * from menu
        Send objects
    */
    res.json({message: "Hello from server!"})
})

//Recieve user info and check against user in the DB
app.post("/login", (req, res) => {
    console.log("login")
    /*
        Select * from users where email=req.body.email
        If empty object send false
        else
        if req.body.password === obj.password send true
        else send false
    */
})

//Receive user info and add them to DB
app.post("/signup", (req, res) => {
    console.log("SignUp")
    /**
     * Check to see if email is already associated with a user
     * Insert into users Values (req.body.email, req.body.password, req.body.creditcardinfo)
     */
     const params = {
        TableName: 'users',
        Item: {
            'email': req.body.email,
            'password': req.body.password
        }
    };
    docClient.put(params, function(err) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        }
        else {
            console.log("Success")
        }
    });
});

app.post("/order", (req, res) => {
    console.log("Order")
    /**
     * Insert into orders all items ordered as well as email
     */
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});