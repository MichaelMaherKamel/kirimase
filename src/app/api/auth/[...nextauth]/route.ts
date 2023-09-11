import { db } from '@/lib/db'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { DefaultSession, NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string
    }
  }
}

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id
      return session
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
