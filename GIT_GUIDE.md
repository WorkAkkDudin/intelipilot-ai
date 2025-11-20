# Git Шпаргалка для InteliPilot AI

## 📖 ОСНОВНЫЕ КОМАНДЫ

### Проверить статус проекта
```bash
git status
```
Показывает какие файлы изменены, добавлены или удалены.

---

## 📥 ОБНОВЛЕНИЕ ИЗ GITHUB

### Скачать последние изменения
```bash
git pull origin main
```
**Используйте эту команду каждый раз перед началом работы!**

### Посмотреть что изменилось на GitHub (без скачивания)
```bash
git fetch origin
git log HEAD..origin/main --oneline
```

---

## 📤 ЗАГРУЗКА НА GITHUB

### Сохранить все изменения и загрузить
```bash
# 1. Добавить все изменённые файлы
git add .

# 2. Создать коммит с описанием
git commit -m "Описание что вы изменили"

# 3. Загрузить на GitHub
git push origin main
```

### Добавить только конкретный файл
```bash
git add src/pages/Audience.tsx
git commit -m "Update Audience page"
git push origin main
```

---

## 🔍 ПРОСМОТР ИЗМЕНЕНИЙ

### Посмотреть что изменилось в файлах
```bash
# Все незакоммиченные изменения
git diff

# Изменения в конкретном файле
git diff src/App.tsx

# Что готово к коммиту
git diff --staged
```

### История коммитов
```bash
# Последние 10 коммитов (кратко)
git log --oneline -10

# Детальная информация
git log -5

# Красивый граф
git log --oneline --graph --all -10
```

---

## ⚠️ РЕШЕНИЕ ПРОБЛЕМ

### Конфликт при push (кто-то уже запушил изменения)
```bash
# 1. Получить изменения с GitHub
git pull --rebase origin main

# 2. Если есть конфликты - разрешить их в VSCode

# 3. После разрешения конфликтов
git add .
git rebase --continue

# 4. Загрузить изменения
git push origin main
```

### Отменить изменения в файле (если ещё не закоммитили)
```bash
git checkout -- src/pages/Audience.tsx
```

### Убрать файл из staging (после git add)
```bash
git restore --staged src/pages/Audience.tsx
```

### Отменить последний коммит (но оставить изменения)
```bash
git reset --soft HEAD~1
```

---

## 🚀 ТИПИЧНЫЕ СЦЕНАРИИ

### Сценарий 1: Начало рабочего дня
```bash
cd /f/ProjectsAI/intelipilot-ai
git pull origin main
npm run dev
```

### Сценарий 2: Сохранить работу в конце дня
```bash
git add .
git commit -m "Add AI integration for Audience tool"
git push origin main
```

### Сценарий 3: Быстро сохранить изменения
```bash
git add . && git commit -m "Quick fix" && git push origin main
```

### Сценарий 4: Посмотреть изменения перед коммитом
```bash
git status
git diff
git add .
git commit -m "Your message"
git push origin main
```

---

## 🔧 ПОЛЕЗНЫЕ КОМАНДЫ

### Посмотреть список веток
```bash
git branch -a
```

### Переключиться на другую ветку
```bash
git checkout feature-branch
```

### Создать новую ветку
```bash
git checkout -b new-feature
```

### Посмотреть удалённый репозиторий
```bash
git remote -v
```

### Посмотреть разницу между ветками
```bash
git diff main..feature-branch
```

---

## 📝 ХОРОШИЕ ПРАКТИКИ КОММИТОВ

### Правильные сообщения коммитов
```bash
# ✅ Хорошо
git commit -m "Add AI integration for Market analysis tool"
git commit -m "Fix navigation bug in sidebar"
git commit -m "Update database schema for projects table"

# ❌ Плохо
git commit -m "fix"
git commit -m "changes"
git commit -m "update"
```

### Формат сообщений коммитов
```
<тип>: <краткое описание>

Типы:
- feat: Новая функция
- fix: Исправление бага
- docs: Документация
- style: Стили (форматирование, не CSS)
- refactor: Рефакторинг кода
- test: Тесты
- chore: Рутинные задачи (обновление зависимостей)

Примеры:
feat: Add export to PDF functionality
fix: Resolve authentication error on login
docs: Update README with setup instructions
refactor: Simplify ToolLayout component logic
```

---

## ⚡ БЫСТРЫЕ АЛИАСЫ (опционально)

Добавьте эти алиасы для ускорения работы:

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.ps push
git config --global alias.pl pull
git config --global alias.lg "log --oneline --graph --all -20"
```

После этого можно использовать:
```bash
git st      # вместо git status
git pl      # вместо git pull origin main
git ps      # вместо git push origin main
git lg      # вместо git log --oneline --graph --all -20
```

---

## 🎯 ЕЖЕДНЕВНЫЙ WORKFLOW

**Утро (начало работы):**
```bash
git pull origin main
```

**Во время работы (периодически):**
```bash
git add .
git commit -m "Описание изменений"
git push origin main
```

**Перед уходом:**
```bash
git status  # Проверить что всё закоммитили
git push origin main
```

---

## 🆘 ЧАСТЫЕ ОШИБКИ И РЕШЕНИЯ

### "Updates were rejected because the remote contains work..."
```bash
git pull --rebase origin main
git push origin main
```

### "Please commit your changes or stash them before you merge"
```bash
# Вариант 1: Сохранить изменения
git add .
git commit -m "WIP: Save current work"
git pull origin main

# Вариант 2: Временно спрятать изменения
git stash
git pull origin main
git stash pop
```

### "Permission denied (publickey)"
```bash
# Проверьте SSH ключ
ssh -T git@github.com

# Если не работает, используйте HTTPS
git remote set-url origin https://github.com/WorkAkkDudin/intelipilot-ai.git
```

---

## 📞 КУДА ПИСАТЬ КОМАНДЫ?

### Вариант 1: Git Bash (рекомендуется)
1. Откройте **Git Bash** (отдельное приложение)
2. Перейдите в папку проекта: `cd /f/ProjectsAI/intelipilot-ai`
3. Выполняйте команды

### Вариант 2: VSCode Terminal
1. В VSCode нажмите **Ctrl + `** (открыть терминал)
2. Выполняйте команды прямо там

### Вариант 3: Через Claude Code
Просто напишите мне команду, например:
- "Загрузи изменения на GitHub"
- "Обнови проект из GitHub"
- "Посмотри что изменилось"

И я выполню её за вас!

---

## 📚 ДОПОЛНИТЕЛЬНЫЕ РЕСУРСЫ

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet (PDF)](https://education.github.com/git-cheat-sheet-education.pdf)

---

**Последнее обновление**: 2025-11-20
**Проект**: InteliPilot AI
**Repository**: https://github.com/WorkAkkDudin/intelipilot-ai
