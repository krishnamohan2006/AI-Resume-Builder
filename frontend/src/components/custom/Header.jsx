import React from 'react'
import { Button } from '../ui/button'
import { Link, Navigate } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
    const { user, isSignedIn } = useUser();
    // isSignedIn && <Navigate to={'/dashboard'} />

    return (
        <div className='p-3 px-5 flex justify-between shadow-md'>
            <Link to={'/dashboard'}>
            <p className='logoFont text-xl text-purple-500'><span className='text-purple-500'>AI</span> RESUME BUILDER</p>
            </Link>
            {isSignedIn ?
                <div className='flex gap-2 items-center'>
                    <Link to={'/dashboard'}>
                        <Button variant="outline">Dashboard</Button>
                    </Link>
                    <UserButton />
                </div> :
                <Link to={'/auth/sign-in'}>
                    <Button>Get Started</Button>
                </Link>
            }

        </div>
    )
}

export default Header