import { useState, useEffect } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToolData } from "@/contexts/ToolDataContext";
import { useToast } from "@/hooks/use-toast";

const Offer = () => {
  const [productName, setProductName] = useState("");
  const [benefits, setBenefits] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toolData, clearToolData } = useToolData();
  const { toast } = useToast();

  useEffect(() => {
    if (toolData) {
      setBenefits(prev => 
        prev ? `${prev}\n\n--- Импортированные данные из ${toolData.sourceToolName} ---\n${toolData.data}` 
        : `--- Импортированные данные из ${toolData.sourceToolName} ---\n${toolData.data}`
      );
      toast({
        title: "Данные импортированы",
        description: `Данные из ${toolData.sourceToolName} добавлены в преимущества`,
      });
      clearToolData();
    }
  }, [toolData, clearToolData, toast]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setResult(`# Оффер: ${productName}

## Уникальное торговое предложение (УТП)

**Для маркетологов и владельцев бизнеса, которые тратят часы на рутинную аналитику**

Маркетинговый ИИ-Комбайн — это единственная платформа, которая объединяет все этапы маркетингового анализа с AI-автоматизацией, экономя до 20 часов в неделю.

В отличие от разрозненных инструментов, мы даём комплексное решение от анализа ЦА до декомпозиции проекта.

## Формулы оффера

### Формула 1: Проблема-Решение
**Проблема**: Маркетологи тратят десятки часов на создание стратегии  
**Решение**: Наша платформа делает это за 30 минут с помощью AI

### Формула 2: До-После
**До**: 3 недели на разработку маркетинговой стратегии  
**После**: 1 день с автоматизированным анализом

### Формула 3: Ценность
Получите профессиональный маркетинговый анализ стоимостью 50,000₽ всего за 4,900₽/мес

## Позиционирование

"AI-ассистент маркетолога" — платформа, которая заменяет 5 разных инструментов и выполняет работу junior маркетолога

## Слоганы

1. "От идеи до стратегии за один день"
2. "Маркетинг на автопилоте"
3. "Ваш AI-маркетолог всегда на связи"
4. "Комплексный маркетинг в одном окне"

## Ключевые выгоды

✅ Экономия 20+ часов в неделю  
✅ Профессиональный уровень анализа  
✅ Все инструменты в одном месте  
✅ Понятные рекомендации на русском  
✅ Импорт данных между инструментами`);
      setIsLoading(false);
    }, 2000);
  };

  const inputSection = (
    <>
      <div>
        <Label htmlFor="product">Название продукта</Label>
        <Input
          id="product"
          placeholder="Ваш продукт"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="mt-2"
        />
      </div>
      
      <div>
        <Label htmlFor="benefits">Ключевые преимущества</Label>
        <Textarea
          id="benefits"
          placeholder="Перечислите основные преимущества вашего продукта..."
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
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
          <p>Опишите ваш продукт и его преимущества</p>
          <p className="text-sm mt-2">ИИ создаст убедительный оффер с УТП и слоганами</p>
        </div>
      )}
    </div>
  );

  const handleImport = () => {
    // Import is handled by useEffect
  };

  return (
    <ToolLayout
      title="Создание оффера"
      description="Разработайте сильное УТП, позиционирование и привлекательные формулировки"
      inputSection={inputSection}
      outputSection={outputSection}
      onGenerate={handleGenerate}
      onImport={handleImport}
      isLoading={isLoading}
      hasResult={!!result}
      toolName="Оффер"
      resultData={result}
    />
  );
};

export default Offer;
