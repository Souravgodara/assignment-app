import FriendRequests from "../components/card/friend-requests";
import YouMayKnow from "../components/card/you-may-know";
import YourFriends from "../components/card/your-friends";

export default function Home() {
  return (
    <>
      <div className='grid grid-cols-3 mt-6'>
        <YouMayKnow />
        <FriendRequests />
        <YourFriends />
      </div>
    </>
  );
}
