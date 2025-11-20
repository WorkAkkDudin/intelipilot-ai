import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Sparkles, Share2 } from "lucide-react";
import ExportDialog from "./ExportDialog";

interface ToolLayoutProps {
  title: string;
  description: string;
  inputSection: ReactNode;
  outputSection: ReactNode;
  onGenerate: () => void;
  onImport?: () => void;
  onExport?: () => void;
  isLoading?: boolean;
  hasResult?: boolean;
  toolName: string;
  resultData?: string;
}

const ToolLayout = ({ 
  title, 
  description, 
  inputSection, 
  outputSection, 
  onGenerate, 
  onImport,
  onExport,
  isLoading = false,
  hasResult = false,
  toolName,
  resultData = ""
}: ToolLayoutProps) => {
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  const handleExport = () => {
    if (onExport) {
      onExport();
    }
    setExportDialogOpen(true);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-8 border-b border-border bg-card">
        <h2 className="text-2xl font-semibold text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div className="flex-1 grid grid-cols-[35%_65%] gap-0 overflow-hidden">
        <div className="border-r border-border bg-background p-8 overflow-y-auto">
          <div className="space-y-6">
            {inputSection}
            
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={onGenerate} 
                className="flex-1"
                disabled={isLoading}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isLoading ? "Генерация..." : "Сгенерировать"}
              </Button>
              {onImport && (
                <Button 
                  onClick={onImport} 
                  variant="outline"
                  title="Импортировать данные"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              )}
              {hasResult && (
                <Button 
                  onClick={handleExport} 
                  variant="outline"
                  title="Передать в другой инструмент"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-muted/30 p-8 overflow-y-auto">
          <Card className="p-6 min-h-[400px]">
            {outputSection}
          </Card>
        </div>
      </div>

      <ExportDialog 
        open={exportDialogOpen}
        onOpenChange={setExportDialogOpen}
        sourceToolName={toolName}
        data={resultData}
      />
    </div>
  );
};

export default ToolLayout;
