import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Audience = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    // Здесь будет вызов AI
    setTimeout(() => {
      setResult(`# Анализ целевой аудитории для "${productName}"

## Сегменты аудитории

### Сегмент 1: Активные пользователи
- **Возраст**: 25-35 лет
- **Профессия**: Маркетологи, менеджеры по продукту
- **Боли**: Нехватка времени, необходимость быстрых решений
- **Мотивация**: Эффективность, автоматизация рутинных задач

### Сегмент 2: Малый бизнес
- **Возраст**: 30-45 лет
- **Профессия**: Владельцы бизнеса, предприниматели
- **Боли**: Ограниченный бюджет на маркетинг
- **Мотивация**: ROI, доступность профессиональных инструментов

## Каналы коммуникации
- LinkedIn
- Профессиональные Telegram-каналы
- Email-маркетинг
- Специализированные конференции`);
      setIsLoading(false);
    }, 2000);
  };

  const inputSection = (
    <>
      <div>
        <Label htmlFor="product-name">Название продукта</Label>
        <Input
          id="product-name"
          placeholder="Например: CRM-система для малого бизнеса"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="mt-2"
        />
      </div>
      
      <div>
        <Label htmlFor="product-desc">Описание продукта</Label>
        <Textarea
          id="product-desc"
          placeholder="Опишите ваш продукт, его особенности и преимущества..."
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
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
          <p>Заполните данные слева и нажмите "Сгенерировать"</p>
          <p className="text-sm mt-2">ИИ создаст детальный анализ вашей целевой аудитории</p>
        </div>
      )}
    </div>
  );

  return (
    <ToolLayout
      title="Анализ целевой аудитории"
      description="ИИ проанализирует ваш продукт и определит ключевые сегменты аудитории, их боли и мотивации"
      inputSection={inputSection}
      outputSection={outputSection}
      onGenerate={handleGenerate}
      onImport={() => console.log("Import data")}
      isLoading={isLoading}
    />
  );
};

export default Audience;
