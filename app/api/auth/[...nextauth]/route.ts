import { app, db, firebaseConfig } from "@/app/firebaseConfig";
import { FirestoreAdapter  } from "@auth/firebase-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import * as firestoreFunctions from "firebase/firestore";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
//     }),
//   ],
//   adapter: FirestoreAdapter({
//     db: db,
//     ...firestoreFunctions
//   })
// });

// export { handler as GET, handler as POST };

export default NextAuth({
  adapter: FirestoreAdapter(firebaseConfig)
});
