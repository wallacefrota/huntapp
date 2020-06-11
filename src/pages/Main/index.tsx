import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import api from '../../services/api';
import { FlatList } from 'react-native-gesture-handler';

// interface
interface Data {
    _id: string;
    title: string;
    description: string;
    url: string;
}
interface Product {
    pages: number;
}
// tela principal
const Main = () => {
    // estado
    const [products, setProducts] = useState<Data[]>([]);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [productInfo, setProductInfo] = useState<Product>({} as Product);
    const [page, setPage] = useState(1);

    const navigation = useNavigation();

    useEffect(() => {
        // chamada a função que carrega items
        loadProducts();          
    }, []);
    // visibilidade shimmet
    useEffect(() => {
        setTimeout(() => {
            setVisible(!visible)
        }, 1500);
    },[]);
    // carrega os items da api
    async function loadProducts(page = 1) {
        if (loading) return;

        setLoading(true);

        await api.get(`/products/?page=${page}`).then(response => {
            const {docs, ...productInfo} = response.data
            setProducts([...products, ...docs]);
            setProductInfo(productInfo); 
            setPage(page);
            setLoading(false)
        });
    }
    // carrega mais items (pagina) chamando função
    function loadMore() {
        // verificar se possui mais items
        if(page === productInfo.pages) return;
        
        // senao soma com mais um e chama função laodproducts
        const pageNumber = page + 1;
        // chamando função e passando numero da página
        loadProducts(pageNumber);
    }
    // visualização mais carregamento
    function footerLoading() {
        if(!loading) return null;
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color="#DCDCDC" size="large"/>
            </View>
        )
    }
    return(
        <View style={{flex: 1, padding: 20}}>
                  <FlatList
                        keyExtractor={(item, index) => `${index}`}
                        data={products}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={footerLoading}
                        renderItem={({item}) => (
                                    <View style={styles.product} key={item._id}>
                                        <ShimmerPlaceHolder 
                                            style={{height: 18}}
                                            autoRun={true}
                                            visible={visible}
                                        >
                                            <Text style={styles.title}>{item.title}</Text> 
                                        </ShimmerPlaceHolder>
                                        <ShimmerPlaceHolder 
                                            style={{height: 32, marginVertical: 10, width: '100%'}} 
                                            visible={visible} 
                                            autoRun={true}
                                        >
                                            <Text style={styles.description}>{item.description}</Text>
                                        </ShimmerPlaceHolder>
                                        <ShimmerPlaceHolder style={{width: '100%', height: 46, marginVertical: 10}} 
                                            autoRun={true} 
                                            visible={visible}
                                        >
                                            <TouchableOpacity 
                                                style={styles.button}
                                                onPress={() => navigation.navigate('Web', {url: item.url, title: item.title})}
                                            >
                                                <Text style={styles.btnText}>Acessar</Text>
                                            </TouchableOpacity>
                                        </ShimmerPlaceHolder>
                                    </View>
                        )}
                    />          
        </View>
    )
};
const styles = StyleSheet.create({
    product: {
       backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#f5f5f5',
        borderRadius: 10,
        padding: 20,
        marginBottom: 12
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    description: {
        fontSize: 12, 
        lineHeight: 20,
        marginBottom: 10
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 42,
        padding: 10,
        borderWidth: 2,
        borderColor: '#e68b02',
        borderRadius: 8
    },
    btnText: {
        color: '#e68b02',
        textTransform: 'uppercase',
        letterSpacing: .5,
        fontWeight: 'bold'
    }
});
export default Main;