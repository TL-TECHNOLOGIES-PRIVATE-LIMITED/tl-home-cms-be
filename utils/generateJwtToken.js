import jwt from "jsonwebtoken";

const generateJwtToken = (user) => {

    const payload = {
        id: user.id,
        email: user.email,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
}

export default generateJwtToken