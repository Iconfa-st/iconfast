"use server"
import {auth, signIn, signOut} from "@/utils/auth/authConfig";
import {db} from "@/utils/database";
import bcrypt from "bcryptjs";

export async function checkAuth() {
    const session = await auth()
    return session;
}

export async function handleSignOut() {
    try {
        await signOut({redirectTo: "/"})
    } catch (e) {
        console.error(e)
        throw e
    }
}

export async function handleAuthWithGoogle() {
    try {
        await signIn("google", {redirectTo: "/dashboard"})
    } catch (e) {
        console.error(e)
        throw e
    }
}

export async function handleAuthWithCredentials(credentials: { email: string, password: string }) {
    try {
        await signIn("credentials", {
            email: credentials.email,
            password: credentials.password,
            redirectTo: "/dashboard"
        })
    } catch (e) {
        console.error(e)
        throw e
    }
}

export async function handleRegisterWithCredentials(credentials: { email: string, password: string }) {
    try {
        const client = await db.connect();
        try {
            let queryResults = await client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [credentials.email, credentials.password]);
            if (queryResults.rows.length > 0) throw new Error("User already exists")

            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(credentials.password, salt);

            await client.query('INSERT INTO users(email, password) VALUES ($1, $2)', [credentials.email, hashedPassword]);
        } finally {
            client.release();
        }
        await signIn("credentials", {
            email: credentials.email,
            password: credentials.password,
            redirectTo: "/dashboard"
        })
    } catch (e) {
        console.error(e)
        throw e
    }
}