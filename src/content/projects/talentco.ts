import type { Project } from "./types";

export const talentco: Project = {
  slug: "talentco-workspace",
  status: "demo",
  year: 2026,
  services: ["hr-team", "analytics-control"],
  layout: { workflow: "relay", capabilities: "table" },
  moduleIcons: ["checklist", "target", "folder", "id-card", "calendar-range", "briefcase", "scan-search", "calendar", "zap"],
  links: {
    demo: "https://talentco-workspace-demo.vercel.app",
    repo: "https://github.com/academ1cian/recruiting-automation-workspace",
  },
  stack: ["Next.js", "React", "TypeScript", "Zod", "Luxon", "PDF.js", "PostgreSQL", "Drizzle ORM", "BullMQ", "Redis", "S3"],
  text: {
    ru: {
      name: "TalentCo Workspace",
      kind: "HR, команда и найм",
      stages: ["Задачи", "Проекты", "Сотрудники", "Отпуска", "Найм", "Интервью"],
      tagline:
        "Рабочее пространство команды, кадры и найм в одной системе: задачи и проекты, справочник сотрудников, отпуска, вакансии, кандидаты и интервью.",
      summary:
        "Интранет и HR-система вымышленной компании: задачи с обсуждениями и упоминаниями, проекты с ответственными и ресурсами, справочник сотрудников с онбордингом и офбордингом, отпуска с балансами по журналу начислений и полный цикл найма — от вакансии и разбора резюме до интервью, автоматизаций и отчётов.",
      purpose: [
        "TalentCo закрывает три задачи, которые обычно живут в разных сервисах: повседневную работу команды, кадровый учёт и найм. Сотрудник видит свои задачи, проекты, обсуждения и ресурсы; HR ведёт карточки людей, отпуска и политики; рекрутер — вакансии и кандидатов. Всё опирается на общий справочник сотрудников.",
        "Нанятый кандидат превращается в сотрудника с чек-листом онбординга, отпуск сразу меняет доступный остаток и календарь присутствия, а события найма запускают автоматизации — задачи, теги, уведомления. Пять типов ролей определяют, что каждый видит и может изменить.",
      ],
      facts: [
        { label: "Тип", value: "Интранет, HR-система и система найма (ATS)" },
        { label: "Разделы", value: "Команда, сотрудники, отпуска, найм" },
        { label: "Роли", value: "Пять типов, девять учётных записей в демо" },
        { label: "Доступ", value: "Открытое демо, данные в браузере" },
      ],
      workflow: [
        {
          actor: "Сотрудник",
          action: "Создаёт и назначает задачу, обсуждает её и упоминает коллегу.",
          result: "Коллега получает уведомление; задачу можно заблокировать с причиной или сделать повторяющейся.",
        },
        {
          actor: "Руководитель проекта",
          action: "Ведёт участников, зоны ответственности, заметки, обсуждения и ресурсы проекта.",
          result: "У каждого направления есть владелец, обновления попадают в общую ленту.",
        },
        {
          actor: "HR",
          action: "Ведёт карточки сотрудников, оформляет нанятого кандидата и запускает онбординг.",
          result: "Стаж, юбилеи и руководители считаются и проверяются, чек-лист создаётся без дублей.",
        },
        {
          actor: "HR",
          action: "Оформляет отпуска, настраивает политики и годовые начисления.",
          result: "Остатки «использовано, запланировано, доступно» считаются по журналу начислений.",
        },
        {
          actor: "Рекрутер",
          action: "Ведёт вакансии и кандидатов, разбирает резюме по критериям вакансии, переводит по этапам.",
          result: "Автоматизации создают задачи, теги и уведомления; письма остаются в исходящих.",
        },
        {
          actor: "Интервьюеры",
          action: "Проводят интервью и заполняют оценочные листы независимо друг от друга.",
          result: "Отправленный лист блокируется, отчёты по найму выгружаются в CSV.",
        },
      ],
      modules: [
        { name: "Задачи команды", brief: "Назначение, блокировка с причиной, повторы" },
        { name: "Проекты и ответственность", brief: "Участники, владельцы, заметки" },
        { name: "Обсуждения и ресурсы", brief: "Ответы, упоминания, лента, архив" },
        { name: "Справочник сотрудников", brief: "Карточки, стаж, онбординг и офбординг" },
        { name: "Отпуска", brief: "Календарь, политики, балансы и журнал" },
        { name: "Вакансии и кандидаты", brief: "Критерии, этапы, массовые действия" },
        { name: "Скрининг резюме", brief: "Проверка по критериям вакансии с правками" },
        { name: "Интервью и оценки", brief: "Панели, конфликты в расписании, оценочные листы" },
        { name: "Автоматизации и отчёты", brief: "Правила на событиях найма, метрики, CSV" },
      ],
      strengths: [
        "Работа команды, кадры и найм используют общий справочник людей и одну навигацию.",
        "Остатки отпусков считаются по неизменяемому журналу начислений, а не задаются вручную.",
        "Автоматизации прозрачны: у каждого запуска есть версия, журнал и повтор отдельного действия при сбое.",
        "Правка профиля кандидата сохраняет исходные данные резюме и пересчитывает соответствие критериям.",
        "Оценки интервьюеров собираются независимо, отправленный лист нельзя изменить.",
        "Устаревшая вкладка не перезапишет чужие изменения — система проверяет версию записи.",
      ],
      benefits: [
        "Сотрудникам не нужно искать задачи, обсуждения и документы в разных сервисах.",
        "Видно, кто сегодня отсутствует и сколько дней отпуска осталось.",
        "Кандидаты не теряются между этапами, а нанятый сразу получает онбординг.",
        "Решение о найме опирается на критерии вакансии и структурированные оценки.",
      ],
      limits: [
        "Публичное демо работает без сервера: данные вымышленные и хранятся в браузере. Серверная версия с PostgreSQL, Redis и файловым хранилищем лежит в репозитории отдельно.",
        "Роли в демо имитируются и не защищают данные.",
        "Резюме разбираются по заранее подготовленным образцам, без ИИ; свои файлы — до 256 КБ.",
        "Письма не отправляются, а остаются в исходящих; интеграций с почтой, календарём и job-бордами нет.",
        "Интерфейс демо на английском.",
      ],
      demoAccess:
        "Демо открыто без входа. Учётная запись переключается в верхней панели; данные вымышленные, хранятся в вашем браузере и сбрасываются кнопкой Reset Demo.",
      metaDescription:
        "TalentCo Workspace — HR-система, портал команды и найм: задачи и проекты, справочник сотрудников, отпуска, вакансии, кандидаты, интервью и автоматизации. Открытое демо.",
    },
    ro: {
      name: "TalentCo Workspace",
      kind: "HR, echipă și recrutare",
      stages: ["Sarcini", "Proiecte", "Angajați", "Concedii", "Recrutare", "Interviuri"],
      tagline:
        "Spațiul de lucru al echipei, resursele umane și recrutarea într-un singur sistem: sarcini și proiecte, catalogul angajaților, concedii, posturi, candidați și interviuri.",
      summary:
        "Intranet și sistem HR al unei companii fictive: sarcini cu discuții și mențiuni, proiecte cu responsabili și resurse, catalogul angajaților cu onboarding și offboarding, concedii cu solduri din registrul de alocări și ciclul complet de recrutare — de la post și analiza CV-urilor la interviuri, automatizări și rapoarte.",
      purpose: [
        "TalentCo acoperă trei sarcini care de obicei trăiesc în servicii diferite: munca zilnică a echipei, evidența personalului și recrutarea. Angajatul își vede sarcinile, proiectele, discuțiile și resursele; HR gestionează fișele oamenilor, concediile și politicile; recrutorul — posturile și candidații. Totul se sprijină pe un catalog comun al angajaților.",
        "Candidatul angajat devine angajat cu o listă de onboarding, concediul schimbă imediat soldul disponibil și calendarul prezenței, iar evenimentele recrutării declanșează automatizări — sarcini, etichete, notificări. Cinci tipuri de roluri stabilesc ce vede și ce poate modifica fiecare.",
      ],
      facts: [
        { label: "Tip", value: "Intranet, sistem HR și de recrutare (ATS)" },
        { label: "Secțiuni", value: "Echipă, angajați, concedii, recrutare" },
        { label: "Roluri", value: "Cinci tipuri, nouă conturi în demo" },
        { label: "Acces", value: "Demo deschis, date în browser" },
      ],
      workflow: [
        {
          actor: "Angajat",
          action: "Creează și atribuie o sarcină, o discută și menționează un coleg.",
          result: "Colegul primește o notificare; sarcina poate fi blocată cu motiv sau făcută recurentă.",
        },
        {
          actor: "Manager de proiect",
          action: "Gestionează participanții, responsabilitățile, notițele, discuțiile și resursele proiectului.",
          result: "Fiecare direcție are un responsabil, actualizările ajung în fluxul comun.",
        },
        {
          actor: "HR",
          action: "Gestionează fișele angajaților, înregistrează candidatul angajat și pornește onboardingul.",
          result: "Vechimea, aniversările și managerii se calculează și se verifică, lista se creează fără dubluri.",
        },
        {
          actor: "HR",
          action: "Înregistrează concedii, configurează politicile și alocările anuale.",
          result: "Soldurile „folosit, planificat, disponibil” se calculează din registrul de alocări.",
        },
        {
          actor: "Recrutor",
          action: "Gestionează posturi și candidați, analizează CV-urile după criteriile postului, mută pe etape.",
          result: "Automatizările creează sarcini, etichete și notificări; e-mailurile rămân în coada de trimitere.",
        },
        {
          actor: "Intervievatori",
          action: "Desfășoară interviuri și completează fișele de evaluare independent.",
          result: "Fișa trimisă se blochează, rapoartele de recrutare se exportă în CSV.",
        },
      ],
      modules: [
        { name: "Sarcinile echipei", brief: "Atribuire, blocare cu motiv, recurență" },
        { name: "Proiecte și responsabilități", brief: "Participanți, responsabili, notițe" },
        { name: "Discuții și resurse", brief: "Răspunsuri, mențiuni, flux, arhivă" },
        { name: "Catalogul angajaților", brief: "Fișe, vechime, onboarding și offboarding" },
        { name: "Concedii", brief: "Calendar, politici, solduri și registru" },
        { name: "Posturi și candidați", brief: "Criterii, etape, acțiuni în masă" },
        { name: "Screening CV", brief: "Verificare după criteriile postului, cu corecturi" },
        { name: "Interviuri și evaluări", brief: "Paneluri, conflicte de program, fișe de evaluare" },
        { name: "Automatizări și rapoarte", brief: "Reguli pe evenimente de recrutare, indicatori, CSV" },
      ],
      strengths: [
        "Munca echipei, resursele umane și recrutarea folosesc un catalog comun al oamenilor și o singură navigare.",
        "Soldurile concediilor se calculează din registrul imuabil de alocări, nu se introduc manual.",
        "Automatizările sunt transparente: fiecare rulare are versiune, jurnal și reluarea acțiunii eșuate.",
        "Corectarea profilului candidatului păstrează datele originale ale CV-ului și recalculează potrivirea cu criteriile.",
        "Evaluările intervievatorilor se colectează independent, fișa trimisă nu mai poate fi modificată.",
        "O filă veche nu suprascrie modificările altora — sistemul verifică versiunea înregistrării.",
      ],
      benefits: [
        "Angajații nu mai caută sarcini, discuții și documente în servicii diferite.",
        "Se vede cine lipsește azi și câte zile de concediu au rămas.",
        "Candidații nu se pierd între etape, iar cel angajat primește imediat onboarding.",
        "Decizia de angajare se bazează pe criteriile postului și evaluări structurate.",
      ],
      limits: [
        "Demo-ul public rulează fără server: datele sunt fictive și se păstrează în browser. Versiunea de server cu PostgreSQL, Redis și stocare de fișiere se află separat în depozit.",
        "Rolurile din demo sunt simulate și nu protejează datele.",
        "CV-urile se analizează pe mostre pregătite dinainte, fără AI; fișierele proprii — până la 256 KB.",
        "E-mailurile nu se trimit, ci rămân în coadă; nu există integrări cu e-mail, calendar sau site-uri de joburi.",
        "Interfața demo-ului este în engleză.",
      ],
      demoAccess:
        "Demo deschis fără autentificare. Contul se schimbă în bara de sus; datele sunt fictive, păstrate în browserul dvs. și se resetează cu butonul Reset Demo.",
      metaDescription:
        "TalentCo Workspace — sistem HR, portalul echipei și recrutare: sarcini și proiecte, catalogul angajaților, concedii, posturi, candidați, interviuri și automatizări. Demo deschis.",
    },
    en: {
      name: "TalentCo Workspace",
      kind: "HR, team and recruiting",
      stages: ["Tasks", "Projects", "People", "Time off", "Hiring", "Interviews"],
      tagline:
        "Team workspace, HR and recruiting in one system: tasks and projects, an employee directory, time off, jobs, candidates and interviews.",
      summary:
        "An intranet and HR system for a fictional company: tasks with discussions and mentions, projects with owners and resources, an employee directory with onboarding and offboarding, time off with balances from an allocation ledger, and the full hiring cycle — from the job and resume review to interviews, automations and reports.",
      purpose: [
        "TalentCo covers three jobs that usually live in separate tools: the team's everyday work, personnel records and recruiting. Employees see their tasks, projects, discussions and resources; HR maintains people records, time off and policies; recruiters manage jobs and candidates. Everything rests on one shared employee directory.",
        "A hired candidate becomes an employee with an onboarding checklist, time off immediately changes the available balance and the availability calendar, and hiring events trigger automations — tasks, tags, notifications. Five role types define what each person sees and can change.",
      ],
      facts: [
        { label: "Type", value: "Intranet, HR system and ATS" },
        { label: "Sections", value: "Team, people, time off, recruiting" },
        { label: "Roles", value: "Five types, nine accounts in the demo" },
        { label: "Access", value: "Open demo, data stays in the browser" },
      ],
      workflow: [
        {
          actor: "Employee",
          action: "Creates and assigns a task, discusses it and mentions a colleague.",
          result: "The colleague is notified; the task can be blocked with a reason or set to repeat.",
        },
        {
          actor: "Project lead",
          action: "Manages the project's participants, responsibilities, notes, discussions and resources.",
          result: "Every area has an owner, and updates reach the shared work feed.",
        },
        {
          actor: "HR",
          action: "Maintains employee records, onboards a hired candidate and starts the checklist.",
          result: "Tenure, anniversaries and managers are calculated and validated; the checklist is never duplicated.",
        },
        {
          actor: "HR",
          action: "Records time off, sets policies and annual allocations.",
          result: "Taken, planned and available balances are calculated from the allocation ledger.",
        },
        {
          actor: "Recruiter",
          action: "Manages jobs and candidates, reviews resumes against job criteria, moves applications through stages.",
          result: "Automations create tasks, tags and notifications; emails stay in the held outbox.",
        },
        {
          actor: "Interviewers",
          action: "Run interviews and fill in scorecards independently.",
          result: "A submitted scorecard is locked, and hiring reports export to CSV.",
        },
      ],
      modules: [
        { name: "Team tasks", brief: "Assignment, blocking with a reason, recurrence" },
        { name: "Projects and ownership", brief: "Participants, owners, notes" },
        { name: "Discussions and resources", brief: "Replies, mentions, feed, archive" },
        { name: "Employee directory", brief: "Records, tenure, onboarding and offboarding" },
        { name: "Time off", brief: "Calendar, policies, balances and ledger" },
        { name: "Jobs and candidates", brief: "Criteria, stages, bulk actions" },
        { name: "Resume screening", brief: "Checks against job criteria, with corrections" },
        { name: "Interviews and scorecards", brief: "Panels, scheduling conflicts, scorecards" },
        { name: "Automations and reports", brief: "Rules on hiring events, metrics, CSV" },
      ],
      strengths: [
        "Team work, HR and recruiting share one people directory and one navigation.",
        "Time-off balances come from an append-only allocation ledger, not manual entry.",
        "Automations are transparent: every run has a version, a log and per-action retries on failure.",
        "Correcting a candidate profile keeps the original resume evidence and re-evaluates the criteria.",
        "Interviewer scores are collected independently, and a submitted scorecard can't be edited.",
        "A stale tab can't overwrite someone else's changes; the system checks the record version.",
      ],
      benefits: [
        "Employees don't hunt for tasks, discussions and documents across different tools.",
        "You can see who's away today and how many days of leave are left.",
        "Candidates don't get lost between stages, and new hires get onboarding right away.",
        "Hiring decisions rest on job criteria and structured scores.",
      ],
      limits: [
        "The public demo runs without a server: data is fictional and stays in the browser. A server edition with PostgreSQL, Redis and file storage lives separately in the repository.",
        "Roles in the demo are simulated and don't protect data.",
        "Resumes are screened from prepared samples, without AI; your own files are limited to 256 KB.",
        "Emails aren't sent and stay in the outbox; there are no email, calendar or job-board integrations.",
      ],
      demoAccess:
        "Open demo with no sign-in. Switch accounts in the top bar; data is fictional, stays in your browser and can be reset with Reset Demo.",
      metaDescription:
        "TalentCo Workspace is an HR system, team portal and recruiting tool: tasks and projects, an employee directory, time off, jobs, candidates, interviews and automations. Open demo.",
    },
  },
};
