import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Modal } from 'react-native';

// 사용자 프로필 사진 가져오기
const userProfileImage = require('../assets/top1.png');

export default function MyPage({ onClose ,navigation}) {
  const [username, setUsername] = useState("사용자");
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  // 모달
  const [stylemodalVisible, setstylemodalVisible] = useState(false);

  // textfield
  const [text, onChangeText] = React.useState('');
  const [stylesList, setStylesList] = useState([]);

  const handleNameChange = () => {
    setEditingName(true);
  };

  const handleNameSubmit = () => {
    setUsername(newName);
    setEditingName(false);
    setNewName("");
  };

  // Style Modal
  const StyleModal = async () => {
    try {
      setstylemodalVisible(true);
      console.log('StyleModal 실행 중');
    } catch (error) {
      console.error('스타일 모달 열기 중 오류 발생:', error);
    }
  };

  // 모달 확인 버튼
  const checkmodal = async () => {
    if (text.trim() !== '') {
      setStylesList([...stylesList, text]);
      onChangeText('');
    }
    closeModal();
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setstylemodalVisible(false);
    console.log('modal-close');
  };

  return (
    <View style={styles.container}>
      {/* 스타일 모달 */}
      <Modal
        animationType="none"
        transparent={true}
        visible={stylemodalVisible}
        onRequestClose={() => {
          setstylemodalVisible(false);
        }}>
        <View style={styles.modalview}>
          <View style={styles.stylemodalview}> 
            <View style={styles.stylemodal_top_view}>
              <Text>선호 스타일을 입력하시오</Text>
            </View>

            <View style={styles.stylemodal_mid_view}>
              <TextInput 
                style={styles.textfieldinput} 
                onChangeText={onChangeText} 
                value={text}
                placeholder="스타일 입력"
              />
            </View>

            <View style={styles.stylemodal_bot_view}>
              <TouchableOpacity style={styles.ModalCloseButton} onPress={checkmodal}>
                <Text style={styles.bottomButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.container_top}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={userProfileImage} style={styles.profileImage} />
            <View style={styles.userInfoText}>
              {!editingName ? (
                <>
                  <Text style={styles.title}>사용자 이름: {username}</Text>
                  <TouchableOpacity style={styles.button} onPress={handleNameChange}>
                    <Text>이름 변경</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.editNameContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="새 이름을 입력하세요"
                    value={newName}
                    onChangeText={(text) => setNewName(text)}
                  />
                  <TouchableOpacity style={styles.button} onPress={handleNameSubmit}>
                    <Text>확인</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        <Text style={styles.title}>신체 사이즈</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="신장"
            value={height}
            onChangeText={(text) => setHeight(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="체중"
            value={weight}
            onChangeText={(text) => setWeight(text)}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.title}>선호 스타일</Text>
        <TouchableOpacity style={styles.button} onPress={StyleModal}>
          <Text>선호 스타일 입력</Text>
        </TouchableOpacity>

        {/* 선호 스타일 입력 결과 레이블 */}
        <View style={styles.stylesListContainer}>
          {stylesList.map((style, index) => (
            <View key={index} style={styles.styleItem}>
              <Text style={styles.styleText}>{style}</Text>
            </View>
          ))}
        </View>
      </View>
      
      {/* bottom section */}
      <View style={styles.container_bottom}>
        <TouchableOpacity style={styles.bottomButton01} onPress={() => { navigation.navigate('ClothesPage') }}>
          <Image source={require('app-cloring/assets/clothe.png')} style={styles.clothebtn}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton02} onPress={() => { navigation.navigate('MainPage') }}>
          <Image source={require('app-cloring/assets/home.png')} style={styles.homebtn}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton03}>
          <Image source={require('app-cloring/assets/private.png')} style={styles.clothebtn}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'left'
  },
  container_top : {
    flex: 8
  },
  container_bottom : {
    flex: 0.9,
    flexDirection: "row",
    backgroundColor : '#36251b',
    justifyContent: 'center'
  },
  header: {
    marginBottom: 15, 
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold',
    marginTop: 20, 
    marginBottom: 10, 
  },
  button: {
    backgroundColor: 'white', 
    padding: 10,
    marginLeft: 10,
    marginTop: 20, 
    width : 120,
    alignItems: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    height: 40, 
    width: 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    marginRight: 10,
    textAlign: 'center',
  },
  editNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#FF6B6B', 
    padding: 30,
    marginTop: 40,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 80,
    height: 80, 
    borderRadius: 40, 
  },
  myClothesButton: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userInfo: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 40,
  },
  userInfoText: {
    marginLeft: 10,
  },
  selectedStyle: {
    marginTop: 60, 
  },
  clothebtn:{
    width : 60,
    height : 60,
    top : -17,
  },
  homebtn:{
    width : 60,
    height : 60,
    top : -17,
    left : 35
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
  modalview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  stylemodalview:{
    width: 320,
    height: 200,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    borderColor:'#000',
    borderWidth:1
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
  textfieldinput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width : 100,
    alignItems: 'center'
  },
  stylesListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  styleItem: {
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  styleText: {
    fontSize: 16,
  }
});
