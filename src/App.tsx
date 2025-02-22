import React, { useState } from 'react';
import { Globe2, MapPin, RefreshCw, User, UserCircle, CreditCard, MessageCircle, Github } from 'lucide-react';

// List of countries with their respective address formats
const countries = [
  { code: 'US', name: 'United States' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'JP', name: 'Japan' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'IE', name: 'Ireland' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'SG', name: 'Singapore' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'BE', name: 'Belgium' },
  { code: 'AT', name: 'Austria' },
  { code: 'PT', name: 'Portugal' }
];

// Sample data for identity generation
const firstNames = [
  'James', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia',
  'Alexander', 'Isabella', 'Ethan', 'Charlotte', 'Michael', 'Amelia',
  'Daniel', 'Mia', 'Matthew', 'Harper', 'Joseph', 'Evelyn',
  'Sofia', 'Lucas', 'Elena', 'Marco', 'Anna', 'Hans', 'Marie', 'Giovanni',
  'Yuki', 'Lars', 'Astrid', 'Henrik', 'Siobhan', 'Oscar', 'Ingrid'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
  'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Rossi', 'Ferrari', 'Muller', 'Schmidt', 'Jensen', 'Nielsen', 'Tanaka',
  'Van Dijk', 'Andersson', 'Murphy', 'O\'Connor', 'Dubois', 'Silva', 'Peeters'
];

const streets = [
  'Maple Avenue', 'Oak Street', 'Pine Road', 'Cedar Lane',
  'Elm Street', 'Birch Road', 'Willow Lane', 'Cherry Street',
  'Via Roma', 'Hauptstrasse', 'Rue de la Paix', 'Calle Mayor',
  'Sakura Street', 'Kerkstraat', 'Drottninggatan', 'Karl Johans Gate',
  'O\'Connell Street', 'Queen Street', 'Bahnhofstrasse', 'Avenue Louise'
];

const cities = {
  US: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas'],
  UK: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Edinburgh', 'Glasgow', 'Cardiff', 'Belfast', 'Leeds'],
  CA: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton', 'Quebec City', 'Winnipeg', 'Halifax'],
  AU: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Newcastle', 'Hobart'],
  FR: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Bordeaux', 'Lille', 'Strasbourg', 'Nantes'],
  DE: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dortmund'],
  IT: ['Rome', 'Milan', 'Naples', 'Turin', 'Florence', 'Venice', 'Bologna', 'Genoa', 'Palermo'],
  ES: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao', 'Malaga', 'Zaragoza', 'Palma', 'Granada'],
  JP: ['Tokyo', 'Osaka', 'Yokohama', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki'],
  NL: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Groningen', 'Tilburg', 'Almere', 'Breda'],
  SE: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Umeå'],
  NO: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen', 'Fredrikstad', 'Tromsø', 'Sandnes', 'Kristiansand'],
  DK: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Frederiksberg', 'Esbjerg', 'Randers', 'Kolding', 'Horsens'],
  IE: ['Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford', 'Drogheda', 'Dundalk', 'Swords', 'Bray'],
  NZ: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga', 'Napier-Hastings', 'Dunedin', 'Palmerston North', 'Nelson'],
  SG: ['Singapore Central', 'Tampines', 'Jurong East', 'Woodlands', 'Punggol', 'Ang Mo Kio', 'Sengkang', 'Yishun', 'Bukit Merah'],
  CH: ['Zurich', 'Geneva', 'Basel', 'Lausanne', 'Bern', 'Winterthur', 'Lucerne', 'St. Gallen', 'Lugano'],
  BE: ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège', 'Bruges', 'Namur', 'Leuven', 'Mons'],
  AT: ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck', 'Klagenfurt', 'Villach', 'Wels', 'Sankt Pölten'],
  PT: ['Lisbon', 'Porto', 'Vila Nova de Gaia', 'Amadora', 'Braga', 'Coimbra', 'Funchal', 'Setúbal', 'Aveiro']
};

// Credit card types with their patterns and details
const cardTypes = [
  { 
    name: 'Visa',
    prefix: ['4'],
    length: 16,
    cvvLength: 3,
    background: 'from-blue-700 to-blue-900',
    logo: '💳'
  },
  { 
    name: 'Mastercard',
    prefix: ['51', '52', '53', '54', '55'],
    length: 16,
    cvvLength: 3,
    background: 'from-red-600 to-orange-600',
    logo: '💳'
  },
  { 
    name: 'American Express',
    prefix: ['34', '37'],
    length: 15,
    cvvLength: 4,
    background: 'from-gray-600 to-gray-800',
    logo: '💳'
  },
  { 
    name: 'Discover',
    prefix: ['6011'],
    length: 16,
    cvvLength: 3,
    background: 'from-orange-500 to-orange-700',
    logo: '💳'
  },
  {
    name: 'Stripe Test',
    prefix: ['555270013'],
    length: 16,
    cvvLength: 3,
    background: 'from-purple-600 to-purple-800',
    logo: '💳'
  }
];

function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function generateLuhnNumber(prefix: string, length: number): string {
  let number = prefix;
  while (number.length < length - 1) {
    number += Math.floor(Math.random() * 10);
  }
  
  let sum = 0;
  let isEven = false;
  
  // Calculate Luhn sum
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  // Calculate check digit
  const checkDigit = (10 - (sum % 10)) % 10;
  return number + checkDigit;
}

function formatCardNumber(number: string): string {
  const chunks = number.match(/.{1,4}/g) || [];
  return chunks.join(' ');
}

function generateExpiryDate(): string {
  const currentDate = new Date();
  const month = generateRandomNumber(1, 12);
  const year = currentDate.getFullYear() + generateRandomNumber(1, 5);
  return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
}

function App() {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [address, setAddress] = useState({
    streetNumber: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'United States'
  });
  const [identity, setIdentity] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    age: 0,
    email: '',
    phone: ''
  });
  const [creditCard, setCreditCard] = useState({
    type: '',
    number: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    background: ''
  });

  const generateIdentity = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const birthDate = generateRandomDate(new Date(1960, 0, 1), new Date(2005, 11, 31));
    const age = new Date().getFullYear() - birthDate.getFullYear();
    
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${generateRandomNumber(1, 999)}@example.com`;
    
    let phone = '';
    switch(selectedCountry) {
      case 'US':
        phone = `+1 (${generateRandomNumber(200, 999)}) ${generateRandomNumber(100, 999)}-${generateRandomNumber(1000, 9999)}`;
        break;
      case 'UK':
        phone = `+44 ${generateRandomNumber(1000, 9999)} ${generateRandomNumber(100000, 999999)}`;
        break;
      case 'FR':
        phone = `+33 ${generateRandomNumber(1, 9)} ${generateRandomNumber(10, 99)} ${generateRandomNumber(10, 99)} ${generateRandomNumber(10, 99)} ${generateRandomNumber(10, 99)}`;
        break;
      case 'DE':
        phone = `+49 ${generateRandomNumber(100, 999)} ${generateRandomNumber(1000000, 9999999)}`;
        break;
      case 'JP':
        phone = `+81 ${generateRandomNumber(10, 99)}-${generateRandomNumber(1000, 9999)}-${generateRandomNumber(1000, 9999)}`;
        break;
      case 'IT':
        phone = `+39 ${generateRandomNumber(100, 999)} ${generateRandomNumber(1000000, 9999999)}`;
        break;
      default:
        phone = `+1 (${generateRandomNumber(200, 999)}) ${generateRandomNumber(100, 999)}-${generateRandomNumber(1000, 9999)}`;
    }

    setIdentity({
      firstName,
      lastName,
      dateOfBirth: formatDate(birthDate),
      age,
      email,
      phone
    });
  };

  const generateAddress = () => {
    const streetNumber = generateRandomNumber(1, 9999);
    const street = streets[Math.floor(Math.random() * streets.length)];
    const city = cities[selectedCountry as keyof typeof cities][
      Math.floor(Math.random() * cities[selectedCountry as keyof typeof cities].length)
    ];
    
    let postalCode = '';
    switch(selectedCountry) {
      case 'US':
        postalCode = `${generateRandomNumber(10000, 99999)}`;
        break;
      case 'UK':
        postalCode = `${String.fromCharCode(65 + Math.random() * 26)}${String.fromCharCode(65 + Math.random() * 26)}${generateRandomNumber(1, 99)} ${generateRandomNumber(1, 9)}${String.fromCharCode(65 + Math.random() * 26)}${String.fromCharCode(65 + Math.random() * 26)}`;
        break;
      case 'CA':
        postalCode = `${String.fromCharCode(65 + Math.random() * 26)}${generateRandomNumber(0, 9)}${String.fromCharCode(65 + Math.random() * 26)} ${generateRandomNumber(0, 9)}${String.fromCharCode(65 + Math.random() * 26)}${generateRandomNumber(0, 9)}`;
        break;
      case 'FR':
        postalCode = `${generateRandomNumber(10000, 99999)}`;
        break;
      case 'DE':
        postalCode = `${generateRandomNumber(10000, 99999)}`;
        break;
      case 'IT':
        postalCode = `${generateRandomNumber(10000, 99999)}`;
        break;
      case 'JP':
        postalCode = `${generateRandomNumber(100, 999)}-${generateRandomNumber(1000, 9999)}`;
        break;
      case 'NL':
        postalCode = `${generateRandomNumber(1000, 9999)} ${String.fromCharCode(65 + Math.random() * 26)}${String.fromCharCode(65 + Math.random() * 26)}`;
        break;
      case 'SE':
        postalCode = `${generateRandomNumber(100, 999)} ${generateRandomNumber(10, 99)}`;
        break;
      default:
        postalCode = `${generateRandomNumber(10000, 99999)}`;
    }

    setAddress({
      streetNumber: streetNumber.toString(),
      street,
      city,
      postalCode,
      country: countries.find(c => c.code === selectedCountry)?.name || ''
    });
  };

  const generateCreditCard = () => {
    const cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    const prefix = cardType.prefix[Math.floor(Math.random() * cardType.prefix.length)];
    const number = generateLuhnNumber(prefix, cardType.length);
    const cvv = Array.from({ length: cardType.cvvLength }, () => generateRandomNumber(0, 9)).join('');
    const expiryDate = generateExpiryDate();
    const cardHolder = identity.firstName && identity.lastName 
      ? `${identity.firstName} ${identity.lastName}`
      : 'CARD HOLDER';

    setCreditCard({
      type: cardType.name,
      number,
      expiryDate,
      cvv,
      cardHolder,
      background: cardType.background
    });
  };

  const generateAll = () => {
    generateIdentity();
    generateAddress();
    generateCreditCard();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Globe2 className="mx-auto h-12 w-12 text-indigo-600" />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Identity, Address & Card Generator
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Generate random identities, addresses, and credit cards for different countries
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6 space-y-6">
            <div className="mb-6">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Select Country
              </label>
              <select
                id="country"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button
                onClick={generateIdentity}
                className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <User className="mr-2 h-4 w-4" />
                Identity
              </button>

              <button
                onClick={generateAddress}
                className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Address
              </button>

              <button
                onClick={generateCreditCard}
                className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Card
              </button>

              <button
                onClick={generateAll}
                className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate All
              </button>
            </div>

            <div className="space-y-6">
              {identity.firstName && (
                <div className="p-4 bg-purple-50 rounded-md">
                  <div className="flex items-start">
                    <UserCircle className="h-5 w-5 text-purple-600 mt-1" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {identity.firstName} {identity.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Born: {identity.dateOfBirth} (Age: {identity.age})
                      </p>
                      <p className="text-sm text-gray-600">
                        Email: {identity.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        Phone: {identity.phone}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {address.street && (
                <div className="p-4 bg-indigo-50 rounded-md">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-indigo-600 mt-1" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {address.streetNumber} {address.street}
                      </p>
                      <p className="text-sm text-gray-600">
                        {address.city}
                      </p>
                      <p className="text-sm text-gray-600">
                        {address.postalCode}
                      </p>
                      <p className="text-sm text-gray-600">
                        {address.country}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {creditCard.number && (
                <div className={`p-6 rounded-xl bg-gradient-to-r ${creditCard.background} text-white shadow-lg transform transition-all duration-500 hover:scale-105`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-2xl">{creditCard.type}</div>
                    <div className="text-2xl">💳</div>
                  </div>
                  <div className="mb-6">
                    <div className="text-xl font-mono">
                      {formatCardNumber(creditCard.number)}
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs opacity-75 mb-1">Card Holder</div>
                      <div className="font-medium">{creditCard.cardHolder}</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-75 mb-1">Expires</div>
                      <div className="font-medium">{creditCard.expiryDate}</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-75 mb-1">CVV</div>
                      <div className="font-medium">{creditCard.cvv}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Owner Info Footer */}
      <footer className="bg-white shadow-lg mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                <span className="text-xl font-bold text-white">J</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">j1xxy</h3>
                <p className="text-sm text-gray-600">Identity Generator Creator</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <a
                href="https://t.me/j1xxy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Contact on Telegram</span>
              </a>
              <a
                href="https://github.com/j1xxycoding"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
