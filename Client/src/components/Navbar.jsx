import { Link } from "react-router-dom";
import SearchUsers from "./search-user";
import UserInfo from "./userInfo";

export default function Navbar() {
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
        <div className='hidden md:flex'>
          <UserInfo />
        </div>
      </nav>
    </>
  );
}
