'use client';

import { useState } from 'react';
import { Task } from '@/app/page';

interface CalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  tasks: Task[];
}

export default function Calendar({ selectedDate, onDateSelect, tasks }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // თვის პირველი და ბოლო დღე
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // კვირის პირველი დღე (ორშაბათი = 0)
  const startingDayOfWeek = (firstDay.getDay() + 6) % 7;

  // დღეების რაოდენობა თვეში
  const daysInMonth = lastDay.getDate();

  const monthNames = [
    'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
    'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
  ];

  const weekDays = ['ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვი'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const date = new Date(year, month, day);
    const dateString = date.toISOString().split('T')[0];
    onDateSelect(dateString);
  };

  // შევამოწმოთ არის თუ არა დავალება კონკრეტულ თარიღზე
  const hasTasksOnDate = (day: number): boolean => {
    const date = new Date(year, month, day);
    const dateString = date.toISOString().split('T')[0];
    return tasks.some(task => task.date === dateString);
  };

  // გენერაცია დღეების მასივი
  const days = [];

  // ცარიელი უჯრები თვის დასაწყისში
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="h-10"></div>);
  }

  // თვის დღეები
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateString = date.toISOString().split('T')[0];
    const isSelected = dateString === selectedDate;
    const isToday = dateString === new Date().toISOString().split('T')[0];
    const hasTasks = hasTasksOnDate(day);

    days.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        className={`
          h-10 rounded-xl font-medium transition-all relative
          ${isSelected
            ? 'bg-blue-500 text-white shadow-lg scale-105'
            : isToday
            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            : 'hover:bg-slate-100 text-slate-700'
          }
        `}
      >
        {day}
        {hasTasks && (
          <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
            isSelected ? 'bg-white' : 'bg-blue-500'
          }`}></div>
        )}
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          aria-label="წინა თვე"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="text-xl font-semibold text-slate-800">
          {monthNames[month]} {year}
        </h2>

        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          aria-label="შემდეგი თვე"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-slate-500">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days}
      </div>
    </div>
  );
}
