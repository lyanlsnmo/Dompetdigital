import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';

function History() {
  return (
    <View style={{flex: 1}}>
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 25,
            padding: 20,
            textAlign: 'center',
          }}>
          History
        </Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#EFB6C8',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        <View style={{padding: 30}}>
          {[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: 'white',
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
    </View>
  );
}

export default History;
