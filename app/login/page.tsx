"use client";

import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";
import { onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initial loading state
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Set loading to false when the authentication state changes
      if (user) {
        router.push("/home");
      }
    });

    return () => unsubscribe(); // Cleanup function
  }, []); // Run only once on component mount

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     router.push("/home");
  //   }
  // }, [user, router]);

  return (
    <div className="overflow-hidden flex mx-auto max-w-[1440px] px-6 lg:px-20 3xl:px-0 items-center justify-center min-h-screen">
      {/* LEFT SIDE */}
      <div className="relative z-20 flex-1 flex-col xl:w-1/2 items-center ">
        <form className="max-w-sm mx-auto">
          <div className="flex">
            <Image
              src={"/code_alarm_main_logo.svg"}
              alt="logo"
              width={50}
              height={50}
              className="mr-3"
            />
            <h1 className="text-2xl font-bold py-8">Code Alarm</h1>
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log In
          </button>

          <div className="my-4 text-sm font-medium text-gray-900 dark:text-white flex items-center justify-center">
            OR
          </div>

          <button
            type="button"
            onClick={signInWithGoogle}
            className="justify-center text-white w-full border border-[#2D3A53] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <span className="mr-2">
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                <>Sign in with Google</>
              </span>
            ) : (
              <>Sign in with Google</>
            )}
          </button>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:hidden xl:block">
        <Image
          src="/coder_1.svg"
          alt="coder"
          width={600}
          height={600}
          className=""
        />
      </div>
    </div>
  );
};

/*
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

*/

export default Login;
