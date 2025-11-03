'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/app/page';

interface TaskFormProps {
  task: Task | null;
  selectedDate: string;
  onSave: (task: Omit<Task, 'id'>) => void;
  onCancel: () => void;
}

export default function TaskForm({ task, selectedDate, onSave, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState({
    date: task?.date || selectedDate,
    name: task?.name || '',
    duration: task?.duration || '',
    description: task?.description || '',
    category: task?.category || '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        date: task.date,
        name: task.name,
        duration: task.duration,
        description: task.description,
        category: task.category,
      });
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-2xl font-semibold text-slate-800">
            {task ? 'დავალების რედაქტირება' : 'ახალი დავალება'}
          </h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* თარიღი */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-2">
              თარიღი
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900"
            />
          </div>

          {/* დავალების სახელი */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
              დავალების სახელი
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="მაგ: პროექტის დიზაინი"
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 placeholder:text-slate-500"
            />
          </div>

          {/* დახარჯული დრო */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-slate-700 mb-2">
              დახარჯული დრო
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              placeholder="მაგ: 2 საათი 30 წუთი"
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 placeholder:text-slate-500"
            />
          </div>

          {/* კატეგორია */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
              კატეგორია
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-900 bg-white"
            >
              <option value="" disabled>აირჩიეთ კატეგორია</option>
              <option value="სწავლა">სწავლა</option>
              <option value="პრაქტიკული">პრაქტიკული</option>
            </select>
          </div>

          {/* აღწერა */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
              აღწერა
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="დამატებითი ინფორმაცია..."
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-slate-900 placeholder:text-slate-500"
            />
          </div>

          {/* ღილაკები */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 font-medium transition-colors"
            >
              გაუქმება
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
            >
              {task ? 'განახლება' : 'დამატება'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
