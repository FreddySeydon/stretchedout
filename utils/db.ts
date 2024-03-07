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
  let result = null;
  const readOnly = true;
  await db.transactionAsync(async (tx) => {
    result = await tx.executeSqlAsync(query, []);
  }, readOnly);
  return result;
}

export async function getOneExercise(id: string | string[]) {
  const result = await queryDatabase(`SELECT * FROM exercises WHERE id=${id}`);
  return result;
}

export async function getMultipleExercises(ids: Array<number>) {
  const idList = ids.join(', ');
  const queryResult = await queryDatabase(`SELECT * FROM exercises WHERE id IN (${idList})`);
  const result = queryResult.rows;
  return result;
}

export async function getAllPrograms() {
  const queryResult = await queryDatabase(`SELECT 
  programs.id, 
  programs.name, 
  programs.description,
programs.img,
  COALESCE((
      SELECT SUM(exercises.duration) 
      FROM programs_exercises
      JOIN exercises ON programs_exercises.exercise_id = exercises.id
      WHERE programs_exercises.program_id = programs.id
  ), 0) AS program_duration
FROM 
  programs;
`);
const result = queryResult.rows;
return result
}

export async function getOneProgramInfo(id: string | string[]) {
  const queryResult = await queryDatabase(`SELECT * FROM programs WHERE id = ${id};`);
const result = queryResult.rows;
return result
}

export async function getOneProgramExercises(id: string | string[]) {
  const queryResult = await queryDatabase(`SELECT exercises.* FROM exercises
  INNER JOIN programs_exercises ON exercises.id = programs_exercises.exercise_id
  WHERE programs_exercises.program_id = ${id};
  `);
  const result = queryResult.rows;
  return result;
}

export async function getOneProgramDuration(id: string | string[]) {
  const queryResult = await queryDatabase(`SELECT SUM(exercises.duration) as program_duration FROM exercises
  INNER JOIN programs_exercises ON exercises.id = programs_exercises.exercise_id
  WHERE programs_exercises.program_id = ${id};
  `);
  const result = queryResult.rows;
  console.log("Duration: ", result)
  return result;
}
