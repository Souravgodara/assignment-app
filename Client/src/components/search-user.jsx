import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchUsers() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <form className='flex items-center space-x-1'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search by username or email'
          className='w-64 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <Link
          to={`/search/${query}`}
          type='submit'
          className='px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
          Search
        </Link>
      </form>
    </div>
  );
}
