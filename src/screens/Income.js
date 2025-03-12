import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import DatePicker from 'react-native-date-picker';

function Income() {
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* HEADER */}
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
            style={{height: 35, width: 35}}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Tambah Pemasukan</Text>
      </View>
      {/* HEADER */}

      {/* FORM INCOME */}
      <View
        style={{
          paddingHorizontal: 30,
          paddingVertical: 30,
          gap: 20,
        }}>
        <TextInput
          placeholderTextColor={'gray'}
          placeholder="Judul"
          style={{
            borderWidth: 0.5,
            fontSize: 18,
            paddingVertical: 0,
            height: 50,
            borderRadius: 10,
            color: 'black',
            paddingHorizontal: 10,
          }}
        />
        <TextInput
          placeholderTextColor={'gray'}
          placeholder="Deskripsi"
          style={{
            borderWidth: 0.5,
            fontSize: 18,
            paddingVertical: 0,
            height: 50,
            borderRadius: 10,
            color: 'black',
            paddingHorizontal: 10,
          }}
        />
        <TextInput
          placeholderTextColor={'gray'}
          placeholder="Nominal Pemasukan"
          keyboardType="numeric"
          style={{
            borderWidth: 0.5,
            fontSize: 18,
            paddingVertical: 0,
            height: 50,
            borderRadius: 10,
            color: 'black',
            paddingHorizontal: 10,
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
            borderRadius: 10,
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
          style={{
            backgroundColor: '#EFB6C8',
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Income;
