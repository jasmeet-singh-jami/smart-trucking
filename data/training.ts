import type { Service } from "./services";

export const training: Service[] = [
  {
    slug: "logbook",
    title: "Log Book Training & Auditing",
    shortDescription: "Hours of Service training and log book audit services for drivers.",
    fullDescription:
      "STS Inc offers comprehensive Hours of Service (HOS) training for commercial drivers operating under US DOT and Transport Canada regulations. We also provide log book auditing to identify and correct violations before an audit.",
    bullets: [
      "Classroom training for Hours of Service regulations",
      "On-site HOS training for your drivers",
      "Log book auditing (US & Canada)",
      "Log falsification detection and correction",
      "ELD compliance guidance",
    ],
    icon: "BookOpen",
    relatedSlugs: ["dispatch", "drug-alcohol-supervisor"],
  },
  {
    slug: "dispatch",
    title: "Dispatch Training",
    shortDescription: "Professional dispatcher training covering operations and compliance.",
    fullDescription:
      "This training module teaches dispatchers the soft and hard skills needed to do their job successfully. The program covers load planning, hours of service, driver communication, trip planning, and regulatory compliance.",
    bullets: [
      "Load planning and trip optimization",
      "Hours of Service compliance for dispatchers",
      "Driver communication best practices",
      "Hazmat and dangerous goods awareness",
      "Carrier compliance documentation",
    ],
    icon: "Radio",
    relatedSlugs: ["logbook", "dangerous-goods"],
  },
  {
    slug: "drug-alcohol-supervisor",
    title: "Supervisor Drug & Alcohol Training",
    shortDescription: "DOT-compliant reasonable suspicion training for supervisors.",
    fullDescription:
      "US DOT regulations require supervisors of commercial motor vehicle drivers to receive training on alcohol and controlled substance misuse. STS Inc delivers this mandated training in a classroom or online format.",
    bullets: [
      "DOT-required reasonable suspicion training",
      "Alcohol misuse recognition",
      "Controlled substance symptom identification",
      "Documentation and reporting procedures",
      "Available classroom and online",
    ],
    icon: "ShieldAlert",
    relatedSlugs: ["logbook", "defensive-driving"],
  },
  {
    slug: "dangerous-goods",
    title: "Transportation of Dangerous Goods",
    shortDescription: "TDG certification training for shipping, receiving, and transport.",
    fullDescription:
      "Only personnel with TDG training can transport, receive, or ship dangerous goods under Canadian law. STS Inc provides classroom and on-site TDG training covering all classes of dangerous goods.",
    bullets: [
      "TDG certification for drivers, shippers, receivers",
      "Classification of dangerous goods",
      "Proper documentation and placarding",
      "Emergency response procedures",
      "Classroom and on-site delivery options",
    ],
    icon: "AlertTriangle",
    relatedSlugs: ["dispatch", "logbook"],
  },
  {
    slug: "defensive-driving",
    title: "Defensive Driving",
    shortDescription: "Proven defensive driving program to reduce collisions and injuries.",
    fullDescription:
      "The Defensive Driving Course is an established, proven program designed to produce fewer company-vehicle collisions, less absenteeism due to injuries, and reduced vehicle operating costs. Available for all commercial vehicle operators.",
    bullets: [
      "Collision avoidance techniques",
      "Hazard recognition and response",
      "Winter and adverse weather driving",
      "Reduced insurance premiums (many providers)",
      "Certificate issued upon completion",
    ],
    icon: "Car",
    relatedSlugs: ["drug-alcohol-supervisor", "logbook"],
  },
];
