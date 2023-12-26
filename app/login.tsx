// pages/login.js
"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleProvider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/Leaderboard');
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

//   useEffect(() => {
//     if (user) {
//       router.push('/leaderboard');
//     }
//   }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Sign In with Google</h1>
        {user ? (
          <p>Welcome, {user.displayName}!</p>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={signInWithGoogle}
          >
            Sign In with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
