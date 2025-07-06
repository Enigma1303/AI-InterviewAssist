import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { LoaderPage } from './Loader';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase.config';
import CustomBreadCrumb from '@/components/customBreadcrumb';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';
import QuestionsFormat from '@/components/questionsFormat';

const InterviewPage = () => {
    const {interviewId}=useParams();
    const [interview,setInterview]=useState(null)
    const [isLoading,setLoading]=useState(false);
    const [isWebCamEnabled,setIsWebCamEnabled]=useState(false)
    
    const navigate= useNavigate();

    if (!interviewId) {
        navigate("/generate", { replace: true });
      }

      useEffect(() => {
        const fetchInterview = async () => {
          if (interviewId) {
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
          }
        };
    
        fetchInterview();
      }, [interviewId],navigate);

      if(isLoading)
    {
        return <LoaderPage className="w-full h-[70vh]"/>
    }
   
  return (
    <div className="flex flex-col w-full gap-8 py-5" >
    <CustomBreadCrumb
    breadCrumbPage="Start"
    breadCrumpItems={[
        { label: "Mock Interviews", link:"/generate"},
        {
            label:interview?.position||"",
            link:`/generate/interview/${interview?.id}`,
        },
    ]}
    />
    <div>
    <Alert className="bg-yellow-100/50 border-yellow-200 p-4 rounded-lg flex items-start gap-3 -mt-3">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            <div>
              <AlertTitle className="text-yellow-800 font-semibold">
                Important Information
              </AlertTitle>
              <AlertDescription className="text-sm text-yellow-700 mt-1">
                Please enable your webcam and microphone to start the AI-generated
                mock interview. The interview consists of five questions. You’ll
                receive a personalized report based on your responses at the end.{" "}
                <br />
                <br />
                <span className="font-medium">Note:</span> Your video is{" "}
                <strong>never recorded</strong>. You can disable your webcam at any
                time.
              </AlertDescription>
            </div>
          </Alert>
          </div>

          {interview?.questions && interview?.questions.length>0 &&(
            <div className='mt-4 w-full flex flex-col items-start gap-4'>
                <QuestionsFormat questions={interview?.questions}/>
                </div>
          )}
    </div>

  )
}

export default InterviewPage
