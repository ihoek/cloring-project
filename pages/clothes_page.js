import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image ,Modal} from 'react-native';

export default function ClothesPage({ onClose,navigation,route }) {
    const [ClothesModalVisible, setClothesModalVisible] = useState(false);

    //옷 이미지 모달 열기
    const ClothesModalUp = async () => {
        try {
        setClothesModalVisible(true);
        console.log('clothes-modal-open');
        } catch (error) {
        console.error('옷 이미지 모달 열기 중 오류 발생:', error);
        }
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setClothesModalVisible(false);
        console.log('modal-close');
    };
        



  return (
    <View style={styles.container}>

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
                <TouchableOpacity style={styles.cameraimage} ><Image source={require('app-cloring/assets/camera.png')} /></TouchableOpacity>
                </View>

                {/*bottom section*/}
                <View style={styles.camerasection}>
                <TouchableOpacity style={styles.ModalCloseButton}><Text style={styles.bottomButtonText}>수정</Text></TouchableOpacity>
                <TouchableOpacity style={styles.ModalCloseButton}><Text style={styles.bottomButtonText}>삭제</Text></TouchableOpacity>
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
            <TouchableOpacity style={styles.middleButton01}><Text style={styles.middleButtonText}>상의</Text></TouchableOpacity>
            <TouchableOpacity style={styles.middleButton01}><Text style={styles.middleButtonText}>하의</Text></TouchableOpacity>
            <TouchableOpacity style={styles.middleButton01}><Text style={styles.middleButtonText}>악세사리</Text></TouchableOpacity>
        </View>
        {/* body section */}
        <View style={styles.containerThree}>
            <ScrollView style={styles.container}>
                <View style={styles.cards}>
                    
                    <TouchableOpacity style={styles.cardsphoto} onPress={ClothesModalUp}><Image source={require('app-cloring/assets/top1.png')} /></TouchableOpacity>
                    
                    <View style={styles.cardscontent}>
                        <Text style={styles.textStyle}>제품명</Text>
                        <Text style={styles.textStyle}>소재</Text>
                        <Text style={styles.textStyle}>구입날짜</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
        {/* bottom section */}
        <View style={styles.containerFour}>
            <TouchableOpacity style={styles.bottomButton01}><Text style={styles.bottomButtonText}>옷</Text></TouchableOpacity>
            <TouchableOpacity style={styles.bottomButton02} onPress={()=>{navigation.navigate('MainPage')}}><Text style={styles.bottomButtonText}>메인</Text></TouchableOpacity>
            <TouchableOpacity style={styles.bottomButton03} onPress={()=>{navigation.navigate('MyPage')}}><Text style={styles.bottomButtonText}>개인정보</Text></TouchableOpacity>
        </View>

    </View>

    
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
    
  },topButton01: {
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
  },middleButton01: {
    width: 100,
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
  cards:{
    flexDirection: 'row'
  },
  cardsphoto: {
    height:100,
    width : 100,
    borderColor:'#000',
    borderWidth:1,
    borderRadius:10,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardscontent: {
    height:100,
    width : 270,
    borderColor:'#000',
    borderWidth:1,
    borderRadius:10,
    margin:10,
    justifyContent: 'center',
  },
  textStyle: {
    textAlign:"center"
  },
  modalText: {
    fontSize : 15,
    marginBottom: 5,
    textAlign: 'center'
  },
  imagemodalcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  stylemodalView:{
    width: 300,
    height: 200,
    margin: 20,
    borderColor:'#000',
    borderWidth:1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center'
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
  camerasection:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  cameraimage:{
    height:70,
    width : 70,
    borderColor:'#000',
    borderWidth:1,
    borderRadius:10,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});