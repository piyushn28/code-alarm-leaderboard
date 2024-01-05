"use client";

import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const handleSignOut = () => {
    try {
      if (user) {
        auth.signOut();
        router.push("/login");
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <nav className="bg-gray-900 p-4 text-white">
      <div className="flex justify-between">
        <div className="flex">
          <h1 className="text-2xl font-bold">Code Alarm</h1>
        </div>
        <div className="flex w-auto space-x-1">
          <button
            type="button"
            onClick={() => {
              router.push("/createJob");
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Post Jobs
          </button>
          <div
            className="cursor-pointer text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              router.push("/leaderboard");
            }}
          >
            Leaderboard
          </div>
          <div
            className="cursor-pointer text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              router.push("/landingcodewindow");
            }}
          >
            Playground
          </div>
          {user && (
            <div>
              <button
                type="button"
                onClick={handleSignOut}
                className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700  items-center"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
