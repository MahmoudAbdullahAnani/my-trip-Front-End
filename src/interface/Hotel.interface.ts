export interface HotelOffer {
  data: {
    type: string;
    hotel: {
      type: string;
      hotelId: string;
      chainCode: string;
      name: string;
      cityCode: string;
      address: {
        countryCode: string;
      };
      amenities: string[];
    };
    available: boolean;
    offers: {
      id: string;
      checkInDate: string;
      checkOutDate: string;
      rateCode: string;
      rateFamilyEstimated: {
        code: string;
        type: string;
      };
      description: {
        text: string;
        lang: string;
      };
      room: {
        type: string;
        typeEstimated: {
          beds: number;
          bedType: string;
        };
        description: {
          text: string;
          lang: string;
        };
      };
      guests: {
        adults: number;
      };
      price: {
        currency: string;
        base: string;
        total: string;
        taxes: {
          code: string;
          pricingFrequency: string;
          pricingMode: string;
          amount: string;
          currency: string;
          included: boolean;
        }[];
        variations: {
          changes: {
            startDate: string;
            endDate: string;
            base: string;
          }[];
        };
      };
      policies: {
        cancellations: {
          description: {
            text: string;
          };
          type: string;
        }[];
        paymentType: string;
      };
    }[];
  };
  meta: {
    lang: string;
  };
}
