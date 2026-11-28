import type { Project } from "./types";

export const evoErp: Project = {
  slug: "evo-erp",
  status: "demo",
  year: 2026,
  services: ["erp-operations", "crm-sales", "documents-approvals", "hr-team", "analytics-control"],
  layout: { workflow: "relay", capabilities: "solar" },
  moduleIcons: ["dashboard", "users", "wallet", "package", "id-card", "kanban", "shield"],
  links: {
    demo: "https://erp-xi-pink.vercel.app",
    guide: "https://erp-xi-pink.vercel.app/user-guide.html",
    repo: "https://github.com/EsinencuP/ERP",
  },
  demoCredentials: { login: "admin@erp.dev", password: "Admin123!" },
  stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Prisma", "Auth.js", "Zod", "next-intl", "TanStack Table", "dnd-kit", "Recharts", "React-PDF"],
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
        { name: "Обзор", brief: "Ключевые показатели на одном экране" },
        { name: "CRM", brief: "Контакты, воронка, активности" },
        { name: "Финансы", brief: "Счета, оплаты, расходы, P&L" },
        { name: "Склад", brief: "Остатки и движения по складам" },
        { name: "Персонал", brief: "Сотрудники, структура, отпуска" },
        { name: "Проекты", brief: "Задачи, прогресс и бюджет" },
        { name: "Настройки", brief: "Роли, приглашения, аудит" },
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
        { name: "Panou", brief: "Indicatorii cheie pe un singur ecran" },
        { name: "CRM", brief: "Contacte, pâlnie, activități" },
        { name: "Finanțe", brief: "Facturi, plăți, cheltuieli, P&L" },
        { name: "Depozit", brief: "Stocuri și mișcări pe depozite" },
        { name: "Personal", brief: "Angajați, structură, concedii" },
        { name: "Proiecte", brief: "Sarcini, progres și buget" },
        { name: "Setări", brief: "Roluri, invitații, audit" },
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
        { name: "Dashboard", brief: "Key figures on one screen" },
        { name: "CRM", brief: "Contacts, pipeline, activities" },
        { name: "Finance", brief: "Invoices, payments, expenses, P&L" },
        { name: "Inventory", brief: "Stock and movements by warehouse" },
        { name: "HR", brief: "People, org chart, time off" },
        { name: "Projects", brief: "Tasks, progress and budget" },
        { name: "Settings", brief: "Roles, invitations, audit" },
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
};
