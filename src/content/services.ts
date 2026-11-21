import type { L10n } from "@/i18n/config";

export const serviceSlugs = [
  "hr-team",
  "documents-approvals",
  "crm-sales",
  "erp-operations",
  "procurement-forecasting",
  "analytics-control",
] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];

type ServiceText = {
  name: string;
  short: string;
  purpose: string;
  processes: string[];
  outcomes: string[];
  metaDescription: string;
};

export type Service = {
  slug: ServiceSlug;
  /** Orbit index (0 = closest to the star) and angle in degrees for the star-system map. */
  orbit: 0 | 1 | 2;
  angle: number;
  /** Planet radius in the star-system map. */
  size: number;
  text: L10n<ServiceText>;
};

export const services: Service[] = [
  {
    slug: "crm-sales",
    orbit: 0,
    angle: 205,
    size: 15,
    text: {
      ru: {
        name: "CRM и продажи",
        short: "Заявки с сайта, мессенджеров и звонков попадают в воронку и не теряются.",
        purpose:
          "Строим CRM под реальный цикл продаж компании: откуда приходят заявки, кто их обрабатывает, какие этапы проходит сделка. Менеджеры получают уведомления там, где уже работают, а руководитель видит воронку и места, где сделки застревают.",
        processes: [
          "Приём заявок с сайта и каталога с защитой от дублей",
          "Уведомления менеджерам в Telegram и смена статуса ответом на сообщение",
          "Воронка сделок с этапами и перетаскиванием карточек",
          "Карточка клиента: контакты, история общения, заказы",
          "Активности: звонки, письма, встречи, задачи",
          "Запись на консультации по свободным слотам",
          "Источники заявок и UTM-атрибуция",
        ],
        outcomes: [
          "Заявка сохраняется до отправки уведомления, поэтому потерять её нельзя.",
          "Следующий шаг по клиенту виден всей команде.",
          "Руководитель видит, на каком этапе застревают сделки.",
        ],
        metaDescription:
          "Разработка CRM под цикл продаж: приём заявок без потерь, уведомления в Telegram, воронка сделок, карточки клиентов и аналитика источников.",
      },
      ro: {
        name: "CRM și vânzări",
        short: "Cererile de pe site, din mesagerii și apeluri ajung în pâlnie și nu se pierd.",
        purpose:
          "Construim CRM-ul după ciclul real de vânzări al companiei: de unde vin cererile, cine le procesează, prin ce etape trece o tranzacție. Managerii primesc notificări acolo unde lucrează deja, iar conducerea vede pâlnia și etapele unde tranzacțiile stagnează.",
        processes: [
          "Preluarea cererilor de pe site și din catalog, cu protecție la duplicate",
          "Notificări pentru manageri în Telegram și schimbarea statusului prin răspuns",
          "Pâlnie de tranzacții cu etape și carduri mutate prin drag-and-drop",
          "Fișa clientului: contacte, istoricul comunicării, comenzi",
          "Activități: apeluri, e-mailuri, întâlniri, sarcini",
          "Programări la consultații pe intervale libere",
          "Sursele cererilor și atribuirea UTM",
        ],
        outcomes: [
          "Cererea este salvată înainte de trimiterea notificării, deci nu poate fi pierdută.",
          "Următorul pas cu clientul este vizibil pentru toată echipa.",
          "Conducerea vede la ce etapă stagnează tranzacțiile.",
        ],
        metaDescription:
          "Dezvoltare CRM adaptat ciclului de vânzări: cereri fără pierderi, notificări în Telegram, pâlnie de tranzacții, fișe de client și analiza surselor.",
      },
      en: {
        name: "CRM and sales",
        short: "Requests from the website, messengers and calls land in the pipeline and stay there.",
        purpose:
          "We build a CRM around the company's actual sales cycle: where requests come from, who handles them, which stages a deal goes through. Managers get notified where they already work, and leadership sees the pipeline and the stages where deals stall.",
        processes: [
          "Request intake from the website and catalogue with duplicate protection",
          "Telegram notifications for managers and status changes by reply",
          "Deal pipeline with stages and drag-and-drop cards",
          "Customer profile: contacts, communication history, orders",
          "Activities: calls, emails, meetings, tasks",
          "Consultation booking on open time slots",
          "Request sources and UTM attribution",
        ],
        outcomes: [
          "A request is stored before any notification goes out, so it cannot be lost.",
          "The next step with each customer is visible to the whole team.",
          "Leadership sees the stage where deals get stuck.",
        ],
        metaDescription:
          "CRM development around your sales cycle: loss-free request intake, Telegram notifications, deal pipeline, customer profiles and source analytics.",
      },
    },
  },
  {
    slug: "erp-operations",
    orbit: 1,
    angle: 330,
    size: 21,
    text: {
      ru: {
        name: "ERP и операционные процессы",
        short: "Продажи, финансы, склад, персонал и проекты в одном рабочем пространстве.",
        purpose:
          "Связываем подразделения в систему, где данные вводятся один раз: сделка превращается в счёт, оплата — в отчёт, расход проекта — в использованный бюджет. Каждая компания или филиал работает в своём пространстве с собственными правами доступа.",
        processes: [
          "Склады, остатки и движения товара: поступление, списание, перемещение",
          "Счета, платежи и частичные оплаты",
          "Расходы с категориями и привязкой к проектам",
          "Проекты и задачи в канбане и списке",
          "Отдельные рабочие пространства для компаний и филиалов",
          "Роли доступа с проверкой прав на сервере",
          "Журнал аудита значимых действий",
        ],
        outcomes: [
          "Один источник данных вместо десятка таблиц.",
          "Складская история неизменяема: ошибка исправляется новым движением.",
          "Финансовые показатели считаются по зарегистрированным операциям.",
        ],
        metaDescription:
          "Разработка ERP: склад и движения товара, счета и платежи, расходы, проекты, роли доступа и аудит в одном рабочем пространстве.",
      },
      ro: {
        name: "ERP și procese operaționale",
        short: "Vânzări, finanțe, depozit, personal și proiecte într-un singur spațiu de lucru.",
        purpose:
          "Conectăm departamentele într-un sistem în care datele se introduc o singură dată: tranzacția devine factură, plata devine raport, cheltuiala proiectului devine buget consumat. Fiecare companie sau filială lucrează în propriul spațiu, cu drepturi de acces separate.",
        processes: [
          "Depozite, stocuri și mișcări de marfă: intrare, ieșire, transfer",
          "Facturi, plăți și achitări parțiale",
          "Cheltuieli pe categorii, legate de proiecte",
          "Proiecte și sarcini în kanban și listă",
          "Spații de lucru separate pentru companii și filiale",
          "Roluri de acces cu verificarea drepturilor pe server",
          "Jurnal de audit pentru acțiunile importante",
        ],
        outcomes: [
          "O singură sursă de date în locul a zeci de tabele.",
          "Istoricul depozitului nu se modifică: eroarea se corectează printr-o mișcare nouă.",
          "Indicatorii financiari se calculează din operațiunile înregistrate.",
        ],
        metaDescription:
          "Dezvoltare ERP: depozit și mișcări de marfă, facturi și plăți, cheltuieli, proiecte, roluri de acces și audit într-un singur spațiu de lucru.",
      },
      en: {
        name: "ERP and operations",
        short: "Sales, finance, inventory, people and projects in one workspace.",
        purpose:
          "We connect departments into one system where data is entered once: a deal becomes an invoice, a payment becomes a report line, a project expense becomes spent budget. Each company or branch works in its own workspace with its own access rights.",
        processes: [
          "Warehouses, stock levels and movements: receipt, write-off, transfer",
          "Invoices, payments and partial payments",
          "Expenses by category, linked to projects",
          "Projects and tasks in kanban and list views",
          "Separate workspaces for companies and branches",
          "Access roles enforced on the server",
          "Audit log of significant actions",
        ],
        outcomes: [
          "One source of data instead of a dozen spreadsheets.",
          "Stock history is immutable: a mistake is fixed with a new movement.",
          "Financial figures come from recorded transactions.",
        ],
        metaDescription:
          "ERP development: inventory and stock movements, invoices and payments, expenses, projects, access roles and audit in a single workspace.",
      },
    },
  },
  {
    slug: "documents-approvals",
    orbit: 0,
    angle: 25,
    size: 12,
    text: {
      ru: {
        name: "Документы и согласования",
        short: "Счета, акты и предложения собираются из данных, а согласование идёт по маршруту.",
        purpose:
          "Автоматизируем документы, которые сейчас собирают вручную из нескольких таблиц: счета, акты, коммерческие предложения, внутренние приказы. Документ формируется из данных системы, проходит маршрут согласования, а история изменений сохраняется.",
        processes: [
          "Формирование PDF по шаблону: счета, акты, предложения",
          "Сквозная нумерация документов, например INV-2026-0001",
          "Маршруты согласования с ответственным на каждом шаге",
          "Статусы документа: черновик, отправлен, оплачен, отменён",
          "Журнал изменений «до и после» по каждому документу",
          "Реестр документов с поиском и фильтрами",
          "Напоминания о сроках оплаты и согласования",
        ],
        outcomes: [
          "Документ не собирают заново: данные берутся из CRM и учёта.",
          "Видно, на каком шаге согласование и кто его задерживает.",
          "Суммы и налоги считает система, а не человек.",
        ],
        metaDescription:
          "Автоматизация документов и согласований: PDF по шаблонам, нумерация, маршруты согласования, статусы и история изменений.",
      },
      ro: {
        name: "Documente și aprobări",
        short: "Facturile, actele și ofertele se generează din date, iar aprobarea urmează un traseu.",
        purpose:
          "Automatizăm documentele care astăzi se adună manual din mai multe tabele: facturi, acte, oferte comerciale, ordine interne. Documentul se generează din datele sistemului, trece prin traseul de aprobare, iar istoricul modificărilor se păstrează.",
        processes: [
          "Generare PDF după șablon: facturi, acte, oferte",
          "Numerotare continuă a documentelor, de exemplu INV-2026-0001",
          "Trasee de aprobare cu un responsabil la fiecare pas",
          "Statusuri: ciornă, trimis, achitat, anulat",
          "Jurnal de modificări „înainte și după” pentru fiecare document",
          "Registru de documente cu căutare și filtre",
          "Mementouri despre termenele de plată și aprobare",
        ],
        outcomes: [
          "Documentul nu se mai compune de la zero: datele vin din CRM și contabilitate.",
          "Se vede la ce pas este aprobarea și cine o întârzie.",
          "Sumele și taxele le calculează sistemul, nu omul.",
        ],
        metaDescription:
          "Automatizarea documentelor și aprobărilor: PDF după șabloane, numerotare, trasee de aprobare, statusuri și istoricul modificărilor.",
      },
      en: {
        name: "Documents and approvals",
        short: "Invoices, acts and proposals are built from data, and approval follows a route.",
        purpose:
          "We automate documents that are still assembled by hand from several spreadsheets: invoices, acceptance acts, proposals, internal orders. A document is generated from system data, goes through an approval route, and its change history is kept.",
        processes: [
          "Template-based PDF: invoices, acts, proposals",
          "Sequential numbering, for example INV-2026-0001",
          "Approval routes with an owner at every step",
          "Document statuses: draft, sent, paid, cancelled",
          "Before-and-after change log for every document",
          "Document registry with search and filters",
          "Reminders for payment and approval deadlines",
        ],
        outcomes: [
          "Nobody rebuilds a document: the data comes from the CRM and accounting.",
          "You can see which step an approval is on and who is holding it.",
          "Totals and taxes are calculated by the system, not by a person.",
        ],
        metaDescription:
          "Document and approval automation: template PDFs, numbering, approval routes, statuses and change history.",
      },
    },
  },
  {
    slug: "hr-team",
    orbit: 1,
    angle: 140,
    size: 13,
    text: {
      ru: {
        name: "HR и работа команды",
        short: "Сотрудники, структура, отпуска и доступы в одной системе, а не в переписке.",
        purpose:
          "Собираем кадровые данные и внутренние заявки в одно место: кто в какой команде, кто кому подчиняется, кто согласует отпуск и у кого какой доступ к системам. Руководитель видит очередь решений, сотрудник — статус своей заявки.",
        processes: [
          "Каталог сотрудников с контактами и документами",
          "Организационная структура и подчинённость",
          "Заявки на отпуск с подсчётом рабочих дней и согласованием",
          "Годовые лимиты отпуска и остатки",
          "Приглашение сотрудников в систему и роли доступа",
          "Внутренние заявки: оборудование, доступы, справки",
          "Чек-лист первых дней для нового сотрудника",
        ],
        outcomes: [
          "Заявки не теряются в мессенджерах: у каждой есть статус и согласующий.",
          "Структура компании видна без отдельной таблицы.",
          "Доступ к данным определяется ролью, а не договорённостью.",
        ],
        metaDescription:
          "Автоматизация HR: каталог сотрудников, оргструктура, заявки на отпуск с согласованием, лимиты, роли доступа и онбординг.",
      },
      ro: {
        name: "HR și munca echipei",
        short: "Angajați, structură, concedii și accese într-un singur sistem, nu în conversații.",
        purpose:
          "Adunăm datele de personal și cererile interne într-un singur loc: cine în ce echipă lucrează, cui se subordonează, cine aprobă concediul și ce acces are fiecare la sisteme. Conducătorul vede coada de decizii, angajatul vede statusul cererii sale.",
        processes: [
          "Catalogul angajaților cu contacte și documente",
          "Structura organizațională și subordonarea",
          "Cereri de concediu cu calculul zilelor lucrătoare și aprobare",
          "Limite anuale de concediu și soldul rămas",
          "Invitarea angajaților în sistem și roluri de acces",
          "Cereri interne: echipamente, accese, certificate",
          "Listă de verificare pentru primele zile ale unui angajat nou",
        ],
        outcomes: [
          "Cererile nu se pierd în mesagerii: fiecare are status și aprobator.",
          "Structura companiei se vede fără un tabel separat.",
          "Accesul la date depinde de rol, nu de o înțelegere verbală.",
        ],
        metaDescription:
          "Automatizare HR: catalogul angajaților, structură organizațională, cereri de concediu cu aprobare, limite, roluri de acces și integrare.",
      },
      en: {
        name: "HR and teamwork",
        short: "People, structure, leave and access in one system instead of chat threads.",
        purpose:
          "We bring personnel data and internal requests into one place: who is on which team, who reports to whom, who approves leave and who has access to which systems. Managers see their decision queue; employees see the status of their request.",
        processes: [
          "Employee directory with contacts and documents",
          "Org chart and reporting lines",
          "Leave requests with working-day calculation and approval",
          "Annual leave allowances and balances",
          "Inviting employees into the system with access roles",
          "Internal requests: equipment, access, certificates",
          "First-days checklist for new hires",
        ],
        outcomes: [
          "Requests don't get lost in messengers: each has a status and an approver.",
          "The company structure is visible without a separate spreadsheet.",
          "Access to data depends on a role, not on a verbal agreement.",
        ],
        metaDescription:
          "HR automation: employee directory, org chart, leave requests with approval, allowances, access roles and onboarding.",
      },
    },
  },
  {
    slug: "procurement-forecasting",
    orbit: 2,
    angle: 265,
    size: 17,
    text: {
      ru: {
        name: "Закупки и прогнозирование",
        short: "Сколько заказать у поставщика — по истории продаж, а не на глаз.",
        purpose:
          "Используем историю продаж для планирования закупок: прогноз спроса на ближайшие месяцы, рекомендуемый объём заказа, сигналы о низком остатке. Правила прогноза прозрачны: менеджер видит, как получено число, и подтверждает закупку сам.",
        processes: [
          "Прогноз спроса по скользящим окнам продаж",
          "Рекомендуемый объём заказа с запасом",
          "Минимальные остатки и сигналы на пополнение",
          "Снимки закупочных и розничных цен на момент продажи",
          "Маржа по товарам и группам",
          "Сезонные правила и планирование мероприятий",
          "Заявки на закупку с согласованием",
        ],
        outcomes: [
          "Меньше дефицита популярных позиций и денег, замороженных в остатках.",
          "Прогноз объясним: веса и ограничения записаны явно.",
          "Маржа считается по ценам на момент продажи, а не по текущему прайсу.",
        ],
        metaDescription:
          "Автоматизация закупок: прогноз спроса по истории продаж, рекомендуемый объём заказа, минимальные остатки, маржа и сезонность.",
      },
      ro: {
        name: "Achiziții și prognoză",
        short: "Cât să comanzi de la furnizor — după istoricul vânzărilor, nu din ochi.",
        purpose:
          "Folosim istoricul vânzărilor pentru planificarea achizițiilor: prognoza cererii pentru lunile următoare, volumul recomandat de comandă, semnale despre stoc scăzut. Regulile prognozei sunt transparente: managerul vede cum s-a obținut cifra și confirmă singur achiziția.",
        processes: [
          "Prognoza cererii pe ferestre glisante de vânzări",
          "Volum recomandat de comandă, cu rezervă",
          "Stocuri minime și semnale de reaprovizionare",
          "Prețurile de achiziție și de vânzare fixate la momentul vânzării",
          "Marja pe produse și grupe",
          "Reguli sezoniere și planificarea evenimentelor",
          "Cereri de achiziție cu aprobare",
        ],
        outcomes: [
          "Mai puține lipsuri la produsele populare și mai puțini bani blocați în stoc.",
          "Prognoza poate fi explicată: ponderile și limitele sunt scrise explicit.",
          "Marja se calculează după prețurile de la momentul vânzării, nu după lista curentă.",
        ],
        metaDescription:
          "Automatizarea achizițiilor: prognoza cererii din istoricul vânzărilor, volum recomandat de comandă, stocuri minime, marjă și sezonalitate.",
      },
      en: {
        name: "Procurement and forecasting",
        short: "How much to order from a supplier, based on sales history rather than a guess.",
        purpose:
          "We use sales history to plan purchasing: demand forecast for the coming months, a recommended order quantity, low-stock signals. The forecast rules are transparent: a manager sees how the number was produced and confirms the purchase.",
        processes: [
          "Demand forecast over rolling sales windows",
          "Recommended order quantity with a safety margin",
          "Minimum stock levels and reorder signals",
          "Purchase and retail price snapshots at the time of sale",
          "Margin by product and group",
          "Seasonal rules and event planning",
          "Purchase requests with approval",
        ],
        outcomes: [
          "Fewer stock-outs of popular items and less cash frozen in inventory.",
          "The forecast is explainable: weights and limits are written down.",
          "Margin uses the prices at the moment of sale, not today's price list.",
        ],
        metaDescription:
          "Procurement automation: demand forecast from sales history, recommended order quantity, minimum stock, margin and seasonality.",
      },
    },
  },
  {
    slug: "analytics-control",
    orbit: 2,
    angle: 60,
    size: 14,
    text: {
      ru: {
        name: "Аналитика и контроль",
        short: "Показатели, отчёты и аудит процессов, чтобы решения опирались на данные.",
        purpose:
          "Начинаем с аудита: где данные дублируются, где теряются и какие решения принимаются без цифр. Затем строим панели и отчёты, которые честно показывают состояние бизнеса, включая случаи, когда данных недостаточно.",
        processes: [
          "Аудит процессов и источников данных",
          "Панели показателей: выручка, маржа, средний чек, просрочка",
          "Отчёт о прибылях и убытках по периодам",
          "Распределение по регионам, источникам и товарам",
          "Выгрузки в Excel и CSV с выбором колонок",
          "Мониторинг сбоев интеграций с оповещением",
          "Журнал действий пользователей",
        ],
        outcomes: [
          "«Нет данных» отличается от нуля, поэтому отчёт не вводит в заблуждение.",
          "Сбой интеграции виден в панели раньше, чем о нём сообщит клиент.",
          "Отчёт собирается кнопкой, а не вручную в конце месяца.",
        ],
        metaDescription:
          "Аудит процессов и бизнес-аналитика: панели показателей, P&L, регионы и источники, выгрузки в Excel, мониторинг интеграций и журнал действий.",
      },
      ro: {
        name: "Analiză și control",
        short: "Indicatori, rapoarte și auditul proceselor, ca deciziile să se bazeze pe date.",
        purpose:
          "Începem cu un audit: unde datele se dublează, unde se pierd și ce decizii se iau fără cifre. Apoi construim panouri și rapoarte care arată onest starea afacerii, inclusiv situațiile în care datele nu sunt suficiente.",
        processes: [
          "Auditul proceselor și al surselor de date",
          "Panouri de indicatori: venituri, marjă, bon mediu, restanțe",
          "Raportul de profit și pierdere pe perioade",
          "Distribuția pe regiuni, surse și produse",
          "Exporturi Excel și CSV cu alegerea coloanelor",
          "Monitorizarea erorilor de integrare, cu alertă",
          "Jurnalul acțiunilor utilizatorilor",
        ],
        outcomes: [
          "„Lipsă date” se deosebește de zero, deci raportul nu induce în eroare.",
          "O eroare de integrare apare în panou înainte să o semnaleze clientul.",
          "Raportul se generează cu un buton, nu manual la sfârșit de lună.",
        ],
        metaDescription:
          "Auditul proceselor și analiză de business: panouri de indicatori, P&L, regiuni și surse, exporturi Excel, monitorizarea integrărilor și jurnal de acțiuni.",
      },
      en: {
        name: "Analytics and control",
        short: "Metrics, reports and process audits, so decisions rest on data.",
        purpose:
          "We start with an audit: where data is duplicated, where it gets lost and which decisions are made without numbers. Then we build dashboards and reports that show the state of the business honestly, including when there isn't enough data.",
        processes: [
          "Audit of processes and data sources",
          "Dashboards: revenue, margin, average order, overdue amounts",
          "Profit and loss report by period",
          "Breakdown by region, source and product",
          "Excel and CSV exports with column selection",
          "Integration failure monitoring with alerts",
          "User activity log",
        ],
        outcomes: [
          "“No data” is different from zero, so a report never misleads.",
          "An integration failure shows up on the dashboard before a customer reports it.",
          "A report is one click, not a manual job at the end of the month.",
        ],
        metaDescription:
          "Process audit and business analytics: dashboards, P&L, regions and sources, Excel exports, integration monitoring and activity logs.",
      },
    },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

