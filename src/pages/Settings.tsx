import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Settings = () => {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gpt-4");

  const handleSave = () => {
    toast.success("Настройки сохранены");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">Настройки</h1>
        <p className="text-muted-foreground">Управление API ключами и параметрами</p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">API Ключи</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="api-key">OpenAI API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Получите ключ на platform.openai.com
              </p>
            </div>

            <div>
              <Label htmlFor="model">Модель</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSave}>
              Сохранить настройки
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">О платформе</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Маркетинговый ИИ-Комбайн — платформа для профессиональной маркетинговой аналитики с AI-автоматизацией.
            </p>
            <p>
              Все данные хранятся безопасно и не передаются третьим лицам.
            </p>
            <p className="font-medium text-foreground">
              Версия: 1.0.0
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
