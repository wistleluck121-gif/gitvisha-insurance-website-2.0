import { useState, type FormEvent, type ReactNode } from "react";



import { motion, AnimatePresence } from "motion/react";



import {



  ArrowDownRight,



  ArrowRight,



  BadgeCheck,



  Building2,



  Check,



  ChevronRight,



  CircleCheck,



  ClipboardCheck,



  FileSearch,



  Flame,



  Globe2,



  HeartPulse,



  Hotel,



  Landmark,



  Mail,



  Menu,



  MessageCircle,



  PackageCheck,



  Phone,



  Scale,



  ShieldCheck,



  Ship,



  Sparkles,



  Store,



  Truck,



  UserRound,



  Warehouse,



  Wrench,



  X,



  Zap,



} from "lucide-react";







const ACCESS_KEY = "fb16044c-1843-49ec-b617-3aa9beb596d5";



const ENDPOINT = "https://api.web3forms.com/submit";







const solutions = [



  ["01", "Property & Fire", "Buildings, stock, equipment and key operating assets.", Flame],



  ["02", "Engineering", "Projects, machinery, erection, installation and operational risks.", Wrench],



  ["03", "Marine", "Cargo and transit protection across complex supply chains.", Ship],



  ["04", "Liability", "Cover for legal liabilities and third-party exposures.", Scale],



  ["05", "Motor", "Protection for commercial fleets and individual vehicles.", Truck],



  ["06", "Group Health", "Employee-focused health and personal accident solutions.", HeartPulse],



  ["07", "Business Interruption", "Support against insured disruptions affecting continuity.", Zap],



  ["08", "Specialty & Corporate", "Structured solutions for complex and evolving exposures.", ShieldCheck],



] as const;







const industries = [



  ["Manufacturing", Building2],



  ["Infrastructure & Construction", Landmark],



  ["Logistics & Warehousing", Warehouse],



  ["Retail & Commercial", Store],



  ["Hospitality", Hotel],



  ["SMEs & Corporate", PackageCheck],



] as const;







const claims = [



  ["01", "Intimate", "Notify us and share the immediate circumstances.", Phone],



  ["02", "Document", "We help organise the relevant information.", ClipboardCheck],



  ["03", "Assess", "Coordinate with involved parties through assessment.", FileSearch],



  ["04", "Resolve", "Support clear communication through conclusion.", CircleCheck],



] as const;







const nav = [



  ["Home", "#home"],



  ["Solutions", "#solutions"],



  ["About", "#about"],



  ["Industries", "#industries"],



  ["Claims", "#claims"],



  ["Contact", "#contact"],



] as const;







function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {



  return (



    <motion.div



      initial={{ opacity: 0, y: 24 }}



      whileInView={{ opacity: 1, y: 0 }}



      viewport={{ once: false, amount: 0.14 }}



      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}



      className={className}



    >



      {children}



    </motion.div>



  );



}







function App() {



  const [menuOpen, setMenuOpen] = useState(false);



  const [botOpen, setBotOpen] = useState(false);



  const [botStep, setBotStep] = useState(1);



  const [botRequirement, setBotRequirement] = useState("");



  const [botName, setBotName] = useState("");



  const [botPhone, setBotPhone] = useState("");



  const [botSending, setBotSending] = useState(false);



  const [botSent, setBotSent] = useState(false);



  const [submitted, setSubmitted] = useState(false);



  const [submitting, setSubmitting] = useState(false);







  const resetBot = () => {



    setBotOpen(false);



    setBotStep(1);



    setBotRequirement("");



    setBotName("");



    setBotPhone("");



    setBotSent(false);



    setBotSending(false);



  };







  async function sendForm(formData: FormData, subject: string, fromName: string) {



    formData.append("access_key", ACCESS_KEY);



    formData.append("subject", subject);



    formData.append("from_name", fromName);



    const response = await fetch(ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: formData });



    return response.json();



  }







  async function handleSubmit(event: FormEvent<HTMLFormElement>) {



    event.preventDefault();



    const form = event.currentTarget;



    if (!form.checkValidity()) { form.reportValidity(); return; }



    setSubmitting(true);



    setSubmitted(false);



    try {



      const result = await sendForm(new FormData(form), "New Insurance Enquiry - Gitvisha", "Gitvisha Website");



      if (result.success) { form.reset(); setSubmitted(true); }



      else window.alert(result.message || "Unable to send enquiry.");



    } catch {



      window.alert("Something went wrong. Please check your connection and try again.");



    } finally { setSubmitting(false); }



  }







  async function handleBotSubmit() {



    if (!botName.trim() || !botPhone.trim()) return;



    setBotSending(true);



    const formData = new FormData();



    formData.append("Name", botName);



    formData.append("Phone", botPhone);



    formData.append("Insurance Requirement", botRequirement || "Talk to an Expert");



    formData.append("Source", "Gitvisha Website Chatbot");



    try {



      const result = await sendForm(formData, "New Chatbot Enquiry - Gitvisha", "Gitvisha Website Chatbot");



      if (result.success) setBotSent(true);



      else window.alert(result.message || "Unable to send enquiry.");



    } catch {



      window.alert("Something went wrong. Please try again.");



    } finally { setBotSending(false); }



  }







  return (



    <div className="min-h-screen overflow-x-hidden bg-[#050914] text-white">



      <div className="fixed inset-0 -z-10 overflow-hidden">



        <div className="absolute left-1/2 top-[-18rem] h-[40rem] w-[70rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />



        <div className="absolute right-[-20rem] top-[28rem] h-[36rem] w-[36rem] rounded-full bg-fuchsia-500/8 blur-[120px]" />



        <div className="futuristic-grid absolute inset-0" />



      </div>







      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#050914]/70 backdrop-blur-2xl">



        <div className="mx-auto flex min-h-[72px] w-[min(1180px,calc(100%-32px))] items-center justify-between gap-6">



          <a href="#home" className="flex items-center" aria-label="Gitvisha home">



            <img src="/assets/top-png.png " alt="Gitvisha" className="w-[145px] sm:w-[200px] object-contain brightness-110" />



          </a>



          <nav className={`${menuOpen ? "flex" : "hidden"} absolute left-3 right-3 top-[72px] sm:left-4 sm:right-4 sm:top-[76px] flex-col gap-2 rounded-2xl border border-white/10 bg-[#07111f]/95 p-4 shadow-2xl md:static md:flex md:flex-row md:items-center md:justify-end md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>



            {nav.map(([label, href]) => (



              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 text-[12px] font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white">{label}</a>



            ))}



            <a href="#contact" onClick={() => setMenuOpen(false)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2.5 text-[12px] font-extrabold text-cyan-100 shadow-[0_0_25px_rgba(101,216,244,.08)] transition hover:-translate-y-0.5 hover:bg-cyan-300/15">Get a Quote <ArrowRight size={15} /></a>



          </nav>



          <button className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 md:hidden" type="button" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle navigation">



            {menuOpen ? <X size={20} /> : <Menu size={20} />}



          </button>



        </div>



      </header>







      <main>



        <section id="home" className="relative pt-[72px]">



          <div className="mx-auto grid min-h-[620px] w-[min(1180px,calc(100%-32px))] items-center gap-10 py-14 sm:min-h-[720px] sm:gap-14 sm:py-20 lg:grid-cols-[1.03fr_.97fr]">



            <Reveal>



              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/5 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.26em] text-cyan-200">



                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,.8)]" /> Insurance · Risk · Claims



              </div>



              <h1 className="max-w-3xl text-[42px] font-semibold leading-[1] tracking-[-.045em] text-white sm:text-6xl lg:text-[80px]" style={{ fontFamily: '"DM Sans", Inter, sans-serif' }}>



                Protecting what matters.



                <span className="mt-2 block bg-gradient-to-r from-cyan-200 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">Securing what's ahead.</span>



              </h1>



              <p className="mt-7 max-w-2xl text-[14px] leading-7 text-slate-300/75 sm:text-base">Thoughtful insurance broking and risk advisory for businesses and individuals — combining clearer decisions, stronger protection and hands-on claims support.</p>



              <div className="mt-8 flex flex-wrap gap-3">



                <a href="#contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-[12px] font-extrabold text-[#07111f] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(255,255,255,.15)]">Start a conversation <ArrowRight size={17} /></a>



                <a href="#solutions" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[.03] px-5 text-[12px] font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/[.06]">Explore solutions <ChevronRight size={17} /></a>



              </div>



              <div className="mt-10 flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">



                <span className="rounded-full border border-white/8 px-3 py-2">Risk-led</span>



                <span className="rounded-full border border-white/8 px-3 py-2">Claims-ready</span>



                <span className="rounded-full border border-white/8 px-3 py-2">Human advisory</span>



              </div>



            </Reveal>







            <div className="relative mx-auto aspect-square w-full max-w-[380px] sm:max-w-[520px]">



  {/* Slowly rotating outer ring */}

  <motion.div

    className="absolute inset-[9%] rounded-[36%] border border-cyan-200/15 bg-cyan-300/[.025]"

    animate={{ rotate: 360 }}

    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}

  />



  {/* Slowly rotating middle ring */}

  <motion.div

    className="absolute inset-[20%] rounded-[42%] border border-fuchsia-300/15 bg-fuchsia-300/[.025]"

    animate={{ rotate: -360 }}

    transition={{ duration: 24, repeat: Infinity, ease: "linear" }}

  />



  {/* Rotating inner ring */}

  <motion.div

    className="absolute inset-[31%] rounded-[34%] border border-cyan-200/25 bg-[#091525] shadow-[0_0_70px_rgba(84,213,255,.15)]"

    animate={{ rotate: 360, scale: [1, 1.025, 1] }}

    transition={{

      rotate: { duration: 16, repeat: Infinity, ease: "linear" },

      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },

    }}

  />



  {/* Center logo: stable and gently floating */}

  <motion.div

    className="absolute inset-0 grid place-items-center"

    animate={{ y: [0, -7, 0] }}

    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}

  >

    <div className="relative flex items-center justify-center">

      <div className="absolute h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />



      <img

        src="/gitvisha-logo.png"

        alt="Gitvisha"

        className="relative z-10 h-20 w-20 sm:h-28 sm:w-28 object-contain drop-shadow-[0_0_25px_rgba(34,211,238,.5)]"

      />

    </div>



    <span className="absolute bottom-[12%] z-20 rounded-full border border-cyan-200/15 bg-[#081221] px-3 py-1 text-[9px] font-bold uppercase tracking-[.18em] text-cyan-100">

      Risk intelligence

    </span>

  </motion.div>



  {/* Coverage badge */}

  <motion.div

    animate={{ x: [0, 8, 0], y: [0, -5, 0] }}

    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}

    className="absolute left-[2%] top-[22%] rounded-2xl border border-white/10 bg-white/[.045] p-3 backdrop-blur-xl"

  >

    <div className="flex items-center gap-2">

      <BadgeCheck className="text-cyan-200" size={16} />

      <div>

        <div className="text-[10px] font-bold text-white">Coverage</div>

        <div className="text-[9px] text-slate-400">structured</div>

      </div>

    </div>

  </motion.div>



  {/* Claims badge */}

  <motion.div

    animate={{ x: [0, -7, 0], y: [0, 8, 0] }}

    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}

    className="absolute bottom-[14%] -right-[3%] rounded-2xl border border-white/10 bg-white/[.045] p-3 backdrop-blur-xl"

  >

    <div className="flex items-center gap-2">

      <CircleCheck className="text-fuchsia-200" size={16} />

      <div>

        <div className="text-[10px] font-bold text-white">Claims</div>

        <div className="text-[9px] text-slate-400">supported</div>

      </div>

    </div>

  </motion.div>



</div>



              </div>



              <div className="border-y border-white/8 bg-white/[.015]">



            <div className="mx-auto w-[min(1180px,calc(100%-32px))] overflow-hidden py-4">



              <motion.div

                className="flex w-max text-[8px] sm:text-[9px] font-extrabold uppercase tracking-[.18em] sm:tracking-[.24em] text-slate-500"

                animate={{ x: ["0%", "-50%"] }}

                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}

              >

                {[...['Property & Fire','Engineering','Marine','Liability','Motor','Group Health','Business Interruption','Specialty Risks'],

                  ...['Property & Fire','Engineering','Marine','Liability','Motor','Group Health','Business Interruption','Specialty Risks']].map((item, i) => (

                  <span key={`${item}-${i}`} className="mr-6 sm:mr-8 shrink-0">

                    {item}

                    <span className="ml-6 sm:ml-8 text-cyan-300/30">✦</span>

                  </span>

                ))}

              </motion.div>



            </div>



          </div>



        </section>







        <section id="solutions" className="mx-auto w-[min(1180px,calc(100%-32px))] py-16 sm:py-28">



          <Reveal><div className="max-w-3xl"><div className="mb-4 text-[9px] font-extrabold uppercase tracking-[.28em] text-cyan-300">Protection system</div><h2 className="text-4xl font-semibold tracking-[-.04em] text-white sm:text-6xl">Built around the risks that actually move your business.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">A modern insurance stack for assets, projects, people, liability, continuity and complex corporate exposures.</p></div></Reveal>



          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">



            {solutions.map(([num, title, desc, Icon], i) => (



              <Reveal key={title} delay={i * .045}>



                <motion.article whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: .2 }} className="group relative h-full min-h-[190px] sm:min-h-[236px] overflow-hidden rounded-3xl border border-white/8 bg-white/[.025] p-5 shadow-[0_20px_60px_rgba(0,0,0,.18)]">



                  <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition group-hover:opacity-100" />



                  <div className="flex items-start justify-between"><div className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-200/10 bg-cyan-200/[.05] text-cyan-200"><Icon size={20} strokeWidth={1.5} /></div><span className="text-[9px] font-extrabold tracking-[.18em] text-slate-600">{num}</span></div>



                  <h3 className="mt-10 sm:mt-16 max-w-[200px] text-[17px] font-semibold leading-tight text-white">{title}</h3>



                  <p className="mt-3 text-[11px] leading-6 text-slate-400">{desc}</p>



                  <ArrowDownRight className="absolute bottom-5 right-5 text-slate-700 transition group-hover:text-cyan-200" size={17} />



                </motion.article>



              </Reveal>



            ))}



          </div>



        </section>







        <section id="about" className="border-y border-white/8 bg-[#07101c] py-16 sm:py-28">



          <div className="mx-auto grid w-[min(1180px,calc(100%-32px))] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">



            <Reveal><div className="text-[9px] font-extrabold uppercase tracking-[.28em] text-cyan-300">About Gitvisha</div><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-6xl">Less complexity.<br /><span className="text-slate-500">More confidence.</span></h2><p className="mt-6 max-w-xl text-sm leading-7 text-slate-400">We begin with your operations, assets, people and priorities — then shape protection around the real exposure, not a generic checklist.</p></Reveal>



            <Reveal delay={.08}><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-3xl border border-white/8 bg-white/[.025] p-6"><Sparkles className="text-cyan-200" size={20} /><h3 className="mt-10 text-lg font-semibold">Clarity by design</h3><p className="mt-3 text-[11px] leading-6 text-slate-400">Coverage explained in practical terms so decisions become easier.</p></div><div className="rounded-3xl border border-white/8 bg-white/[.025] p-6"><Globe2 className="text-fuchsia-200" size={20} /><h3 className="mt-10 text-lg font-semibold">Context-first advice</h3><p className="mt-3 text-[11px] leading-6 text-slate-400">Industry context shapes stronger risk conversations and better options.</p></div><div className="rounded-3xl border border-white/8 bg-white/[.025] p-6"><ShieldCheck className="text-cyan-200" size={20} /><h3 className="mt-10 text-lg font-semibold">Lifecycle support</h3><p className="mt-3 text-[11px] leading-6 text-slate-400">From placement through renewal and claims, the relationship stays active.</p></div><div className="rounded-3xl border border-white/8 bg-white/[.025] p-6"><UserRound className="text-fuchsia-200" size={20} /><h3 className="mt-10 text-lg font-semibold">Human when it matters</h3><p className="mt-3 text-[11px] leading-6 text-slate-400">Clear communication when a difficult situation needs steady guidance.</p></div></div></Reveal>



          </div>



        </section>







        <section id="industries" className="mx-auto w-[min(1180px,calc(100%-32px))] py-16 sm:py-28">



          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-start">



            <Reveal><div className="text-[9px] font-extrabold uppercase tracking-[.28em] text-cyan-300">Industries</div><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Different sectors.<br />Different risk maps.</h2><p className="mt-5 max-w-md text-sm leading-7 text-slate-400">Your operating context changes the exposure. Our conversations start there.</p></Reveal>



            <div className="grid gap-3 sm:grid-cols-2">



              {industries.map(([title, Icon], i) => <Reveal key={title} delay={i * .04}><motion.div whileHover={{ x: 5 }} className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/[.025] p-5"><div className="flex items-center gap-4"><div className="grid h-10 w-10 place-items-center rounded-xl bg-white/[.035] text-cyan-200"><Icon size={18} /></div><span className="text-sm font-semibold text-slate-200">{title}</span></div><ChevronRight size={17} className="text-slate-600 transition group-hover:text-cyan-200" /></motion.div></Reveal>)}



            </div>



          </div>



        </section>







        <section id="claims" className="border-y border-white/8 bg-[#07101c] py-16 sm:py-28">



          <div className="mx-auto w-[min(1180px,calc(100%-32px))]">



            <Reveal><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><div className="text-[9px] font-extrabold uppercase tracking-[.28em] text-cyan-300">Claims assistance</div><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-6xl">Clear support when it matters most.</h2></div><p className="max-w-md text-sm leading-7 text-slate-400">We help organise requirements, communicate clearly and coordinate across the process.</p></div></Reveal>



            <div className="mt-12 grid gap-3 md:grid-cols-4">



              {claims.map(([num, title, detail, Icon], i) => <Reveal key={title} delay={i * .06}><div className="relative min-h-[175px] sm:min-h-0 rounded-3xl border border-white/8 bg-white/[.025] p-5"><div className="flex items-center justify-between"><Icon size={21} className="text-cyan-200"/><span className="text-[9px] font-extrabold tracking-[.18em] text-slate-600">{num}</span></div><h3 className="mt-10 sm:mt-16 text-xl font-semibold">{title}</h3><p className="mt-3 text-[11px] leading-6 text-slate-400">{detail}</p>{i < claims.length - 1 && <div className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-cyan-200/15 bg-[#0a1626] text-cyan-200 md:grid"><ChevronRight size={14}/></div>}</div></Reveal>)}



            </div>



          </div>



        </section>







        <section id="contact" className="mx-auto w-[min(1180px,calc(100%-32px))] py-16 sm:py-28">



          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">



            <Reveal><div className="text-[9px] font-extrabold uppercase tracking-[.28em] text-cyan-300">Start a conversation</div><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-6xl">Let's understand your insurance needs.</h2><p className="mt-5 max-w-md text-sm leading-7 text-slate-400">Share a few details and the Gitvisha team can follow up on the next step.</p><div className="mt-8 grid gap-3 text-[12px] text-slate-300"><a href="mailto:info@gitvishainsurance.com" className="flex items-center gap-3"><Mail size={17} className="text-cyan-200"/>info@gitvishainsurance.com</a><div className="flex items-center gap-3"><Phone size={17} className="text-cyan-200"/>+91 XXXXX XXXXX</div><div className="flex items-center gap-3"><Building2 size={17} className="text-cyan-200"/>Delhi NCR, India</div></div></Reveal>



            <Reveal delay={.08}><form onSubmit={handleSubmit} className="glow-border rounded-3xl border border-white/8 bg-white/[.025] p-5 sm:p-7"><div className="grid gap-3 sm:grid-cols-2"><label className="grid gap-2"><span className="text-[10px] font-bold text-slate-300">Name</span><input required name="name" minLength={2} placeholder="Your full name" className="h-11 rounded-xl border border-white/10 bg-[#08111e] px-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/50" /></label><label className="grid gap-2"><span className="text-[10px] font-bold text-slate-300">Company Name</span><input required name="company" minLength={2} placeholder="Company or organisation" className="h-11 rounded-xl border border-white/10 bg-[#08111e] px-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/50" /></label><label className="grid gap-2"><span className="text-[10px] font-bold text-slate-300">Phone</span><input required name="phone" type="tel" pattern="[0-9+() -]{8,}" placeholder="Your phone number" className="h-11 rounded-xl border border-white/10 bg-[#08111e] px-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/50" /></label><label className="grid gap-2"><span className="text-[10px] font-bold text-slate-300">Email</span><input required name="email" type="email" placeholder="you@company.com" className="h-11 rounded-xl border border-white/10 bg-[#08111e] px-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/50" /></label></div><label className="mt-3 grid gap-2"><span className="text-[10px] font-bold text-slate-300">Insurance Requirement</span><select required name="requirement" defaultValue="" className="h-11 rounded-xl border border-white/10 bg-[#08111e] px-3 text-xs text-white outline-none focus:border-cyan-300/50"><option value="" disabled>Select a requirement</option>{solutions.map(([_, title]) => <option key={title} value={title}>{title}</option>)}<option value="Claims Assistance">Claims Assistance</option><option value="Other / Not Sure">Other / Not Sure</option></select></label><label className="mt-3 grid gap-2"><span className="text-[10px] font-bold text-slate-300">Message</span><textarea required minLength={10} name="message" placeholder="Tell us briefly about your requirement" className="min-h-28 resize-y rounded-xl border border-white/10 bg-[#08111e] p-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/50" /></label><div className="mt-4 flex flex-col gap-3 border-t border-white/8 pt-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-[9px] leading-5 text-slate-500">Your enquiry is sent securely to the email configured in Web3Forms.</p><button type="submit" disabled={submitting} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 text-[11px] font-extrabold text-[#04101a] transition hover:-translate-y-0.5 disabled:opacity-50">{submitting ? "Sending..." : "Send Enquiry"}<ArrowRight size={15}/></button></div>{submitted && <div className="mt-3 flex items-start gap-2 rounded-xl border border-emerald-300/15 bg-emerald-300/[.06] p-3 text-[11px] text-emerald-200"><CircleCheck size={17}/><span>Enquiry sent successfully. Our team will get back to you shortly.</span></div>}</form></Reveal>



          </div>



        </section>



      </main>







      <footer className="border-t border-white/8 bg-[#030711]">



        <div className="mx-auto w-[min(1180px,calc(100%-32px))] py-12"><div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><img src="/assets/top-png.png" alt="Gitvisha" className="w-[145px] sm:w-[200px] h-auto object-contain brightness-110"/><div className="flex flex-wrap justify-center md:justify-end gap-x-5 gap-y-2 text-[10px] font-bold text-slate-500">{nav.slice(1).map(([label, href]) => <a key={href} href={href} className="transition hover:text-white">{label}</a>)}</div></div><div className="mt-8 flex flex-col gap-2 border-t border-white/8 pt-5 text-[9px] text-slate-600 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Gitvisha. All rights reserved.</span><span>Infinite Trust. Secure Peace.</span></div></div>



      </footer>







      <div className="fixed bottom-5 right-5 z-[60] sm:bottom-6 sm:right-6">



        <AnimatePresence>



          {botOpen && <motion.div initial={{ opacity: 0, scale: .92, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .92, y: 14 }} className="absolute bottom-[66px] right-0 w-[min(350px,calc(100vw-24px))] overflow-hidden rounded-3xl border border-white/10 bg-[#07101c]/95 shadow-2xl backdrop-blur-2xl">



            <div className="flex items-center justify-between border-b border-white/8 px-4 py-3"><div className="flex items-center gap-2"><div className="grid h-9 w-9 place-items-center rounded-full bg-cyan-300/10 text-cyan-200"><MessageCircle size={17}/></div><div><div className="text-[12px] font-bold">Gitvisha Assistant</div><div className="text-[9px] text-slate-500">We're here to help</div></div></div><button type="button" className="rounded-lg p-1 text-slate-400 hover:text-white" onClick={resetBot}><X size={17}/></button></div>



              <div className="max-h-[420px] overflow-y-auto p-4">



                {botSent ? <div className="grid justify-items-center px-3 py-7 text-center"><CircleCheck className="text-emerald-300" size={40}/><div className="mt-3 text-lg font-semibold">Thank you!</div><p className="mt-2 text-[11px] leading-5 text-slate-400">Your enquiry has been received. Our team will contact you shortly.</p><button type="button" onClick={() => { setBotSent(false); setBotStep(1); setBotRequirement(""); setBotName(""); setBotPhone(""); }} className="mt-4 rounded-xl border border-white/10 px-4 py-2 text-[10px] font-bold text-cyan-200">Start Again</button></div> : <>



                  <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-white/[.05] px-3 py-2.5 text-[11px] leading-5 text-slate-200">👋 Hi! Welcome to Gitvisha.<br/>How can we help you today?</div>



                  {botStep === 1 && <div className="mt-3 grid gap-2">{[["Get a Quote", 2],["Understand Insurance", 2],["Claims Assistance", 3],["Talk to an Expert", 3]].map(([label, step]) => <button key={label as string} type="button" onClick={() => setBotStep(step as number)} className="rounded-xl border border-white/8 bg-white/[.025] px-3 py-2.5 text-left text-[10px] font-bold text-slate-200 hover:border-cyan-300/30 hover:text-white">{label as string}</button>)}</div>}



                  {botStep === 2 && <><div className="mt-3 max-w-[92%] rounded-2xl rounded-tl-md bg-white/[.05] px-3 py-2.5 text-[11px] leading-5 text-slate-200">Great! What type of insurance are you looking for?</div><div className="mt-3 grid gap-2">{solutions.map(([_, title]) => <button key={title} type="button" onClick={() => { setBotRequirement(title); setBotStep(3); }} className="rounded-xl border border-white/8 bg-white/[.025] px-3 py-2.5 text-left text-[10px] font-bold text-slate-200 hover:border-cyan-300/30">{title}</button>)}</div></>}



                  {botStep === 3 && <><div className="mt-3 max-w-[92%] rounded-2xl rounded-tl-md bg-white/[.05] px-3 py-2.5 text-[11px] leading-5 text-slate-200">Please share your details and our team will contact you.</div><div className="mt-3 grid gap-2"><input value={botName} onChange={e => setBotName(e.target.value)} placeholder="Your Name" className="h-10 rounded-xl border border-white/10 bg-[#091322] px-3 text-[10px] text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/40"/><input value={botPhone} onChange={e => setBotPhone(e.target.value)} placeholder="Mobile Number" type="tel" className="h-10 rounded-xl border border-white/10 bg-[#091322] px-3 text-[10px] text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/40"/><button type="button" disabled={botSending || !botName.trim() || !botPhone.trim()} onClick={handleBotSubmit} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-cyan-300 text-[10px] font-extrabold text-[#04101a] disabled:opacity-40">{botSending ? "Sending..." : "Send Enquiry"}{!botSending && <ArrowRight size={14}/>}</button></div></>}



                </>}



              </div>



              <div className="border-t border-white/8 px-4 py-2 text-center text-[8px] text-slate-600">Gitvisha · Infinite Trust, Secure Peace</div>



          </motion.div>}



        </AnimatePresence>



        <motion.button whileTap={{ scale: .94 }} whileHover={{ scale: 1.04 }} type="button" onClick={() => { if (botOpen) resetBot(); else setBotOpen(true); }} className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full border border-cyan-200/20 bg-cyan-300 text-[#04101a] shadow-[0_12px_35px_rgba(84,213,255,.3)]">{botOpen ? <X size={21}/> : <MessageCircle size={22}/>}</motion.button>



      </div>



    </div>



  );



}







export default App;
