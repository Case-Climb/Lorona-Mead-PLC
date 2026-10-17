export const SITE = {
  name: "Lorona Mead, PLC",
  legalName: "Jess A. Lorona, Inc.",
  attorney: "Jess A. Lorona",
  phone: "(602) 385-6818",
  phoneRaw: "6023856818",
  email: "jess@loronamead.com",
  address: "One Renaissance Tower, 2 N. Central Ave., Suite 1800, Phoenix, Arizona 85004",
  domain: "www.loronameadpllc.com",
  rating: "5.0",
  reviewCount: "127",
  hours: [
    { day: "Monday", time: "8:00 AM - 6:00 PM" },
    { day: "Tuesday", time: "8:00 AM - 6:00 PM" },
    { day: "Wednesday", time: "8:00 AM - 6:00 PM" },
    { day: "Thursday", time: "8:00 AM - 6:00 PM" },
    { day: "Friday", time: "8:00 AM - 6:00 PM" },
    { day: "Saturday", time: "By Appointment" },
    { day: "Sunday", time: "Closed" },
  ],
};

export type PracticeArea = {
  slug: string;
  title: string;
  shortTitle: string;
  blurb: string;
  image: string;
  subAreas: string[];
  intro: string;
  whatWeHandle: string[];
  faqs: { q: string; a: string }[];
};

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    slug: "dui",
    title: "DUI Defense",
    shortTitle: "DUI",
    blurb: "Aggressive defense against DUI charges, including extreme DUI, aggravated DUI, and DUI with injury. Protect your license and your freedom.",
    image: "/manus-storage/practice-dui_7e0fe143.jpg",
    subAreas: ["First-Offense DUI", "Extreme DUI", "Aggravated DUI", "DUI with Injury", "Underage DUI", "Commercial DUI", "DUI Drug Impairment", "License Suspension Hearings"],
    intro: "A DUI charge in Arizona carries severe consequences that can impact your driving privileges, your career, and your freedom. Arizona has some of the toughest DUI laws in the nation, with mandatory minimum sentences that judges must impose. Whether you are facing a first-offense DUI or an aggravated felony DUI, having an experienced criminal defense attorney can make the difference between a conviction and a favorable outcome. Jess A. Lorona has defended hundreds of DUI cases and understands the science, the law, and the procedures that prosecutors must follow. From challenging field sobriety tests to questioning breathalyzer calibration records, every detail matters in a DUI defense.",
    whatWeHandle: [
      "First-offense misdemeanor DUI",
      "Extreme DUI (BAC above 0.15)",
      "Super extreme DUI (BAC above 0.20)",
      "Aggravated DUI (felony charges)",
      "DUI with injury or endangerment",
      "Underage drinking and driving",
      "Commercial driver's license DUI",
      "Drug impairment DUI (prescription and illegal)",
      "MVD license suspension hearings",
      "Ignition interlock requirements",
    ],
    faqs: [
      { q: "What is the legal BAC limit in Arizona?", a: "The legal limit is 0.08 for most drivers. For commercial drivers, it is 0.04. For drivers under 21, Arizona has a zero-tolerance policy, meaning any detectable alcohol can result in charges." },
      { q: "Will I lose my license after a DUI arrest?", a: "Your license may be suspended, but you have only 15 days from the date of arrest to request an MVD hearing. We can help you request this hearing and potentially prevent or reduce the suspension." },
      { q: "What is the difference between extreme DUI and aggravated DUI?", a: "Extreme DUI involves a BAC of 0.15 or higher. Aggravated DUI is a felony charge that applies when you have a prior DUI, were driving with a suspended license, or had a child under 15 in the vehicle." },
      { q: "Can a DUI charge be reduced or dismissed?", a: "Yes. Depending on the circumstances, we may challenge the traffic stop, field sobriety tests, breathalyzer results, or blood test procedures. If law enforcement made errors, evidence may be suppressed." },
      { q: "Do I need an attorney for a first-offense DUI?", a: "Even a first-offense DUI carries mandatory minimum jail time, fines, license suspension, and an ignition interlock requirement. An attorney can fight for reduced charges, alternative sentencing, or dismissal." },
      { q: "How much does a DUI defense cost?", a: "The cost depends on the complexity of your case. We offer free consultations to discuss your situation and provide transparent fee structures. Call us at (602) 385-6818 to discuss your case." },
    ],
  },
  {
    slug: "drug-charges",
    title: "Drug Charges",
    shortTitle: "Drug Charges",
    blurb: "Defense against drug possession, distribution, manufacturing, and trafficking charges at both state and federal levels. Protect your rights and your future.",
    image: "/manus-storage/practice-drug-charges_921382d6.jpg",
    subAreas: ["Drug Possession", "Drug Distribution", "Drug Manufacturing", "Drug Trafficking", "Prescription Drug Fraud", "Marijuana Charges", "Paraphernalia Charges", "Federal Drug Crimes"],
    intro: "Drug charges in Arizona range from simple possession to serious trafficking felonies, and the penalties escalate quickly with each degree of severity. Arizona law enforcement aggressively prosecutes drug offenses, and convictions can result in lengthy prison sentences, substantial fines, and a permanent criminal record. Jess A. Lorona has extensive experience defending clients against all types of drug charges. We examine every aspect of the case, from the legality of the search and seizure to the chain of custody of evidence. If law enforcement violated your constitutional rights during the investigation, we will fight to have the evidence suppressed and the charges reduced or dismissed.",
    whatWeHandle: [
      "Possession of dangerous drugs",
      "Possession of narcotic drugs",
      "Drug distribution and sales",
      "Drug manufacturing charges",
      "Drug trafficking (state and federal)",
      "Prescription drug fraud",
      "Marijuana possession and sales",
      "Drug paraphernalia charges",
      "Conspiracy to distribute",
      "Federal drug conspiracy cases",
    ],
    faqs: [
      { q: "What are the penalties for drug possession in Arizona?", a: "Penalties vary by drug type and quantity. Possession of dangerous drugs can be a Class 4 felony, carrying up to 3.75 years in prison for a first offense. Narcotic drug possession can carry even harsher penalties." },
      { q: "Can drug charges be expunged in Arizona?", a: "Arizona does not have traditional expungement, but you may be eligible for a set-aside judgment, which can help with employment and housing. We can evaluate your eligibility during a consultation." },
      { q: "What is the difference between possession and possession for sale?", a: "Possession for sale is a much more serious charge. Prosecutors look at factors like quantity, packaging, scales, cash, and communications to prove intent to sell. We challenge these factors aggressively." },
      { q: "Can I get drug court instead of prison?", a: "Drug court may be available for certain non-violent drug offenders. It involves treatment, supervision, and regular court appearances. Successful completion can result in reduced or dismissed charges." },
      { q: "What if the search was illegal?", a: "If law enforcement conducted an unlawful search or seizure, we can file a motion to suppress the evidence. If granted, the prosecution may be unable to proceed with the charges." },
      { q: "Should I talk to the police without an attorney?", a: "No. You have the right to remain silent and the right to an attorney. Exercise both. Anything you say can and will be used against you. Call us before speaking with law enforcement." },
    ],
  },
  {
    slug: "assault-domestic-violence",
    title: "Assault & Domestic Violence",
    shortTitle: "Assault & DV",
    blurb: "Strategic defense against assault, aggravated assault, domestic violence, and restraining order violations. Protect your reputation and your relationships.",
    image: "/manus-storage/practice-assault_cc3b97da.jpg",
    subAreas: ["Simple Assault", "Aggravated Assault", "Domestic Violence", "Restraining Orders", "Endangerment", "Threatening/Intimidation", "Child Abuse", "Violation of Order of Protection"],
    intro: "Assault and domestic violence charges carry consequences that extend far beyond the courtroom. A conviction can result in jail or prison time, mandatory counseling, loss of firearm rights, and a permanent criminal record that affects employment and housing. Domestic violence charges can also impact child custody and immigration status. Jess A. Lorona understands the sensitive nature of these cases and provides aggressive yet discreet defense. We investigate the circumstances thoroughly, including self-defense claims, false allegations, and lack of evidence. In domestic violence cases, we also work to address any restraining orders or orders of protection that may have been issued.",
    whatWeHandle: [
      "Simple assault (Class 3 misdemeanor to Class 1 misdemeanor)",
      "Aggravated assault (felony charges)",
      "Domestic violence charges",
      "Order of protection violations",
      "Endangerment charges",
      "Threatening and intimidating",
      "Disorderly conduct with weapons",
      "Child abuse and endangerment",
      "Self-defense claims",
      "False allegation defense",
    ],
    faqs: [
      { q: "What counts as domestic violence in Arizona?", a: "Domestic violence includes any act of assault, threat, intimidation, or harassment against a family or household member. This includes spouses, former spouses, relatives, co-parents, and romantic partners." },
      { q: "Can domestic violence charges be dropped?", a: "Even if the alleged victim wants to drop charges, the prosecutor may proceed. However, we can work with the alleged victim's wishes and present evidence that may lead to reduced or dismissed charges." },
      { q: "What is aggravated assault?", a: "Aggravated assault is a felony that involves serious physical injury, use of a deadly weapon, assault on a police officer, or assault resulting in temporary but substantial disfigurement. Penalties are severe." },
      { q: "Can I claim self-defense?", a: "Yes. Arizona law allows the use of reasonable force in self-defense. We must prove that you reasonably believed you were in imminent danger and used proportional force to protect yourself." },
      { q: "Will a domestic violence conviction affect my gun rights?", a: "Yes. A domestic violence conviction will result in the loss of your right to possess firearms under federal law. This is one of many reasons to fight these charges aggressively." },
      { q: "What should I do if an order of protection is filed against me?", a: "Do not contact the person who filed the order. Contact an attorney immediately. We can help you request a hearing to contest the order and present your side of the story." },
    ],
  },
  {
    slug: "theft-white-collar",
    title: "Theft & White Collar Crimes",
    shortTitle: "Theft & White Collar",
    blurb: "Defense against theft, fraud, embezzlement, identity theft, and corporate crime charges. Strategic representation for complex financial cases.",
    image: "/manus-storage/practice-theft_1ecd4fa3.jpg",
    subAreas: ["Theft", "Burglary", "Robbery", "Fraud", "Embezzlement", "Identity Theft", "Forgery", "Corporate Crime", "Money Laundering", "Computer Crimes"],
    intro: "Theft and white collar crime charges can destroy your professional reputation and result in significant prison time, restitution, and a permanent felony record. These cases often involve complex financial evidence, digital forensics, and extensive documentation. Jess A. Lorona has the experience and resources to handle complex white collar defense cases. We work with forensic accountants and digital experts when necessary to challenge the prosecution's evidence. Whether you are facing misdemeanor shoplifting or felony embezzlement, we build a defense strategy tailored to the specific circumstances of your case.",
    whatWeHandle: [
      "Petty theft and shoplifting",
      "Grand theft and felony theft",
      "Burglary (residential and commercial)",
      "Robbery and armed robbery",
      "Fraud and deceptive practices",
      "Embezzlement and employee theft",
      "Identity theft",
      "Forgery and counterfeiting",
      "Money laundering",
      "Computer and cyber crimes",
      "Corporate and business fraud",
    ],
    faqs: [
      { q: "What is the difference between theft and robbery?", a: "Theft involves taking someone's property without their knowledge or consent. Robbery involves taking property by force or threat of force. Robbery is always a felony and carries much harsher penalties." },
      { q: "What is embezzlement?", a: "Embezzlement is the fraudulent taking of property by someone who was entrusted with it, such as an employee taking company funds. It is typically charged as a felony based on the amount involved." },
      { q: "Can white collar crime charges be federal?", a: "Yes. Many white collar crimes, such as wire fraud, mail fraud, and securities fraud, are prosecuted in federal court. Federal cases carry different sentencing guidelines and require specialized defense." },
      { q: "Will I have to pay restitution?", a: "If convicted, the court will likely order restitution to the victim. We can negotiate restitution amounts and payment plans as part of a plea agreement or sentencing." },
      { q: "What if I did not intend to commit a crime?", a: "Intent is a key element in most theft and fraud cases. If you lacked criminal intent, we can argue that the elements of the crime have not been met. This is a common defense in white collar cases." },
      { q: "How early should I contact an attorney?", a: "Contact an attorney as soon as you suspect you are under investigation. Early intervention can sometimes prevent charges from being filed or negotiate a resolution before a case goes to court." },
    ],
  },
  {
    slug: "weapons-charges",
    title: "Weapons Charges",
    shortTitle: "Weapons",
    blurb: "Defense against weapons charges, including illegal possession, trafficking, and prohibited possessor violations. Protect your Second Amendment rights.",
    image: "/manus-storage/practice-weapons_cf25bcaa.jpg",
    subAreas: ["Illegal Possession", "Prohibited Possessor", "Weapons Trafficking", "Concealed Carry Violations", "Using a Weapon in a Crime", "Unlawful Discharge", "Weapons at Schools", "Federal Weapons Charges"],
    intro: "Weapons charges in Arizona can be filed at both the state and federal level, and the penalties are severe. A conviction can result in prison time, loss of firearm rights, and a permanent criminal record. Arizona has specific laws regarding who can possess firearms, where they can be carried, and how they can be used. Jess A. Lorona defends clients against all types of weapons charges, from illegal possession to weapons trafficking. We examine the circumstances of the arrest, the legality of the search, and whether your constitutional rights were violated. If you are a prohibited possessor due to a prior conviction, we can also discuss options for restoring your rights.",
    whatWeHandle: [
      "Illegal possession of a weapon",
      "Prohibited possessor charges",
      "Weapons trafficking and sales",
      "Concealed carry violations",
      "Use of a weapon during a crime",
      "Unlawful discharge of a firearm",
      "Weapons on school grounds",
      "Federal firearms charges",
      "NFA weapon violations",
      "Restoration of gun rights",
    ],
    faqs: [
      { q: "Who is a prohibited possessor in Arizona?", a: "A prohibited possessor is someone who is legally barred from owning firearms, including convicted felons, individuals with certain mental health adjudications, and those subject to certain court orders." },
      { q: "Can I carry a concealed weapon in Arizona?", a: "Arizona is a constitutional carry state, meaning adults 21 and older can carry concealed without a permit. However, there are restrictions on where you can carry and who can carry." },
      { q: "What are the penalties for using a weapon during a crime?", a: "Using or displaying a deadly weapon during the commission of a crime elevates the severity of the charge and can add mandatory prison time. This is one of the most serious weapons-related charges." },
      { q: "Can federal weapons charges be filed alongside state charges?", a: "Yes. Certain weapons violations, such as possession of an unregistered NFA weapon or trafficking, can be prosecuted federally. Federal sentencing guidelines are typically more severe." },
      { q: "Can I get my gun rights restored?", a: "In some cases, yes. If your rights were lost due to a conviction, you may be eligible to have them restored through a set-aside or restoration process. We can evaluate your eligibility." },
      { q: "What if the weapon was found during an illegal search?", a: "If the weapon was discovered during an unlawful search or seizure, we can file a motion to suppress the evidence. If granted, the prosecution may not be able to use the weapon as evidence." },
    ],
  },
  {
    slug: "expungements",
    title: "Expungements / Set-Asides",
    shortTitle: "Expungements",
    blurb: "Clear your criminal record through set-asides and rights restoration. Move forward without the burden of a past conviction affecting your future.",
    image: "/manus-storage/practice-expungements_71ae2a57.jpg",
    subAreas: ["Set-Aside Judgments", "Rights Restoration", "Record Sealing", "Misdemeanor Set-Aside", "Felony Set-Aside", "Firearm Rights Restoration", "Civil Rights Restoration", "DUI Set-Aside"],
    intro: "Arizona does not have a traditional expungement process, but it does offer set-aside judgments and rights restoration that can significantly improve your ability to move forward after a criminal conviction. A set-aside judgment dismisses the conviction and can help with employment, housing, and professional licensing. If you have completed your sentence, including probation and restitution, you may be eligible. Jess A. Lorona helps clients navigate the set-aside process, file the necessary motions, and present their case to the court. We also assist with restoration of civil rights and firearm rights for those who have lost them due to a conviction.",
    whatWeHandle: [
      "Set-aside judgment motions",
      "Misdemeanor conviction set-asides",
      "Felony conviction set-asides",
      "Restoration of civil rights",
      "Restoration of firearm rights",
      "DUI conviction set-asides",
      "Record sealing for certain offenses",
      "Certificate of second chance",
      "Application for pardon",
      "Post-conviction relief",
    ],
    faqs: [
      { q: "What is a set-aside judgment in Arizona?", a: "A set-aside judgment is a court order that dismisses the charges after you have completed your sentence. It does not erase the conviction from your record, but it shows that the court has set it aside." },
      { q: "Who is eligible for a set-aside?", a: "Most individuals who have completed their sentence, including probation and restitution, are eligible. However, certain offenses, such as sexual offenses and dangerous crimes against children, are excluded." },
      { q: "Does a set-aside remove the conviction from my record?", a: "No, the conviction remains on your record but is marked as set aside. However, it signals to employers and others that the court has determined you have been rehabilitated." },
      { q: "Can I restore my firearm rights after a conviction?", a: "Yes, in many cases. If you lost your firearm rights due to a felony conviction, you may be eligible to have them restored through a separate legal process. We can evaluate your situation." },
      { q: "How long does the set-aside process take?", a: "The timeline varies depending on the court and the complexity of your case. Typically, it takes 2 to 6 months from filing to the court's decision. We can provide a more specific estimate during your consultation." },
      { q: "Will a set-aside help with employment?", a: "Yes. Many employers view a set-aside favorably, and it allows you to legally state that you have not been convicted of a crime in many contexts. It can significantly improve your job prospects." },
    ],
  },
];

export type Location = {
  slug: string;
  city: string;
  county: string;
  blurb: string;
  courthouse: string;
  courthouseAddress: string;
};

export const LOCATIONS: Location[] = [
  {
    slug: "phoenix",
    city: "Phoenix",
    county: "Maricopa County",
    blurb: "As the largest city in Arizona and the state capital, Phoenix is home to the Maricopa County Superior Court, one of the busiest court systems in the nation. Criminal cases in Phoenix range from misdemeanor DUI to complex felony trials. Jess A. Lorona has practiced in Phoenix courts for decades and knows the local judges, prosecutors, and court procedures. Whether your case is in downtown Phoenix at the Central Court Building or at one of the regional justice courts, we provide experienced, aggressive defense.",
    courthouse: "Maricopa County Superior Court",
    courthouseAddress: "201 W. Jefferson St., Phoenix, AZ 85003",
  },
  {
    slug: "scottsdale",
    city: "Scottsdale",
    county: "Maricopa County",
    blurb: "Scottsdale is known for its vibrant nightlife and tourism, which often leads to DUI, drug, and assault charges. The Scottsdale City Court handles misdemeanor cases, while felony cases are transferred to Maricopa County Superior Court. Jess A. Lorona regularly defends clients in Scottsdale courts and understands the unique dynamics of cases originating in this city. From DUI checkpoints on Scottsdale Road to drug charges in Old Town, we provide strategic defense tailored to the local court system.",
    courthouse: "Scottsdale City Court",
    courthouseAddress: "3700 N. 92nd St., Scottsdale, AZ 85251",
  },
  {
    slug: "mesa",
    city: "Mesa",
    county: "Maricopa County",
    blurb: "Mesa is the third-largest city in Arizona and has its own municipal court for misdemeanor cases. Felony cases are handled by the Maricopa County Superior Court. With a growing population and active law enforcement, Mesa sees a significant number of criminal cases. Jess A. Lorona provides experienced defense for clients facing charges in Mesa courts, from DUI and drug possession to assault and theft.",
    courthouse: "Mesa Municipal Court",
    courthouseAddress: "250 E. 1st Ave., Mesa, AZ 85210",
  },
  {
    slug: "tempe",
    city: "Tempe",
    county: "Maricopa County",
    blurb: "Home to Arizona State University, Tempe has a unique demographic that leads to many college-student-related criminal charges, including underage drinking, DUI, drug possession, and assault. The Tempe Municipal Court handles misdemeanor cases. Jess A. Lorona understands the impact a criminal charge can have on a student's future and works to protect both their legal rights and their educational opportunities.",
    courthouse: "Tempe Municipal Court",
    courthouseAddress: "20 E. 6th St., Tempe, AZ 85281",
  },
];

export const OTHER_CITIES = [
  "Glendale", "Peoria", "Surprise", "Goodyear", "Avondale", "Chandler",
  "Gilbert", "Queen Creek", "Buckeye", "Casa Grande", "Tucson", "Flagstaff",
  "Yuma", "Prescott", "Sedona", "Lake Havasu City",
];

export type Review = {
  author: string;
  text: string;
  date: string;
  rating: number;
};

export const REVIEWS: Review[] = [
  {
    author: "Michael R.",
    text: "Jess Lorona saved my life. I was facing a felony DUI that would have ended my career. He fought every step of the way and got the charges reduced to a misdemeanor. I cannot recommend him enough.",
    date: "2 months ago",
    rating: 5,
  },
  {
    author: "Sarah K.",
    text: "When I was charged with drug possession, I was terrified. Jess walked me through every step, challenged the search, and got my case dismissed. He is the best criminal defense attorney in Phoenix.",
    date: "3 months ago",
    rating: 5,
  },
  {
    author: "David T.",
    text: "Professional, aggressive, and genuinely caring. Jess defended me against domestic violence charges that were completely false. He believed in me and fought for the truth. Case dismissed.",
    date: "4 months ago",
    rating: 5,
  },
  {
    author: "Jennifer M.",
    text: "After a bad arrest, I thought my life was over. Jess got my record set aside and helped me get my life back on track. His knowledge of Arizona law is unmatched.",
    date: "5 months ago",
    rating: 5,
  },
  {
    author: "Robert L.",
    text: "I was facing federal drug trafficking charges. Jess took my case when no one else would. His courtroom skills are incredible. He negotiated a plea that saved me from decades in prison.",
    date: "6 months ago",
    rating: 5,
  },
  {
    author: "Amanda P.",
    text: "From the first phone call, I knew I was in good hands. Jess is honest, direct, and does not make promises he cannot keep. He got my assault charges dropped before trial. Outstanding attorney.",
    date: "7 months ago",
    rating: 5,
  },
];

export type FAQ = {
  q: string;
  a: string;
};

export const HOME_FAQS: FAQ[] = [
  { q: "What should I do if I have been arrested in Arizona?", a: "Remain silent and do not discuss your case with anyone except your attorney. Request a lawyer immediately. Do not consent to any searches or answer questions without legal representation. Call us at (602) 385-6818 as soon as possible." },
  { q: "How much does a criminal defense attorney cost?", a: "The cost depends on the complexity of your case, the severity of the charges, and whether the case goes to trial. We offer free initial consultations and transparent fee structures. Call us to discuss your situation and get a clear understanding of the costs." },
  { q: "Do you handle federal criminal cases?", a: "Yes. Jess A. Lorona is admitted to practice in federal court and has experience defending clients against federal charges, including drug trafficking, weapons charges, and white collar crimes." },
  { q: "What areas of Arizona do you serve?", a: "We serve clients throughout Arizona, with a primary focus on Phoenix and the Maricopa County area. We also handle cases in Scottsdale, Mesa, Tempe, Tucson, and other jurisdictions across the state." },
  { q: "Can you help with an expungement or set-aside?", a: "Yes. Arizona does not have traditional expungement, but we can help you file for a set-aside judgment, which can significantly improve your ability to move forward after a conviction. We also assist with rights restoration." },
  { q: "What if I cannot afford a private attorney?", a: "We understand that legal representation is a significant investment. We offer payment plans in many cases and will discuss all options during your free consultation. The cost of not having quality representation can be far greater." },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Free Consultation",
    description: "Call us for a free, confidential consultation. We will listen to your situation, explain your rights, and discuss your options. No pressure, no judgment.",
  },
  {
    number: "02",
    title: "Case Review & Strategy",
    description: "We conduct a thorough review of the evidence, the charges, and the circumstances. We develop a defense strategy tailored to your specific case and goals.",
  },
  {
    number: "03",
    title: "Aggressive Defense",
    description: "We fight for you at every stage, from pre-trial motions to trial. We challenge evidence, cross-examine witnesses, and negotiate aggressively with prosecutors.",
  },
  {
    number: "04",
    title: "Resolution",
    description: "Whether through dismissal, reduced charges, or trial verdict, we pursue the best possible outcome. We also help with post-conviction relief and set-asides.",
  },
];

export const TRUST_BADGES = [
  "Free Consultation",
  "Available 24/7",
  "Former Prosecutor Insight",
  "Thousands of Cases Handled",
];
