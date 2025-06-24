export const loginUser = async (formData) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
    method: "POST",
    body: JSON.stringify(formData),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  if (data) {
    localStorage.setItem("User", JSON.stringify(data.user));
  }

  return data;
};

export const registerUser = async (formData) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/register", {
    method: "POST",
    body: JSON.stringify(formData),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  if (data) {
    localStorage.setItem("User", JSON.stringify(data.user));
  }

  return data;
};

export const logoutUser = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(data.message);
  }

  const data = await res.json();

  localStorage.removeItem("User");

  return data;
};

export const fetchUser = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/getUser", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(data.message);
  }

  const data = await res.json();

  if (data) {
    localStorage.setItem("User", JSON.stringify(data.user));
  }
  return data;
};

export const updateUser = async (formData) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/auth/updateUser",
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  if (!res.ok) {
    throw new Error(data.message);
  }

  const data = await res.json();

  if (data) {
    localStorage.setItem("User", JSON.stringify(data.user));
  }
  return data;
};

const authService = {
  loginUser,
  registerUser,
  logoutUser,
  fetchUser,
  updateUser,
};

export default authService;
