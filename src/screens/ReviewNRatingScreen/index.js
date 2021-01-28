import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import Star from '../../assets/images/Starfull.png';
import {Rating, AirbnbRating} from 'react-native-ratings';
import axios from 'axios';
import {API_URL} from '@env';


const RatingAndReview = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newReview, setNewReview] = useState('');

  

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* <Text style={{marginTop: 40, fontSize: 30, fontWeight: 'bold'}}>
            Rating&Reviews
          </Text> */}
          <View style={styles.containerRating}>
            <View style={styles.ratingNum}>
              <Text style={{fontSize: 44, fontWeight: 'bold'}}>4.3</Text>
              <Text>23 Rating</Text>
            </View>
            <View style={styles.ratingDtl}>
              <View style={styles.rating}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 184,
                    alignItems: 'center',
                  }}>
                  <View style={styles.containerStar}>
                    <Image source={Star} />
                    <Image source={Star} />
                    <Image source={Star} />
                    <Image source={Star} />
                    <Image source={Star} />
                  </View>
                  <View style={{width: 114}}>
                    <View
                      style={{
                        height: 8,
                        width: 114,
                        justifyContent: 'flex-start',
                        backgroundColor: '#DB3022',
                        borderRadius: 4,
                      }}></View>
                  </View>
                </View>
                <View style={{marginLeft: 23}}>
                  <Text>12</Text>
                </View>
              </View>
              <View style={styles.rating}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 184,
                    alignItems: 'center',
                  }}>
                  <View style={styles.containerStar}>
                    <Image source={Star} />
                    <Image source={Star} />
                    <Image source={Star} />
                    <Image source={Star} />
                  </View>
                  <View style={{width: 114}}>
                    <View
                      style={{
                        height: 8,
                        width: 80,
                        justifyContent: 'flex-start',
                        backgroundColor: '#DB3022',
                        borderRadius: 4,
                      }}></View>
                  </View>
                </View>
                <View style={{marginLeft: 23}}>
                  <Text>4</Text>
                </View>
              </View>
              <View style={styles.rating}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 184,
                    alignItems: 'center',
                  }}>
                  <View style={styles.containerStar}>
                    <Image source={Star} />
                    <Image source={Star} />
                    <Image source={Star} />
                  </View>
                  <View style={{width: 114}}>
                    <View
                      style={{
                        height: 8,
                        width: 60,
                        justifyContent: 'flex-start',
                        backgroundColor: '#DB3022',
                        borderRadius: 4,
                      }}></View>
                  </View>
                </View>
                <View style={{marginLeft: 23}}>
                  <Text>3</Text>
                </View>
              </View>
              <View style={styles.rating}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 184,
                    alignItems: 'center',
                  }}>
                  <View style={styles.containerStar}>
                    <Image source={Star} />
                    <Image source={Star} />
                  </View>
                  <View style={{width: 114}}>
                    <View
                      style={{
                        height: 8,
                        width: 40,
                        justifyContent: 'flex-start',
                        backgroundColor: '#DB3022',
                        borderRadius: 4,
                      }}></View>
                  </View>
                </View>
                <View style={{marginLeft: 23}}>
                  <Text>2</Text>
                </View>
              </View>
              <View style={styles.rating}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 184,
                    alignItems: 'center',
                  }}>
                  <View style={styles.containerStar}>
                    <Image source={Star} />
                  </View>
                  <View style={{width: 114}}>
                    <View
                      style={{
                        height: 8,
                        width: 20,
                        justifyContent: 'flex-start',
                        backgroundColor: '#DB3022',
                        borderRadius: 4,
                      }}></View>
                  </View>
                </View>
                <View style={{marginLeft: 23}}>
                  <Text>0</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{marginTop: 37}}>
            <Text style={{fontSize: 24, fontWeight: '800'}}>8 Reviews</Text>
          </View>

          <ScrollView style={{height: 300, width: '100%'}}>
            <View style={{marginTop: 44}}>
              <View style={styles.cardComent}>
                <Image
                  source={require('../../assets/images/myprofile.png')}
                  style={styles.imgComent}
                />
                <View style={styles.cardContainer}>
                  <Text>helena moore</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Image source={Star} />
                    <Text>25-01-2021</Text>
                  </View>
                  <Text>test rating dan reviews</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* <View style={styles.addcart}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={{justifyContent: 'flex-end'}}>
                <View style={styles.btn}>
                  <Text style={{color: '#fff'}}>Write a review</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  containerRating: {
    height: 95,
    width: 330,
    marginTop: 41,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingNum: {
    width: 64,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingDtl: {
    width: 236,
    height: '100%',
    justifyContent: 'center',
  },
  rating: {
    flexDirection: 'row',
  },
  containerStar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 60,
  },
  cardComent: {
    minHeight: 100,
    width: 311,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 8,
  },
  imgComent: {
    height: 52,
    width: 52,
    borderRadius: 26,
    top: -20,
    left: -20,
  },
  cardContainer: {
    width: 311,
    minHeight: 100,
    paddingHorizontal: 23,
    top: -20,
  },
  addcart: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    top: undefined,
  },
  btn: {
    backgroundColor: '#DB3022',
    width: 128,
    height: 48,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 24,
  },
});

export default RatingAndReview;
