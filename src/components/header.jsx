import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LinkIcon, LogOut } from 'lucide-react'
import { UrlState } from '@/context'
import useFetch from '@/hooks/use-fetch'
import { logout } from '@/db/apiAuth'
import { BarLoader } from 'react-spinners'


const Header = () => {

    const navigate = useNavigate();

    // const user = false;

    const {user,fetchUser} = UrlState();

    const {loading,fn:fnLogout} = useFetch(logout);


    return (
        <>
        <nav className='py-4 flex justify-between items-center'>

            <Link to='/'>
                <img className='h-16' alt='logo' src='/logo.png' />
            </Link>

            <div>
                {
                    user ? (<DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={user?.user_metadata?.profile_pic} />
                                <AvatarFallback>{user?.user_metadata?.name}</AvatarFallback>
                            </Avatar>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>5AIPAVAN</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='flex gap-2'><Link to='/dashboard' className='flex gap-2'><LinkIcon className='h-4 w-4'/>My Links</Link></DropdownMenuItem>
                            <DropdownMenuItem className=' flex gap-2 text-red-600'><LogOut className='h-4 w-4'
                           />
                            <span  onClick={() => {fnLogout().then(()=>{
                                fetchUser();
                                navigate('/')
                            });
                            }} >Logout</span></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>) : (<Button className='bg-slate-50 text-black' onClick={() => { navigate("/auth") }}>Login</Button>)
                }
            </div>
           
        </nav>
         {loading && <BarLoader className='mb-4' width={"100%"} color="green"/>}
        </>
    )
}

export default Header
