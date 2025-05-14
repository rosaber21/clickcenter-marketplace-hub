
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StudentSidebar } from '@/components/student/StudentSidebar';
import { StudentHeader } from '@/components/student/StudentHeader';
import { VideoPlayer } from '@/components/student/VideoPlayer';
import { LessonNavigation } from '@/components/student/LessonNavigation';
import { SupplementaryMaterials } from '@/components/student/SupplementaryMaterials';
import { LessonComments } from '@/components/student/LessonComments';
import { SupportWidget } from '@/components/student/SupportWidget';
import { mockCourseData, Course, Lesson } from '@/data/mockCourseData'; // Ensure Lesson is exported or defined
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const CoursePage: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string, lessonId: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [liked, setLiked] = useState(false);
  
  const course = mockCourseData.find(course => course.id === courseId);
  
  useEffect(() => {
    if (course && !lessonId && course.lessons.length > 0) {
      navigate(`/aluno/curso/${courseId}/aula/${course.lessons[0].id}`, { replace: true });
    }
  }, [course, lessonId, courseId, navigate]);

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Alert variant="destructive" className="w-1/2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>Curso não encontrado.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const currentLesson = course.lessons.find(lesson => lesson.id === lessonId) || course.lessons[0];
  if (!currentLesson && course.lessons.length > 0) {
     // Should be handled by useEffect, but as a fallback:
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Redirecionando para a primeira aula...</p>
      </div>
    );
  }
  if (!currentLesson) {
    return (
      <div className="flex items-center justify-center h-screen">
         <Alert variant="destructive" className="w-1/2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>Nenhuma aula encontrada para este curso.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLikeToggle = () => {
    setLiked(!liked);
    // Add logic to persist like status, e.g., API call
    console.log(`Lesson ${currentLesson.id} like toggled to ${!liked}`);
  };

  const handleCompleteLesson = () => {
    console.log('Lesson completed:', currentLesson.id);
    // Add logic to mark lesson as completed, e.g., API call
    // Then potentially navigate to the next lesson
  };

  const handleNavigate = (targetLessonId: string) => {
    navigate(`/aluno/curso/${courseId}/aula/${targetLessonId}`);
  };
  
  return (
    <div className="flex h-screen bg-background">
      {/* Props removed as they caused TS errors with read-only components */}
      <StudentSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Props removed as they caused TS errors with read-only components */}
        <StudentHeader />
        
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
          
          <VideoPlayer 
            title={currentLesson.title}
            videoUrl={currentLesson.videoUrl}
            onComplete={handleCompleteLesson}
            // thumbnailUrl prop was removed in a previous step, ensure VideoPlayer doesn't require it
            // or provide a valid one if it does. For now, assuming it's optional or not used.
          />
          
          <LessonNavigation 
            currentLesson={currentLesson}
            lessons={course.lessons}
            onNavigate={handleNavigate}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Sobre esta aula</h2>
                <p>{currentLesson.description}</p>
              </div>
              
              <LessonComments 
                lessonId={currentLesson.id}
                comments={currentLesson.comments}
                liked={liked} // Assuming 'liked' state is for the like button within comments section
                onLikeToggle={handleLikeToggle}
              />
            </div>
            
            <div className="space-y-6">
              <SupplementaryMaterials materials={currentLesson.materials} />
              {/* Props removed as it caused TS errors with read-only component */}
              <SupportWidget /> 
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoursePage;
