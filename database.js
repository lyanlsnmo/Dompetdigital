import SQLite from 'react-native-sqlite-storage';

// open a database
const db = SQLite.openDatabase(
  {
    name: 'Catatan.db',
    location: 'default',
  },
  () => {
    console.log('succes');
  },
  error => {
    console.error('Error opening database:', error);
  },
);

// buat tabel pemasukan
const createIncomeTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS pemasukan (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  judul TEXT,
                  deskripsi TEXT,
                  nominal TEXT,
                  date TEXT
              );`,
      [],
      () => {},
      error => {
        console.error('Error creating tables:', error);
      },
    );
  });
};

// buat tabel pengeluaran
const createOutcomeTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS pengeluaran (id INTEGER PRIMARY KEY AUTOINCREMENT,
                    judul TEXT,
                    deskripsi TEXT,
                    nominal TEXT,
                    date TEXT
                );`,
      [],
      () => {},
      error => {
        console.error('Error creating tables:', error);
      },
    );
  });
};

createIncomeTables();
createOutcomeTables();

export default db;
