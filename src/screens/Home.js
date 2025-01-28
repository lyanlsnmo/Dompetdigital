import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

function Home() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#98D8EF'}}>
      {/* SALDO */}
      <View style={{padding: 20}}>
        <Text style={{color: 'white', fontSize: 26, fontWeight: 'bold'}}>
          Rp.6000000
        </Text>
      </View>
      {/* SALDO */}
      {/* TRANSAKSI */}
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            height: 50,
            width: '48%',
            backgroundColor: 'white',
            elevation: 5,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Pemasukan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 50,
            width: '48%',
            backgroundColor: 'white',
            elevation: 5,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Pengeluaran</Text>
        </TouchableOpacity>
      </View>
      {/* TRANSAKSI */}
    </View>
  );
}

export default Home;
