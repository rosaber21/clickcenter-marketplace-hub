
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { VideoPlayer } from "@/components/student/VideoPlayer";
import { CourseProgress } from "@/components/student/CourseProgress";
import { LessonComments } from "@/components/student/LessonComments";
import { LessonNavigation } from "@/components/student/LessonNavigation";
import { SupplementaryMaterials } from "@/components/student/SupplementaryMaterials";
import { SupportWidget } from "@/components/student/SupportWidget";

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
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
        
        <LessonComments 
          lessonId={currentLesson.id}
          comments={currentLesson.comments || []}
          liked={currentLesson.liked}
          onLikeToggle={toggleLike}
        />
      </div>
      
      <div className="space-y-6">
        <CourseProgress 
          course={currentCourse}
          currentLessonId={currentLesson.id}
          onLessonSelect={navigateToLesson}
          onToggleComplete={toggleLessonCompletion}
        />
        
        <SupplementaryMaterials 
          materials={currentLesson.materials || []} 
        />
        
        <SupportWidget />
      </div>
    </div>
  );
}
