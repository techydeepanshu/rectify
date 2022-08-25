import React ,{useState}from 'react';
import { Text, View, StyleSheet, Dimensions, Animated, Image, FlatList } from 'react-native';
const { width, height } = Dimensions.get('window');
import { useRoute, useNavigation } from "@react-navigation/native";

const PreviewImage = () => {
    const propsData = useRoute().params;
    const [imgData,setImgData]=useState([...propsData].reverse())
    console.log("propsData : ", propsData);
    return (
        <View style={{flex:1,justifyContent:"center"}}>
            
            <View style={{ width: width }} >
                <Animated.FlatList
                    // ref={songSlider}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    numColumns={1}
                    // keyExtractor={(item) => item.id}
                    pagingEnabled
                    // scrollEventThrottle={16}
                    // onScroll={Animated.event(
                    //     [{
                    //         nativeEvent: {
                    //             contentOffset: { x: scrollX }
                    //         }
                    //     }],
                    //     { useNativeDriver: true }
                    // )}
                    data={imgData}
                    renderItem={({ item }) => {
                        return (
                            <Animated.View style={{ width: width, justifyContent: "center", alignItems: "center" }} >
                                <View style={styles.artworkWrapper}>
                                    <Image
                                        source={{ uri: item.uri }}
                                        // source={require("../assets/artwork/img1.jpg")}
                                        style={styles.artworkImg}
                                    />
                                    
                                </View>
                            </Animated.View>
                        )
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    artworkWrapper: {
        width: "100%",
        height: "100%",
        marginBottom: 40,
        padding:30,

        // following these shadow properties only for ios
        shadowColor: "#ccc",
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.85

        // u can use elivation for android,but elivation does not provide more option to customize shadow
    },
    artworkImg: {
        width: "100%",
        height: "100%",
        borderRadius: 20
    },
})

export default PreviewImage;
