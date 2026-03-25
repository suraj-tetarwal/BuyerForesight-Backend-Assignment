function validateCreateUserData(data) {
    const {name, username, email, age, phone, location} = data

    if (!name || !name.trim()) {
        const error = new Error("Name is required")
        error.statusCode = 400
        throw error
    }

    if (!username || !username.trim()) {
        const error = new Error("Username is required")
        error.statusCode = 400
        throw error
    }

    if (!email || !email.trim()) {
        const error = new Error("Email is required")
        error.statusCode = 400
        throw error
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email.trim())) {
        const error = new Error("Invalid email format");
        error.statusCode = 400;
        throw error;
    }

    let parsedAge
    if (age !== undefined) {
        if (typeof(age) === "boolean") {
            const error = new Error("Age must be valid number")
            error.statusCode = 400
            throw error
        }

        parsedAge = Number(age)
        if (Number.isNaN(parsedAge)) {
            const error = new Error("Age must be valid number")
            error.statusCode = 400
            throw error
        }

        if (parsedAge < 0) {
            const error = new Error("Age must be valid positive number")
            error.statusCode = 400
            throw error
        }
    }

    if (phone !== undefined) {
        if (typeof(phone) !== "string") {
            const error = new Error("Phone number must be string")
            error.statusCode = 400
            throw error
        }

        const phoneRegex = /^\d{10}$/
        if (!phoneRegex.test(phone.trim())) {
            const error = new Error("Invalid phone number")
            error.statusCode = 400
            throw error
        }
    }

    if (location !== undefined) {
        if (typeof(location) !== "string") {
            const error = new Error("Location must be valid string")
            error.statusCode = 400
            throw error
        }
    }

    const cleanData = {
        name: name.trim(),
        username: username.trim(),
        email: email.trim().toLowerCase()
    }

    if (parsedAge !== undefined) {
        cleanData.age = parsedAge
    }
    if (phone !== undefined) {
        cleanData.phone = phone.trim()
    }
    if (location !== undefined) {
        cleanData.location = location.trim()
    }

    return cleanData
}

module.exports = validateCreateUserData