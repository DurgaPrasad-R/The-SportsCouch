import { toast } from "react-toastify";
const loginUser = async (formData) => {
  console.log(formData);
  let responseData;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  await fetch(apiUrl + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      responseData = data;
    });
  if (responseData.success) {
    localStorage.setItem("auth-token", responseData.token);
    window.location.replace("/user");
    toast.success("Logged in successfully!");
  } else {
    toast.error(responseData.message);
  }
};

export default loginUser;
