"use server"
import {auth, signIn} from "@/utils/auth/authConfig";

export async function checkAuth() {
    const session = await auth()
    return !!session;
}

export async function handleAuthWithGoogle() {
    try {
        await signIn("google", {redirectTo: "/dashboard"})
    } catch (e) {
        console.error(e)
    }
}

export async function handleAuthWithCredentials(credentials: { mail: string, password: string }) {
    try {
        await signIn("credentials", {
            mail: credentials.mail,
            password: credentials.password,
            redirectTo: "/dashboard"
        })
    } catch (e) {
        console.error(e)
    }
}