import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

function Home() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#EFB6C8'}}>
      {/* SALDO */}
      <View
        style={{
          padding: 10,
          marginTop: 50,
          marginLeft: 30,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 26,
            fontWeight: 'bold',
          }}>
          Saldo
        </Text>
        <Text style={{color: 'black', fontSize: 17}}>Rp.20.0000</Text>
      </View>
      {/* SALDO */}

      {/* TRANSAKSI */}
      <View
        style={{
          padding: 15,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 50,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Income')}
          style={{
            height: 70,
            width: '40%',
            backgroundColor: 'white',
            elevation: 5,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <Image
            source={require('./../assets/income.png')}
            style={{height: 50, width: 50}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Outcome')}
          style={{
            height: 70,
            width: '40%',
            backgroundColor: 'white',
            elevation: 5,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <Image
            source={require('./../assets/outcome.png')}
            style={{height: 50, width: 50}}
          />
        </TouchableOpacity>
      </View>

      {/* TRANSAKSI */}

      <View
        style={{
          paddingHorizontal: 5,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginRight: 70,
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: 70,
            width: '40%',
          }}>
          <Image
            source={require('./../assets/Masuk.png')}
            style={{height: 35, width: 35, tintColor: '#3A7D44'}}
          />
          <View style={{marginLeft: 5}}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Pemasukkan
            </Text>
            <Text style={{color: 'black', fontSize: 15}}>Rp.0</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            height: 70,
            width: '40%',
          }}>
          <Image
            source={require('./../assets/Keluar.png')}
            style={{height: 35, width: 35, tintColor: '#A31D1D'}}
          />
          <View style={{marginLeft: 5}}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Pengeluaran
            </Text>
            <Text style={{color: 'black', fontSize: 15}}>Rp.0</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        <View style={{padding: 30}}>
          {[1, 2, 2, 2].map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: '#EFB6C8',
                  elevation: 5,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderRadius: 20,
                  padding: 20,
                  marginBottom: 10,
                }}>
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    Belanja
                  </Text>
                  <Text>Pemasukkan</Text>
                </View>
                <Text>+Rp.1000</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* </SafeAreaView>
          </SafeAreaProvider> */}
    </View>
  );
}

export default Home;
