import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

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

                const email = credentials.email as string;
                const password = credentials.password as string;

                // First, try to find user in database
                try {
                    const user = await prisma.user.findUnique({
                        where: { email },
                    });

                    if (user && user.active) {
                        // Verify password with bcrypt
                        const isValid = await bcrypt.compare(password, user.password);
                        if (isValid) {
                            return {
                                id: user.id.toString(),
                                email: user.email,
                                name: user.name,
                            };
                        }
                    }
                } catch (error) {
                    console.error('Database user lookup error:', error);
                }

                // Fallback to environment admin
                const adminEmail = process.env.ADMIN_EMAIL || 'admin@loopersit.com';
                const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

                if (email === adminEmail && password === adminPassword) {
                    return {
                        id: 'env-admin',
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

