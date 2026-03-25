const express = require("express")

const userRouter = require("./modules/user/routes/user.routes")

const errorHandler = require("./middleware/errorHandler")

const app = express()
app.use(express.json())

app.use("/users", userRouter)

app.use(errorHandler)

module.exports = app