import AsyncStorage from "@react-native-async-storage/async-storage";

const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken !== null) {
      // 토큰이 존재하는 경우
      console.log("Access Token:", accessToken);
      return accessToken;
    } else {
      console.log("No token found");
      return null;
    }
  } catch (error) {
    console.error("Error reading access token:", error);
    return null; // 에러가 발생했을 때 null을 반환하도록 설정
  }
};

export default getAccessToken;
