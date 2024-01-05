"use client";

import React, { useEffect, useState } from "react";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

interface UserData {
  rank: number;
  name: string;
  totalQuizScore: number;
}

async function fetchLeaderboardDataFromFirestore() {
  const querySnapshot = await getDocs(
    query(collection(db, "users"), orderBy("totalQuizScore", "desc"), limit(5))
  );

  const leaderboardData: any = querySnapshot.docs.map((doc, index) => ({
    rank: index + 1,
    name: doc.data().name,
    totalQuizScore: doc.data().totalQuizScore,
  }));

  console.log("leaderboardData", leaderboardData);

  return leaderboardData;
}

const Leaderboard = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [user, loading] = useAuthState(auth);

  async function fetchData() {
    try {
      if (user) {
        const data = await fetchLeaderboardDataFromFirestore();
        setUserData(data);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  }

  useEffect(() => {
    if (user) {
      fetchData();
    }
    return () => {};
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-12 rounded-lg w-11/12 md:w-1/2 mx-4">
        <div className="flex">
          <h1 className="text-blue-500 text-3xl font-bold mb-4">Leaderboard</h1>
          <div className="text-blue-500 text-1xl font-bold mb-4 ml-auto">
            Top 5
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-12 h-12 text-gray-800 flex items-center justify-center">
            RANK
          </div>
          <div className="flex ml-4 justify-center">
            <div className="text-gray-800 ">NAME</div>
          </div>
          <div className="ml-auto">
            <p className="text-gray-600">POINTS</p>
          </div>
        </div>

        {userData.map((data) => (
          <div key={data.rank} className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-800 text-xl font-bold">
                {data.rank}
              </span>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-800 text-lg font-bold">{data.name}</h2>
            </div>
            <div className="ml-auto">
            <p className="text-gray-600">{data.totalQuizScore}</p>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
