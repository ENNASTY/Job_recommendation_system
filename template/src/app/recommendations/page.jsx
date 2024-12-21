"use client";
import { useState } from "react";
import { getRecommendations } from "../../services/api";
import {
  FaSearch,
  FaBriefcase,
  FaLocationArrow,
  FaInfoCircle,
} from "react-icons/fa"; // Utilisation des icônes

const Recommendation = () => {
  const [userDescription, setUserDescription] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    setLoading(true);
    try {
      const data = await getRecommendations(userDescription);
      setRecommendations(data);
    } catch (error) {
      alert("Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  const toggleDescription = (index) => {
    setRecommendations((prev) =>
      prev.map((job, i) =>
        i === index ? { ...job, showDescription: !job.showDescription } : job
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Job Recommendation System
        </h1>

        {/* Form for user input */}
        <div className="flex flex-col items-center">
          <textarea
            value={userDescription}
            onChange={(e) => setUserDescription(e.target.value)}
            placeholder="Enter your profile description (skills, experience, etc.)"
            className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-lg"
          />
          <button
            onClick={handleRecommend}
            disabled={loading}
            className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Loading..." : "Get Recommendations"}
          </button>
        </div>

        {/* Job recommendations */}
        <ul className="space-y-4">
          {recommendations.map((job, index) => (
            <li
              key={index}
              className="relative p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Match probability label */}
              <span className="absolute top-4 right-4 text-xs font-bold text-white bg-green-500 rounded-full py-1 px-4 shadow-lg">
                {Math.round(job.match_probability * 100)}% Match
              </span>

              {/* Job title */}
              <strong className="block text-2xl font-semibold text-gray-800 mb-2">
                {job.jobs_titles}
              </strong>

              {/* Job details */}
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <FaBriefcase className="text-indigo-500" />
                  <span>{job.companies_names}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaLocationArrow className="text-indigo-500" />
                  <span>{job.jobs_locations}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaInfoCircle className="text-indigo-500" />
                  <span>{job.employment_type}</span>
                </div>
              </div>

              {/* Show/Hide Description Button */}
              <button
                onClick={() => toggleDescription(index)}
                className="mt-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg transition-colors"
              >
                {job.showDescription ? "Hide Details" : "Show Details"}
              </button>

              {/* Job description */}
              {job.showDescription && (
                <p className="mt-4 text-sm text-gray-700">{job.describtion}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Recommendation;
