require("dotenv").config({quiet: true})

const app = require("./app")
const sequelize = require("./config/db")

const startServer = async () => {
    try {
        await sequelize.authenticate()
        console.log("DB Connected")

        await sequelize.sync()
        console.log("Table Synced")

        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch(error) {
        console.log("Server failed to start:", error)
        process.exit(1)
    }
}

startServer()