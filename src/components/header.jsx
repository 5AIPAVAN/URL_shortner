import React from 'react'
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


const Header = () => {

    const navigate = useNavigate();
    const user = false;

    return (
        <nav className='py-4 flex justify-between items-center'>

            <Link to='/'>
                <img className='h-16' alt='logo' src='./logo.png' />
            </Link>

            <div>
                {
                    user ? <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src="dp_img.png" />
                                <AvatarFallback>MSD</AvatarFallback>
                            </Avatar>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>5AIPAVAN</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='flex gap-2'><LinkIcon className='h-4 w-4'/>My Links</DropdownMenuItem>
                            <DropdownMenuItem className=' flex gap-2 text-red-600'><LogOut className='h-4 w-4'/>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> : <Button className='bg-slate-50 text-black' onClick={() => { navigate("/auth") }}>Login</Button>
                }
            </div>



        </nav>
    )
}

export default Header
