import { faker } from '@faker-js/faker';

const createProperty = () => ({
  id: faker.string.uuid(),
  code: `PROP-${faker.number.int({ min: 1000, max: 9999 })}`,
  developer: faker.company.name(),
  project: faker.commerce.productName(),
  location: `${faker.location.city()}`,
  country: faker.location.country(),
  price: faker.finance.amount({ min: 100000, max: 1000000, dec: 0 }),
  internalCost: faker.finance.amount({ min: 80000, max: 700000, dec: 0 }),
  commission: faker.finance.amount({ min: 5000, max: 50000, dec: 0 }),
  area: faker.number.int({ min: 80, max: 500 }),
  type: faker.helpers.arrayElement(['Villa', 'Apartment', 'Townhouse', 'Penthouse']),
  status: faker.helpers.arrayElement(['Available', 'Booked', 'Sold']),
  imageUrl: `https://picsum.photos/seed/${faker.string.alphanumeric(10)}/400/300`,
  gallery: Array.from({ length: 5 }, () => `https://picsum.photos/seed/${faker.string.alphanumeric(10)}/800/600`),
  floorPlanUrl: `https://picsum.photos/seed/${faker.string.alphanumeric(10)}/800/600`,
  description: faker.lorem.paragraphs(3),
  bedrooms: faker.number.int({ min: 1, max: 6 }),
  bathrooms: faker.number.int({ min: 1, max: 5 }),
  featured: faker.datatype.boolean(),
  amenities: faker.helpers.arrayElements(['Swimming Pool', 'Gym', 'Parking', 'Security', 'Balcony', 'Garden'], faker.number.int({ min: 2, max: 5 })),
});

const createDeveloper = () => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    logoUrl: `https://logo.clearbit.com/${faker.internet.domainName().split('.')[0]}.com`,
    description: faker.lorem.paragraph(),
    projectsCount: faker.number.int({ min: 5, max: 50 }),
});

const createTestimonial = () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    location: faker.location.city(),
    avatarUrl: `https://i.pravatar.cc/100?u=${faker.string.uuid()}`,
    quote: faker.lorem.paragraph(),
});


const createLead = (properties) => ({
  id: faker.string.uuid(),
  leadId: `LEAD-${faker.number.int({ min: 1000, max: 9999 })}`,
  buyerName: faker.person.fullName(),
  contact: faker.phone.number(),
  email: faker.internet.email(),
  propertyPreference: faker.helpers.arrayElement(properties).id,
  salesperson: faker.person.firstName(),
  date: faker.date.past({ years: 1 }),
  remarks: faker.lorem.sentence(),
  status: faker.helpers.arrayElement(['New', 'Contacted', 'Qualified', 'Lost']),
});

export const properties = Array.from({ length: 50 }, createProperty);
export const developers = Array.from({ length: 12 }, createDeveloper);
export const testimonials = Array.from({ length: 6 }, createTestimonial);
export const leads = Array.from({ length: 20 }, () => createLead(properties));
export const deals = Array.from({ length: 15 }, () => ({
    id: faker.string.uuid(),
    dealId: `DEAL-${faker.number.int({ min: 1000, max: 9999 })}`,
    buyer: faker.helpers.arrayElement(leads).buyerName,
    property: faker.helpers.arrayElement(properties).code,
    price: faker.finance.amount({ min: 100000, max: 1000000, dec: 0 }),
    initialPayment: faker.finance.amount({ min: 10000, max: 100000, dec: 0 }),
    startDate: faker.date.past({ years: 1 }),
    endDate: faker.date.future({ years: 3 }),
    salesperson: faker.person.firstName(),
    status: faker.helpers.arrayElement(['Pending', 'Confirmed', 'Completed', 'Cancelled']),
}));

export const payments = Array.from({ length: 30 }, () => ({
    id: faker.string.uuid(),
    paymentId: `PAY-${faker.number.int({ min: 1000, max: 9999 })}`,
    buyer: faker.helpers.arrayElement(deals).buyer,
    dealId: faker.helpers.arrayElement(deals).dealId,
    property: faker.helpers.arrayElement(properties).code,
    date: faker.date.recent({ days: 365 }),
    amount: faker.finance.amount({ min: 1000, max: 20000, dec: 0 }),
    mode: faker.helpers.arrayElement(['Cash', 'Bank Transfer', 'Online']),
    remaining: faker.finance.amount({ min: 0, max: 500000, dec: 0 }),
    status: faker.helpers.arrayElement(['Paid', 'Pending', 'Overdue']),
}));

export const users = [
    { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'Active' },
    { id: '2', name: 'Sales Person', email: 'sales@example.com', role: 'Sales', status: 'Active' },
    { id: '3', name: 'Finance Team', email: 'finance@example.com', role: 'Finance', status: 'Inactive' },
];
