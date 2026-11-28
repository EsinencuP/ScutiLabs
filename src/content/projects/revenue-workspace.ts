import type { Project } from "./types";

export const revenueWorkspace: Project = {
  slug: "revenue-workspace",
  status: "demo",
  year: 2026,
  services: ["crm-sales", "documents-approvals", "analytics-control"],
  layout: { workflow: "orbit", capabilities: "table" },
  moduleIcons: ["home", "contact", "kanban", "trending-up", "trophy", "coins", "receipt", "chart"],
  links: {
    demo: "https://revenue-workspace.vercel.app",
    repo: "https://github.com/academ1cian/commerce-operations-workspace",
  },
  stack: ["React", "TypeScript", "Zod", "ExcelJS", "jsPDF", "fflate"],
  text: {
    ru: {
      name: "Revenue Workspace",
      kind: "ERP продаж и выручки",
      stages: ["Лид", "Сделка", "Услуга", "Счёт", "Оплата", "Комиссия"],
      tagline:
        "Продажи, выручка, счета и комиссии сервисной компании в одной системе: от первого лида до выплаты менеджеру.",
      summary:
        "Рабочее пространство отдела продаж и финансов: лиды и клиенты, воронка из восьми этапов, учёт оказанных услуг, счета с частичными оплатами и кредит-нотами, комиссии по версиям плана, результаты команды, прогноз выручки и отчёты. Семь ролей переключаются прямо в демо.",
      purpose: [
        "Revenue Workspace связывает работу менеджера с деньгами компании. Лид становится клиентом, сделка проходит по воронке, оказанная услуга превращается в признанную выручку, затем в счёт и поступление, а из выручки считается комиссия сотрудника. Все экраны и выгрузки строятся на одних и тех же записях.",
        "Система разделяет то, что в таблицах обычно смешивается: открытая воронка — не выручка, выставленный счёт — не оплата. Выручка, счета и поступления считаются каждая по своей дате, а смена ответственного за клиента не переписывает историю прошлых продаж и начисленных комиссий.",
      ],
      facts: [
        { label: "Тип", value: "ERP продаж и выручки для сервисной компании" },
        { label: "Модули", value: "CRM, воронка, биллинг, комиссии, аналитика, отчёты" },
        { label: "Роли", value: "Семь ролей, переключаются в демо" },
        { label: "Доступ", value: "Открытое демо, данные в браузере" },
      ],
      workflow: [
        {
          actor: "SDR / менеджер",
          action: "Создаёт лида, фиксирует звонок и квалифицирует его, затем конвертирует в клиента.",
          result: "Появляются клиент, контакт и запись о владельце; активности лида переходят к клиенту.",
        },
        {
          actor: "Менеджер",
          action: "Ведёт сделку по восьми этапам на канбане, записывает звонки, встречи и следующий шаг.",
          result: "История этапов и причины проигрыша сохраняются, следующий шаг становится задачей.",
        },
        {
          actor: "Аккаунт-менеджер",
          action: "Готовит коммерческое предложение и фиксирует оказанную услугу.",
          result: "Выручка признаётся по дате оказания и делится между сотрудниками по долям.",
        },
        {
          actor: "Финансы",
          action: "Выставляет счёт по неоплаченным услугам, регистрирует частичную оплату или кредит-ноту.",
          result: "Остаток, просрочка и дебиторка по срокам пересчитываются автоматически.",
        },
        {
          actor: "Финансы",
          action: "Формирует ведомость комиссий по действующей версии плана и утверждает выплату.",
          result: "Комиссия учитывает долю оплаты счёта; повторная выплата той же суммы невозможна.",
        },
        {
          actor: "Директор по продажам",
          action: "Сравнивает команду с целями, смотрит прогноз и клиентов в зоне риска, запускает правила.",
          result: "Задачи по рискам создаются без дублей, отчёты выгружаются в CSV, XLSX и PDF.",
        },
      ],
      modules: [
        { name: "Мой рабочий стол", brief: "Показатели роли, задачи на сегодня и просрочки" },
        { name: "Клиенты и CRM", brief: "Лиды, контакты, клиенты, карточка 360° и история владельцев" },
        { name: "Воронка и активности", brief: "Канбан и таблица из восьми этапов, звонки и встречи" },
        { name: "Аналитика выручки", brief: "Выручка, маржа, удержание, здоровье клиентов и прогноз" },
        { name: "Результаты команды", brief: "Рейтинг сотрудников, цели по дням периода, вклад в выручку" },
        { name: "Комиссии", brief: "Версии планов, ступени ставок, бонусы, утверждение выплат" },
        { name: "Счета и оплаты", brief: "КП, счета, частичные оплаты, кредит-ноты, регулярный биллинг" },
        { name: "Отчёты и автоматизации", brief: "12 отчётов, календарь, шесть правил с задачами" },
      ],
      strengths: [
        "Воронка, признанная выручка, выставленные счета и поступления считаются раздельно, каждая по своей дате.",
        "Суммы хранятся в целых центах, доли — в базисных пунктах: доли сотрудников сходятся с итогом компании до цента.",
        "Смена ответственного за клиента не переписывает прошлые продажи и начисленные комиссии.",
        "Кредит-нота сторнирует выручку, себестоимость, налог и комиссию исходной продажи по её же плану.",
        "Здоровье клиента объяснимо: каждое снижение оценки показано с причиной.",
        "Прогноз выбирает метод по ошибке на исторических данных и показывается отдельно от взвешенной воронки.",
      ],
      benefits: [
        "Продажи, биллинг и комиссии работают на одних записях — цифры в отчёте совпадают с экранами.",
        "Видно, какие клиенты уходят и почему, до того как выручка упадёт.",
        "Менеджер видит свой вклад и комиссию, финансы — из каких продаж она сложилась.",
        "Повторный запуск биллинга или правил не создаёт дублей.",
        "Роли под задачи: менеджер, аккаунт-менеджер, SDR/BDR, тимлид, директор, финансы, наблюдатель.",
      ],
      limits: [
        "Демо работает в браузере: данные вымышленные и хранятся локально, роли имитируются и не защищают данные.",
        "Письма, звонки, приём платежей и выплата зарплаты не выполняются по-настоящему.",
        "Регулярный биллинг и правила автоматизаций запускаются вручную.",
        "Учёт выручки — упрощённая управленческая модель, не бухгалтерский учёт; одна валюта, USD.",
        "Интерфейс демо на английском.",
      ],
      demoAccess:
        "Демо открыто без входа. Роль переключается в верхней панели; данные вымышленные, хранятся в вашем браузере и сбрасываются в настройках.",
      metaDescription:
        "Revenue Workspace — ERP продаж и выручки: лиды, воронка, счета и оплаты, кредит-ноты, комиссии, результаты команды, прогноз и отчёты. Открытое демо.",
    },
    ro: {
      name: "Revenue Workspace",
      kind: "ERP pentru vânzări și venituri",
      stages: ["Lead", "Tranzacție", "Serviciu", "Factură", "Plată", "Comision"],
      tagline:
        "Vânzările, veniturile, facturile și comisioanele unei companii de servicii într-un singur sistem: de la primul lead la plata managerului.",
      summary:
        "Spațiu de lucru pentru vânzări și finanțe: lead-uri și clienți, pâlnie cu opt etape, evidența serviciilor prestate, facturi cu plăți parțiale și note de credit, comisioane pe versiuni de plan, rezultatele echipei, prognoza veniturilor și rapoarte. Șapte roluri se schimbă direct în demo.",
      purpose: [
        "Revenue Workspace leagă munca managerului de banii companiei. Lead-ul devine client, tranzacția trece prin pâlnie, serviciul prestat devine venit recunoscut, apoi factură și încasare, iar din venit se calculează comisionul angajatului. Toate ecranele și exporturile folosesc aceleași înregistrări.",
        "Sistemul separă ce se amestecă de obicei în tabele: pâlnia deschisă nu este venit, factura emisă nu este plată. Veniturile, facturile și încasările se calculează fiecare după data proprie, iar schimbarea responsabilului de client nu rescrie istoricul vânzărilor și al comisioanelor.",
      ],
      facts: [
        { label: "Tip", value: "ERP pentru vânzări și venituri, companie de servicii" },
        { label: "Module", value: "CRM, pâlnie, facturare, comisioane, analiză, rapoarte" },
        { label: "Roluri", value: "Șapte roluri, se schimbă în demo" },
        { label: "Acces", value: "Demo deschis, date în browser" },
      ],
      workflow: [
        {
          actor: "SDR / manager",
          action: "Creează un lead, înregistrează apelul și îl califică, apoi îl convertește în client.",
          result: "Apar clientul, contactul și înregistrarea responsabilului; activitățile lead-ului trec la client.",
        },
        {
          actor: "Manager",
          action: "Duce tranzacția prin opt etape pe kanban, notează apeluri, întâlniri și pasul următor.",
          result: "Istoricul etapelor și motivele pierderii se păstrează, pasul următor devine sarcină.",
        },
        {
          actor: "Account manager",
          action: "Pregătește oferta comercială și înregistrează serviciul prestat.",
          result: "Venitul se recunoaște la data prestării și se împarte între angajați pe cote.",
        },
        {
          actor: "Finanțe",
          action: "Emite factura pentru serviciile nefacturate, înregistrează o plată parțială sau o notă de credit.",
          result: "Soldul, restanța și vechimea creanțelor se recalculează automat.",
        },
        {
          actor: "Finanțe",
          action: "Generează situația comisioanelor după versiunea activă a planului și aprobă plata.",
          result: "Comisionul ține cont de cota achitată a facturii; aceeași sumă nu poate fi plătită de două ori.",
        },
        {
          actor: "Director de vânzări",
          action: "Compară echipa cu țintele, vede prognoza și clienții în risc, rulează regulile.",
          result: "Sarcinile pe riscuri se creează fără dubluri, rapoartele se exportă în CSV, XLSX și PDF.",
        },
      ],
      modules: [
        { name: "Spațiul meu", brief: "Indicatorii rolului, sarcinile zilei și restanțele" },
        { name: "Clienți și CRM", brief: "Lead-uri, contacte, clienți, fișă 360° și istoricul responsabililor" },
        { name: "Pâlnie și activități", brief: "Kanban și tabel cu opt etape, apeluri și întâlniri" },
        { name: "Analiza veniturilor", brief: "Venit, marjă, retenție, sănătatea clienților și prognoză" },
        { name: "Rezultatele echipei", brief: "Clasamentul angajaților, ținte pe zile, contribuția la venit" },
        { name: "Comisioane", brief: "Versiuni de plan, trepte de rată, bonusuri, aprobarea plăților" },
        { name: "Facturi și plăți", brief: "Oferte, facturi, plăți parțiale, note de credit, facturare recurentă" },
        { name: "Rapoarte și automatizări", brief: "12 rapoarte, calendar, șase reguli cu sarcini" },
      ],
      strengths: [
        "Pâlnia, venitul recunoscut, facturile emise și încasările se calculează separat, fiecare după data proprie.",
        "Sumele se păstrează în cenți întregi, cotele în puncte de bază: cotele angajaților se închid cu totalul companiei la cent.",
        "Schimbarea responsabilului de client nu rescrie vânzările trecute și comisioanele calculate.",
        "Nota de credit stornează venitul, costul, taxa și comisionul vânzării inițiale după planul ei.",
        "Sănătatea clientului este explicabilă: fiecare scădere a scorului are motivul afișat.",
        "Prognoza alege metoda după eroarea pe date istorice și se afișează separat de pâlnia ponderată.",
      ],
      benefits: [
        "Vânzările, facturarea și comisioanele folosesc aceleași înregistrări — cifrele din raport coincid cu ecranele.",
        "Se vede care clienți pleacă și de ce, înainte să scadă venitul.",
        "Managerul își vede contribuția și comisionul, finanțele — din ce vânzări s-a format.",
        "Rularea repetată a facturării sau a regulilor nu creează dubluri.",
        "Roluri pe sarcini: manager, account manager, SDR/BDR, team lead, director, finanțe, observator.",
      ],
      limits: [
        "Demo-ul rulează în browser: datele sunt fictive și locale, rolurile sunt simulate și nu protejează datele.",
        "E-mailurile, apelurile, încasarea plăților și salariile nu se execută real.",
        "Facturarea recurentă și regulile de automatizare se pornesc manual.",
        "Evidența veniturilor este un model managerial simplificat, nu contabilitate; o singură monedă, USD.",
        "Interfața demo-ului este în engleză.",
      ],
      demoAccess:
        "Demo deschis fără autentificare. Rolul se schimbă în bara de sus; datele sunt fictive, păstrate în browserul dvs. și se resetează din setări.",
      metaDescription:
        "Revenue Workspace — ERP pentru vânzări și venituri: lead-uri, pâlnie, facturi și plăți, note de credit, comisioane, rezultatele echipei, prognoză și rapoarte. Demo deschis.",
    },
    en: {
      name: "Revenue Workspace",
      kind: "Sales and revenue ERP",
      stages: ["Lead", "Deal", "Service", "Invoice", "Payment", "Commission"],
      tagline:
        "A service company's sales, revenue, invoices and commissions in one system: from the first lead to the rep's payout.",
      summary:
        "A workspace for sales and finance: leads and accounts, an eight-stage pipeline, delivered service records, invoices with partial payments and credit notes, versioned commission plans, team performance, revenue forecasts and reports. Seven roles can be switched right in the demo.",
      purpose: [
        "Revenue Workspace connects a rep's work to the company's money. A lead becomes an account, the deal moves through the pipeline, delivered service becomes recognized revenue, then an invoice and a payment, and the rep's commission is calculated from that revenue. Every screen and export is built on the same records.",
        "The system separates what spreadsheets usually blend: open pipeline isn't revenue, and an issued invoice isn't cash. Revenue, billing and collections each use their own dates, and reassigning an account doesn't rewrite the history of past sales and earned commissions.",
      ],
      facts: [
        { label: "Type", value: "Sales and revenue ERP for a service company" },
        { label: "Modules", value: "CRM, pipeline, billing, commissions, analytics, reports" },
        { label: "Roles", value: "Seven roles, switchable in the demo" },
        { label: "Access", value: "Open demo, data stays in the browser" },
      ],
      workflow: [
        {
          actor: "SDR / rep",
          action: "Creates a lead, logs a call and qualifies it, then converts it into an account.",
          result: "An account, a contact and an ownership record appear; the lead's activities move to the account.",
        },
        {
          actor: "Sales rep",
          action: "Moves the deal through eight stages on a kanban, logging calls, meetings and the next step.",
          result: "Stage history and lost reasons are kept; the next step becomes a follow-up task.",
        },
        {
          actor: "Account manager",
          action: "Prepares a quote and records the delivered service.",
          result: "Revenue is recognized on the delivery date and split between employees by share.",
        },
        {
          actor: "Finance",
          action: "Issues an invoice from unbilled services, records a partial payment or a credit note.",
          result: "Balance, overdue amounts and receivables aging recalculate automatically.",
        },
        {
          actor: "Finance",
          action: "Builds the commission statement from the effective plan version and approves the payout.",
          result: "Commission follows how much of the invoice is paid; the same amount can't be paid out twice.",
        },
        {
          actor: "Sales director",
          action: "Compares the team with targets, reviews the forecast and at-risk accounts, runs the rules.",
          result: "Risk tasks are created without duplicates; reports export to CSV, XLSX and PDF.",
        },
      ],
      modules: [
        { name: "My workspace", brief: "Role metrics, today's follow-ups and overdue work" },
        { name: "Accounts and CRM", brief: "Leads, contacts, accounts, a 360° view and ownership history" },
        { name: "Pipeline and activities", brief: "Eight-stage kanban and table, calls and meetings" },
        { name: "Revenue intelligence", brief: "Revenue, margin, retention, account health and forecasts" },
        { name: "Team performance", brief: "Employee ranking, prorated targets, revenue contribution" },
        { name: "Commissions", brief: "Plan versions, rate tiers, bonuses, payout approval" },
        { name: "Billing and payments", brief: "Quotes, invoices, partial payments, credits, recurring billing" },
        { name: "Reports and automations", brief: "12 reports, a calendar, six rules that create tasks" },
      ],
      strengths: [
        "Pipeline, recognized revenue, billed amounts and collections are calculated separately, each on its own dates.",
        "Amounts are stored as integer cents and shares as basis points: employee splits reconcile with the company total to the cent.",
        "Reassigning an account doesn't rewrite past sales or earned commissions.",
        "A credit note reverses the original sale's revenue, cost, tax and commission under that sale's plan.",
        "Account health is explainable: every deduction from the score is shown with its reason.",
        "The forecast picks its method by historical error and is shown apart from the weighted pipeline.",
      ],
      benefits: [
        "Sales, billing and commissions run on the same records, so report figures match the screens.",
        "You see which accounts are slipping and why before revenue drops.",
        "Reps see their contribution and commission; finance sees which sales it came from.",
        "Re-running billing or rules creates no duplicates.",
        "Roles for each job: rep, account manager, SDR/BDR, team lead, director, finance, viewer.",
      ],
      limits: [
        "The demo runs in the browser: data is fictional and local, and roles are simulated, not access control.",
        "Emails, calls, payment processing and payroll aren't actually executed.",
        "Recurring billing and automation rules are run manually.",
        "The revenue ledger is a simplified management model, not statutory accounting; single currency, USD.",
      ],
      demoAccess:
        "Open demo with no sign-in. Switch roles in the top bar; data is fictional, stays in your browser and can be reset in Settings.",
      metaDescription:
        "Revenue Workspace is a sales and revenue ERP: leads, pipeline, invoices and payments, credit notes, commissions, team performance, forecasts and reports. Open demo.",
    },
  },
};
