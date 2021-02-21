import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import axios from 'axios';
import {API_URL} from '@env';
import ActionSheet from 'react-native-actions-sheet';

const actionSheetRef = createRef();

const MainCatalogScreen = ({navigation, route}) => {
  let {card, search} = route.params;
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState([]);

  const searching = () => {
    axios
      .get(`${API_URL}/search?keyword=${search}`)
      .then((res) => {
        const products = res.data.data;
        setIsSearching(products);
        console.log('data search', products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProduct = async () => {
    await axios
      .get(`${API_URL}/products?keyword=created_at DESC&limit=100`)
      .then((res) => {
        const products = res.data.data.products;
        setProducts(products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    searching(search);
  }, [search]);

  useEffect(() => {
    getProduct(card);
  }, [card]);

  return (
    <>
      {search !== undefined ? (
        <FlatGrid
          itemDimension={130}
          data={isSearching}
          style={styles.gridView}
          spacing={10}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailProduct', {
                  itemId: item.id,
                  categories: item.category_name,
                })
              }>
              <View
                style={[styles.itemContainer, {backgroundColor: '#ffffff'}]}>
                <Image
                  source={{
                    uri: `${API_URL}${JSON.parse(item.product_photo).shift()}`,
                  }}
                  style={{borderRadius: 10, width: '100%', height: 100}}
                  resizeMode="contain"
                />
                <Text style={styles.itemName}>{item.product_name}</Text>
                <Text style={styles.itemCode}>{item.product_price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <FlatGrid
          itemDimension={130}
          data={products}
          style={styles.gridView}
          spacing={10}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailProduct', {
                  itemId: item.id,
                  categories: item.category_name,
                })
              }>
              <View
                style={[styles.itemContainer, {backgroundColor: '#ffffff'}]}>
                <Image
                  source={{uri: `${JSON.parse(item.product_photo).shift()}`}}
                  style={{borderRadius: 10, width: '100%', height: 100}}
                  resizeMode="contain"
                />
                <Text style={styles.itemName}>{item.product_name}</Text>
                <Text style={styles.itemCode}>{item.product_price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000000',
  },
});

export default MainCatalogScreen;
