import { toast } from "react-toastify";
const signIn = async (formData) => {
  console.log(formData);
  let responseData;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  await fetch(apiUrl + "/users/signup", {
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
    toast.success("Signed up successfully!");
  } else {
    toast.error(responseData.message);
  }
};

export default signIn;
