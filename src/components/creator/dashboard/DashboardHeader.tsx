
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Book, Settings, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  activeCourse: string;
  handleChangeCourse: (courseId: string) => void;
  handleViewPreview: () => void;
  courses: { id: string; title: string }[];
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  activeCourse,
  handleChangeCourse,
  handleViewPreview,
  courses
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-primary">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      
      {/* Course Selection Dropdown */}
      <div className="mt-4 md:mt-0 flex gap-3">
        <Select value={activeCourse} onValueChange={handleChangeCourse}>
          <SelectTrigger className="w-[240px] bg-white border-primary/20">
            <div className="flex items-center gap-2">
              <Book size={18} className="text-primary" />
              <SelectValue placeholder="Selecione um curso" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.id}>
                <div className="flex items-center gap-2">
                  <span>{course.title}</span>
                </div>
              </SelectItem>
            ))}
            <div className="px-2 py-2 border-t mt-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex items-center gap-2"
                onClick={() => navigate("/criador/gerenciar-cursos")}
              >
                <Settings size={16} />
                <span>Gerenciar Cursos</span>
              </Button>
            </div>
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={handleViewPreview}
        >
          <Eye size={16} />
          Como está ficando
        </Button>
      </div>
    </div>
  );
};
