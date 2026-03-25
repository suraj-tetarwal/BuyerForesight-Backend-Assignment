const { Op } = require("sequelize")

const User = require("../../../models/user.model")

async function createUser(data) {
    const existingEmail = await User.findOne({
        where: {email: data.email}
    })

    if (existingEmail) {
        const error = new Error("Email already exists")
        error.statusCode = 409
        throw error
    }

    const existingUsername = await User.findOne({
        where: {username: data.username}
    })

    if (existingUsername) {
        const error = new Error("Username already exists")
        error.statusCode = 409
        throw error
    }

    const user = await User.create(data)

    return user
}

async function getUsers(data) {
    const {search, sort, order} = data

    const where = {}
    const orderClause = []

    if (search) {
        where[Op.or] = [
            {name: {[Op.like]: `%${search}%`}},
            {username: {[Op.like]: `%${search}%`}},
            {email: {[Op.like]: `%${search}%`}},
        ]
    }

    const allowedSortFields = ["name", "email", "username", "createdAt"]

    if (sort && allowedSortFields.includes(sort)) {
        const sortOrder = order && order.toLowerCase() === "desc" ? "DESC" : "ASC"
        orderClause.push([sort, sortOrder])
    } else {
        orderClause.push(["createdAt", "DESC"])
    }

    const users = await User.findAll({
        where,
        order: orderClause
    })

    return users
}

async function getUserById(userId) {
    const parsedUserId = Number(userId)

    if (Number.isNaN(parsedUserId) || parsedUserId <= 0) {
        const error = new Error("Invalid user id")
        error.statusCode = 400
        throw error 
    }

    const user = await User.findByPk(parsedUserId)

    if (!user) {
        const error = new Error("User not found")
        error.statusCode = 404
        throw error 
    }

    return user
}

async function updateUser(userId, data) {
    const parsedUserId = Number(userId)

    if (Number.isNaN(parsedUserId) || parsedUserId <= 0) {
        const error = new Error("Invalid user id")
        error.statusCode = 400
        throw error
    }

    const user = await User.findByPk(parsedUserId)

    if (!user) {
        const error = new Error("User not found")
        error.statusCode = 404
        throw error
    }

    if (data.email) {
        const existingEmail = await User.findOne({
            where: {
                email: data.email,
                id: {[Op.ne]: user.id}
            }
        })

        if (existingEmail) {
            const error = new Error("Email already exists")
            error.statusCode = 409
            throw error
        }
    }

    if (data.username) {
        const existingUsername = await User.findOne({
            where: {
                username: data.username,
                id: {[Op.ne]: user.id}
            }
        })

        if (existingUsername) {
            const error = new Error("Username already exists")
            error.statusCode = 409
            throw error
        }
    }

    await user.update(data)

    return user
}

async function deleteUser(userId) {
    const parsedUserId = Number(userId)

    if (Number.isNaN(parsedUserId) || parsedUserId <= 0) {
        const error = new Error("Invalid user id")
        error.statusCode = 400
        throw error
    }

    const user = await User.findByPk(parsedUserId)

    if (!user) {
        const error = new Error("User not found")
        error.statusCode = 404
        throw error
    }

    await user.destroy()
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}