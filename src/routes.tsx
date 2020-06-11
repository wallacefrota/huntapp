import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// importando telas
import Splash from './pages/Splash';
import Main from './pages/Main';
import Web from './pages/WebView';

// rotas stack
const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'white'
                    },
                    cardOverlayEnabled: false,
                    gestureEnabled: true,
                    gestureDirection: "horizontal",
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    cardStyle: {
                        backgroundColor: "#F0F0F5"
                    }
                    
                }}
            >
                <Stack.Screen 
                    name="Splash"
                    component={Splash}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Web"
                    component={Web}
                    options={{
                        headerStyle: {
                            backgroundColor: '#e39a09',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerTitleAlign: 'center',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
// exportando arquivo de rotas
export default Routes;