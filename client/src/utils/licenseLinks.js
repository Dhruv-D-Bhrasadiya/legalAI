/**
 * Mapping of common Indian business licenses and compliances to their official registration/application portals
 */

const licenseMapping = {
  // Telemedicine & Healthcare
  "Telemedicine License": {
    url: "https://esanjeevani.mohfw.gov.in/",
    title: "e-Sanjeevani - Registered Medical Practitioner License",
    description: "Registration for telemedicine practice through Ministry of Health and Family Welfare"
  },
  "Registered Medical Practitioner License": {
    url: "https://www.nmc.org.in/",
    title: "National Medical Commission - Doctor Registration",
    description: "Register as a qualified medical practitioner with NMC"
  },
  "Medical Practice License": {
    url: "https://www.nmc.org.in/",
    title: "NMC - Medical Practice Registration",
    description: "License to practice medicine in India"
  },
  "Health Insurance": {
    url: "https://www.irdai.gov.in/",
    title: "IRDAI - Insurance Regulatory Authority",
    description: "Insurance license and compliance requirements"
  },

  // E-commerce & Payment
  "GST Registration": {
    url: "https://www.gst.gov.in/",
    title: "GST Portal - Goods and Services Tax Registration",
    description: "Register for GST, mandatory for businesses with annual turnover above certain limits"
  },
  "Payment Gateway License": {
    url: "https://www.rbi.org.in/",
    title: "RBI - Payments Regulation",
    description: "Reserve Bank of India guidelines for payment processing"
  },
  "E-commerce Registration": {
    url: "https://www.gst.gov.in/",
    title: "GST Portal",
    description: "Business registration and compliance for e-commerce operations"
  },

  // Financial Services
  "NBFC License": {
    url: "https://www.rbi.org.in/",
    title: "RBI - Non-Banking Financial Company Registration",
    description: "License for non-banking financial institutions"
  },
  "Fintech License": {
    url: "https://www.rbi.org.in/",
    title: "RBI - Payment Service Provider Registration",
    description: "License for fintech and payment service providers"
  },
  "Digital Lending License": {
    url: "https://www.rbi.org.in/",
    title: "RBI - Lending Regulations",
    description: "Compliance requirements for digital lending platforms"
  },

  // Food & Beverage
  "Food License": {
    url: "https://fssai.gov.in/",
    title: "FSSAI - Food Safety and Standards Authority of India",
    description: "License for food business operations"
  },
  "FSSAI Registration": {
    url: "https://fssai.gov.in/",
    title: "FSSAI",
    description: "Food safety and hygiene compliance"
  },
  "Cloud Kitchen License": {
    url: "https://fssai.gov.in/",
    title: "FSSAI - Food Business Operator License",
    description: "License for cloud kitchens and delivery food businesses"
  },

  // Data & Privacy
  "Data Protection Compliance": {
    url: "https://www.meity.gov.in/",
    title: "Ministry of Electronics and Information Technology",
    description: "Data protection and IT Act compliance"
  },
  "Privacy Policy": {
    url: "https://www.meity.gov.in/",
    title: "MEITY - Data Protection Guidelines",
    description: "Personal data protection compliance"
  },

  // General Business
  "Business Registration": {
    url: "https://www.cci.gov.in/",
    title: "CCI - Business Registration",
    description: "General business registration and compliance"
  },
  "Company Registration": {
    url: "https://www.mca.gov.in/",
    title: "MCA - Ministry of Corporate Affairs",
    description: "Company registration under Companies Act"
  },
  "Partnership Registration": {
    url: "https://www.mca.gov.in/",
    title: "MCA - Partnership Registration",
    description: "Register your business partnership"
  },
  "Proprietorship Registration": {
    url: "https://www.mca.gov.in/",
    title: "MCA - Business Registration",
    description: "Register as a sole proprietor"
  },

  // Labor & Compliance
  "Labor Compliance": {
    url: "https://labourcode.gov.in/",
    title: "Ministry of Labour - Labor Code Compliance",
    description: "Employee wages, safety, and labor standards"
  },
  "PF Registration": {
    url: "https://www.epfo.gov.in/",
    title: "EPFO - Employee Provident Fund",
    description: "Register for employee provident fund deductions"
  },
  "ESI Registration": {
    url: "https://esic.gov.in/",
    title: "ESIC - Employees State Insurance",
    description: "Employee safety and health insurance registration"
  },

  // Professional & Licenses
  "CA License": {
    url: "https://www.icai.org/",
    title: "ICAI - Chartered Accountants",
    description: "Professional accounting qualification and registration"
  },
  "Lawyer Registration": {
    url: "https://www.barcouncil.org.in/",
    title: "Bar Council of India",
    description: "Legal professional registration"
  },

  // Environmental
  "Environmental Clearance": {
    url: "https://www.moefcc.gov.in/",
    title: "Ministry of Environment - Environmental Clearance",
    description: "Environmental impact assessment and clearance"
  },
  "Pollution Control": {
    url: "https://www.moefcc.gov.in/",
    title: "Pollution Control Board",
    description: "Pollution control and environmental compliance"
  },

  // Automobile & Transport
  "Vehicle Registration": {
    url: "https://vahan.parivahan.gov.in/",
    title: "Vahan - Vehicle Registration System",
    description: "Commercial vehicle registration"
  },
  "Transport License": {
    url: "https://sarthi.parivahan.gov.in/",
    title: "Transport Commissioner",
    description: "Commercial transport license"
  },

  // Aadhaar & KYC
  "Aadhaar KYC": {
    url: "https://uidai.gov.in/",
    title: "UIDAI - Aadhaar Registration",
    description: "Aadhaar-based KYC compliance"
  },
  "KYC Compliance": {
    url: "https://www.rbi.org.in/",
    title: "RBI - KYC Guidelines",
    description: "Know Your Customer compliance requirements"
  },

  // Social Security License
  "Social Security Code": {
    url: "https://www.mca.gov.in/",
    title: "Social Security Code Compliance",
    description: "Employee social security benefits and compliance"
  }
};

/**
 * Get license URL by license name (case-insensitive, partial matching)
 */
export const getLicenseInfo = (licenseName) => {
  if (!licenseName) return null;

  // Try exact match first
  if (licenseMapping[licenseName]) {
    return licenseMapping[licenseName];
  }

  // Try case-insensitive search
  const lowerName = licenseName.toLowerCase();
  const matchedKey = Object.keys(licenseMapping).find(key =>
    key.toLowerCase().includes(lowerName) || lowerName.includes(key.toLowerCase())
  );

  return matchedKey ? licenseMapping[matchedKey] : null;
};

/**
 * Get all available licenses
 */
export const getAllLicenses = () => licenseMapping;

export default licenseMapping;
