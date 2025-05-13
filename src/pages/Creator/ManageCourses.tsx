
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Book, 
  Plus, 
  Settings, 
  Users, 
  Video, 
  FileText, 
  Search,
  Edit,
  Copy,
  Trash,
  Eye
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockCourseData } from "@/data/mockCourseData";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

export default function ManageCourses() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("principal");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCourses(mockCourseData.map(course => course.id));
    } else {
      setSelectedCourses([]);
    }
  };
  
  const handleSelectCourse = (courseId: string, checked: boolean) => {
    if (checked) {
      setSelectedCourses([...selectedCourses, courseId]);
    } else {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    }
  };
  
  const handleEditCourse = (courseId: string) => {
    toast({
      title: "Editando curso",
      description: `Curso ID: ${courseId}`,
    });
  };
  
  const handleDuplicateCourse = (courseId: string) => {
    toast({
      title: "Duplicando curso",
      description: `Curso ID: ${courseId}`,
    });
  };
  
  const handleDeleteCourse = (courseId: string) => {
    toast({
      title: "Excluindo curso",
      description: `Curso ID: ${courseId}`,
      variant: "destructive",
    });
  };
  
  const handleAddContent = () => {
    toast({
      title: "Adicionando conteúdo",
      description: "Funcionalidade em desenvolvimento",
    });
  };
  
  const handleImportContent = () => {
    toast({
      title: "Importando conteúdos",
      description: "Funcionalidade em desenvolvimento",
    });
  };
  
  const handleCreateNew = () => {
    toast({
      title: "Criando novo conteúdo",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const filteredCourses = mockCourseData.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-primary">Gerenciar Cursos</h1>
            <p className="text-muted-foreground">Organize e gerencie todos os seus cursos</p>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                Ative a sua Máquina do Dólar
              </CardTitle>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Como está ficando
              </Button>
            </div>
            
            <div className="text-sm text-green-600 mt-1">Vendas ativas</div>
          </CardHeader>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="principal">Principal</TabsTrigger>
              <TabsTrigger value="adicional">Adicional</TabsTrigger>
              <TabsTrigger value="trilhas">Trilhas</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleAddContent}
              >
                <Plus size={16} />
                Adicionar arquivos
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleImportContent}
              >
                <FileText size={16} />
                Importar conteúdos
              </Button>
              
              <Button 
                className="flex items-center gap-2"
                onClick={handleCreateNew}
              >
                Criar
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Pesquisar nome de módulos" 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center">
              <Checkbox 
                id="select-all" 
                checked={selectedCourses.length === mockCourseData.length}
                onCheckedChange={(checked) => handleSelectAll(checked === true)}
              />
              <label htmlFor="select-all" className="ml-2 text-sm">
                Selecionar tudo
              </label>
            </div>
          </div>
          
          <TabsContent value="principal">
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          id={`course-${course.id}`}
                          checked={selectedCourses.includes(course.id)}
                          onCheckedChange={(checked) => handleSelectCourse(course.id, checked === true)}
                        />
                        <div className="flex items-center gap-3">
                          <Book className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{course.title}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditCourse(course.id)}
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDuplicateCourse(course.id)}
                          title="Duplicar"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteCourse(course.id)}
                          title="Excluir"
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="adicional">
            <Card>
              <CardContent className="pt-6">
                <p>Conteúdo adicional será exibido aqui.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trilhas">
            <Card>
              <CardContent className="pt-6">
                <p>Trilhas de aprendizado serão exibidas aqui.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
