import {useNavigation, useRoute} from '@react-navigation/native';
import {React, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import db from '../../database';

function EditIncome() {
  const navigation = useNavigation();
  const route = useRoute();

  const {catatan} = route.params;

  const [date, setDate] = useState(new Date(catatan?.date));
  const [open, setOpen] = useState(false);

  const [judul, setJudul] = useState(catatan?.judul);
  const [deskripsi, setDeskripsi] = useState(catatan?.deskripsi);
  const [nominal, setNominal] = useState(catatan?.nominal);

  const [judulFocused, setJudulFocused] = useState(false);
  const [deskripsiFocused, setDeskripsiFocused] = useState(false);
  const [nominalFocused, setNominalFocused] = useState(false);

  const handleSavePress = () => {
    if (judul.length === 0) {
      Alert.alert('Judul tidak boleh kosong');
    } else if (deskripsi.length === 0) {
      Alert.alert('Deskripsi tidak boleh kosong');
    } else if (nominal === 0 || nominal.length === 0) {
      Alert.alert('Nominal tidak boleh kosong');
    } else {
      updateIncome();
    }
  };

  const updateIncome = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE notes SET judul = ?, deskripsi = ?, nominal = ?, date = ? WHERE id = ?;',
        [judul, deskripsi, nominal, date.toISOString(), catatan?.id],
        () => {
          Alert.alert('Berhasil Memperbarui Catatan');
          navigation.goBack();
        },
        error => {
          Alert.alert('Gagal Memperbarui Catatan');
          console.error('Error updating data:', error);
        },
      );
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          height: 80,
          backgroundColor: '#fff',
          elevation: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginHorizontal: 20}}>
          <Image
            source={require('./../assets/back.png')}
            style={{height: 30, width: 30}}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Edit</Text>
      </View>

      <View
        style={{
          paddingHorizontal: 30,
          paddingVertical: 30,
          gap: 20,
        }}>
        <TextInput
          onFocus={() => setJudulFocused(true)}
          onBlur={() => setJudulFocused(false)}
          value={judul}
          onChangeText={text => setJudul(text)}
          placeholderTextColor={'gray'}
          placeholder="Judul"
          style={{
            borderWidth: judulFocused ? 2 : 0.5,
            fontSize: 18,
            paddingVertical: 0,
            height: 50,
            borderRadius: 20,
            color: 'black',
            paddingHorizontal: 10,
            borderColor: judulFocused ? '#2193b0' : 'gray',
          }}
        />
        <TextInput
          onFocus={() => setDeskripsiFocused(true)}
          onBlur={() => setDeskripsiFocused(false)}
          value={deskripsi}
          onChangeText={text => setDeskripsi(text)}
          placeholderTextColor={'gray'}
          placeholder="Deskripsi"
          style={{
            borderWidth: deskripsiFocused ? 2 : 0.5,
            fontSize: 18,
            paddingVertical: 0,
            height: 50,
            borderRadius: 20,
            color: 'black',
            paddingHorizontal: 10,
            borderColor: deskripsiFocused ? '#2193b0' : 'gray',
          }}
        />

        <TextInput
          onFocus={() => setNominalFocused(true)}
          onBlur={() => setNominalFocused(false)}
          value={nominal}
          onChangeText={text => {
            const valid = text.replace(/[^0-9.,]/g, '');

            if (valid === '0') {
              return;
            }

            const isValidFormat =
              /^[1-9][0-9]*([.,]?[0-9]*)?$|^0[.,][0-9]+$/.test(valid);

            if (isValidFormat || valid === '') {
              setNominal(valid);
            }
          }}
          placeholderTextColor={'gray'}
          placeholder="Nominal Pemasukan"
          keyboardType="numeric"
          style={{
            borderWidth: nominalFocused ? 2 : 0.5,
            fontSize: 18,
            paddingVertical: 0,
            height: 50,
            borderRadius: 20,
            color: 'black',
            paddingHorizontal: 10,
            borderColor: nominalFocused ? '#2193b0' : 'gray',
          }}
        />

        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={selectedDate => {
            setOpen(false);
            setDate(selectedDate);
          }}
          onCancel={() => setOpen(false)}
        />
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={{
            borderWidth: 0.5,
            paddingVertical: 0,
            height: 50,
            borderRadius: 20,
            paddingHorizontal: 10,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
            }}>
            {date.toDateString()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSavePress}
          style={{
            backgroundColor: '#2193b0',
            height: 50,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>
            Perbarui
          </Text>
          <Image
            source={require('./../assets/update.png')}
            style={{
              height: 25,
              width: 25,
              position: 'absolute',
              left: '33%',
              tintColor: '#fff',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default EditIncome;
