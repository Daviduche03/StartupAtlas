import { Startup } from './types';
import { additionalStartups } from './data/additional-startups';

export const startups: Startup[] = [
  {
    id: 1,
    name: "Flutterwave",
    logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60",
    description: "A payment technology company providing payment infrastructure for global merchants and payment service providers across Africa.",
    industry: "Fintech",
    founded: 2016,
    location: "Lagos",
    website: "https://flutterwave.com",
    funding: "$250M+",
    employees: "500+",
    founders: ["Olugbenga Agboola", "Iyinoluwa Aboyeji"],
    socialLinks: {
      twitter: "https://twitter.com/theflutterwave",
      linkedin: "https://linkedin.com/company/flutterwave"
    },
    highlights: [
      "Processed over $16B in transactions",
      "Present in 50+ African countries",
      "Valued at over $3B"
    ],
    valuation: "$3B",
    investors: ["Y Combinator", "Greycroft", "Visa"]
  },
  {
    id: 2,
    name: "Paystack",
    logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60",
    description: "Modern online and offline payments for Africa, providing businesses with powerful tools to accept payments and make payouts.",
    industry: "Fintech",
    founded: 2015,
    location: "Lagos",
    website: "https://paystack.com",
    funding: "$200M+",
    employees: "300+",
    founders: ["Shola Akinlade", "Ezra Olubi"],
    socialLinks: {
      twitter: "https://twitter.com/paystack",
      linkedin: "https://linkedin.com/company/paystack"
    },
    highlights: [
      "Acquired by Stripe for $200M+",
      "Processing payments for 60,000+ businesses",
      "Expanded to multiple African countries"
    ],
    valuation: "$1B",
    investors: ["Stripe", "Visa", "Y Combinator"]
  },
  {
    id: 3,
    name: "Andela",
    logo: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60",
    description: "A technology company that specializes in training software developers and connecting them with employers around the world.",
    industry: "EdTech",
    founded: 2014,
    location: "Lagos",
    website: "https://andela.com",
    funding: "$381M",
    employees: "1000+",
    founders: ["Jeremy Johnson", "Christina Sass", "Iyinoluwa Aboyeji", "Brice Nkengsa"],
    socialLinks: {
      twitter: "https://twitter.com/andela",
      linkedin: "https://linkedin.com/company/andela"
    },
    highlights: [
      "Valued at $1.5B+",
      "Present in 100+ countries",
      "Trained 100,000+ software engineers"
    ],
    valuation: "$1.5B",
    investors: ["Chan Zuckerberg Initiative", "GV", "Spark Capital"]
  },
  ...additionalStartups
];