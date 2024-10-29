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
import API from "./API/API";

function CameraPage({ setShowCameraPage, mission, point }) {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [thing, setThing] = useState(null);
  const [showRedOverlay, setShowRedOverlay] = useState(false);
  const [showGreenOverlay, setShowGreenOverlay] = useState(false);
  console.log(mission);
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

      try {
        const uri = photo.uri;
        const image = {
          name: `${Date.now()}.jpg`,
          type: "image/jpeg",
          uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
        };
        const formData = new FormData();
        formData.append("file", image);

        const response = await API(
          "/component/image-ai/predict",
          "POST",
          formData,
          true
        );
        console.log("Upload success:", response.data.prediction);
        setThing(response.data.prediction);

        if (response.data.prediction.result || true) {
          setShowRedOverlay(false);
          setShowGreenOverlay(true);
          try {
            const response = await API(
              "/sales/point/update",
              "POST",
              {
                input_type: "add",
                point,
              },
              true
            );
            console.log(response.data);
          } catch (error) {
            console.error("Failed:", error.message);
          }
        } else {
          setShowRedOverlay(true);
          setShowGreenOverlay(false);
        }
      } catch (error) {
        console.error("Upload failed:", error.message);
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
        {showRedOverlay && (
          <View style={[styles.overlay, { backgroundColor: "#FF0000" }]}>
            <Text style={styles.overlayTitle}>인증 실패</Text>
            <Text style={styles.overlaySub}>
              사진이 올바르게 인식하지 못했습니다.
            </Text>
            <Text style={styles.overlaySub}>다시 시도 해주세요</Text>
          </View>
        )}
        {showGreenOverlay && (
          <View style={[styles.overlay, { backgroundColor: "#00FF38" }]}>
            <Text style={styles.overlayTitle}>인증 성공</Text>
            <Text style={styles.overlaySub}>포인트를 획득하였습니다.</Text>
          </View>
        )}
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
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
    alignItems: "center",
  },
  overlayTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 40,
  },
  overlaySub: {
    fontSize: 20,
  },
});

export default CameraPage;
