import type { Project } from "./types";

export const talentco: Project = {
  slug: "talentco-workspace",
  status: "demo",
  featured: true,
  year: 2026,
  services: ["hr-team", "analytics-control"],
  layout: { workflow: "relay", capabilities: "table" },
  moduleIcons: ["home", "target", "calendar-range", "briefcase", "checklist", "scan-search", "zap", "chart"],
  links: { demo: "https://talentco-team-workspace-demo.academ1cian.chatgpt.site/" },
  stack: [],
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
        { name: "Главная", brief: "Задачи и новости команды" },
        { name: "Проекты и ответственность", brief: "Цели, владельцы, сроки" },
        { name: "Люди и отпуска", brief: "Справочник и календарь отпусков" },
        { name: "Вакансии и воронка", brief: "Кандидаты по этапам найма" },
        { name: "Интервью и оценки", brief: "Расписание и оценочные листы" },
        { name: "ИИ-скрининг", brief: "Разбор резюме по требованиям" },
        { name: "Автоматизации", brief: "Правила на событиях найма" },
        { name: "Отчёты и настройки", brief: "Метрики найма и выгрузка CSV" },
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
        { name: "Pagina principală", brief: "Sarcinile și noutățile echipei" },
        { name: "Proiecte și responsabilități", brief: "Obiective, responsabili, termene" },
        { name: "Oameni și concedii", brief: "Catalogul și calendarul concediilor" },
        { name: "Posturi și pâlnie", brief: "Candidați pe etapele recrutării" },
        { name: "Interviuri și evaluări", brief: "Programări și fișe de evaluare" },
        { name: "Screening AI", brief: "Analiza CV-urilor după cerințe" },
        { name: "Automatizări", brief: "Reguli pe evenimentele recrutării" },
        { name: "Rapoarte și setări", brief: "Indicatori de recrutare și export CSV" },
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
        { name: "Home", brief: "Team tasks and news" },
        { name: "Projects and responsibilities", brief: "Goals, owners, deadlines" },
        { name: "People and time off", brief: "Directory and time-off calendar" },
        { name: "Jobs and pipeline", brief: "Candidates by hiring stage" },
        { name: "Interviews and scorecards", brief: "Scheduling and scorecards" },
        { name: "AI screening", brief: "Resumes checked against requirements" },
        { name: "Automations", brief: "Rules on hiring events" },
        { name: "Reports and settings", brief: "Hiring metrics and CSV export" },
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
};
