const express = require("express")
var AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update(
  {
    region: 'us-east-1',
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY
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
    const foodParams = {
        TableName: 'food',
        ProjectionExpression: "id, name, description, photo",
    }
    docClient.scan(foodParams, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
        else {
            print("send items")
        }
    });
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
    const params = {
        TableName: 'accounts',
        KeyConditionExpression: "#em = :eeee",
        ExpressionAttributeNames: {
            "#em": "email"
        },
        ExpressionAttributeValues: {
            ":eeee": req.body.email
        }
    }
    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
        else {
            const user = data.Items[0];
            if (user) {
                if (req.body.password == user.password){
                    print("Logged In")
                }
                else {
                    print("Failure to log in")
                }
            }
        }
    });
})

//Receive user info and add them to DB
app.post("/signup", (req, res) => {
    console.log("SignUp")
    /**
     * Check to see if email is already associated with a user
     * Insert into users Values (req.body.email, req.body.password, req.body.creditcardinfo)
     */
     const params = {
        TableName: 'accounts',
        Item: {
            'email': req.body.email,
            'password': req.body.password,
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'creditCardNumber': req.body.creditCardNumber,
            'ccv': req.body.ccv
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