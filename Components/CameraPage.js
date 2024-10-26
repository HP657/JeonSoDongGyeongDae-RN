import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CameraPage({ setShowCameraPage }) {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          카메라 사용에 대한 허용이 필요합니다.
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      console.log(photo.uri);

      try {
        const token = await AsyncStorage.getItem("accessToken");

        if (token) {
          const uri = photo.uri;
          const image = {
            name: `${Date.now()}.jpg`,
            type: "image/jpeg",
            uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
          };
          console.log(image.uri);
          const formData = new FormData();
          formData.append("file", image);

          const response = await axios.post(
            `${API_URL}/component/image-ai/predict`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Upload success:", response.data);
        } else {
          console.log("No access token found.");
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowCameraPage(false)}>
          <Image
            source={require("./../assets/arrow.png")}
            style={styles.arrow}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>미션 클리어 카메라</Text>
      </View>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>화면 전환</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>사진 찍기</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.previewImage} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 15,
    marginTop: 50,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    right: 10,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  arrow: {
    width: 24,
    height: 24,
  },
});

export default CameraPage;
