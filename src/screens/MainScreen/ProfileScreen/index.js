import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import blanja from '../../../assets/images/Vector.png';
import {connect, useSelector} from 'react-redux';
import {logout} from '../../../utils/redux/action/authAction';
import axios from 'axios';
import {API_URL} from '@env';
import {Text} from '../../../components';
import {colors} from '../../../utils';

const ProfileScreen = ({navigation, logout}) => {
  const level = useSelector((state) => state.authReducer.level);
  const token = useSelector((state) => state.authReducer.token);
  const user_id = useSelector((state) => state.authReducer.user_id);
  const fullname = useSelector((state) => state.authReducer.fullname);
  const email = useSelector((state) => state.authReducer.email);

  console.log('nyoba', email, fullname);

  console.log('ini token', token);
  const handleLogout = () => {
    axios
      .delete(API_URL + '/auth/logout', {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then(async (res) => {
        logout(token, user_id, level);

        console.log('done');
        navigation.navigate('Profile');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <View style={{marginTop: 30, marginLeft: 15}}>
        <Text children="My Profile" size="xl3" style={styles.myprofile} />
      </View>
      <ScrollView style={styles.container}>
        {level !== 1 && level !== 2 ? (
          <>
            <View style={{marginVertical: '50%'}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Image source={blanja} style={{alignItems: 'center'}} />
              </View>
              <TouchableOpacity
                style={styles.btnLogin}
                onPress={() => navigation.navigate('Login')}>
                <Text color="white" size="xl">
                  Login
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  width: '100%',
                  marginVertical: 15,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Text size="m">Don't have Blanjapedia account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}>
                  <Text color="red" size="m">
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : level === 1 ? (
          <>
            <View
              style={{display: 'flex', flexDirection: 'row', marginBottom: 50}}>
              <View style={{marginRight: 10}}>
                <Image
                  style={styles.img}
                  source={require('../../../assets/images/myprofile.png')}
                />
              </View>
              <View style={{marginLeft: 10, justifyContent: 'center'}}>
                <Text children={fullname} size="xl" style={{width: '100%'}} />
                <Text children={email} size="m" color="gray" />
              </View>
            </View>

            <View>
              <TouchableOpacity
                style={styles.order}
                onPress={() => navigation.navigate('MyOrders')}>
                <View>
                  <Text children="My orders" size="xl" />
                  <Text
                    children="Already have 12 orders"
                    size="m"
                    color="gray"
                  />
                </View>
                <View>
                  <Icon name="chevron-right" size={30} color={colors.gray} />
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.order}
                onPress={() => navigation.navigate('Shipping address')}>
                <View>
                  <Text children="Shipping address" size="xl" />
                  <Text children="3 addresses" size="m" color="gray" />
                </View>
                <View>
                  <Icon name="chevron-right" size={30} color={colors.gray} />
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.order}
                onPress={() => navigation.navigate('Settings')}>
                <View>
                  <Text children="Settings" size="xl" />
                  <Text
                    children="Notification, password"
                    size="m"
                    color="gray"
                  />
                </View>

                <View>
                  <Icon name="chevron-right" size={30} color={colors.gray} />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
              <Text color="white" size="xl">
                Logout
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View
              style={{display: 'flex', flexDirection: 'row', marginBottom: 50}}>
              <View style={{marginRight: 10}}>
                <Image
                  style={styles.img}
                  source={require('../../../assets/images/myprofile.png')}
                />
              </View>
              <View style={{marginLeft: 10, justifyContent: 'center'}}>
                <Text children={fullname} size="xl" />
                <Text children={email} size="m" color="gray" />
              </View>
            </View>

            <View>
              <TouchableOpacity
                style={styles.order}
                onPress={() => navigation.navigate('ProductSeller')}>
                <View>
                  <Text children="View Product" size="xl" />
                  <Text
                    children="View all product seller"
                    size="m"
                    color="gray"
                  />
                </View>

                <View>
                  <Icon name="chevron-right" size={30} color={colors.gray} />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.order}
                onPress={() => navigation.navigate('AddProduct')}>
                <View>
                  <Text children="Adding Product" size="xl" />
                  <Text
                    children="Add product for seller"
                    size="m"
                    color="gray"
                  />
                </View>

                <View>
                  <Icon name="chevron-right" size={30} color={colors.gray} />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.order}
                onPress={() => navigation.navigate('Settings')}>
                <View>
                  <Text children="Settings" size="xl" />
                  <Text
                    children="Notification, password"
                    size="m"
                    color="gray"
                  />
                </View>

                <View>
                  <Icon name="chevron-right" size={30} color={colors.gray} />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
              <Text color="white" size="xl">
                Logout
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#E5E5E5',
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
  myprofile: {
    fontWeight: 'bold',
    // marginBottom: 50,
  },
  btnLogin: {
    width: '80%',
    backgroundColor: colors.red,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLogout: {
    width: '80%',
    backgroundColor: colors.red,
    paddingVertical: 10,
    bottom: 0,
    marginBottom: 10,
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogin: {},
  img: {
    width: 100,
    height: 100,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black',
  },
  order: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 20,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (token, user_id, level) => dispatch(logout(token, user_id, level)),
  };
};

export default connect(null, mapDispatchToProps)(ProfileScreen);
