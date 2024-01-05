"use client";

import { db } from "@/firebase/config";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const CreateJob = () => {
  const [employmentType, setEmploymentType] = useState("Full-time");

  const handleEmploymentTypeChange = (type: React.SetStateAction<string>) => {
    setEmploymentType(type);
  };

  const [formData, setFormData] = useState({
    jobTitle: "Frontend Developer",
    jobType: employmentType,
    requirements: "",
    jobLink: "",
    location: "",
    locationShort: "",
    companyName: "",
    companyImage: "",
    about: "",
    salary: "Salary negotiable",
  });

  const handleTypeChange = (type: string) => {
    setEmploymentType(type);
    setFormData({ ...formData, jobType: type });
  };

  const handleChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    try {
      const jobId = uuidv4();

      const requirementsArray = formData.requirements.split("#");

      const filteredRequirementsArray = requirementsArray.filter(
        (requirement) => requirement !== ""
      );

      const formDataWithId = {
        ...formData,
        jobDocId: jobId,
        timeStamp: Date.now() * 1000,
        requirements: filteredRequirementsArray,
      };

      const collectionRef = collection(db, "jobs");

      setDoc(doc(collectionRef, jobId), formDataWithId)
        .then(() => {
          toast.success("Job added successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        })
        .catch((error) => {
          console.error("Error writing document:", error);
        });

      setEmploymentType("Full-time");
      setFormData({
        jobTitle: "Frontend Developer",
        jobType: employmentType,
        requirements: "",
        jobLink: "",
        location: "",
        locationShort: "",
        companyName: "",
        companyImage: "",
        about: "",
        salary: "Salary negotiable",
      });
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  return (
    <div
      className="
    p-8
    max-w-2xl
    mx-auto"
    >
      <h1 className="text-3xl font-bold mb-10">Create Job</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-1">
          {/* <div>
            <label
              htmlFor="jobTitle"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Job title
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="jobTitle"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="type here brief job title"
              required
            />
          </div> */}

          <div>
            <label
              htmlFor="jobTitle"
              className="block mb-2 text-sm font-medium text-white"
            >
              Choose a job category
            </label>
            <select
              onChange={handleChange}
              id="jobTitle"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="UI/UX Developer">UI/UX Developer</option>
              <option value="Associate Software Engineer">
                Associate Software Developer
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="requirements"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Job requirements
            </label>
            <textarea
              onChange={handleChange}
              id="requirements"
              className="block w-full h-40 p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={`Write here a detailed job requirements separated with the character ‘#’`}
              style={{ resize: "none", textAlign: "left" }}
            />
          </div>

          <div>
            <label
              htmlFor="jobLink"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Job link
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="jobLink"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="paste the job link here"
              required
            />
          </div>

          <div>
            <label
              htmlFor="jobType"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Choose the type of employment
            </label>
            <div className="flex">
              <div
                onClick={() => handleTypeChange("Internship")}
                className={`cursor-pointer p-2 mr-2 transition duration-300 ease-in-out ${
                  employmentType === "Internship"
                    ? "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm text-center px-5 py-2.5"
                    : ""
                }`}
              >
                Internship
              </div>
              <div
                onClick={() => handleTypeChange("Full-time")}
                className={`cursor-pointer p-2 transition duration-300 ease-in-out ${
                  employmentType === "Full-time"
                    ? "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm text-center px-5 py-2.5"
                    : ""
                }`}
              >
                Full-time
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Job location
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="location"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" type here the job location"
              required
            />
          </div>

          <div>
            <label
              htmlFor="companyName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Company name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="companyName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="company name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="companyImage"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Company logo
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="companyImage"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="paste url of your company’s logo"
              required
            />
          </div>

          <div>
            <label
              htmlFor="about"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Company description
            </label>
            <textarea
              onChange={handleChange}
              id="about"
              className="block w-full h-40 p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={`type here brief description about your company`}
              style={{ resize: "none", textAlign: "left" }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
