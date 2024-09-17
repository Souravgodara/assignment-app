import { useEffect, useState } from "react";
import { getRequests } from "../../api/friend.api";
import ButtonLoadingSpinner from "../ButtonLoadingSpinner";
import AcceptRequest from "../accept-request";

export default function FriendRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const { data } = await getRequests();
        if (data) {
          setRequests(data);
        }
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className='border p-3 rounded-lg shadow-md'>
      <h1 className='text-3xl font-bold mb-4 text-center'>Friend Requests</h1>
      {loading ? (
        <div className='flex justify-center items-center w-full'>
          <ButtonLoadingSpinner />
        </div>
      ) : (
        <div className='flex flex-col gap-2'>
          {requests.length === 0 ? (
            <h2 className='text-center w-full font-semibold'>No Requests</h2>
          ) : (
            requests.map((request) => (
              <div
                key={request._id}
                className='flex items-center justify-between p-2 border-b last:border-b-0'>
                <div className='text-lg font-medium'>
                  {request?.requester.username}
                </div>
                <AcceptRequest requestId={request?._id} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
