// // import React, { useState, useEffect, useRef } from 'react';
// // import { Container, Header, Body, Left, Content, View, Text, Button } from 'native-base'
// // import { TextInput, ToastAndroid, ScrollView, Image, FlatList, SafeAreaView, KeyboardAvoidingView, Animated } from 'react-native'
// // import { setLoginfalse } from './../../utils/redux/ActionCreators/auth'
// // import { useSelector, connect } from 'react-redux'
// // import axios from 'axios'
// // import { BASE_URL } from "@env"
// // import { useSocket } from './../../utils/context/SocketProvider'
// // import { vw, vh } from 'react-native-expo-viewport-units';

// // let number = 0

// // const ChatRoom = ({ navigation, route, setLoginfalse }) => {
// //     const keyboardHeight = new Animated.Value(0)

// //     useEffect(() => {
// //         getName()
// //         getNewMessage()
// //         console.log('did mount')
// //     }, [])

// //     const socket = useSocket();

// //     useEffect(() => {
// //         socket.on('refresh', (someEvent) => {
// //             console.log('refresh ke ' + number)
// //             getNewMessage()
// //         })
// //         return () => socket.off('refresh');
// //     }, [number])

// //     const auth = useSelector((state) => state.auth)
// //     const room_id = route.params.room_id
// //     const splitRoom = room_id.split("S")[1].split("B")
// //     const [chat, setChat] = useState([])
// //     const [message, setMessage] = useState('')
// //     const [name, setName] = useState('')
// //     const seller = splitRoom[0]
// //     const buyer = splitRoom[1]
// //     const sender = auth.id

// //     const config = {
// //         headers: {
// //             'x-access-token': 'Bearer ' + auth.token,
// //         },
// //     };

// //     const getName = () => {
// //         if (sender != buyer) {
// //             axios.get(BASE_URL + '/user/name/' + buyer)
// //                 .then(({ data }) => {
// //                     setName(data.data.fullname)
// //                 }).catch(({ response }) => {
// //                     console.log(response)
// //                 })
// //         } else {
// //             axios.get(BASE_URL + '/user/name/' + seller)
// //                 .then(({ data }) => {
// //                     setName(data.data.fullname)
// //                 }).catch(({ response }) => {
// //                     console.log(response)
// //                 })
// //         }
// //     }

// //     const sendMessage = () => {
// //         if (message != '') {
// //             const Msg = {
// //                 seller: seller,
// //                 buyer: buyer,
// //                 chatRoom: room_id,
// //                 sender: sender,
// //                 message: message
// //             }
// //             console.log(Msg)
// //             axios.post(BASE_URL + '/chat/addMessage', Msg, config)
// //                 .then(({ data }) => {
// //                     ToastAndroid.show('Message Sent', ToastAndroid.SHORT, ToastAndroid.CENTER);
// //                     setMessage('')
// //                     console.log('sent')
// //                     number = number + 1
// //                 }).catch(({ response }) => {
// //                     console.log(response.status)
// //                     if (response.status == 401) {
// //                         ToastAndroid.show('SESI ANDA TELAH HABIS', ToastAndroid.SHORT, ToastAndroid.CENTER);
// //                         if (setLoginfalse()) {
// //                             navigation.replace('Profile')
// //                         }
// //                     }
// //                 })
// //         } else {
// //             ToastAndroid.show('Message cannot be empty', ToastAndroid.SHORT, ToastAndroid.CENTER);
// //         }
// //     }

// //     const getNewMessage = () => {
// //         axios.get(BASE_URL + '/chat/newMessage/' + room_id)
// //             .then(({ data }) => {
// //                 setChat(data.data)
// //             }).catch(({ response }) => {
// //                 console.log(response.data)
// //             })
// //     }

// //     return (
// //         <>
// //             <Container>
// //                 <Header transparent>
// //                     <Left>
// //                         <Button transparent
// //                             onPress={() => { navigation.goBack() }}
// //                         >
// //                             <Image source={require('./../../assets/back.png')} />
// //                         </Button>
// //                     </Left>
// //                     <Body>
// //                         <Text style={{ fontWeight: 'bold' }}>{name}</Text>
// //                     </Body>
// //                 </Header>
// //                 <View
// //                     style={{ flex: 1, backgroundColor: '#c4c4c4' }}
// //                 >
// //                     <FlatList
// //                         data={chat}
// //                         inverted
// //                         keyExtractor={item => item.id.toString()}
// //                         renderItem={({ item }) => (
// //                             item.sender_id == auth.id ? (
// //                                 <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
// //                                     <View></View>
// //                                     <View style={{ borderColor: 'red', backgroundColor: 'white', borderWidth: 1, minWidth: vw(25), maxWidth: vw(60), borderRadius: 5, marginHorizontal: vw(1) }}>
// //                                         <View style={{ paddingHorizontal: vw(3), paddingVertical: vw(2) }}>
// //                                             <Text style={{ textAlign: 'right', fontWeight: 'bold', color: 'red' }}>You</Text>
// //                                             <Text >{item.message}</Text>
// //                                             <Text style={{ fontSize: 10, marginTop: 8, color: 'gray', textAlign: 'right' }}>{item.created_at.toString().split('T')[0]} | {item.created_at.toString().split('T')[1].substr(0, 5)}</Text>
// //                                         </View>
// //                                     </View>
// //                                 </View>
// //                             ) : (
// //                                     <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
// //                                         <View style={{ borderColor: 'red', backgroundColor: 'white', borderWidth: 1, minWidth: vw(30), maxWidth: vw(60), borderRadius: 5, marginHorizontal: vw(1) }}>
// //                                             <View style={{ paddingHorizontal: vw(3), paddingVertical: vw(2) }}>
// //                                                 <Text style={{ textAlign: 'left', fontWeight: 'bold', color: 'red' }}>{item.sender_name}</Text>
// //                                                 <Text>{item.message}</Text>
// //                                                 <Text style={{ fontSize: 10, marginTop: 8, textAlign: 'right' }}>{item.created_at.toString().split('T')[0]} | {item.created_at.toString().split('T')[1].substr(0, 5)}</Text>
// //                                             </View>
// //                                         </View>
// //                                         <View></View>
// //                                     </View>
// //                                 )
// //                         )}
// //                     />
// //                 </View>
// //                 <View style={{ flexDirection: 'row' }}>
// //                     <TextInput
// //                         multiline={true}
// //                         style={{
// //                             marginTop: 3,
// //                             borderColor: 'gray',
// //                             borderWidth: 2,
// //                             backgroundColor: '#fff',
// //                             marginBottom: 8,
// //                             borderRadius: 15,
// //                             paddingHorizontal: vw(3),
// //                             height: vh(7),
// //                             width: vw(75),
// //                             marginLeft: vw(2),
// //                             marginRight: vw(2),
// //                             textAlignVertical: 'top',
// //                         }}
// //                         placeholder="Type a message"
// //                         value={message}
// //                         onChangeText={(text) => {
// //                             setMessage(text)
// //                         }}
// //                     />
// //                     <Button danger rounded style={{ width: vh(10), height: vh(7), marginTop: 3 }} onPress={sendMessage} >
// //                         <Text>SEND</Text>
// //                     </Button>
// //                 </View>
// //             </Container>
// //         </>
// //     )
// // }

// // const mapDispatchToProps = (dispatch) => {
// //     return {
// //         setLoginfalse: () =>
// //             dispatch(setLoginfalse()),
// //     };
// // };
// // export default connect(null, mapDispatchToProps)(ChatRoom);

// import 'react-native-gesture-handler';
// import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import Splash from './screens/splash/index'
// import Icon from 'react-native-vector-icons/FontAwesome';

// import Home from './screens/home/index';

// import Profile from './screens/profile/index';

// import { SocketProvider } from './utils/context/SocketProvider';

// import Login from './screens/auth/login';
// import Signup from './screens/auth/register';
// import Activate from './screens/auth/activate';
// import Forgot from './screens/auth/forgotPassword';
// import Otp from './screens/auth/otp';
// import Reset from './screens/auth/resetPassword'

// import Shop from './screens/shop/index';
// import Search from './screens/shop/search'
// import Categories from './screens/shop/categories'
// import DetailPage from './screens/shop/detailProduct'
// import Review from './screens/shop/productReview'

// import Bag from './screens/myBag/index';
// import Checkout from './screens/myBag/checkoutPayment'
// import Success from './screens/myBag/success'

// import Order from './screens/profile/myOrder'
// import DetailOrders from './screens/profile/orderDetails'
// import Shipping from './screens/profile/shippingAddress'
// import AddAddress from './screens/profile/addShipingAddress'
// import ChangeAddress from './screens/profile/changeAddress'
// import DetailsAddress from './screens/profile/detailAddress'
// import Setting from './screens/profile/setting'

// import Notification from './screens/home/notifications'

// import UserStore from './screens/profile/seller'
// import ListProduct from './screens/profile/seller/ListProduct'
// import AddProduct from './screens/profile/seller/addProduct'
// import EditProduct from './screens/profile/seller/editProduct'
// import OrderedItem from './screens/profile/seller/ordererItem'

// import ListChat from './screens/profile/ListChat'
// import ChatRoom from './screens/profile/chatRoom'

// import NewProducts from './screens/home/new'
// import PopularProducts from './screens/home/popular'

// import Splash from './screens/splash'

// import { useSocket } from './utils/context/SocketProvider'
// import { showNotification } from './notif'

// import { useSelector } from 'react-redux'

// import Chat from './screens/profile/chat'

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const channel = 'notif'

// const MyTabs = ({ auth }) => {
//   const level = useSelector((state) => (state.auth.level))

//   return (
//     <Tab.Navigator
//       headerMode="none"
//       sceneContainerStyle={{ borderWidth: 0 }}
//       barStyle={{ borderTopLeftRadius: 20 }}
//       tabBarOptions={{
//         activeTintColor: '#DB3022',
//         style: {
//           borderTopLeftRadius: 20,
//           borderTopRightRadius: 20,
//         },
//       }}>
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: ({ color }) => {
//             return <Icon name="home" size={25} color={color} />;
//           },
//         }}
//       />
//       <Tab.Screen
//         name="Shop"
//         component={ShopPage}
//         options={{
//           tabBarIcon: ({ color }) => {
//             return <Icon name="shopping-cart" size={25} color={color} />;
//           },
//         }}
//       />
//       {level == 1 &&
//         <Tab.Screen
//           name="MyBag"
//           component={myBag}
//           options={{
//             tabBarIcon: ({ color }) => {
//               return <Icon name="shopping-bag" size={25} color={color} />;
//             },
//           }}
//         />
//       }
//       {/* {level == 1 && <Tab.Screen
//         name="Favorite"
//         component={Login}
//         options={{
//           tabBarIcon: ({ color }) => {
//             return <Icon name="heart" size={25} color={color} />;
//           },
//         }}
//       />} */}
//       <Tab.Screen
//         name="Profile"
//         component={MainProfile}
//         options={{
//           tabBarIcon: ({ color }) => {
//             return <Icon name="user-circle-o" size={25} color={color} />;
//           },
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// const myBag = () => {
//   return (
//     <Stack.Navigator headerMode="none">
//       <Stack.Screen name="Bag" component={Bag} />
//       <Stack.Screen name="Checkout" component={Checkout} />
//       <Stack.Screen name="Shipping" component={Shipping} />
//       <Stack.Screen name="DetailsAddress" component={DetailsAddress} />
//       <Stack.Screen name="ChangeAddress" component={ChangeAddress} />
//       <Stack.Screen name="AddAddress" component={AddAddress} />
//     </Stack.Navigator>
//   )
// };

// const ShopPage = () => {
//   return (
//     <Stack.Navigator headerMode="none">
//       <Stack.Screen name="Shop" component={Shop} />
//       <Stack.Screen name="Categories" component={Categories} />
//       <Stack.Screen name="Search" component={Search} />
//     </Stack.Navigator>
//   );
// };

// const MainProfile = () => {
//   return (
//     <Stack.Navigator initialRouteName="MainProfile" headerMode="none">
//       <>
//         <Stack.Screen name="Profile" component={Profile} />
//         <Stack.Screen name="Orders" component={Order} />
//         <Stack.Screen name="DetailsOrders" component={DetailOrders} />
//         <Stack.Screen name="Shipping" component={Shipping} />
//         <Stack.Screen name="ChangeAddress" component={ChangeAddress} />
//         <Stack.Screen name="AddAddress" component={AddAddress} />
//         <Stack.Screen name="DetailsAddress" component={DetailsAddress} />
//         <Stack.Screen name="Setting" component={Setting} />
//         <Stack.Screen name="Store" component={UserStore} />
//         <Stack.Screen name="ListProduct" component={ListProduct} />
//         <Stack.Screen name="AddProduct" component={AddProduct} />
//         <Stack.Screen name="EditProduct" component={EditProduct} />
//         <Stack.Screen name="ListChat" component={ListChat} />
//         <Stack.Screen name="ChatRoom" component={ChatRoom} />
//         <Stack.Screen name="OrderedItem" component={OrderedItem} />
//       </>
//     </Stack.Navigator>
//   );
// };

// const appRouter = () => {
//   const user_id = useSelector((state) => state.auth.id);
//   return (
//     <>
//       <SocketProvider id={user_id}>
//         <Stack.Navigator headerMode="none">
//           <Stack.Screen name="Splash" component={Splash} />
//           <Stack.Screen name="Tab" component={MyTabs} />
//           <Stack.Screen name="Notification" component={Notification} />
//           <Stack.Screen name="Details" component={DetailPage} />
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen name="Register" component={Signup} />
//           <Stack.Screen name="Activate" component={Activate} />
//           <Stack.Screen name="ForgotPassword" component={Forgot} />
//           <Stack.Screen name="Otp" component={Otp} />
//           <Stack.Screen name="ResetPassword" component={Reset} />
//           <Stack.Screen name="Review" component={Review} />
//           <Stack.Screen name="Chat" component={Chat} />
//           <Stack.Screen name="Search" component={Search} />
//           <Stack.Screen name="New" component={NewProducts} />
//           <Stack.Screen name="Popular" component={PopularProducts} />
//           <Stack.Screen name="Success" component={Success} />
//         </Stack.Navigator>
//       </SocketProvider>

//     </>
//   );
// };

// export default appRouter