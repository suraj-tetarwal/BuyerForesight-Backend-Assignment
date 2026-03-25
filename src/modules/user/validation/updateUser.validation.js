function validateUpdateUserData(data) {
    const { name, username, email, age, phone, location } = data;

    if (Object.keys(data).length === 0) {
        const error = new Error("At least one field is required to update");
        error.statusCode = 400;
        throw error;
    }

    const cleanData = {};

    if (name !== undefined) {
        if (!name.trim()) {
            const error = new Error("Name cannot be empty");
            error.statusCode = 400;
            throw error;
        }
        cleanData.name = name.trim();
    }

    if (username !== undefined) {
        if (!username.trim()) {
            const error = new Error("Username cannot be empty");
            error.statusCode = 400;
            throw error;
        }
        cleanData.username = username.trim();
    }

    if (email !== undefined) {
        if (!email.trim()) {
            const error = new Error("Email cannot be empty");
            error.statusCode = 400;
            throw error;
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            const error = new Error("Invalid email format");
            error.statusCode = 400;
            throw error;
        }

        cleanData.email = email.trim().toLowerCase()
    }

    if (age !== undefined) {
        const parsedAge = Number(age);

        if (Number.isNaN(parsedAge) || parsedAge < 0) {
            const error = new Error("Age must be a valid positive number");
            error.statusCode = 400;
            throw error;
        }

        cleanData.age = parsedAge;
    }

    if (phone !== undefined) {
        const phoneRegex = /^\d{10}$/
        if (typeof(phone) !== "string" || !phoneRegex.test(phone.trim())) {
            const error = new Error("Invalid phone number");
            error.statusCode = 400;
            throw error;
        }

        cleanData.phone = phone.trim();
    }

    if (location !== undefined) {
        if (typeof(location) !== "string") {
            const error = new Error("Location must be a string");
            error.statusCode = 400;
            throw error;
        }

        cleanData.location = location.trim();
    }

    return cleanData;
}

module.exports = validateUpdateUserData