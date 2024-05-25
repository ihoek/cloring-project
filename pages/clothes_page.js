import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Modal, SafeAreaView, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Camera, CameraType } from 'expo-camera';
import { ImageContext } from './ImageContext'; 

export default function ClothesPage({ onClose, navigation, route, content }) {
    const { images, setImages } = useContext(ImageContext);
    const [ClothesModalVisible, setClothesModalVisible] = useState(false);
    const [ClothesContentModalVisible, setClothesContentModalVisible] = useState(false);
    const [CameraModalVisible, setCameraModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [cameraRef, setCameraRef] = useState(null);

    const [cardCategories, setCardCategories] = useState(["상의", "하의", "악세사리", "상의", "하의", "악세사리", "상의"]);
    const [cardNames, setCardNames] = useState(["", "", "", "", "", "", ""]);
    const [cardMaterials, setCardMaterials] = useState(["", "", "", "", "", "", ""]);
    const [cardBuyDates, setCardBuyDates] = useState(["", "", "", "", "", "", ""]);

    const [pickerValue, setPickerValue] = useState("0");
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('모두');

    useEffect(() => {
        if (permission && !permission.granted) {
            requestPermission();
        }
    }, [permission]);

    if (!permission || !permission.granted) {
        return <View />;
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const ClothesModalUp = async (index) => {
        try {
            setSelectedIndex(index);
            setClothesModalVisible(true);
        } catch (error) {
            console.error('옷 이미지 모달 열기 중 오류 발생:', error);
        }
    };

    const ClothesContentModalUp = async (index) => {
        try {
            setSelectedIndex(index);
            setClothesContentModalVisible(true);
        } catch (error) {
            console.error('옷 내용 모달 열기 중 오류 발생:', error);
        }
    };

    const CameraModalUp = async (index) => {
        try {
            setSelectedIndex(index);
            setCameraModalVisible(true);
        } catch (error) {
            console.error('카메라 모달 열기 중 오류 발생:', error);
        }
    };

    const takePicture = async () => {
        if (cameraRef) {
            try {
                console.log('takepicture 실행중');
                const photo = await cameraRef.takePictureAsync();
                const { uri } = photo;

                const newImages = [...images];
                newImages[selectedIndex] = uri;
                setImages(newImages);

                setCameraModalVisible(false);
            } catch (error) {
                console.error('사진 찍기 중 오류 발생:', error);
            }
        } else {
            console.error('Camera reference is null.');
        }
    };

    const closeModal = () => {
        setClothesModalVisible(false);
        setClothesContentModalVisible(false);
        setCameraModalVisible(false);
    };

    const imageregister = async (index) => {
        const category = cardCategories[selectedIndex];
        const image = images[selectedIndex];
    
        if (image) {
            if (category === '상의') {
                console.log('상의가 전송되고 있음');
                navigation.navigate('MainPage', { topImage: image });
            } else if (category === '하의') {
                console.log('하의가 전송되고 있음');
                navigation.navigate('MainPage', { bottomImage: image });
            } else if (category === '악세사리') {
                console.log('악세사리가 전송되고 있음');
                navigation.navigate('MainPage', { accessoryImage: image });
            }
        } else {
            navigation.navigate('MainPage', { topImage: require('app-cloring/assets/top1.png') });
        }
    
        setClothesModalVisible(false);
    };

    const modibtn = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const newImages = [...images];
            newImages[selectedIndex] = result.assets[0].uri;
            setImages(newImages);
            setClothesModalVisible(false);
        }
    };

    const delbtn = async () => {
        try {
            const newImages = [...images];
            newImages[selectedIndex] = null;
            setImages(newImages);
            setClothesModalVisible(false);
        } catch (error) {
            console.error('삭제 버튼 클릭 중 오류 발생:', error);
        }
    };

    const Category = async () => {
        setPickerVisible(!isPickerVisible);
    };

    const handlePickerValueChange = (itemValue) => {
        setPickerValue(itemValue);
        const categoryLabel = itemValue === "1" ? "상의" : itemValue === "2" ? "하의" : itemValue === "3" ? "악세사리" : "";
        const newCategories = [...cardCategories];
        newCategories[selectedIndex] = categoryLabel;
        setCardCategories(newCategories);
    };

    const setFilter = (filter) => {
        setSelectedFilter(filter);
    };

    const getFilteredCards = () => {
        if (selectedFilter === '모두') {
            return [0, 1, 2, 3, 4, 5, 6, 7];
        }
        return [0, 1, 2, 3, 4, 5, 6, 7].filter((index) => {
            return cardCategories[index] === selectedFilter;
        });
    };
    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="none"
                transparent={true}
                visible={ClothesModalVisible}
                onRequestClose={() => {
                    setClothesModalVisible(false);
                }}>
                <View style={styles.imagemodalcon}>
                    <View style={styles.stylemodalView}>
                        <View style={styles.camerasection}>
                            <Text style={styles.modalText}>이미지 삽입</Text>
                            <TouchableOpacity style={styles.cameraimage} onPress={() => CameraModalUp(selectedIndex)}>
                                <Image source={require('app-cloring/assets/camera.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.camerasection}>
                            <TouchableOpacity style={styles.ModalCloseButton} onPress={imageregister}>
                                <Text style={styles.bottomButtonText}>등록</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.ModalCloseButton} onPress={modibtn}>
                                <Text style={styles.bottomButtonText}>수정</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.ModalCloseButton} onPress={delbtn}>
                                <Text style={styles.bottomButtonText}>삭제</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.ModalCloseButton} onPress={closeModal}>
                                <Text style={styles.bottomButtonText}>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="none"
                transparent={true}
                visible={ClothesContentModalVisible}
                onRequestClose={() => {
                    setClothesContentModalVisible(false);
                }}>
                <View style={styles.imagemodalcon}>
                    <View style={styles.stylemodalView}>
                        <View style={styles.clothescontent}>
                            <View style={styles.contentrow}>
                                <Text style={styles.textStyle}>제품명</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => {
                                        const newNames = [...cardNames];
                                        newNames[selectedIndex] = text;
                                        setCardNames(newNames);
                                    }}
                                    value={cardNames[selectedIndex]}
                                />
                            </View>

                            <View style={styles.contentrow}>
                                <Text style={styles.textStyle}>소재</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => {
                                        const newMaterials = [...cardMaterials];
                                        newMaterials[selectedIndex] = text;
                                        setCardMaterials(newMaterials);
                                    }}
                                    value={cardMaterials[selectedIndex]}
                                />
                            </View>

                            <View style={styles.contentrow}>
                                <Text style={styles.textStyle}>구입날짜</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => {
                                        const newBuyDates = [...cardBuyDates];
                                        newBuyDates[selectedIndex] = text;
                                        setCardBuyDates(newBuyDates);
                                    }}
                                    value={cardBuyDates[selectedIndex]}
                                />
                            </View>
                        </View>

                        <View style={styles.camerasection}>
                            <TouchableOpacity style={styles.CateButton} onPress={Category}>
                                <Text style={styles.bottomButtonText}>카테고리</Text>
                            </TouchableOpacity>
                            <View style={styles.pickersection}>
                                {isPickerVisible && (
                                    <Picker style={styles.selectpicker} selectedValue={pickerValue} onValueChange={handlePickerValueChange}>
                                        <Picker.Item label="상의" value="1" />
                                        <Picker.Item label="하의" value="2" />
                                        <Picker.Item label="악세사리" value="3" />
                                    </Picker>
                                )}
                            </View>
                            <TouchableOpacity style={styles.ModalCloseButton} onPress={closeModal}>
                                <Text style={styles.bottomButtonText}>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="none"
                transparent={true}
                visible={CameraModalVisible}
                onRequestClose={() => {
                    setCameraModalVisible(false);
                }}>
                <View style={styles.imagemodalcon}>
                    <View style={styles.camerastylemodalView}>
                        <View style={styles.camerasection_top}>
                            <Camera style={styles.camera} type={type} ref={(ref) => setCameraRef(ref)}>
                            </Camera>
                        </View>
                        <View style={styles.camerasection_bot}>
                            <View style={styles.cards}>
                                <TouchableOpacity style={styles.ModalCloseButton} onPress={toggleCameraType}>
                                    <Text style={styles.bottomButtonText}>전환</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.ModalCloseButton} onPress={takePicture}>
                                    <Text style={styles.bottomButtonText}>확인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.containerOne}>
                <TouchableOpacity style={styles.topButton01}>
                    <Text style={styles.middleButtonText}>메뉴</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.containerTwo}>
                <TouchableOpacity style={styles.middleButton01} onPress={() => setFilter('모두')}>
                    <Text style={styles.middleButtonText}>모두</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.middleButton01} onPress={() => setFilter('상의')}>
                    <Text style={styles.middleButtonText}>상의</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.middleButton01} onPress={() => setFilter('하의')}>
                    <Text style={styles.middleButtonText}>하의</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.middleButton01} onPress={() => setFilter('악세사리')}>
                    <Text style={styles.middleButtonText}>악세사리</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.containerThree}>
                <ScrollView style={styles.container}>
                    {getFilteredCards().map((index) => (
                        <View style={styles.cards} key={index}>
                            <TouchableOpacity style={styles.cardsphoto} onPress={() => ClothesModalUp(index)}>
                                <Image source={images[index] ? { uri: images[index] } : require('app-cloring/assets/empty.png')} style={styles.imageStyle} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cardscontent} onPress={() => ClothesContentModalUp(index)}>
                                <View style={styles.cardsfield}>
                                    <Text style={styles.textStyle}>제품명 : </Text>
                                    <Text style={styles.textStyle}>{cardNames[index]}</Text>
                                </View>

                                <View style={styles.cardsfield}>
                                    <Text style={styles.textStyle}>소재 : </Text>
                                    <Text style={styles.textStyle}>{cardMaterials[index]}</Text>
                                </View>

                                <View style={styles.cardsfield}>
                                    <Text style={styles.textStyle}>구입날짜 : </Text>
                                    <Text style={styles.textStyle}>{cardBuyDates[index]}</Text>
                                </View>

                                <View style={styles.cardsfield}>
                                    <Text style={styles.textStyle}>카테고리 : </Text>
                                    <Text style={styles.textStyle}>{cardCategories[index]}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.containerFour}>
            <TouchableOpacity style={styles.bottomButton01} onPress={() => { navigation.navigate('ClothesPage') }}><Image source={require('app-cloring/assets/clothe.png')} style={styles.clothebtn}/></TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton02}  onPress={() => { navigation.navigate('MainPage')}}><Image source={require('app-cloring/assets/home.png')} style={styles.homebtn}/></TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton03} onPress={() => { navigation.navigate('MyPage') }}><Image source={require('app-cloring/assets/private.png')} style={styles.clothebtn}/></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerOne: {
        flex: 0.7,
    },
    containerTwo: {
        flex: 0.5,
        flexDirection: 'row'
    },
    containerThree: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerFour: {
        flex: 0.7,
        flexDirection: "row",
        backgroundColor : '#36251b',
        justifyContent: 'center'
    },
    bottomButton01: {
        width: 100,
        height: 70,
        padding: 15,
        margin: 7
    },
      bottomButton02: {
        width: 170,
        height: 70,
        padding: 15,
        borderRadius: 15,
        margin: 7
    },
      bottomButton03: {
        width: 100,
        height: 70,
        padding: 15,
        margin: 7
    },
    bottomButtonText: {
        color: "#fff",
        fontWeight: "700",
        textAlign: "center"
    },
    topButton01: {
        width: 50,
        height: 50,
        padding: 15,
        backgroundColor: "#fdc453",
        borderColor: "deeppink",
        borderRadius: 15,
        margin: 7
    },
    middleButtonText: {
        color: "#fff",
        fontWeight: "700",
        textAlign: "center"
    },
    middleButton01: {
        width: 80,
        height: 50,
        padding: 15,
        backgroundColor: "#fdc453",
        borderColor: "deeppink",
        borderRadius: 15,
        margin: 7
    },
    middleButton02: {
        width: 170,
        height: 50,
        padding: 15,
        backgroundColor: "#fe8d6f",
        borderRadius: 15,
        margin: 7
    },
    middleButton03: {
        width: 100,
        height: 50,
        padding: 15,
        backgroundColor: "#9adbc5",
        borderRadius: 15,
        margin: 7
    },
    cards: {
        flexDirection: 'row'
    },
    cardsphoto: {
        height: 100,
        width: 100,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardscontent: {
        height: 100,
        width: 270,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
    },
    textStyle: {
        textAlign: "left"
    },
    modalText: {
        fontSize: 15,
        marginBottom: 5,
        textAlign: 'center'
    },
    imagemodalcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    stylemodalView: {
        width: 300,
        height: 250,
        margin: 20,
        borderColor: '#000',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ModalCloseButton: {
        width: 50,
        height: 50,
        padding: 15,
        backgroundColor: "#fdc453",
        borderColor: "deeppink",
        borderRadius: 15,
        margin: 7
    },
    camerasection: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cameraimage: {
        height: 70,
        width: 70,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    input:{
      height: 40,
      margin: 10,
      borderWidth: 1,
      padding: 10,
    },
    contentrow:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    cardsfield:{
      flexDirection: 'row'
    },
    CateButton: {
        width: 70,
        height: 50,
        padding: 15,
        backgroundColor: "#fdc453",
        borderColor: "deeppink",
        borderRadius: 15,
        margin: 7
    },
    pickersection:{
        width: 120,
        height: 50,
        //backgroundColor : 'black'
    },
    camerastylemodalView:{
        width: 300,
        height: 500,
        margin: 20,
        borderColor: '#000',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera:{
        flex : 1,
        width : 280
    },
    camerasection_top:{
        flex : 6,
        //backgroundColor : 'black'
    },
    camerasection_bot:{
        flex : 1,
    },
    cameraControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    captureButton: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        margin: 20,
    },
    captureButtonText: {
        fontSize: 18,
        color: 'black',
    },
    flipButton: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        margin: 20,
    },
    flipButtonText: {
        fontSize: 18,
        color: 'black',
    },
    closeButton: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        margin: 20,
    },
    closeButtonText: {
        fontSize: 18,
        color: 'black',
    },
    clothebtn:{
        width : 70,
        height : 70,
        top : -15
      },
      homebtn:{
        width : 70,
        height : 70,
        top : -15,
        left : 35
      },
      imageStyle: {
        width: 100,
        height: 100,
        margin: 10,
      }
});