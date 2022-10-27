const express = require("express")

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