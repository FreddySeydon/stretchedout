import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import { type QueryResult, Exercise, Programs, OneProgramInfo } from '~/types';


export async function openDatabaseFirst(): Promise<SQLite.SQLiteDatabase> {
  const pathToDatabaseFile = '../assets/collection.db';
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require(pathToDatabaseFile)).uri,
    FileSystem.documentDirectory + 'SQLite/collection.db'
  );
  return SQLite.openDatabaseSync('collection.db');
}

export async function queryDatabase(query: string) {
  const db = SQLite.openDatabaseSync('collection.db');
  let result = null;
  const readOnly = true;
  await db.withTransactionAsync(async () => {
    result = await db.execAsync(query);
  });
  return result;
}

export async function getOneExercise(id: string | string[]) {
  const result = await queryDatabase(`SELECT * FROM exercises WHERE id=${id}`);
  return result;
}

export async function getMultipleExercises(ids: Array<string>) {
  const idList = ids.join(', ');
  const queryResult: QueryResult<Exercise> = await queryDatabase(`SELECT * FROM exercises WHERE id IN (${idList})`);
  const result = queryResult!.rows;
  return result;
}



export async function getAllPrograms() {
  const queryResult: QueryResult<Programs> = await queryDatabase(`SELECT 
  programs.id, 
  programs.name, 
  programs.description,
programs.img,
  COALESCE((
      SELECT SUM(exercises.duration) 
      FROM programs_exercises
      JOIN exercises ON programs_exercises.exercise_id = exercises.id
      WHERE programs_exercises.program_id = programs.id
  ), 0) AS duration
FROM 
  programs;
`);
const result = queryResult!.rows;
return result
}

export async function getOneProgramInfo(id: string | string[]) {
  const queryResult: QueryResult<OneProgramInfo> = await queryDatabase(`SELECT * FROM programs WHERE id = ${id};`);
const result = queryResult!.rows;
return result
}

export async function getOneProgramExercises(id: string | string[]) {
  const queryResult: QueryResult<Exercise> = await queryDatabase(`SELECT exercises.* FROM exercises
  INNER JOIN programs_exercises ON exercises.id = programs_exercises.exercise_id
  WHERE programs_exercises.program_id = ${id};
  `);
  const result = queryResult!.rows;
  return result;
}

export async function getOneProgram(id: string | string[]) {
  const queryResult: QueryResult<Programs> = await queryDatabase(`SELECT 
  programs.id, 
  programs.name, 
  programs.description,
  programs.img,
  COALESCE((
      SELECT SUM(exercises.duration) 
      FROM programs_exercises
      JOIN exercises ON programs_exercises.exercise_id = exercises.id
      WHERE programs_exercises.program_id = programs.id
  ), 0) AS duration
FROM 
  programs
WHERE 
  programs.id = ${id};`);
  const result = queryResult!.rows;
  return result;
}
