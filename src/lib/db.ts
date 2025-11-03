import { sql } from '@vercel/postgres';

export interface Task {
  id: number;
  date: string;
  name: string;
  duration: string;
  description: string;
  category: string;
  created_at: Date;
}

// ბაზის ინიციალიზაცია
export async function initDb() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        name VARCHAR(255) NOT NULL,
        duration VARCHAR(50) NOT NULL,
        description TEXT,
        category VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, error };
  }
}

// ყველა დავალების მიღება
export async function getAllTasks() {
  try {
    const { rows } = await sql<Task>`
      SELECT * FROM tasks ORDER BY date DESC, created_at DESC
    `;
    return rows;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

// კონკრეტული დავალების მიღება
export async function getTaskById(id: number) {
  try {
    const { rows } = await sql<Task>`
      SELECT * FROM tasks WHERE id = ${id}
    `;
    return rows[0];
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error;
  }
}

// დავალების დამატება
export async function createTask(data: Omit<Task, 'id' | 'created_at'>) {
  try {
    const { rows } = await sql<Task>`
      INSERT INTO tasks (date, name, duration, description, category)
      VALUES (${data.date}, ${data.name}, ${data.duration}, ${data.description}, ${data.category})
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

// დავალების განახლება
export async function updateTask(id: number, data: Omit<Task, 'id' | 'created_at'>) {
  try {
    const { rows } = await sql<Task>`
      UPDATE tasks
      SET date = ${data.date},
          name = ${data.name},
          duration = ${data.duration},
          description = ${data.description},
          category = ${data.category}
      WHERE id = ${id}
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

// დავალების წაშლა
export async function deleteTask(id: number) {
  try {
    await sql`
      DELETE FROM tasks WHERE id = ${id}
    `;
    return { success: true };
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}
