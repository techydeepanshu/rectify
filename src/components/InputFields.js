import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Modal, Pressable, Dimensions, FlatList, Animated, Image, ScrollView, TouchableOpacity,Alert } from 'react-native';
import { TextInput, Card, Title, Paragraph, IconButton, MD3Colors, Button } from 'react-native-paper';
import { useRoute, useNavigation } from "@react-navigation/native";
import Camera from './Camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
const InputFields = () => {
    const navigation = useNavigation();
    const propsData = useRoute().params;
    const [formData, setFormData] = React.useState({
        name: "",
        productName: "",
        email: "",
        phone: "",
        address: ""
    });
    const [modalVisible, setModalVisible] = useState(false)
    const [imgForPreview, setImgForPreview] = useState("")
    const [asyncData, setAsyncData] = useState([])
    const [onReturnBackData, setOnReturnBackData] = useState([])
    const [loader, setLoader] = useState(false)

  

    const storeData = async () => {
        let images = await AsyncStorage.getItem("images")
        let res = JSON.parse(images);
        console.log("images : ", res)
        if (res !== null && res.length > 0) setAsyncData(res)
    }
    const removeData = async () => {
        await AsyncStorage.removeItem("images")
        // let res = JSON.parse(images);
        //           console.log("images : ",res)
        //          if(res!==null&&res.length>0) setAsyncData(res)
    }

    const submitData = async ()=>{
        try{

            setLoader(true)
            
            var data = JSON.stringify({
                "status": "processing",
                "billing": {
                  "first_name": formData.name,
                  "last_name": "",
                  "company": "",
                  "address_1": formData.address,
                  "email": (formData.email).toLocaleLowerCase(),
                  "phone": formData.phone
                },
                "meta_data": [
                  {
                    "id": 32821,
                    "key": "prodcut_custom_name",
                    "value": formData.productName
                  },
                  {
                    "id": 32820,
                    "key": "image_custom_name",
                    "value": onReturnBackData
                  }
                ]
              });
              
              var config = {
                method: 'post',
                url: 'https://muljis.vervebot.io/wp-json/wc/v3/orders/',
                headers: { 
                  'Authorization': 'Basic Y2tfNzEyMzUxMDZjZmY5ZjcxZTMzNGQ4MWQ0NWUzYzk1MzY1NzAwMTIyYzpjc18zYTcwODcyYzk2NDJmMjlkMmY1MDlhOTg0MGM4OWE0MzQ3ZWVkYTY2', 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              
             await axios(config)
              .then(function (response) {
                console.log("response : ",JSON.stringify(response.data));
                Alert.alert("Create Successfully")
                setOnReturnBackData([]);
                setFormData(()=>{
                    return {name:"",
                    productName:"",
                    email:"",
                    phone:"",
                    address:""
                }
                })
              })
              .catch(function (error) {
                console.log("error : ",error);
                Alert.alert("error occured")
              });
            console.log('Pressed : ', formData)
            setLoader(false)

        }catch(err){
            console.log("error occured : ",err)
        }
            
            
    }

    useEffect(() => {
        storeData()
        // removeData()
    }, [AsyncStorage]);

    return (
        <ScrollView>
            <View style={{ padding: 20 }}>
                <TextInput
                    mode='outlined'
                    label="Name"
                    value={formData.name}
                    onChangeText={text => setFormData((prev) => {
                        // console.log("text : ",text)
                        return { ...prev, name: text }
                    })}
                    style={{ margin: 10 }}
                />
                <TextInput
                    mode='outlined'
                    label="Product Name"
                    value={formData.productName}
                    onChangeText={text => setFormData((prev) => {
                        // console.log("text : ",text)
                        return { ...prev, productName: text }
                    })}
                    style={{ margin: 10 }}
                />
                <TextInput
                    mode='outlined'
                    label="Email"
                    autoCompleteType="email"
                    value={formData.email}
                    onChangeText={text => setFormData((prev) => {
                        // console.log("text : ",text)
                        return { ...prev, email: text }
                    })}
                    style={{ margin: 10 }}
                />
                <TextInput
                    mode='outlined'
                    label="Phone"
                    autoCompleteType="cc-number’"
                    value={formData.phone}
                    onChangeText={text => setFormData((prev) => {
                        // console.log("text : ",text)
                        return { ...prev, phone: text }
                    })}
                    style={{ margin: 10 }}
                />
                <TextInput
                    mode='outlined'
                    label="Address"
                    // multiline="true"
                    // dense="true"
                    autoCompleteType="street-address"
                    value={formData.address}
                    onChangeText={text => setFormData((prev) => {
                        // console.log("text : ",text)
                        return { ...prev, address: text }
                    })}
                    style={{ margin: 10 }}
                />
                <View style={{ alignSelf: "center" }}>
                    <IconButton
                        mode='contained'
                        icon="camera"
                        iconColor={MD3Colors.primary30}
                        size={40}
                        onPress={() => {
                            navigation.navigate("Camera", {
                                onReturn: (item) => {
                                    console.log("onRetrun : ", JSON.parse(item))
                                    setOnReturnBackData((prev) => [...prev, ...JSON.parse(item)])
                                }
                            })
                            // setModalVisible(true)
                        }}
                    />

                </View>
                {onReturnBackData.length > 0 ?
                    <>
                        <FlatList
                            data={onReturnBackData}
                            // horizontal={false}
                            numColumns={3}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 10 }}>
                                        <View style={{ position: "relative" }}>
                                            <TouchableOpacity key={index} onPress={() => {

                                                console.log("image")
                                                setImgForPreview(item.uri)
                                                setModalVisible(!modalVisible)
                                            }}>
                                                <Image
                                                    source={{ uri: item.uri }}
                                                    style={{
                                                        width: 80,
                                                        height: 80,
                                                        // marginHorizontal: 2,
                                                        // margin: 3,
                                                        // padding:3
                                                        borderTopLeftRadius: 10,
                                                        borderTopRightRadius: 10,
                                                        borderBottomRightRadius: 10,
                                                        borderBottomLeftRadius: 10,
                                                    }}

                                                // onPress={()=>{
                                                //     setImgForPreview(item.uri)
                                                //     setModalVisible(!modalVisible)
                                                // }}
                                                />


                                            </TouchableOpacity>
                                            <View style={{
                                                // alignSelf: "flex-end",
                                                position: "absolute",
                                                top: -10,
                                                // bottom: 100,
                                                right: -10,
                                                // left:0
                                            }}>
                                                <IconButton
                                                    mode='contained'
                                                    icon="minus"
                                                    iconColor={MD3Colors.primary30}
                                                    size={10}
                                                    onPress={() => {
                                                        console.log("click on minus")
                                                        setOnReturnBackData((prev) => [...prev.filter((elem) => elem.uri !== item.uri)])
                                                        // setModalVisible(true)
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </View>)
                            }}
                        />
                    </>
                    : null}
                <View style={{ alignSelf: "center", padding: 40 }}>
                    <Button 
                    loading={loader}
                    mode="contained" 
                    onPress={submitData}>
                        {loader?"Loading...":"Submit"}
                    </Button>
                </View>

                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>

                                
                                    <Image
                                        source={{ uri: imgForPreview }}
                                        style={{
                                            width: width-100,
                                            height: height-150,
                                            // marginHorizontal: 2,
                                            // margin: 3,
                                            // padding:3
                                            // borderTopLeftRadius: 10,
                                            // borderTopRightRadius: 10,
                                            // borderBottomRightRadius: 10,
                                            // borderBottomLeftRadius: 10,
                                        }}

                                       
                                    />
                                    <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                  >
                                    <Text style={styles.textStyle}>Close</Text>
                                  </Pressable>


                            </View>
                        </View>
                    </Modal>

                </View>


            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        height: "100%",
        width: "100%"
    },
    modalView: {
        height: height,
        width: width,
        // margin: 20,
        position:"relative",
        backgroundColor: "white",
        // borderRadius: 20,
        // padding: 35,
        alignItems: "center",
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        position:"absolute",
        bottom:150
    },
    buttonOpen: {
        backgroundColor: "#0000009d",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})

export default InputFields;
