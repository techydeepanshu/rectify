import React, { useRef, useState } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { IconButton, MD3Colors } from 'react-native-paper';
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Camera = () => {
  const [camType, setCam] = useState(RNCamera.Constants.Type.back)
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off)
  const [imgCollection, setImgCollection] = useState([])

  const navigation = useNavigation();
  const route = useRoute();
  let cameraRef = useRef(null)

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data);
      setImgCollection((prev) => [...prev, data])
      // const pic = await cameraRef.current.;
      // console.log(pic);

    }
  };

  const toggleflash = () => {
    if (flash === RNCamera.Constants.FlashMode.off) {
      setFlash(RNCamera.Constants.FlashMode.on)
    } else {
      setFlash(RNCamera.Constants.FlashMode.off)
    }
  }
  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={camType}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        useNativeZoom='true'

      >
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: "space-between", backgroundColor: "#0000006d", width: "100%", padding: 40 }}>
          <TouchableOpacity style={styles.imgPreview}>
            {imgCollection.length > 0 ?
              <TouchableOpacity onPress={() => {
                console.log("click")
                navigation.navigate('PreviewImage', imgCollection)
              }} >
                <Image
                  source={{ uri: imgCollection[imgCollection.length - 1].uri }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                  }}

                />
              </TouchableOpacity> : <IconButton
                // style={{ fontSize: 14 }}
                icon="image"
                iconColor={MD3Colors.primary50}
                size={22}

              />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => takePicture()} style={styles.cameraCapture}>
            <IconButton
              // style={{ fontSize: 14 }}
              icon="camera"
              iconColor={MD3Colors.primary50}
              size={40}

            />
          </TouchableOpacity>
          {/*<TouchableOpacity onPress={toggleflash} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> flash </Text>
              </TouchableOpacity>*/}
          <TouchableOpacity style={styles.cameraCapture}>
            <IconButton
              // style={{ fontSize: 14 }}
              icon="arrow-right"
              iconColor={MD3Colors.primary50}
              size={30}
              onPress={async() =>{
                console.log(imgCollection)
                if(imgCollection.length>0){

                  // await AsyncStorage.setItem("images",JSON.stringify(imgCollection))
                  route.params.onReturn(JSON.stringify(imgCollection));
                }
                navigation.goBack()
                // navigation.navigate("InputFields")
              }}
            />
          </TouchableOpacity>

        </View>
      </RNCamera>


    </View>
  );

}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  cameraCapture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    // padding: 15,
    // paddingHorizontal: 20,
    alignSelf: 'center',
    // margin: 20,
  },
  imgPreview: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
    // paddingHorizontal: 11,
    alignSelf: 'center',
    // margin: 20,
  },

  
})

export default Camera;
