import {View, Text, Image} from 'react-native';

function Account() {
  return (
    <View
      style={{
        backgroundColor: '#EFB6C8',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: '40%',
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 25,
          padding: 20,
          textAlign: 'center',
        }}>
        Profile
      </Text>
      <Image
        source={require('./../assets/Akun.png')}
        style={{
          height: '43%',
          width: '35%',
        }}></Image>
    </View>
  );
}

export default Account;
