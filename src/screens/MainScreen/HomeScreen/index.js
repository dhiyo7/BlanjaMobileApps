import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Button,
  StatusBar,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {HeaderHome} from '../../../components';
import {Text} from '../../../components';
import {IconStarAct} from '../../../assets/icons';

import {colors} from '../../../utils';
import {API_URL} from '@env';

const HomeScreen = ({navigation}) => {
  // const BASE_URL = process.env.BASE_URL;
  const [card, setCard] = useState([]);
  const [cardTwo, setCardTwo] = useState([]);

  
  const getDataNew = async () => {
    await axios
      .get(`${API_URL}/products?keyword=created_at DESC`)
      .then((res) => {
        const card = res.data.data.products;
        console.log('DataNew ', res.data.data.products);
        setCard(card);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataPopular = async () => {
    await axios
    .get(`${API_URL}/products?keyword=created_at DESC`)
    .then((res) => {
      const cardTwo = res.data.data.products;
      // console.log('DataPopular', cardTwo);
      setCardTwo(cardTwo);
    })
    .catch((err) => {
      console.log(err);
    });
  };
  
  // useEffect(() => {
  //   getDataNew();
  //   getDataPopular();
  // }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataNew();
      getDataPopular();
    });
    return unsubscribe;
  }, [navigation]);

  // console.log(`here is ${pictures}`);

  return (
    <>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
        <View>
          <StatusBar
            barStyle="dark-content"
            translucent
            backgroundColor="rgba(0,0,0,0)"
          />
          <HeaderHome>
            <Text children="My Profile" size="xl3" style={styles.myprofile} />
          </HeaderHome>
        </View>

        <View style={styles.wrapTitleText}>
          <View>
            <Text children="New" size="xl3" style={styles.titeText} />
            <Text
              children="You’ve never seen it before!"
              size="m"
              style={styles.childText}
            />
          </View>
          <View>
            <Text
              onPress={() => navigation.navigate('Catalog', {data: card})}
              children="See All"
              size="m"
              style={styles.childText}
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.slider}>
          {card.map(
            ({
              product_id,
              product_name,
              product_price,
              product_photo,
              rating,
              category_name,
              id,
            }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DetailProduct', {
                      itemId: id,
                      categories: category_name,
                    })
                  }
                  style={{paddingRight: 10}}
                  key={id}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      borderStyle: 'solid',
                      borderColor: '#e5e5e5',
                      backgroundColor: 'white',
                    }}>
                    <Image
                      source={{uri: `${JSON.parse(product_photo).shift()}`}}
                      style={{
                        borderRadius: 10,
                        width: 120,
                        height: 170,
                      }}
                    />
                    <View style={styles.rating}>
                      <Image
                        source={require('../../../assets/images/Star.png')}
                      />

                      <Text children={rating} />
                    </View>
                    <View>
                      <Text children={product_name} size={12} />
                    </View>
                    <View>
                      <Text children={product_price} />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            },
          )}
        </ScrollView>

        <View style={styles.wrapTitleText}>
          <View>
            <Text children="Popular" size="xl3" style={styles.titeText} />
            <Text
              children="You’ve never seen it before!"
              size="m"
              style={styles.childText}
            />
          </View>
          <View>
            <Text
              children="See All"
              size="m"
              style={styles.childText}
              onPress={() => navigation.navigate('Catalog', {data: card})}
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.slider}>
          {cardTwo.map(
            ({
              product_id,
              product_name,
              product_price,
              product_photo,
              category_name,
              rating,
              id,
            }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DetailProduct', {
                      itemId: id,
                      categories: category_name,
                    })
                  }
                  style={{marginBottom: 20, paddingRight: 10}}
                  key={id}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      borderStyle: 'solid',
                      borderColor: '#e5e5e5',
                      backgroundColor: 'white',
                    }}>
                    <Image
                      source={{uri: `${JSON.parse(product_photo).shift()}`}}
                      style={{
                        borderRadius: 10,
                        width: 120,
                        height: 170,
                      }}
                    />
                    <View style={styles.rating}>
                      <Image
                        source={require('../../../assets/images/Star.png')}
                      />

                      <Text children={rating} />
                    </View>
                    <View>
                      <Text children={product_name} size={12} />
                    </View>
                    <View>
                      <Text children={product_price} />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            },
          )}
        </ScrollView>
      </ScrollView>
      {/* <Button
          style={styles.button}
          title="Go to Notif"
          onPress={() => navigation.navigate('Notification')}
        />
        <Button
          style={styles.button}
          title="Go to Details"
          onPress={() => navigation.navigate('DetailProduct')}
        /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 10,
  },
  titeText: {
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 2,
  },
  titleText: {
    textAlign: 'left',
  },
  wrapTitleText: {
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },

  rating: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
  },

  slider: {
    marginTop: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
