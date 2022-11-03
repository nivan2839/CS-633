import {v4 as uuidv4} from 'uuid'
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
            print("Sent menu items")
            res.send(data.Items)
        }
    });
})

//Send all the user's previous orders
app.post("/prevOrders", (req, res) => {
    const foodParams = {
        TableName: 'orders',
        ProjectionExpression: "order_id, #em, items",
        FilterExpression: "#em = :eeee",
        ExpressionAttributeNames: {
            "#em": "email"
        },
        ExpressionAttributeValues: {
            ":eeee": req.body.email
        }
    }
    docClient.scan(foodParams, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
        else {
            console.log("Sent previous orders")
            res.send(data.Items)
        }
    });
});

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
                    res.send("Success")
                }
                else {
                    res.send("Failure")
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
            res.send("Success")
        }
    });
});

app.post("/order", (req, res) => {
    console.log("Order")
    /**
     * Insert into orders all items ordered as well as email
     */
     const params = {
        TableName: 'orders',
        Item: {
            'order_id': new uuidv4(),
            'email': req.body.email,
            'items': req.body.items
        }
    };
    docClient.put(params, function(err) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        }
        else {
            res.send("30 minutes")
        }
    });
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
});