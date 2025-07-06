import { db } from '@/config/firebase.config';
import { useAuth } from '@clerk/clerk-react';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { LoaderPage } from './Loader';
import CustomBreadCrumb from '@/components/customBreadcrumb';

const DisplayResults = () => {
  const { interviewId } = useParams();
  const [interview, setInterview] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState([])
  const [currentresults, setCurrentResults] = useState("");
  const { userId } = useAuth();
  const navigate = useNavigate();

  if (!interviewId) {
    navigate("/generate", { replace: true });
  }

  useEffect(() => {
    if (interviewId) {
      const fetchInterview = async () => {
        try {
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
          if (interviewDoc.exists()) {
            setInterview({
              id: interviewDoc.id,
              ...interviewDoc.data(),
            });
          }
        } catch (error) {
          console.log(error);
        }
      };

      const fetchFeedbacks = async () => {
        setIsLoading(true);
        try {
          const querSanpRef = query(
            collection(db, "userAnswers"),
            where("userId", "==", userId),
            where("mockIdRef", "==", interviewId)
          );

          const querySnap = await getDocs(querSanpRef);

          const interviewData = querySnap.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          setFeedbacks(interviewData);
        } catch (error) {
          console.log(error);
          toast("Error", {
            description: "Something went wrong. Please try again later..",
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchInterview();
      fetchFeedbacks();
    }
  }, [interviewId, navigate, userId]);

  const Score = useMemo(() => {
    if (feedbacks.length === 0) return "0.0";

    const totalScore = feedbacks.reduce(
      (acc, feedback) => acc + feedback.rating,
      0
    );

    return (totalScore / feedbacks.length).toFixed(1);
  }, [feedbacks]);

  const ScorePercentage = useMemo(() => {
    return ((parseFloat(Score) / 10) * 100).toFixed(1);
  }, [Score]);

  const getScoreColor = (score) => {
    const numScore = parseFloat(score);
    if (numScore >= 8) return 'text-emerald-600';
    if (numScore >= 6) return 'text-amber-600';
    return 'text-red-500';
  };

  const getScoreGradient = (score) => {
    const numScore = parseFloat(score);
    if (numScore >= 8) return 'from-emerald-500 to-emerald-600';
    if (numScore >= 6) return 'from-amber-500 to-amber-600';
    return 'from-red-500 to-red-600';
  };

  const getPerformanceText = (score) => {
    const numScore = parseFloat(score);
    if (numScore >= 8) return 'Excellent';
    if (numScore >= 6) return 'Good';
    if (numScore >= 4) return 'Average';
    return 'Needs Improvement';
  };

  if (isLoading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5 px-4 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <div className="flex items-center justify-between w-full gap-2">
        <CustomBreadCrumb
          breadCrumbPage={"Feedback"}
          breadCrumpItems={[
            { label: "Mock Interviews", link: "/generate" },
            {
              label: `${interview?.position}`,
              link: `/generate/interview/${interview?.id}`,
            },
          ]}
        />
      </div>

      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Interview Results</h1>
            <p className="text-slate-600">
              {interview?.position} at {interview?.company || 'Company'}
            </p>
            <p className="text-sm text-slate-500">
              {feedbacks.length} question{feedbacks.length !== 1 ? 's' : ''} answered
            </p>
          </div>
        </div>
      </div>

      {/* Overall Score Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">Overall Performance</h2>
        
        <div className="flex items-center gap-8">
          {/* Score Circle */}
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-slate-200"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - parseFloat(ScorePercentage) / 100)}`}
                className={`${getScoreColor(Score)} transition-all duration-1000 ease-in-out`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(Score)}`}>
                  {ScorePercentage}%
                </div>
                <div className="text-sm text-slate-500">Score</div>
              </div>
            </div>
          </div>

          {/* Score Details */}
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-600">Average Rating</div>
                <div className={`text-2xl font-semibold ${getScoreColor(Score)}`}>
                  {Score}/10
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-600">Performance</div>
                <div className={`text-2xl font-semibold ${getScoreColor(Score)}`}>
                  {getPerformanceText(Score)}
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-600">Questions</div>
                <div className="text-2xl font-semibold text-slate-800">
                  {feedbacks.length}
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-600">Completion</div>
                <div className="text-2xl font-semibold text-slate-800">
                  100%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Feedback Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">Detailed Feedback</h2>
        
        {feedbacks.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-slate-500">No feedback available yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {feedbacks.map((feedback, index) => (
              <div key={feedback.id} className="border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-slate-800">
                    Question {index + 1}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(feedback.rating)} bg-current bg-opacity-10`}>
                      {feedback.rating}/10
                    </div>
                    <div className="text-sm text-slate-500">
                      {((feedback.rating / 10) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Question:</h4>
                    <p className="text-slate-600 bg-slate-50 p-3 rounded-lg">
                      {feedback.question}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Your Answer:</h4>
                    <p className="text-slate-600 bg-blue-50 p-3 rounded-lg">
                      {feedback.userAnswer}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-700 mb-2">Feedback:</h4>
                    <p className="text-slate-600 bg-green-50 p-3 rounded-lg">
                      {feedback.feedback}
                    </p>
                  </div>
                  
                  {feedback.improvement && (
                    <div>
                      <h4 className="font-medium text-slate-700 mb-2">Improvement Suggestions:</h4>
                      <p className="text-slate-600 bg-amber-50 p-3 rounded-lg">
                        {feedback.improvement}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => navigate("/generate")}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Take Another Interview
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Print Results
        </button>
      </div>
    </div>
  )
}

export default DisplayResults