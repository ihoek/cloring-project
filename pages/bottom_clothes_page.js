import React from 'react';
import { View, Text, StyleSheet,SafeAreaView, ScrollView, Image } from 'react-native';

const BottomClothesPage = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/*cards*/}
            <ScrollView>
                {/*first cards*/}
                <View style={styles.card}>
                    <View style={styles.iamgecard}>
                        <Image source={require('app-cloring/assets/jeans.png')}  style={styles.images}/>
                    </View>
                    <View style={styles.contentcard}>
                        <Text style={styles.texttitle}>청바지</Text>
                        <View style={styles.textsub}>
                            <Text>1.세탁법</Text>
                            <Text>첫 세탁의 경우 드라이크리닝을 권장합니다</Text>
                            <Text>지퍼와 버튼을 채운 뒤 뒤집어 찬물과 중성세제를 </Text>
                            <Text>사용합니다</Text>
                        </View>
                        
                        <View style={styles.textsub}>
                            <Text>2.보관법</Text>
                            <Text>직사광선에 들지않고 통풍이 잘되는 곳에 보관합니다</Text>
                        </View>
                        
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.iamgecard}>
                        <Image source={require('app-cloring/assets/slacks.png')}  style={styles.images}/>
                    </View>
                    <View style={styles.contentcard}>
                        <Text style={styles.texttitle}>슬랙스</Text>
                        <View style={styles.textsub}>
                            <Text>1.세탁법</Text>
                            <Text>민감한 소재일 경우 드라이클리닝을 권장합니다</Text>
                            <Text>세탁기의 경우 세탁망에 넣어 약한 회전으로 세탁합니다</Text>
                        </View>
                        
                        <View style={styles.textsub}>
                            <Text>2.보관법</Text>
                            <Text>바지를 뒤집어서 주름선 라인대로 접어서 보관합니다</Text>
                        </View>
                        
                    </View>
                </View>

            </ScrollView>
            

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card : {
        width : 380,
        height: 200,
        backgroundColor : "#fff",
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iamgecard:{
        height: 100,
        width: 100,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    images:{
        height: 90,
        width: 90,
        justifyContent: 'center',
        alignItems: 'center'
    },
    texttitle : {
        fontWeight: '700',
        
    },
    textsub:{
        margin : 5
    }
    
});

export default BottomClothesPage;
