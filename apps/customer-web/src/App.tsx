import { useEffect, useState } from "react";
import {
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  CarFront,
  Check,
  ChevronDown,
  CircleHelp,
  FileText,
  Headset,
  Home,
  Languages,
  Moon,
  Plus,
  ShieldCheck,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import { AccessPageView, PersonalSpace, type AccessPage, type AccountProfile, type Language } from "./AccountPages";

type View = "compare" | "policies" | "documents" | "support" | "account";
type OfferKind = "motor" | "travel";
type Theme = "light" | "dark";

const messages = {
  fr: {
    navHome: "Mon espace",
    navCompare: "Comparer les offres",
    navPolicies: "Mes contrats",
    navDocuments: "Documents",
    navSupport: "Aide & assistance",
    account: "Mon compte",
    individual: "Particulier",
    professional: "Professionnel",
    company: "Entreprise",
    signIn: "Se connecter",
    createAccount: "Créer un compte",
    publicCompare: "Comparer les assurances",
    howItWorks: "Comment ça marche",
    publicTitle: "Plusieurs offres. Un choix plus clair.",
    publicSubtitle: "Comparez les garanties auto et voyage proposées en Tunisie, sans créer de compte.",
    publicFree: "Comparaison gratuite",
    publicNoCommitment: "Sans engagement",
    publicAdvisor: "Un conseiller à vos côtés",
    stepsTitle: "De la comparaison à votre décision",
    stepOne: "Décrivez votre besoin",
    stepOneText: "Choisissez une assurance et les informations utiles à votre situation.",
    stepTwo: "Comparez les garanties",
    stepTwoText: "Examinez prix, protections et franchises côte à côte, sans vous connecter.",
    stepThree: "Continuez à votre rythme",
    stepThreeText: "Créez un compte pour retrouver vos contrats et documents après souscription.",
    accountBenefit: "Connectez-vous pour retrouver vos contrats, documents et démarches.",
    switchToDark: "Activer le thème sombre",
    switchToLight: "Activer le thème clair",
    greeting: "Bonjour, Amira",
    market: "Tunisie",
    demo: "Aperçu de démonstration",
    title: "Une assurance qui vous ressemble.",
    subtitle: "Comparez les garanties, pas seulement les prix.",
    motor: "Auto",
    travel: "Voyage en Tunisie",
    vehicle: "Votre véhicule",
    vehicleOption: "Citadine · 5 CV",
    governorate: "Gouvernorat",
    governorateOption: "Tunis",
    age: "Âge du conducteur",
    ageOption: "30–39 ans",
    search: "Voir les offres",
    results: "Offres qui pourraient vous convenir",
    resultCount: "{count} offres · données de démonstration",
    sort: "Trier : meilleur équilibre",
    sortLowest: "Prix croissant",
    sortHighest: "Prix décroissant",
    loadingOffers: "Chargement des offres…",
    offersError: "Les offres ne sont pas disponibles pour le moment.",
    noOffers: "Aucune offre disponible pour ces critères.",
    retry: "Réessayer",
    annually: "/ an",
    from: "Dès",
    liability: "Responsabilité civile",
    assistance: "Assistance 24/7",
    glass: "Bris de glace",
    theft: "Vol & incendie",
    deductible: "Franchise",
    included: "Incluse",
    notIncluded: "En option",
    selectOffer: "Choisir cette offre",
    selected: "Sélectionnée",
    compare: "Comparer la sélection",
    selectTwo: "Sélectionnez 2 offres pour comparer",
    helpTitle: "Un doute sur les garanties ?",
    helpText: "Un conseiller vous aide à y voir clair, sans pression.",
    speakAdvisor: "Parler à un conseiller",
    secure: "Vos informations restent privées",
    offerDetails: "Détails de l'offre",
    coverage: "Garanties",
    close: "Fermer",
    comparisonTitle: "Votre comparaison",
    comparisonNote: "Comparez les garanties côte à côte avant de décider.",
    monthly: "ou par mois",
    policiesTitle: "Mes contrats",
    documentsTitle: "Mes documents",
    supportTitle: "Comment pouvons-nous vous aider ?",
    emptyPolicies: "Vous n'avez pas encore de contrat.",
    emptyDocuments: "Vos documents apparaîtront ici après la souscription.",
    exploreOffers: "Explorer les offres",
    phone: "Téléphone",
    email: "E-mail",
    chat: "Chat avec un conseiller",
    supportHours: "Du lundi au samedi · 08:00–18:00",
    footer: "Emmeny · Assurance en toute clarté",
    noFee: "Aucun frais caché",
    local: "Pensé pour la Tunisie",
  },
  en: {
    navHome: "My space",
    navCompare: "Compare offers",
    navPolicies: "My policies",
    navDocuments: "Documents",
    navSupport: "Help & support",
    account: "My account",
    individual: "Individual",
    professional: "Professional",
    company: "Company",
    signIn: "Sign in",
    createAccount: "Create account",
    publicCompare: "Compare insurance",
    howItWorks: "How it works",
    publicTitle: "More choice. A clearer decision.",
    publicSubtitle: "Compare motor and travel coverage available in Tunisia without creating an account.",
    publicFree: "Free comparison",
    publicNoCommitment: "No obligation",
    publicAdvisor: "A real advisor when you need one",
    stepsTitle: "From comparison to your decision",
    stepOne: "Tell us what you need",
    stepOneText: "Choose a type of insurance and the details relevant to you.",
    stepTwo: "Compare the coverage",
    stepTwoText: "Review prices, protection, and deductibles side by side, without signing in.",
    stepThree: "Continue at your pace",
    stepThreeText: "Create an account to keep your policies and documents after purchase.",
    accountBenefit: "Sign in to manage your policies, documents, and requests.",
    switchToDark: "Enable dark theme",
    switchToLight: "Enable light theme",
    greeting: "Hello, Amira",
    market: "Tunisia",
    demo: "Demo preview",
    title: "Insurance that feels right.",
    subtitle: "Compare the coverage, not just the price.",
    motor: "Motor",
    travel: "Travel in Tunisia",
    vehicle: "Your vehicle",
    vehicleOption: "City car · 5 HP",
    governorate: "Governorate",
    governorateOption: "Tunis",
    age: "Driver age",
    ageOption: "30–39 years",
    search: "See offers",
    results: "Offers picked for you",
    resultCount: "{count} offers · demo data",
    sort: "Sort: best balance",
    sortLowest: "Price: low to high",
    sortHighest: "Price: high to low",
    loadingOffers: "Loading offers…",
    offersError: "Offers are unavailable right now.",
    noOffers: "No offers are available for these criteria.",
    retry: "Retry",
    annually: "/ year",
    from: "From",
    liability: "Third-party liability",
    assistance: "24/7 assistance",
    glass: "Glass cover",
    theft: "Theft & fire",
    deductible: "Deductible",
    included: "Included",
    notIncluded: "Optional",
    selectOffer: "Choose this offer",
    selected: "Selected",
    compare: "Compare selection",
    selectTwo: "Select 2 offers to compare",
    helpTitle: "Unsure about the coverage?",
    helpText: "A person can help you make sense of the details, with no pressure.",
    speakAdvisor: "Talk to an advisor",
    secure: "Your information stays private",
    offerDetails: "Offer details",
    coverage: "Coverage",
    close: "Close",
    comparisonTitle: "Your comparison",
    comparisonNote: "Review coverage side by side before you decide.",
    monthly: "or monthly",
    policiesTitle: "My policies",
    documentsTitle: "My documents",
    supportTitle: "How can we help?",
    emptyPolicies: "You don't have a policy yet.",
    emptyDocuments: "Your documents will appear here after you buy a policy.",
    exploreOffers: "Explore offers",
    phone: "Phone",
    email: "Email",
    chat: "Chat with an advisor",
    supportHours: "Monday–Saturday · 08:00–18:00",
    footer: "Emmeny · Insurance, made clear",
    noFee: "No hidden fees",
    local: "Made for Tunisia",
  },
  ar: {
    navHome: "مساحتي",
    navCompare: "قارن العروض",
    navPolicies: "عقودي",
    navDocuments: "الوثائق",
    navSupport: "المساعدة والدعم",
    account: "حسابي",
    individual: "فرد",
    professional: "مهني",
    company: "شركة",
    signIn: "تسجيل الدخول",
    createAccount: "إنشاء حساب",
    publicCompare: "قارن التأمينات",
    howItWorks: "كيف يعمل",
    publicTitle: "خيارات أكثر. قرار أوضح.",
    publicSubtitle: "قارن تغطيات السيارات والسفر في تونس دون إنشاء حساب.",
    publicFree: "مقارنة مجانية",
    publicNoCommitment: "دون التزام",
    publicAdvisor: "مستشار لمساعدتك عند الحاجة",
    stepsTitle: "من المقارنة إلى قرارك",
    stepOne: "أخبرنا بما تحتاج",
    stepOneText: "اختر نوع التأمين والتفاصيل المناسبة لوضعك.",
    stepTwo: "قارن التغطيات",
    stepTwoText: "راجع الأسعار والحماية ومبالغ التحمل جنباً إلى جنب دون تسجيل الدخول.",
    stepThree: "تابع حسب اختيارك",
    stepThreeText: "أنشئ حساباً للاحتفاظ بعقودك ووثائقك بعد الاشتراك.",
    accountBenefit: "سجّل الدخول لإدارة عقودك ووثائقك وطلباتك.",
    switchToDark: "تفعيل المظهر الداكن",
    switchToLight: "تفعيل المظهر الفاتح",
    greeting: "مرحبا، أميرة",
    market: "تونس",
    demo: "معاينة تجريبية",
    title: "تأمين يناسبك.",
    subtitle: "قارن التغطيات، وليس الأسعار فقط.",
    motor: "سيارة",
    travel: "السفر في تونس",
    vehicle: "سيارتك",
    vehicleOption: "سيارة مدينة · 5 خيول",
    governorate: "الولاية",
    governorateOption: "تونس",
    age: "عمر السائق",
    ageOption: "30–39 سنة",
    search: "عرض العروض",
    results: "عروض قد تناسبك",
    resultCount: "{count} عروض · بيانات تجريبية",
    sort: "ترتيب: أفضل توازن",
    sortLowest: "السعر: من الأقل إلى الأعلى",
    sortHighest: "السعر: من الأعلى إلى الأقل",
    loadingOffers: "جار تحميل العروض…",
    offersError: "العروض غير متاحة حالياً.",
    noOffers: "لا توجد عروض متاحة لهذه المعايير.",
    retry: "إعادة المحاولة",
    annually: "/ السنة",
    from: "ابتداء من",
    liability: "المسؤولية المدنية",
    assistance: "مساعدة على مدار الساعة",
    glass: "كسر الزجاج",
    theft: "السرقة والحريق",
    deductible: "مبلغ التحمل",
    included: "مشمول",
    notIncluded: "اختياري",
    selectOffer: "اختر هذا العرض",
    selected: "تم الاختيار",
    compare: "قارن الاختيارات",
    selectTwo: "اختر عرضين للمقارنة",
    helpTitle: "هل لديك سؤال حول التغطية؟",
    helpText: "مستشار يساعدك على فهم التفاصيل دون ضغط.",
    speakAdvisor: "تحدث إلى مستشار",
    secure: "معلوماتك تبقى خاصة",
    offerDetails: "تفاصيل العرض",
    coverage: "التغطية",
    close: "إغلاق",
    comparisonTitle: "مقارنة العروض",
    comparisonNote: "راجع التغطيات جنباً إلى جنب قبل الاختيار.",
    monthly: "أو شهرياً",
    policiesTitle: "عقودي",
    documentsTitle: "وثائقي",
    supportTitle: "كيف يمكننا مساعدتك؟",
    emptyPolicies: "ليس لديك عقد بعد.",
    emptyDocuments: "ستظهر وثائقك هنا بعد الاشتراك.",
    exploreOffers: "اكتشف العروض",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    chat: "الدردشة مع مستشار",
    supportHours: "من الاثنين إلى السبت · 08:00–18:00",
    footer: "إمني · التأمين بكل وضوح",
    noFee: "دون رسوم خفية",
    local: "مصمم لتونس",
  },
} as const;

type MessageKey = keyof typeof messages.fr;
type ApiOffer = {
  id: string;
  insurerId: string;
  insurerName: string;
  productType: "MOTOR" | "TRAVEL";
  name: string;
  description: string;
  coverages: { code: string; name: string }[];
  premiumAmount: number;
  deductibleAmount: number;
  currency: string;
};

const coverageDefinitions: Array<{ code: string; key: MessageKey }> = [
  { code: "LIABILITY", key: "liability" },
  { code: "ASSISTANCE_24_7", key: "assistance" },
  { code: "GLASS", key: "glass" },
  { code: "THEFT_FIRE", key: "theft" },
];

const productTypeFor: Record<OfferKind, ApiOffer["productType"]> = {
  motor: "MOTOR",
  travel: "TRAVEL",
};

const markFor = (insurerId: string) => {
  const suffix = insurerId.slice(-1).toLowerCase();
  return ["a", "b", "c"].includes(suffix) ? suffix : "a";
};

const navItems = [
  { view: "compare", key: "navCompare" as const, icon: ArrowDownUp },
  { view: "policies", key: "navPolicies" as const, icon: ShieldCheck },
  { view: "documents", key: "navDocuments" as const, icon: FileText },
  { view: "support", key: "navSupport" as const, icon: Headset },
] satisfies Array<{ view: View; key: MessageKey; icon: typeof Home }>;

const localeCodes: Record<Language, string> = { fr: "fr-TN", en: "en", ar: "ar-TN" };

function App() {
  const [language, setLanguage] = useState<Language>("fr");
  const [theme, setTheme] = useState<Theme>(() => document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  const [accessPage, setAccessPage] = useState<AccessPage | null>(null);
  const [authenticatedCustomer, setAuthenticatedCustomer] = useState<AccountProfile | null>(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [kind, setKind] = useState<OfferKind>("motor");
  const [activeView, setActiveView] = useState<View>("compare");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [offers, setOffers] = useState<ApiOffer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [offerLoadError, setOfferLoadError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [sortAscending, setSortAscending] = useState(true);
  const t = (key: MessageKey) => messages[language][key];
  const isRtl = language === "ar";
  const isPublic = !authenticatedCustomer;
  const visibleOffers = [...offers].sort((left, right) =>
    sortAscending ? left.premiumAmount - right.premiumAmount : right.premiumAmount - left.premiumAmount,
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [isRtl, language]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("emmeny-theme", theme);
  }, [theme]);

  useEffect(() => {
    const controller = new AbortController();
    const restoreSession = async () => {
      try {
        const response = await fetch("/api/identity/sessions/current", {
          credentials: "same-origin",
          signal: controller.signal,
        });
        if (response.ok) {
          const account = await response.json() as AccountProfile;
          setAuthenticatedCustomer(account);
          setAccessPage(null);
        }
      } catch {
        // A missing session leaves the public sign-in screen available.
      } finally {
        if (!controller.signal.aborted) setSessionChecked(true);
      }
    };

    void restoreSession();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const productType = productTypeFor[kind];

    const loadOffers = async () => {
      setLoadingOffers(true);
      setOfferLoadError(false);
      try {
        const response = await fetch(`/api/offers?productType=${productType}&marketCountry=TN`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Offer request failed");
        const data = await response.json() as ApiOffer[];
        setOffers(data);
      } catch {
        if (!controller.signal.aborted) {
          setOffers([]);
          setOfferLoadError(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoadingOffers(false);
      }
    };

    void loadOffers();
    return () => controller.abort();
  }, [kind, refreshKey]);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat(localeCodes[language], {
      style: "currency",
      currency: "TND",
      maximumFractionDigits: 0,
    }).format(amount);

  const toggleOffer = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id].slice(-2),
    );
  };

  const openCompare = () => {
    if (selectedIds.length === 2) setShowComparison(true);
  };

  const signOut = async () => {
    try {
      await fetch("/api/identity/sessions/logout", { method: "POST", credentials: "same-origin" });
    } finally {
      setAuthenticatedCustomer(null);
      setAccessPage("login");
      setActiveView("compare");
    }
  };

  const pageTitle = activeView === "policies"
    ? t("policiesTitle")
    : activeView === "documents"
      ? t("documentsTitle")
      : activeView === "support"
        ? t("supportTitle")
        : activeView === "account"
          ? t("account")
        : t("title");

  if (!sessionChecked) {
    return <main className="session-loading"><span className="brand-mark"><ShieldCheck size={19} /></span><span>emmeny<span className="brand-period">.</span></span></main>;
  }

  if (accessPage) {
    return <AccessPageView
      language={language}
      theme={theme}
      mode={accessPage}
      onLanguageChange={setLanguage}
      onThemeChange={setTheme}
      onNavigate={setAccessPage}
      onContinue={() => setAccessPage(null)}
      onAuthenticated={(account) => {
        setAuthenticatedCustomer(account);
        setAccessPage(null);
      }}
    />;
  }

  return (
    <div className={`app-shell${isRtl ? " is-rtl" : ""}${isPublic ? " is-public" : ""}`}>
      {authenticatedCustomer && <aside className="sidebar">
        <a className="brand" href="#home" onClick={() => setActiveView("compare")} aria-label="Emmeny home">
          <span className="brand-mark"><ShieldCheck size={19} strokeWidth={2.2} /></span>
          <span>emmeny<span className="brand-period">.</span></span>
        </a>
        <div className="market-label"><span className="market-dot" />{t("market")}</div>
        <div className="sidebar-section-label">
          {authenticatedCustomer?.firstName ?? t("greeting")}
          {authenticatedCustomer && <span className="workspace-badge">{(authenticatedCustomer.workspaceType ?? "INDIVIDUAL") === "INDIVIDUAL" ? t("individual") : authenticatedCustomer.workspaceType === "PROFESSIONAL" ? t("professional") : t("company")}</span>}
        </div>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navItems.map(({ view, key, icon: Icon }) => (
            <button
              className={`nav-link${activeView === view ? " active" : ""}`}
              key={view}
              onClick={() => setActiveView(view)}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{t(key)}</span>
              {view === "compare" && <span className="nav-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note-icon"><ShieldCheck size={17} /></div>
          <span>{t("secure")}</span>
        </div>
      </aside>}

      <div className="main-column">
        <header className="topbar">
          {isPublic ? (
            <div className="public-brand-nav">
              <a className="brand" href="#home" aria-label="Emmeny home">
                <span className="brand-mark"><ShieldCheck size={19} strokeWidth={2.2} /></span>
                <span>emmeny<span className="brand-period">.</span></span>
              </a>
              <nav className="public-header-links" aria-label={t("publicCompare")}>
                <a href="#compare">{t("publicCompare")}</a>
                <a href="#how-it-works">{t("howItWorks")}</a>
              </nav>
            </div>
          ) : <div className="breadcrumb"><span>Emmeny</span><span className="breadcrumb-slash">/</span><strong>{activeView === "compare" ? t("navCompare") : pageTitle}</strong></div>}
          <div className="topbar-actions">
            {!isPublic && <span className="demo-chip"><span />{t("demo")}</span>}
            <label className="language-select">
              <Languages size={16} />
              <select aria-label="Language" value={language} onChange={(event) => setLanguage(event.target.value as Language)}>
                <option value="fr">FR</option>
                <option value="en">EN</option>
                <option value="ar">عربي</option>
              </select>
              <ChevronDown size={13} />
            </label>
            <button
              className="theme-toggle"
              type="button"
              aria-label={t(theme === "dark" ? "switchToLight" : "switchToDark")}
              title={t(theme === "dark" ? "switchToLight" : "switchToDark")}
              onClick={() => setTheme((value) => value === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            {authenticatedCustomer ? (
              <button className="profile-button" aria-label={t("account")} onClick={() => setActiveView("account")}>
                {authenticatedCustomer.firstName.charAt(0).toUpperCase()}
              </button>
            ) : (
              <div className="public-auth-actions">
                <button className="public-signin" onClick={() => setAccessPage("login")}><UserRound size={15} />{t("signIn")}</button>
                <button className="public-signup" onClick={() => setAccessPage("register")}>{t("createAccount")}<ArrowRight size={14} /></button>
              </div>
            )}
          </div>
        </header>

        <main className={`content-area${isPublic ? " public-content" : ""}`}>
          {activeView === "account" && authenticatedCustomer ? (
            <PersonalSpace
              language={language}
              account={authenticatedCustomer}
              onAccountUpdate={setAuthenticatedCustomer}
              onSignOut={signOut}
            />
          ) : activeView === "compare" ? (
            <>
              <section className={`page-heading${isPublic ? " public-hero" : ""}`}>
                <div>
                  <div className="eyebrow"><span className="eyebrow-line" />{t("market")} · {isPublic ? t("publicFree") : "2026"}</div>
                  <h1>{isPublic ? t("publicTitle") : t("title")}</h1>
                  <p>{isPublic ? t("publicSubtitle") : t("subtitle")}</p>
                </div>
                {isPublic ? (
                  <div className="public-trust-points">
                    <span><Check size={14} />{t("publicNoCommitment")}</span>
                    <span><Headset size={14} />{t("publicAdvisor")}</span>
                  </div>
                ) : <div className="heading-stamp"><span>01</span><span className="stamp-divider" /><span>03</span></div>}
              </section>

              <section className="quote-panel" id="compare" aria-label="Recherche d'assurance">
                <div className="product-tabs" role="tablist" aria-label="Type d'assurance">
                  <button className={kind === "motor" ? "product-tab active" : "product-tab"} onClick={() => { setKind("motor"); setSelectedIds([]); }} role="tab" aria-selected={kind === "motor"}>
                    <CarFront size={17} />{t("motor")}
                  </button>
                  <button className={kind === "travel" ? "product-tab active" : "product-tab"} onClick={() => { setKind("travel"); setSelectedIds([]); }} role="tab" aria-selected={kind === "travel"}>
                    <ArrowLeft size={16} />{t("travel")}
                  </button>
                </div>
                <div className="quote-fields">
                  <label className="quote-field">
                    <span>{kind === "motor" ? t("vehicle") : t("travel")}</span>
                    <select><option>{kind === "motor" ? t("vehicleOption") : t("governorateOption")}</option></select>
                  </label>
                  <label className="quote-field">
                    <span>{t("governorate")}</span>
                    <select><option>{t("governorateOption")}</option><option>Sfax</option><option>Sousse</option></select>
                  </label>
                  <label className="quote-field age-field">
                    <span>{t("age")}</span>
                    <select><option>{t("ageOption")}</option><option>18–29</option><option>40–59</option><option>60+</option></select>
                  </label>
                  <button className="search-button" onClick={() => { setSelectedIds([]); setRefreshKey((value) => value + 1); }}>
                    {t("search")}<ArrowRight size={16} />
                  </button>
                </div>
              </section>

              <div className="results-heading">
                <div>
                  <h2>{t("results")}</h2>
                  <span className="result-caption">{t("resultCount").replace("{count}", String(visibleOffers.length))}</span>
                </div>
                <button className="sort-button" onClick={() => setSortAscending((value) => !value)}>
                  <ArrowDownUp size={15} />{sortAscending ? t("sortLowest") : t("sortHighest")}
                </button>
              </div>

              <section className="offers-list" aria-label={t("results")}>
                {loadingOffers ? (
                  <div className="offer-status" role="status">{t("loadingOffers")}</div>
                ) : offerLoadError ? (
                  <div className="offer-status error" role="alert">
                    <span>{t("offersError")}</span>
                    <button className="choose-button" onClick={() => setRefreshKey((value) => value + 1)}>{t("retry")}</button>
                  </div>
                ) : visibleOffers.length === 0 ? (
                  <div className="offer-status">{t("noOffers")}</div>
                ) : visibleOffers.map((offer, index) => {
                  const selected = selectedIds.includes(offer.id);
                  const includedCodes = new Set(offer.coverages.map((coverage) => coverage.code));
                  return (
                    <article className={`offer-row${selected ? " selected" : ""}`} key={offer.id}>
                      <div className="offer-rank">0{index + 1}</div>
                      <div className={`carrier-mark mark-${markFor(offer.insurerId)}`}>{offer.insurerName.slice(-1)}</div>
                      <div className="offer-main">
                        <div className="offer-name-line">
                          <h3>{offer.insurerName}</h3>
                          <span className="offer-product">{offer.name}</span>
                        </div>
                        <div className="coverage-preview">
                          {coverageDefinitions.slice(0, 3).map(({ code, key }) => {
                            const included = includedCodes.has(code);
                            return <span className={included ? "coverage-item" : "coverage-item muted"} key={code}>
                              {included ? <Check size={12} /> : <Plus size={12} />}{t(key)}
                            </span>
                          })}
                        </div>
                      </div>
                      <div className="offer-price">
                        <span className="price-label">{t("from")}</span>
                        <strong>{formatPrice(offer.premiumAmount)}</strong>
                        <span className="price-period">{t("annually")}</span>
                      </div>
                      <button className={`choose-button${selected ? " chosen" : ""}`} onClick={() => toggleOffer(offer.id)}>
                        {selected ? <><Check size={15} />{t("selected")}</> : t("selectOffer")}
                      </button>
                    </article>
                  );
                })}
              </section>

              <div className="offers-footnote"><ShieldCheck size={15} />{language === "ar" ? "بيانات تجريبية، وليست عروضاً فعلية من شركات التأمين." : language === "en" ? "Demo data only. These are not live insurer quotes." : "Données de démonstration uniquement, pas de vrais devis assureurs."}</div>

              <section className="advisor-strip">
                <div className="advisor-icon"><CircleHelp size={20} /></div>
                <div className="advisor-copy"><strong>{t("helpTitle")}</strong><span>{t("helpText")}</span></div>
                <a href="mailto:bonjour@emmeny.tn" className="advisor-link">{t("speakAdvisor")}<ArrowRight size={15} /></a>
              </section>
              {isPublic && <>
                <section className="public-how" id="how-it-works">
                  <div className="public-how-heading">
                    <div className="eyebrow"><span className="eyebrow-line" />{t("market")}</div>
                    <h2>{t("stepsTitle")}</h2>
                  </div>
                  <ol className="public-step-grid">
                    <li><span>01</span><h3>{t("stepOne")}</h3><p>{t("stepOneText")}</p></li>
                    <li><span>02</span><h3>{t("stepTwo")}</h3><p>{t("stepTwoText")}</p></li>
                    <li><span>03</span><h3>{t("stepThree")}</h3><p>{t("stepThreeText")}</p></li>
                  </ol>
                </section>
                <section className="public-account-cta">
                  <div className="public-account-icon"><UserRound size={19} /></div>
                  <p>{t("accountBenefit")}</p>
                  <button className="public-signin" onClick={() => setAccessPage("login")}>{t("signIn")}<ArrowRight size={14} /></button>
                </section>
              </>}
            </>
          ) : activeView === "support" ? (
            <section className="simple-page">
              <div className="eyebrow"><span className="eyebrow-line" />{t("market")}</div>
              <h1>{t("supportTitle")}</h1>
              <p className="simple-description">{t("helpText")}</p>
              <div className="support-options">
                <a href="tel:+21670000000"><Headset size={20} /><span><strong>{t("phone")}</strong><small>+216 70 000 000</small></span><ArrowRight size={16} /></a>
                <a href="mailto:bonjour@emmeny.tn"><FileText size={20} /><span><strong>{t("email")}</strong><small>bonjour@emmeny.tn</small></span><ArrowRight size={16} /></a>
                <a href="mailto:bonjour@emmeny.tn?subject=Chat%20Emmeny"><CircleHelp size={20} /><span><strong>{t("chat")}</strong><small>{t("supportHours")}</small></span><ArrowRight size={16} /></a>
              </div>
            </section>
          ) : (
            <section className="simple-page">
              <div className="eyebrow"><span className="eyebrow-line" />{t("market")}</div>
              <h1>{pageTitle}</h1>
              <div className="empty-state">
                <div className="empty-icon">{activeView === "policies" ? <ShieldCheck size={22} /> : <FileText size={22} />}</div>
                <p>{activeView === "policies" ? t("emptyPolicies") : t("emptyDocuments")}</p>
                <button className="search-button" onClick={() => setActiveView("compare")}>{t("exploreOffers")}<ArrowRight size={16} /></button>
              </div>
            </section>
          )}
          <footer className="page-footer"><span>{t("footer")}</span><span><span className="footer-check"><Check size={11} /></span>{t("noFee")}<span className="footer-divider">·</span>{t("local")}</span></footer>
        </main>
      </div>

      {authenticatedCustomer && <nav className="mobile-nav" aria-label="Navigation mobile">
        {navItems.map(({ view, key, icon: Icon }) => (
          <button className={activeView === view ? "mobile-nav-item active" : "mobile-nav-item"} key={view} onClick={() => setActiveView(view)}>
            <Icon size={19} strokeWidth={1.8} /><span>{t(key)}</span>
          </button>
        ))}
      </nav>}

      {selectedIds.length > 0 && activeView === "compare" && (
        <div className="compare-dock">
          <span>{selectedIds.length === 2 ? t("compare") : t("selectTwo")}</span>
          <button disabled={selectedIds.length !== 2} onClick={openCompare}>{t("compare")}<ArrowRight size={15} /><span className="selection-count">{selectedIds.length}/2</span></button>
        </div>
      )}

      {showComparison && (
        <div className="modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setShowComparison(false); }}>
          <section className="comparison-modal" role="dialog" aria-modal="true" aria-labelledby="comparison-title">
            <div className="modal-heading">
              <div><span className="eyebrow"><span className="eyebrow-line" />{t("market")}</span><h2 id="comparison-title">{t("comparisonTitle")}</h2><p>{t("comparisonNote")}</p></div>
              <button className="icon-button" aria-label={t("close")} onClick={() => setShowComparison(false)}><X size={20} /></button>
            </div>
            <div className="comparison-grid">
              {offers.filter((offer) => selectedIds.includes(offer.id)).map((offer) => {
                const includedCodes = new Set(offer.coverages.map((coverage) => coverage.code));
                return (
                <div className="comparison-column" key={offer.id}>
                  <div className="comparison-carrier"><span className={`carrier-mark mark-${markFor(offer.insurerId)}`}>{offer.insurerName.slice(-1)}</span><strong>{offer.insurerName}<small>{offer.name}</small></strong></div>
                  <div className="comparison-price"><strong>{formatPrice(offer.premiumAmount)}</strong><span>{t("annually")}</span></div>
                  {coverageDefinitions.map(({ code, key }) => <div className="comparison-coverage" key={code}><span>{t(key)}</span>{includedCodes.has(code) ? <Check size={16} className="coverage-check" /> : <Plus size={16} className="coverage-plus" />}</div>)}
                  <div className="comparison-deductible"><span>{t("deductible")}</span><strong>{formatPrice(offer.deductibleAmount)}</strong></div>
                </div>
                );
              })}
            </div>
            <div className="modal-disclaimer">{language === "ar" ? "راجع الشروط النهائية مع شركة التأمين قبل الاشتراك." : language === "en" ? "Confirm final terms with the insurer before purchasing." : "Vérifiez les conditions définitives avec l'assureur avant toute souscription."}</div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;