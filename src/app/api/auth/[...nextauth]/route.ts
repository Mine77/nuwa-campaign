import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

const handler = NextAuth({
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID || "",
            clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
            version: "2.0",
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.twitterHandle = token.twitterHandle as string;
            }
            return session;
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                token.twitterHandle = (profile as any).data?.username;
            }
            return token;
        },
    },
});

export { handler as GET, handler as POST }; 