interface Address {
  line?: string;
  countryCode: string;
  cityName?: string;
  latitude?: number;
  longitude?: number;
}

interface Rule {
  ruleDescription: string;
}

interface Baggage {
  count: number;
}

interface Seat {
  count: number;
}

interface Vehicle {
  code: string;
  category: string;
  description: string;
  imageURL: string;
  baggages: Baggage[];
  seats: Seat[];
}

interface ServiceProvider {
  code: string;
  name: string;
  logoUrl: string;
  settings: string[];
}

interface PartnerInfo {
  serviceProvider: ServiceProvider;
}

interface MonetaryAmount {
  monetaryAmount: string;
}

interface Tax extends MonetaryAmount {}

interface Quotation {
  monetaryAmount: string;
  currencyCode: string;
  taxes: Tax[];
  totalTaxes: MonetaryAmount;
  isEstimated: boolean;
  base: MonetaryAmount;
  totalFees: MonetaryAmount;
}

interface Distance {
  value: number;
  unit: string;
}

interface Description {
  descriptionType: string;
  text: string;
}

interface Condition {
  descriptions: Description[];
}

interface Start {
  dateTime: string;
  locationCode: string;
  address: Address;
}

interface End {
  dateTime: string;
  address: Address;
}

interface PassengerCharacteristics {
  passengerTypeCode: string;
  age: number;
}

export interface TransferOffer {
  id: string;
  type: string;
  transferType: string;
  start: Start;
  end: End;
  cancellationRules: Rule[];
  duration: string;
  vehicle: Vehicle;
  serviceProvider: ServiceProvider;
  partnerInfo: PartnerInfo;
  quotation: Quotation;
  converted: Quotation;
  methodsOfPaymentAccepted: string[];
  passengerCharacteristics: PassengerCharacteristics;
  distance: Distance;
  conditionSummary: Condition[];
}
