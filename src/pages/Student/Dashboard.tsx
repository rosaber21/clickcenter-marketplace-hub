
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Award, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
import { mockCourseData } from "@/data/mockCourseData";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Calculate course progress
  const calculateProgress = (course: typeof mockCourseData[0]) => {
    const totalLessons = course.lessons.length;
    const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
    return (completedLessons / totalLessons) * 100;
  };

  const handleContinueCourse = (courseId: string, lessonId?: string) => {
    if (lessonId) {
      navigate(`/aluno/curso/${courseId}/aula/${lessonId}`);
      toast({
        title: "Continuando curso",
        description: "Carregando próxima aula",
        variant: "success",
      });
    } else {
      navigate(`/aluno/curso/${courseId}`);
      toast({
        title: "Visualizando curso",
        description: "Carregando detalhes do curso",
        variant: "success",
      });
    }
  };

  const handleViewAllCourses = () => {
    navigate("/aluno/cursos");
    toast({
      title: "Todos os cursos",
      description: "Visualizando biblioteca completa de cursos",
      variant: "success",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Cursos</h1>
          <p className="text-muted-foreground">
            Continue de onde parou em seus cursos.
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleViewAllCourses}
          className="mt-2 sm:mt-0 gap-1"
        >
          <ExternalLink className="h-4 w-4" />
          Ver Todos os Cursos
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourseData.map((course) => {
          const progress = calculateProgress(course);
          const nextLesson = course.lessons.find(lesson => !lesson.completed);
          
          return (
            <Card key={course.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div 
                className="h-48 bg-cover bg-center cursor-pointer" 
                style={{ backgroundImage: `url(${course.coverImage})` }}
                onClick={() => handleContinueCourse(course.id)}
              />
              <CardHeader className="pb-2">
                <CardTitle className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleContinueCourse(course.id)}>
                  {course.title}
                </CardTitle>
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
                  <Progress value={progress} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                {nextLesson ? (
                  <Button 
                    className="w-full gap-1"
                    onClick={() => handleContinueCourse(course.id, nextLesson.id)}
                  >
                    <BookOpen className="h-4 w-4" />
                    Continuar Assistindo
                  </Button>
                ) : (
                  <Button 
                    className="w-full gap-1" 
                    variant="secondary"
                    onClick={() => handleContinueCourse(course.id)}
                  >
                    <Award className="h-4 w-4" /> Curso Concluído
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
