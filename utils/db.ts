import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import { type QueryResult, Exercise, ProgramInfo } from '~/types';
import { logWithoutImage } from './utils';


export async function openDatabaseFirst(): Promise<SQLite.SQLiteDatabase> {
  const pathToDatabaseFile = '../assets/collection.db';
  const dbDirectory = `${FileSystem.documentDirectory}SQLite`;
  const dbFile = `${dbDirectory}/collection.db`;

  if (!(await FileSystem.getInfoAsync(dbDirectory)).exists) {
    await FileSystem.makeDirectoryAsync(dbDirectory);
  }

  if (!(await FileSystem.getInfoAsync(dbFile)).exists) {
    await FileSystem.downloadAsync(
      Asset.fromModule(require(pathToDatabaseFile)).uri,
      dbFile
    );
  }

  return await SQLite.openDatabaseAsync('collection.db');
}

export async function openDatabase() {
  const db = await SQLite.openDatabaseAsync('collection.db');
  return db
}

export async function queryDatabase(query: string) {
  const db = await openDatabase();
  const result = await db.getAllAsync(query);
  return result;
}

export async function getOneExercise(id: string | string[]) {
  const db = await openDatabase()
  const result: Exercise | null  = await db.getFirstAsync(`SELECT * FROM exercises WHERE id=${id}`);
  return result;
}

export async function getMultipleExercises(ids: Array<string>) {
  const idList = ids.join(', ');
  const db = await openDatabase()
  const exercises: Exercise[] = await db.getAllAsync(`SELECT * FROM exercises WHERE id IN (${idList})`);
  return exercises;
}

export async function getAllPrograms() {
  const db = await openDatabase()
  const programs: ProgramInfo[] = await db.getAllAsync(`SELECT 
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
return programs
}

export async function getOneProgramInfo(id: string | string[]) {
  const db = await openDatabase()
  const programInfo: ProgramInfo | null = await db.getFirstAsync(`SELECT * FROM programs WHERE id = ${id};`);
return programInfo
}

export async function getOneProgramExercises(id: string | string[]) {
  const db = await openDatabase()
  const exercises: Exercise[] = await db.getAllAsync(`SELECT exercises.* FROM exercises
  INNER JOIN programs_exercises ON exercises.id = programs_exercises.exercise_id
  WHERE programs_exercises.program_id = ${id};
  `);
  return exercises;
}

export async function getOneProgram(id: string | string[]) {
  const db = await openDatabase()
  const program: ProgramInfo | null = await db.getFirstAsync(`SELECT 
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
  return program;
}
