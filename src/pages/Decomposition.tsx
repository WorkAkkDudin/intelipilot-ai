import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Decomposition = () => {
  const [projectGoals, setProjectGoals] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setResult(`# Декомпозиция проекта

## Этапы реализации

### Фаза 1: Подготовка (2 недели)
**Цель**: Сформировать базу для запуска

**Задачи**:
- [ ] Провести анализ ЦА
- [ ] Выполнить кастдев (15 интервью)
- [ ] Провести анализ рынка
- [ ] Создать оффер и УТП
- [ ] Разработать воронку продаж

**Ресурсы**:
- Маркетолог (80 часов)
- Аналитик (40 часов)

### Фаза 2: Разработка MVP (4 недели)
**Цель**: Создать минимальный продукт

**Задачи**:
- [ ] Создать прототип (Figma)
- [ ] Разработать ключевые функции
- [ ] Настроить аналитику
- [ ] Провести внутреннее тестирование

**Ресурсы**:
- Дизайнер (120 часов)
- Разработчик (200 часов)
- QA (60 часов)

### Фаза 3: Тестирование (2 недели)
**Цель**: Проверить гипотезы с реальными пользователями

**Задачи**:
- [ ] Запустить бета-тест (50 пользователей)
- [ ] Собрать обратную связь
- [ ] Провести 10 глубинных интервью
- [ ] Оптимизировать на основе данных

**Ресурсы**:
- Продакт-менеджер (60 часов)
- Аналитик (40 часов)

### Фаза 4: Запуск (3 недели)
**Цель**: Выйти на рынок

**Задачи**:
- [ ] Создать контент-план
- [ ] Настроить рекламные кампании
- [ ] Запустить email-рассылку
- [ ] Провести PR-активности
- [ ] Настроить техподдержку

**Ресурсы**:
- Маркетолог (100 часов)
- Копирайтер (80 часов)
- SMM (60 часов)

## Ресурсный план

### Команда
- Продакт-менеджер: 1 FTE
- Маркетолог: 1 FTE
- Дизайнер: 0.5 FTE
- Разработчик: 1.5 FTE
- Аналитик: 0.5 FTE

### Бюджет
- Разработка: 800,000₽
- Маркетинг: 400,000₽
- Инфраструктура: 50,000₽
- Прочее: 150,000₽
**Итого**: 1,400,000₽

## Прогноз метрик

### 1 месяц
- Трафик: 5,000 визитов
- Регистрации: 250
- Платящие: 25
- MRR: 125,000₽

### 3 месяц
- Трафик: 20,000 визитов
- Регистрации: 1,000
- Платящие: 150
- MRR: 750,000₽

### 6 месяц
- Трафик: 50,000 визитов
- Регистрации: 2,500
- Платящие: 400
- MRR: 2,000,000₽`);
      setIsLoading(false);
    }, 2000);
  };

  const inputSection = (
    <div>
      <Label htmlFor="goals">Цели и задачи проекта</Label>
      <Textarea
        id="goals"
        placeholder="Опишите цели вашего проекта, желаемые результаты и ограничения..."
        value={projectGoals}
        onChange={(e) => setProjectGoals(e.target.value)}
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
          <p>Опишите цели вашего проекта</p>
          <p className="text-sm mt-2">ИИ создаст поэтапный план с задачами и ресурсами</p>
        </div>
      )}
    </div>
  );

  return (
    <ToolLayout
      title="Декомпозиция проекта"
      description="Разбейте проект на этапы с детальными задачами и ресурсным планом"
      inputSection={inputSection}
      outputSection={outputSection}
      onGenerate={handleGenerate}
      onImport={() => console.log("Import data")}
      isLoading={isLoading}
    />
  );
};

export default Decomposition;
