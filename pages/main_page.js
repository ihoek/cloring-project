import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView, Modal } from 'react-native';

export default function Mainpage({navigation,route}) {
  const [modalVisible, setModalVisible] = useState(false);
  //const [state,setState] = useState([])
  //const [cateState,setCateState] = useState([])
  //const [ready,setReady] = useState(true)

  const modalup = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <SafeAreaView style={styles.container}>
      
      {/* weather modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>

          {/* modal-mid */}
          <View style={styles.modalView}>
            <Text style={styles.modalText}>날씨 정보 모달 이하 API기준 날씨 정보가 뜸</Text>
            <Button title="닫기" onPress={closeModal} />
          </View>

          {/* modal-bot */}


        </View>
      </Modal>

      {/* top section */}
      <View style={styles.containerOne}>
        <TouchableOpacity style={styles.topButton01}><Text style={styles.middleButtonText}>메뉴</Text></TouchableOpacity>
      </View>

      {/* middle section */}
      <View style={styles.containerTwo}>
          <TouchableOpacity style={styles.middleButton01}><Text style={styles.middleButtonText}>매크로</Text></TouchableOpacity>
          <TouchableOpacity style={styles.middleButton02}><Text style={styles.middleButtonText}>추천코디</Text></TouchableOpacity>
          <TouchableOpacity style={styles.middleButton03} onPress={modalup}><Text style={styles.middleButtonText} >날씨정보</Text></TouchableOpacity>
      </View>

      {/* main section */}
      <View style={styles.containerThree}>

      </View>


      {/* bottom section */}
      <View style={styles.containerFour}>
        <TouchableOpacity style={styles.bottomButton01}><Text style={styles.bottomButtonText}>옷</Text></TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton02}><Text style={styles.bottomButtonText}>메인</Text></TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton03}  onPress={()=>{navigation.navigate('MyPage')}}><Text style={styles.bottomButtonText}>개인정보</Text></TouchableOpacity>
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
    //backgroundColor: "red"
  },
  containerTwo: {
    flex: 0.5,
    flexDirection: 'row'
    //backgroundColor: "yellow"
  },
  containerThree: {
    flex: 5,
    //backgroundColor: "green"
  },
  containerFour: {
    flex: 0.7,
    //backgroundColor: "blue",
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
    color: "#000",
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
  modalView: {
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  }
});
