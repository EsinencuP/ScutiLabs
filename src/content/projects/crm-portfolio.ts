import type { Project } from "./types";

export const crmPortfolio: Project = {
  slug: "crm-portfolio",
  status: "demo",
  featured: true,
  year: 2026,
  services: ["crm-sales", "documents-approvals", "analytics-control"],
  layout: { workflow: "path", capabilities: "icons" },
  moduleIcons: ["contact", "kanban", "calendar", "mail", "phone", "messages", "workflow", "document", "shield"],
  links: {
    demo: "https://crm-portfolio-omega.vercel.app",
    guide: "https://github.com/EsinencuP/crm-portfolio/blob/master/%D0%98%D0%9D%D0%A1%D0%A2%D0%A0%D0%A3%D0%9A%D0%A6%D0%98%D0%AF.md",
    repo: "https://github.com/EsinencuP/crm-portfolio",
  },
  demoCredentials: { login: "admin@demo.com", password: "admin123" },
  stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Auth.js", "Zod", "BullMQ", "Redis", "TanStack Query", "React Flow", "FullCalendar", "Recharts", "Gmail API", "Microsoft Graph", "Twilio", "WhatsApp Cloud API", "Telegram Bot API", "AI SDK", "OpenAI API"],
  text: {
    ru: {
      name: "CRM Portfolio",
      kind: "CRM с автоматизациями",
      stages: ["Заявка с сайта", "Автоматизация", "Переписка", "Воронка", "Документы", "Аналитика"],
      tagline:
        "Контакты, сделки и вся переписка с клиентом — почта, звонки, WhatsApp и Telegram — в одной CRM с автоматическими сценариями.",
      summary:
        "CRM для отдела продаж: воронка с прогнозом, календарь активностей, почта и звонки из карточки, единый инбокс мессенджеров, формы захвата лидов, визуальный конструктор автоматизаций, предложения, счета и договоры. Публичное демо с тремя ролями.",
      purpose: [
        "CRM Portfolio собирает в одном рабочем пространстве всё, что менеджер делает с клиентом: контакт и компания, сделка в воронке, письма, звонки, переписка в WhatsApp и Telegram, задачи и встречи. История клиента видна целиком, а доступ определяется ролью и правами на конкретную запись.",
        "Рутинные шаги выполняют автоматизации: заявка с формы на сайте создаёт контакт и задачу, смена этапа сделки отправляет письмо или уведомление, внешняя система получает событие через вебхук. Предложения, счета и договоры формируются в CRM с автоматической нумерацией и PDF.",
      ],
      facts: [
        { label: "Тип", value: "CRM, несколько рабочих пространств" },
        { label: "Каналы", value: "Почта, звонки, WhatsApp, Telegram, формы" },
        { label: "Документы", value: "Предложения, счета, договоры" },
        { label: "Доступ", value: "Публичное демо с учебными данными" },
      ],
      workflow: [
        {
          actor: "Посетитель сайта",
          action: "Заполняет форму захвата лида.",
          result: "Заявка проходит защиту от ботов и повторов; контакт создаётся или обновляется.",
        },
        {
          actor: "Автоматизация",
          action: "Срабатывает на событии «новый лид».",
          result: "Ответственный получает задачу, контакт — тег, команда — уведомление.",
        },
        {
          actor: "Менеджер",
          action: "Звонит из карточки, пишет письмо или отвечает в мессенджере.",
          result: "Звонки, письма и сообщения сохраняются в истории контакта.",
        },
        {
          actor: "Менеджер",
          action: "Ведёт сделку по этапам воронки.",
          result: "Взвешенный прогноз выручки пересчитывается по вероятностям этапов.",
        },
        {
          actor: "Менеджер",
          action: "Готовит предложение по каталогу товаров и превращает его в счёт.",
          result: "PDF уходит клиенту с подключённой почты, оплаты фиксируются по счёту.",
        },
        {
          actor: "Руководитель",
          action: "Смотрит панели, отчёты по продажам и журнал аудита.",
          result: "Решения опираются на данные, каждое изменение можно проследить.",
        },
      ],
      modules: [
        { name: "Контакты и компании", brief: "Карточки с историей и ИИ-сводкой" },
        { name: "Воронка сделок", brief: "Канбан, этапы и прогноз" },
        { name: "Активности", brief: "Календарь звонков, встреч и задач" },
        { name: "Почта", brief: "Gmail и Outlook прямо в CRM" },
        { name: "Звонки", brief: "Звонок из карточки и записи" },
        { name: "Единый инбокс", brief: "WhatsApp и Telegram в одном окне" },
        { name: "Автоматизации", brief: "Визуальные сценарии и вебхуки" },
        { name: "Документы", brief: "Предложения, счета, договоры" },
        { name: "Команда и доступ", brief: "Роли, права на записи, аудит" },
      ],
      strengths: [
        "Отправка формы атомарна и защищена от повторов, ботов и всплесков трафика.",
        "Сценарии хранят снимки шагов и контрольные точки и восстанавливаются после сбоя очереди.",
        "Вебхуки ходят только на разрешённые HTTPS-хосты, частные IP-адреса блокируются.",
        "Повторная регистрация оплаты с тем же ключом не создаёт дубль, суммы считаются на сервере в десятичной арифметике.",
        "Права проверяются на уровне рабочего пространства и отдельной записи.",
        "ИИ-функции подключаются ключом и не обязательны для работы CRM.",
      ],
      benefits: [
        "Вся история клиента в одной карточке: менеджер не переключается между почтой, телефоном и мессенджерами.",
        "Новые заявки сразу получают ответственного и задачу.",
        "Прогноз выручки по воронке доступен в любой момент.",
        "Предложение, счёт и договор готовятся в CRM, без ручной вёрстки.",
        "Данные разных команд или компаний разделены по рабочим пространствам.",
      ],
      limits: [
        "Синхронизация почты и автоматизации работают в отдельных фоновых процессах с Redis.",
        "Номер оператора для звонков общий на всё развёртывание; входящая маршрутизация не реализована.",
        "Отметки о подписании договора — ручные, это не электронная подпись.",
        "Учебные учётные записи нельзя использовать с реальными данными клиентов.",
      ],
      demoAccess: "Публичное демо с учебными данными. Не вносите туда реальные сведения о клиентах.",
      metaDescription:
        "CRM Portfolio — CRM с воронкой, почтой, звонками, WhatsApp и Telegram, формами лидов, конструктором автоматизаций, предложениями, счетами и договорами. Публичное демо.",
    },
    ro: {
      name: "CRM Portfolio",
      kind: "CRM cu automatizări",
      stages: ["Cerere de pe site", "Automatizare", "Comunicare", "Pâlnie", "Documente", "Analiză"],
      tagline:
        "Contacte, tranzacții și toată comunicarea cu clientul — e-mail, apeluri, WhatsApp și Telegram — într-un singur CRM cu scenarii automate.",
      summary:
        "CRM pentru echipa de vânzări: pâlnie cu prognoză, calendarul activităților, e-mail și apeluri din fișă, inbox unificat pentru mesagerii, formulare de captare a lead-urilor, constructor vizual de automatizări, oferte, facturi și contracte. Demo public cu trei roluri.",
      purpose: [
        "CRM Portfolio adună într-un singur spațiu de lucru tot ce face managerul cu clientul: contact și companie, tranzacție în pâlnie, e-mailuri, apeluri, conversații în WhatsApp și Telegram, sarcini și întâlniri. Istoricul clientului este vizibil complet, iar accesul depinde de rol și de drepturile pe fiecare înregistrare.",
        "Pașii de rutină îi execută automatizările: cererea din formularul de pe site creează contactul și sarcina, schimbarea etapei trimite un e-mail sau o notificare, un sistem extern primește evenimentul prin webhook. Ofertele, facturile și contractele se generează în CRM cu numerotare automată și PDF.",
      ],
      facts: [
        { label: "Tip", value: "CRM, mai multe spații de lucru" },
        { label: "Canale", value: "E-mail, apeluri, WhatsApp, Telegram, formulare" },
        { label: "Documente", value: "Oferte, facturi, contracte" },
        { label: "Acces", value: "Demo public cu date de exemplu" },
      ],
      workflow: [
        {
          actor: "Vizitator al site-ului",
          action: "Completează formularul de captare a lead-ului.",
          result: "Cererea trece protecția anti-bot și anti-duplicat; contactul se creează sau se actualizează.",
        },
        {
          actor: "Automatizare",
          action: "Se declanșează la evenimentul „lead nou”.",
          result: "Responsabilul primește o sarcină, contactul o etichetă, echipa o notificare.",
        },
        {
          actor: "Manager",
          action: "Sună din fișă, scrie un e-mail sau răspunde în mesagerie.",
          result: "Apelurile, e-mailurile și mesajele rămân în istoricul contactului.",
        },
        {
          actor: "Manager",
          action: "Duce tranzacția prin etapele pâlniei.",
          result: "Prognoza ponderată a veniturilor se recalculează după probabilitățile etapelor.",
        },
        {
          actor: "Manager",
          action: "Pregătește oferta din catalogul de produse și o transformă în factură.",
          result: "PDF-ul pleacă la client din e-mailul conectat, plățile se înregistrează pe factură.",
        },
        {
          actor: "Conducător",
          action: "Consultă panourile, rapoartele de vânzări și jurnalul de audit.",
          result: "Deciziile se bazează pe date, fiecare modificare poate fi urmărită.",
        },
      ],
      modules: [
        { name: "Contacte și companii", brief: "Fișe cu istoric și rezumat AI" },
        { name: "Pâlnia de tranzacții", brief: "Kanban, etape și prognoză" },
        { name: "Activități", brief: "Calendarul apelurilor, întâlnirilor și sarcinilor" },
        { name: "E-mail", brief: "Gmail și Outlook direct în CRM" },
        { name: "Apeluri", brief: "Apel din fișă și înregistrări" },
        { name: "Inbox unificat", brief: "WhatsApp și Telegram într-o fereastră" },
        { name: "Automatizări", brief: "Scenarii vizuale și webhook-uri" },
        { name: "Documente", brief: "Oferte, facturi, contracte" },
        { name: "Echipă și acces", brief: "Roluri, drepturi pe înregistrări, audit" },
      ],
      strengths: [
        "Trimiterea formularului este atomică și protejată de repetări, boți și vârfuri de trafic.",
        "Scenariile păstrează instantanee ale pașilor și puncte de control și se reiau după o eroare a cozii.",
        "Webhook-urile pleacă doar spre gazde HTTPS permise, adresele IP private sunt blocate.",
        "Reînregistrarea unei plăți cu aceeași cheie nu creează duplicat, sumele se calculează pe server în aritmetică zecimală.",
        "Drepturile se verifică la nivelul spațiului de lucru și al fiecărei înregistrări.",
        "Funcțiile AI se activează cu o cheie și nu sunt necesare pentru funcționarea CRM-ului.",
      ],
      benefits: [
        "Tot istoricul clientului într-o singură fișă: managerul nu comută între e-mail, telefon și mesagerii.",
        "Cererile noi primesc imediat un responsabil și o sarcină.",
        "Prognoza veniturilor din pâlnie este disponibilă oricând.",
        "Oferta, factura și contractul se pregătesc în CRM, fără machetare manuală.",
        "Datele diferitelor echipe sau companii sunt separate pe spații de lucru.",
      ],
      limits: [
        "Sincronizarea e-mailului și automatizările rulează în procese de fundal separate, cu Redis.",
        "Numărul operatorului pentru apeluri este comun pentru toată instalarea; rutarea apelurilor primite nu este implementată.",
        "Marcajele de semnare a contractului sunt manuale, nu sunt semnătură electronică.",
        "Conturile de exemplu nu trebuie folosite cu date reale ale clienților.",
      ],
      demoAccess: "Demo public cu date de exemplu. Nu introduceți informații reale despre clienți.",
      metaDescription:
        "CRM Portfolio — CRM cu pâlnie, e-mail, apeluri, WhatsApp și Telegram, formulare de lead-uri, constructor de automatizări, oferte, facturi și contracte. Demo public.",
    },
    en: {
      name: "CRM Portfolio",
      kind: "CRM with automations",
      stages: ["Website lead", "Automation", "Conversations", "Pipeline", "Documents", "Analytics"],
      tagline:
        "Contacts, deals and every customer conversation — email, calls, WhatsApp and Telegram — in one CRM with automated workflows.",
      summary:
        "A CRM for sales teams: forecasted pipeline, activity calendar, email and calls from the contact profile, a unified messaging inbox, lead capture forms, a visual automation builder, quotations, invoices and contracts. Public demo with three roles.",
      purpose: [
        "CRM Portfolio gathers everything a manager does with a customer in one workspace: contact and company, the deal in the pipeline, emails, calls, WhatsApp and Telegram conversations, tasks and meetings. The full customer history is visible, and access depends on role and per-record permissions.",
        "Automations take care of routine steps: a website form submission creates a contact and a task, a deal stage change sends an email or a notification, an external system receives the event via webhook. Quotations, invoices and contracts are produced in the CRM with automatic numbering and PDFs.",
      ],
      facts: [
        { label: "Type", value: "CRM, multiple workspaces" },
        { label: "Channels", value: "Email, calls, WhatsApp, Telegram, forms" },
        { label: "Documents", value: "Quotations, invoices, contracts" },
        { label: "Access", value: "Public demo with sample data" },
      ],
      workflow: [
        {
          actor: "Website visitor",
          action: "Fills in a lead capture form.",
          result: "The submission passes bot and duplicate protection; the contact is created or updated.",
        },
        {
          actor: "Automation",
          action: "Fires on the “new lead” event.",
          result: "The owner gets a task, the contact a tag, the team a notification.",
        },
        {
          actor: "Manager",
          action: "Calls from the profile, writes an email or replies in a messenger.",
          result: "Calls, emails and messages are stored in the contact's history.",
        },
        {
          actor: "Manager",
          action: "Moves the deal through pipeline stages.",
          result: "The weighted revenue forecast recalculates from stage probabilities.",
        },
        {
          actor: "Manager",
          action: "Builds a quotation from the product catalogue and converts it to an invoice.",
          result: "The PDF goes to the customer from the connected mailbox; payments are recorded against the invoice.",
        },
        {
          actor: "Sales lead",
          action: "Reviews dashboards, sales reports and the audit log.",
          result: "Decisions rest on data, and every change can be traced.",
        },
      ],
      modules: [
        { name: "Contacts and companies", brief: "Profiles with history and an AI brief" },
        { name: "Deal pipeline", brief: "Kanban, stages and forecast" },
        { name: "Activities", brief: "Calendar of calls, meetings and tasks" },
        { name: "Email", brief: "Gmail and Outlook inside the CRM" },
        { name: "Calls", brief: "Click-to-call with recordings" },
        { name: "Unified inbox", brief: "WhatsApp and Telegram in one view" },
        { name: "Automations", brief: "Visual workflows and webhooks" },
        { name: "Documents", brief: "Quotes, invoices, contracts" },
        { name: "Team and access", brief: "Roles, record permissions, audit" },
      ],
      strengths: [
        "Form submission is atomic and protected against replays, bots and traffic spikes.",
        "Workflows store step snapshots and checkpoints and recover after a queue outage.",
        "Webhooks go only to allow-listed HTTPS hosts; private IP ranges are blocked.",
        "Re-sending a payment with the same key creates no duplicate; totals are calculated on the server with decimal arithmetic.",
        "Permissions are enforced per workspace and per record.",
        "AI features are enabled with a key and aren't required for the CRM to work.",
      ],
      benefits: [
        "The whole customer history in one profile: no switching between email, phone and messengers.",
        "New requests get an owner and a task right away.",
        "The pipeline revenue forecast is available at any moment.",
        "Quotations, invoices and contracts are prepared in the CRM, with no manual layout.",
        "Data for different teams or companies is separated by workspace.",
      ],
      limits: [
        "Email sync and automations run in separate background processes with Redis.",
        "The operator phone number is shared across the deployment; inbound call routing isn't implemented.",
        "Contract signature marks are manual records, not electronic signatures.",
        "The sample accounts must not be used with real customer data.",
      ],
      demoAccess: "A public demo with sample data. Don't enter real customer information.",
      metaDescription:
        "CRM Portfolio is a CRM with a pipeline, email, calls, WhatsApp and Telegram, lead forms, an automation builder, quotations, invoices and contracts. Public demo.",
    },
  },
};
