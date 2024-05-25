import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Modal, Alert, ImageBackground, Image,Dimensions } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

export default function Mainpage({ navigation, route }) {
    //모달 상태 변수
    const [weatherModalVisible, setWeatherModalVisible] = useState(false);
    const [styleModalVisible, setStyleModalVisible] = useState(false);
    const [HeadModalVisible, setHeadModalVisible] = useState(false);
    const [BodyTopModalVisible, setBodyTopModalVisible] = useState(false);
    const [BodyBottomModalVisible, setBodyBottomModalVisible] = useState(false);
    const [BookmarkmodalVisible, setBookmarkModalVisible] = useState(false);

    // 현재 주소를 저장할 상태 변수
    const [currentAddress, setCurrentAddress] = useState(""); 

    // 현재 날씨 저장할 상태 변수
    const [currentWeather, setCurrentWeather] = useState("");

    //현재 날씨 API one call 3.0 key
    //const API_KEY = "bb5c7d6f8aed715848b2030f20cc4ad0";
    
    //clothes_page에서 받은 이미지 저장 변수
    const [topImage, setTopImage] = useState(null);
    const [bottomImage, setBottomImage] = useState(null);
    const [accessoryImage, setAccessoryImage] = useState(null);

    //즐겨찾기용 변수
    const [selectedOption, setSelectedOption] = useState('');
    const [imageUri, setImageUri] = useState(null); // 사진 URI 상태 추가
    
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      closeModal();
    };
    
    const bookmarkmodalup = () => {
      console.log('bookmarkmodalup');
      setBookmarkModalVisible(true);
    };
    
    // 등록 버튼 누를 때 처리 로직 - 임시로 사진 등록 로직 추가
    const handleRegister = () => {
      const dummyImageUri = 'https://via.placeholder.com/150'; // 임시 이미지 URI
      setImageUri(dummyImageUri);
      closeModal();
    };

    //즐겨찾기 삭제 버튼 
    const handleDelete = () => {  
      setImageUri(null); // 이미지 URI 초기화
      closeModal();
    };


    useEffect(() => {
      if (route.params) {
          const { topImage, bottomImage, accessoryImage } = route.params;
          if (topImage) {
            console.log('상의 이미지를 정상적으로 받음');
            setTopImage(topImage);}
          if (bottomImage) {
            console.log('하의 이미지를 정상적으로 받음');
            setBottomImage(bottomImage);
          }
          if (accessoryImage){
            console.log('악세사리 이미지를 정상적으로 받음');
            setAccessoryImage(accessoryImage);
          } 
      }
  }, [route.params]);

    //위치 가져오기
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
            if(location[0].region==null){
              address = `${location[0].city}`;
              //console.log(location[0].region);
            }else{
              address = `${location[0].region} ${location[0].city}`;
            }
            //console.log(address);
            console.log(location[0].region + location[0].city);
            return address;
        } catch (error) {
            console.error('주소를 가져오는 중 오류 발생:', error);
            return '주소를 가져올 수 없음';
        }
    };

    //날씨 가져오기 함수
    const getWeather = async (latitude, longitude) => {
      try {
        console.log('날씨 가져오기 함수 실행 중');
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
        
        const temp = result.data.main.temp;//온도
        const condition = result.data.weather[0].main;//날씨(구름, 맑음, 비 등등..)
        const feel_like = result.data.main.feels_like;//체감온도
        const temp_max = result.data.main.temp_max;//최고 온도
        const temp_min = result.data.main.temp_min;//최저 온도
        const humidity = result.data.main.humidity//습도

        console.log('날씨 변수 모두 호출 완료');
        console.log('temp : ' + temp-275.15);
        console.log('condition : ' + condition);
          return {
            temp,
            condition,
            feel_like,
            temp_max,
            temp_min,
            humidity
          };
      } catch (error) {
          console.error('날씨를 가져오는 중 오류 발생:', error);
          return '날씨를 가져올 수 없음';
      }
    };
    
    //날씨정보 모달 열기
    const weatherModalUp = async () => {
        try {
          // 현재의 경도와 위도 가져오기
            const coords = await getLocation(); 
            // 현재의 경도와 위도가 유효한 경우에만 모달 열기
            if (coords) {
                // 주소 가져오기
                const address = await getAddressFromCoords(coords.latitude, coords.longitude);
                const weather = await getWeather(coords.latitude, coords.longitude);
                setCurrentWeather(weather);
                setCurrentAddress(address);
                setWeatherModalVisible(true);
                console.log('weather-modal-open');
            }
            //getWeather 함수 실행 여부확인
            //setCurrentWeather(getWeather);
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
        setBookmarkModalVisible(false);
        console.log('modal-close');
    };
    

    return (
        <SafeAreaView style={styles.container}>
            {/* 북마크 모달 */}
            <Modal
              animationType="none"
              transparent={true}
              visible={BookmarkmodalVisible}
              onRequestClose={() => {
                setBookmarkModalVisible(false);
              }}>
                <View style={styles.centeredView}>
                  <View  style={styles.bookmodalView}>
                    {/* 선택1 */}
                    <View style={styles.optionContainer}>
                      <TouchableOpacity onPress={() => handleOptionSelect('선택1')} style={styles.optionButton}>
                        <Text style={styles.optionText}>선택1</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                        <Text style={styles.buttonText}>등록</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                        <Text style={styles.buttonText}>삭제</Text>
                      </TouchableOpacity>
                    </View>
                    {/* 선택2 */}
                    <View style={styles.optionContainer}>
                      <TouchableOpacity onPress={() => handleOptionSelect('선택2')} style={styles.optionButton}>
                        <Text style={styles.optionText}>선택2</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                        <Text style={styles.buttonText}>등록</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                        <Text style={styles.buttonText}>삭제</Text>
                      </TouchableOpacity>
                    </View>

                    {/* 선택3 */}
                    <View style={styles.optionContainer}>
                      <TouchableOpacity onPress={() => handleOptionSelect('선택3')} style={styles.optionButton}>
                        <Text style={styles.optionText}>선택3</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                        <Text style={styles.buttonText}>등록</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                        <Text style={styles.buttonText}>삭제</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.ModalCloseButton} onPress={closeModal}>
                    <Text style={styles.bottomButtonText}>닫기</Text>
                  </TouchableOpacity>

                  </View>
                </View>
              
            </Modal>
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
                            <Text style={styles.modalText}>{currentAddress}</Text>
                        </View>
                        <View style={styles.modalMidView}>
                            <Text style={styles.modalText}>전체적인 날씨</Text>
                            <Text style={styles.modalText}>전반적으로 기온이 높아 더울 것으로 예상됩니다.</Text>
                        </View>
                        <View style={styles.modalBotView}>
                        {currentWeather && (
                                <>
                                    <Text style={styles.modalText}>현재 온도</Text>
                                    <Text style={styles.modalText}>{(currentWeather.temp-275.15).toFixed(2)}°C</Text>
                                    <Text style={styles.modalText}>날씨</Text>
                                    <Text style={styles.modalText}>{currentWeather.condition}</Text>
                                    <Text style={styles.modalText}>체감 온도</Text>
                                    <Text style={styles.modalText}>{(currentWeather.feel_like-275.15).toFixed(2)}°C</Text>
                                    <Text style={styles.modalText}>최고 온도</Text>
                                    <Text style={styles.modalText}>{(currentWeather.temp_max-275.15).toFixed(2)}°C</Text>
                                    <Text style={styles.modalText}>최저 온도</Text>
                                    <Text style={styles.modalText}>{(currentWeather.temp_min-275.15).toFixed(2)}°C</Text>
                                    <Text style={styles.modalText}>습도</Text>
                                    <Text style={styles.modalText}>{currentWeather.humidity}%</Text>
                                </>
                            )}
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
                          <Text style={styles.modalText}>오늘의 온도는 26도 이므로 반팔에 긴바지와 같은 조합을 추천합니다</Text>
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
                            <Text style={styles.modalText}>악세사리모달</Text>
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
                          <Text style={styles.modalText}>제품명 : </Text>
                          <Text style={styles.modalText}>소재 : </Text>
                          <Text style={styles.modalText}>구입날짜 : </Text>

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
                <TouchableOpacity style={styles.middleButton01} onPress={bookmarkmodalup}><Text style={styles.middleButtonText}>즐겨찾기</Text></TouchableOpacity>
                <TouchableOpacity style={styles.middleButton02} onPress={styleModalUp}><Text style={styles.middleButtonText}>추천코디</Text></TouchableOpacity>
                <TouchableOpacity style={styles.middleButton03} onPress={weatherModalUp}><Text style={styles.middleButtonText}>날씨정보</Text></TouchableOpacity>
                
            </View>

            {/* main section - person section */}
            <View style={styles.containerThree}>
                <ImageBackground source={require('app-cloring/assets/man.png')} resizeMode="contain" style={styles.personpicture}>
                    <TouchableOpacity style={styles.mainpersonhead} onPress={headModalUp}>{accessoryImage && <Image source={{ uri: accessoryImage }} style={styles.imageStyle} />}</TouchableOpacity>
                    <TouchableOpacity style={styles.mainpersonbody_top} onPress={bodytopModalUp}>{topImage && <Image source={{ uri: topImage }} style={styles.top_imageStyle} />}</TouchableOpacity>
                    <TouchableOpacity style={styles.mainpersonbody_bottom} onPress={bodybottomModalUp}>{bottomImage && <Image source={{ uri: bottomImage }} style={styles.imageStyle} />}</TouchableOpacity>
                </ImageBackground>
            </View>

            {/* bottom section */}
            <View style={styles.containerFour}>
                <TouchableOpacity style={styles.bottomButton01} onPress={() => { navigation.navigate('ClothesPage') }}><Image source={require('app-cloring/assets/clothe.png')} style={styles.clothebtn}/></TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton02}><Image source={require('app-cloring/assets/home.png')} style={styles.homebtn}/></TouchableOpacity>
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
    flex: 0.5,
    backgroundColor : '#36251b',
    justifyContent: 'center'//세로정렬
    
  },
  containerTwo: {
    flex: 0.5,
    flexDirection: 'row',
    backgroundColor : '#36251b',
    justifyContent: 'center',
    alignItems: 'center'
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  //Modal Style
  weathermodalView: {
    width: 320,
    height: 550,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    borderColor:'#000',
    borderWidth:1
  },
  modalTopView : {
    height:50,
    width : 250,
    borderColor:'#000',
    borderWidth:1,
    borderRadius:10,
    marginBottom:5,
  },
  modalMidView : {
    height:50,
    width : 250,
    borderColor:'#000',
    borderWidth:1,
    borderRadius:10,
    margin:5,
  },
  modalBotView : {
    height:300,
    width : 250,
    borderColor:'#000',
    borderWidth:1,
    borderRadius:10,
    margin:5,
  },
  modalText: {
    fontSize : 15,
    marginBottom: 4,
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    borderRadius: 5,
    margin: 3,
    top : 0,
    width : 150,
    height : 110
  },
  mainpersonbody_top:{
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
    margin: 3,
    top : 120,
    width : 205,
    height : 240
  },
  iamge_top:{
    top : -50,
    left : -50,
    width : 300,
    height : 300
  },
  mainpersonbody_bottom:{
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
    margin: 3,
    top : 350,
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
  },
  top_imageStyle : {
      padding: 10,
      borderRadius: 5,
      margin: 3,
      top : -20,
      width : 205,
      height : 240
  },
  bookmarkmodalView : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  bookmodalView:{
    width: 250,
    height: 350,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  optionContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#9adbc5',
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
  },
  optionText: {
    color: '#fff',
    fontWeight: '700',
  },
  registerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 10,
    marginLeft: 10,
  },
  // 삭제 버튼
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F44336', // 삭제 버튼 색상
    borderRadius: 15,
    padding: 10,
    marginLeft: 10,
  },


});