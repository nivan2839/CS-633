const uuid =  require('uuid');
const express = require("express");
var AWS = require('aws-sdk');
var request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

function CreateApp(){

    AWS.config.update(
    {
        region: 'us-east-1',
        accessKeyId: 'AKIAZUBZUN324SKFH6EM',
        secretAccessKey: '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'
    }
    );

    const docClient = new AWS.DynamoDB.DocumentClient();

    const PORT = process.env.PORT || 3001;
    const app = express();
    var allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    };

    app.use(allowCrossDomain);
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    //Send all menu items from DB to frontend
    app.get("/menu", (req, res) => {
        /*
            Select * from menu
            Send objects
        */
        const foodParams = {
            TableName: 'menu',
            ProjectionExpression: "id, food_name, category, description, image, price, prices, num, amount",
        }
        docClient.scan(foodParams, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            }
            else {
                res.json({menu: data.Items})
            }
        });
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
                let bufferObj = Buffer.from(req.body.password, 'utf-8');
                const encryptedPassword = bufferObj.toString('base64');
                if (user) {
                    if (encryptedPassword == user.password){
                        bufferObj = Buffer.from(user.creditCardNumber, 'base64');
                        const creditCardNumber = bufferObj.toString('ascii');
                        const userInfo = {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            creditCardNumber,
                            ccv: user.ccv
                        }
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
                                res.json({prevItems: data.Items, user: userInfo})
                            }
                        });
                    }
                    else {
                        res.json({error: 'Incorrect password'})
                    }
                }
                else {
                    res.json({error: "No account associated with this email"})
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
        let bufferObj = Buffer.from(req.body.password, 'utf-8');
        const encryptedPassword = bufferObj.toString('base64')
        bufferObj = Buffer.from(req.body.creditCardNumber, 'utf-8');
        const encryptedCardNumber = bufferObj.toString('base64');
        const params = {
            TableName: 'accounts',
            Item: {
                'email': req.body.email,
                'password': encryptedPassword,
                'firstName': req.body.firstName,
                'lastName': req.body.lastName,
                'creditCardNumber': encryptedCardNumber,
                'ccv': req.body.ccv
            }
        };
        docClient.put(params, function(err) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            }
            else {
                res.json({message: "Success"})
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
                'order_id': uuid.v4(),
                'ordered_items': req.body.items
            }
        };
        docClient.put(params, function(err) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            }
            else {
                res.json({time: "30 minutes"})
            }
        });
    })


    app.get('/orderedItems', (req, res) => {
        const item_params = {
            TableName: 'orders',
            ProjectionExpression: 'order_id, ordered_items'
        }
        docClient.scan(item_params, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            }
            else {
                res.json({orders: data.Items});
            }
        })
    })
    return app;
}

CreateApp();

describe('Our application', function () {
    var app;
    before(function(done) {
        app = CreateApp();
        app.listen(3001, () => {
            console.log(`Server listening on 3001`);
            done();
        });
    });

    it('should send back a JSON object of the menu items', function(done) {
        request(app)
            .get('/menu')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('should send back a JSON object with the time to pick up the food', function(done) {
        request(app)
            .post('/order')
            .set('Content-Type', 'application/json')
            .send({order_id: '1234', ordered_items: [{name: 'Pancakes', count: '1'}]})
            .expect('Content-Type', /json/)
            .expect(200, function (err, res) {
                if (err) return done(err);
                time = res.body.time;
                expect(time).to.equal('30 minutes');
                done();
            });
    });
    it('should send back a JSON object of all of the orders place', function(done) {
        request(app)
            .get('/orderedItems')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) return done(err);
                done();
            });
    })
});
