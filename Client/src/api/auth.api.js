export const login = async (email, password) => {
  try {
    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data, message } = await res.json();
    if (!res.ok) {
      return { error: message };
    }
    return { data: data };
  } catch (error) {
    console.log({ error });
    return { error: "Something went wrong" };
  }
};

export const signup = async (username, email, password) => {
  try {
    const res = await fetch("http://localhost:3001/auth/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data, message } = await res.json();
    if (!res.ok) {
      return { error: message };
    }
    return { data: data };
  } catch (error) {
    console.log({ error });
    return { error: "Something went wrong" };
  }
};
export const logout = async () => {
  try {
    const res = await fetch("http://localhost:3001/auth/logout", {
      credentials: "include",
    });
    const { message } = await res.json();
    if (!res.ok) {
      return { error: message };
    }
    return { data: true };
  } catch (error) {
    console.log({ error });
    return { error: "Something went wrong" };
  }
};

export const fetchCurrentUser = async () => {
  try {
    const res = await fetch("http://localhost:3001/auth/current-user", {
      credentials: "include",
    });
    const { data, message } = await res.json();
    if (!res.ok) {
      return { error: message };
    }
    return { data };
  } catch (error) {
    console.log("Fetch-Current-User", { error });
    return { error: "Something went wrong" };
  }
};
