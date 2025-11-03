import { NextRequest, NextResponse } from 'next/server';
import { getAllTasks, createTask, initDb } from '@/lib/db';

// GET - ყველა დავალების მიღება
export async function GET() {
  try {
    // ინიციალიზაცია თუ ცხრილი არ არსებობს
    await initDb();

    const tasks = await getAllTasks();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('GET /api/tasks error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST - ახალი დავალების დამატება
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ვალიდაცია
    if (!body.date || !body.name || !body.duration || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const task = await createTask({
      date: body.date,
      name: body.name,
      duration: body.duration,
      description: body.description || '',
      category: body.category,
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('POST /api/tasks error:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
