import { shot, type Project } from "./types";

const s = {
  home: shot("talentco", "home", 1440, 900, {
    ru: "Главная TalentCo: задачи сотрудника, просрочки, проекты и доступность команды",
    ro: "Pagina principală TalentCo: sarcinile angajatului, restanțe, proiecte și disponibilitatea echipei",
    en: "TalentCo home: an employee's tasks, overdue items, projects and team availability",
  }),
  pipeline: shot("talentco", "pipeline", 1440, 900, {
    ru: "Воронка кандидатов по этапам с покрытием требований вакансии",
    ro: "Pâlnia candidaților pe etape, cu acoperirea cerințelor postului",
    en: "Candidate pipeline by stage with job requirement coverage",
  }),
  screening: shot("talentco", "screening", 1440, 900, {
    ru: "ИИ-скрининг: очередь резюме и проверка требований вакансии",
    ro: "Screening AI: coada CV-urilor și verificarea cerințelor postului",
    en: "AI screening: resume queue and job requirement checks",
  }),
  automations: shot("talentco", "automations", 1440, 900, {
    ru: "Правила автоматизации найма с версиями и журналом выполнения",
    ro: "Reguli de automatizare a recrutării, cu versiuni și jurnal de execuție",
    en: "Recruiting automation rules with versions and an execution log",
  }),
  timeOff: shot("talentco", "time-off", 1440, 900, {
    ru: "Календарь отпусков команды по месяцам",
    ro: "Calendarul lunar al concediilor echipei",
    en: "Monthly team time-off calendar",
  }),
};

export const talentco: Project = {
  slug: "talentco-workspace",
  status: "demo",
  featured: true,
  year: 2026,
  services: ["hr-team", "analytics-control"],
  links: { demo: "https://talentco-team-workspace-demo.academ1cian.chatgpt.site/" },
  stack: [],
  gallery: [s.home, s.timeOff, s.pipeline, s.screening, s.automations],
  text: {
    ru: {
      name: "TalentCo Workspace",
      kind: "Портал команды и найм",
      stages: ["Задачи команды", "Проекты", "Скрининг", "Автоматизации", "Интервью", "Отчёты"],
      tagline:
        "Внутренний портал компании и система найма в одном интерфейсе: проекты, ответственность, отпуска, вакансии, кандидаты и интервью.",
      summary:
        "Интерактивный портал вымышленной компании: задачи и проекты команды, справочник сотрудников и отпуска, а также полный цикл найма — вакансии, воронка кандидатов, интервью с оценочными листами, ИИ-скрининг резюме, автоматизации и отчёты.",
      purpose: [
        "TalentCo показывает, как одна система закрывает две задачи, которые обычно живут в разных сервисах: повседневную работу команды и найм. На главной сотрудник видит свои задачи, просроченные дела, активные проекты, кто сегодня отсутствует и ближайшие события.",
        "Рекрутинговая часть ведёт кандидата от отклика до оффера: воронка по этапам с покрытием требований вакансии, структурированные интервью с независимыми оценками, автоматические задачи и уведомления на ключевых событиях, отчёты по фактическим переходам между этапами.",
      ],
      facts: [
        { label: "Тип", value: "Интранет и система найма (ATS)" },
        { label: "Разделы", value: "Команда и люди, найм" },
        { label: "Роли", value: "Переключаются прямо в демо" },
        { label: "Доступ", value: "Открытое демо, данные в браузере" },
      ],
      workflow: [
        {
          actor: "Сотрудник",
          action: "Открывает главную: свои задачи, просрочки, проекты и отсутствия коллег.",
          result: "Следующий шаг виден без поиска по чатам.",
        },
        {
          actor: "Руководитель",
          action: "Ведёт проекты и зоны ответственности с владельцами, сроками и приоритетами.",
          result: "У каждого направления есть ответственный.",
        },
        {
          actor: "Рекрутер",
          action: "Публикует вакансию и разбирает новые резюме в очереди ИИ-скрининга.",
          result: "Профиль кандидата можно поправить, требования вакансии проверяются явно.",
        },
        {
          actor: "Автоматизация",
          action: "Срабатывает на событиях: новая заявка, перевод на этап.",
          result: "Создаются задачи, уведомления, теги и отложенные письма; каждый эффект виден в журнале.",
        },
        {
          actor: "Интервьюеры",
          action: "Проводят интервью и заполняют оценочные листы независимо друг от друга.",
          result: "Рубрика сохраняется, недостающие оценки видны сразу.",
        },
        {
          actor: "HR-руководитель",
          action: "Смотрит отчёты по откликам, этапам и времени на этапе, выгружает CSV.",
          result: "Метрики считаются по фактическим переходам кандидатов.",
        },
      ],
      modules: [
        { name: "Главная", text: "Мои задачи, просроченные дела, активные проекты, доступность команды, дни рождения и новости компании." },
        { name: "Проекты и ответственность", text: "Общие цели с владельцами, задачами и контекстом; зоны ответственности с приоритетами и сроками." },
        { name: "Люди и отпуска", text: "Справочник сотрудников, календарь отпусков с фильтрами по людям и отделам, лента активности, архив." },
        { name: "Вакансии и воронка", text: "Доска и таблица кандидатов по этапам — от отклика до оффера; сортировка по покрытию требований и времени на этапе." },
        { name: "Интервью и оценки", text: "Планирование в часовом поясе компании, список и календарь, оценочные листы, контроль недостающих отзывов." },
        { name: "ИИ-скрининг", text: "Очередь резюме: извлечение профиля, ручная правка, сравнение с требованиями вакансии, связь с существующим кандидатом." },
        { name: "Автоматизации", text: "Правила на событиях найма с версиями, паузой, журналом выполнения и безопасным повтором." },
        { name: "Отчёты и настройки", text: "Метрики найма с выгрузкой CSV; роли, шаблоны писем, исходящие и параметры рабочего пространства." },
      ],
      strengths: [
        "Интранет и найм используют общий справочник людей и одну навигацию.",
        "Автоматизации прозрачны: у каждого правила есть версия, журнал и повтор при сбое.",
        "Оценки интервьюеров собираются независимо, чтобы мнения не влияли друг на друга.",
        "Метрики считаются по сохранённым переходам между этапами, а не по ручным отметкам.",
        "Демо полностью интерактивно: можно сменить роль, создать запись и сбросить данные.",
      ],
      benefits: [
        "Сотрудникам не нужно искать задачи и новости в разных сервисах.",
        "Кандидаты не теряются между этапами: у каждого есть следующий шаг.",
        "Решение о найме опирается на требования вакансии и структурированные оценки.",
        "Руководитель видит, на каком этапе найм замедляется.",
      ],
      usageTitle: "Как посмотреть демо",
      usage: [
        "Откройте демо — вход выполняется автоматически под учебным администратором.",
        "Смените роль в верхней панели, чтобы увидеть, как меняются права.",
        "В разделе Pipeline переведите кандидата на следующий этап.",
        "Откройте AI Screening и запустите примеры резюме: ключ API не нужен.",
        "Кнопка Reset Demo вернёт исходные данные.",
      ],
      limits: [
        "Данные вымышленные и хранятся только в вашем браузере.",
        "Ограничения ролей в демо имитируются и не защищают данные.",
        "Письма не отправляются, а остаются в исходящих.",
        "Загрузка собственных PDF-резюме требует серверной части.",
        "Интерфейс демо на английском.",
      ],
      demoAccess: "Демо открыто без входа. Данные вымышленные и хранятся только в вашем браузере; сбросить их можно кнопкой Reset Demo.",
      metaDescription:
        "TalentCo Workspace — портал команды и система найма: проекты, отпуска, воронка кандидатов, интервью, ИИ-скрининг резюме, автоматизации и отчёты. Интерактивное демо.",
    },
    ro: {
      name: "TalentCo Workspace",
      kind: "Portalul echipei și recrutare",
      stages: ["Sarcinile echipei", "Proiecte", "Screening", "Automatizări", "Interviuri", "Rapoarte"],
      tagline:
        "Portalul intern al companiei și sistemul de recrutare într-o singură interfață: proiecte, responsabilități, concedii, posturi, candidați și interviuri.",
      summary:
        "Portal interactiv al unei companii fictive: sarcinile și proiectele echipei, catalogul angajaților și concediile, plus ciclul complet de recrutare — posturi, pâlnia candidaților, interviuri cu fișe de evaluare, screening AI al CV-urilor, automatizări și rapoarte.",
      purpose: [
        "TalentCo arată cum un singur sistem acoperă două sarcini care de obicei trăiesc în servicii diferite: munca zilnică a echipei și recrutarea. Pe pagina principală angajatul își vede sarcinile, restanțele, proiectele active, cine lipsește azi și evenimentele apropiate.",
        "Partea de recrutare duce candidatul de la aplicare la ofertă: pâlnie pe etape cu acoperirea cerințelor postului, interviuri structurate cu evaluări independente, sarcini și notificări automate la evenimentele cheie, rapoarte după tranzițiile reale între etape.",
      ],
      facts: [
        { label: "Tip", value: "Intranet și sistem de recrutare (ATS)" },
        { label: "Secțiuni", value: "Echipă și oameni, recrutare" },
        { label: "Roluri", value: "Se schimbă direct în demo" },
        { label: "Acces", value: "Demo deschis, date în browser" },
      ],
      workflow: [
        {
          actor: "Angajat",
          action: "Deschide pagina principală: sarcinile proprii, restanțele, proiectele și absențele colegilor.",
          result: "Pasul următor se vede fără căutări prin conversații.",
        },
        {
          actor: "Conducător",
          action: "Conduce proiectele și zonele de responsabilitate cu responsabili, termene și priorități.",
          result: "Fiecare direcție are un responsabil.",
        },
        {
          actor: "Recrutor",
          action: "Publică postul și analizează CV-urile noi în coada de screening AI.",
          result: "Profilul candidatului poate fi corectat, cerințele postului se verifică explicit.",
        },
        {
          actor: "Automatizare",
          action: "Se declanșează la evenimente: aplicare nouă, mutare pe etapă.",
          result: "Se creează sarcini, notificări, etichete și e-mailuri amânate; fiecare efect apare în jurnal.",
        },
        {
          actor: "Intervievatori",
          action: "Desfășoară interviuri și completează fișele de evaluare independent.",
          result: "Rubrica se păstrează, evaluările lipsă se văd imediat.",
        },
        {
          actor: "Conducător HR",
          action: "Consultă rapoartele pe aplicări, etape și timpul pe etapă, exportă CSV.",
          result: "Indicatorii se calculează din tranzițiile reale ale candidaților.",
        },
      ],
      modules: [
        { name: "Pagina principală", text: "Sarcinile mele, restanțe, proiecte active, disponibilitatea echipei, zile de naștere și noutăți." },
        { name: "Proiecte și responsabilități", text: "Obiective comune cu responsabili, sarcini și context; zone de responsabilitate cu priorități și termene." },
        { name: "Oameni și concedii", text: "Catalogul angajaților, calendarul concediilor cu filtre pe persoane și departamente, flux de activitate, arhivă." },
        { name: "Posturi și pâlnie", text: "Tablă și tabel de candidați pe etape — de la aplicare la ofertă; sortare după acoperirea cerințelor și timpul pe etapă." },
        { name: "Interviuri și evaluări", text: "Programare în fusul orar al companiei, listă și calendar, fișe de evaluare, controlul feedback-ului lipsă." },
        { name: "Screening AI", text: "Coada CV-urilor: extragerea profilului, corectare manuală, comparare cu cerințele postului, legare la un candidat existent." },
        { name: "Automatizări", text: "Reguli pe evenimentele recrutării, cu versiuni, pauză, jurnal de execuție și reluare sigură." },
        { name: "Rapoarte și setări", text: "Indicatori de recrutare cu export CSV; roluri, șabloane de e-mail, mesaje în așteptare și parametrii spațiului de lucru." },
      ],
      strengths: [
        "Intranetul și recrutarea folosesc un catalog comun de oameni și o singură navigare.",
        "Automatizările sunt transparente: fiecare regulă are versiune, jurnal și reluare la eroare.",
        "Evaluările intervievatorilor se colectează independent, ca opiniile să nu se influențeze.",
        "Indicatorii se calculează din tranzițiile salvate între etape, nu din marcaje manuale.",
        "Demo-ul este complet interactiv: puteți schimba rolul, crea înregistrări și reseta datele.",
      ],
      benefits: [
        "Angajații nu mai caută sarcini și noutăți în servicii diferite.",
        "Candidații nu se pierd între etape: fiecare are un pas următor.",
        "Decizia de angajare se bazează pe cerințele postului și pe evaluări structurate.",
        "Conducătorul vede la ce etapă încetinește recrutarea.",
      ],
      usageTitle: "Cum vedeți demonstrația",
      usage: [
        "Deschideți demo-ul — intrarea se face automat ca administrator de exemplu.",
        "Schimbați rolul în bara de sus pentru a vedea cum se schimbă drepturile.",
        "În secțiunea Pipeline mutați un candidat la etapa următoare.",
        "Deschideți AI Screening și rulați CV-urile de exemplu: nu este nevoie de cheie API.",
        "Butonul Reset Demo readuce datele inițiale.",
      ],
      limits: [
        "Datele sunt fictive și se păstrează doar în browserul dumneavoastră.",
        "Restricțiile de rol din demo sunt simulate și nu protejează datele.",
        "E-mailurile nu se trimit, ci rămân în coada de ieșire.",
        "Încărcarea propriilor CV-uri PDF necesită partea de server.",
        "Interfața demo-ului este în engleză.",
      ],
      demoAccess: "Demo deschis, fără autentificare. Datele sunt fictive și se păstrează doar în browser; le puteți reseta cu butonul Reset Demo.",
      metaDescription:
        "TalentCo Workspace — portalul echipei și sistem de recrutare: proiecte, concedii, pâlnia candidaților, interviuri, screening AI al CV-urilor, automatizări și rapoarte. Demo interactiv.",
    },
    en: {
      name: "TalentCo Workspace",
      kind: "Team portal and hiring",
      stages: ["Team tasks", "Projects", "Screening", "Automations", "Interviews", "Reports"],
      tagline:
        "A company's internal portal and its hiring system in one interface: projects, ownership, time off, jobs, candidates and interviews.",
      summary:
        "An interactive portal for a fictional company: team tasks and projects, the employee directory and time off, plus the full hiring cycle — jobs, candidate pipeline, interviews with scorecards, AI resume screening, automations and reports.",
      purpose: [
        "TalentCo shows how one system covers two jobs that usually live in separate tools: the team's everyday work and hiring. On the home page an employee sees their tasks, overdue items, active projects, who is out today and upcoming events.",
        "The recruiting side takes a candidate from application to offer: a stage pipeline with job requirement coverage, structured interviews with independent scorecards, automatic tasks and notifications on key events, and reports based on actual stage transitions.",
      ],
      facts: [
        { label: "Type", value: "Intranet and applicant tracking system" },
        { label: "Areas", value: "Team and people, recruiting" },
        { label: "Roles", value: "Switchable right in the demo" },
        { label: "Access", value: "Open demo, data stays in the browser" },
      ],
      workflow: [
        {
          actor: "Employee",
          action: "Opens the home page: own tasks, overdue items, projects and colleagues' absences.",
          result: "The next step is visible without digging through chats.",
        },
        {
          actor: "Team lead",
          action: "Runs projects and responsibilities with owners, deadlines and priorities.",
          result: "Every area has an accountable owner.",
        },
        {
          actor: "Recruiter",
          action: "Publishes a job and reviews new resumes in the AI screening queue.",
          result: "The candidate profile can be corrected, and job requirements are checked explicitly.",
        },
        {
          actor: "Automation",
          action: "Fires on events: new application, stage move.",
          result: "Tasks, notifications, tags and held emails are created; every effect shows in the log.",
        },
        {
          actor: "Interviewers",
          action: "Run interviews and fill in scorecards independently.",
          result: "The rubric is preserved, and missing scorecards are visible at once.",
        },
        {
          actor: "Head of people",
          action: "Reviews reports on applications, stages and time in stage, exports CSV.",
          result: "Metrics come from actual candidate transitions.",
        },
      ],
      modules: [
        { name: "Home", text: "My tasks, overdue items, active projects, team availability, birthdays and company news." },
        { name: "Projects and responsibilities", text: "Shared goals with owners, tasks and context; areas of responsibility with priorities and deadlines." },
        { name: "People and time off", text: "Employee directory, time-off calendar filtered by person and department, activity feed, archive." },
        { name: "Jobs and pipeline", text: "Board and table of candidates by stage, from application to offer; sorting by requirement coverage and time in stage." },
        { name: "Interviews and scorecards", text: "Scheduling in the company time zone, list and calendar, scorecards, tracking of missing feedback." },
        { name: "AI screening", text: "Resume queue: profile extraction, manual correction, comparison with job requirements, linking to an existing candidate." },
        { name: "Automations", text: "Rules on recruiting events with versions, pause, an execution log and safe retries." },
        { name: "Reports and settings", text: "Hiring metrics with CSV export; roles, email templates, outbox and workspace settings." },
      ],
      strengths: [
        "Intranet and recruiting share one people directory and one navigation.",
        "Automations are transparent: every rule has a version, a log and retry on failure.",
        "Interviewer scorecards are collected independently, so opinions don't sway each other.",
        "Metrics use stored stage transitions, not manual marks.",
        "The demo is fully interactive: switch roles, create records and reset the data.",
      ],
      benefits: [
        "Employees don't hunt for tasks and news across different tools.",
        "Candidates don't get lost between stages: each has a next step.",
        "Hiring decisions rest on job requirements and structured feedback.",
        "Leadership sees which stage slows hiring down.",
      ],
      usageTitle: "How to explore the demo",
      usage: [
        "Open the demo — you're signed in automatically as the sample administrator.",
        "Switch roles in the top bar to see how permissions change.",
        "In Pipeline, move a candidate to the next stage.",
        "Open AI Screening and run the sample resumes: no API key needed.",
        "The Reset Demo button restores the original data.",
      ],
      limits: [
        "The data is fictional and stored only in your browser.",
        "Role restrictions in the demo are simulated and don't protect data.",
        "Emails are never sent; they stay in the outbox.",
        "Uploading your own PDF resumes requires the backend.",
      ],
      demoAccess: "The demo is open with no sign-in. The data is fictional and stays in your browser; reset it with the Reset Demo button.",
      metaDescription:
        "TalentCo Workspace is a team portal and hiring system: projects, time off, candidate pipeline, interviews, AI resume screening, automations and reports. Interactive demo.",
    },
  },
  demo: [
    {
      slug: "team",
      shot: s.home,
      text: {
        ru: {
          title: "Рабочее пространство команды",
          summary: "Главная, проекты, зоны ответственности и лента работы.",
          points: [
            "Главная собирает личные задачи, просрочки и активные проекты.",
            "Доступность коллег и ближайшие события видны сразу.",
            "У проектов и зон ответственности есть владельцы, сроки и приоритеты.",
            "Обсуждения, ресурсы и архив — в одном меню.",
          ],
        },
        ro: {
          title: "Spațiul de lucru al echipei",
          summary: "Pagina principală, proiecte, zone de responsabilitate și fluxul de lucru.",
          points: [
            "Pagina principală adună sarcinile personale, restanțele și proiectele active.",
            "Disponibilitatea colegilor și evenimentele apropiate se văd imediat.",
            "Proiectele și responsabilitățile au responsabili, termene și priorități.",
            "Discuțiile, resursele și arhiva sunt într-un singur meniu.",
          ],
        },
        en: {
          title: "Team workspace",
          summary: "Home, projects, responsibilities and the work feed.",
          points: [
            "Home gathers personal tasks, overdue items and active projects.",
            "Colleagues' availability and upcoming events are visible at once.",
            "Projects and responsibilities have owners, deadlines and priorities.",
            "Discussions, resources and the archive live in one menu.",
          ],
        },
      },
    },
    {
      slug: "people",
      shot: s.timeOff,
      text: {
        ru: {
          title: "Люди и отпуска",
          summary: "Справочник сотрудников и календарь отсутствий команды.",
          points: [
            "Календарь отпусков по месяцам и в виде списка.",
            "Фильтры по сотрудникам и отделам.",
            "Справочник с отделами и контактами.",
            "Лента активности показывает последние изменения.",
          ],
        },
        ro: {
          title: "Oameni și concedii",
          summary: "Catalogul angajaților și calendarul absențelor echipei.",
          points: [
            "Calendarul concediilor pe luni și sub formă de listă.",
            "Filtre pe angajați și departamente.",
            "Catalog cu departamente și contacte.",
            "Fluxul de activitate arată ultimele modificări.",
          ],
        },
        en: {
          title: "People and time off",
          summary: "The employee directory and the team absence calendar.",
          points: [
            "Monthly and list views of time off.",
            "Filters by employee and department.",
            "A directory with departments and contacts.",
            "The activity feed shows recent changes.",
          ],
        },
      },
    },
    {
      slug: "pipeline",
      shot: s.pipeline,
      text: {
        ru: {
          title: "Воронка кандидатов",
          summary: "Кандидаты по этапам с покрытием требований и временем на этапе.",
          points: [
            "Доска и таблица: отклик, скрининг, техническое и командное интервью, оффер.",
            "Фильтры по вакансии, источнику и исходу.",
            "Сортировка по взвешенному покрытию обязательных требований.",
            "Перевод на этап — с видимой передачей и записью в истории.",
          ],
        },
        ro: {
          title: "Pâlnia candidaților",
          summary: "Candidații pe etape, cu acoperirea cerințelor și timpul pe etapă.",
          points: [
            "Tablă și tabel: aplicare, screening, interviu tehnic și de echipă, ofertă.",
            "Filtre pe post, sursă și rezultat.",
            "Sortare după acoperirea ponderată a cerințelor obligatorii.",
            "Mutarea pe etapă se face cu predare vizibilă și înregistrare în istoric.",
          ],
        },
        en: {
          title: "Candidate pipeline",
          summary: "Candidates by stage with requirement coverage and time in stage.",
          points: [
            "Board and table: applied, recruiter screen, technical and team interview, offer.",
            "Filters by job, source and outcome.",
            "Sorting by weighted coverage of required qualifications.",
            "A stage move is a visible handoff recorded in history.",
          ],
        },
      },
    },
    {
      slug: "screening",
      shot: s.screening,
      text: {
        ru: {
          title: "ИИ-скрининг резюме",
          summary: "Резюме превращаются в проверяемые профили кандидатов.",
          points: [
            "Шесть примеров PDF попадают в очередь без ключа API.",
            "Извлечённый профиль можно исправить вручную.",
            "Совпадение email связывает резюме с уже существующим кандидатом.",
            "Скан без текста помечается для ручной обработки.",
          ],
        },
        ro: {
          title: "Screening AI al CV-urilor",
          summary: "CV-urile devin profiluri verificabile ale candidaților.",
          points: [
            "Șase PDF-uri de exemplu intră în coadă fără cheie API.",
            "Profilul extras poate fi corectat manual.",
            "Coincidența e-mailului leagă CV-ul de un candidat existent.",
            "O scanare fără text este marcată pentru procesare manuală.",
          ],
        },
        en: {
          title: "AI resume screening",
          summary: "Resumes become verifiable candidate profiles.",
          points: [
            "Six sample PDFs enter the queue with no API key.",
            "The extracted profile can be corrected by hand.",
            "A matching email links the resume to an existing candidate.",
            "A scan without text is flagged for manual handling.",
          ],
        },
      },
    },
    {
      slug: "automations",
      shot: s.automations,
      text: {
        ru: {
          title: "Автоматизации и отчёты",
          summary: "Правила на событиях найма и метрики по фактическим переходам.",
          points: [
            "Правило: событие, условие и действия — задача, уведомление, тег, отложенное письмо.",
            "У правил есть версии, пауза и журнал выполнения.",
            "Неудачное действие можно безопасно повторить.",
            "Отчёты по откликам и этапам выгружаются в CSV.",
          ],
        },
        ro: {
          title: "Automatizări și rapoarte",
          summary: "Reguli pe evenimentele recrutării și indicatori din tranzițiile reale.",
          points: [
            "Regula: eveniment, condiție și acțiuni — sarcină, notificare, etichetă, e-mail amânat.",
            "Regulile au versiuni, pauză și jurnal de execuție.",
            "O acțiune eșuată poate fi reluată în siguranță.",
            "Rapoartele pe aplicări și etape se exportă în CSV.",
          ],
        },
        en: {
          title: "Automations and reports",
          summary: "Rules on hiring events and metrics from actual transitions.",
          points: [
            "A rule is an event, a condition and actions — task, notification, tag, held email.",
            "Rules have versions, pause and an execution log.",
            "A failed action can be retried safely.",
            "Application and stage reports export to CSV.",
          ],
        },
      },
    },
  ],
};
