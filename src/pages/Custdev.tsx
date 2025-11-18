import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Custdev = () => {
  const [hypothesis, setHypothesis] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setResult(`# План кастдева

## Гипотезы для проверки
1. Целевая аудитория действительно испытывает описанную боль
2. Предложенное решение соответствует потребностям
3. Пользователи готовы платить за решение

## Сценарий интервью

### Вступление (2-3 мин)
- Представление
- Объяснение цели разговора
- Заверение в конфиденциальности

### Основные вопросы (15-20 мин)

**Блок 1: Текущая ситуация**
- Расскажите о вашей текущей работе с маркетингом
- Какие инструменты вы используете?
- Что занимает больше всего времени?

**Блок 2: Боли и проблемы**
- С какими сложностями вы сталкиваетесь?
- Как часто возникает эта проблема?
- Пытались ли вы её решить?

**Блок 3: Решение**
- Как бы выглядело идеальное решение?
- Что для вас важнее всего?
- Сколько готовы инвестировать?

### Завершение (2-3 мин)
- Благодарность
- Вопрос о готовности протестировать продукт
- Запрос контактов для follow-up

## Метрики успеха
- Минимум 15 интервью
- 70%+ подтверждение проблемы
- 40%+ готовность платить`);
      setIsLoading(false);
    }, 2000);
  };

  const inputSection = (
    <div>
      <Label htmlFor="hypothesis">Ваши гипотезы</Label>
      <Textarea
        id="hypothesis"
        placeholder="Опишите ваши предположения о целевой аудитории, их проблемах и потребностях..."
        value={hypothesis}
        onChange={(e) => setHypothesis(e.target.value)}
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
          <p>Опишите ваши гипотезы для проверки</p>
          <p className="text-sm mt-2">ИИ создаст план интервью и сценарии для кастдева</p>
        </div>
      )}
    </div>
  );

  return (
    <ToolLayout
      title="Кастдев"
      description="Создайте план проверки гипотез через интервью с потенциальными клиентами"
      inputSection={inputSection}
      outputSection={outputSection}
      onGenerate={handleGenerate}
      onImport={() => console.log("Import data")}
      isLoading={isLoading}
    />
  );
};

export default Custdev;
