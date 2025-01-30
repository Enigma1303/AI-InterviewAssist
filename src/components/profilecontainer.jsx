import { useAuth, UserButton } from '@clerk/clerk-react'
import { Loader } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export default function Profilecontainer() {
    const {isSignedIn,isLoaded} = useAuth();

    if(!isLoaded)
    {
        return <div className="flex items-center">
            <Loader className="min-w-4 min-h-4 animate-spin text-emerald-500"/>
        </div>
    }
  return (
    <div className="flex items-center gap-5">

    {isSignedIn? <UserButton/>:
    <Link to="signin">
    <Button>Get Started</Button>
    </Link>}
    </div>
  )
}
