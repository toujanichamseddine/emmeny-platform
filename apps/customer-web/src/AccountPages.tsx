import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Facebook,
  LockKeyhole,
  Mail,
  Moon,
  ShieldCheck,
  Smartphone,
  Sun,
  UserRound,
  X,
} from "lucide-react";

export type Language = "fr" | "en" | "ar";
export type Theme = "light" | "dark";
export type AccessPage = "login" | "register" | "recover";
export type WorkspaceType = "INDIVIDUAL" | "PROFESSIONAL" | "COMPANY";
export type CompanyProfile = {
  name: string;
  businessType: string;
  registrationNumber: string | null;
  employeeCount: number | null;
};
export type VehicleProfile = {
  make: string;
  model: string;
  year: number;
  mileageKm: number;
  status: "OWNED" | "FINANCED" | "LEASED" | "COMPANY";
};
export type AccountProfile = {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationalId: string | null;
  governorate: string;
  city: string;
  address: string | null;
  preferredLanguage: Language;
  vehicle: VehicleProfile | null;
  workspaceType: WorkspaceType;
  companyProfile: CompanyProfile | null;
  createdAt: string;
};

const copy = {
  fr: {
    market: "Tunisie",
    switchToDark: "Activer le thème sombre",
    switchToLight: "Activer le thème clair",
    loginTitle: "Ravi de vous revoir.",
    loginSubtitle: "Connectez-vous à votre espace Emmeny.",
    registerTitle: "Votre espace, en quelques étapes.",
    registerSubtitle: "Créez un compte pour retrouver vos démarches au même endroit.",
    recoverTitle: "Retrouvons votre compte.",
    recoverSubtitle: "Indiquez l'adresse ou le numéro associé à votre compte.",
    email: "Adresse e-mail",
    phone: "Numéro de téléphone",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    firstName: "Prénom",
    lastName: "Nom",
    birthDate: "Date de naissance",
    cin: "Numéro CIN (facultatif)",
    governorate: "Gouvernorat",
    city: "Ville",
    address: "Adresse (facultatif)",
    vehicleSection: "Mon véhicule",
    vehicleIntro: "Ajoutez les informations du véhicule pour préparer vos prochains devis auto.",
    vehicleMake: "Marque",
    vehicleModel: "Modèle",
    vehicleYear: "Année",
    mileageKm: "Kilométrage (km)",
    vehicleStatus: "Situation du véhicule",
    vehicleOwned: "À moi",
    vehicleFinanced: "Financé",
    vehicleLeased: "En leasing",
    vehicleCompany: "Véhicule de société",
    vehicleSave: "Enregistrer le véhicule",
    vehicleSaving: "Enregistrement…",
    vehicleSaved: "Véhicule enregistré dans votre compte.",
    vehicleSaveError: "Impossible d'enregistrer le véhicule. Vérifiez les champs et réessayez.",
    vehicleUnauthorized: "Reconnectez-vous pour enregistrer ce véhicule.",
    choose: "Choisissez une méthode",
    viaEmail: "E-mail",
    viaPhone: "Téléphone",
    loginAction: "Se connecter",
    registerAction: "Créer mon compte",
    recoverAction: "Envoyer les instructions",
    noAccount: "Pas encore de compte ?",
    haveAccount: "Vous avez déjà un compte ?",
    signUp: "Créer un compte",
    signIn: "Se connecter",
    forgot: "Mot de passe oublié ?",
    backLogin: "Retour à la connexion",
    continueBrowse: "Explorer les offres sans compte",
    orContinue: "ou continuer avec",
    google: "Google",
    facebook: "Facebook",
    eHouwiya: "e-Houwiya",
    providerNotice: "Cette connexion sera disponible après la configuration du fournisseur d'identité.",
    authNotice: "Le service de connexion est momentanément indisponible. Réessayez.",
    invalidCredentials: "Adresse e-mail ou mot de passe incorrect.",
    phoneLoginUnavailable: "La connexion par téléphone nécessite encore l'intégration d'un fournisseur de code SMS.",
    registerSuccess: "Compte créé. Connectez-vous avec votre adresse e-mail et votre mot de passe.",
    accountExists: "Un compte avec cet e-mail ou ce numéro existe déjà.",
    registerFailed: "La création du compte a échoué. Vérifiez vos informations et réessayez.",
    working: "Création en cours…",
    passwordMismatch: "Les mots de passe ne correspondent pas.",
    recoverNotice: "La récupération sera activée dès que le service d'identité sera connecté. Aucune demande n'a été envoyée.",
    passwordHint: "8 caractères minimum",
    cinHint: "Demandé uniquement si nécessaire pour une souscription.",
    privacyNote: "Vos informations sont protégées et ne sont jamais partagées sans votre accord.",
    storyTitle: "Vos assurances, plus simples.",
    storyText: "Comparez les offres, gardez vos documents à portée de main et avancez à votre rythme.",
    storyCompare: "Comparez avant de choisir",
    storyDocuments: "Retrouvez vos documents au même endroit",
    storyControl: "Gardez le contrôle de vos données",
    accountTitle: "Mon espace personnel",
    accountIntro: "Gérez vos informations de compte.",
    personalInfo: "Informations personnelles",
    save: "Enregistrer les modifications",
    savedSession: "Modifications visibles dans cette session uniquement. La sauvegarde sera activée avec le service de compte.",
    language: "Langue préférée",
    suspend: "Suspendre mon compte",
    delete: "Supprimer mon compte",
    accountStatus: "Actions du compte",
    suspendTitle: "Suspendre le compte ?",
    deleteTitle: "Supprimer le compte ?",
    suspendInfo: "La suspension désactivera temporairement l'accès et les notifications du compte.",
    deleteInfo: "La suppression est définitive et peut être soumise aux obligations légales de conservation.",
    actionUnavailable: "Le service de compte n'est pas connecté. Aucune action n'a été exécutée.",
    understood: "Compris",
    cancel: "Annuler",
    logout: "Se déconnecter",
    backToOffers: "Retour aux offres",
    selectGovernorate: "Sélectionner…",
    workspace: "Type d'espace",
    individual: "Particulier",
    professional: "Professionnel",
    company: "Entreprise",
    companyName: "Nom de l'entreprise",
    companyBusinessType: "Secteur d'activité",
    companyRegistrationNumber: "N° d'immatriculation",
    companyEmployeeCount: "Nombre d'employés",
    personalSpace: "Mon espace particulier",
    companySpace: "Mon espace entreprise",
    companyOverview: "Vue d'ensemble de l'entreprise",
    companyFleet: "Flotte et véhicules",
    companyPolicies: "Contrats entreprise",
    companyTeam: "Collaborateurs",
    companyEmpty: "Cette section sera disponible après l'ajout de données entreprise.",
  },
  en: {
    market: "Tunisia",
    switchToDark: "Enable dark theme",
    switchToLight: "Enable light theme",
    loginTitle: "Welcome back.",
    loginSubtitle: "Sign in to your Emmeny space.",
    registerTitle: "Your space, in a few steps.",
    registerSubtitle: "Create an account to keep your insurance activity together.",
    recoverTitle: "Let's find your account.",
    recoverSubtitle: "Enter the email address or phone number linked to your account.",
    email: "Email address",
    phone: "Phone number",
    password: "Password",
    confirmPassword: "Confirm password",
    firstName: "First name",
    lastName: "Last name",
    birthDate: "Date of birth",
    cin: "National ID (optional)",
    governorate: "Governorate",
    city: "City",
    address: "Address (optional)",
    vehicleSection: "My vehicle",
    vehicleIntro: "Add your vehicle details to prepare future motor insurance quotes.",
    vehicleMake: "Make",
    vehicleModel: "Model",
    vehicleYear: "Year",
    mileageKm: "Mileage (km)",
    vehicleStatus: "Vehicle ownership",
    vehicleOwned: "Owned",
    vehicleFinanced: "Financed",
    vehicleLeased: "Leased",
    vehicleCompany: "Company vehicle",
    vehicleSave: "Save vehicle",
    vehicleSaving: "Saving…",
    vehicleSaved: "Vehicle saved to your account.",
    vehicleSaveError: "Could not save this vehicle. Check the fields and try again.",
    vehicleUnauthorized: "Sign in again to save this vehicle.",
    choose: "Choose a method",
    viaEmail: "Email",
    viaPhone: "Phone",
    loginAction: "Sign in",
    registerAction: "Create my account",
    recoverAction: "Send recovery instructions",
    noAccount: "New to Emmeny?",
    haveAccount: "Already have an account?",
    signUp: "Create an account",
    signIn: "Sign in",
    forgot: "Forgot password?",
    backLogin: "Back to sign in",
    continueBrowse: "Explore offers without an account",
    orContinue: "or continue with",
    google: "Google",
    facebook: "Facebook",
    eHouwiya: "e-Houwiya",
    providerNotice: "This sign-in method will be available after the identity provider is configured.",
    authNotice: "Sign-in is temporarily unavailable. Please try again.",
    invalidCredentials: "Incorrect email or password.",
    phoneLoginUnavailable: "Phone sign-in still needs an SMS verification provider.",
    registerSuccess: "Account created. Sign in with your email and password.",
    accountExists: "An account with this email or phone number already exists.",
    registerFailed: "Account creation failed. Check your details and try again.",
    working: "Creating account…",
    passwordMismatch: "The passwords do not match.",
    recoverNotice: "Account recovery will be enabled when the identity service is connected. No request was sent.",
    passwordHint: "At least 8 characters",
    cinHint: "Requested only if required for a policy purchase.",
    privacyNote: "Your information is protected and is never shared without your consent.",
    storyTitle: "Insurance, made simpler.",
    storyText: "Compare offers, keep your documents close, and move at your own pace.",
    storyCompare: "Compare before you choose",
    storyDocuments: "Keep documents in one place",
    storyControl: "Stay in control of your data",
    accountTitle: "My personal space",
    accountIntro: "Manage your account information.",
    personalInfo: "Personal information",
    save: "Save changes",
    savedSession: "Changes are visible in this session only. Saving will be enabled when the account service is connected.",
    language: "Preferred language",
    suspend: "Suspend my account",
    delete: "Delete my account",
    accountStatus: "Account actions",
    suspendTitle: "Suspend your account?",
    deleteTitle: "Delete your account?",
    suspendInfo: "Suspending temporarily disables account access and notifications.",
    deleteInfo: "Deletion is permanent and may be subject to legal retention requirements.",
    actionUnavailable: "The account service is not connected. No action was performed.",
    understood: "Understood",
    cancel: "Cancel",
    logout: "Sign out",
    backToOffers: "Back to offers",
    selectGovernorate: "Select…",
    workspace: "Workspace type",
    individual: "Individual",
    professional: "Professional",
    company: "Company",
    companyName: "Company name",
    companyBusinessType: "Business type",
    companyRegistrationNumber: "Registration number",
    companyEmployeeCount: "Number of employees",
    personalSpace: "My personal space",
    companySpace: "My company space",
    companyOverview: "Company overview",
    companyFleet: "Fleet and vehicles",
    companyPolicies: "Company policies",
    companyTeam: "Team members",
    companyEmpty: "This section will be available after company data is added.",
  },
  ar: {
    market: "تونس",
    switchToDark: "تفعيل المظهر الداكن",
    switchToLight: "تفعيل المظهر الفاتح",
    loginTitle: "مرحباً بعودتك.",
    loginSubtitle: "سجّل الدخول إلى مساحتك في إمني.",
    registerTitle: "مساحتك في خطوات بسيطة.",
    registerSubtitle: "أنشئ حساباً لمتابعة خدمات التأمين في مكان واحد.",
    recoverTitle: "لنبحث عن حسابك.",
    recoverSubtitle: "أدخل البريد الإلكتروني أو رقم الهاتف المرتبط بحسابك.",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    firstName: "الاسم الشخصي",
    lastName: "اللقب",
    birthDate: "تاريخ الولادة",
    cin: "رقم بطاقة التعريف (اختياري)",
    governorate: "الولاية",
    city: "المدينة",
    address: "العنوان (اختياري)",
    vehicleSection: "سيارتي",
    vehicleIntro: "أضف معلومات سيارتك للتحضير لعروض تأمين السيارات.",
    vehicleMake: "الماركة",
    vehicleModel: "الطراز",
    vehicleYear: "السنة",
    mileageKm: "المسافة المقطوعة (كم)",
    vehicleStatus: "وضع السيارة",
    vehicleOwned: "ملك لي",
    vehicleFinanced: "بتمويل",
    vehicleLeased: "تأجير طويل الأمد",
    vehicleCompany: "سيارة شركة",
    vehicleSave: "حفظ السيارة",
    vehicleSaving: "جار الحفظ…",
    vehicleSaved: "تم حفظ السيارة في حسابك.",
    vehicleSaveError: "تعذر حفظ السيارة. تحقق من الحقول وحاول مجدداً.",
    vehicleUnauthorized: "سجّل الدخول مجدداً لحفظ السيارة.",
    choose: "اختر طريقة",
    viaEmail: "البريد الإلكتروني",
    viaPhone: "الهاتف",
    loginAction: "تسجيل الدخول",
    registerAction: "إنشاء حسابي",
    recoverAction: "إرسال تعليمات الاسترجاع",
    noAccount: "ليس لديك حساب؟",
    haveAccount: "لديك حساب بالفعل؟",
    signUp: "إنشاء حساب",
    signIn: "تسجيل الدخول",
    forgot: "نسيت كلمة المرور؟",
    backLogin: "العودة إلى تسجيل الدخول",
    continueBrowse: "تصفح العروض دون حساب",
    orContinue: "أو تابع باستخدام",
    google: "Google",
    facebook: "Facebook",
    eHouwiya: "الهوية الرقمية",
    providerNotice: "ستتوفر طريقة الدخول بعد إعداد مزود الهوية.",
    authNotice: "خدمة تسجيل الدخول غير متاحة مؤقتاً. حاول مجدداً.",
    invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    phoneLoginUnavailable: "يتطلب تسجيل الدخول بالهاتف ربط مزود للتحقق عبر الرسائل القصيرة.",
    registerSuccess: "تم إنشاء الحساب. سجّل الدخول باستخدام بريدك الإلكتروني وكلمة المرور.",
    accountExists: "يوجد حساب بهذا البريد الإلكتروني أو رقم الهاتف بالفعل.",
    registerFailed: "تعذر إنشاء الحساب. تحقق من معلوماتك وحاول مجدداً.",
    working: "جار إنشاء الحساب…",
    passwordMismatch: "كلمتا المرور غير متطابقتين.",
    recoverNotice: "سيتم تفعيل استرجاع الحساب عند ربط خدمة الهوية. لم يتم إرسال أي طلب.",
    passwordHint: "8 أحرف على الأقل",
    cinHint: "يُطلب فقط عند الحاجة لإبرام عقد تأمين.",
    privacyNote: "معلوماتك محمية ولا تتم مشاركتها دون موافقتك.",
    storyTitle: "تأمين أبسط.",
    storyText: "قارن العروض، احتفظ بوثائقك في مكان واحد، وتقدم حسب إيقاعك.",
    storyCompare: "قارن قبل الاختيار",
    storyDocuments: "اجمع وثائقك في مكان واحد",
    storyControl: "تحكم في بياناتك",
    accountTitle: "مساحتي الشخصية",
    accountIntro: "إدارة معلومات حسابك.",
    personalInfo: "المعلومات الشخصية",
    save: "حفظ التغييرات",
    savedSession: "التغييرات ظاهرة في هذه الجلسة فقط. سيتم تفعيل الحفظ عند ربط خدمة الحساب.",
    language: "اللغة المفضلة",
    suspend: "تعليق حسابي",
    delete: "حذف حسابي",
    accountStatus: "إجراءات الحساب",
    suspendTitle: "تعليق الحساب؟",
    deleteTitle: "حذف الحساب؟",
    suspendInfo: "يؤدي التعليق إلى إيقاف الدخول والإشعارات مؤقتاً.",
    deleteInfo: "الحذف نهائي وقد يخضع لمتطلبات الاحتفاظ القانونية.",
    actionUnavailable: "خدمة الحساب غير متصلة. لم يتم تنفيذ أي إجراء.",
    understood: "فهمت",
    cancel: "إلغاء",
    logout: "تسجيل الخروج",
    backToOffers: "العودة إلى العروض",
    selectGovernorate: "اختر…",
    workspace: "نوع المساحة",
    individual: "فرد",
    professional: "مهني",
    company: "شركة",
    companyName: "اسم الشركة",
    companyBusinessType: "نوع النشاط",
    companyRegistrationNumber: "رقم التسجيل",
    companyEmployeeCount: "عدد الموظفين",
    personalSpace: "مساحتي الشخصية",
    companySpace: "مساحة شركتي",
    companyOverview: "نظرة عامة على الشركة",
    companyFleet: "أسطول المركبات",
    companyPolicies: "عقود الشركة",
    companyTeam: "الموظفون",
    companyEmpty: "ستتوفر هذه القسم بعد إضافة بيانات الشركة.",
  },
} as const;

type CopyKey = keyof typeof copy.fr;
type Props = {
  language: Language;
  theme: Theme;
  mode: AccessPage;
  onLanguageChange: (language: Language) => void;
  onThemeChange: (theme: Theme) => void;
  onNavigate: (mode: AccessPage) => void;
  onContinue: () => void;
  onAuthenticated: (account: AccountProfile) => void;
};

const governorates = ["Tunis", "Ariana", "Ben Arous", "Manouba", "Sfax", "Sousse", "Nabeul", "Bizerte", "Kairouan", "Gabes", "Other"];
const vehicleMakes = ["Citroën", "Fiat", "Ford", "Hyundai", "Isuzu", "Kia", "Mercedes-Benz", "Peugeot", "Renault", "Seat", "Suzuki", "Toyota", "Volkswagen"];

export function AccessPageView({ language, theme, mode, onLanguageChange, onThemeChange, onNavigate, onContinue, onAuthenticated }: Props) {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [workspaceType, setWorkspaceType] = useState<WorkspaceType>("INDIVIDUAL");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isRtl = language === "ar";
  const t = (key: CopyKey) => copy[language][key];
  const title = mode === "login" ? t("loginTitle") : mode === "register" ? t("registerTitle") : t("recoverTitle");
  const subtitle = mode === "login" ? t("loginSubtitle") : mode === "register" ? t("registerSubtitle") : t("recoverSubtitle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mode === "register") {
      const currentForm = event.currentTarget;
      const form = new FormData(currentForm);
      if (form.get("password") !== form.get("confirmPassword")) {
        setNotice(t("passwordMismatch"));
        return;
      }

      setSubmitting(true);
      setNotice("");
      try {
        const response = await fetch("/api/identity/accounts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: String(form.get("email")).trim(),
            phone: String(form.get("phone")).trim(),
            password: String(form.get("password")),
            firstName: String(form.get("firstName")).trim(),
            lastName: String(form.get("lastName")).trim(),
            birthDate: String(form.get("birthDate")),
            nationalId: String(form.get("nationalId") ?? "").trim() || null,
            governorate: String(form.get("governorate")),
            city: String(form.get("city")).trim(),
            address: String(form.get("address") ?? "").trim() || null,
            preferredLanguage: language,
            workspaceType,
            companyName: workspaceType === "INDIVIDUAL" ? null : String(form.get("companyName") ?? "").trim() || null,
            companyBusinessType: workspaceType === "INDIVIDUAL" ? null : String(form.get("companyBusinessType") ?? "").trim() || null,
            companyRegistrationNumber: workspaceType === "INDIVIDUAL" ? null : String(form.get("companyRegistrationNumber") ?? "").trim() || null,
            companyEmployeeCount: workspaceType === "INDIVIDUAL" ? null : Number(form.get("companyEmployeeCount") || 0) || null,
          }),
        });

        if (response.status === 409) {
          setNotice(t("accountExists"));
        } else if (!response.ok) {
          setNotice(t("registerFailed"));
        } else {
          currentForm.reset();
          setNotice(t("registerSuccess"));
        }
      } catch {
        setNotice(t("registerFailed"));
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (mode === "login") {
      if (method === "phone") {
        setNotice(t("phoneLoginUnavailable"));
        return;
      }

      setSubmitting(true);
      setNotice("");
      try {
        const form = new FormData(event.currentTarget);
        const response = await fetch("/api/identity/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({
            email: String(form.get("email")).trim(),
            password: String(form.get("password")),
          }),
        });

        if (response.status === 401) {
          setNotice(t("invalidCredentials"));
        } else if (!response.ok) {
          setNotice(t("authNotice"));
        } else {
          const result = await response.json() as { customer: AccountProfile };
          onAuthenticated(result.customer);
        }
      } catch {
        setNotice(t("authNotice"));
      } finally {
        setSubmitting(false);
      }
      return;
    }
    setNotice(mode === "recover" ? t("recoverNotice") : t("authNotice"));
  };

  const providerUnavailable = () => setNotice(t("providerNotice"));

  return (
    <main className={`access-shell${isRtl ? " is-rtl" : ""}`}>
      <header className="access-topbar">
        <a className="brand" href="#home" onClick={(event) => { event.preventDefault(); onContinue(); }}>
          <span className="brand-mark"><ShieldCheck size={19} strokeWidth={2.2} /></span>
          <span>emmeny<span className="brand-period">.</span></span>
        </a>
        <label className="language-select access-language">
          <select aria-label={t("language")} value={language} onChange={(event) => onLanguageChange(event.target.value as Language)}>
            <option value="fr">FR</option>
            <option value="en">EN</option>
            <option value="ar">عربي</option>
          </select>
        </label>
        <button
          className="theme-toggle"
          type="button"
          aria-label={t(theme === "dark" ? "switchToLight" : "switchToDark")}
          title={t(theme === "dark" ? "switchToLight" : "switchToDark")}
          onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </header>

      <div className="access-layout">
        <section className="access-story">
          <div className="eyebrow"><span className="eyebrow-line" />{t("market")} · EMMENY</div>
          <h1>{t("storyTitle")}</h1>
          <p>{t("storyText")}</p>
          <div className="story-points">
            <span><Check size={15} />{t("storyCompare")}</span>
            <span><Check size={15} />{t("storyDocuments")}</span>
            <span><Check size={15} />{t("storyControl")}</span>
          </div>
          <div className="story-art" aria-hidden="true"><div className="art-ring ring-one" /><div className="art-ring ring-two" /><div className="art-shield"><ShieldCheck size={38} /></div><div className="art-spark spark-one" /><div className="art-spark spark-two" /></div>
        </section>

        <section className="access-panel" aria-labelledby="access-title">
          <div className="access-heading"><h2 id="access-title">{title}</h2><p>{subtitle}</p></div>

          {mode !== "recover" && <div className="access-providers">
            <button type="button" className="provider-button" onClick={providerUnavailable}><span className="google-g">G</span>{t("google")}</button>
            <button type="button" className="provider-button" onClick={providerUnavailable}><Facebook size={17} fill="currentColor" />{t("facebook")}</button>
            <button type="button" className="provider-button provider-houwiya" onClick={providerUnavailable}><span className="houwiya-mark">ه</span>{t("eHouwiya")}</button>
          </div>}

          {mode !== "recover" && <div className="access-separator"><span />{t("orContinue")}<span /></div>}

          {mode !== "register" && <div className="method-switch" role="tablist" aria-label={t("choose")}>
            <button type="button" role="tab" aria-selected={method === "email"} className={method === "email" ? "active" : ""} onClick={() => { setMethod("email"); setNotice(""); }}><Mail size={15} />{t("viaEmail")}</button>
            <button type="button" role="tab" aria-selected={method === "phone"} className={method === "phone" ? "active" : ""} onClick={() => { setMethod("phone"); setNotice(""); }}><Smartphone size={15} />{t("viaPhone")}</button>
          </div>}

          <form className="access-form" onSubmit={submit}>
            {mode === "register" ? <>
              <label className="form-field"><span>{t("workspace")}</span><div className="workspace-picker">
                <button type="button" className={workspaceType === "INDIVIDUAL" ? "active" : ""} onClick={() => setWorkspaceType("INDIVIDUAL")}>{t("individual")}</button>
                <button type="button" className={workspaceType === "PROFESSIONAL" ? "active" : ""} onClick={() => setWorkspaceType("PROFESSIONAL")}>{t("professional")}</button>
                <button type="button" className={workspaceType === "COMPANY" ? "active" : ""} onClick={() => setWorkspaceType("COMPANY")}>{t("company")}</button>
              </div></label>
              {workspaceType !== "INDIVIDUAL" && <>
                <div className="form-grid two-col">
                  <label className="form-field"><span>{t("companyName")}</span><input name="companyName" required /></label>
                  <label className="form-field"><span>{t("companyBusinessType")}</span><input name="companyBusinessType" required /></label>
                </div>
                <div className="form-grid two-col">
                  <label className="form-field"><span>{t("companyRegistrationNumber")}</span><input name="companyRegistrationNumber" /></label>
                  <label className="form-field"><span>{t("companyEmployeeCount")}</span><input name="companyEmployeeCount" type="number" min="1" max="100000" /></label>
                </div>
              </>}
              <div className="form-grid two-col">
                <label className="form-field"><span>{t("firstName")}</span><input autoComplete="given-name" name="firstName" required /></label>
                <label className="form-field"><span>{t("lastName")}</span><input autoComplete="family-name" name="lastName" required /></label>
              </div>
              <div className="form-grid two-col">
                <label className="form-field"><span>{t("birthDate")}</span><input type="date" autoComplete="bday" name="birthDate" required /></label>
                <label className="form-field"><span>{t("cin")}</span><input inputMode="numeric" autoComplete="off" name="nationalId" /></label>
              </div>
              <div className="form-grid two-col">
                <label className="form-field"><span>{t("phone")}</span><input type="tel" autoComplete="tel" name="phone" placeholder="+216" required /></label>
                <label className="form-field"><span>{t("email")}</span><input type="email" autoComplete="email" name="email" required /></label>
              </div>
              <div className="form-grid two-col">
                <label className="form-field"><span>{t("governorate")}</span><select name="governorate" defaultValue="" required><option value="" disabled>{t("selectGovernorate")}</option>{governorates.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="form-field"><span>{t("city")}</span><input autoComplete="address-level2" name="city" required /></label>
              </div>
              <label className="form-field"><span>{t("address")}</span><input autoComplete="street-address" name="address" /></label>
              <div className="form-grid two-col">
                <label className="form-field"><span>{t("password")}</span><input type="password" autoComplete="new-password" name="password" minLength={8} maxLength={72} required /><small>{t("passwordHint")}</small></label>
                <label className="form-field"><span>{t("confirmPassword")}</span><input type="password" autoComplete="new-password" name="confirmPassword" minLength={8} required /></label>
              </div>
              <p className="field-hint">{t("cinHint")}</p>
            </> : mode === "recover" ? <>
              <label className="form-field"><span>{method === "email" ? t("email") : t("phone")}</span><input type={method === "email" ? "email" : "tel"} autoComplete={method === "email" ? "email" : "tel"} required placeholder={method === "phone" ? "+216" : undefined} /></label>
            </> : <>
              <label className="form-field"><span>{method === "email" ? t("email") : t("phone")}</span><input name={method === "email" ? "email" : "phone"} type={method === "email" ? "email" : "tel"} autoComplete={method === "email" ? "email" : "tel"} required placeholder={method === "phone" ? "+216" : undefined} /></label>
              {method === "email" && <label className="form-field"><span>{t("password")}</span><input name="password" type="password" autoComplete="current-password" minLength={8} required /></label>}
              {mode === "login" && method === "email" && <button className="text-action forgot-link" type="button" onClick={() => onNavigate("recover")}>{t("forgot")}</button>}
            </>}

            {notice && <div className="form-notice" role="status">{notice}</div>}
            <button className="access-submit" type="submit" disabled={submitting}>{submitting ? t("working") : mode === "login" ? t("loginAction") : mode === "register" ? t("registerAction") : t("recoverAction")}<ArrowRight size={16} /></button>
          </form>

          <p className="privacy-note"><LockKeyhole size={13} />{t("privacyNote")}</p>
          <div className="access-switch">
            {mode === "login" ? <>{t("noAccount")} <button className="text-action" onClick={() => onNavigate("register")}>{t("signUp")}</button></>
              : mode === "register" ? <>{t("haveAccount")} <button className="text-action" onClick={() => onNavigate("login")}>{t("signIn")}</button></>
                : <button className="text-action back-action" onClick={() => onNavigate("login")}><ArrowLeft size={14} />{t("backLogin")}</button>}
          </div>
          <button className="browse-link" onClick={onContinue}>{t("continueBrowse")}</button>
        </section>
      </div>
      <footer className="access-footer">© Emmeny · {t("market")}</footer>
    </main>
  );
}

type PersonalSpaceProps = {
  language: Language;
  account: AccountProfile;
  onAccountUpdate: (account: AccountProfile) => void;
  onSignOut: () => void;
};

export function PersonalSpace({ language, account, onAccountUpdate, onSignOut }: PersonalSpaceProps) {
  const [workspaceView, setWorkspaceView] = useState<"personal" | "company">(
    (account.workspaceType ?? "INDIVIDUAL") === "INDIVIDUAL" ? "personal" : "company",
  );
  const [notice, setNotice] = useState("");
  const [vehicleNotice, setVehicleNotice] = useState("");
  const [vehicleSaving, setVehicleSaving] = useState(false);
  const [pendingAction, setPendingAction] = useState<"suspend" | "delete" | null>(null);
  const t = (key: CopyKey) => copy[language][key];

  const saveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(t("savedSession"));
  };

  const saveVehicle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setVehicleSaving(true);
    setVehicleNotice("");
    try {
      const response = await fetch("/api/identity/accounts/current/vehicle", {
        method: "PUT",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          make: String(form.get("make")).trim(),
          model: String(form.get("model")).trim(),
          year: Number(form.get("year")),
          mileageKm: Number(form.get("mileageKm")),
          status: String(form.get("status")),
        }),
      });
      if (response.status === 401) {
        setVehicleNotice(t("vehicleUnauthorized"));
      } else if (!response.ok) {
        setVehicleNotice(t("vehicleSaveError"));
      } else {
        onAccountUpdate(await response.json() as AccountProfile);
        setVehicleNotice(t("vehicleSaved"));
      }
    } catch {
      setVehicleNotice(t("vehicleSaveError"));
    } finally {
      setVehicleSaving(false);
    }
  };

  const actionTitle = pendingAction === "suspend" ? t("suspendTitle") : t("deleteTitle");
  const actionDescription = pendingAction === "suspend" ? t("suspendInfo") : t("deleteInfo");

  return (
    <section className="simple-page personal-page">
      <div className="eyebrow"><span className="eyebrow-line" />{t("market")}</div>
      <h1>{t("accountTitle")}</h1>
      <p className="simple-description">{t("accountIntro")}</p>

      {(account.workspaceType ?? "INDIVIDUAL") !== "INDIVIDUAL" && <div className="workspace-switch" role="tablist" aria-label={t("workspace")}>
        <button type="button" role="tab" aria-selected={workspaceView === "personal"} className={workspaceView === "personal" ? "active" : ""} onClick={() => setWorkspaceView("personal")}>{t("personalSpace")}</button>
        <button type="button" role="tab" aria-selected={workspaceView === "company"} className={workspaceView === "company" ? "active" : ""} onClick={() => setWorkspaceView("company")}>{t("companySpace")}</button>
      </div>}

      {(workspaceView === "company" && (account.workspaceType ?? "INDIVIDUAL") !== "INDIVIDUAL") ? (
        <>
        <section className="company-overview">
          <div className="profile-section-heading"><span className="profile-section-icon"><UserRound size={17} /></span><h2>{t("companyOverview")}</h2></div>
          <div className="company-summary">
            <div><span>{t("companyName")}</span><strong>{account.companyProfile?.name || "—"}</strong></div>
            <div><span>{t("companyBusinessType")}</span><strong>{account.companyProfile?.businessType || "—"}</strong></div>
            <div><span>{t("companyRegistrationNumber")}</span><strong>{account.companyProfile?.registrationNumber || "—"}</strong></div>
            <div><span>{t("companyEmployeeCount")}</span><strong>{account.companyProfile?.employeeCount ?? "—"}</strong></div>
          </div>
        </section>
        <div className="company-feature-grid">
          <section><h2>{t("companyFleet")}</h2><p>{t("companyEmpty")}</p></section>
          <section><h2>{t("companyPolicies")}</h2><p>{t("companyEmpty")}</p></section>
          <section><h2>{t("companyTeam")}</h2><p>{t("companyEmpty")}</p></section>
        </div>
        </>
      ) : (
        <>

      <form className="profile-form" onSubmit={saveProfile}>
        <div className="profile-section-heading"><span className="profile-section-icon"><UserRound size={17} /></span><h2>{t("personalInfo")}</h2></div>
        <div className="form-grid two-col">
          <label className="form-field"><span>{t("firstName")}</span><input autoComplete="given-name" name="firstName" defaultValue={account.firstName} required /></label>
          <label className="form-field"><span>{t("lastName")}</span><input autoComplete="family-name" name="lastName" defaultValue={account.lastName} required /></label>
        </div>
        <div className="form-grid two-col">
          <label className="form-field"><span>{t("email")}</span><input type="email" autoComplete="email" name="email" defaultValue={account.email} required /></label>
          <label className="form-field"><span>{t("phone")}</span><input type="tel" autoComplete="tel" name="phone" defaultValue={account.phone} required /></label>
        </div>
        <div className="form-grid two-col">
          <label className="form-field"><span>{t("birthDate")}</span><input type="date" autoComplete="bday" name="birthDate" defaultValue={account.birthDate} /></label>
          <label className="form-field"><span>{t("governorate")}</span><select name="governorate" defaultValue={account.governorate}>{governorates.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        <div className="form-grid two-col">
          <label className="form-field"><span>{t("city")}</span><input autoComplete="address-level2" name="city" defaultValue={account.city} /></label>
          <label className="form-field"><span>{t("address")}</span><input autoComplete="street-address" name="address" defaultValue={account.address ?? ""} /></label>
        </div>
        {notice && <div className="form-notice" role="status">{notice}</div>}
        <div className="profile-form-actions"><button className="access-submit profile-save" type="submit">{t("save")}<Check size={16} /></button><button className="text-action logout-action" type="button" onClick={onSignOut}>{t("logout")}<ArrowRight size={14} /></button></div>
      </form>

      <form className="profile-form vehicle-form" onSubmit={saveVehicle}>
        <div className="profile-section-heading"><span className="profile-section-icon"><UserRound size={17} /></span><h2>{t("vehicleSection")}</h2></div>
        <p className="vehicle-intro">{t("vehicleIntro")}</p>
        <div className="form-grid two-col">
          <label className="form-field"><span>{t("vehicleMake")}</span><input name="make" list="vehicle-makes" defaultValue={account.vehicle?.make ?? ""} autoComplete="off" required /><datalist id="vehicle-makes">{vehicleMakes.map((make) => <option key={make} value={make} />)}</datalist></label>
          <label className="form-field"><span>{t("vehicleModel")}</span><input name="model" defaultValue={account.vehicle?.model ?? ""} required /></label>
        </div>
        <div className="form-grid two-col">
          <label className="form-field"><span>{t("vehicleYear")}</span><input name="year" type="number" min="1950" max="2100" defaultValue={account.vehicle?.year ?? ""} required /></label>
          <label className="form-field"><span>{t("mileageKm")}</span><input name="mileageKm" type="number" min="0" max="2000000" step="1000" defaultValue={account.vehicle?.mileageKm ?? ""} required /></label>
        </div>
        <label className="form-field"><span>{t("vehicleStatus")}</span><select name="status" defaultValue={account.vehicle?.status ?? "OWNED"} required>
          <option value="OWNED">{t("vehicleOwned")}</option>
          <option value="FINANCED">{t("vehicleFinanced")}</option>
          <option value="LEASED">{t("vehicleLeased")}</option>
          <option value="COMPANY">{t("vehicleCompany")}</option>
        </select></label>
        {vehicleNotice && <div className="form-notice" role="status">{vehicleNotice}</div>}
        <button className="access-submit profile-save" type="submit" disabled={vehicleSaving}>{vehicleSaving ? t("vehicleSaving") : t("vehicleSave")}<Check size={16} /></button>
      </form>

        </>
      )}

      <section className="account-actions">
        <h2>{t("accountStatus")}</h2>
        <div><span><strong>{t("suspend")}</strong><small>{t("suspendInfo")}</small></span><button className="account-action-button" onClick={() => setPendingAction("suspend")}>{t("suspend")}</button></div>
        <div className="danger-action"><span><strong>{t("delete")}</strong><small>{t("deleteInfo")}</small></span><button className="account-action-button danger" onClick={() => setPendingAction("delete")}>{t("delete")}</button></div>
      </section>

      {pendingAction && <div className="modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setPendingAction(null); }}>
        <section className="account-dialog" role="dialog" aria-modal="true" aria-labelledby="account-action-title">
          <button className="icon-button dialog-close" aria-label={t("cancel")} onClick={() => setPendingAction(null)}><X size={19} /></button>
          <div className="dialog-icon"><LockKeyhole size={21} /></div>
          <h2 id="account-action-title">{actionTitle}</h2>
          <p>{actionDescription}</p>
          <div className="form-notice" role="status">{t("actionUnavailable")}</div>
          <button className="access-submit" onClick={() => setPendingAction(null)}>{t("understood")}</button>
        </section>
      </div>}
    </section>
  );
}