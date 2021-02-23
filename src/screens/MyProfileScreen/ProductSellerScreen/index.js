import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import axios from 'axios';
import ActionSheet from 'react-native-actions-sheet';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {FloatingMenu} from 'react-native-floating-action-menu';

import {API_URL} from '@env';

const ProductSeller = ({navigation, route}) => {
  //   const {itemId} = route.params;
  const [product, setProduct] = useState([]);
  const token = useSelector((state) => state.authReducer.token);

  useEffect(() => {
    getProductsSeller();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProductsSeller();
    });
    return unsubscribe;
  }, [navigation]);

  const getProductsSeller = () => {
    axios
      .get(`${API_URL}/products/user?keyword=created_at DESC`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        const product = res.data.data;
        console.log('Anjim', product);
        setProduct(product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`${API_URL}/products/${id}`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        getProductsSeller();
        console.log('Good');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <FlatGrid
        itemDimension={130}
        data={product}
        style={StyleSheet.gridView}
        spacing={10}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <View>
              <Image
                source={{
                  uri: `${API_URL}${JSON.parse(item.product_photo).pop()}`,
                }}
                style={{
                  // borderRadius: 10,
                  // width: '100%',
                  // height: 150,
                  height: 135,
                  width: 160,
                }}
                resizeMode="stretch"
              />
            </View>
            <View>
              <Text style={styles.itemName}>{item.product_name}</Text>
              <Text style={styles.itemCode}>Rp.{item.product_price}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                bottom: 0,
                backgroundColor: 'white',
                height: 60,
                width: '100%',
                paddingRight: 10,
              }}>
              <View
                style={{
                  width: '50%',
                  borderRadius: 8,
                  backgroundColor: 'green',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 5,
                  marginLeft: 3,
                  color: 'white',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('UpdateProductSeller', {
                      itemId: item.id,
                    });
                  }}>
                  <Text children="Edit" color="white" />
                </TouchableOpacity>
                {/* <ButtonSubmit bg="red" title="ADD TO CART" /> */}
              </View>
              <View
                style={{
                  width: '50%',
                  borderRadius: 8,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 5,
                  marginLeft: 3,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      'Confirm',
                      'Are you sure fot delete this product ?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => {
                            handleDelete(item.id);
                          },
                        },
                      ],
                      {cancelable: false},
                    )
                  }>
                  <Text children="Delete" color="white" />
                </TouchableOpacity>
                {/* <ButtonSubmit bg="red" title="Tanya Ke Penjual" /> */}
              </View>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('AddProduct')}
        style={styles.TouchableOpacityStyle}>
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
          }}
          style={styles.FloatingButtonStyle}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    // borderRadius: 5,
    // padding: 10,
    height: '100%',
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  itemName: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000000',
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
});

export default ProductSeller;
