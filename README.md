# scutilabs — сайт

Многостраничный B2B-сайт scutilabs на Next.js 16 (App Router) и Tailwind CSS 4. Языки: `ru`, `ro`, `en` — каждая страница доступна по адресу `/{язык}/…`.

## Запуск

```powershell
npm install
Copy-Item .env.example .env.local   # укажите домен и контакты
npm run dev                          # http://localhost:3100
```

Production: `npm run build`, затем `npm run start` (порт 3100). Проверка типов: `npm run typecheck`.

## Где что лежит

| Что | Где |
| --- | --- |
| Тексты интерфейса и страниц | `src/i18n/dictionaries/{ru,ro,en}.ts` |
| Направления (услуги) | `src/content/services.ts` |
| Проекты портфолио | `src/content/projects/` (один файл на проект) |
| ASCII-звезда и карта направлений | `src/components/ascii-star.tsx`, `src/components/star-system.tsx` |
| SEO: метаданные, hreflang, sitemap, OG-картинки | `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/[locale]/og/route.tsx` |

## Новый проект в портфолио

Создайте файл в `src/content/projects/` по образцу соседних и добавьте проект в массив в `index.ts`. Обязательны только название, тип, этапы процесса (из них рисуется созвездие на превью), описание, назначение и факты на трёх языках; процесс, возможности (с иконками `moduleIcons`), сильные стороны — по желанию, пустые секции не выводятся. Поле `layout` выбирает визуал процесса (`relay`, `path`, `orbit`) и возможностей (`icons`, `table`, `solar`). Демо — только ссылка на задеплоенный проект; в `stack` перечисляются технологии работы продукта, без хостинга демо. Страница проекта, карточка в каталоге и запись в sitemap появятся автоматически. `featured: true` выводит проект крупной строкой на главной.

Шрифты для OG-картинок (`src/assets/fonts`) распространяются по лицензии SIL OFL.
