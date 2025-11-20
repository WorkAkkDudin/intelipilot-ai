-- ============================================
-- InteliPilot AI - Supabase Database Setup
-- ============================================
-- Выполните этот скрипт в Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Вставьте код → Run
-- ============================================

-- 1. СОЗДАНИЕ ТАБЛИЦ
-- ============================================

-- Таблица: profiles (профили пользователей)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Таблица: projects (маркетинговые проекты)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enum: tool_name (названия инструментов)
DO $$ BEGIN
  CREATE TYPE tool_name AS ENUM (
    'audience',
    'custdev',
    'market',
    'offer',
    'funnel',
    'decomposition'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Таблица: tool_results (результаты работы AI инструментов)
CREATE TABLE IF NOT EXISTS public.tool_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  tool_name tool_name NOT NULL,
  input_data JSONB,
  output_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. ИНДЕКСЫ (для быстрого поиска)
-- ============================================

-- Индексы для profiles
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);

-- Индексы для projects
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);

-- Индексы для tool_results
CREATE INDEX IF NOT EXISTS idx_tool_results_project_id ON public.tool_results(project_id);
CREATE INDEX IF NOT EXISTS idx_tool_results_tool_name ON public.tool_results(tool_name);
CREATE INDEX IF NOT EXISTS idx_tool_results_created_at ON public.tool_results(created_at DESC);

-- ============================================
-- 3. ТРИГГЕРЫ (автоматические действия)
-- ============================================

-- Функция: автоматическое обновление updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер для profiles
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Триггер для projects
DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Триггер для tool_results
DROP TRIGGER IF EXISTS update_tool_results_updated_at ON public.tool_results;
CREATE TRIGGER update_tool_results_updated_at
  BEFORE UPDATE ON public.tool_results
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Функция: автоматическое создание профиля при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Триггер: создание профиля при регистрации
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Включить RLS для всех таблиц
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_results ENABLE ROW LEVEL SECURITY;

-- ===== ПОЛИТИКИ ДЛЯ PROFILES =====

-- Пользователь может видеть только свой профиль
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Пользователь может обновлять только свой профиль
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = user_id);

-- ===== ПОЛИТИКИ ДЛЯ PROJECTS =====

-- Пользователь может видеть только свои проекты
DROP POLICY IF EXISTS "Users can view own projects" ON public.projects;
CREATE POLICY "Users can view own projects"
  ON public.projects
  FOR SELECT
  USING (auth.uid()::text = user_id::text OR user_id = 'temp-user-id');

-- Пользователь может создавать свои проекты
DROP POLICY IF EXISTS "Users can create own projects" ON public.projects;
CREATE POLICY "Users can create own projects"
  ON public.projects
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id::text OR user_id = 'temp-user-id');

-- Пользователь может обновлять свои проекты
DROP POLICY IF EXISTS "Users can update own projects" ON public.projects;
CREATE POLICY "Users can update own projects"
  ON public.projects
  FOR UPDATE
  USING (auth.uid()::text = user_id::text OR user_id = 'temp-user-id');

-- Пользователь может удалять свои проекты
DROP POLICY IF EXISTS "Users can delete own projects" ON public.projects;
CREATE POLICY "Users can delete own projects"
  ON public.projects
  FOR DELETE
  USING (auth.uid()::text = user_id::text OR user_id = 'temp-user-id');

-- ===== ПОЛИТИКИ ДЛЯ TOOL_RESULTS =====

-- Пользователь может видеть результаты своих проектов
DROP POLICY IF EXISTS "Users can view results of own projects" ON public.tool_results;
CREATE POLICY "Users can view results of own projects"
  ON public.tool_results
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = tool_results.project_id
      AND (projects.user_id::text = auth.uid()::text OR projects.user_id = 'temp-user-id')
    )
  );

-- Пользователь может создавать результаты для своих проектов
DROP POLICY IF EXISTS "Users can create results for own projects" ON public.tool_results;
CREATE POLICY "Users can create results for own projects"
  ON public.tool_results
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = tool_results.project_id
      AND (projects.user_id::text = auth.uid()::text OR projects.user_id = 'temp-user-id')
    )
  );

-- Пользователь может обновлять результаты своих проектов
DROP POLICY IF EXISTS "Users can update results of own projects" ON public.tool_results;
CREATE POLICY "Users can update results of own projects"
  ON public.tool_results
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = tool_results.project_id
      AND (projects.user_id::text = auth.uid()::text OR projects.user_id = 'temp-user-id')
    )
  );

-- Пользователь может удалять результаты своих проектов
DROP POLICY IF EXISTS "Users can delete results of own projects" ON public.tool_results;
CREATE POLICY "Users can delete results of own projects"
  ON public.tool_results
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = tool_results.project_id
      AND (projects.user_id::text = auth.uid()::text OR projects.user_id = 'temp-user-id')
    )
  );

-- ============================================
-- 5. ТЕСТОВЫЕ ДАННЫЕ (опционально)
-- ============================================

-- Вставить тестовый проект (для разработки)
-- Раскомментируйте, если хотите добавить тестовые данные

/*
INSERT INTO public.projects (user_id, name, description)
VALUES
  ('temp-user-id', 'Тестовый проект 1', 'Описание тестового проекта'),
  ('temp-user-id', 'Тестовый проект 2', 'Еще один тестовый проект')
ON CONFLICT DO NOTHING;

-- Получить ID первого проекта для теста
DO $$
DECLARE
  test_project_id UUID;
BEGIN
  SELECT id INTO test_project_id
  FROM public.projects
  WHERE name = 'Тестовый проект 1'
  LIMIT 1;

  -- Вставить тестовый результат
  IF test_project_id IS NOT NULL THEN
    INSERT INTO public.tool_results (project_id, tool_name, input_data, output_data)
    VALUES (
      test_project_id,
      'audience',
      '{"productName": "CRM система", "description": "Система для управления клиентами"}'::jsonb,
      '{"segments": ["Малый бизнес", "Стартапы"], "channels": ["LinkedIn", "Email"]}'::jsonb
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
*/

-- ============================================
-- 6. КОММЕНТАРИИ К ТАБЛИЦАМ
-- ============================================

COMMENT ON TABLE public.profiles IS 'Профили пользователей приложения';
COMMENT ON TABLE public.projects IS 'Маркетинговые проекты пользователей';
COMMENT ON TABLE public.tool_results IS 'Результаты работы AI-инструментов (Audience, Custdev, Market, Offer, Funnel, Decomposition)';

COMMENT ON COLUMN public.projects.user_id IS 'ID пользователя (может быть temp-user-id для разработки)';
COMMENT ON COLUMN public.tool_results.input_data IS 'JSON с входными данными инструмента';
COMMENT ON COLUMN public.tool_results.output_data IS 'JSON с результатами AI генерации';

-- ============================================
-- ГОТОВО! 🎉
-- ============================================
-- База данных настроена и готова к работе!
--
-- Следующие шаги:
-- 1. Проверьте что все таблицы созданы (Table Editor)
-- 2. Убедитесь что RLS политики активны (Authentication → Policies)
-- 3. При необходимости добавьте тестовые данные (раскомментируйте секцию 5)
-- 4. Обновите TypeScript типы в приложении
-- ============================================
