import React from 'react';
import Button from './Button';
import { Pencil, Trash2 } from 'lucide-react';

export default function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-20 text-center border border-white/80 animate-fade-up">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-white">
          <span className="text-4xl">📭</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">No students found</h3>
        <p className="text-gray-500 text-lg font-medium">Try adjusting your search or add a new student.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 overflow-hidden animate-fade-up">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100/50">
          <thead className="bg-white/50 backdrop-blur-sm">
            <tr>
              <th scope="col" className="px-8 py-6 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-8 py-6 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Age</th>
              <th scope="col" className="px-8 py-6 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">Course</th>
              <th scope="col" className="px-8 py-6 text-right text-sm font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50/50">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-white transition-colors duration-300 group">
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-indigo-700 font-extrabold text-lg shadow-inner border border-white">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-5">
                      <div className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{student.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-base text-gray-600 font-semibold">{student.age} yrs</td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <span className="px-4 py-1.5 inline-flex text-sm font-bold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100/50 shadow-sm">
                    {student.course}
                  </span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" onClick={() => onEdit(student)} className="p-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100">
                      <Pencil size={20} strokeWidth={2.5} />
                    </Button>
                    <Button variant="secondary" onClick={() => onDelete(student.id)} className="p-3 rounded-xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100">
                      <Trash2 size={20} strokeWidth={2.5} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
