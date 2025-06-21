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

const authService = {
  loginUser,
  registerUser,
};

export default authService;
