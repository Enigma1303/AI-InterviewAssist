import Headings from '@/components/headings'
import InterviewBadge from '@/components/interviewBadge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/config/firebase.config'
import { useAuth } from '@clerk/clerk-react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export default function DashBoard() {
  const [interviews, setInterviews] = useState([])
  const [loading, setLoading] = useState(false)
  const { userId } = useAuth()

  useEffect(() => {
    if (!userId) return; // Prevents unnecessary execution if userId is not available

    setLoading(true);
    const interviewQuery = query(
      collection(db, "interviews"),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(
      interviewQuery,
      (snapshot) => {
        setInterviews(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching interviews:", error);
        toast.error("Something went wrong. Try again later.");
        setLoading(false);
      }
    );

    return unsubscribe; // Cleanup listener on unmount or userId change
  }, [userId]);

  return (
    <>
      <div className="w-full flex justify-between items-center">
        {/* Reusable heading component */}
        <Headings
          title="DashBoard"
          description="Create your custom interviews and practice now"
        />
        <Link to="/generate/create">
          <Button>
            <Plus /> Add New
          </Button>
        </Link>
      </div>

      <Separator />

      {/* Skeleton Loading Effect */}
      <div className="md:grid md:grid-cols-3 gap-3 py-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-24 md:h-32 rounded-md" />
          ))
        ) : interviews.length > 0? (
          interviews.map((interview) => (

            <InterviewBadge key={interview.id} interview={interview}>

            </InterviewBadge>
          ))
        ) : (
        <div className="md: col-span-3 w-full flex h-96 flex-col  items-center justify-center">
          <img
          src="/assets/svg/not-found.svg"
          className="w-50 h-50 object-contain"
          alt="NotFound Image">
          </img>

          <h2 className="text-lg font-bold">No Data Found</h2>
          <p className='text-sm font-semibold' >You have not created any interviews yet. Please add some Interviews first</p>
        </div>
        )}
      </div>
    </>
  )
}
