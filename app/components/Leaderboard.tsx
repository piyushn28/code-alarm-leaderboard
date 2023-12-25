"use client";

import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { getSession } from "next-auth/react";

async function fetchLeaderboardDataFromFirestore() {
  const querySnapshot = await getDocs(
    query(collection(db, "users"), orderBy("totalQuizScore", "desc"), limit(10))
  );

  const leaderboardData: any = querySnapshot.docs.map((doc, index) => ({
    rank: index + 1,
    name: doc.data().name,
    totalQuizScore: doc.data().totalQuizScore,
  }));

  console.log("leaderboardData",leaderboardData);

  return leaderboardData;
}

async function getUserSession() {
    const session = await getSession();
    console.log('Current session:', session);
  }


const Leaderboard = () => {
    

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchLeaderboardDataFromFirestore();
      console.log("data->",data);
      setUserData(data);
    };

    //getUserSession();

    fetchData();
  });

  const leaderboardData = [
    { rank: 1, name: "John Doe", rating: 2500 },
    { rank: 2, name: "Jane Smith", rating: 2400 },
    { rank: 3, name: "Mike Johnson", rating: 2300 },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-10 rounded-lg ">
        <h1 className="text-blue-500 text-3xl font-bold mb-4">Leaderboard</h1>
        {leaderboardData.map((data) => (
          <div key={data.rank} className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-800 text-xl font-bold">
                {data.rank}
              </span>
            </div>
            <div className="ml-4">
              <h2 className="text-gray-800 text-lg font-bold">{data.name}</h2>
              <p className="text-gray-600">Rating: {data.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
