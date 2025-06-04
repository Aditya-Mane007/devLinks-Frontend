export const fetchLinks = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/link/getLinks", {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();

  return data;
};

export const createLinks = async (formData) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/link/createLink",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  const data = await res.json();

  return data;
};

export const deleteLinks = async (id) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/link/deleteLink/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await res.json();

  return data;
};
