const {DataTypes} = require("sequelize")
const sequelize = require("../config/db")

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0
            }
        },
        location: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true,
        tableName: "users"
    }
)

module.exports = User