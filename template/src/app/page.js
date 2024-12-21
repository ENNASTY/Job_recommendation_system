"use client";

import { FaBullhorn, FaRegSmileBeam, FaChartLine } from "react-icons/fa"; // Importer des icônes de react-icons

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-teal-400 flex flex-col items-center justify-center text-white">
      {/* Hero Section */}
      <header className="text-center max-w-4xl px-6 md:px-0">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to JobMatch
        </h1>
        <p className="text-lg md:text-xl font-light mb-8">
          Your personalized job recommendation system. Discover your next dream
          job effortlessly.
        </p>
        <a
          href="/recommendations"
          className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Get Started
        </a>
      </header>

      {/* Features Section */}
      <section className="mt-20 w-full px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose JobMatch?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 bg-white text-indigo-500 rounded-full flex items-center justify-center shadow-lg">
              <FaBullhorn className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Advanced Recommendations</h3>
            <p className="text-sm mt-2">
              Leveraging AI to provide the best job matches based on your
              profile.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 bg-white text-teal-500 rounded-full flex items-center justify-center shadow-lg">
              <FaRegSmileBeam className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Simple Interface</h3>
            <p className="text-sm mt-2">
              Clean and intuitive design for easy navigation and usage.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4 bg-white text-teal-500 rounded-full flex items-center justify-center shadow-lg">
              <FaChartLine className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Comprehensive Insights</h3>
            <p className="text-sm mt-2">
              Access detailed job descriptions, company reviews, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} JobMatch. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
