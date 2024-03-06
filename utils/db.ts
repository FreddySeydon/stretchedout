import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

export async function openDatabaseFirst(): Promise<SQLite.SQLiteDatabase> {
    const pathToDatabaseFile = "../assets/collection.db"
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require(pathToDatabaseFile)).uri,
    FileSystem.documentDirectory + 'SQLite/collection.db'
  );
  return SQLite.openDatabase('collection.db');
}

export async function queryDatabase(query: string) {
    const db = SQLite.openDatabase('collection.db');

const readOnly = true;
await db.transactionAsync(async tx => {
  const result = await tx.executeSqlAsync(query, []);
  console.log(result);
}, readOnly);
}