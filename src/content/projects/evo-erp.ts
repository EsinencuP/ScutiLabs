import { shot, type Project } from "./types";

const erpShots = {
  pipeline: shot("erp", "pipeline", 1440, 1000, {
    ru: "Воронка сделок Evo ERP: колонки этапов с карточками сделок",
    ro: "Pâlnia de tranzacții Evo ERP: coloane de etape cu carduri",
    en: "Evo ERP deal pipeline: stage columns with deal cards",
  }),
  dashboard: shot("erp", "dashboard", 1440, 1547, {
    ru: "Обзор Evo ERP на русском: показатели, график поступлений и последние счета",
    ro: "Panoul Evo ERP: indicatori, graficul încasărilor și ultimele facturi",
    en: "Evo ERP dashboard: KPIs, revenue chart and recent invoices",
  }),
  invoice: shot("erp", "invoice", 1440, 1274, {
    ru: "Карточка счёта: строки, налог, оплаты и остаток",
    ro: "Fișa facturii: rânduri, taxă, plăți și sold",
    en: "Invoice detail: line items, tax, payments and balance",
  }),
  ledger: shot("erp", "ledger", 1440, 1700, {
    ru: "Журнал складских движений и остатки по складам",
    ro: "Jurnalul mișcărilor de stoc și soldurile pe depozite",
    en: "Stock movement ledger and balances per warehouse",
  }),
  org: shot("erp", "org-chart", 1440, 1100, {
    ru: "Организационная структура компании",
    ro: "Structura organizațională a companiei",
    en: "Company org chart",
  }),
  projects: shot("erp", "projects", 1440, 1536, {
    ru: "Обзор проектов: прогресс, бюджет и команда",
    ro: "Prezentarea proiectelor: progres, buget și echipă",
    en: "Projects overview: progress, budget and team",
  }),
  audit: shot("erp", "audit", 1280, 720, {
    ru: "Журнал аудита с изменениями «до и после»",
    ro: "Jurnalul de audit cu modificări „înainte și după”",
    en: "Audit log with before-and-after changes",
  }),
  pnl: shot("erp", "pnl", 1440, 1301, {
    ru: "Отчёт о прибылях и убытках за период",
    ro: "Raportul de profit și pierdere pe perioadă",
    en: "Profit and loss report for a period",
  }),
  leaves: shot("erp", "leaves", 1440, 1000, {
    ru: "Очередь заявок на отпуск",
    ro: "Coada cererilor de concediu",
    en: "Leave request queue",
  }),
  members: shot("erp", "members", 1440, 1333, {
    ru: "Участники рабочего пространства и их роли",
    ro: "Membrii spațiului de lucru și rolurile lor",
    en: "Workspace members and their roles",
  }),
};

export const evoErp: Project = {
  slug: "evo-erp",
  status: "demo",
  featured: true,
  year: 2026,
  services: ["erp-operations", "crm-sales", "documents-approvals", "hr-team", "analytics-control"],
  links: {
    demo: "https://erp-xi-pink.vercel.app",
    guide: "https://erp-xi-pink.vercel.app/user-guide.html",
    repo: "https://github.com/EsinencuP/ERP",
  },
  demoCredentials: { login: "admin@erp.dev", password: "Admin123!" },
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "Auth.js",
    "next-intl",
    "TanStack Table",
    "dnd-kit",
    "Recharts",
    "React-PDF",
    "Zod",
    "Docker Compose",
    "Vercel",
  ],
  gallery: [erpShots.dashboard, erpShots.invoice, erpShots.ledger, erpShots.org, erpShots.projects, erpShots.audit],
  text: {
    ru: {
      name: "Evo ERP",
      kind: "ERP-система",
      stages: ["Сделка", "Счёт", "Оплата", "Склад", "Проекты", "Отпуска", "Аудит"],
      tagline: "Продажи, финансы, склад, персонал и проекты компании в одном рабочем пространстве.",
      summary:
        "Модульная ERP: CRM с воронкой, счета и платежи с PDF, учёт на нескольких складах, кадры с отпусками, проекты и роли доступа. Открыто публичное демо с учебными данными.",
      purpose: [
        "Evo ERP заменяет набор разрозненных таблиц единой системой. Клиент из CRM становится получателем счёта, оплата попадает в финансовую сводку, расход проекта уменьшает его бюджет, а складское движение сразу меняет остаток.",
        "Каждая компания работает в собственном рабочем пространстве: данные разных пространств разделены, а права проверяются на сервере при каждом действии. Пять ролей, от наблюдателя до суперадминистратора, определяют, кто может создавать, удалять, выгружать и согласовывать.",
      ],
      facts: [
        { label: "Тип", value: "ERP, модульный монолит" },
        { label: "Модули", value: "Обзор, CRM, финансы, склад, персонал, проекты, настройки" },
        { label: "Языки интерфейса", value: "Английский, русский" },
        { label: "Доступ", value: "Публичное демо с учебными данными" },
      ],
      workflow: [
        {
          actor: "Менеджер по продажам",
          action: "Создаёт контакт и ведёт сделку по воронке: новая, квалификация, предложение, переговоры.",
          result: "Этап и вероятность сделки видны всей команде.",
        },
        {
          actor: "Бухгалтер",
          action: "Выставляет счёт клиенту из CRM; номер вида INV-2026-0001 присваивается автоматически.",
          result: "Строки, налог и итог рассчитаны системой, PDF готов к отправке.",
        },
        {
          actor: "Бухгалтер",
          action: "Регистрирует оплату, в том числе частичную.",
          result: "Статус счёта и остаток долга обновляются; повторное основание платежа отклоняется.",
        },
        {
          actor: "Кладовщик",
          action: "Проводит поступление, списание, корректировку или перемещение товара между складами.",
          result: "Остаток меняется атомарно, движение попадает в неизменяемый журнал.",
        },
        {
          actor: "Руководитель проекта",
          action: "Ведёт задачи в канбане; расходы привязываются к проекту.",
          result: "Прогресс и использованный бюджет считаются автоматически.",
        },
        {
          actor: "HR-менеджер",
          action: "Получает заявку на отпуск и одобряет или отклоняет её.",
          result: "Рабочие дни посчитаны, пересекающиеся заявки заблокированы.",
        },
        {
          actor: "Администратор",
          action: "Приглашает коллег, назначает роли, проверяет журнал аудита.",
          result: "Каждое значимое изменение сохранено со значениями «до» и «после».",
        },
      ],
      modules: [
        {
          name: "Обзор",
          text: "Поступления, открытые сделки, товары на пополнение и заявки на отпуск на одном экране. График за шесть месяцев и лента действий.",
        },
        {
          name: "CRM",
          text: "Контакты, воронка из шести этапов с перетаскиванием, активности: звонки, письма, встречи, заметки, задачи. Групповые действия и экспорт CSV.",
        },
        {
          name: "Финансы",
          text: "Счета со строками и налогом, PDF с кириллицей, платежи и частичные оплаты, расходы по категориям, отчёт о прибылях и убытках, задолженность по давности.",
        },
        {
          name: "Склад",
          text: "Каталог с SKU и минимальным запасом, несколько складов, движения IN, OUT, ADJUSTMENT, TRANSFER и статусы «в наличии», «низкий запас», «нет в наличии».",
        },
        {
          name: "Персонал",
          text: "Каталог сотрудников, профиль с документами-ссылками, организационная структура, заявки на отпуск с согласованием и годовые лимиты.",
        },
        {
          name: "Проекты",
          text: "Задачи в канбане и списке, приоритеты, исполнители и сроки, прогресс, бюджет из расходов и временная шкала.",
        },
        {
          name: "Настройки",
          text: "Параметры компании, участники и одноразовые приглашения, пять ролей доступа, журнал аудита с просмотром изменений.",
        },
      ],
      strengths: [
        "Данные компаний разделены: рабочее пространство и права определяются на сервере, а не приходят из браузера.",
        "Защита от одновременного редактирования: если коллега сохранил запись раньше, система сообщит о конфликте и ничего не перезапишет.",
        "Изменение данных и запись в журнал аудита выполняются одной транзакцией.",
        "Складской журнал неизменяем: ошибка исправляется компенсирующим движением с пояснением.",
        "Денежные расчёты точные: суммы, налог и остаток считает система, платёж не может превысить долг.",
        "Палитра команд Ctrl/Cmd+K, горячие клавиши, перенос карточек с клавиатуры, светлая и тёмная темы, мобильная версия.",
      ],
      benefits: [
        "Одна система вместо таблиц по отделам: данные вводятся один раз и используются в продажах, финансах и отчётах.",
        "Видно, сколько денег поступило, кто должен и какая сумма просрочена.",
        "Склад предупреждает о низком запасе до того, как товар закончится.",
        "Отпуска согласуются в системе, остатки считаются автоматически.",
        "Каждое изменение можно найти в журнале: кто, когда и что поменял.",
        "Сотрудник получает ровно тот доступ, который нужен его роли.",
      ],
      usageTitle: "Рабочий день в Evo ERP",
      usage: [
        "Утром откройте обзор: просроченные счета, складские предупреждения и ожидающие отпуска.",
        "В CRM обновите контакты и передвиньте сделки по этапам воронки.",
        "В течение дня регистрируйте поступления, расходы и движения товара.",
        "В проектах отмечайте ход задач: прогресс и бюджет пересчитаются сами.",
        "Вечером проверьте финансовую сводку; администратор может просмотреть аудит значимых изменений.",
      ],
      limits: [
        "Письма клиентам не отправляются автоматически: статус «Отправлен» и PDF не рассылают счёт.",
        "Ссылку-приглашение администратор передаёт коллеге сам.",
        "Валюта компании — EUR.",
        "Таблица «Сделки» и воронка пока ведутся как два отдельных реестра.",
      ],
      demoAccess:
        "Публичное учебное пространство с искусственными данными. Не вносите туда реальные сведения: другие посетители могут изменить записи.",
      metaDescription:
        "Evo ERP — ERP-система для CRM, финансов, склада, персонала и проектов с ролями доступа и аудитом. Публичное демо, сценарии работы и описание модулей.",
    },
    ro: {
      name: "Evo ERP",
      kind: "Sistem ERP",
      stages: ["Tranzacție", "Factură", "Plată", "Depozit", "Proiecte", "Concedii", "Audit"],
      tagline: "Vânzările, finanțele, depozitul, personalul și proiectele companiei într-un singur spațiu de lucru.",
      summary:
        "ERP modular: CRM cu pâlnie, facturi și plăți cu PDF, evidența mai multor depozite, personal și concedii, proiecte și roluri de acces. Demo public cu date de exemplu.",
      purpose: [
        "Evo ERP înlocuiește un set de tabele disparate cu un singur sistem. Clientul din CRM devine destinatarul facturii, plata ajunge în sinteza financiară, cheltuiala proiectului îi reduce bugetul, iar mișcarea de stoc schimbă imediat soldul.",
        "Fiecare companie lucrează în propriul spațiu de lucru: datele spațiilor sunt separate, iar drepturile se verifică pe server la fiecare acțiune. Cinci roluri, de la observator la superadministrator, stabilesc cine poate crea, șterge, exporta și aproba.",
      ],
      facts: [
        { label: "Tip", value: "ERP, monolit modular" },
        { label: "Module", value: "Panou, CRM, finanțe, depozit, personal, proiecte, setări" },
        { label: "Limbile interfeței", value: "Engleză, rusă" },
        { label: "Acces", value: "Demo public cu date de exemplu" },
      ],
      workflow: [
        {
          actor: "Manager de vânzări",
          action: "Creează contactul și duce tranzacția prin pâlnie: nouă, calificare, ofertă, negocieri.",
          result: "Etapa și probabilitatea tranzacției sunt vizibile pentru toată echipa.",
        },
        {
          actor: "Contabil",
          action: "Emite factura către clientul din CRM; numărul de tip INV-2026-0001 se atribuie automat.",
          result: "Rândurile, taxa și totalul sunt calculate de sistem, PDF-ul este gata de trimis.",
        },
        {
          actor: "Contabil",
          action: "Înregistrează plata, inclusiv una parțială.",
          result: "Statusul facturii și soldul datoriei se actualizează; o referință de plată repetată este respinsă.",
        },
        {
          actor: "Gestionar",
          action: "Înregistrează intrarea, ieșirea, corecția sau transferul mărfii între depozite.",
          result: "Soldul se schimbă atomic, iar mișcarea intră în jurnalul nemodificabil.",
        },
        {
          actor: "Manager de proiect",
          action: "Conduce sarcinile în kanban; cheltuielile se leagă de proiect.",
          result: "Progresul și bugetul consumat se calculează automat.",
        },
        {
          actor: "Manager HR",
          action: "Primește cererea de concediu și o aprobă sau o respinge.",
          result: "Zilele lucrătoare sunt calculate, cererile suprapuse sunt blocate.",
        },
        {
          actor: "Administrator",
          action: "Invită colegii, atribuie roluri, verifică jurnalul de audit.",
          result: "Fiecare modificare importantă este păstrată cu valorile „înainte” și „după”.",
        },
      ],
      modules: [
        {
          name: "Panou",
          text: "Încasări, tranzacții deschise, produse de reaprovizionat și cereri de concediu pe un singur ecran. Grafic pe șase luni și flux de acțiuni.",
        },
        {
          name: "CRM",
          text: "Contacte, pâlnie din șase etape cu drag-and-drop, activități: apeluri, e-mailuri, întâlniri, notițe, sarcini. Acțiuni în grup și export CSV.",
        },
        {
          name: "Finanțe",
          text: "Facturi cu rânduri și taxă, PDF cu chirilice, plăți și achitări parțiale, cheltuieli pe categorii, raport de profit și pierdere, vechimea creanțelor.",
        },
        {
          name: "Depozit",
          text: "Catalog cu SKU și stoc minim, mai multe depozite, mișcări IN, OUT, ADJUSTMENT, TRANSFER și statusurile „în stoc”, „stoc redus”, „lipsă”.",
        },
        {
          name: "Personal",
          text: "Catalogul angajaților, profil cu documente-link, structură organizațională, cereri de concediu cu aprobare și limite anuale.",
        },
        {
          name: "Proiecte",
          text: "Sarcini în kanban și listă, priorități, executanți și termene, progres, buget din cheltuieli și cronologie.",
        },
        {
          name: "Setări",
          text: "Parametrii companiei, membri și invitații de unică folosință, cinci roluri de acces, jurnal de audit cu vizualizarea modificărilor.",
        },
      ],
      strengths: [
        "Datele companiilor sunt separate: spațiul de lucru și drepturile se stabilesc pe server, nu vin din browser.",
        "Protecție la editarea simultană: dacă un coleg a salvat înregistrarea mai devreme, sistemul semnalează conflictul și nu suprascrie nimic.",
        "Modificarea datelor și înregistrarea în jurnalul de audit se fac într-o singură tranzacție.",
        "Jurnalul de stoc nu se modifică: eroarea se corectează printr-o mișcare compensatorie cu explicație.",
        "Calculele bănești sunt exacte: sumele, taxa și soldul le calculează sistemul, plata nu poate depăși datoria.",
        "Paleta de comenzi Ctrl/Cmd+K, scurtături, mutarea cardurilor de la tastatură, temă luminoasă și întunecată, versiune mobilă.",
      ],
      benefits: [
        "Un singur sistem în locul tabelelor pe departamente: datele se introduc o dată și se folosesc în vânzări, finanțe și rapoarte.",
        "Se vede câți bani au intrat, cine datorează și ce sumă este restantă.",
        "Depozitul avertizează despre stocul redus înainte ca marfa să se termine.",
        "Concediile se aprobă în sistem, iar soldurile se calculează automat.",
        "Orice modificare se găsește în jurnal: cine, când și ce a schimbat.",
        "Angajatul primește exact accesul necesar rolului său.",
      ],
      usageTitle: "O zi de lucru în Evo ERP",
      usage: [
        "Dimineața deschideți panoul: facturi restante, avertizări de stoc și concedii în așteptare.",
        "În CRM actualizați contactele și mutați tranzacțiile pe etapele pâlniei.",
        "Pe parcursul zilei înregistrați încasările, cheltuielile și mișcările de marfă.",
        "În proiecte marcați progresul sarcinilor: progresul și bugetul se recalculează singure.",
        "Seara verificați sinteza financiară; administratorul poate consulta auditul modificărilor importante.",
      ],
      limits: [
        "E-mailurile către clienți nu se trimit automat: statusul „Trimis” și PDF-ul nu expediază factura.",
        "Linkul de invitație îl transmite colegului administratorul.",
        "Moneda companiei este EUR.",
        "Tabelul „Tranzacții” și pâlnia sunt deocamdată două registre separate.",
      ],
      demoAccess:
        "Spațiu public de instruire cu date fictive. Nu introduceți informații reale: alți vizitatori pot modifica înregistrările.",
      metaDescription:
        "Evo ERP — sistem ERP pentru CRM, finanțe, depozit, personal și proiecte, cu roluri de acces și audit. Demo public, scenarii de lucru și descrierea modulelor.",
    },
    en: {
      name: "Evo ERP",
      kind: "ERP system",
      stages: ["Deal", "Invoice", "Payment", "Inventory", "Projects", "Time off", "Audit"],
      tagline: "A company's sales, finance, inventory, people and projects in one workspace.",
      summary:
        "Modular ERP: CRM with a pipeline, invoices and payments with PDF, multi-warehouse inventory, HR with leave, projects and access roles. Public demo with sample data.",
      purpose: [
        "Evo ERP replaces a pile of disconnected spreadsheets with one system. A CRM contact becomes the invoice recipient, a payment lands in the finance summary, a project expense reduces its budget, and a stock movement changes the balance immediately.",
        "Each company works in its own workspace: data is separated between workspaces, and permissions are checked on the server for every action. Five roles, from read-only to super administrator, define who can create, delete, export and approve.",
      ],
      facts: [
        { label: "Type", value: "ERP, modular monolith" },
        { label: "Modules", value: "Dashboard, CRM, finance, inventory, HR, projects, settings" },
        { label: "Interface languages", value: "English, Russian" },
        { label: "Access", value: "Public demo with sample data" },
      ],
      workflow: [
        {
          actor: "Sales manager",
          action: "Creates a contact and moves the deal through the pipeline: new, qualified, proposal, negotiation.",
          result: "The deal's stage and probability are visible to the whole team.",
        },
        {
          actor: "Accountant",
          action: "Issues an invoice to the CRM customer; a number like INV-2026-0001 is assigned automatically.",
          result: "Lines, tax and total are calculated by the system; the PDF is ready to send.",
        },
        {
          actor: "Accountant",
          action: "Records a payment, including a partial one.",
          result: "Invoice status and outstanding balance update; a repeated payment reference is rejected.",
        },
        {
          actor: "Warehouse clerk",
          action: "Posts a receipt, write-off, adjustment or transfer between warehouses.",
          result: "The balance changes atomically and the movement goes into an immutable ledger.",
        },
        {
          actor: "Project lead",
          action: "Runs tasks on a kanban board; expenses are linked to the project.",
          result: "Progress and spent budget are calculated automatically.",
        },
        {
          actor: "HR manager",
          action: "Receives a leave request and approves or rejects it.",
          result: "Working days are counted and overlapping requests are blocked.",
        },
        {
          actor: "Administrator",
          action: "Invites colleagues, assigns roles, reviews the audit log.",
          result: "Every significant change is stored with its before and after values.",
        },
      ],
      modules: [
        {
          name: "Dashboard",
          text: "Revenue, open deals, low-stock products and pending leave on one screen. Six-month chart and activity feed.",
        },
        {
          name: "CRM",
          text: "Contacts, a six-stage drag-and-drop pipeline, activities: calls, emails, meetings, notes, tasks. Bulk actions and CSV export.",
        },
        {
          name: "Finance",
          text: "Invoices with line items and tax, PDF with Cyrillic support, payments and partial payments, expenses by category, P&L report, receivables aging.",
        },
        {
          name: "Inventory",
          text: "Catalogue with SKU and minimum stock, multiple warehouses, IN, OUT, ADJUSTMENT and TRANSFER movements, and in-stock, low-stock and out-of-stock statuses.",
        },
        {
          name: "HR",
          text: "Employee directory, profile with document links, org chart, leave requests with approval and annual allowances.",
        },
        {
          name: "Projects",
          text: "Tasks in kanban and list views, priorities, assignees and due dates, progress, budget from expenses and a timeline.",
        },
        {
          name: "Settings",
          text: "Company settings, members and single-use invitations, five access roles, audit log with change view.",
        },
      ],
      strengths: [
        "Company data is separated: the workspace and permissions are resolved on the server, never taken from the browser.",
        "Concurrent edit protection: if a colleague saved the record first, the system reports a conflict and overwrites nothing.",
        "A data change and its audit entry are written in one transaction.",
        "The stock ledger is immutable: a mistake is fixed with a compensating movement and a note.",
        "Money math is exact: totals, tax and balance are calculated by the system, and a payment can't exceed the debt.",
        "Ctrl/Cmd+K command palette, shortcuts, keyboard drag-and-drop, light and dark themes, mobile layout.",
      ],
      benefits: [
        "One system instead of per-department spreadsheets: data is entered once and reused in sales, finance and reports.",
        "You can see how much money came in, who owes and how much is overdue.",
        "Inventory warns about low stock before the product runs out.",
        "Leave is approved in the system, and balances are calculated automatically.",
        "Every change can be found in the log: who changed what, and when.",
        "Each employee gets exactly the access their role needs.",
      ],
      usageTitle: "A working day in Evo ERP",
      usage: [
        "In the morning, open the dashboard: overdue invoices, stock warnings and pending leave.",
        "In the CRM, update contacts and move deals along the pipeline.",
        "During the day, record payments received, expenses and stock movements.",
        "In projects, mark task progress: progress and budget recalculate on their own.",
        "In the evening, check the finance summary; an administrator can review the audit of significant changes.",
      ],
      limits: [
        "Customer emails are not sent automatically: the Sent status and the PDF don't deliver the invoice.",
        "The administrator passes the invitation link to a colleague personally.",
        "The company currency is EUR.",
        "The Deals table and the pipeline are still two separate registries.",
      ],
      demoAccess:
        "A public training workspace with fictional data. Don't enter real information: other visitors can change the records.",
      metaDescription:
        "Evo ERP is an ERP system for CRM, finance, inventory, HR and projects with access roles and audit. Public demo, workflows and module overview.",
    },
  },
  demo: [
    {
      slug: "crm",
      shot: erpShots.pipeline,
      text: {
        ru: {
          title: "CRM и воронка сделок",
          summary: "Контакты, история общения и шесть этапов продаж. Сделка перемещается перетаскиванием или с клавиатуры.",
          points: [
            "Создайте контакт: имя, компания, статус и ответственный.",
            "Откройте карточку контакта: связанные сделки и лента активностей.",
            "Перенесите сделку в следующий этап. При конфликте карточка вернётся к подтверждённому состоянию.",
            "Менеджеры и администраторы выгружают контакты в CSV.",
          ],
        },
        ro: {
          title: "CRM și pâlnia de tranzacții",
          summary: "Contacte, istoricul comunicării și șase etape de vânzare. Tranzacția se mută prin tragere sau de la tastatură.",
          points: [
            "Creați un contact: nume, companie, status și responsabil.",
            "Deschideți fișa contactului: tranzacțiile asociate și fluxul de activități.",
            "Mutați tranzacția la etapa următoare. La conflict, cardul revine la starea confirmată.",
            "Managerii și administratorii exportă contactele în CSV.",
          ],
        },
        en: {
          title: "CRM and deal pipeline",
          summary: "Contacts, communication history and six sales stages. Deals move by dragging or from the keyboard.",
          points: [
            "Create a contact: name, company, status and owner.",
            "Open the contact profile: related deals and the activity feed.",
            "Move a deal to the next stage. On conflict, the card returns to its confirmed state.",
            "Managers and administrators export contacts to CSV.",
          ],
        },
      },
    },
    {
      slug: "finance",
      shot: erpShots.invoice,
      text: {
        ru: {
          title: "Счета, оплаты и P&L",
          summary: "Счёт со строками и налогом, автоматический номер, PDF и регистрация оплат, включая частичные.",
          points: [
            "Выберите клиента из CRM и добавьте строки: 2 × €100 при налоге 20% дают €240.",
            "Сохраните черновик, и номер вида INV-2026-0001 присвоится сам.",
            "Зарегистрируйте оплату: остаток долга и статус обновятся.",
            "В отчёте P&L чистая прибыль равна выручке минус расходы за период.",
          ],
        },
        ro: {
          title: "Facturi, plăți și P&L",
          summary: "Factură cu rânduri și taxă, număr automat, PDF și înregistrarea plăților, inclusiv parțiale.",
          points: [
            "Alegeți clientul din CRM și adăugați rânduri: 2 × €100 cu taxă de 20% dau €240.",
            "Salvați ciorna, iar numărul de tip INV-2026-0001 se atribuie singur.",
            "Înregistrați plata: soldul datoriei și statusul se actualizează.",
            "În raportul P&L profitul net este veniturile minus cheltuielile perioadei.",
          ],
        },
        en: {
          title: "Invoices, payments and P&L",
          summary: "Invoices with line items and tax, automatic numbering, PDF and payment recording, including partial payments.",
          points: [
            "Pick a CRM customer and add lines: 2 × €100 at 20% tax gives €240.",
            "Save the draft, and a number like INV-2026-0001 is assigned automatically.",
            "Record a payment: the outstanding balance and status update.",
            "In the P&L report, net profit is revenue minus expenses for the period.",
          ],
        },
      },
    },
    {
      slug: "inventory",
      shot: erpShots.ledger,
      interactive: "stock-ledger",
      text: {
        ru: {
          title: "Склад и движения товара",
          summary: "Остатки на нескольких складах и неизменяемый журнал движений. Проведите движения сами в интерактивной модели.",
          points: [
            "IN увеличивает остаток выбранного склада.",
            "OUT уменьшает остаток; списать больше наличия нельзя.",
            "ADJUSTMENT — изменение со знаком: +3 добавляет, −2 убирает.",
            "TRANSFER переносит количество со склада-источника на склад-получатель.",
          ],
        },
        ro: {
          title: "Depozit și mișcări de marfă",
          summary: "Solduri pe mai multe depozite și jurnal nemodificabil al mișcărilor. Înregistrați singuri mișcări în modelul interactiv.",
          points: [
            "IN mărește soldul depozitului ales.",
            "OUT micșorează soldul; nu se poate scoate mai mult decât există.",
            "ADJUSTMENT este o modificare cu semn: +3 adaugă, −2 scade.",
            "TRANSFER mută cantitatea din depozitul sursă în depozitul destinație.",
          ],
        },
        en: {
          title: "Inventory and stock movements",
          summary: "Balances across several warehouses and an immutable movement ledger. Post movements yourself in the interactive model.",
          points: [
            "IN increases the selected warehouse balance.",
            "OUT decreases it; you can't write off more than is on hand.",
            "ADJUSTMENT is a signed change: +3 adds, −2 removes.",
            "TRANSFER moves quantity from a source warehouse to a destination.",
          ],
        },
      },
    },
    {
      slug: "hr",
      shot: erpShots.org,
      text: {
        ru: {
          title: "Персонал и отпуска",
          summary: "Каталог сотрудников, структура подчинения и заявки на отпуск с согласованием.",
          points: [
            "Карточка сотрудника и доступ в ERP — разные записи: логин выдаётся через участников.",
            "Дерево структуры строится по полю «руководитель»; циклическое подчинение запрещено.",
            "Рабочие дни отпуска считаются без суббот и воскресений, обе границы включены.",
            "Пересекающиеся заявки одного сотрудника отклоняются.",
          ],
        },
        ro: {
          title: "Personal și concedii",
          summary: "Catalogul angajaților, structura de subordonare și cererile de concediu cu aprobare.",
          points: [
            "Fișa angajatului și accesul în ERP sunt înregistrări diferite: contul se acordă prin membri.",
            "Arborele structurii se construiește după câmpul „conducător”; subordonarea circulară este interzisă.",
            "Zilele lucrătoare de concediu se calculează fără sâmbete și duminici, inclusiv ambele capete.",
            "Cererile suprapuse ale aceluiași angajat sunt respinse.",
          ],
        },
        en: {
          title: "People and leave",
          summary: "Employee directory, reporting structure and leave requests with approval.",
          points: [
            "An employee record and ERP access are separate: logins are granted through members.",
            "The org tree is built from the manager field; circular reporting is not allowed.",
            "Leave counts working days only, excluding weekends, with both ends included.",
            "Overlapping requests for the same employee are rejected.",
          ],
        },
      },
    },
    {
      slug: "projects",
      shot: erpShots.projects,
      text: {
        ru: {
          title: "Проекты и задачи",
          summary: "Канбан и список задач, прогресс по готовым задачам и бюджет из расходов.",
          points: [
            "Задача проходит колонки: к выполнению, в работе, на проверке, готово.",
            "Прогресс — доля готовых задач от общего числа.",
            "Использованный бюджет складывается из расходов, привязанных к проекту.",
            "Временная шкала показывает проекты с заданными датами.",
          ],
        },
        ro: {
          title: "Proiecte și sarcini",
          summary: "Kanban și listă de sarcini, progres după sarcinile finalizate și buget din cheltuieli.",
          points: [
            "Sarcina trece prin coloane: de făcut, în lucru, în verificare, gata.",
            "Progresul este ponderea sarcinilor finalizate din total.",
            "Bugetul consumat se compune din cheltuielile legate de proiect.",
            "Cronologia arată proiectele cu date stabilite.",
          ],
        },
        en: {
          title: "Projects and tasks",
          summary: "Kanban and list views, progress from completed tasks and budget from expenses.",
          points: [
            "A task moves through columns: to do, in progress, in review, done.",
            "Progress is the share of completed tasks.",
            "Spent budget is the sum of expenses linked to the project.",
            "The timeline shows projects that have dates set.",
          ],
        },
      },
    },
    {
      slug: "access",
      shot: erpShots.audit,
      text: {
        ru: {
          title: "Доступы и аудит",
          summary: "Пять ролей, одноразовые приглашения и журнал изменений «до и после».",
          points: [
            "Приглашение — приватная ссылка на семь дней; её можно отозвать.",
            "Деактивация сохраняет записи и историю, но отзывает сессии пользователя.",
            "Последнего активного администратора убрать нельзя.",
            "В журнале аудита видны автор, модуль, действие и значения до и после.",
          ],
        },
        ro: {
          title: "Accese și audit",
          summary: "Cinci roluri, invitații de unică folosință și jurnal de modificări „înainte și după”.",
          points: [
            "Invitația este un link privat valabil șapte zile; poate fi revocată.",
            "Dezactivarea păstrează înregistrările și istoricul, dar închide sesiunile utilizatorului.",
            "Ultimul administrator activ nu poate fi eliminat.",
            "Jurnalul de audit arată autorul, modulul, acțiunea și valorile înainte și după.",
          ],
        },
        en: {
          title: "Access and audit",
          summary: "Five roles, single-use invitations and a before-and-after change log.",
          points: [
            "An invitation is a private link valid for seven days; it can be revoked.",
            "Deactivation keeps records and history but ends the user's sessions.",
            "The last active administrator cannot be removed.",
            "The audit log shows author, module, action and before and after values.",
          ],
        },
      },
    },
  ],
};
