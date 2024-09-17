import { respondRequest } from "../api/friend.api";
import Button from "./Button";

export default function AcceptRequest(requestId) {
  const status = "accepted";
  const handleRequest = () => {
    const { data } = respondRequest(requestId.requestId, status);
    if (data) {
      alert(data);
    }
  };
  return <Button onClick={handleRequest}>Accept</Button>;
}
