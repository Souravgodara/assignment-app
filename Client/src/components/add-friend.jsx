import { sendRequest } from "../api/friend.api";
import { useState } from "react";
import Button from "./Button";

export default function AddFriend(userId) {
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async () => {
    setLoading(true);
    const { success } = await sendRequest(userId); //requesterId
    if (success) {
      alert("Friend request sent successfully!");
    }
    setLoading(false);
  };
  return (
    <Button isLoading={loading} onClick={handleSendRequest} className=''>
      Add Friend
    </Button>
  );
}
