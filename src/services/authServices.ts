import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/user";
import dotenv from 'dotenv';
import UserInterface from '../types/userInterface';
import LoginInterface from '../types/loginInterface';

dotenv.config();

interface JwtPayload {
    id: number;
}

// mock user
const mockUsers = [
    {
        id: 1,
        username: 'mockUser',
        email: 'mock@user.com',
        password: 'password123'
    }
];

export const registerUser = async (body: UserInterface) => {

    //mock
    const existingUser = mockUsers.find(user => user.email === body.email);

    /*const existingUser = await User.findOne({
        where: { email: body.email }
    });*/

    if (existingUser) {
        throw new Error("Email already in use");
    };

    const hashedPassword = await hash(body.password, 10);

    //mock
    const newUser = {
        id: mockUsers.length + 1,
        ...body,
        password: hashedPassword,
    };

    mockUsers.push(newUser);

    /*const userDB = await User.create({
        ...body,
        password: hashedPassword
    });*/
};

export const loginUser = async (body: LoginInterface) => {
    const { email, password } = body;

    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    //mock
    const user = mockUsers.find(user => user.email === email);

    /*const user = await User.findOne({
        where: { email }
    });*/

    if (!user) {
        throw new Error("User not found");
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
        throw new Error("Invalid password");
    }

    if (!process.env.SECRET_KEY) {
        throw new Error("SECRET_KEY is not defined in environment variables");
    }

    const access_token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

    return access_token;
};

export const verifyToken = async (authHeader?: string) => {
    if (!authHeader) {
        throw new Error("Authentication required");
    }

    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer") {
        throw new Error("Invalid token format");
    }

    if (!process.env.SECRET_KEY) {
        throw new Error("Missing SECRET_KEY in environment variables");
    }

    const payload = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;
    if (!payload?.id) {
        throw new Error("Invalid token");
    }

    const user = await User.findByPk(payload.id);
    if (!user) {
        throw new Error("User not found");
    }

    return user.id;
};
