const validateCreateUserData = require("../validation/createUser.validation")
const validateUpdateUserData = require("../validation/updateUser.validation")

const userService = require("../service/user.service")

async function createUser(request, response, next) {
    try {
        const data = validateCreateUserData(request.body)

        const user = await userService.createUser(data)

        response.status(201).json({
            message: "User created successfully",
            data: user
        })
    } catch(error) {
        next(error)
    }
}

async function getUsers(request, response, next) {
    try {
        const queryData = request.query

        const users = await userService.getUsers(queryData)

        response.status(200).json({
            message: "Users fetched successfully",
            data: users
        })
    } catch(error) {
        next(error)
    }
}

async function getUserById(request, response, next) {
    try {
        const {id} = request.params
        
        const user = await userService.getUserById(id)

        response.status(200).json({
            message: "User fetched successfully",
            data: user
        })
    } catch(error) {
        next(error)
    }
}

async function updateUser(request, response, next) {
    try {
        const {id} = request.params

        const data = validateUpdateUserData(request.body)

        const updateUser = await userService.updateUser(id, data)

        response.status(200).json({
            message: "User updated successfully",
            data: updateUser
        })
    } catch(error) {
        next(error)
    }
}

async function deleteUser(request, response, next) {
    try {
        const {id} = request.params

        await userService.deleteUser(id)

        response.status(200).json({
            message: "User deleted successfully"
        })
    } catch(error) {
        next(error)
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}