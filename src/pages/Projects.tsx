import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([
    { id: "1", name: "Новый продукт", createdAt: "2024-01-15" },
    { id: "2", name: "Ребрендинг", createdAt: "2024-01-10" },
  ]);
  const [newProjectName, setNewProjectName] = useState("");
  const navigate = useNavigate();

  const createProject = () => {
    if (!newProjectName.trim()) return;
    
    const newProject = {
      id: Date.now().toString(),
      name: newProjectName,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setProjects([newProject, ...projects]);
    setNewProjectName("");
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">Проекты</h1>
        <p className="text-muted-foreground">Управляйте своими маркетинговыми проектами</p>
      </div>

      <Card className="p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Создать новый проект</h3>
        <div className="flex gap-3">
          <Input
            placeholder="Название проекта"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createProject()}
            className="flex-1"
          />
          <Button onClick={createProject}>
            <Plus className="h-4 w-4 mr-2" />
            Создать
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate('/audience')}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FolderOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">{project.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Создан: {new Date(project.createdAt).toLocaleDateString('ru-RU')}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
