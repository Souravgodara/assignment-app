export const fetchUsers = async () => {
  try {
    const res = await fetch("http://localhost:3001/user/list-users", {
      credentials: "include",
    });
    const { data, message } = await res.json();
    if (!res.ok) {
      return { error: message };
    }
    return { data: data };
  } catch (err) {
    console.log({ err });
    return { error: "Something went wrong" };
  }
};

export const handleSearch = async (query) => {
  try {
    const res = await fetch(
      `http://localhost:3001/user/search?query=${query}`,
      {
        credentials: "include",
      }
    );
    const { data, message } = await res.json();
    console.log(data);
    if (!res.ok) {
      return { error: message };
    }
    return { data: data };
  } catch (err) {
    console.log({ err });
    return { error: "Something went wrong" };
  }
};

export const sendRequest = async (userId) => {
  try {
    const res = await fetch("http://localhost:3001/user/send-request", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipientId: userId,
      }),
    });
    const { data, message } = await res.json();
    if (!res.ok) {
      return { error: message };
    }
    return { success: true };
  } catch (err) {
    console.log({ err });
    return { error: "Something went wrong" };
  }
};

export const getRequests = async () => {
  try {
    const res = await fetch("http://localhost:3001/user/fetch-requests", {
      credentials: "include",
    });
    const { data, message } = await res.json();
    if (!res.ok) {
      return { error: message };
    }
    return { data: data };
  } catch (err) {
    console.log({ err });
    return { error: "Something went wrong" };
  }
};

export const respondRequest = async (requestId, status) => {
  try {
    const res = await fetch("http://localhost:3001/user/respond-request", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ requestId, status }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { message } = await res.json();
    console.log({ message });
    if (!res.ok) {
      return { error: message };
    }
    return { data: message };
  } catch (err) {
    console.log({ err });
    return { error: "Something went wrong" };
  }
};

export const getFriends = async () => {
  try {
    const res = await fetch("http://localhost:3001/user/friends", {
      credentials: "include",
    });
    const { data, message } = await res.json();
    console.log({ message });
    if (!res.ok) {
      return { error: message };
    }
    return { data: data };
  } catch (err) {
    console.log({ err });
    return { error: "Something went wrong" };
  }
};
