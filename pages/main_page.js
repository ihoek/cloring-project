import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView, Modal, Alert, ImageBackground, Image} from 'react-native';
import * as Location from 'expo-location';

export default function Mainpage({navigation,route}) {
  //모달
  const [weatherModalVisible, setWeatherModalVisible] = useState(false);
  const [styleModalVisible, setStyleModalVisible] = useState(false);
  const [HeadModalVisible,setHeadModalVisible] = useState(false);
  const [BodyTopModalVisible,setBodyTopModalVisible] = useState(false);
  const [BodyBottomModalVisible,setBodyBottomModalVisible] = useState(false);

  const [currentAddress, setCurrentAddress] = useState(""); // 현재 주소를 저장할 상태 변수
  
  const getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const { coords } = await Location.getCurrentPositionAsync();
  
      return coords; // 현재의 경도와 위도 반환
    } catch (error) {
      Alert.alert("위치 정보를 가져오는 중 오류 발생:", error.message);
      return null;
    }
  };

  // 경도와 위도를 가지고 주소를 가져오는 함수
  const getAddressFromCoords = async (latitude, longitude) => {
    try {
      const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
      const address = `${location[0].region} ${location[0].city}`;
      return address;
    } catch (error) {
      console.error('주소를 가져오는 중 오류 발생:', error);
      return '주소를 가져올 수 없음';
    }
  };

  //날씨정보 모달 열기
  const weatherModalUp = async () => {
    try {
      const coords = await getLocation(); // 현재의 경도와 위도 가져오기
      if (coords) {
        // 현재의 경도와 위도가 유효한 경우에만 모달 열기
        const address = await getAddressFromCoords(coords.latitude, coords.longitude); // 주소 가져오기
        setCurrentAddress(address);
        setWeatherModalVisible(true);
        console.log('weather-modal-open');
      }
    } catch (error) {
      console.error('날씨정보 모달 열기 중 오류 발생:', error);
    }
  };

  //추천코디 모달 열기
  const styleModalUp = async () => {
    try {
      setStyleModalVisible(true);
      console.log('style-modal-open');
    } catch (error) {
      console.error('추천코디 모달 열기 중 오류 발생:', error);
    }
  };

  //머리클릭 모달 열기
  const headModalUp = async () => {
    try {
      setHeadModalVisible(true);
      console.log('headclick-modal-open');
    } catch (error) {
      console.error('머리클릭 모달 열기 중 오류 발생:', error);
    }
  };

  //상의클릭 모달 열기
  const bodytopModalUp = async () => {
    try {
      setBodyTopModalVisible(true);
      console.log('bodytop-click-modal-open');
    } catch (error) {
      console.error('상의클릭 모달 열기 중 오류 발생:', error);
    }
  };

  //하의클릭 모달 열기
  const bodybottomModalUp = async () => {
    try {
      setBodyBottomModalVisible(true);
      console.log('bodybottom-click-modal-open');
    } catch (error) {
      console.error('하의클릭 모달 열기 중 오류 발생:', error);
    }
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setWeatherModalVisible(false);
    setStyleModalVisible(false);
    setHeadModalVisible(false);
    setBodyTopModalVisible(false);
    setBodyBottomModalVisible(false);
    console.log('modal-close');
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* 날씨정보 모달 */}
      <Modal
        animationType="none"
        transparent={true}
        visible={weatherModalVisible}
        onRequestClose={() => {
          setWeatherModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.weathermodalView}>
            <View style={styles.modalTopView}>
              <Text style={styles.modalText}>오늘의 날씨</Text>
              <Text style={styles.modalText}>위치</Text>
              <Text style={styles.modalText}>{currentAddress}</Text>
            </View>
            <View style={styles.modalMidView}>
              <Text style={styles.modalText}>전체적인 날씨</Text>
              <Text style={styles.modalText}>전반적으로 기온이 높아 더울 것으로 예상됩니다.</Text>
            </View>
            <View style={styles.modalBotView}>
                <Text style={styles.modalText}>대기질(미세먼지/초미제먼지)</Text>
                <Text style={styles.modalText}>매우나쁨/매우나쁨</Text>
                <Text style={styles.modalText}>기상현상</Text>
                <Text style={styles.modalText}>비가옴</Text>
                <Text style={styles.modalText}>습도</Text>
                <Text style={styles.modalText}>70%</Text>
            </View>
            <TouchableOpacity style={styles.ModalCloseButton} onPress={closeModal}>
              <Text style={styles.bottomButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 추천코디 모달 */}
      <Modal
        animationType="none"
        transparent={true}
        visible={styleModalVisible}
        onRequestClose={() => {
          setStyleModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.stylemodalView}>
            {/*top section*/}
            <View>
            <Text style={styles.modalText}>오늘의 추천 코디</Text>
            </View>

            {/*mid section*/}
              <View>
                
              </View>

            {/*bottom section*/}
            <View>
            <TouchableOpacity style={styles.ModalCloseButton} onPress={closeModal}><Text style={styles.bottomButtonText}>닫기</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* 머리클릭 모달 */}
      <Modal
        animationType="none"
        transparent={true}
        visible={HeadModalVisible}
        onRequestClose={() => {
          setHeadModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.HeadmodalView}>
            {/*top section*/}
            <View>
            <Text style={styles.modalText}>머리모달</Text>
            </View>

            {/*mid section*/}
              <View>
                
              </View>
            {/*bottom section*/}
            <View>
            <TouchableOpacity style={styles.ModalCloseButton} onPress={closeModal}><Text style={styles.bottomButtonText}>닫기</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 상의클릭 모달 */}
      <Modal
        animationType="none"
        transparent={true}
        visible={BodyTopModalVisible}
        onRequestClose={() => {
          setBodyTopModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.BodyTopmodalView}>
            {/*top section*/}
            <View>
            <Text style={styles.modalText}>상의모달</Text>
            </View>

            {/*mid section*/}
              <View>
                
              </View>
            {/*bottom section*/}
            <View>
            <TouchableOpacity style={styles.ModalCloseButton} onPress={closeModal}><Text style={styles.bottomButtonText}>닫기</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* 하의클릭 모달 */}
      <Modal
        animationType="none"
        transparent={true}
        visible={BodyBottomModalVisible}
        onRequestClose={() => {
          setBodyBottomModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.BodyBottommodalView}>
            {/*top section*/}
            <View>
            <Text style={styles.modalText}>하의모달</Text>
            </View>

            {/*mid section*/}
              <View>
                
              </View>
            {/*bottom section*/}
            <View>
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
        <TouchableOpacity style={styles.middleButton01}><Text style={styles.middleButtonText}>즐겨찾기</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton02} onPress={styleModalUp}><Text style={styles.middleButtonText}>추천코디</Text></TouchableOpacity>
        <TouchableOpacity style={styles.middleButton03} onPress={weatherModalUp}><Text style={styles.middleButtonText}>날씨정보</Text></TouchableOpacity>
      </View>

      {/* main section - person section */}
      <View style={styles.containerThree}>
        <ImageBackground source={require('app-cloring/assets/man.png')} resizeMode="contain" style={styles.personpicture}>
        <TouchableOpacity style={styles.mainpersonhead} onPress={headModalUp}></TouchableOpacity>
        <TouchableOpacity style={styles.mainpersonbody_top} onPress={bodytopModalUp}></TouchableOpacity>
        <TouchableOpacity style={styles.mainpersonbody_bottom} onPress={bodybottomModalUp}></TouchableOpacity>
        </ImageBackground> 
        
        

      </View>


      {/* bottom section */}
      <View style={styles.containerFour}>
        <TouchableOpacity style={styles.bottomButton01} onPress={()=>{navigation.navigate('ClothesPage')}}><Text style={styles.bottomButtonText}>옷</Text></TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton02}><Text style={styles.bottomButtonText}>메인</Text></TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton03} onPress={()=>{navigation.navigate('MyPage')}}><Text style={styles.bottomButtonText}>개인정보</Text></TouchableOpacity>
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
  topButton01: {
    width: 50,
    height: 50,
    padding: 15,
    backgroundColor: "#fdc453",
    borderColor: "deeppink",
    borderRadius: 15,
    margin: 7
  },
  middleButton01: {
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
  middleButtonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center"
  },
  buttonStyle: {
    color: "#000",
    fontWeight: "700",
    textAlign: "center"
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  //Modal Style
  weathermodalView: {
    width: 320,
    height: 500,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTopView : {
    height:70,
    width : 250,
    borderColor:'#000',
    borderWidth:1,
    borderRadius:10,
    marginBottom:10,
  },
  modalMidView : {
    height:70,
    width : 250,
    borderColor:'#000',
    borderWidth:1,
    borderRadius:10,
    margin:10,
  },
  modalBotView : {
    height:200,
    width : 250,
    borderColor:'#000',
    borderWidth:1,
    borderRadius:10,
    margin:10,
  },
  modalText: {
    fontSize : 15,
    marginBottom: 5,
    textAlign: 'center'
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
  personpicture :{
    width: '100%',
    height: '100%',
    resizeMode: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  stylemodalView: {
    width: 320,
    height: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  mainpersonhead: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 10,
    borderRadius: 5,
    margin: 3,
    top : 0,
    left : 125,
    width : 150,
    height : 110
  },
  mainpersonbody_top:{
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 10,
    borderRadius: 5,
    margin: 3,
    top : 120,
    left : 125,
    width : 150,
    height : 240
  },
  mainpersonbody_bottom:{
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 10,
    borderRadius: 5,
    margin: 3,
    top : 350,
    left : 125,
    width : 150,
    height : 180
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold'
  },
  HeadmodalView:{
    width: 200,
    height: 200,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    top : -150,
    left : 70
  },
  BodyTopmodalView:{
    width: 200,
    height: 200,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    top : 0,
    left : 70
  },
  BodyBottommodalView:{
    width: 200,
    height: 200,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    top : 220,
    left : 70
  }
  
});