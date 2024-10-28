import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

async function API(endpoint, method, body, requireToken = false) {
  let headers = {};

  if (requireToken) {
    const token = await AsyncStorage.getItem("accessToken");

    try {
      await axios.get(`${API_URL}/sales/auth/check/token`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Token check error:", error);
      return null;
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const url = `${API_URL}${endpoint}`;

  if (body instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  }
  return axios({
    method,
    url,
    data: body,
    headers,
  });
}

export default API;
