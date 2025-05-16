import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import db from '../../database';

function History() {
  const navigation = useNavigation();
  const [dataCatatan, setDatacatatan] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const getCatatan = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM notes ORDER BY id DESC`,
        [],
        (_, results) => {
          const rows = results.rows.raw();
          setDatacatatan(rows);
          console.log(rows);
        },
        error => {
          console.error('Error fetching data:', error);
        },
      );
    });
  };

  useFocusEffect(
    useCallback(() => {
      getCatatan();

      return () => {};
    }, []),
  );

  const timeAgo = date => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);

    const intervals = [
      {label: 'tahun', seconds: 31536000},
      {label: 'bulan', seconds: 2592000},
      {label: 'minggu', seconds: 604800},
      {label: 'hari', seconds: 86400},
      {label: 'jam', seconds: 3600},
      {label: 'menit', seconds: 60},
      {label: 'detik', seconds: 1},
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? '' : ''} yang lalu`;
      }
    }

    return 'Baru saja';
  };

  function formatDateString(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'long'});
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedTime =
      hours.toString().padStart(2, '0') +
      '.' +
      minutes.toString().padStart(2, '0') +
      ' ' +
      ampm;

    return `${day} ${month} ${year}, ${formattedTime}`;
  }

  const openModal = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  function formatToIDR(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  }

  const isEditable = dateString => {
    const created = new Date(dateString);
    const now = new Date();
    const diffInMs = now - created;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays < 1;
  };

  const deleteNote = async id => {
    await db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM notes WHERE id = ?;',
        [id],
        () => {
          Alert.alert('Berhasil Menghapus Catatan');
        },
        error => {
          Alert.alert('Gagal Menghapus Catatan');
          console.error('Error updating data:', error);
        },
      );
    });
  };

  const filteredData = dataCatatan.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'income') return item.type === 'income';
    if (activeFilter === 'expense') return item.type === 'outcome';
  });

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'white',
          height: 65,
          zIndex: 100,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 25,
            textAlign: 'center',
            color: '#155E95',
          }}>
          History
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          onPress={() => setActiveFilter('all')}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 20,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: activeFilter === 'all' ? '#1E3A2E' : '#555',
            backgroundColor: activeFilter === 'all' ? '#155E98' : 'transparent',
            marginRight: 8,
          }}>
          <Text
            style={{
              color: activeFilter === 'all' ? 'white' : 'black',
              fontSize: 16,
              fontWeight: '500',
            }}>
            Semua
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveFilter('income')}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 20,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: activeFilter === 'income' ? '#1E3A2E' : 'gray',
            backgroundColor:
              activeFilter === 'income' ? '#155E98' : 'transparent',
            marginRight: 8,
          }}>
          <Text
            style={{
              color: activeFilter === 'income' ? 'white' : 'black',
              fontSize: 16,
              fontWeight: '500',
            }}>
            Pemasukan
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveFilter('expense')}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 20,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: activeFilter === 'expense' ? '#1E3A2E' : '#555',
            backgroundColor:
              activeFilter === 'expense' ? '#155E98' : 'transparent',
            marginRight: 8,
          }}>
          <Text
            style={{
              color: activeFilter === 'expense' ? 'white' : 'black',
              fontSize: 16,
              fontWeight: '500',
            }}>
            Pengeluaran
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View style={{padding: 30}}>
          {filteredData.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => openModal(item)}
                key={index}
                style={{
                  backgroundColor: '#FDFAF6',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderRadius: 20,
                  padding: 20,
                  marginBottom: 10,
                  borderWidth: 1,
                  borderColor: '#ddd',
                }}>
                <View style={{gap: 3}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {item.judul}
                  </Text>
                  <Text>
                    {item.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                  </Text>
                  <Text>{timeAgo(item.date)}</Text>
                </View>
                <Text style={{color: item.type === 'income' ? 'green' : 'red'}}>
                  {item.type === 'income' ? '+' : '-'}
                  {formatToIDR(item.nominal)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 20,
              width: '90%',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
              Detail Catatan
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              {selectedItem?.judul}
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              {' '}
              {selectedItem?.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
            </Text>

            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: selectedItem?.type === 'income' ? 'green' : 'red',
              }}>
              {selectedItem?.type === 'income' ? '+' : '-'}
              {formatToIDR(selectedItem?.nominal)}
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              {formatDateString(selectedItem?.date)}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity
                onPress={() => {
                  if (isEditable(selectedItem?.created_at)) {
                    navigation.navigate('EditIncome', {catatan: selectedItem});
                    closeModal();
                  } else {
                    Alert.alert(
                      'Tidak Bisa Diedit',
                      'Catatan ini sudah lebih dari 1 hari.',
                    );
                  }
                }}
                style={{
                  backgroundColor: 'rgba(98, 241, 15, 0.3)',
                  padding: 10,
                  borderRadius: 5,
                  marginHorizontal: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/edit.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: 'green',
                    marginRight: 8,
                  }}
                />
                <Text style={{color: 'green'}}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  await deleteNote(selectedItem?.id);
                  closeModal();
                  getCatatan();
                }}
                style={{
                  backgroundColor: 'rgba(200, 50, 50, 0.3)',
                  padding: 10,
                  borderRadius: 5,
                  marginHorizontal: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/hapus.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: 'red',
                    marginRight: 8,
                  }}
                />
                <Text style={{color: 'red'}}>Hapus</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={closeModal}
                style={{
                  backgroundColor: 'rgba(80, 74, 74, 0.3)',
                  padding: 10,
                  borderRadius: 5,
                  marginHorizontal: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/close.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: 'black',
                    marginRight: 8,
                  }}
                />
                <Text style={{color: 'black'}}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default History;
