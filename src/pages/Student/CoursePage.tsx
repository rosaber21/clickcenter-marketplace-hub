
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { VideoPlayer } from "@/components/student/VideoPlayer";
import { CourseProgress } from "@/components/student/CourseProgress";
import { LessonComments } from "@/components/student/LessonComments";
import { LessonNavigation } from "@/components/student/LessonNavigation";
import { SupplementaryMaterials } from "@/components/student/SupplementaryMaterials";
import { SupportWidget } from "@/components/student/SupportWidget";
import { Settings, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for demonstration
import { mockCourseData } from "@/data/mockCourseData";

export default function CoursePage() {
  const { courseId, lessonId } = useParams();
  const [currentCourse, setCurrentCourse] = useState(() => {
    return mockCourseData.find(course => course.id === courseId) || mockCourseData[0];
  });
  
  const [currentLesson, setCurrentLesson] = useState(() => {
    const lesson = currentCourse?.lessons.find(lesson => lesson.id === lessonId);
    return lesson || currentCourse?.lessons[0];
  });
  
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Handle lesson completion toggle
  const toggleLessonCompletion = (lessonId: string) => {
    setCurrentCourse(prevCourse => {
      if (!prevCourse) return prevCourse;
      
      const updatedLessons = prevCourse.lessons.map(lesson => 
        lesson.id === lessonId 
          ? { ...lesson, completed: !lesson.completed } 
          : lesson
      );
      
      return { ...prevCourse, lessons: updatedLessons };
    });
  };

  // Handle lesson navigation
  const navigateToLesson = (lessonId: string) => {
    const lesson = currentCourse?.lessons.find(lesson => lesson.id === lessonId);
    if (lesson) {
      setCurrentLesson(lesson);
    }
  };

  // Handle like toggle
  const toggleLike = () => {
    if (!currentLesson) return;
    
    setCurrentLesson(prevLesson => ({
      ...prevLesson,
      liked: !prevLesson.liked
    }));
  };

  if (!currentCourse || !currentLesson) {
    return <div className="text-center py-10">Curso ou aula não encontrados</div>;
  }

  // Format module and lesson information
  const moduleInfo = currentCourse.title;
  const lessonInfo = `Aula ${currentLesson.order || 1} - ${currentLesson.title}`;

  return (
    <div className="flex h-screen bg-background">
      {/* Right sidebar with lesson list */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-muted/30 border-l transition-all duration-300 overflow-hidden flex flex-col h-screen fixed right-0 top-0`}>
        <div className="p-4 bg-muted/50 border-b flex justify-between items-center">
          <h3 className="font-semibold text-lg">Lista de Conteúdos</h3>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => {}}
              className="h-8 w-8"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="relative">
            <input
              type="search"
              placeholder="Buscar conteúdo"
              className="w-full border rounded-md pl-3 pr-8 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
            <div className="absolute right-3 top-2.5 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <CourseProgress 
            course={currentCourse}
            currentLessonId={currentLesson.id}
            onLessonSelect={navigateToLesson}
            onToggleComplete={toggleLessonCompletion}
          />
        </div>
      </div>

      {/* Main content */}
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'mr-80' : 'mr-0'} transition-all duration-300`}>
        {/* Course info header */}
        <div className="bg-background border-b p-4 shadow-sm">
          <div className="text-sm text-muted-foreground">{moduleInfo}</div>
          <h1 className="text-2xl font-bold">{lessonInfo}</h1>
        </div>

        {/* Video player and content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 space-y-6">
            <VideoPlayer 
              title={currentLesson.title}
              videoUrl={currentLesson.videoUrl} 
              onComplete={() => toggleLessonCompletion(currentLesson.id)}
            />
            
            <LessonNavigation
              currentLesson={currentLesson}
              lessons={currentCourse.lessons}
              onNavigate={navigateToLesson}
            />
            
            {!sidebarOpen && (
              <Button 
                variant="outline" 
                className="mb-4"
                onClick={() => setSidebarOpen(true)}
              >
                Mostrar lista de conteúdos
              </Button>
            )}
            
            <LessonComments 
              lessonId={currentLesson.id}
              comments={currentLesson.comments || []}
              liked={currentLesson.liked}
              onLikeToggle={toggleLike}
            />
            
            <SupplementaryMaterials 
              materials={currentLesson.materials || []} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
