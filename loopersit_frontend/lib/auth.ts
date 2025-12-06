import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Check against admin credentials from environment
                const adminEmail = process.env.ADMIN_EMAIL || 'admin@loopersit.com';
                const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

                if (credentials.email === adminEmail && credentials.password === adminPassword) {
                    return {
                        id: '1',
                        email: adminEmail,
                        name: 'Admin',
                    };
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
});
