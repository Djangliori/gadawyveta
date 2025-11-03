'use client';

import { Task } from '@/app/page';

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskTable({ tasks, onEdit, onDelete }: TaskTableProps) {
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
              className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
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
                    onClick={() => onEdit(task)}
                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                    aria-label="რედაქტირება"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
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
    </div>
  );
}
