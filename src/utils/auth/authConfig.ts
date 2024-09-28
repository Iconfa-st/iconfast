import NextAuth from "next-auth"
import "next-auth/jwt"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import PostgresAdapter from "@auth/pg-adapter"
import {db} from "@/utils/database";

const config = {
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    adapter: PostgresAdapter(db),
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                }
            }
            return token
        },
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                mail: {label: "Mail", type: "text", placeholder: "jsmith@mail.com"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const client = await db.connect();
                let resUser;
                try {
                    resUser = await client.query('SELECT * FROM users WHERE email = $1', [credentials.mail]);
                    resUser = resUser.rows[0]
                } finally {
                    client.release();
                }
                if (resUser) {
                    console.log("login success")
                    console.log("resUser", resUser)
                    return resUser
                }
                return null
            }
        }),
    ],
}

export const {handlers, auth, signIn, signOut} = NextAuth(config)

