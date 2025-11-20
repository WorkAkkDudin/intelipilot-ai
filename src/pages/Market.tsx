import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToolData } from "@/contexts/ToolDataContext";
import { useToast } from "@/hooks/use-toast";

const Market = () => {
  const [industry, setIndustry] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toolData, clearToolData } = useToolData();
  const { toast } = useToast();

  useEffect(() => {
    if (toolData) {
      setCompetitors(prev => 
        prev ? `${prev}\n\n--- Импортированные данные из ${toolData.sourceToolName} ---\n${toolData.data}` 
        : `--- Импортированные данные из ${toolData.sourceToolName} ---\n${toolData.data}`
      );
      toast({
        title: "Данные импортированы",
        description: `Данные из ${toolData.sourceToolName} добавлены в конкурентов`,
      });
      clearToolData();
    }
  }, [toolData, clearToolData, toast]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setResult(`# Анализ рынка: ${industry}

## Обзор рынка
Рынок маркетинговых инструментов активно растёт. Ожидаемый CAGR 2024-2028: 18%.

## SWOT-анализ

### Strengths (Сильные стороны)
- Интеграция AI в инструменты
- Понятный интерфейс
- Комплексное решение

### Weaknesses (Слабые стороны)
- Новый продукт на рынке
- Ограниченная функциональность на старте
- Необходимость обучения пользователей

### Opportunities (Возможности)
- Рост спроса на автоматизацию
- Переход бизнеса в онлайн
- Нехватка доступных инструментов для малого бизнеса

### Threats (Угрозы)
- Конкуренция с крупными игроками
- Быстрое развитие технологий
- Высокая стоимость привлечения клиентов

## Конкурентный анализ

### Конкурент 1: HubSpot
- **Сильные стороны**: Узнаваемость бренда, широкая функциональность
- **Слабые стороны**: Высокая цена, сложность для новичков
- **Цена**: От $50/мес

### Конкурент 2: Notion
- **Сильные стороны**: Гибкость, популярность
- **Слабые стороны**: Не специализирован под маркетинг
- **Цена**: От $10/мес

## Тренды
- AI-автоматизация маркетинга
- No-code решения
- Персонализация контента
- Омниканальность`);
      setIsLoading(false);
    }, 2000);
  };

  const inputSection = (
    <>
      <div>
        <Label htmlFor="industry">Индустрия/ниша</Label>
        <Input
          id="industry"
          placeholder="Например: SaaS для маркетологов"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="mt-2"
        />
      </div>
      
      <div>
        <Label htmlFor="competitors">Основные конкуренты</Label>
        <Textarea
          id="competitors"
          placeholder="Перечислите известных вам конкурентов через запятую..."
          value={competitors}
          onChange={(e) => setCompetitors(e.target.value)}
          className="mt-2 min-h-[200px]"
        />
      </div>
    </>
  );

  const outputSection = (
    <div className="prose prose-sm max-w-none">
      {result ? (
        <div className="whitespace-pre-wrap">{result}</div>
      ) : (
        <div className="text-center text-muted-foreground py-12">
          <p>Укажите индустрию и конкурентов</p>
          <p className="text-sm mt-2">ИИ проведёт анализ рынка и конкурентов</p>
        </div>
      )}
    </div>
  );

  const handleImport = () => {
    // Import is handled by useEffect
  };

  return (
    <ToolLayout
      title="Анализ рынка"
      description="Получите детальный анализ рынка, конкурентов и трендов в вашей нише"
      inputSection={inputSection}
      outputSection={outputSection}
      onGenerate={handleGenerate}
      onImport={handleImport}
      isLoading={isLoading}
      hasResult={!!result}
      toolName="Анализ рынка"
      resultData={result}
    />
  );
};

export default Market;
