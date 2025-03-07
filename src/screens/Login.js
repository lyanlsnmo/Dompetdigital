import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

function Login() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ImageBackground style={{flex: 1}} source={require('./../assets/bg.jpg')}>
        {/* HEADER */}
        <View style={{paddingHorizontal: 30, marginTop: 100}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>Welcome Back</Text>
          <Text style={{fontSize: 16}}>Enter your Username & Password</Text>
        </View>
        {/* HEADER */}

        {/* FORM LOGIN */}
        <View
          style={{
            paddingHorizontal: 30,
            paddingVertical: 30,
            gap: 20,
          }}>
          {/* USERNAME */}

          <TextInput
            placeholderTextColor={'gray'}
            placeholder="Username"
            style={{
              borderBottomWidth: 1,
              fontSize: 18,
              paddingVertical: 0,
              height: 50,
            }}
          />

          {/* USERNAME */}

          {/* PASSWORD  */}
          <TextInput
            placeholderTextColor={'gray'}
            placeholder="Password"
            style={{
              borderBottomWidth: 1,
              fontSize: 18,
              paddingVertical: 0,
              height: 50,
            }}
          />
          {/* PASSWORD */}

          {/* TOMBOL LOGIN  */}
          <TouchableOpacity
            onPress={() => {
              navigation.replace('MyTabs');
            }}
            style={{
              backgroundColor: '#B5828C',
              height: 45,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 17}}>
              LOGIN
            </Text>
          </TouchableOpacity>
          {/* TOMBOL LOGIN  */}
        </View>

        {/* FORM LOGIN */}
      </ImageBackground>
    </View>
  );
}

export default Login;
