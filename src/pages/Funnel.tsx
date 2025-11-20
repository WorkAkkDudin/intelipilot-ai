import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToolData } from "@/contexts/ToolDataContext";
import { useToast } from "@/hooks/use-toast";

const Funnel = () => {
  const [businessModel, setBusinessModel] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toolData, clearToolData } = useToolData();
  const { toast } = useToast();

  useEffect(() => {
    if (toolData) {
      setBusinessModel(prev => 
        prev ? `${prev}\n\n--- Импортированные данные из ${toolData.sourceToolName} ---\n${toolData.data}` 
        : `--- Импортированные данные из ${toolData.sourceToolName} ---\n${toolData.data}`
      );
      toast({
        title: "Данные импортированы",
        description: `Данные из ${toolData.sourceToolName} добавлены в бизнес-модель`,
      });
      clearToolData();
    }
  }, [toolData, clearToolData, toast]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setResult(`# Схема воронки продаж

## Customer Journey Map

### Этап 1: Осведомленность
**Точки контакта**: Социальные сети, блог, реклама  
**Действия пользователя**: Видит рекламу, читает статью  
**Эмоции**: Интерес, любопытство  
**Цель**: Привлечь внимание

### Этап 2: Интерес
**Точки контакта**: Лендинг, бесплатный контент  
**Действия пользователя**: Изучает информацию о продукте  
**Эмоции**: Заинтересованность, сомнения  
**Цель**: Показать ценность

### Этап 3: Решение
**Точки контакта**: Демо, кейсы, отзывы  
**Действия пользователя**: Сравнивает с конкурентами  
**Эмоции**: Обдумывание, оценка  
**Цель**: Убедить в выборе

### Этап 4: Действие
**Точки контакта**: Регистрация, онбординг  
**Действия пользователя**: Покупка/подписка  
**Эмоции**: Удовлетворение, предвкушение  
**Цель**: Конверсия

### Этап 5: Удержание
**Точки контакта**: Email, поддержка, обновления  
**Действия пользователя**: Использует продукт  
**Эмоции**: Довольство, привычка  
**Цель**: Повторные покупки

## Метрики воронки

| Этап | Конверсия | Действие |
|------|-----------|----------|
| Трафик → Лид | 2-5% | Улучшить оффер |
| Лид → Регистрация | 15-25% | Упростить форму |
| Регистрация → Активация | 40-60% | Онбординг |
| Активация → Оплата | 10-15% | Trial период |
| Оплата → Повтор | 60-80% | Retention |

## Рекомендации по оптимизации

1. **Верх воронки**: Создать lead-магнит (чек-лист/шаблон)
2. **Середина воронки**: Автоматизировать email-последовательность
3. **Низ воронки**: Добавить urgency (ограниченное предложение)
4. **Retention**: Внедрить систему онбординга на 7 дней`);
      setIsLoading(false);
    }, 2000);
  };

  const inputSection = (
    <div>
      <Label htmlFor="model">Описание бизнес-модели</Label>
      <Textarea
        id="model"
        placeholder="Опишите вашу бизнес-модель, как клиенты узнают о вас и совершают покупку..."
        value={businessModel}
        onChange={(e) => setBusinessModel(e.target.value)}
        className="mt-2 min-h-[300px]"
      />
    </div>
  );

  const outputSection = (
    <div className="prose prose-sm max-w-none">
      {result ? (
        <div className="whitespace-pre-wrap">{result}</div>
      ) : (
        <div className="text-center text-muted-foreground py-12">
          <p>Опишите вашу бизнес-модель</p>
          <p className="text-sm mt-2">ИИ построит Customer Journey Map и воронку продаж</p>
        </div>
      )}
    </div>
  );

  const handleImport = () => {
    // Import is handled by useEffect
  };

  return (
    <ToolLayout
      title="Схема воронки"
      description="Постройте полную карту пути клиента с точками контакта и метриками"
      inputSection={inputSection}
      outputSection={outputSection}
      onGenerate={handleGenerate}
      onImport={handleImport}
      isLoading={isLoading}
      hasResult={!!result}
      toolName="Воронка"
      resultData={result}
    />
  );
};

export default Funnel;
