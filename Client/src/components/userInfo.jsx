import { useContext } from "react";
import { PiUserCircleFill } from "react-icons/pi";
import LogOut from "./log-out";
import { UserContext } from "../context/userContext";

export default function UserInfo() {
  const { user } = useContext(UserContext);
  return (
    <div className='flex'>
      <div className='flex items-center gap-1'>
        <PiUserCircleFill size={30} />
        <h2 className='font-medium hover:cursor-pointer'>{user?.username}</h2>
      </div>
      <div className='ml-4'>
        <LogOut />
      </div>
    </div>
  );
}
