
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Award } from "lucide-react";

// Mock data for demonstration
import { mockCourseData } from "@/data/mockCourseData";

export default function StudentDashboard() {
  // Calculate course progress
  const calculateProgress = (course: typeof mockCourseData[0]) => {
    const totalLessons = course.lessons.length;
    const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
    return (completedLessons / totalLessons) * 100;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meus Cursos</h1>
        <p className="text-muted-foreground">
          Continue de onde parou em seus cursos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourseData.map((course) => {
          const progress = calculateProgress(course);
          const nextLesson = course.lessons.find(lesson => !lesson.completed);
          
          return (
            <Card key={course.id} className="overflow-hidden flex flex-col">
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(${course.coverImage})` }}
              />
              <CardHeader className="pb-2">
                <CardTitle>{course.title}</CardTitle>
                <CardDescription className="flex justify-between">
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" /> 
                    {course.duration}
                  </span>
                  <span className="flex items-center">
                    <BookOpen className="mr-1 h-4 w-4" /> 
                    {course.lessons.length} aulas
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                {nextLesson ? (
                  <Button asChild className="w-full">
                    <Link to={`/aluno/curso/${course.id}/aula/${nextLesson.id}`}>
                      Continuar Assistindo
                    </Link>
                  </Button>
                ) : (
                  <Button asChild className="w-full" variant="secondary">
                    <Link to={`/aluno/curso/${course.id}`}>
                      <Award className="mr-2 h-4 w-4" /> Curso Concluído
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
