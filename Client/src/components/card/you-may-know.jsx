import { useEffect, useState } from "react";
import { fetchUsers } from "../../api/friend.api";
import AddFriend from "../add-friend";

export default function YouMayKnow() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await fetchUsers();
      if (data) {
        setUsers(data);
      }
    };
    getUsers();
  }, []);

  return (
    <>
      <div className='border p-2'>
        <h1 className='text-2xl font-bold mb-6 text-center'>You May Know</h1>
        <div className='flex flex-wrap gap-3'>
          {users &&
            users.map((user) => (
              <div
                key={user._id}
                className='border flex justify-between w-full border-gray-300 p-3 rounded-lg shadow-md'>
                <div>
                  <h1 className='text-xl font-semibold'>{user.username}</h1>
                  <h2 className='text-gray-600'>{user.email}</h2>
                </div>

                <AddFriend userId={user._id} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
