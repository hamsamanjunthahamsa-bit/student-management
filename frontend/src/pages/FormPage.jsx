import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { studentService } from '../services/studentService';

export default function FormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [initialData, setInitialData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const fetchStudent = async () => {
        try {
          const student = await studentService.getStudentById(id);
          setInitialData(student);
        } catch (error) {
          console.error("Failed to fetch student details:", error);
          alert("Student not found.");
          navigate('/dashboard');
        } finally {
          setIsLoadingData(false);
        }
      };
      fetchStudent();
    }
  }, [id, isEditMode, navigate]);

  const handleSubmit = async (formData) => {
    setIsSaving(true);
    try {
      if (isEditMode) {
        await studentService.updateStudent(id, formData);
      } else {
        await studentService.createStudent(formData);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error("Failed to save student:", error);
      alert("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (isLoadingData) {
    return (
      <div className="flex justify-center items-center h-64">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <StudentForm 
        initialData={initialData} 
        onSubmit={handleSubmit} 
        onCancel={handleCancel}
        isLoading={isSaving}
      />
    </div>
  );
}
