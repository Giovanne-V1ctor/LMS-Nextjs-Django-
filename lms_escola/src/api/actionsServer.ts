"use server";

import { Pool } from "pg";

const pool = new Pool({
  user: "postgres", // Adicione seu usuário do PostgreSQL
  host: "localhost", // Endereço do servidor PostgreSQL
  database: "lms_escola_db", // Nome do seu banco de dados
  password: "6G2D1qw2", // Senha do seu usuário
  port: 5432, // Porta do PostgreSQL
});

type CurrentState = { success: boolean; error: boolean };

// Função para criar um novo assunto
export const createSubject = async (data: { teachers: any; name: any; }) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Inserir o novo assunto
    const subjectInsertQuery = `
      INSERT INTO subjectsdata (name, teachers)
      VALUES ($1, $2);
    `;
    const teachersArray = JSON.stringify(data.teachers); // Transformar em formato JSON se necessário
    await client.query(subjectInsertQuery, [data.name, teachersArray]);

    await client.query('COMMIT');
    return { success: true, error: false };
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para atualizar um assunto
export const updateSubject = async (name: any, teachers: any, id:any) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Atualizar o nome do assunto
    const updateQuery = `UPDATE subjectsData SET name = $1, teachers = $2 WHERE id = $3;`;
    const teachersArray = JSON.stringify(teachers); // Transformar em formato JSON se necessário
    const values = [name, teachersArray, id];

    await client.query(updateQuery, values);
    await client.query('COMMIT');
    return { success: true, error: false };
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para deletar um assunto
export const deleteSubject = async (
  currentState: CurrentState,
  id: number
) => {
  try {
    const query = `DELETE FROM subjects WHERE id = $1;`;
    const values = [id];

    await pool.query(query, values);
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// Função para criar uma nova classe
export const createClass = async (
  currentState: CurrentState,
  name: string
) => {
  try {
    const query = `INSERT INTO classes (name) VALUES ($1) RETURNING id;`;
    const values = [name];

    await pool.query(query, values);
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// Função para atualizar uma classe
export const updateClass = async (
  currentState: CurrentState,
  id: number,
  name: string
) => {
  try {
    const query = `UPDATE classes SET name = $1 WHERE id = $2;`;
    const values = [name, id];

    await pool.query(query, values);
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// Função para deletar uma classe
export const deleteClass = async (
  currentState: CurrentState,
  id: number
) => {
  try {
    const query = `DELETE FROM classes WHERE id = $1;`;
    const values = [id];

    await pool.query(query, values);
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// Função para criar um novo professor
export const createTeacher = async (
  currentState: CurrentState,
  username: string,
  name: string,
  surname: string,
  email?: string,
  phone?: string,
  address?: string,
  bloodType?: string,
  sex?: string,
  birthday?: string
) => {
  try {
    const query = `
      INSERT INTO teachers (username, name, surname, email, phone, address, blood_type, sex, birthday) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;
    const values = [username, name, surname, email || null, phone || null, address, bloodType, sex, birthday];

    await pool.query(query, values);
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// Função para atualizar um professor
export const updateTeacher = async (
  currentState: CurrentState,
  id: number,
  username: string,
  name: string,
  surname: string,
  email?: string,
  phone?: string,
  address?: string,
  bloodType?: string,
  sex?: string,
  birthday?: string
) => {
  try {
    const query = `
      UPDATE teachers 
      SET username = $1, name = $2, surname = $3, email = $4, phone = $5, address = $6, blood_type = $7, sex = $8, birthday = $9
      WHERE id = $10;
    `;
    const values = [username, name, surname, email || null, phone || null, address, bloodType, sex, birthday, id];

    await pool.query(query, values);
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// Função para deletar um professor
export const deleteTeacher = async (
  currentState: CurrentState,
  id: number
) => {
  try {
    const query = `DELETE FROM teachers WHERE id = $1;`;
    const values = [id];

    await pool.query(query, values);
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// Função para criar um novo aluno
export const createStudent = async (
  currentState: CurrentState,
  username: string,
  name: string,
  surname: string,
  email?: string,
  phone?: string,
  address?: string,
  bloodType?: string,
  sex?: string,
  birthday?: string,
  gradeId?: number,
  classId?: number,
  parentId?: number
) => {
  try {
    const query = `
      INSERT INTO students (username, name, surname, email, phone, address, blood_type, sex, birthday, grade_id, class_id, parent_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
    `;
    const values = [username, name, surname, email || null, phone, address, bloodType, sex, birthday, gradeId, classId, parentId];

    await pool.query(query, values);
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// Função para atualizar um aluno
export const updateStudent = async (
  currentState: CurrentState,
  id: number,
  username: string,
  name: string,
  surname: string,
  email?: string,
  phone?: string,
  address?: string,
  bloodType?: string,
  sex?: string,
  birthday?: string,
  gradeId?: number,
  classId?: number,
  parentId?: number
) => {
  try {
    const query = `
      UPDATE students 
      SET username = $1, name = $2, surname = $3, email = $4, phone = $5, address = $6, blood_type = $7, sex = $8, birthday = $9, grade_id = $10, class_id = $11, parent_id = $12
      WHERE id = $13;
    `;
    const values = [username, name, surname, email || null, phone, address, bloodType, sex, birthday, gradeId, classId, parentId, id];

    await pool.query(query, values);
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// Função para deletar um aluno
export const deleteStudent = async (
  currentState: CurrentState,
  id: number
) => {
  try {
    const query = `DELETE FROM students WHERE id = $1;`;
    const values = [id];

    await pool.query(query, values);
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// Função para criar um exame
export const createExam = async (
  currentState: CurrentState,
  title: string,
  startTime: Date,
  endTime: Date,
  lessonId: number
) => {
  try {
    const query = `
      INSERT INTO exams (title, start_time, end_time, lesson_id) 
      VALUES ($1, $2, $3, $4);
    `;
    const values = [title, startTime, endTime, lessonId];

    await pool.query(query, values);
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// Função para atualizar um exame
export const updateExam = async (
  currentState: CurrentState,
  id: number,
  title: string,
  startTime: Date,
  endTime: Date,
  lessonId: number
) => {
  try {
    const query = `
      UPDATE exams 
      SET title = $1, start_time = $2, end_time = $3, lesson_id = $4
      WHERE id = $5;
    `;
    const values = [title, startTime, endTime, lessonId, id];

    await pool.query(query, values);
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

// Função para deletar um exame
export const deleteExam = async (
  currentState: CurrentState,
  id: number
) => {
  try {
    const query = `DELETE FROM exams WHERE id = $1;`;
    const values = [id];

    await pool.query(query, values);
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};