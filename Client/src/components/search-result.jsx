import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleSearch } from "../api/friend.api";
import { PiSpinner } from "react-icons/pi";
import AddFriend from "./add-friend";

export default function SearchResult() {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    const getResults = async () => {
      const { data } = await handleSearch(query);
      if (!data) {
        return null;
      }
      setResults(data);
      setLoading(false);
    };
    getResults();
  }, [query]);
  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl mt-4 font-bold mb-6 '>Search Results:</h2>
        <div className='w-72 bg-white rounded-t-none rounded border-t-0'>
          {results &&
            results.map((user) => (
              <div
                key={user._id}
                className='flex justify-between items-center px-4 py-2 hover:bg-zinc-200 rounded'>
                <div>
                  <p className='font-medium'>{user.username}</p>
                </div>
                <AddFriend />
              </div>
            ))}
          {loading && (
            <div className='flex justify-center p-2'>
              <PiSpinner />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
