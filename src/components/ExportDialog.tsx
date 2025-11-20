import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToolData } from "@/contexts/ToolDataContext";
import { Users, MessageSquare, TrendingUp, Gift, Workflow, ListTree } from "lucide-react";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceToolName: string;
  data: string;
}

const tools = [
  { name: "Анализ ЦА", path: "/audience", icon: Users, key: "audience" },
  { name: "CustDev", path: "/custdev", icon: MessageSquare, key: "custdev" },
  { name: "Анализ рынка", path: "/market", icon: TrendingUp, key: "market" },
  { name: "Оффер", path: "/offer", icon: Gift, key: "offer" },
  { name: "Воронка", path: "/funnel", icon: Workflow, key: "funnel" },
  { name: "Декомпозиция", path: "/decomposition", icon: ListTree, key: "decomposition" },
];

const ExportDialog = ({ open, onOpenChange, sourceToolName, data }: ExportDialogProps) => {
  const navigate = useNavigate();
  const { setToolData } = useToolData();

  const handleExport = (targetPath: string) => {
    setToolData({ sourceToolName, data });
    onOpenChange(false);
    navigate(targetPath);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Передать данные в инструмент</DialogTitle>
          <DialogDescription>
            Выберите инструмент, в который хотите передать результаты
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Button
                key={tool.key}
                variant="outline"
                className="h-auto flex-col gap-2 py-4"
                onClick={() => handleExport(tool.path)}
              >
                <Icon className="h-6 w-6" />
                <span className="text-sm">{tool.name}</span>
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
