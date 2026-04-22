import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import StudentTable from '../components/StudentTable';
import { studentService } from '../services/studentService';

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await studentService.deleteStudent(id);
        fetchStudents();
      } catch (error) {
        console.error("Failed to delete student:", error);
      }
    }
  };

  const handleEdit = (student) => {
    navigate(`/edit/${student.id}`);
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            Dashboard <Sparkles className="text-amber-400" size={32} />
          </h1>
          <p className="text-gray-500 mt-3 text-lg font-medium">Manage and organize your students effectively.</p>
        </div>
        <Button onClick={() => navigate('/add')} variant="primary" className="shadow-indigo-500/30 text-lg px-6 py-3">
          <Plus size={24} /> Add New Student
        </Button>
      </div>

      <div className="bg-white/70 backdrop-blur-xl p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 mb-8 flex items-center">
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-indigo-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-14 pr-6 py-4 border-0 bg-white/50 rounded-2xl leading-5 text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:bg-white transition duration-300 ease-in-out shadow-inner text-lg"
            placeholder="Search students by name or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="relative w-20 h-20">
             <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-100 rounded-full"></div>
             <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full animate-spin border-t-transparent shadow-lg shadow-indigo-500/30"></div>
          </div>
        </div>
      ) : (
        <StudentTable 
          students={filteredStudents} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
}
