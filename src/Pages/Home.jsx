import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import interviewImage from "../assets/Job-interview-tips-1.jpg"
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
     

     
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Practice Mock Interviews with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get personalized feedback, improve your interview skills, and land your dream job with our AI-powered mock interview platform.
          </p>
          
        
          <button
            onClick={() => navigate("/generate")}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Mock Interview
          </button>
          
         
         
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform helps you practice and improve your interview skills effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              {/* INSERT FEATURE ICON 1 HERE */}
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-indigo-600 text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI-Powered Feedback
              </h3>
              <p className="text-gray-600">
                Get detailed, personalized feedback on your answers to improve your interview performance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              {/* INSERT FEATURE ICON 2 HERE */}
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-600 text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Performance Analytics
              </h3>
              <p className="text-gray-600">
                Track your progress and see detailed analytics of your interview performance over time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              {/* INSERT FEATURE ICON 3 HERE */}
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-purple-600 text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Role-Specific Questions
              </h3>
              <p className="text-gray-600">
                Practice with questions tailored to your specific job role and experience level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get started with your mock interview in just 3 simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              {/* INSERT STEP ICON 1 HERE */}
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Setup Your Interview
              </h3>
              <p className="text-gray-600">
                Choose your job role, experience level, and interview type to get started.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              {/* INSERT STEP ICON 2 HERE */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Practice & Answer
              </h3>
              <p className="text-gray-600">
                Answer AI-generated questions just like in a real interview scenario.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              {/* INSERT STEP ICON 3 HERE */}
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Get Feedback
              </h3>
              <p className="text-gray-600">
                Receive detailed feedback and tips to improve your interview skills.
              </p>
            </div>
          </div>
        </div>
      </section>


             
        
    </div>
  );
}