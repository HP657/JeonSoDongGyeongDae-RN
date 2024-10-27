import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

async function API(endpoint, method, body, requireToken = false) {
  let headers = {};

  if (requireToken) {
    const token = await AsyncStorage.getItem("accessToken");

    try {
      const response = await axios.get(`${API_URL}/sales/auth/check/token`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log("Token check error:", error);
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const url = `${API_URL}${endpoint}`;

  return axios({
    method,
    url,
    data: body,
    headers,
  });
}

export default API;
