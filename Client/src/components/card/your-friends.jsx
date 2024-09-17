import { useEffect, useState } from "react";
import { getFriends } from "../../api/friend.api";
import ButtonLoadingSpinner from "../ButtonLoadingSpinner";

export default function YourFriends() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getFriendsList = async () => {
      const { data } = await getFriends();
      if (data) {
        setFriends(data);
      }
      setLoading(false);
    };
    getFriendsList();
  }, []);
  return (
    <>
      <div className='border'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Your Friends</h1>
        <div className='flex flex-wrap gap-6'>
          {loading ? (
            <div className='flex justify-center items-center w-full'>
              <ButtonLoadingSpinner />
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              {friends?.length === 0 ? (
                <h2 className='text-center w-full font-semibold'>
                  No Requests
                </h2>
              ) : (
                friends?.map((friend) => (
                  <div
                    key={friend._id}
                    className='flex items-center justify-between p-2 border-b last:border-b-0'>
                    <div className='text-lg font-medium'>{friend.username}</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}