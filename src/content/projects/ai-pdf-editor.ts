import type { Project } from "./types";

export const aiPdfEditor: Project = {
  slug: "ai-pdf-editor",
  status: "live",
  featured: true,
  year: 2026,
  services: ["documents-approvals"],
  layout: { workflow: "orbit", capabilities: "icons" },
  moduleIcons: ["search", "layers", "sparkles", "scan-eye", "history", "image"],
  links: { demo: "https://ai-pdf-editor.pages.dev", repo: "https://github.com/academ1cian/ai-pdf-editor" },
  stack: ["React", "TypeScript", "MuPDF (WebAssembly)", "PDF.js", "Tesseract.js", "Zod", "Groq API"],
  text: {
    ru: {
      name: "AI PDF Editor",
      kind: "Редактор PDF с ИИ",
      stages: ["Загрузка PDF", "Поиск текста", "ИИ-предложение", "Просмотр", "Правка", "Проверка"],
      tagline: "Точечные правки в готовом PDF: текст и суммы меняются, а вёрстка документа остаётся прежней.",
      summary:
        "Веб-редактор для исправлений в готовых PDF — счетах, резюме, договорах. Правку можно описать словами или сделать вручную; каждый результат проверяется перед скачиванием. Работает в браузере, без регистрации.",
      purpose: [
        "Небольшая ошибка в готовом PDF обычно означает поиск исходника или перевёрстку. AI PDF Editor меняет нужный текст прямо в документе: находит фрагмент, показывает предложенную замену и сохраняет шрифт, размер и положение строк.",
        "Правку можно описать обычной фразой — например, «поменяй ставку и начисления на 1000 и пересчитай итог» — или выделить текст и заменить вручную. Ручные правки выполняются на устройстве; ИИ подключается только с согласия и получает лишь нужные строки, а сам PDF никуда не загружается.",
      ],
      facts: [
        { label: "Тип", value: "Веб-приложение для документов" },
        { label: "Доступ", value: "Открыт, без регистрации" },
        { label: "Файлы", value: "До 15 МБ и 80 страниц" },
        { label: "Языки документов", value: "Латиница и кириллица" },
      ],
      workflow: [
        {
          actor: "Пользователь",
          action: "Открывает свой PDF или пример счёта.",
          result: "Документ обрабатывается в браузере, оригинал остаётся неизменным.",
        },
        {
          actor: "Пользователь",
          action: "Находит текст поиском или выделением либо описывает правку словами.",
          result: "Редактор определяет, какие фрагменты менять, включая повторы на других страницах.",
        },
        {
          actor: "ИИ-ассистент",
          action: "С согласия пользователя получает только нужные строки и их позиции.",
          result: "Предложение проверяется схемой, суммы в счёте пересчитываются по правилам.",
        },
        {
          actor: "Пользователь",
          action: "Сравнивает «было» и «стало», страницу, шрифт и посадку текста; при необходимости уточняет запрос.",
          result: "Уточнение не теряет предыдущие правки.",
        },
        {
          actor: "Редактор",
          action: "Меняет исходный текст PDF, а при необходимости — проверенным запасным способом.",
          result: "Никаких белых прямоугольников поверх старого текста.",
        },
        {
          actor: "Проверка",
          action: "Заново открывает результат, сверяет текст, соседние строки, ссылки и все страницы попиксельно.",
          result: "Скачивается только проверенный документ; одна отмена возвращает всё назад.",
        },
      ],
      modules: [
        { name: "Просмотр и поиск", brief: "Поиск текста и нужного вхождения" },
        { name: "Пакетные правки", brief: "Очередь замен одним шагом" },
        { name: "ИИ-ассистент", brief: "Правки, описанные словами" },
        { name: "Проверка экспорта", brief: "Попиксельная сверка результата" },
        { name: "История", brief: "Отмена, снимки, журнал" },
        { name: "Изображения", brief: "Сканы и надпись логотипа" },
      ],
      strengths: [
        "Правка меняет исходный текст документа, а не накладывает поверх него заплатку.",
        "Каждый результат проверяется повторным открытием и попиксельным сравнением всех страниц.",
        "В тестовом наборе 32 PDF: 28 проходят, 4 честно помечены как неподдерживаемые, ошибок нет.",
        "ИИ получает только выбранные строки после показа точного содержимого запроса и согласия.",
        "Тесты проходят в Chromium, Firefox и WebKit; ключи провайдера не попадают во фронтенд.",
        "Ручные правки работают без ИИ и без регистрации.",
      ],
      benefits: [
        "Исправить счёт, договор или резюме за минуты, без исходного файла и дизайнера.",
        "Суммы в счёте пересчитываются по правилам, а не на глаз.",
        "Конфиденциальный документ остаётся на устройстве.",
        "Получатель видит тот же документ: шрифты, отступы и ссылки на месте.",
      ],
      limits: [
        "Формы, подписи, зашифрованные и повреждённые файлы, повёрнутый текст и сложные таблицы могут не поддерживаться.",
        "Страницы-сканы без текстового слоя правятся инструментами изображений, а не как текст.",
        "Это не сертифицированный инструмент для удаления конфиденциальных данных: сведения могут оставаться в метаданных и вложениях.",
        "Лицензия AGPL-3.0 из-за движка MuPDF.",
      ],
      demoAccess: "Редактор открыт для всех и работает без регистрации. Используйте примеры документов или свой PDF — ручные правки не покидают браузер.",
      metaDescription:
        "AI PDF Editor — веб-редактор для точечных правок в готовых PDF: замена текста и сумм с сохранением вёрстки, ИИ-ассистент по согласию и проверка каждого результата.",
    },
    ro: {
      name: "AI PDF Editor",
      kind: "Editor PDF cu AI",
      stages: ["Încărcare PDF", "Căutare text", "Propunere AI", "Revizuire", "Editare", "Validare"],
      tagline: "Corecturi punctuale în PDF-ul final: textul și sumele se schimbă, iar macheta documentului rămâne aceeași.",
      summary:
        "Editor web pentru corecturi în PDF-uri finale — facturi, CV-uri, contracte. Modificarea se descrie în cuvinte sau se face manual; fiecare rezultat este verificat înainte de descărcare. Rulează în browser, fără înregistrare.",
      purpose: [
        "O mică greșeală într-un PDF final înseamnă de obicei căutarea sursei sau refacerea machetei. AI PDF Editor schimbă textul necesar direct în document: găsește fragmentul, arată înlocuirea propusă și păstrează fontul, dimensiunea și poziția rândurilor.",
        "Modificarea se poate descrie cu o frază obișnuită — de exemplu, „schimbă tariful și taxele la 1000 și recalculează totalul” — sau se poate selecta textul și înlocui manual. Editările manuale rulează pe dispozitiv; AI-ul se conectează doar cu acord și primește numai rândurile necesare, iar PDF-ul nu se încarcă nicăieri.",
      ],
      facts: [
        { label: "Tip", value: "Aplicație web pentru documente" },
        { label: "Acces", value: "Deschis, fără înregistrare" },
        { label: "Fișiere", value: "Până la 15 MB și 80 de pagini" },
        { label: "Limbile documentelor", value: "Latină și chirilică" },
      ],
      workflow: [
        {
          actor: "Utilizator",
          action: "Deschide propriul PDF sau o factură de exemplu.",
          result: "Documentul se procesează în browser, originalul rămâne neschimbat.",
        },
        {
          actor: "Utilizator",
          action: "Găsește textul prin căutare sau selecție ori descrie modificarea în cuvinte.",
          result: "Editorul stabilește ce fragmente se schimbă, inclusiv repetările de pe alte pagini.",
        },
        {
          actor: "Asistent AI",
          action: "Cu acordul utilizatorului primește doar rândurile necesare și pozițiile lor.",
          result: "Propunerea este validată de schemă, sumele din factură se recalculează după reguli.",
        },
        {
          actor: "Utilizator",
          action: "Compară „înainte” și „după”, pagina, fontul și încadrarea textului; la nevoie precizează cererea.",
          result: "Precizarea nu pierde editările anterioare.",
        },
        {
          actor: "Editor",
          action: "Schimbă textul original al PDF-ului sau, la nevoie, folosește o metodă de rezervă verificată.",
          result: "Fără dreptunghiuri albe peste textul vechi.",
        },
        {
          actor: "Validare",
          action: "Redeschide rezultatul, compară textul, rândurile vecine, linkurile și toate paginile pixel cu pixel.",
          result: "Se descarcă doar documentul validat; o singură anulare readuce totul.",
        },
      ],
      modules: [
        { name: "Vizualizare și căutare", brief: "Căutarea textului și a apariției dorite" },
        { name: "Editări în lot", brief: "O coadă de înlocuiri într-un pas" },
        { name: "Asistent AI", brief: "Editări descrise în cuvinte" },
        { name: "Validarea exportului", brief: "Verificarea rezultatului pixel cu pixel" },
        { name: "Istoric", brief: "Anulare, instantanee, jurnal" },
        { name: "Imagini", brief: "Scanări și textul siglei" },
      ],
      strengths: [
        "Editarea schimbă textul original al documentului, nu pune un petic peste el.",
        "Fiecare rezultat este verificat prin redeschidere și comparare pixel cu pixel a tuturor paginilor.",
        "Setul de test are 32 de PDF-uri: 28 trec, 4 sunt marcate onest ca nesuportate, fără erori.",
        "AI-ul primește doar rândurile alese, după afișarea exactă a conținutului cererii și acord.",
        "Testele rulează în Chromium, Firefox și WebKit; cheile furnizorului nu ajung în frontend.",
        "Editările manuale funcționează fără AI și fără înregistrare.",
      ],
      benefits: [
        "Corectați o factură, un contract sau un CV în câteva minute, fără fișierul sursă și fără designer.",
        "Sumele din factură se recalculează după reguli, nu din ochi.",
        "Documentul confidențial rămâne pe dispozitiv.",
        "Destinatarul vede același document: fonturile, spațierea și linkurile sunt la locul lor.",
      ],
      limits: [
        "Formularele, semnăturile, fișierele criptate sau deteriorate, textul rotit și tabelele complexe pot să nu fie suportate.",
        "Paginile scanate fără strat de text se editează cu instrumente de imagine, nu ca text.",
        "Nu este un instrument certificat de eliminare a datelor confidențiale: informațiile pot rămâne în metadate și atașamente.",
        "Licență AGPL-3.0 din cauza motorului MuPDF.",
      ],
      demoAccess: "Editorul este deschis tuturor și funcționează fără înregistrare. Folosiți documentele de exemplu sau propriul PDF — editările manuale nu părăsesc browserul.",
      metaDescription:
        "AI PDF Editor — editor web pentru corecturi punctuale în PDF-uri finale: înlocuirea textului și a sumelor cu păstrarea machetei, asistent AI cu acord și validarea fiecărui rezultat.",
    },
    en: {
      name: "AI PDF Editor",
      kind: "AI-assisted PDF editor",
      stages: ["PDF upload", "Find text", "AI proposal", "Review", "Edit", "Validation"],
      tagline: "Precise edits in a finished PDF: text and amounts change while the document layout stays intact.",
      summary:
        "A web editor for corrections in finished PDFs — invoices, resumes, contracts. Describe a change in words or make it by hand; every result is validated before download. Runs in the browser with no account.",
      purpose: [
        "A small mistake in a finished PDF usually means hunting for the source file or rebuilding the layout. AI PDF Editor changes the text right inside the document: it finds the fragment, shows the proposed replacement and keeps the font, size and line positions.",
        "Describe the change in plain words — for example, “change the rate and charges to 1000 and update the total” — or select text and replace it manually. Manual edits run on your device; AI is used only with consent and receives just the relevant lines, and the PDF itself is never uploaded.",
      ],
      facts: [
        { label: "Type", value: "Document web app" },
        { label: "Access", value: "Open, no account needed" },
        { label: "Files", value: "Up to 15 MB and 80 pages" },
        { label: "Document scripts", value: "Latin and Cyrillic" },
      ],
      workflow: [
        {
          actor: "User",
          action: "Opens a PDF or a sample invoice.",
          result: "The document is processed in the browser; the original stays unchanged.",
        },
        {
          actor: "User",
          action: "Finds text by search or selection, or describes the change in words.",
          result: "The editor works out which fragments to change, including repeats on other pages.",
        },
        {
          actor: "AI assistant",
          action: "With consent, receives only the relevant lines and their positions.",
          result: "The proposal is schema-validated; invoice totals are recalculated deterministically.",
        },
        {
          actor: "User",
          action: "Compares before and after, page, font and fit; refines the request if needed.",
          result: "Refinements keep earlier edits.",
        },
        {
          actor: "Editor",
          action: "Changes the PDF's original text, or uses a validated fallback when needed.",
          result: "No white boxes over the old text.",
        },
        {
          actor: "Validation",
          action: "Reopens the result and checks text, neighbouring lines, links and every page pixel by pixel.",
          result: "Only a validated document is downloaded; one undo restores everything.",
        },
      ],
      modules: [
        { name: "Viewing and search", brief: "Find text and the right occurrence" },
        { name: "Batch edits", brief: "A queue of edits in one step" },
        { name: "AI assistant", brief: "Edits described in words" },
        { name: "Export validation", brief: "Pixel-level result check" },
        { name: "History", brief: "Undo, snapshots, change log" },
        { name: "Images", brief: "Scans and logo lettering" },
      ],
      strengths: [
        "Edits change the document's original text rather than patching over it.",
        "Every result is validated by reopening and comparing every page pixel by pixel.",
        "The test set has 32 PDFs: 28 pass, 4 are honestly marked unsupported, none fail.",
        "AI receives only the selected lines, after an exact preview of the request and consent.",
        "Tests run in Chromium, Firefox and WebKit; provider keys never reach the frontend.",
        "Manual edits work without AI and without an account.",
      ],
      benefits: [
        "Fix an invoice, contract or resume in minutes, without the source file or a designer.",
        "Invoice totals are recalculated by rules, not by eye.",
        "A confidential document stays on the device.",
        "The recipient sees the same document: fonts, spacing and links are intact.",
      ],
      limits: [
        "Forms, signatures, encrypted or damaged files, rotated text and complex tables may be unsupported.",
        "Scanned pages without a text layer are edited with image tools, not as text.",
        "It is not a certified redaction tool: information may remain in metadata and attachments.",
        "AGPL-3.0 licence because of the MuPDF engine.",
      ],
      demoAccess: "The editor is open to everyone and needs no account. Use the sample documents or your own PDF — manual edits never leave the browser.",
      metaDescription:
        "AI PDF Editor is a web editor for precise edits in finished PDFs: replace text and amounts while keeping the layout, a consent-based AI assistant and validation of every result.",
    },
  },
};
