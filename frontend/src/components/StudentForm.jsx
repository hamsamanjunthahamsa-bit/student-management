import React, { useState } from 'react';
import Button from './Button';
import { User, Calendar, Book, Sparkles } from 'lucide-react';

export default function StudentForm({ initialData, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState(
    initialData || { name: '', age: '', course: '' }
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    else if (isNaN(formData.age) || Number(formData.age) <= 0) newErrors.age = 'Age must be valid';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        age: Number(formData.age)
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-up">
      <div className="bg-white/70 backdrop-blur-xl p-10 md:p-14 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/80">
        <div className="mb-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-white">
            <Sparkles className="text-indigo-600" size={32} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">
            {initialData ? 'Edit Student Profile' : 'Add New Student'}
          </h2>
          <p className="text-gray-500 mt-3 text-lg font-medium">Fill in the details below to update the system.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2 ml-1">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500">
                <User className={`h-6 w-6 ${errors.name ? 'text-rose-400' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-14 pr-6 py-4 bg-white/50 border-0 rounded-2xl shadow-inner text-lg font-medium placeholder-gray-400 focus:outline-none focus:ring-4 transition-all ${errors.name ? 'focus:ring-rose-500/20 bg-rose-50/50 text-rose-900' : 'focus:ring-indigo-500/20 focus:bg-white text-gray-900'}`}
                placeholder="e.g. Jane Doe"
              />
            </div>
            {errors.name && <p className="text-rose-500 text-sm font-bold mt-2 ml-2">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-bold text-gray-700 mb-2 ml-1">Age</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500">
                <Calendar className={`h-6 w-6 ${errors.age ? 'text-rose-400' : 'text-gray-400'}`} />
              </div>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={`w-full pl-14 pr-6 py-4 bg-white/50 border-0 rounded-2xl shadow-inner text-lg font-medium placeholder-gray-400 focus:outline-none focus:ring-4 transition-all ${errors.age ? 'focus:ring-rose-500/20 bg-rose-50/50 text-rose-900' : 'focus:ring-indigo-500/20 focus:bg-white text-gray-900'}`}
                placeholder="e.g. 21"
              />
            </div>
            {errors.age && <p className="text-rose-500 text-sm font-bold mt-2 ml-2">{errors.age}</p>}
          </div>

          <div className="mb-10">
            <label htmlFor="course" className="block text-sm font-bold text-gray-700 mb-2 ml-1">Course</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500">
                <Book className={`h-6 w-6 ${errors.course ? 'text-rose-400' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className={`w-full pl-14 pr-6 py-4 bg-white/50 border-0 rounded-2xl shadow-inner text-lg font-medium placeholder-gray-400 focus:outline-none focus:ring-4 transition-all ${errors.course ? 'focus:ring-rose-500/20 bg-rose-50/50 text-rose-900' : 'focus:ring-indigo-500/20 focus:bg-white text-gray-900'}`}
                placeholder="e.g. Computer Science"
              />
            </div>
            {errors.course && <p className="text-rose-500 text-sm font-bold mt-2 ml-2">{errors.course}</p>}
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-8 border-t border-gray-100/50">
            <Button variant="secondary" onClick={onCancel} disabled={isLoading} className="w-full sm:w-auto py-4 px-8 text-lg">
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading} className="w-full sm:w-auto py-4 px-10 text-lg shadow-indigo-500/30">
              {isLoading ? 'Saving...' : 'Save Student'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
