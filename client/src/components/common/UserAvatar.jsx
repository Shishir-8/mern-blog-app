
import React, { useEffect } from 'react'
import { DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuContent, DropdownMenuItem} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '@/redux/auth/authThunk'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { resetState } from '@/redux/auth/authSlice'
import Loader from './Loader'

export default function UserAvatar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isError} = useSelector((state) => state.auth)
 

  const handleLogout = async () => {
   try {
     await dispatch(logoutUser()).unwrap()
     toast.success("Logout succesfull")
     dispatch(resetState())
     navigate("/login")
   } catch (error) {
    toast.error(error)
   }
  }
 
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://cdn-icons-png.flaticon.com/128/924/924915.png" />
              <AvatarFallback>
                S
              </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => console.log("Go to profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
