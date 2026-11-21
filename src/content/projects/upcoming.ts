import type { L10n } from "@/i18n/config";
import type { ServiceSlug } from "@/content/services";
import type { Project } from "./types";

type Brief = { name: string; kind: string; tagline: string; purpose: string };

const note: L10n = {
  ru: "Проект в разработке: демонстрация и код пока закрыты. Подробный разбор процесса и возможностей появится после открытия доступа.",
  ro: "Proiect în dezvoltare: demonstrația și codul sunt încă închise. Analiza detaliată a procesului și a capabilităților va apărea după deschiderea accesului.",
  en: "In development: the demo and code aren't public yet. A detailed breakdown of the workflow and capabilities will follow once access opens.",
};

const labels: L10n<{ type: string; access: string; closed: string }> = {
  ru: { type: "Тип", access: "Доступ", closed: "Демо и код пока закрыты" },
  ro: { type: "Tip", access: "Acces", closed: "Demo-ul și codul sunt încă închise" },
  en: { type: "Type", access: "Access", closed: "Demo and code not public yet" },
};

/** A short card for a project whose demo and repository are not public yet. */
function upcoming(slug: string, services: ServiceSlug[], text: L10n<Brief>): Project {
  const build = (l: keyof L10n<Brief>) => {
    const t = text[l];
    return {
      name: t.name,
      kind: t.kind,
      tagline: t.tagline,
      summary: `${t.tagline} ${note[l]}`,
      purpose: [t.purpose, note[l]],
      facts: [
        { label: labels[l].type, value: t.kind },
        { label: labels[l].access, value: labels[l].closed },
      ],
      metaDescription: `${t.name} — ${t.kind}. ${t.tagline}`,
    };
  };
  return {
    slug,
    status: "development",
    year: 2026,
    services,
    links: {},
    stack: [],
    gallery: [],
    demo: [],
    text: { ru: build("ru"), ro: build("ro"), en: build("en") },
  };
}

export const upcomingProjects: Project[] = [
  upcoming("optimix-commerce", ["erp-operations"], {
    ru: {
      name: "Optimix Commerce",
      kind: "Операции электронной коммерции",
      tagline: "Рабочее пространство для операционной команды онлайн-торговли.",
      purpose: "Optimix Commerce собирает операционную работу интернет-магазина в одном интерфейсе, чтобы команде не приходилось сводить данные из разных сервисов вручную.",
    },
    ro: {
      name: "Optimix Commerce",
      kind: "Operațiuni de comerț electronic",
      tagline: "Spațiu de lucru pentru echipa operațională a comerțului online.",
      purpose: "Optimix Commerce adună munca operațională a magazinului online într-o singură interfață, ca echipa să nu mai combine manual datele din servicii diferite.",
    },
    en: {
      name: "Optimix Commerce",
      kind: "E-commerce operations",
      tagline: "A workspace for an online retailer's operations team.",
      purpose: "Optimix Commerce brings an online store's operational work into one interface, so the team stops stitching data together from separate tools by hand.",
    },
  }),
  upcoming("founder-workspace", ["analytics-control"], {
    ru: {
      name: "Founder Workspace",
      kind: "Рабочее пространство основателя",
      tagline: "Одно место, где основатель видит состояние компании и ведёт ключевые задачи.",
      purpose: "Founder Workspace объединяет то, за чем основатель следит каждый день, в одном рабочем пространстве вместо разрозненных таблиц и заметок.",
    },
    ro: {
      name: "Founder Workspace",
      kind: "Spațiul de lucru al fondatorului",
      tagline: "Un singur loc în care fondatorul vede starea companiei și își conduce sarcinile cheie.",
      purpose: "Founder Workspace reunește tot ce urmărește zilnic fondatorul într-un singur spațiu de lucru, în locul tabelelor și notițelor disparate.",
    },
    en: {
      name: "Founder Workspace",
      kind: "Founder's workspace",
      tagline: "One place where a founder sees the state of the company and runs key tasks.",
      purpose: "Founder Workspace brings what a founder tracks every day into one workspace instead of scattered spreadsheets and notes.",
    },
  }),
  upcoming("automation-hub", ["erp-operations"], {
    ru: {
      name: "Automation Hub",
      kind: "Центр автоматизаций",
      tagline: "Единый интерфейс для управления автоматизациями бизнес-процессов.",
      purpose: "Automation Hub собирает автоматизации компании в одном месте, чтобы было видно, что запускается, когда и с каким результатом.",
    },
    ro: {
      name: "Automation Hub",
      kind: "Centru de automatizări",
      tagline: "O interfață unică pentru gestionarea automatizărilor proceselor de business.",
      purpose: "Automation Hub adună automatizările companiei într-un singur loc, ca să se vadă ce rulează, când și cu ce rezultat.",
    },
    en: {
      name: "Automation Hub",
      kind: "Automation hub",
      tagline: "One interface for managing business process automations.",
      purpose: "Automation Hub gathers a company's automations in one place, so it's clear what runs, when and with what result.",
    },
  }),
  upcoming("recruiting-workspace", ["hr-team"], {
    ru: {
      name: "Recruiting Workspace",
      kind: "Автоматизация найма",
      tagline: "Рабочее пространство рекрутера с автоматизацией рутинных шагов найма.",
      purpose: "Recruiting Workspace помогает команде найма вести вакансии и кандидатов и снимает с рекрутера повторяющиеся ручные действия.",
    },
    ro: {
      name: "Recruiting Workspace",
      kind: "Automatizarea recrutării",
      tagline: "Spațiul de lucru al recrutorului, cu automatizarea pașilor de rutină.",
      purpose: "Recruiting Workspace ajută echipa de recrutare să gestioneze posturile și candidații și preia de la recrutor acțiunile manuale repetitive.",
    },
    en: {
      name: "Recruiting Workspace",
      kind: "Recruiting automation",
      tagline: "A recruiter's workspace that automates routine hiring steps.",
      purpose: "Recruiting Workspace helps the hiring team manage jobs and candidates and takes repetitive manual steps off the recruiter's plate.",
    },
  }),
];
