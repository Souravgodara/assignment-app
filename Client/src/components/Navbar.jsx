import { PiUserCircleFill } from "react-icons/pi";
import LogOut from "./log-out";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import SearchUsers from "./search-user";

export default function Navbar() {
  const { user } = useContext(UserContext);
  return (
    <>
      <nav className='flex items-center justify-between bg-zinc-200 p-2 rounded'>
        <Link
          to={"/"}
          className='font-semibold bg-blue-500 text-white px-2 py-1 rounded hover:cursor-pointer'>
          TuteDude
        </Link>
        <div>
          <SearchUsers />
        </div>
        <div className='flex'>
          <div className='flex items-center gap-1'>
            <PiUserCircleFill size={30} />
            <h2 className='font-medium hover:cursor-pointer'>
              {user?.username}
            </h2>
          </div>
          <div className='ml-4'>
            <LogOut />
          </div>
        </div>
      </nav>
    </>
  );
}
