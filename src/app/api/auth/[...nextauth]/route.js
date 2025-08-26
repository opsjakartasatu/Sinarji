import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

const basePath = process.env.BASE_PATH;
const secret = process.env.NEXTAUTH_SECRET;
const nextAuthUrl = process.env.NEXTAUTH_URL;

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                    const urlencoded = new URLSearchParams();
                    urlencoded.append("email", email);
                    urlencoded.append("password", password);

                    const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: urlencoded,
                        redirect: "follow"
                    };

                    const response = await fetch("https://jakartasatu.jakarta.go.id/apimobile/internal/backend/auth/login", requestOptions);

                    if (!response.ok) {
                        throw new Error("Invalid email or password!");
                    }

                    const result = await response.json();

                    const sessionData = {
                        id: result.data.id,
                        name: result.data.name,
                        email: result.data.email,
                        roles: result.data.roles,
                        groups: result.data.groups,
                        access_token: result.access_token,
                        simpul_jaringan: result.data.simpul_jaringan
                    }

                    return sessionData;
                } catch (error) {
                    console.log("Error: ", error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60,
    },
    secret: secret,
    pages: {
        signIn: `${nextAuthUrl}/login`,
        signOut: `${nextAuthUrl}/`,
    },
    NEXTAUTH_URL: nextAuthUrl,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.roles = user.roles;
                token.groups = user.groups;
                token.access_token = user.access_token;
                token.simpul_jaringan = user.simpul_jaringan;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.roles = token.roles;
                session.user.groups = token.groups;
                session.user.access_token = token.access_token;
                session.user.simpul_jaringan = token.simpul_jaringan;
            }
            return session;
        },
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };