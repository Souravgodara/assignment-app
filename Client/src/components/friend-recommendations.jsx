import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FriendRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch("/api/friends/recommendations/currentUserId");
        const data = await res.json();
        setRecommendations(data);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className='max-w-xl mx-auto my-10'>
      <h2 className='text-2xl font-bold mb-6 text-center'>
        Friend Recommendations
      </h2>
      <div className='space-y-4'>
        {recommendations.map((user) => (
          <div
            key={user._id}
            className='flex justify-between items-center p-3 border rounded-md'>
            <div>
              <p className='font-medium'>{user.username}</p>
              <p className='text-sm text-gray-600'>{user.email}</p>
            </div>
            <button
              onClick={() => navigate(`/send-request/${user._id}`)}
              className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'>
              Add Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
