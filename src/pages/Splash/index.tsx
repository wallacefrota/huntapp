import React, { useEffect } from 'react';
import {View, ActivityIndicator, Image} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';

const Splash = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const time = setTimeout(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        {name: 'Main'}
                    ]
                })
            );
        }, 1000);

        return () => {
            clearTimeout(time)
        }
    },[]);

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 3,justifyContent: 'flex-end', alignItems: 'center'}}>
                <Image 
                    source={require('../../assets/img/splash.png')} 
                    style={{width: 300, height: 400}}
                    resizeMode="contain"
                />
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
               <ActivityIndicator color="#e39a09" size="large"/> 
            </View>
        </View>
    )
};

export default Splash;