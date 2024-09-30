"use server";

import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "6G2D1qw2",
  port: 5432,
});

type Teacher = {
  id?: number;
  teacherId: string;
  name: string;
  email: string;
  photo: string;
  phone: string;
  subjects: string[]; // Pode ser uma lista de disciplinas em formato de string
  classes: string[]; // Pode ser uma lista de classes em formato de string
  address: string;
};

type Student = {
  id?: number; // id é opcional para a criação
  studentId: string;
  name: string;
  email: string;
  photo: string;
  phone: string;
  grade: number;
  class: string;
  address: string;
};

type Parent = {
  id?: number; // id é opcional para a criação
  name: string;
  students: string; // Pode ser uma lista de IDs de alunos em formato de string
  email: string;
  phone: string;
  address: string;
};

type Class = {
  id?: number; // id é opcional para a criação
  name: string;
  capacity: number;
  grade: number;
  supervisor: string;
};

type Lesson = {
  id?: number; // id é opcional para a criação
  subject: string;
  class: string;
  teacher: string;
};

type Exam = {
  id?: number; // id é opcional para a criação
  subject: string;
  class: string;
  teacher: string;
  date: Date; // Use Date para garantir que o formato de data esteja correto
};

type Assignment = {
  id?: number; // id é opcional para a criação
  subject: string;
  class: string;
  teacher: string;
  dueDate: Date; // Use Date para garantir que o formato de data esteja correto
};

type Result = {
  id?: number; // id é opcional para a criação
  subject: string;
  class: string;
  teacher: string;
  student: string;
  date: Date; // Use Date para garantir que o formato de data esteja correto
  type: string;
  score: number;
};

type Event = {
  id?: number; // id é opcional para a criação
  title: string;
  class: string;
  date: Date; // Use Date para garantir que o formato de data esteja correto
  startTime: string; // Use string para armazenar o horário no formato HH:MM:SS
  endTime: string; // Use string para armazenar o horário no formato HH:MM:SS
};

type Announcement = {
  id?: number; // id é opcional para a criação
  title: string;
  class: string;
  date: Date; // Use Date para garantir que o formato de data esteja correto
};

// Função para criar um novo assunto
export const createSubject = async (data: { name: string; teachers: Teacher[] }) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const subjectInsertQuery = `
      INSERT INTO subjectsdata (name, teachers)
      VALUES ($1, $2);
    `;
    const teachersArray = JSON.stringify(data.teachers);
    await client.query(subjectInsertQuery, [data.name, teachersArray]);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para atualizar um assunto
export const updateSubject = async (id: number, data: { name?: string; teachers?: Teacher[] }) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const updates = [];
    const values = [];
    let index = 1;

    if (data.name) {
      updates.push(`name = $${index++}`);
      values.push(data.name);
    }
    if (data.teachers) {
      updates.push(`teachers = $${index++}`);
      values.push(JSON.stringify(data.teachers));
    }

    const query = `
      UPDATE subjectsdata
      SET ${updates.join(", ")}
      WHERE id = $${index}
    `;
    values.push(id);
    await client.query(query, values);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para deletar um assunto
export const deleteSubject = async (id: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM subjectsdata WHERE id = $1", [id]);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para criar uma nova classe
export const createClass = async (data: {
  studentId: string;
  name: string;
  email: string;
  photo: string;
  phone: string;
  grade: number;
  class: string;
  address: string;
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "INSERT INTO classdata (studentId, name, email, photo, phone, grade, class, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [data.studentId, data.name, data.email, data.photo, data.phone, data.grade, data.class, data.address]
    );
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para atualizar uma classe
export const updateClass = async (id: number, data: {
  studentId?: string;
  name?: string;
  email?: string;
  photo?: string;
  phone?: string;
  grade?: number;
  class?: string;
  address?: string;
}) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const updates = [];
    const values = [];
    let index = 1;

    if (data.studentId) {
      updates.push(`studentId = $${index++}`);
      values.push(data.studentId);
    }
    if (data.name) {
      updates.push(`name = $${index++}`);
      values.push(data.name);
    }
    if (data.email) {
      updates.push(`email = $${index++}`);
      values.push(data.email);
    }
    if (data.photo) {
      updates.push(`photo = $${index++}`);
      values.push(data.photo);
    }
    if (data.phone) {
      updates.push(`phone = $${index++}`);
      values.push(data.phone);
    }
    if (data.grade) {
      updates.push(`grade = $${index++}`);
      values.push(data.grade);
    }
    if (data.class) {
      updates.push(`class = $${index++}`);
      values.push(data.class);
    }
    if (data.address) {
      updates.push(`address = $${index++}`);
      values.push(data.address);
    }

    const query = `
      UPDATE classdata
      SET ${updates.join(", ")}
      WHERE id = $${index}
    `;
    values.push(id);
    await client.query(query, values);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para deletar uma classe
export const deleteClass = async (id: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM classdata WHERE id = $1", [id]);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};


// Função para criar um novo professor
export const createTeacher = async (data: Teacher) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "INSERT INTO teachersdata (teacherId, name, email, photo, phone, subjects, classes, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [data.teacherId, data.name, data.email, data.photo, data.phone, data.subjects, data.classes, data.address]
    );
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para atualizar um professor
export const updateTeacher = async (id: number, data: Partial<Teacher>) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const updates = [];
    const values = [];
    let index = 1;

    if (data.teacherId) {
      updates.push(`teacherId = $${index++}`);
      values.push(data.teacherId);
    }
    if (data.name) {
      updates.push(`name = $${index++}`);
      values.push(data.name);
    }
    if (data.email) {
      updates.push(`email = $${index++}`);
      values.push(data.email);
    }
    if (data.photo) {
      updates.push(`photo = $${index++}`);
      values.push(data.photo);
    }
    if (data.phone) {
      updates.push(`phone = $${index++}`);
      values.push(data.phone);
    }
    if (data.subjects) {
      updates.push(`subjects = $${index++}`);
      values.push(data.subjects);
    }
    if (data.classes) {
      updates.push(`classes = $${index++}`);
      values.push(data.classes);
    }
    if (data.address) {
      updates.push(`address = $${index++}`);
      values.push(data.address);
    }

    const query = `
      UPDATE teachersdata
      SET ${updates.join(", ")}
      WHERE id = $${index}
    `;
    values.push(id);
    await client.query(query, values);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para deletar um professor
export const deleteTeacher = async (id: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM teachersdata WHERE id = $1", [id]);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para criar um novo aluno
export const createStudent = async (data: Student) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "INSERT INTO studentsdata (studentId, name, email, photo, phone, grade, class, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [data.studentId, data.name, data.email, data.photo, data.phone, data.grade, data.class, data.address]
    );
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para atualizar um aluno
export const updateStudent = async (id: number, data: Partial<Student>) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const updates = [];
    const values = [];
    let index = 1;

    if (data.studentId) {
      updates.push(`studentId = $${index++}`);
      values.push(data.studentId);
    }
    if (data.name) {
      updates.push(`name = $${index++}`);
      values.push(data.name);
    }
    if (data.email) {
      updates.push(`email = $${index++}`);
      values.push(data.email);
    }
    if (data.photo) {
      updates.push(`photo = $${index++}`);
      values.push(data.photo);
    }
    if (data.phone) {
      updates.push(`phone = $${index++}`);
      values.push(data.phone);
    }
    if (data.grade) {
      updates.push(`grade = $${index++}`);
      values.push(data.grade);
    }
    if (data.class) {
      updates.push(`class = $${index++}`);
      values.push(data.class);
    }
    if (data.address) {
      updates.push(`address = $${index++}`);
      values.push(data.address);
    }

    const query = `
      UPDATE studentsdata
      SET ${updates.join(", ")}
      WHERE id = $${index}
    `;
    values.push(id);
    await client.query(query, values);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para deletar um aluno
export const deleteStudent = async (id: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM studentsdata WHERE id = $1", [id]);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para criar um novo pai
export const createParent = async (data: Parent) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "INSERT INTO parentsdata (name, students, email, phone, address) VALUES ($1, $2, $3, $4, $5)",
      [data.name, data.students, data.email, data.phone, data.address]
    );
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para atualizar um pai
export const updateParent = async (id: number, data: Partial<Parent>) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const updates = [];
    const values = [];
    let index = 1;

    if (data.name) {
      updates.push(`name = $${index++}`);
      values.push(data.name);
    }
    if (data.students) {
      updates.push(`students = $${index++}`);
      values.push(data.students);
    }
    if (data.email) {
      updates.push(`email = $${index++}`);
      values.push(data.email);
    }
    if (data.phone) {
      updates.push(`phone = $${index++}`);
      values.push(data.phone);
    }
    if (data.address) {
      updates.push(`address = $${index++}`);
      values.push(data.address);
    }

    const query = `
      UPDATE parentsdata
      SET ${updates.join(", ")}
      WHERE id = $${index}
    `;
    values.push(id);
    await client.query(query, values);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para deletar um pai
export const deleteParent = async (id: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM parentsdata WHERE id = $1", [id]);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para criar uma nova classe
export const createClasses = async (data: Class) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "INSERT INTO classesdata (name, capacity, grade, supervisor) VALUES ($1, $2, $3, $4)",
      [data.name, data.capacity, data.grade, data.supervisor]
    );
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para atualizar uma classe
export const updateClasses = async (id: number, data: Partial<Class>) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const updates = [];
    const values = [];
    let index = 1;

    if (data.name) {
      updates.push(`name = $${index++}`);
      values.push(data.name);
    }
    if (data.capacity) {
      updates.push(`capacity = $${index++}`);
      values.push(data.capacity);
    }
    if (data.grade) {
      updates.push(`grade = $${index++}`);
      values.push(data.grade);
    }
    if (data.supervisor) {
      updates.push(`supervisor = $${index++}`);
      values.push(data.supervisor);
    }

    const query = `
      UPDATE classesdata
      SET ${updates.join(", ")}
      WHERE id = $${index}
    `;
    values.push(id);
    await client.query(query, values);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para deletar uma classe
export const deleteClasses = async (id: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM classesdata WHERE id = $1", [id]);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para criar uma nova lição
export const createLesson = async (data: Lesson) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "INSERT INTO lessonsdata (subject, class, teacher) VALUES ($1, $2, $3)",
      [data.subject, data.class, data.teacher]
    );
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para atualizar uma lição
export const updateLesson = async (id: number, data: Partial<Lesson>) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const updates = [];
    const values = [];
    let index = 1;

    if (data.subject) {
      updates.push(`subject = $${index++}`);
      values.push(data.subject);
    }
    if (data.class) {
      updates.push(`class = $${index++}`);
      values.push(data.class);
    }
    if (data.teacher) {
      updates.push(`teacher = $${index++}`);
      values.push(data.teacher);
    }

    const query = `
      UPDATE lessonsdata
      SET ${updates.join(", ")}
      WHERE id = $${index}
    `;
    values.push(id);
    await client.query(query, values);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para deletar uma lição
export const deleteLesson = async (id: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM lessonsdata WHERE id = $1", [id]);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para criar um novo exame
export const createExam = async (data: Exam) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "INSERT INTO examsdata (subject, class, teacher, date) VALUES ($1, $2, $3, $4)",
      [data.subject, data.class, data.teacher, data.date]
    );
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para atualizar um exame
export const updateExam = async (id: number, data: Partial<Exam>) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const updates = [];
    const values = [];
    let index = 1;

    if (data.subject) {
      updates.push(`subject = $${index++}`);
      values.push(data.subject);
    }
    if (data.class) {
      updates.push(`class = $${index++}`);
      values.push(data.class);
    }
    if (data.teacher) {
      updates.push(`teacher = $${index++}`);
      values.push(data.teacher);
    }
    if (data.date) {
      updates.push(`date = $${index++}`);
      values.push(data.date);
    }

    const query = `
      UPDATE examsdata
      SET ${updates.join(", ")}
      WHERE id = $${index}
    `;
    values.push(id);
    await client.query(query, values);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para deletar um exame
export const deleteExam = async (id: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM examsdata WHERE id = $1", [id]);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para criar uma nova tarefa
export const createAssignment = async (data: Assignment) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "INSERT INTO assignmentsdata (subject, class, teacher, dueDate) VALUES ($1, $2, $3, $4)",
      [data.subject, data.class, data.teacher, data.dueDate]
    );
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para atualizar uma tarefa
export const updateAssignment = async (id: number, data: Partial<Assignment>) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const updates = [];
    const values = [];
    let index = 1;

    if (data.subject) {
      updates.push(`subject = $${index++}`);
      values.push(data.subject);
    }
    if (data.class) {
      updates.push(`class = $${index++}`);
      values.push(data.class);
    }
    if (data.teacher) {
      updates.push(`teacher = $${index++}`);
      values.push(data.teacher);
    }
    if (data.dueDate) {
      updates.push(`dueDate = $${index++}`);
      values.push(data.dueDate);
    }

    const query = `
      UPDATE assignmentsdata
      SET ${updates.join(", ")}
      WHERE id = $${index}
    `;
    values.push(id);
    await client.query(query, values);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para deletar uma tarefa
export const deleteAssignment = async (id: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM assignmentsdata WHERE id = $1", [id]);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para criar um novo resultado
export const createResult = async (data: Result) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "INSERT INTO resultsdata (subject, class, teacher, student, date, type, score) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [data.subject, data.class, data.teacher, data.student, data.date, data.type, data.score]
    );
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para atualizar um resultado
export const updateResult = async (id: number, data: Partial<Result>) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const updates = [];
    const values = [];
    let index = 1;

    if (data.subject) {
      updates.push(`subject = $${index++}`);
      values.push(data.subject);
    }
    if (data.class) {
      updates.push(`class = $${index++}`);
      values.push(data.class);
    }
    if (data.teacher) {
      updates.push(`teacher = $${index++}`);
      values.push(data.teacher);
    }
    if (data.student) {
      updates.push(`student = $${index++}`);
      values.push(data.student);
    }
    if (data.date) {
      updates.push(`date = $${index++}`);
      values.push(data.date);
    }
    if (data.type) {
      updates.push(`type = $${index++}`);
      values.push(data.type);
    }
    if (data.score !== undefined) { // Verifica se o score foi fornecido
      updates.push(`score = $${index++}`);
      values.push(data.score);
    }

    const query = `
      UPDATE resultsdata
      SET ${updates.join(", ")}
      WHERE id = $${index}
    `;
    values.push(id);
    await client.query(query, values);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para deletar um resultado
export const deleteResult = async (id: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM resultsdata WHERE id = $1", [id]);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para criar um novo evento
export const createEvent = async (data: Event) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "INSERT INTO eventsdata (title, class, date, startTime, endTime) VALUES ($1, $2, $3, $4, $5)",
      [data.title, data.class, data.date, data.startTime, data.endTime]
    );
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para atualizar um evento
export const updateEvent = async (id: number, data: Partial<Event>) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const updates = [];
    const values = [];
    let index = 1;

    if (data.title) {
      updates.push(`title = $${index++}`);
      values.push(data.title);
    }
    if (data.class) {
      updates.push(`class = $${index++}`);
      values.push(data.class);
    }
    if (data.date) {
      updates.push(`date = $${index++}`);
      values.push(data.date);
    }
    if (data.startTime) {
      updates.push(`startTime = $${index++}`);
      values.push(data.startTime);
    }
    if (data.endTime) {
      updates.push(`endTime = $${index++}`);
      values.push(data.endTime);
    }

    const query = `
      UPDATE eventsdata
      SET ${updates.join(", ")}
      WHERE id = $${index}
    `;
    values.push(id);
    await client.query(query, values);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para deletar um evento
export const deleteEvent = async (id: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM eventsdata WHERE id = $1", [id]);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para criar um novo anúncio
export const createAnnouncement = async (data: Announcement) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      "INSERT INTO announcementsdata (title, class, date) VALUES ($1, $2, $3)",
      [data.title, data.class, data.date]
    );
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para atualizar um anúncio
export const updateAnnouncement = async (id: number, data: Partial<Announcement>) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const updates = [];
    const values = [];
    let index = 1;

    if (data.title) {
      updates.push(`title = $${index++}`);
      values.push(data.title);
    }
    if (data.class) {
      updates.push(`class = $${index++}`);
      values.push(data.class);
    }
    if (data.date) {
      updates.push(`date = $${index++}`);
      values.push(data.date);
    }

    const query = `
      UPDATE announcementsdata
      SET ${updates.join(", ")}
      WHERE id = $${index}
    `;
    values.push(id);
    await client.query(query, values);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};

// Função para deletar um anúncio
export const deleteAnnouncement = async (id: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM announcementsdata WHERE id = $1", [id]);
    await client.query("COMMIT");
    return { success: true, error: false };
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    return { success: false, error: true };
  } finally {
    client.release();
  }
};