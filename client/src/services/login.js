import { toast } from "react-toastify";
const loginUser = async (formData) => {
  try {
    console.log(formData);
    let responseData;
    const apiUrl = import.meta.env.VITE_API_BASE_URL_USER;
    await fetch(`${apiUrl}/users/login`, {
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
      toast.success("Logged in successfully!");
      return responseData.user;
    } else {
      toast.error(responseData.message);
      throw new Error(responseData.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Login failed. Please try again.");
    throw error;
  }
};

export default loginUser;
