import axios from "axios";
import { API_URL } from "@env";

const TokenValidation = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}/sales/auth/check/token`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default TokenValidation;
