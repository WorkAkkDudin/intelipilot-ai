# Supabase Guide - InteliPilot AI

## 🔌 Подключение

Supabase уже настроен и готов к работе!

**Ваш проект**:
- Project ID: `yearakcidkxachppwvpa`
- URL: https://yearakcidkxachppwvpa.supabase.co
- Dashboard: https://supabase.com/dashboard/project/yearakcidkxachppwvpa

---

## 📊 Структура базы данных

### Таблицы:

1. **profiles** - профили пользователей
2. **projects** - маркетинговые проекты
3. **tool_results** - результаты работы AI инструментов

---

## 💻 Примеры кода

### Импорт клиента

```typescript
import { supabase } from "@/integrations/supabase/client";
```

---

## 1️⃣ РАБОТА С ПРОЕКТАМИ

### Создать проект

```typescript
const createProject = async (name: string, description?: string) => {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      name: name,
      description: description,
      user_id: 'temporary-user-id' // TODO: заменить на реального пользователя
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    return null;
  }

  return data;
};

// Использование:
const newProject = await createProject('Новый продукт', 'Описание проекта');
```

### Получить все проекты

```typescript
const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data;
};

// Использование:
const projects = await getProjects();
```

### Обновить проект

```typescript
const updateProject = async (projectId: string, updates: { name?: string, description?: string }) => {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', projectId)
    .select()
    .single();

  if (error) {
    console.error('Error updating project:', error);
    return null;
  }

  return data;
};

// Использование:
await updateProject('project-id-here', { name: 'Новое название' });
```

### Удалить проект

```typescript
const deleteProject = async (projectId: string) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId);

  if (error) {
    console.error('Error deleting project:', error);
    return false;
  }

  return true;
};
```

---

## 2️⃣ РАБОТА С РЕЗУЛЬТАТАМИ ИНСТРУМЕНТОВ

### Сохранить результат AI генерации

```typescript
const saveToolResult = async (
  projectId: string,
  toolName: 'audience' | 'custdev' | 'market' | 'offer' | 'funnel' | 'decomposition',
  inputData: any,
  outputData: any
) => {
  const { data, error } = await supabase
    .from('tool_results')
    .insert({
      project_id: projectId,
      tool_name: toolName,
      input_data: inputData,
      output_data: outputData
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving tool result:', error);
    return null;
  }

  return data;
};

// Использование:
await saveToolResult(
  'project-id',
  'audience',
  { productName: 'CRM система', description: '...' },
  { segments: [...], channels: [...] }
);
```

### Получить результаты для проекта

```typescript
const getToolResults = async (projectId: string, toolName?: string) => {
  let query = supabase
    .from('tool_results')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false });

  if (toolName) {
    query = query.eq('tool_name', toolName);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching tool results:', error);
    return [];
  }

  return data;
};

// Использование:
const allResults = await getToolResults('project-id');
const audienceResults = await getToolResults('project-id', 'audience');
```

### Обновить результат

```typescript
const updateToolResult = async (resultId: string, outputData: any) => {
  const { data, error } = await supabase
    .from('tool_results')
    .update({ output_data: outputData })
    .eq('id', resultId)
    .select()
    .single();

  if (error) {
    console.error('Error updating tool result:', error);
    return null;
  }

  return data;
};
```

---

## 3️⃣ ИСПОЛЬЗОВАНИЕ С REACT QUERY

### Хук для получения проектов

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });
};

// В компоненте:
const { data: projects, isLoading, error } = useProjects();
```

### Хук для создания проекта

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, description }: { name: string, description?: string }) => {
      const { data, error } = await supabase
        .from('projects')
        .insert({ name, description, user_id: 'temp-user-id' })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Обновить список проектов после создания
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });
};

// В компоненте:
const createProject = useCreateProject();

const handleCreate = () => {
  createProject.mutate({
    name: 'Новый проект',
    description: 'Описание'
  });
};
```

---

## 4️⃣ REALTIME ПОДПИСКИ

### Слушать изменения в проектах

```typescript
import { useEffect } from 'react';

const ProjectsPage = () => {
  useEffect(() => {
    const channel = supabase
      .channel('projects-changes')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects'
        },
        (payload) => {
          console.log('Изменение в проектах:', payload);
          // Обновить UI
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
};
```

---

## 🔐 АУТЕНТИФИКАЦИЯ (TODO)

Сейчас используется `user_id: 'temp-user-id'`.

Когда будет готова аутентификация:

```typescript
// 1. Регистрация
const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  return { data, error };
};

// 2. Вход
const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

// 3. Выход
const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// 4. Получить текущего пользователя
const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// 5. Использовать в запросах
const user = await getUser();
await supabase
  .from('projects')
  .insert({
    name: 'Project',
    user_id: user.id // Реальный ID пользователя
  });
```

---

## 📝 SQL ЗАПРОСЫ

### Через SQL Editor в Dashboard

```sql
-- Получить все проекты с количеством результатов
SELECT
  p.id,
  p.name,
  p.description,
  p.created_at,
  COUNT(tr.id) as results_count
FROM projects p
LEFT JOIN tool_results tr ON tr.project_id = p.id
GROUP BY p.id
ORDER BY p.created_at DESC;

-- Получить последние результаты для каждого инструмента
SELECT DISTINCT ON (tool_name)
  tool_name,
  output_data,
  created_at
FROM tool_results
WHERE project_id = 'your-project-id'
ORDER BY tool_name, created_at DESC;
```

---

## 🔒 ROW LEVEL SECURITY (RLS)

База уже настроена с RLS. Политики безопасности гарантируют:

- Пользователь видит только свои проекты
- Пользователь может изменять только свои данные
- Анонимные пользователи имеют ограниченный доступ

### Посмотреть политики:

Dashboard → Authentication → Policies

---

## 🛠️ ИЗМЕНЕНИЕ СХЕМЫ БАЗЫ ДАННЫХ

### Через Dashboard (UI):

1. Table Editor → выберите таблицу
2. Кликните на "..." → "Edit table"
3. Добавьте/измените колонки
4. Сохраните

### Через SQL Editor:

```sql
-- Добавить колонку
ALTER TABLE projects
ADD COLUMN status TEXT DEFAULT 'active';

-- Изменить колонку
ALTER TABLE projects
ALTER COLUMN description SET NOT NULL;

-- Удалить колонку
ALTER TABLE projects
DROP COLUMN description;

-- Создать индекс
CREATE INDEX idx_projects_user_id
ON projects(user_id);
```

### Обновить TypeScript типы:

После изменения схемы:

```bash
# Если установлен Supabase CLI
npx supabase gen types typescript --project-id yearakcidkxachppwvpa > src/integrations/supabase/types.ts
```

Или вручную в Dashboard:
- Settings → API → Generate Types

---

## 📊 МОНИТОРИНГ И ЛОГИ

### Database Logs:

Dashboard → Logs → Postgres Logs

### API Usage:

Dashboard → Settings → API → Usage

---

## 💡 ПОЛЕЗНЫЕ ССЫЛКИ

- [Supabase Docs](https://supabase.com/docs)
- [JavaScript Client Docs](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [React Query Integration](https://supabase.com/docs/guides/getting-started/tutorials/with-react)

---

## 🚀 СЛЕДУЮЩИЕ ШАГИ

1. ✅ База данных создана
2. ✅ Клиент настроен
3. ⏳ Интегрировать в Pages (Projects, Audience, и т.д.)
4. ⏳ Добавить аутентификацию
5. ⏳ Настроить RLS политики для реальных пользователей

---

**Дата**: 2025-11-21
**Проект**: InteliPilot AI
**Supabase Project**: yearakcidkxachppwvpa
