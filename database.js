import SQLite from 'react-native-sqlite-storage';

// buka database
const db = SQLite.openDatabase(
  {
    name: 'Catatan.db', // nama file databasenya
    location: 'default',
  },
  () => {
    console.log('succes');
  },
  error => {
    console.error('Error opening database:', error);
  },
);

// buat tabel catatan pengeluaran/pemasukan
const createNoteTables = () => {
  //fungsi untuk membuat tabel
  db.transaction(tx => {
    //perintah eksekusi querySql
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  judul TEXT,
                  deskripsi TEXT,
                  nominal TEXT,
                  type TEXT,
                  date TEXT,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
              );`,
      [],
      () => {
        console.log('succes');
      },
      error => {
        console.error('Error creating tables:', error);
      },
    );
  });
};

createNoteTables(); //pemanggilan fungsi

export default db;
