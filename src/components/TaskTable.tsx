'use client';

import { useState } from 'react';
import { Task } from '@/app/page';

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskTable({ tasks, onEdit, onDelete }: TaskTableProps) {
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 font-semibold text-slate-700">თარიღი</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">დავალება</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">დრო</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">აღწერა</th>
            <th className="text-left py-3 px-4 font-semibold text-slate-700">კატეგორია</th>
            <th className="text-right py-3 px-4 font-semibold text-slate-700">მოქმედება</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              onClick={() => setViewingTask(task)}
              className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <td className="py-4 px-4 text-slate-600">
                {new Date(task.date).toLocaleDateString('ka-GE')}
              </td>
              <td className="py-4 px-4 font-medium text-slate-800">
                {task.name}
              </td>
              <td className="py-4 px-4 text-slate-600">
                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-medium">
                  {task.duration}
                </span>
              </td>
              <td className="py-4 px-4 text-slate-600 max-w-xs truncate">
                {task.description}
              </td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-purple-50 text-purple-700 font-medium">
                  {task.category}
                </span>
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(task);
                    }}
                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                    aria-label="რედაქტირება"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(task.id);
                    }}
                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                    aria-label="წაშლა"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal - დავალების დეტალები */}
      {viewingTask && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setViewingTask(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-2xl font-semibold text-slate-800">
                {viewingTask.name}
              </h3>
              <button
                onClick={() => setViewingTask(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="დახურვა"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* თარიღი */}
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-2">
                  თარიღი
                </label>
                <div className="text-lg text-slate-800">
                  {new Date(viewingTask.date).toLocaleDateString('ka-GE', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              {/* დახარჯული დრო */}
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-2">
                  დახარჯული დრო
                </label>
                <div className="inline-flex items-center px-4 py-2 rounded-xl bg-blue-50 text-blue-700 font-semibold text-lg">
                  {viewingTask.duration}
                </div>
              </div>

              {/* კატეგორია */}
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-2">
                  კატეგორია
                </label>
                <div className="inline-flex items-center px-4 py-2 rounded-xl bg-purple-50 text-purple-700 font-semibold text-lg">
                  {viewingTask.category}
                </div>
              </div>

              {/* აღწერა */}
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-2">
                  აღწერა
                </label>
                <div className="bg-slate-50 rounded-xl p-4 text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {viewingTask.description || 'აღწერა არ არის'}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setViewingTask(null);
                  onEdit(viewingTask);
                }}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
              >
                რედაქტირება
              </button>
              <button
                onClick={() => setViewingTask(null)}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 font-medium transition-colors"
              >
                დახურვა
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
