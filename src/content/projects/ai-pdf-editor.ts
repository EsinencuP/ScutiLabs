import { shot, type Project } from "./types";

const s = {
  editor: shot("ai-pdf-editor", "editor", 1280, 720, {
    ru: "AI PDF Editor после проверенной правки: документ, панель замены и отчёт проверки экспорта",
    ro: "AI PDF Editor după o editare validată: documentul, panoul de înlocuire și raportul de validare",
    en: "AI PDF Editor after a validated edit: document, replacement panel and export validation report",
  }),
  welcome: shot("ai-pdf-editor", "welcome", 1280, 720, {
    ru: "Стартовый экран: загрузка PDF или пример документа",
    ro: "Ecranul de start: încărcarea unui PDF sau un document de exemplu",
    en: "Start screen: upload a PDF or open a sample document",
  }),
  review: shot("ai-pdf-editor", "review", 1280, 720, {
    ru: "Проверка предложенной замены перед применением",
    ro: "Verificarea înlocuirii propuse înainte de aplicare",
    en: "Reviewing a proposed replacement before applying it",
  }),
  batch: shot("ai-pdf-editor", "batch-review", 1280, 720, {
    ru: "Пакет правок: очередь замен с общим применением",
    ro: "Editări în lot: coada înlocuirilor cu aplicare comună",
    en: "Batch editing: a queue of replacements applied together",
  }),
};

export const aiPdfEditor: Project = {
  slug: "ai-pdf-editor",
  status: "live",
  featured: true,
  year: 2026,
  services: ["documents-approvals"],
  links: { demo: "https://ai-pdf-editor.pages.dev", repo: "https://github.com/academ1cian/ai-pdf-editor" },
  stack: [
    "React",
    "TypeScript",
    "Vite",
    "MuPDF (WebAssembly)",
    "PDF.js",
    "Tesseract.js",
    "Zod",
    "Cloudflare Pages",
    "Cloudflare Workers",
    "Durable Objects",
    "Groq",
    "Playwright",
    "Vitest",
  ],
  gallery: [s.welcome, s.review, s.batch, s.editor],
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
        { name: "Просмотр и поиск", text: "Многостраничный просмотр, масштаб, выделение строк, точный поиск и выбор нужного вхождения среди повторов." },
        { name: "Пакетные правки", text: "Очередь замен с включением и исключением, просмотр и применение одним шагом, одна отмена на весь пакет." },
        { name: "ИИ-ассистент", text: "Правки, описанные словами, с последовательными уточнениями. Ставку, начисления и итог в счёте можно поправить и без облака." },
        { name: "Проверка экспорта", text: "Повторное открытие, сверка текста в изменённой области, позиций соседних символов, ссылок и пикселей всех страниц." },
        { name: "История", text: "Неизменяемый оригинал, снимки после каждой проверенной правки, отмена, сброс и журнал изменений." },
        { name: "Изображения", text: "Отдельные инструменты для изображений и страниц-сканов; надпись логотипа правится локально." },
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
      usageTitle: "Как пользоваться",
      usage: [
        "Откройте редактор и перетащите PDF или выберите пример счёта.",
        "Выделите текст и введите замену или опишите правку во вкладке ИИ-ассистента.",
        "Проверьте предложение: что было, что станет и помещается ли текст.",
        "При необходимости уточните запрос — прежние правки сохранятся.",
        "Скачайте PDF: файл доступен только после успешной проверки.",
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
        { name: "Vizualizare și căutare", text: "Vizualizare pe mai multe pagini, zoom, selectarea rândurilor, căutare exactă și alegerea apariției dorite." },
        { name: "Editări în lot", text: "Coadă de înlocuiri cu includere și excludere, verificare și aplicare într-un pas, o singură anulare pentru tot lotul." },
        { name: "Asistent AI", text: "Modificări descrise în cuvinte, cu precizări succesive. Tariful, taxele și totalul unei facturi se pot corecta și fără cloud." },
        { name: "Validarea exportului", text: "Redeschidere, verificarea textului din zona schimbată, a pozițiilor caracterelor vecine, a linkurilor și a pixelilor tuturor paginilor." },
        { name: "Istoric", text: "Original imuabil, instantanee după fiecare editare validată, anulare, resetare și jurnal de modificări." },
        { name: "Imagini", text: "Instrumente separate pentru imagini și pagini scanate; textul siglei se editează local." },
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
      usageTitle: "Cum se folosește",
      usage: [
        "Deschideți editorul și trageți un PDF sau alegeți factura de exemplu.",
        "Selectați textul și introduceți înlocuirea sau descrieți modificarea în fila asistentului AI.",
        "Verificați propunerea: ce era, ce va fi și dacă textul încape.",
        "La nevoie precizați cererea — editările anterioare se păstrează.",
        "Descărcați PDF-ul: fișierul este disponibil doar după validare.",
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
        { name: "Viewing and search", text: "Multi-page viewer, zoom, line selection, exact find and choice of the right occurrence among repeats." },
        { name: "Batch edits", text: "A queue of replacements with include and exclude, review and apply in one step, one undo for the whole batch." },
        { name: "AI assistant", text: "Edits described in words with follow-up refinements. Invoice rate, charges and total can be fixed without the cloud." },
        { name: "Export validation", text: "Reopen, check the changed region's text, neighbouring glyph positions, links and pixels on every page." },
        { name: "History", text: "Immutable original, snapshots after each validated edit, undo, reset and a change log." },
        { name: "Images", text: "Separate tools for images and scanned pages; logo lettering is edited locally." },
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
      usageTitle: "How to use it",
      usage: [
        "Open the editor and drop a PDF or pick the sample invoice.",
        "Select text and type a replacement, or describe the change in the AI assistant tab.",
        "Review the proposal: what it was, what it will be and whether it fits.",
        "Refine the request if needed — earlier edits are kept.",
        "Download the PDF: the file is available only after validation passes.",
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
  demo: [
    {
      slug: "open",
      shot: s.welcome,
      text: {
        ru: {
          title: "Открытие документа",
          summary: "PDF открывается прямо в браузере: свой файл или пример счёта.",
          points: [
            "Поддерживаются PDF с выделяемым текстом, до 15 МБ и 80 страниц.",
            "Оригинал не меняется: правки сохраняются в отдельные проверенные снимки.",
            "Ручные правки выполняются на устройстве, регистрация не нужна.",
          ],
        },
        ro: {
          title: "Deschiderea documentului",
          summary: "PDF-ul se deschide direct în browser: propriul fișier sau o factură de exemplu.",
          points: [
            "Sunt suportate PDF-uri cu text selectabil, până la 15 MB și 80 de pagini.",
            "Originalul nu se schimbă: editările se salvează în instantanee validate separate.",
            "Editările manuale rulează pe dispozitiv, fără înregistrare.",
          ],
        },
        en: {
          title: "Opening a document",
          summary: "The PDF opens right in the browser: your own file or a sample invoice.",
          points: [
            "PDFs with selectable text, up to 15 MB and 80 pages.",
            "The original never changes: edits are stored as separate validated snapshots.",
            "Manual edits run on the device, with no account.",
          ],
        },
      },
    },
    {
      slug: "review",
      shot: s.review,
      text: {
        ru: {
          title: "Правка и просмотр замены",
          summary: "Каждая замена показывается до применения: текст, страница, шрифт и посадка в строку.",
          points: [
            "Текст находится поиском или выделением, в том числе несколько фрагментов на разных страницах.",
            "При повторах выбирается нужное вхождение.",
            "Если текст не помещается, редактор показывает причину отказа.",
            "Пакет правок применяется одним шагом и отменяется одной кнопкой.",
          ],
        },
        ro: {
          title: "Editare și verificarea înlocuirii",
          summary: "Fiecare înlocuire este afișată înainte de aplicare: text, pagină, font și încadrare.",
          points: [
            "Textul se găsește prin căutare sau selecție, inclusiv mai multe fragmente pe pagini diferite.",
            "La repetări se alege apariția dorită.",
            "Dacă textul nu încape, editorul arată motivul refuzului.",
            "Lotul de editări se aplică într-un pas și se anulează cu un singur buton.",
          ],
        },
        en: {
          title: "Editing and review",
          summary: "Every replacement is shown before it applies: text, page, font and fit.",
          points: [
            "Text is found by search or selection, including several fragments across pages.",
            "For repeats, you choose the right occurrence.",
            "If the text doesn't fit, the editor explains why it was rejected.",
            "A batch applies in one step and is undone with one button.",
          ],
        },
      },
    },
    {
      slug: "ai-and-export",
      shot: s.editor,
      text: {
        ru: {
          title: "ИИ-ассистент и проверка экспорта",
          summary: "Правку можно описать словами и уточнять по шагам; скачивается только проверенный документ.",
          points: [
            "Перед отправкой показывается, какие строки уйдут провайдеру, и нужно согласие.",
            "Уточнение сохраняет прежние правки; изменение раннего запроса отменяет зависящие от него.",
            "Экспорт заново открывается и сверяется по тексту, ссылкам и пикселям.",
            "Одна отмена возвращает документ к состоянию до пакета правок.",
          ],
        },
        ro: {
          title: "Asistentul AI și validarea exportului",
          summary: "Modificarea se descrie în cuvinte și se precizează pas cu pas; se descarcă doar documentul validat.",
          points: [
            "Înainte de trimitere se arată ce rânduri ajung la furnizor și este necesar acordul.",
            "Precizarea păstrează editările anterioare; schimbarea unei cereri timpurii le anulează pe cele dependente.",
            "Exportul este redeschis și verificat după text, linkuri și pixeli.",
            "O singură anulare readuce documentul la starea dinaintea lotului.",
          ],
        },
        en: {
          title: "AI assistant and export validation",
          summary: "Describe the change in words and refine it step by step; only a validated document is downloaded.",
          points: [
            "Before sending, you see which lines go to the provider, and consent is required.",
            "Refinements keep earlier edits; editing an earlier request invalidates the ones that depend on it.",
            "The export is reopened and checked for text, links and pixels.",
            "One undo returns the document to its state before the batch.",
          ],
        },
      },
    },
  ],
};
