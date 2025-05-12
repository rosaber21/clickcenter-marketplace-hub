
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LessonNavigationProps {
  currentLesson: any;
  lessons: any[];
  onNavigate: (lessonId: string) => void;
}

export function LessonNavigation({ currentLesson, lessons, onNavigate }: LessonNavigationProps) {
  // Find current lesson index
  const currentIndex = lessons.findIndex(lesson => lesson.id === currentLesson.id);
  const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  
  return (
    <div className="flex justify-between items-center py-2">
      {previousLesson ? (
        <Button
          variant="outline"
          className="flex items-center gap-1"
          onClick={() => onNavigate(previousLesson.id)}
        >
          <ChevronLeft className="h-4 w-4" /> Aula Anterior
        </Button>
      ) : (
        <div /> // Empty div to maintain spacing with flexbox
      )}
      
      {nextLesson ? (
        <Button
          className="flex items-center gap-1"
          onClick={() => onNavigate(nextLesson.id)}
        >
          Próxima Aula <ChevronRight className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="secondary"
          className="flex items-center gap-1"
          onClick={() => {
            // Here you could redirect to course completion page or certificate
          }}
        >
          Finalizar Curso
        </Button>
      )}
    </div>
  );
}
