import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image ,Modal, SafeAreaView, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
//import { Camera, CameraType } from 'expo-camera';

export default function ClothesPage({ onClose, navigation, route, content }) {
    //모달
    const [ClothesModalVisible, setClothesModalVisible] = useState(false);
    const [ClothesContentModalVisible, setClothesContentModalVisible] = useState(false);
    // 이미지
    const [images, setImages] = useState([null, null, null, null, null]); // 카드별 이미지 저장 배열
    const [selectedIndex, setSelectedIndex] = useState(null); // 선택된 카드 인덱스
    //const [type, setType] = useState(CameraType.back);
    // 카메라
    //const [permission, requestPermission] = Camera.useCameraPermissions();



    const [nametext, onChangenameText] = React.useState('');
    const [context, onChangeconText] = React.useState('');
    const [buytext, onChangebuyText] = React.useState('');

    


    // 옷 이미지 모달 열기
    const ClothesModalUp = async (index) => {
        try {
            setSelectedIndex(index); // 클릭된 카드 인덱스 설정
            setClothesModalVisible(true);
            console.log('clothes-modal-open');
            console.log(index);
        } catch (error) {
            console.error('옷 이미지 모달 열기 중 오류 발생:', error);
        }
    };

    // 옷 내용 모달 열기
    const ClothesContentModalUp = async (index) => {
      try {
          setSelectedIndex(index); // 클릭된 카드 인덱스 설정
          setClothesContentModalVisible(true);
          console.log('clothes-content-modal-open');
      } catch (error) {
          console.error('옷 내용 모달 열기 중 오류 발생:', error);
      }
  };

    // 모달 닫기 함수
    const closeModal = () => {
        setClothesModalVisible(false);
        setClothesContentModalVisible(false);
        console.log('modal-close');
    };

    // 등록 버튼 함수
    const imageregister = async (index) => {
        console.log('image register ~ing');
        if (images[0]) { // 첫 번째 이미지가 존재하는지 확인
          navigation.navigate('MainPage', { topImage: images[0] }); // 첫 번째 이미지를 메인화면으로 전달
      } else {
          navigation.navigate('MainPage', { topImage: require('app-cloring/assets/top1.png') });
          console.log('상의 이미지가 선택되지 않았습니다.'); // 상의 이미지가 선택되지 않았을 경우 로그 출력
      }
      setClothesModalVisible(false);
    };

    // 카메라 버튼 클릭 함수
    const cameraimgbtn = async () => {
        console.log('camera btn click');
    };

    // 수정 버튼 클릭 함수
    const modibtn = async () => {
        console.log('modify btn click');
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            const newImages = [...images];
            newImages[selectedIndex] = result.assets[0].uri;
            setImages(newImages);
            setClothesModalVisible(false);
        }
    };

    // 삭제 버튼 클릭 함수
    const delbtn = async () => {
        console.log('delete btn click');
        
        setClothesModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* 옷 이미지 모달 */}
            <Modal
                animationType="none"
                transparent={true}
                visible={ClothesModalVisible}
                onRequestClose={() => {
                    setClothesModalVisible(false);
                }}>
                <View style={styles.imagemodalcon}>
                    <View style={styles.stylemodalView}>
                        {/*top section*/}
                        <View style={styles.camerasection}>
                            <Text style={styles.modalText}>이미지 삽입</Text>
                            <TouchableOpacity style={styles.cameraimage} onPress={cameraimgbtn}><Image source={require('app-cloring/assets/camera.png')} /></TouchableOpacity>
                        </View>

                        {/*bottom section*/}
                        <View style={styles.camerasection}>
                            <TouchableOpacity style={styles.ModalCloseButton} onPress={imageregister}><Text style={styles.bottomButtonText}>등록</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModalCloseButton} onPress={modibtn}><Text style={styles.bottomButtonText}>수정</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModalCloseButton} onPress={delbtn}><Text style={styles.bottomButtonText}>삭제</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.ModalCloseButton} onPress={closeModal}><Text style={styles.bottomButtonText}>닫기</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            {/* 옷 내용 모달 */}
            <Modal
                animationType="none"
                transparent={true}
                visible={ClothesContentModalVisible}
                onRequestClose={() => {
                    setClothesContentModalVisible(false);
                }}>
                <View style={styles.imagemodalcon}>
                    <View style={styles.stylemodalView}>
                        {/*top section*/}
                        <View style={styles.clothescontent}>
                          <View style={styles.contentrow}>
                            <Text style={styles.textStyle}>제품명</Text>
                              <TextInput style={styles.input} onChangeText={onChangenameText} value={nametext} />
                          </View>

                          <View style={styles.contentrow}>
                              <Text style={styles.textStyle}>소재</Text>
                              <TextInput style={styles.input} onChangeText={onChangeconText} value={context} />
                          </View>

                          <View style={styles.contentrow}>
                              <Text style={styles.textStyle}>구입날짜</Text>
                              <TextInput style={styles.input} onChangeText={onChangebuyText} value={buytext} />
                          </View> 
                        </View >

                        {/*bottom section*/}
                        <View style={styles.camerasection}>
                            <TouchableOpacity style={styles.ModalCloseButton} onPress={closeModal}><Text style={styles.bottomButtonText}>닫기</Text></TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
            </Modal>




            {/* top section */}
            <View style={styles.containerOne}>
                <TouchableOpacity style={styles.topButton01}><Text style={styles.middleButtonText}>메뉴</Text></TouchableOpacity>
            </View>
            {/* middle section */}
            <View style={styles.containerTwo}>
                <TouchableOpacity style={styles.middleButton01}><Text style={styles.middleButtonText}>모두</Text></TouchableOpacity>
                <TouchableOpacity style={styles.middleButton01}><Text style={styles.middleButtonText}>상의</Text></TouchableOpacity>
                <TouchableOpacity style={styles.middleButton01}><Text style={styles.middleButtonText}>하의</Text></TouchableOpacity>
                <TouchableOpacity style={styles.middleButton01}><Text style={styles.middleButtonText}>악세사리</Text></TouchableOpacity>
            </View>

            {/* body section */}
            <View style={styles.containerThree}>
                <ScrollView style={styles.container}>
                    <View style={styles.cards}>
                        <TouchableOpacity style={styles.cardsphoto} onPress={() => ClothesModalUp(0)}>
                            <Image source={images[0] ? { uri: images[0] } : require('app-cloring/assets/top1.png')} style={styles.imageStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cardscontent} onPress={ClothesContentModalUp}>
                            <View style={styles.cardsfield}>
                              <Text style={styles.textStyle}>제품명 : </Text>
                              <Text style={styles.textStyle}>{nametext}</Text>
                            </View>
                            
                            <View style={styles.cardsfield}>
                              <Text style={styles.textStyle}>소재 : </Text>
                              <Text style={styles.textStyle}>{context}</Text>
                            </View>
                            
                            <View style={styles.cardsfield}>
                              <Text style={styles.textStyle}>구입날짜 : </Text>
                              <Text style={styles.textStyle}>{buytext}</Text>
                            </View>
                            
                        </TouchableOpacity>
                    </View>


                </ScrollView>
            </View>
            {/* bottom section */}
            <View style={styles.containerFour}>
                <TouchableOpacity style={styles.bottomButton01}><Text style={styles.bottomButtonText}>옷</Text></TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton02} onPress={() => { navigation.navigate('MainPage') }}><Text style={styles.bottomButtonText}>메인</Text></TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton03} onPress={() => { navigation.navigate('MyPage') }}><Text style={styles.bottomButtonText}>개인정보</Text></TouchableOpacity>
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
        flexDirection: "row"
    },
    bottomButton01: {
        width: 100,
        height: 70,
        padding: 15,
        backgroundColor: "#fdc453",
        borderColor: "deeppink",
        borderRadius: 15,
        margin: 7
    },
    bottomButton02: {
        width: 170,
        height: 70,
        padding: 15,
        backgroundColor: "#fdc453",
        borderColor: "deeppink",
        borderRadius: 15,
        margin: 7
    },
    bottomButton03: {
        width: 100,
        height: 70,
        padding: 15,
        backgroundColor: "#fdc453",
        borderColor: "deeppink",
        borderRadius: 15,
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
        justifyContent: 'center',
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
    }
});