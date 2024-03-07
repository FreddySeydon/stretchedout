import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';

export async function openDatabaseFirst(): Promise<SQLite.SQLiteDatabase> {
  const pathToDatabaseFile = '../assets/collection.db';
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
  let result = null
  const readOnly = true;
  await db.transactionAsync(async (tx) => {
    result = await tx.executeSqlAsync(query, []);
  }, readOnly);
  return result
}

export async function getOneExercise(id: string | string[]) {
  const result = queryDatabase(`SELECT * FROM exercises WHERE id=${id}`);
  return result;
}

export async function getMultipleExercises(ids: Array<number>) {
  const idList  = ids.join(', ')
  // console.log("Ids to fetch:", idList)
    const queryResult = await queryDatabase(`SELECT * FROM exercises WHERE id IN (${idList})`);
    const result = queryResult.rows;
    return result
}