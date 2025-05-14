
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { LessonNavigation } from '@/components/student/LessonNavigation';
import { VideoPlayer } from '@/components/student/VideoPlayer';
import { StudentSidebar } from '@/components/student/StudentSidebar';
import { StudentHeader } from '@/components/student/StudentHeader';
import { SupplementaryMaterials } from '@/components/student/SupplementaryMaterials';
import { LessonComments } from '@/components/student/LessonComments';
import { SupportWidget } from '@/components/student/SupportWidget';
import { mockCourseData } from '@/data/mockCourseData';

const CoursePage: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string, lessonId: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Get course from mock data
  const course = mockCourseData.find(course => course.id === courseId);
  
  if (!course) {
    return <Navigate to="/aluno" replace />;
  }
  
  // Find the current lesson or default to the first one
  const currentLesson = lessonId 
    ? course.lessons.find(lesson => lesson.id === lessonId) 
    : course.lessons[0];
  
  if (!currentLesson) {
    return <Navigate to={`/aluno/curso/${courseId}`} replace />;
  }

  // Find current lesson index for navigation
  const currentLessonIndex = course.lessons.findIndex(lesson => lesson.id === currentLesson.id);
  
  // Get previous and next lessons for navigation
  const previousLesson = currentLessonIndex > 0 ? course.lessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < course.lessons.length - 1 ? course.lessons[currentLessonIndex + 1] : null;
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // For sort order, ensure lessons are displayed in the correct sequence
  // If lessons don't have an order property, we use their array index for ordering
  const orderedLessons = [...course.lessons].map((lesson, index) => ({
    ...lesson,
    sortOrder: index // Add a sortOrder property based on array index
  }));
  
  return (
    <div className="flex h-screen bg-background">
      <StudentSidebar 
        isOpen={sidebarOpen}
        course={course}
        currentLessonId={currentLesson.id}
        lessons={orderedLessons}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <StudentHeader 
          course={course}
          toggleSidebar={toggleSidebar}
        />
        
        <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
          <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
          
          <VideoPlayer 
            videoUrl={currentLesson.videoUrl}
            thumbnailUrl={course.thumbnailUrl}
          />
          
          <LessonNavigation 
            courseId={courseId as string}
            previousLesson={previousLesson}
            nextLesson={nextLesson}
            currentLessonCompleted={currentLesson.completed}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="prose max-w-none">
                <h2>Descrição da aula</h2>
                <p>{currentLesson.description}</p>
              </div>
              
              <LessonComments comments={currentLesson.comments} />
            </div>
            
            <div className="space-y-6">
              <SupplementaryMaterials materials={currentLesson.materials} />
              <SupportWidget courseId={courseId as string} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
