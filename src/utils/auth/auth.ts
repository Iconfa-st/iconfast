"use server"
import {auth, signIn, signOut} from "@/utils/auth/authConfig";

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