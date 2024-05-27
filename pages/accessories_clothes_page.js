import React from 'react';
import { View, Text, StyleSheet,SafeAreaView, ScrollView, Image } from 'react-native';

const AccessoriesClothesPage = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/*cards*/}
            <ScrollView>
                {/*first cards*/}
                <View style={styles.card}>
                    <View style={styles.iamgecard}>
                        <Image source={require('app-cloring/assets/hat.png')}  style={styles.images} />
                    </View>
                    <View style={styles.contentcard}>
                        <Text style={styles.texttitle}>모자</Text>
                        <View style={styles.textsub}>
                            <Text>1.세탁법</Text>
                            <Text>세면대나 대야에 모자가 잠길 정도로만 미온수를</Text>
                            <Text>채워 중성세제를 이용하여 20분 담가두고 </Text>
                            <Text>이용하여 20분 담가둔 캡부분을 제외하고 손빨래를</Text>
                            <Text>진행합니다</Text>
                        </View>
                        
                        <View style={styles.textsub}>
                            <Text>2.보관법</Text>
                            <Text>가능한 평평한 표면에 두어 보관하는 것을 권장합니다</Text>
                            <Text>모자의 원형을 유지한 채로 보관합니다</Text>
                        </View>
                        
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.iamgecard}>
                        <Image source={require('app-cloring/assets/scarf.jpg')} style={styles.images} />
                    </View>
                    <View style={styles.contentcard}>
                        <Text style={styles.texttitle}>스카프</Text>
                        <View style={styles.textsub}>
                            <Text>1.세탁법</Text>
                            <Text>미온수를 사용하여 세탁 후 그늘에 건조합니다</Text>
                        </View>
                        
                        <View style={styles.textsub}>
                            <Text>2.보관법</Text>
                            <Text>폴더형식으로 접어서 보관하는 것을 권장합니다</Text>
                            <Text>그늘진 곳에서의 보관을 권장합니다</Text>
                        </View>
                        
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.iamgecard}>
                        <Image source={require('app-cloring/assets/tie.png')} style={styles.images}/>
                    </View>
                    <View style={styles.contentcard}>
                        <Text style={styles.texttitle}>넥타이</Text>
                        <View style={styles.textsub}>
                            <Text>1.세탁법</Text>
                            <Text>물세탁이 가능할 경우 미온수에 중성세제를 이용합니다</Text>
                        </View>
                        
                        <View style={styles.textsub}>
                            <Text>2.보관법</Text>
                            <Text>넥타이를 돌돌 말아서 보관합니다</Text>
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
    contentcard:{
        
    },
    texttitle : {
        fontWeight: '700',
        
    },
    textsub:{
        margin : 5
    },
    images:{
        height: 90,
        width: 90,
        justifyContent: 'center',
        alignItems: 'center'
    }
    
});

export default AccessoriesClothesPage;
