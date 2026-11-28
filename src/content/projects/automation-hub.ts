import type { Project } from "./types";

export const automationHub: Project = {
  slug: "automation-hub",
  status: "demo",
  year: 2026,
  services: ["erp-operations", "documents-approvals", "analytics-control"],
  layout: { workflow: "path", capabilities: "solar" },
  moduleIcons: ["eraser", "refresh", "link", "wallet", "file-scan", "list-checks", "messages", "calendar", "alert", "chart"],
  links: {
    demo: "https://automation-hub-portfolio.vercel.app",
    repo: "https://github.com/academ1cian/automation-hub-portfolio",
  },
  stack: ["React", "TypeScript", "IndexedDB"],
  text: {
    ru: {
      name: "Automation Hub",
      kind: "Автоматизация операций",
      stages: ["Очистка", "Синхронизация", "Клиенты", "Сверка", "Исключения", "Отчёт"],
      tagline:
        "Десять связанных инструментов, которые чистят, сверяют и обновляют операционные данные — с предпросмотром каждого изменения.",
      summary:
        "Рабочее пространство операционной команды: очистка выгрузок, синхронизация заказов, сопоставление клиентов, сверка платежей со счетами, обработка документов, массовые изменения, разбор сообщений, планировщик, монитор исключений и конструктор отчётов. Все инструменты работают на общих данных.",
      purpose: [
        "Automation Hub показывает, как автоматизация остаётся под контролем человека. Каждый инструмент начинается с редактируемого ввода, показывает предпросмотр предлагаемых изменений с причинами, даёт выбрать нужные строки и записывает, что произошло на самом деле.",
        "Инструменты не живут по отдельности: строки после очистки уходят в синхронизацию, сверенные платежи меняют остатки по счетам, документ создаёт счёт, а отчёт и монитор исключений сразу видят текущие данные. Спорные случаи не применяются сами и ждут решения проверяющего.",
      ],
      facts: [
        { label: "Тип", value: "Центр автоматизации операций" },
        { label: "Инструменты", value: "10 связанных инструментов на общих данных" },
        { label: "Объём данных", value: "50, 500 или 5 000 заказов на выбор" },
        { label: "Доступ", value: "Открытое демо, данные в браузере" },
      ],
      workflow: [
        {
          actor: "Оператор",
          action: "Вставляет выгрузку заказов в «Очистку данных».",
          result: "Пробелы и форматы нормализованы, дубли и нулевые суммы отделены, исходник сохранён.",
        },
        {
          actor: "Синхронизация",
          action: "Сопоставляет колонки и сравнивает заказы по стабильным ID.",
          result: "Предпросмотр вставок и обновлений; неверные клиенты, даты, суммы и статусы отклоняются.",
        },
        {
          actor: "Оператор",
          action: "Сводит названия компаний в «Сопоставлении клиентов».",
          result: "Точные совпадения применяются, спорные ждут решения; одобренные псевдонимы запоминаются.",
        },
        {
          actor: "Бухгалтер",
          action: "Сверяет поступившие платежи со счетами, в том числе частичные.",
          result: "Переплата, чужой клиент и повторное применение блокируются, остатки по счетам обновляются.",
        },
        {
          actor: "Монитор исключений",
          action: "Прогоняет пять проверок по заказам и счетам.",
          result: "Проблемы попадают в реестр со ссылкой на исходную запись и решением проверяющего.",
        },
        {
          actor: "Руководитель",
          action: "Собирает отчёт по периоду, клиенту, ответственному и статусу.",
          result: "Снимок отчёта сохраняется, каждый запуск инструмента виден в истории с результатом по строкам.",
        },
      ],
      modules: [
        { name: "Очистка данных", brief: "Нормализует вставленные таблицы" },
        { name: "Синхронизация", brief: "Вставки и обновления заказов" },
        { name: "Сопоставление клиентов", brief: "Названия компаний и псевдонимы" },
        { name: "Сверка платежей", brief: "Платежи против остатков счетов" },
        { name: "Документы", brief: "Счета и заказы из PDF с проверкой" },
        { name: "Массовые изменения", brief: "Одно поле в пачке заказов" },
        { name: "Сообщение в действие", brief: "Команды из текста в изменения" },
        { name: "Планировщик", brief: "Расписание без пересечений, ICS" },
        { name: "Монитор исключений", brief: "Пять проверок и реестр проблем" },
        { name: "Конструктор отчётов", brief: "Финансовая сводка и снимки" },
      ],
      strengths: [
        "Каждый инструмент сначала показывает предпросмотр с причинами; применяются только выбранные строки.",
        "Записи не меняются до решения: спорные случаи ждут человека.",
        "Инструменты работают на общих данных: изменения одного сразу видят остальные и отчёты.",
        "Устаревший предпросмотр или вторая вкладка не перезапишут свежие данные — система сверяет ревизию.",
        "Каждый запуск оставляет квитанцию: ввод, решение по каждой строке и итог.",
        "Изменение суммы заказа не меняет молча уже выставленный счёт.",
      ],
      benefits: [
        "Чистка и сверка данных занимают минуты вместо ручной работы в таблицах.",
        "Ошибки ловятся до того, как попадут в учёт.",
        "Видно, кто что запускал и что именно изменилось.",
        "Расписание выгружается в CSV и ICS, отчёты — в CSV и на печать.",
      ],
      limits: [
        "Документы — заранее подготовленные PDF: распознавание произвольных файлов не реализовано.",
        "Сообщения разбираются по поддерживаемым шаблонам, без ИИ.",
        "Данные вымышленные и хранятся в браузере; есть экспорт в JSON, импорта нет.",
        "Подключений к внешним системам нет.",
      ],
      demoAccess:
        "Демо открыто без входа. Данные вымышленные и хранятся в вашем браузере; объём данных и сброс — в настройках.",
      metaDescription:
        "Automation Hub — десять инструментов автоматизации операций: очистка и синхронизация данных, сверка платежей, документы, исключения, планировщик и отчёты. Открытое демо.",
    },
    ro: {
      name: "Automation Hub",
      kind: "Automatizarea operațiunilor",
      stages: ["Curățare", "Sincronizare", "Clienți", "Reconciliere", "Excepții", "Raport"],
      tagline:
        "Zece instrumente conectate care curăță, reconciliază și actualizează datele operaționale — cu previzualizarea fiecărei modificări.",
      summary:
        "Spațiu de lucru pentru echipa operațională: curățarea exporturilor, sincronizarea comenzilor, potrivirea clienților, reconcilierea plăților cu facturile, procesarea documentelor, modificări în masă, interpretarea mesajelor, planificator, monitor de excepții și constructor de rapoarte. Toate instrumentele lucrează pe date comune.",
      purpose: [
        "Automation Hub arată cum automatizarea rămâne sub controlul omului. Fiecare instrument pornește de la o intrare editabilă, arată previzualizarea modificărilor propuse cu motive, permite alegerea rândurilor și înregistrează ce s-a întâmplat de fapt.",
        "Instrumentele nu trăiesc separat: rândurile curățate trec în sincronizare, plățile reconciliate schimbă soldurile facturilor, documentul creează o factură, iar raportul și monitorul de excepții văd imediat datele curente. Cazurile disputate nu se aplică singure și așteaptă decizia verificatorului.",
      ],
      facts: [
        { label: "Tip", value: "Centru de automatizare a operațiunilor" },
        { label: "Instrumente", value: "10 instrumente conectate pe date comune" },
        { label: "Volum de date", value: "50, 500 sau 5 000 de comenzi, la alegere" },
        { label: "Acces", value: "Demo deschis, date în browser" },
      ],
      workflow: [
        {
          actor: "Operator",
          action: "Lipește exportul de comenzi în „Curățarea datelor”.",
          result: "Spațiile și formatele sunt normalizate, dublurile și sumele zero separate, sursa păstrată.",
        },
        {
          actor: "Sincronizare",
          action: "Potrivește coloanele și compară comenzile după ID-uri stabile.",
          result: "Previzualizarea inserărilor și actualizărilor; clienții, datele, sumele și statusurile greșite sunt respinse.",
        },
        {
          actor: "Operator",
          action: "Unifică denumirile companiilor în „Potrivirea clienților”.",
          result: "Potrivirile exacte se aplică, cele disputate așteaptă decizia; aliasurile aprobate se rețin.",
        },
        {
          actor: "Contabil",
          action: "Reconciliază plățile primite cu facturile, inclusiv cele parțiale.",
          result: "Supraplata, clientul greșit și aplicarea repetată sunt blocate, soldurile facturilor se actualizează.",
        },
        {
          actor: "Monitor de excepții",
          action: "Rulează cinci verificări pe comenzi și facturi.",
          result: "Problemele intră în registru cu legătură la înregistrarea sursă și decizia verificatorului.",
        },
        {
          actor: "Conducător",
          action: "Construiește un raport după perioadă, client, responsabil și status.",
          result: "Instantaneul raportului se salvează, fiecare rulare apare în istoric cu rezultatul pe rânduri.",
        },
      ],
      modules: [
        { name: "Curățarea datelor", brief: "Normalizează tabelele lipite" },
        { name: "Sincronizare", brief: "Inserări și actualizări de comenzi" },
        { name: "Potrivirea clienților", brief: "Denumiri de companii și aliasuri" },
        { name: "Reconcilierea plăților", brief: "Plăți față de soldurile facturilor" },
        { name: "Documente", brief: "Facturi și comenzi din PDF, verificate" },
        { name: "Modificări în masă", brief: "Un câmp într-un lot de comenzi" },
        { name: "Mesaj în acțiune", brief: "Comenzi din text în modificări" },
        { name: "Planificator", brief: "Program fără suprapuneri, ICS" },
        { name: "Monitor de excepții", brief: "Cinci verificări și registrul problemelor" },
        { name: "Constructor de rapoarte", brief: "Sinteză financiară și instantanee" },
      ],
      strengths: [
        "Fiecare instrument arată întâi previzualizarea cu motive; se aplică doar rândurile alese.",
        "Înregistrările nu se schimbă până la decizie: cazurile disputate așteaptă omul.",
        "Instrumentele lucrează pe date comune: modificările unuia le văd imediat celelalte și rapoartele.",
        "O previzualizare veche sau o a doua filă nu suprascriu datele noi — sistemul verifică revizia.",
        "Fiecare rulare lasă o chitanță: intrarea, decizia pe fiecare rând și rezultatul.",
        "Modificarea sumei unei comenzi nu schimbă pe tăcute factura deja emisă.",
      ],
      benefits: [
        "Curățarea și reconcilierea datelor durează minute în loc de muncă manuală în tabele.",
        "Erorile sunt prinse înainte să ajungă în evidență.",
        "Se vede cine ce a rulat și ce anume s-a schimbat.",
        "Programul se exportă în CSV și ICS, rapoartele în CSV și la imprimare.",
      ],
      limits: [
        "Documentele sunt PDF-uri pregătite dinainte: recunoașterea fișierelor arbitrare nu este implementată.",
        "Mesajele se interpretează după șabloane acceptate, fără AI.",
        "Datele sunt fictive și se păstrează în browser; există export JSON, fără import.",
        "Nu există conexiuni cu sisteme externe.",
      ],
      demoAccess:
        "Demo deschis fără autentificare. Datele sunt fictive și se păstrează în browserul dvs.; volumul de date și resetarea sunt în setări.",
      metaDescription:
        "Automation Hub — zece instrumente de automatizare a operațiunilor: curățarea și sincronizarea datelor, reconcilierea plăților, documente, excepții, planificator și rapoarte. Demo deschis.",
    },
    en: {
      name: "Automation Hub",
      kind: "Operations automation",
      stages: ["Cleaning", "Sync", "Customers", "Reconciliation", "Exceptions", "Report"],
      tagline:
        "Ten connected tools that clean, reconcile and update operational data, with a preview of every change.",
      summary:
        "A workspace for an operations team: cleaning exports, syncing orders, matching customers, reconciling payments against invoices, processing documents, bulk updates, parsing messages, a schedule builder, an exception monitor and a report builder. Every tool works on shared data.",
      purpose: [
        "Automation Hub shows how automation stays under human control. Each tool starts with editable input, previews the proposed changes with reasons, lets you pick the rows to apply and records what actually happened.",
        "The tools aren't isolated: cleaned rows go to sync, reconciled payments change invoice balances, a document creates an invoice, and the report and exception monitor see current data right away. Disputed cases are never applied on their own and wait for a reviewer's decision.",
      ],
      facts: [
        { label: "Type", value: "Operations automation hub" },
        { label: "Tools", value: "10 connected tools on shared data" },
        { label: "Data volume", value: "50, 500 or 5,000 orders to choose from" },
        { label: "Access", value: "Open demo, data stays in the browser" },
      ],
      workflow: [
        {
          actor: "Operator",
          action: "Pastes an order export into Data Cleaner.",
          result: "Whitespace and formats are normalized, duplicates and zero amounts set aside, the original kept.",
        },
        {
          actor: "Record Sync",
          action: "Maps columns and compares orders by stable IDs.",
          result: "A preview of inserts and updates; invalid customers, dates, amounts and statuses are rejected.",
        },
        {
          actor: "Operator",
          action: "Resolves company names in Customer Matching.",
          result: "Exact matches apply, ambiguous ones wait for review; approved aliases are remembered.",
        },
        {
          actor: "Accountant",
          action: "Reconciles incoming payments against invoices, partial ones included.",
          result: "Overpayments, customer mismatches and double application are blocked; invoice balances update.",
        },
        {
          actor: "Exception Monitor",
          action: "Runs five checks across orders and invoices.",
          result: "Issues land in a register linked to the source record, with the reviewer's resolution.",
        },
        {
          actor: "Manager",
          action: "Builds a report by period, customer, owner and status.",
          result: "A report snapshot is saved, and every tool run appears in history with per-row outcomes.",
        },
      ],
      modules: [
        { name: "Data Cleaner", brief: "Normalizes pasted tables" },
        { name: "Record Sync", brief: "Order inserts and updates" },
        { name: "Customer Matching", brief: "Company names and aliases" },
        { name: "Payment Reconciliation", brief: "Payments against invoice balances" },
        { name: "Document Processing", brief: "Invoices and POs from PDFs, reviewed" },
        { name: "Bulk Updates", brief: "One field across a batch of orders" },
        { name: "Message to Action", brief: "Text instructions into changes" },
        { name: "Schedule Builder", brief: "Overlap-free agenda, ICS export" },
        { name: "Exception Monitor", brief: "Five checks and an issue register" },
        { name: "Report Builder", brief: "Financial summary and snapshots" },
      ],
      strengths: [
        "Every tool shows a preview with reasons first; only the selected rows are applied.",
        "Records stay unchanged until a decision: disputed cases wait for a person.",
        "Tools share one dataset: changes made by one are seen immediately by the others and by reports.",
        "A stale preview or a second tab can't overwrite newer data; the system checks the revision.",
        "Every run leaves a receipt: the input, the decision on each row and the result.",
        "Changing an order amount doesn't silently change an invoice that's already issued.",
      ],
      benefits: [
        "Cleaning and reconciling data takes minutes instead of manual spreadsheet work.",
        "Errors are caught before they reach your records.",
        "You can see who ran what and exactly what changed.",
        "Schedules export to CSV and ICS; reports to CSV and print.",
      ],
      limits: [
        "Documents are prepared sample PDFs: extracting arbitrary files isn't implemented.",
        "Messages are parsed with supported patterns, without AI.",
        "Data is fictional and stays in the browser; JSON export exists, import doesn't.",
        "There are no connections to external systems.",
      ],
      demoAccess:
        "Open demo with no sign-in. Data is fictional and stays in your browser; dataset size and reset are in Settings.",
      metaDescription:
        "Automation Hub is ten operations automation tools: data cleaning and sync, payment reconciliation, documents, exceptions, scheduling and reports. Open demo.",
    },
  },
};
