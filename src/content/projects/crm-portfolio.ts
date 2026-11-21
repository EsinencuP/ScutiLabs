import type { Project } from "./types";

export const crmPortfolio: Project = {
  slug: "crm-portfolio",
  status: "demo",
  featured: true,
  year: 2026,
  services: ["crm-sales", "documents-approvals", "analytics-control"],
  links: {
    demo: "https://crm-portfolio-omega.vercel.app",
    guide: "https://github.com/EsinencuP/crm-portfolio/blob/master/%D0%98%D0%9D%D0%A1%D0%A2%D0%A0%D0%A3%D0%9A%D0%A6%D0%98%D0%AF.md",
    repo: "https://github.com/EsinencuP/crm-portfolio",
  },
  demoCredentials: { login: "admin@demo.com", password: "admin123" },
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "Auth.js",
    "TanStack Query",
    "TanStack Table",
    "React Flow",
    "FullCalendar",
    "Recharts",
    "BullMQ",
    "Redis",
    "Twilio",
    "Vercel AI SDK",
    "Zod",
    "Vercel",
  ],
  gallery: [],
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
        { name: "Контакты и компании", text: "Поиск, карточки, заметки, связанные сделки и активности, ИИ-сводка по контакту." },
        { name: "Воронка сделок", text: "Канбан с перетаскиванием и таблица, настройка этапов, взвешенный прогноз, ИИ-оценка сделки." },
        { name: "Активности", text: "Календарь и список задач: звонки, письма, встречи и следующие шаги." },
        { name: "Почта", text: "Подключение ящиков Gmail и Outlook, синхронизация, отправка из CRM, отслеживание открытий и кликов, ИИ-черновики." },
        { name: "Звонки", text: "Звонок клиенту из карточки через Twilio, журнал звонков, записи и заметки к разговору." },
        { name: "Единый инбокс", text: "WhatsApp и Telegram в одном окне: фильтры, назначение ответственного, статусы и ответы." },
        { name: "Автоматизации", text: "Визуальный конструктор: условия с ветвлением, письма, задачи, смена этапа, ожидание, вебхуки; журнал запусков." },
        { name: "Документы", text: "Каталог товаров и SKU, предложения с PDF и конвертацией в счёт, счета с оплатами, договоры с номерами CTR-ГГГГ-NNNN." },
        { name: "Команда и доступ", text: "Рабочие пространства, приглашения, роли, права на отдельные записи, уведомления и журнал аудита." },
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
      usageTitle: "Как посмотреть демо",
      usage: [
        "Откройте демо и войдите под учебной учётной записью администратора.",
        "На панели посмотрите показатели воронки и выручки.",
        "Откройте воронку и перетащите сделку на следующий этап.",
        "В карточке контакта посмотрите историю активностей, писем и сделок.",
        "Загляните в автоматизации и формы, чтобы увидеть, как собираются сценарии.",
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
        { name: "Contacte și companii", text: "Căutare, fișe, notițe, tranzacții și activități asociate, rezumat AI al contactului." },
        { name: "Pâlnia de tranzacții", text: "Kanban cu drag-and-drop și tabel, configurarea etapelor, prognoză ponderată, scor AI al tranzacției." },
        { name: "Activități", text: "Calendar și listă de sarcini: apeluri, e-mailuri, întâlniri și pașii următori." },
        { name: "E-mail", text: "Conectarea căsuțelor Gmail și Outlook, sincronizare, trimitere din CRM, urmărirea deschiderilor și clicurilor, ciorne AI." },
        { name: "Apeluri", text: "Apel către client din fișă prin Twilio, jurnal de apeluri, înregistrări și notițe." },
        { name: "Inbox unificat", text: "WhatsApp și Telegram într-o singură fereastră: filtre, atribuirea responsabilului, statusuri și răspunsuri." },
        { name: "Automatizări", text: "Constructor vizual: condiții cu ramificare, e-mailuri, sarcini, schimbarea etapei, așteptare, webhook-uri; jurnal de rulări." },
        { name: "Documente", text: "Catalog de produse și SKU, oferte cu PDF și conversie în factură, facturi cu plăți, contracte cu numere CTR-AAAA-NNNN." },
        { name: "Echipă și acces", text: "Spații de lucru, invitații, roluri, drepturi pe înregistrări, notificări și jurnal de audit." },
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
      usageTitle: "Cum vedeți demonstrația",
      usage: [
        "Deschideți demo-ul și autentificați-vă cu contul de exemplu al administratorului.",
        "Pe panou vedeți indicatorii pâlniei și ai veniturilor.",
        "Deschideți pâlnia și trageți o tranzacție la etapa următoare.",
        "În fișa contactului vedeți istoricul activităților, e-mailurilor și tranzacțiilor.",
        "Deschideți automatizările și formularele pentru a vedea cum se construiesc scenariile.",
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
        { name: "Contacts and companies", text: "Search, profiles, notes, related deals and activities, an AI contact brief." },
        { name: "Deal pipeline", text: "Drag-and-drop kanban and table, configurable stages, weighted forecast, AI deal score." },
        { name: "Activities", text: "Calendar and task list: calls, emails, meetings and follow-ups." },
        { name: "Email", text: "Gmail and Outlook mailboxes, sync, sending from the CRM, open and click tracking, AI drafts." },
        { name: "Calls", text: "Click-to-call through Twilio, call log, recordings and call notes." },
        { name: "Unified inbox", text: "WhatsApp and Telegram in one view: filters, assignment, statuses and replies." },
        { name: "Automations", text: "Visual builder: branching conditions, emails, tasks, stage moves, waits, webhooks; run log." },
        { name: "Documents", text: "Product and SKU catalogue, quotations with PDF and conversion to invoices, invoices with payments, contracts numbered CTR-YYYY-NNNN." },
        { name: "Team and access", text: "Workspaces, invitations, roles, per-record permissions, notifications and an audit log." },
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
      usageTitle: "How to explore the demo",
      usage: [
        "Open the demo and sign in with the sample administrator account.",
        "On the dashboard, look at pipeline and revenue figures.",
        "Open the pipeline and drag a deal to the next stage.",
        "In a contact profile, review activities, emails and deals.",
        "Open automations and forms to see how workflows are assembled.",
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
  demo: [
    {
      slug: "pipeline",
      text: {
        ru: {
          title: "Контакты и воронка",
          summary: "Клиенты, компании и сделки связаны между собой; воронка показывает прогноз выручки.",
          points: [
            "Контакты и компании связаны со сделками, заметками и активностями.",
            "Воронка доступна канбаном и таблицей, этапы настраиваются.",
            "Взвешенный прогноз считается по вероятностям этапов.",
            "При подключённом ключе ИИ готовит сводку по контакту и оценку сделки.",
          ],
        },
        ro: {
          title: "Contacte și pâlnie",
          summary: "Clienții, companiile și tranzacțiile sunt legate între ele; pâlnia arată prognoza veniturilor.",
          points: [
            "Contactele și companiile sunt legate de tranzacții, notițe și activități.",
            "Pâlnia este disponibilă ca kanban și tabel, etapele se configurează.",
            "Prognoza ponderată se calculează după probabilitățile etapelor.",
            "Cu cheia conectată, AI-ul pregătește rezumatul contactului și scorul tranzacției.",
          ],
        },
        en: {
          title: "Contacts and pipeline",
          summary: "Customers, companies and deals are linked; the pipeline shows the revenue forecast.",
          points: [
            "Contacts and companies link to deals, notes and activities.",
            "The pipeline works as a kanban board and a table; stages are configurable.",
            "The weighted forecast uses stage probabilities.",
            "With a key connected, AI prepares a contact brief and a deal score.",
          ],
        },
      },
    },
    {
      slug: "communication",
      text: {
        ru: {
          title: "Почта, звонки и мессенджеры",
          summary: "Вся переписка и разговоры с клиентом сохраняются в его карточке.",
          points: [
            "Ящики Gmail и Outlook синхронизируются, письма отправляются из CRM.",
            "Открытия писем и клики по ссылкам отслеживаются.",
            "Звонок из карточки: Twilio соединяет оператора с клиентом, запись сохраняется в журнале.",
            "WhatsApp и Telegram собраны в едином инбоксе с назначением ответственного и статусами.",
          ],
        },
        ro: {
          title: "E-mail, apeluri și mesagerii",
          summary: "Toată corespondența și convorbirile cu clientul se păstrează în fișa lui.",
          points: [
            "Căsuțele Gmail și Outlook se sincronizează, e-mailurile se trimit din CRM.",
            "Deschiderile e-mailurilor și clicurile pe linkuri sunt urmărite.",
            "Apel din fișă: Twilio conectează operatorul cu clientul, înregistrarea rămâne în jurnal.",
            "WhatsApp și Telegram sunt adunate într-un inbox unificat, cu responsabil și statusuri.",
          ],
        },
        en: {
          title: "Email, calls and messengers",
          summary: "Every conversation with a customer is stored in their profile.",
          points: [
            "Gmail and Outlook mailboxes sync, and emails are sent from the CRM.",
            "Email opens and link clicks are tracked.",
            "Click-to-call: Twilio connects the operator to the customer, and the recording goes to the log.",
            "WhatsApp and Telegram share a unified inbox with assignment and statuses.",
          ],
        },
      },
    },
    {
      slug: "automation",
      text: {
        ru: {
          title: "Формы и автоматизации",
          summary: "Лиды с сайта попадают в CRM сами, а повторяющиеся действия выполняют сценарии.",
          points: [
            "Публичная форма создаёт или обновляет контакт и защищена от ботов и повторной отправки.",
            "Триггеры: новый контакт, смена этапа, выполненная активность, отправка формы, открытие письма.",
            "Шаги: условие с ветвлением, письмо, задача, поле, ответственный, тег, этап, уведомление, вебхук, ожидание.",
            "Новый сценарий создаётся на паузе; каждый запуск сохраняет историю шагов.",
          ],
        },
        ro: {
          title: "Formulare și automatizări",
          summary: "Lead-urile de pe site intră singure în CRM, iar acțiunile repetitive le execută scenariile.",
          points: [
            "Formularul public creează sau actualizează contactul și este protejat de boți și retrimiteri.",
            "Declanșatoare: contact nou, schimbarea etapei, activitate finalizată, trimiterea formularului, deschiderea e-mailului.",
            "Pași: condiție cu ramificare, e-mail, sarcină, câmp, responsabil, etichetă, etapă, notificare, webhook, așteptare.",
            "Scenariul nou pornește pe pauză; fiecare rulare păstrează istoricul pașilor.",
          ],
        },
        en: {
          title: "Forms and automations",
          summary: "Website leads enter the CRM on their own, and workflows handle repetitive actions.",
          points: [
            "A public form creates or updates a contact and is protected from bots and resubmission.",
            "Triggers: new contact, stage change, completed activity, form submission, email opened.",
            "Steps: branching condition, email, task, field, owner, tag, stage, notification, webhook, wait.",
            "New workflows start paused; each run keeps its step history.",
          ],
        },
      },
    },
    {
      slug: "documents",
      text: {
        ru: {
          title: "Предложения, счета и договоры",
          summary: "Коммерческие документы с нумерацией, PDF и отправкой с почты менеджера.",
          points: [
            "Каталог товаров с SKU, категориями и статусами.",
            "Предложение строится по позициям каталога, отправляется в PDF и одним действием превращается в счёт.",
            "Счёт хранит историю оплат; повторная регистрация того же платежа не создаёт дубль.",
            "Договор получает номер CTR-ГГГГ-NNNN; после отметки «отправлен» его текст больше не меняется.",
          ],
        },
        ro: {
          title: "Oferte, facturi și contracte",
          summary: "Documente comerciale cu numerotare, PDF și trimitere din e-mailul managerului.",
          points: [
            "Catalog de produse cu SKU, categorii și statusuri.",
            "Oferta se construiește din pozițiile catalogului, se trimite în PDF și se transformă într-o factură cu o singură acțiune.",
            "Factura păstrează istoricul plăților; reînregistrarea aceleiași plăți nu creează duplicat.",
            "Contractul primește numărul CTR-AAAA-NNNN; după marcarea ca „trimis” textul lui nu se mai schimbă.",
          ],
        },
        en: {
          title: "Quotations, invoices and contracts",
          summary: "Commercial documents with numbering, PDFs and sending from the manager's mailbox.",
          points: [
            "A product catalogue with SKUs, categories and statuses.",
            "A quotation is built from catalogue items, sent as a PDF and converted to an invoice in one action.",
            "An invoice keeps its payment history; recording the same payment twice creates no duplicate.",
            "A contract gets a CTR-YYYY-NNNN number; once marked as sent, its text no longer changes.",
          ],
        },
      },
    },
  ],
};
