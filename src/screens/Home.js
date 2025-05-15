import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import db from '../../database';

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

  const [dataCatatan, setDatacatatan] = useState([]);
  const [dataPemasukan, setDataPemasukan] = useState(0);
  const [dataPengeluaran, setDataPengeluaran] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const getCatatan = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM notes ORDER BY id DESC LIMIT 6`,
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

  const refreshData = () => {
    getCatatan();
    getNominalPemasukan();
    getNominalPengeluaran();
  };

  const getNominalPemasukan = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT SUM(CAST(nominal AS INTEGER)) AS total_pemasukan FROM notes WHERE type = 'income'`,
        [],
        (_, results) => {
          const rows = results.rows.raw();
          setDataPemasukan(rows[0].total_pemasukan);
          console.log('pemasukan', rows[0].total_pemasukan);
        },
        error => {
          console.error('Error fetching data:', error);
        },
      );
    });
  };

  const getNominalPengeluaran = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT SUM(CAST(nominal AS INTEGER)) AS total_pengeluaran FROM notes WHERE type = 'outcome'`,
        [],
        (_, results) => {
          const rows = results.rows.raw();
          setDataPengeluaran(rows[0].total_pengeluaran);
          console.log('pengeluaran', rows[0].total_pengeluaran);
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
      getNominalPemasukan();
      getNominalPengeluaran();

      return () => {};
    }, []),
  );

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     getCatatan();
  //     getNominalPemasukan();
  //     getNominalPengeluaran();
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

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

  const isEditable = dateString => {
    const created = new Date(dateString);
    const now = new Date();
    const diffInMs = now - created;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays < 1;
  };

  return (
    <LinearGradient
      colors={['#2193b0', '#6dd5ed']}
      start={{x: 1, y: 1}}
      end={{x: 0, y: 1}}
      style={{flex: 1}}>
      {/* SALDO */}
      <View
        style={{
          padding: 30,
          marginTop: 40,
          marginLeft: 20,
          marginRight: 20,
          backgroundColor: 'rgba(46, 45, 45, 0.1)',
          borderRadius: 17,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 29,
            fontWeight: 'bold',
          }}>
          Saldo
        </Text>
        <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
          {formatToIDR(dataPemasukan - dataPengeluaran)}
        </Text>
      </View>

      {/* SALDO */}

      {/* TRANSAKSI */}
      <View
        style={{
          padding: 15,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 30,
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
              Pemasukan
            </Text>
            <Text style={{color: 'green', fontSize: 16, fontWeight: 'bold'}}>
              {formatToIDR(dataPemasukan)}
            </Text>
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
            <Text style={{color: 'red', fontSize: 15, fontWeight: 'bold'}}>
              {formatToIDR(dataPengeluaran)}
            </Text>
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
          {dataCatatan.map((item, index) => {
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
                  borderBottomWidth: 1,
                  borderBottomColor: '#d3d3d3',
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

                <Text
                  style={{
                    color: item.type === 'income' ? 'green' : 'red',
                  }}>
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
              {' '}
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
                  borderRadius: 10,
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
                  refreshData();
                }}
                style={{
                  backgroundColor: 'rgba(200, 50, 50, 0.3)',
                  padding: 10,
                  borderRadius: 10,
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
                  borderRadius: 10,
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
    </LinearGradient>
  );
}

export default Home;
