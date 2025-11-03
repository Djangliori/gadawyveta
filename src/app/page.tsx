'use client';

import { useState, useEffect } from 'react';
import Calendar from '@/components/Calendar';
import TaskTable from '@/components/TaskTable';
import TaskForm from '@/components/TaskForm';

export interface Task {
  id: number;
  date: string;
  name: string;
  duration: string;
  description: string;
  category: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // მონაცემების ჩატვირთვა
  useEffect(() => {
    setMounted(true);
    fetchTasks();

    // Live reload - ყოველ 5 წამში განახლება
    const interval = setInterval(() => {
      fetchTasks();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = async (id: number) => {
    if (!confirm('დარწმუნებული ხართ რომ გსურთ წაშლა?')) return;

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== id));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSaveTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      if (editingTask) {
        // რედაქტირება
        const response = await fetch(`/api/tasks/${editingTask.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        });

        if (response.ok) {
          const updatedTask = await response.json();
          setTasks(tasks.map(task =>
            task.id === editingTask.id ? updatedTask : task
          ));
        }
      } else {
        // დამატება
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        });

        if (response.ok) {
          const newTask = await response.json();
          setTasks([...tasks, newTask]);
        }
      }

      setIsFormOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  // გაფილტრული დავალებები არჩეული თარიღისთვის
  const filteredTasks = tasks.filter(task => task.date === selectedDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">გადაწყვეტა</h1>
          <p className="text-slate-600">დროის აღრიცხვისა და დავალებების მართვა</p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-1">
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              tasks={tasks}
            />
          </div>

          {/* Tasks Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-slate-800">
                  დავალებები - {mounted ? new Date(selectedDate).toLocaleDateString('ka-GE') : selectedDate}
                </h2>
                <button
                  onClick={handleAddTask}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                >
                  + დავალების დამატება
                </button>
              </div>

              {isLoading ? (
                <div className="text-center py-12 text-slate-500">
                  იტვირთება...
                </div>
              ) : filteredTasks.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  არ არის დავალებები ამ თარიღისთვის
                </div>
              ) : (
                <TaskTable
                  tasks={filteredTasks}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              )}
            </div>
          </div>
        </div>

        {/* Task Form Modal */}
        {isFormOpen && (
          <TaskForm
            task={editingTask}
            selectedDate={selectedDate}
            onSave={handleSaveTask}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingTask(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
