import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
// interface
interface Params {
    title: string;
    url: string;
}
// page
const Web = () => {
    // estado
    const [loading, setLoading] = useState(true)
    const route = useRoute();
    // pegando parametros repassados
    const routeParams = route.params as Params;

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({title: routeParams.title});
        const time = setTimeout(() => {
            setLoading(false)
        }, 500);

        return () => {
            clearTimeout(time)
        }
    }, [navigation]);
    
    return(
        <View style={{flex: 1}}>
            {
                loading 
                ? 
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator color="#e39a09" size="large"/>
                    <Text>Carregando...</Text>
                </View>
                : 
                <WebView
                    source={{ uri: routeParams.url }}
                />
            }
        </View>
    )
}
export default Web;