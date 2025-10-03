import { Person } from '@/types';

const firstNames = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth',
  'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen',
  'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra',
  'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
  'Kenneth', 'Carol', 'Kevin', 'Amanda', 'Brian', 'Dorothy', 'George', 'Melissa', 'Timothy', 'Deborah',
  'Ronald', 'Stephanie', 'Edward', 'Rebecca', 'Jason', 'Sharon', 'Jeffrey', 'Laura', 'Ryan', 'Cynthia',
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
];

const schools = [
  'Harvard University',
  'Stanford University',
  'MIT',
  'Yale University',
  'Princeton University',
  'Columbia University',
  'University of California Berkeley',
  'University of Oxford',
  'Cambridge University',
  'University of Chicago',
  'Cornell University',
  'University of Pennsylvania',
  'Johns Hopkins University',
  'Northwestern University',
  'Duke University',
  'University of Michigan',
  'New York University',
  'UCLA',
  'University of Toronto',
  'ETH Zurich',
];

const professions = [
  'Software Engineer',
  'Data Scientist',
  'Product Manager',
  'UX Designer',
  'Marketing Manager',
  'Sales Executive',
  'Financial Analyst',
  'Accountant',
  'Lawyer',
  'Doctor',
  'Nurse',
  'Teacher',
  'Professor',
  'Researcher',
  'Consultant',
  'Architect',
  'Civil Engineer',
  'Mechanical Engineer',
  'Electrical Engineer',
  'Graphic Designer',
  'Content Writer',
  'Journalist',
  'Photographer',
  'Artist',
  'Musician',
  'Chef',
  'Restaurant Manager',
  'Real Estate Agent',
  'HR Manager',
  'Business Analyst',
];

const meetingStories = [
  'Met at a coffee shop in downtown',
  'College roommates freshman year',
  'Worked together on a startup project',
  'Met through mutual friends at a party',
  'Neighbors in the same apartment building',
  'Met at a tech conference in San Francisco',
  'Introduced by a colleague at work',
  'Met during a hiking trip',
  'Childhood friends from elementary school',
  'Met at a coding bootcamp',
  'Gym buddies who met during morning workouts',
  'Met volunteering at a local charity',
  'Travel companions on a backpacking trip',
  'Met at a book club meeting',
  'Former classmates from business school',
  'Met at a music festival',
  'Teammates on a recreational sports league',
  'Met at a wedding of a mutual friend',
  'Co-workers from previous company',
  'Met at a professional networking event',
  'Study group partners in university',
  'Met through an online gaming community',
  'Introduced by family members',
  'Met at yoga class',
  'Connected through LinkedIn',
];

const professionTexts = [
  'Works on machine learning models',
  'Specializes in cloud infrastructure',
  'Focuses on user experience research',
  'Manages cross-functional teams',
  'Develops mobile applications',
  'Creates brand strategies',
  'Analyzes market trends',
  'Provides legal consultation',
  'Treats patients in emergency medicine',
  'Teaches mathematics to high school students',
  'Conducts research in biotechnology',
  'Designs sustainable buildings',
  'Writes articles about technology',
  'Creates digital illustrations',
  'Performs in jazz bands',
  'Specializes in Italian cuisine',
  'Manages commercial properties',
  'Recruits for tech companies',
  'Optimizes business processes',
  'Develops embedded systems',
];

function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomElements<T>(array: T[], min: number, max: number): T[] {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateEmail(firstName: string, lastName: string): string {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
  const formats = [
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}${lastName.charAt(0).toLowerCase()}`,
  ];
  return `${randomElement(formats)}@${randomElement(domains)}`;
}

function generatePhone(): string {
  const area = Math.floor(Math.random() * 900) + 100;
  const first = Math.floor(Math.random() * 900) + 100;
  const second = Math.floor(Math.random() * 9000) + 1000;
  return `+1 (${area}) ${first}-${second}`;
}

const socialPlatforms = ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'TikTok', 'YouTube', 'GitHub', 'Discord'];

export function generateTestContacts(count: number = 100): Person[] {
  const contacts: Person[] = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = randomElement(firstNames);
    const lastName = randomElement(lastNames);
    const name = `${firstName} ${lastName}`;
    
    // Generate contact info (0-3 contacts)
    const contactInfos = [];
    const contactCount = Math.floor(Math.random() * 4);
    for (let j = 0; j < contactCount; j++) {
      if (Math.random() > 0.5) {
        contactInfos.push({
          type: 'email' as const,
          value: generateEmail(firstName, lastName),
        });
      } else {
        contactInfos.push({
          type: 'phone' as const,
          value: generatePhone(),
        });
      }
    }

    // Generate social media (0-3 platforms)
    const socialMedias = [];
    const socialCount = Math.floor(Math.random() * 4);
    const selectedPlatforms = randomElements(socialPlatforms, 0, Math.min(socialCount, 3));
    for (const platform of selectedPlatforms) {
      socialMedias.push({
        platform,
        url: `https://${platform.toLowerCase()}.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      });
    }
    
    const contact: Person = {
      id: `test-${Date.now()}-${i}`,
      name,
      dateOfBirth: randomDate(new Date(1970, 0, 1), new Date(2000, 11, 31)),
      whenWeMet: randomElement(meetingStories),
      school: Math.random() > 0.2 ? randomElement(schools) : undefined,
      professionText: Math.random() > 0.3 ? randomElement(professionTexts) : undefined,
      professions: randomElements(professions, 1, 3),
      contacts: contactInfos,
      socialMedia: socialMedias,
      comments: [],
    };
    
    contacts.push(contact);
  }
  
  return contacts;
}

export const allProfessions = professions;
export const allSchools = schools;

