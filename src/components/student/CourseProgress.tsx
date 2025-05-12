
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  course: any; // Using any for simplicity, ideally should be typed properly
  currentLessonId: string;
  onLessonSelect: (lessonId: string) => void;
  onToggleComplete: (lessonId: string) => void;
}

export function CourseProgress({ 
  course, 
  currentLessonId, 
  onLessonSelect, 
  onToggleComplete 
}: CourseProgressProps) {
  // Calculate overall progress
  const totalLessons = course.lessons.length;
  const completedLessons = course.lessons.filter(
    (lesson: any) => lesson.completed
  ).length;
  const progressPercentage = (completedLessons / totalLessons) * 100;
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Aulas do Curso</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1.5 mb-6">
          <div className="flex justify-between text-sm">
            <span>Progresso total</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="space-y-1">
          {course.lessons.map((lesson: any, index: number) => (
            <div 
              key={lesson.id}
              className={cn(
                "flex items-start gap-3 p-2.5 rounded-md transition-colors cursor-pointer",
                currentLessonId === lesson.id 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-secondary/5"
              )}
              onClick={() => onLessonSelect(lesson.id)}
            >
              <div className="flex-shrink-0 mt-0.5">
                <div 
                  className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium",
                    lesson.completed 
                      ? "bg-primary text-primary-foreground" 
                      : "border border-muted-foreground/30"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleComplete(lesson.id);
                  }}
                >
                  {lesson.completed ? <Check className="h-3.5 w-3.5" /> : index + 1}
                </div>
              </div>
              <div className="flex-1 text-sm">
                <p className={cn(
                  "font-medium line-clamp-2",
                  lesson.completed && "text-muted-foreground"
                )}>
                  {lesson.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{lesson.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
