import FriendRequests from "../components/card/friend-requests";
import YouMayKnow from "../components/card/you-may-know";
import YourFriends from "../components/card/your-friends";
import UserInfo from "../components/userInfo";

export default function Home() {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-2'>
        <section className='border p-2 bg-zinc-100 flex md:hidden justify-center'>
          <UserInfo />
        </section>
        <YouMayKnow />
        <FriendRequests />
        <YourFriends />
      </div>
    </>
  );
}
