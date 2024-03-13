/** @type {import('next').NextConfig} */
const withImages = require("next-images");

const nextConfig = {
  // async rewrites() {
  //     return [
  //       { source: '/:region', destination: '/[region]' },
  //     ];
  //   },

  async rewrites() {
    return [
      //broken URL
      {
        source:
          "/destinations/europe/portugal-and-madeira/lisbon/martinhal-lisbon-cascais-family-hotel",
        destination: "/destinations/europe/portugal-and-madeira/lisbon",
      },
      {
        source:
          "/destinations/north-africa-and-middle-east/uae/jumeirah-beach-and-the-palm/caesars-palace-dubai",
        destination:
          "/destinations/north-africa-and-middle-east/uae/jumeirah-beach-and-the-palm",
      },
      {
        source:
          "/destinations/mexico-and-central-america/mexico/riviera-maya/zoetry-paraiso-de-la-bonita",
        destination:
          "/destinations/mexico-and-central-america/mexico/riviera-maya",
      },
      {
        source:
          "/destinations/africa/zimbabwe/eastern-highlands/inn-on-rupurara",
        destination: "/destinations/africa/zimbabwe/eastern-highlands",
      },
      {
        source:
          "/destinations/south-america/colombia/colombian-wetlands/corocora-camp",
        destination: "/destinations/south-america/colombia/colombian-wetlands",
      },
      {
        source: "/destinations/asia/indonesia/bali/banyan-tree",
        destination: "/destinations/asia/indonesia/bali/bali-places-to-stay",
      },
      {
        source:
          "/destinations/asia/cambodia/siem-reap-and-temples-of-angkor/bensley-collection-shinta-mani-siem-reap",
        destination:
          "/destinations/asia/cambodia/siem-reap-and-temples-of-angkor/siem-reap-and-temples-of-angkor-places-to-stay",
      },
      {
        source:
          "/destinations/asia/cambodia/siem-reap-and-temples-of-angkor/shinta-mani",
        destination:
          "/destinations/asia/cambodia/siem-reap-and-temples-of-angkor/siem-reap-and-temples-of-angkor-places-to-stay",
      },
      {
        source:
          "/destinations/europe/italy/italy-itineraries/andrea-bocelli-tuscany-concert",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source:
          "/destinations/north-africa-and-middle-east/uae/downtown-dubai/desert-palm",
        destination:
          "/destinations/north-africa-and-middle-east/uae/downtown-dubai/downtown-dubai-places-to-stay",
      },
      {
        source:
          "/destinations/europe/montenegro/sveti-stefan/regent-porto-montenegro",
        destination:
          "/destinations/europe/montenegro/bay-of-kotor/bay-of-kotor-places-to-stay",
      },
      {
        source:
          "/destinations/europe/montenegro/sveti-stefan/aman-sveti-stefan",
        destination:
          "/destinations/europe/montenegro/montenegro-places-to-stay",
      },
      {
        source: "/destinations/europe/montenegro/sveti-stefan",
        destination: "/destinations/europe/montenegro",
      },
      {
        source:
          "/destinations/indian-subcontinent/sri-lanka/southern-and-southwest-coast/jade-52",
        destination:
          "/destinations/indian-subcontinent/sri-lanka/southern-and-southwest-coast/southern-and-southwest-coast-places-to-stay",
      },
      {
        source:
          "/destinations/indian-subcontinent/sri-lanka/southern-and-southwest-coast/yala-elephant-reach",
        destination:
          "/destinations/indian-subcontinent/sri-lanka/southern-and-southwest-coast/southern-and-southwest-coast-places-to-stay",
      },
      {
        source:
          "/destinations/indian-subcontinent/sri-lanka/sri-lankas-hill-country/the-samadhi-centre",
        destination:
          "/destinations/indian-subcontinent/sri-lanka/sri-lankas-hill-country/sri-lankas-hill-country-places-to-stay",
      },
      {
        source:
          "/destinations/indian-subcontinent/sri-lanka/cultural-triangle-and-eastern-sri-lanka/lake-lodge",
        destination:
          "/destinations/indian-subcontinent/sri-lanka/cultural-triangle-and-eastern-sri-lanka/cultural-triangle-and-eastern-sri-lanka-places-",
      },
      {
        source:
          "/destinations/indian-subcontinent/sri-lanka/colombo-and-western-sri-lanka/dolphin-beach",
        destination:
          "/destinations/indian-subcontinent/sri-lanka/colombo-and-western-sri-lanka/colombo-and-western-sri-lanka-places-to-stay",
      },
      {
        source:
          "/destinations/indian-subcontinent/sri-lanka/sri-lankas-hill-country/the-hermitage",
        destination:
          "/destinations/indian-subcontinent/sri-lanka/sri-lankas-hill-country/sri-lankas-hill-country-places-to-stay",
      },
      {
        source: "/why-us/our-people/jon-dunne",
        destination: "/why-us/our-people",
      },
      {
        source: "/destinations/indian-ocean/maldives/shangri-la-villingili",
        destination:
          "/destinations/indian-ocean/maldives/maldives-places-to-stay",
      },
      {
        source: "/destinations/asia/indonesia/eastern-indonesia/amanikan-boats",
        destination:
          "/destinations/asia/indonesia/eastern-indonesia/eastern-indonesia-places-to-stay",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/nevis/nisbet-plantation",
        destination:
          "/destinations/north-america-and-caribbean/nevis/nevis-places-to-stay",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/st-vincent-and-grenadines/buccament-bay",
        destination:
          "/destinations/north-america-and-caribbean/st-vincent-and-grenadines/st-vincent-and-grenadines-places-to-stay",
      },
      {
        source: "/landing/reviews-of-exsus",
        destination: "/why-us/exsus-reviews",
      },
      {
        source: "/us/landing/reviews-of-exsus",
        destination: "/why-us/exsus-reviews",
      },
      {
        source: "/asia/landing/reviews-of-exsus",
        destination: "/why-us/exsus-reviews",
      },
      {
        source: "/in/landing/reviews-of-exsus",
        destination: "/why-us/exsus-reviews",
      },
      {
        source: "/landing/luxury-wedding-anniversary-holidays",
        destination:
          "/holiday-types/special-occasions/milestone-birthdays-and-anniversaries",
      },
      {
        source: "/us/landing/luxury-wedding-anniversary-holidays",
        destination:
          "/holiday-types/special-occasions/milestone-birthdays-and-anniversaries",
      },
      {
        source: "/asia/landing/luxury-wedding-anniversary-holidays",
        destination:
          "/holiday-types/special-occasions/milestone-birthdays-and-anniversaries",
      },
      {
        source: "/in/landing/luxury-wedding-anniversary-holidays",
        destination:
          "/holiday-types/special-occasions/milestone-birthdays-and-anniversaries",
      },
      {
        source: "/landing/riding-safaris-landing",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source: "/us/landing/luxury-family-vacations-to-australia",
        destination:
          "/destinations/australasia-and-south-pacific/australia/australia-itineraries",
      },
      {
        source: "/landing/luxury-fly-drive-holidays-in-california",
        destination: "/landing/luxury-self-drive-holidays-in-california",
      },
      {
        source: "/us/landing/luxury-fly-drive-holidays-in-california",
        destination: "/landing/luxury-self-drive-holidays-in-california",
      },
      {
        source: "/asia/landing/luxury-fly-drive-holidays-in-california",
        destination: "/landing/luxury-self-drive-holidays-in-california",
      },
      {
        source: "/in/landing/luxury-fly-drive-holidays-in-california",
        destination: "/landing/luxury-self-drive-holidays-in-california",
      },
      {
        source:
          "/destinations/australasia-and-south-pacific/australia/western-australia/the-richardson",
        destination:
          "/destinations/australasia-and-south-pacific/australia/western-australia/western-australia-places-to-stay",
      },
      {
        source:
          "/us/destinations/australasia-and-south-pacific/australia/western-australia/the-richardson",
        destination:
          "/destinations/australasia-and-south-pacific/australia/western-australia/western-australia-places-to-stay",
      },
      {
        source:
          "/asia/destinations/australasia-and-south-pacific/australia/western-australia/the-richardson",
        destination:
          "/destinations/australasia-and-south-pacific/australia/western-australia/western-australia-places-to-stay",
      },
      {
        source:
          "/in/destinations/australasia-and-south-pacific/australia/western-australia/the-richardson",
        destination:
          "/destinations/australasia-and-south-pacific/australia/western-australia/western-australia-places-to-stay",
      },
      {
        source:
          "/destinations/asia/malaysia-and-borneo/kuching-and-surrounds/aiman-batang-ai-resort-and-retreat",
        destination:
          "/destinations/asia/malaysia-and-borneo/kuching-and-surrounds/kuching-and-surrounds-places-to-stay",
      },
      {
        source:
          "/us/destinations/asia/malaysia-and-borneo/kuching-and-surrounds/aiman-batang-ai-resort-and-retreat",
        destination:
          "/destinations/asia/malaysia-and-borneo/kuching-and-surrounds/kuching-and-surrounds-places-to-stay",
      },
      {
        source:
          "/asia/destinations/asia/malaysia-and-borneo/kuching-and-surrounds/aiman-batang-ai-resort-and-retreat",
        destination:
          "/destinations/asia/malaysia-and-borneo/kuching-and-surrounds/kuching-and-surrounds-places-to-stay",
      },
      {
        source:
          "/in/destinations/asia/malaysia-and-borneo/kuching-and-surrounds/aiman-batang-ai-resort-and-retreat",
        destination:
          "/destinations/asia/malaysia-and-borneo/kuching-and-surrounds/kuching-and-surrounds-places-to-stay",
      },
      {
        source: "/why-us/our-people/ricky-coates",
        destination: "/why-us/our-people",
      },
      {
        source: "/us/why-us/our-people/ricky-coates",
        destination: "/why-us/our-people",
      },
      {
        source: "/asia/why-us/our-people/ricky-coates",
        destination: "/why-us/our-people",
      },
      {
        source: "/in/why-us/our-people/ricky-coates",
        destination: "/why-us/our-people",
      },
      {
        source: "/why-us/our-people/katie-horton",
        destination: "/why-us/our-people",
      },
      {
        source: "/us/why-us/our-people/katie-horton",
        destination: "/why-us/our-people",
      },
      {
        source: "/asia/why-us/our-people/katie-horton",
        destination: "/why-us/our-people",
      },
      {
        source: "/in/why-us/our-people/katie-horton",
        destination: "/why-us/our-people",
      },
      {
        source: "/why-us/our-people/caroline-hawes",
        destination: "/why-us/our-people",
      },
      {
        source: "/us/why-us/our-people/caroline-hawes",
        destination: "/why-us/our-people",
      },
      {
        source: "/asia/why-us/our-people/caroline-hawes",
        destination: "/why-us/our-people",
      },
      {
        source: "/in/why-us/our-people/caroline-hawes",
        destination: "/why-us/our-people",
      },
      {
        source: "/why-us/our-people/ashleigh-fitt",
        destination: "/why-us/our-people",
      },
      {
        source: "/us/why-us/our-people/ashleigh-fitt",
        destination: "/why-us/our-people",
      },
      {
        source: "/asia/why-us/our-people/ashleigh-fitt",
        destination: "/why-us/our-people",
      },
      {
        source: "/in/why-us/our-people/ashleigh-fitt",
        destination: "/why-us/our-people",
      },
      {
        source: "/why-us/our-people/gina-waygood",
        destination: "/why-us/our-people",
      },
      {
        source: "/us/why-us/our-people/gina-waygood",
        destination: "/why-us/our-people",
      },
      {
        source: "/asia/why-us/our-people/gina-waygood",
        destination: "/why-us/our-people",
      },
      {
        source: "/in/why-us/our-people/gina-waygood",
        destination: "/why-us/our-people",
      },
      {
        source: "/why-us/our-people/dave-osborne",
        destination: "/why-us/our-people",
      },
      {
        source: "/us/why-us/our-people/dave-osborne",
        destination: "/why-us/our-people",
      },
      {
        source: "/asia/why-us/our-people/dave-osborne",
        destination: "/why-us/our-people",
      },
      {
        source: "/in/why-us/our-people/dave-osborne",
        destination: "/why-us/our-people",
      },
      {
        source: "/why-us/our-people/rob-moller",
        destination: "/why-us/our-people",
      },
      {
        source: "/us/why-us/our-people/rob-moller",
        destination: "/why-us/our-people",
      },
      {
        source: "/asia/why-us/our-people/rob-moller",
        destination: "/why-us/our-people",
      },
      {
        source: "/in/why-us/our-people/rob-moller",
        destination: "/why-us/our-people",
      },
      {
        source:
          "/destinations/south-america/chile/chile-itineraries/chile-solar-eclipse",
        destination: "/destinations/south-america/chile/chile-itineraries",
      },
      {
        source:
          "/us/destinations/south-america/chile/chile-itineraries/chile-solar-eclipse",
        destination: "/destinations/south-america/chile/chile-itineraries",
      },
      {
        source:
          "/asia/destinations/south-america/chile/chile-itineraries/chile-solar-eclipse",
        destination: "/destinations/south-america/chile/chile-itineraries",
      },
      {
        source:
          "/in/destinations/south-america/chile/chile-itineraries/chile-solar-eclipse",
        destination: "/destinations/south-america/chile/chile-itineraries",
      },
      {
        source:
          "/destinations/south-america/chile/santiago-and-central-chile/santiago-and-central-chile-itineraries/chile-solar-eclipse",
        destination:
          "/destinations/south-america/chile/santiago-and-central-chile/santiago-and-central-chile-itineraries",
      },
      {
        source:
          "/us/destinations/south-america/chile/santiago-and-central-chile/santiago-and-central-chile-itineraries/chile-solar-eclipse",
        destination:
          "/destinations/south-america/chile/santiago-and-central-chile/santiago-and-central-chile-itineraries",
      },
      {
        source:
          "/asia/destinations/south-america/chile/santiago-and-central-chile/santiago-and-central-chile-itineraries/chile-solar-eclipse",
        destination:
          "/destinations/south-america/chile/santiago-and-central-chile/santiago-and-central-chile-itineraries",
      },
      {
        source:
          "/in/destinations/south-america/chile/santiago-and-central-chile/santiago-and-central-chile-itineraries/chile-solar-eclipse",
        destination:
          "/destinations/south-america/chile/santiago-and-central-chile/santiago-and-central-chile-itineraries",
      },
      {
        source:
          "/destinations/south-america/chile/chilean-lake-district/chilean-lake-district-itineraries/chile-solar-eclipse",
        destination:
          "/destinations/south-america/chile/chilean-lake-district/chilean-lake-district-itineraries",
      },
      {
        source:
          "/us/destinations/south-america/chile/chilean-lake-district/chilean-lake-district-itineraries/chile-solar-eclipse",
        destination:
          "/destinations/south-america/chile/chilean-lake-district/chilean-lake-district-itineraries",
      },
      {
        source:
          "/asia/destinations/south-america/chile/chilean-lake-district/chilean-lake-district-itineraries/chile-solar-eclipse",
        destination:
          "/destinations/south-america/chile/chilean-lake-district/chilean-lake-district-itineraries",
      },
      {
        source:
          "/in/destinations/south-america/chile/chilean-lake-district/chilean-lake-district-itineraries/chile-solar-eclipse",
        destination:
          "/destinations/south-america/chile/chilean-lake-district/chilean-lake-district-itineraries",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/canada/british-columbia/four-seasons-vancouver",
        destination:
          "/destinations/north-america-and-caribbean/canada/british-columbia/british-columbia-places-to-stay",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/canada/british-columbia/four-seasons-vancouver",
        destination:
          "/destinations/north-america-and-caribbean/canada/british-columbia/british-columbia-places-to-stay",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/canada/british-columbia/four-seasons-vancouver",
        destination:
          "/destinations/north-america-and-caribbean/canada/british-columbia/british-columbia-places-to-stay",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/canada/british-columbia/four-seasons-vancouver",
        destination:
          "/destinations/north-america-and-caribbean/canada/british-columbia/british-columbia-places-to-stay",
      },
      {
        source: "/destinations/indian-ocean/seychelles/banyan-tree-seychelles",
        destination:
          "/destinations/indian-ocean/seychelles/seychelles-places-to-stay",
      },
      {
        source:
          "/us/destinations/indian-ocean/seychelles/banyan-tree-seychelles",
        destination:
          "/destinations/indian-ocean/seychelles/seychelles-places-to-stay",
      },
      {
        source:
          "/asia/destinations/indian-ocean/seychelles/banyan-tree-seychelles",
        destination:
          "/destinations/indian-ocean/seychelles/seychelles-places-to-stay",
      },
      {
        source:
          "/in/destinations/indian-ocean/seychelles/banyan-tree-seychelles",
        destination:
          "/destinations/indian-ocean/seychelles/seychelles-places-to-stay",
      },
      {
        source: "/destinations/asia/singapore/six-senses-duxton",
        destination: "/destinations/asia/singapore/singapore-places-to-stay",
      },
      {
        source: "/us/destinations/asia/singapore/six-senses-duxton",
        destination: "/destinations/asia/singapore/singapore-places-to-stay",
      },
      {
        source: "/asia/destinations/asia/singapore/six-senses-duxton",
        destination: "/destinations/asia/singapore/singapore-places-to-stay",
      },
      {
        source: "/in/destinations/asia/singapore/six-senses-duxton",
        destination: "/destinations/asia/singapore/singapore-places-to-stay",
      },
      {
        source: "/destinations/asia/singapore/six-senses-maxwell",
        destination: "/destinations/asia/singapore/singapore-places-to-stay",
      },
      {
        source: "/us/destinations/asia/singapore/six-senses-maxwell",
        destination: "/destinations/asia/singapore/singapore-places-to-stay",
      },
      {
        source: "/asia/destinations/asia/singapore/six-senses-maxwell",
        destination: "/destinations/asia/singapore/singapore-places-to-stay",
      },
      {
        source: "/in/destinations/asia/singapore/six-senses-maxwell",
        destination: "/destinations/asia/singapore/singapore-places-to-stay",
      },
      {
        source:
          "/destinations/indian-subcontinent/india/the-himalaya/the-ultimate-travelling-camp-jaagir-lodge-dudhwa",
        destination:
          "/destinations/indian-subcontinent/india/central-india/the-ultimate-travelling-camp-jaagir-lodge-dudhwa",
      },
      {
        source:
          "/us/destinations/indian-subcontinent/india/the-himalaya/the-ultimate-travelling-camp-jaagir-lodge-dudhwa",
        destination:
          "/destinations/indian-subcontinent/india/central-india/the-ultimate-travelling-camp-jaagir-lodge-dudhwa",
      },
      {
        source:
          "/asia/destinations/indian-subcontinent/india/the-himalaya/the-ultimate-travelling-camp-jaagir-lodge-dudhwa",
        destination:
          "/destinations/indian-subcontinent/india/central-india/the-ultimate-travelling-camp-jaagir-lodge-dudhwa",
      },
      {
        source:
          "/in/destinations/indian-subcontinent/india/the-himalaya/the-ultimate-travelling-camp-jaagir-lodge-dudhwa",
        destination:
          "/destinations/indian-subcontinent/india/central-india/the-ultimate-travelling-camp-jaagir-lodge-dudhwa",
      },
      {
        source:
          "/holiday-types/luxury-short-breaks/beach-and-relaxation-holidays",
        destination:
          "/holiday-types/luxury-beach-holidays/luxury-beach-holidays-itineraries",
      },
      {
        source:
          "/us/holiday-types/luxury-short-breaks/beach-and-relaxation-holidays",
        destination:
          "/holiday-types/luxury-beach-holidays/luxury-beach-holidays-itineraries",
      },
      {
        source:
          "/asia/holiday-types/luxury-short-breaks/beach-and-relaxation-holidays",
        destination:
          "/holiday-types/luxury-beach-holidays/luxury-beach-holidays-itineraries",
      },
      {
        source:
          "/in/holiday-types/luxury-short-breaks/beach-and-relaxation-holidays",
        destination:
          "/holiday-types/luxury-beach-holidays/luxury-beach-holidays-itineraries",
      },
      {
        source: "/destinations/africa/tanzania/zanzibar-and-islands/unguja",
        destination:
          "/destinations/africa/tanzania/zanzibar-and-islands/zanzibar-and-islands-places-to-stay",
      },
      {
        source: "/us/destinations/africa/tanzania/zanzibar-and-islands/unguja",
        destination:
          "/destinations/africa/tanzania/zanzibar-and-islands/zanzibar-and-islands-places-to-stay",
      },
      {
        source:
          "/asia/destinations/africa/tanzania/zanzibar-and-islands/unguja",
        destination:
          "/destinations/africa/tanzania/zanzibar-and-islands/zanzibar-and-islands-places-to-stay",
      },
      {
        source: "/in/destinations/africa/tanzania/zanzibar-and-islands/unguja",
        destination:
          "/destinations/africa/tanzania/zanzibar-and-islands/zanzibar-and-islands-places-to-stay",
      },
      {
        source:
          "/destinations/africa/tanzania/zanzibar-and-islands/beyt-al-chai",
        destination:
          "/destinations/africa/tanzania/zanzibar-and-islands/zanzibar-and-islands-places-to-stay",
      },
      {
        source:
          "/us/destinations/africa/tanzania/zanzibar-and-islands/beyt-al-chai",
        destination:
          "/destinations/africa/tanzania/zanzibar-and-islands/zanzibar-and-islands-places-to-stay",
      },
      {
        source:
          "/asia/destinations/africa/tanzania/zanzibar-and-islands/beyt-al-chai",
        destination:
          "/destinations/africa/tanzania/zanzibar-and-islands/zanzibar-and-islands-places-to-stay",
      },
      {
        source:
          "/in/destinations/africa/tanzania/zanzibar-and-islands/beyt-al-chai",
        destination:
          "/destinations/africa/tanzania/zanzibar-and-islands/zanzibar-and-islands-places-to-stay",
      },
      {
        source:
          "/destinations/africa/tanzania/zanzibar-and-islands/indigo-beach",
        destination:
          "/destinations/africa/tanzania/zanzibar-and-islands/zanzibar-and-islands-places-to-stay",
      },
      {
        source:
          "/us/destinations/africa/tanzania/zanzibar-and-islands/indigo-beach",
        destination:
          "/destinations/africa/tanzania/zanzibar-and-islands/zanzibar-and-islands-places-to-stay",
      },
      {
        source:
          "/asia/destinations/africa/tanzania/zanzibar-and-islands/indigo-beach",
        destination:
          "/destinations/africa/tanzania/zanzibar-and-islands/zanzibar-and-islands-places-to-stay",
      },
      {
        source:
          "/in/destinations/africa/tanzania/zanzibar-and-islands/indigo-beach",
        destination:
          "/destinations/africa/tanzania/zanzibar-and-islands/zanzibar-and-islands-places-to-stay",
      },
      {
        source:
          "/destinations/africa/tanzania/zanzibar-and-islands/emerson-spice",
        destination:
          "/destinations/africa/tanzania/zanzibar-and-islands/zanzibar-and-islands-places-to-stay",
      },
      {
        source:
          "/us/destinations/africa/tanzania/zanzibar-and-islands/emerson-spice",
        destination:
          "/destinations/africa/tanzania/zanzibar-and-islands/zanzibar-and-islands-places-to-stay",
      },
      {
        source:
          "/asia/destinations/africa/tanzania/zanzibar-and-islands/emerson-spice",
        destination:
          "/destinations/africa/tanzania/zanzibar-and-islands/zanzibar-and-islands-places-to-stay",
      },
      {
        source:
          "/in/destinations/africa/tanzania/zanzibar-and-islands/emerson-spice",
        destination:
          "/destinations/africa/tanzania/zanzibar-and-islands/zanzibar-and-islands-places-to-stay",
      },
      {
        source:
          "/destinations/indian-subcontinent/sri-lanka/colombo-and-western-sri-lanka/casa-colombo-collection",
        destination:
          "/destinations/indian-subcontinent/sri-lanka/colombo-and-western-sri-lanka/colombo-and-western-sri-lanka-places-to-stay",
      },
      {
        source:
          "/us/destinations/indian-subcontinent/sri-lanka/colombo-and-western-sri-lanka/casa-colombo-collection",
        destination:
          "/destinations/indian-subcontinent/sri-lanka/colombo-and-western-sri-lanka/colombo-and-western-sri-lanka-places-to-stay",
      },
      {
        source:
          "/asia/destinations/indian-subcontinent/sri-lanka/colombo-and-western-sri-lanka/casa-colombo-collection",
        destination:
          "/destinations/indian-subcontinent/sri-lanka/colombo-and-western-sri-lanka/colombo-and-western-sri-lanka-places-to-stay",
      },
      {
        source:
          "/in/destinations/indian-subcontinent/sri-lanka/colombo-and-western-sri-lanka/casa-colombo-collection",
        destination:
          "/destinations/indian-subcontinent/sri-lanka/colombo-and-western-sri-lanka/colombo-and-western-sri-lanka-places-to-stay",
      },
      {
        source:
          "/destinations/south-america/argentina/cordoba-mendoza-and-winelands/casa-margot",
        destination:
          "/destinations/south-america/argentina/cordoba-mendoza-and-winelands/cordoba-mendoza-and-winelands-places-to-stay",
      },
      {
        source:
          "/us/destinations/south-america/argentina/cordoba-mendoza-and-winelands/casa-margot",
        destination:
          "/destinations/south-america/argentina/cordoba-mendoza-and-winelands/cordoba-mendoza-and-winelands-places-to-stay",
      },
      {
        source:
          "/asia/destinations/south-america/argentina/cordoba-mendoza-and-winelands/casa-margot",
        destination:
          "/destinations/south-america/argentina/cordoba-mendoza-and-winelands/cordoba-mendoza-and-winelands-places-to-stay",
      },
      {
        source:
          "/in/destinations/south-america/argentina/cordoba-mendoza-and-winelands/casa-margot",
        destination:
          "/destinations/south-america/argentina/cordoba-mendoza-and-winelands/cordoba-mendoza-and-winelands-places-to-stay",
      },
      {
        source: "/blog/luxury-fly-drive-holidays-to-california",
        destination: "/landing/luxury-self-drive-holidays-in-california",
      },
      {
        source: "/us/blog/luxury-fly-drive-holidays-to-california",
        destination: "/landing/luxury-self-drive-holidays-in-california",
      },
      {
        source: "/asia/blog/luxury-fly-drive-holidays-to-california",
        destination: "/landing/luxury-self-drive-holidays-in-california",
      },
      {
        source: "/in/blog/luxury-fly-drive-holidays-to-california",
        destination: "/landing/luxury-self-drive-holidays-in-california",
      },
      {
        source: "/blog/luxury-amazon-rainforest-holidays",
        destination: "/landing/amazon-rainforest-holidays",
      },
      {
        source: "/us/blog/luxury-amazon-rainforest-holidays",
        destination: "/landing/amazon-rainforest-holidays",
      },
      {
        source: "/asia/blog/luxury-amazon-rainforest-holidays",
        destination: "/landing/amazon-rainforest-holidays",
      },
      {
        source: "/in/blog/luxury-amazon-rainforest-holidays",
        destination: "/landing/amazon-rainforest-holidays",
      },
      {
        source:
          "/destinations/africa/botswana/okavango-delta-and-moremi/andbeyond-xudum-okavango-delta-lodge",
        destination:
          "/destinations/africa/botswana/okavango-delta-and-moremi/okavango-delta-and-moremi-places-to-stay",
      },
      {
        source:
          "/us/destinations/africa/botswana/okavango-delta-and-moremi/andbeyond-xudum-okavango-delta-lodge",
        destination:
          "/destinations/africa/botswana/okavango-delta-and-moremi/okavango-delta-and-moremi-places-to-stay",
      },
      {
        source:
          "/asia/destinations/africa/botswana/okavango-delta-and-moremi/andbeyond-xudum-okavango-delta-lodge",
        destination:
          "/destinations/africa/botswana/okavango-delta-and-moremi/okavango-delta-and-moremi-places-to-stay",
      },
      {
        source:
          "/in/destinations/africa/botswana/okavango-delta-and-moremi/andbeyond-xudum-okavango-delta-lodge",
        destination:
          "/destinations/africa/botswana/okavango-delta-and-moremi/okavango-delta-and-moremi-places-to-stay",
      },
      {
        source:
          "/destinations/south-america/ecuador-and-galapagos/galapagos-islands/mv-galapagos-sky",
        destination:
          "/destinations/south-america/ecuador-and-galapagos/galapagos-islands/galapagos-islands-places-to-stay",
      },
      {
        source:
          "/us/destinations/south-america/ecuador-and-galapagos/galapagos-islands/mv-galapagos-sky",
        destination:
          "/destinations/south-america/ecuador-and-galapagos/galapagos-islands/galapagos-islands-places-to-stay",
      },
      {
        source:
          "/asia/destinations/south-america/ecuador-and-galapagos/galapagos-islands/mv-galapagos-sky",
        destination:
          "/destinations/south-america/ecuador-and-galapagos/galapagos-islands/galapagos-islands-places-to-stay",
      },
      {
        source:
          "/in/destinations/south-america/ecuador-and-galapagos/galapagos-islands/mv-galapagos-sky",
        destination:
          "/destinations/south-america/ecuador-and-galapagos/galapagos-islands/galapagos-islands-places-to-stay",
      },
      {
        source:
          "/destinations/africa/mozambique/quirimbas-pemba-and-the-north-coast/guludo-beach-lodge",
        destination:
          "/destinations/africa/mozambique/quirimbas-pemba-and-the-north-coast/quirimbas-pemba-and-the-north-coast-places-to-stay",
      },
      {
        source:
          "/us/destinations/africa/mozambique/quirimbas-pemba-and-the-north-coast/guludo-beach-lodge",
        destination:
          "/destinations/africa/mozambique/quirimbas-pemba-and-the-north-coast/quirimbas-pemba-and-the-north-coast-places-to-stay",
      },
      {
        source:
          "/asia/destinations/africa/mozambique/quirimbas-pemba-and-the-north-coast/guludo-beach-lodge",
        destination:
          "/destinations/africa/mozambique/quirimbas-pemba-and-the-north-coast/quirimbas-pemba-and-the-north-coast-places-to-stay",
      },
      {
        source:
          "/in/destinations/africa/mozambique/quirimbas-pemba-and-the-north-coast/guludo-beach-lodge",
        destination:
          "/destinations/africa/mozambique/quirimbas-pemba-and-the-north-coast/quirimbas-pemba-and-the-north-coast-places-to-stay",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/canada/ontario/e-terra",
        destination:
          "/destinations/north-america-and-caribbean/canada/ontario/ontario-places-to-stay",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/canada/ontario/e-terra",
        destination:
          "/destinations/north-america-and-caribbean/canada/ontario/ontario-places-to-stay",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/canada/ontario/e-terra",
        destination:
          "/destinations/north-america-and-caribbean/canada/ontario/ontario-places-to-stay",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/canada/ontario/e-terra",
        destination:
          "/destinations/north-america-and-caribbean/canada/ontario/ontario-places-to-stay",
      },
      {
        source:
          "/destinations/asia/thailand/northern-thailand/dhara-dhevi-chiang-mai",
        destination:
          "/destinations/asia/thailand/northern-thailand/northern-thailand-places-to-stay",
      },
      {
        source:
          "/us/destinations/asia/thailand/northern-thailand/dhara-dhevi-chiang-mai",
        destination:
          "/destinations/asia/thailand/northern-thailand/northern-thailand-places-to-stay",
      },
      {
        source:
          "/asia/destinations/asia/thailand/northern-thailand/dhara-dhevi-chiang-mai",
        destination:
          "/destinations/asia/thailand/northern-thailand/northern-thailand-places-to-stay",
      },
      {
        source:
          "/in/destinations/asia/thailand/northern-thailand/dhara-dhevi-chiang-mai",
        destination:
          "/destinations//asia/thailand/northern-thailand/northern-thailand-places-to-stay",
      },
      {
        source:
          "/destinations/indian-subcontinent/india/tamil-nadu-and-the-andaman-islands/rajakkad",
        destination:
          "/destinations/indian-subcontinent/india/tamil-nadu-and-the-andaman-islands/tamil-nadu-and-the-andaman-islands-places-to-stay",
      },
      {
        source:
          "/us/destinations/indian-subcontinent/india/tamil-nadu-and-the-andaman-islands/rajakkad",
        destination:
          "/destinations/indian-subcontinent/india/tamil-nadu-and-the-andaman-islands/tamil-nadu-and-the-andaman-islands-places-to-stay",
      },
      {
        source:
          "/asia/destinations/indian-subcontinent/india/tamil-nadu-and-the-andaman-islands/rajakkad",
        destination:
          "/destinations/indian-subcontinent/india/tamil-nadu-and-the-andaman-islands/tamil-nadu-and-the-andaman-islands-places-to-stay",
      },
      {
        source:
          "/in/destinations/indian-subcontinent/india/tamil-nadu-and-the-andaman-islands/rajakkad",
        destination:
          "/destinations/indian-subcontinent/india/tamil-nadu-and-the-andaman-islands/tamil-nadu-and-the-andaman-islands-places-to-stay",
      },
      {
        source:
          "/destinations/europe/turkey/turkey-itineraries/culture-and-coast-luxury-holiday-in-turkey",
        destination: "/destinations/europe/turkey/turkey-itineraries",
      },
      {
        source:
          "/us/destinations/europe/turkey/turkey-itineraries/culture-and-coast-luxury-holiday-in-turkey",
        destination: "/destinations/europe/turkey/turkey-itineraries",
      },
      {
        source:
          "/asia/destinations/europe/turkey/turkey-itineraries/culture-and-coast-luxury-holiday-in-turkey",
        destination: "/destinations/europe/turkey/turkey-itineraries",
      },
      {
        source:
          "/in/destinations/europe/turkey/turkey-itineraries/culture-and-coast-luxury-holiday-in-turkey",
        destination: "/destinations/europe/turkey/turkey-itineraries",
      },
      {
        source: "/destinations/europe/turkey/alacati/nars-ilica",
        destination:
          "/destinations/europe/turkey/alacati/alacati-places-to-stay",
      },
      {
        source: "/us/destinations/europe/turkey/alacati/nars-ilica",
        destination:
          "/destinations/europe/turkey/alacati/alacati-places-to-stay",
      },
      {
        source: "/asia/destinations/europe/turkey/alacati/nars-ilica",
        destination:
          "/destinations/europe/turkey/alacati/alacati-places-to-stay",
      },
      {
        source: "/in/destinations/europe/turkey/alacati/nars-ilica",
        destination:
          "/destinations/europe/turkey/alacati/alacati-places-to-stay",
      },
      {
        source: "/destinations/europe/turkey/alacati/nars-alacati",
        destination:
          "/destinations/europe/turkey/alacati/alacati-places-to-stay",
      },
      {
        source: "/us/destinations/europe/turkey/alacati/nars-alacati",
        destination:
          "/destinations/europe/turkey/alacati/alacati-places-to-stay",
      },
      {
        source: "/asia/destinations/europe/turkey/alacati/nars-alacati",
        destination:
          "/destinations/europe/turkey/alacati/alacati-places-to-stay",
      },
      {
        source: "/in/destinations/europe/turkey/alacati/nars-alacati",
        destination:
          "/destinations/europe/turkey/alacati/alacati-places-to-stay",
      },
      {
        source: "/destinations/europe/turkey/cappadocia/gamirasu",
        destination:
          "/destinations/europe/turkey/cappadocia/cappadocia-places-to-stay",
      },
      {
        source: "/us/destinations/europe/turkey/cappadocia/gamirasu",
        destination:
          "/destinations/europe/turkey/cappadocia/cappadocia-places-to-stay",
      },
      {
        source: "/asia/destinations/europe/turkey/cappadocia/gamirasu",
        destination:
          "/destinations/europe/turkey/cappadocia/cappadocia-places-to-stay",
      },
      {
        source: "/in/destinations/europe/turkey/cappadocia/gamirasu",
        destination:
          "/destinations/europe/turkey/cappadocia/cappadocia-places-to-stay",
      },
      {
        source: "/destinations/europe/turkey/istanbul/sofa-hotel",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source: "/us/destinations/europe/turkey/istanbul/sofa-hotel",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source: "/asia/destinations/europe/turkey/istanbul/sofa-hotel",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source: "/in/destinations/europe/turkey/istanbul/sofa-hotel",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source: "/destinations/europe/turkey/istanbul/boutique-st-sophia",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source: "/us/destinations/europe/turkey/istanbul/boutique-st-sophia",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source: "/asia/destinations/europe/turkey/istanbul/boutique-st-sophia",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source: "/in/destinations/europe/turkey/istanbul/boutique-st-sophia",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source:
          "/destinations/europe/turkey/istanbul/the-house-hotel-nisantasi",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source:
          "/us/destinations/europe/turkey/istanbul/the-house-hotel-nisantasi",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source:
          "/asia/destinations/europe/turkey/istanbul/the-house-hotel-nisantasi",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source:
          "/in/destinations/europe/turkey/istanbul/the-house-hotel-nisantasi",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source: "/destinations/europe/turkey/istanbul/georges",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source: "/us/destinations/europe/turkey/istanbul/georges",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source: "/asia/destinations/europe/turkey/istanbul/georges",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source: "/in/destinations/europe/turkey/istanbul/georges",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source:
          "/destinations/europe/turkey/istanbul/vault-karakoy-the-house-hotel",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source:
          "/us/destinations/europe/turkey/istanbul/vault-karakoy-the-house-hotel",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source:
          "/asia/destinations/europe/turkey/istanbul/vault-karakoy-the-house-hotel",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source:
          "/in/destinations/europe/turkey/istanbul/vault-karakoy-the-house-hotel",
        destination:
          "/destinations/europe/turkey/istanbul/istanbul-places-to-stay",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/barbados/villa-st-lucy",
        destination: "/destinations/north-america-and-caribbean/barbados",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/barbados/villa-st-lucy",
        destination: "/destinations/north-america-and-caribbean/barbados",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/barbados/villa-st-lucy",
        destination: "/destinations/north-america-and-caribbean/barbados",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/barbados/villa-st-lucy",
        destination: "/destinations/north-america-and-caribbean/barbados",
      },
      {
        source: "/why-us/our-people/flora-sweeting",
        destination: "/why-us/our-people",
      },
      {
        source: "/us/why-us/our-people/flora-sweeting",
        destination: "/why-us/our-people",
      },
      {
        source: "/asia/why-us/our-people/flora-sweeting",
        destination: "/why-us/our-people",
      },
      {
        source: "/in/why-us/our-people/flora-sweeting",
        destination: "/why-us/our-people",
      },
      {
        source: "/destinations/indian-ocean/maldives/coco-bodu-hithi",
        destination:
          "/destinations/indian-ocean/maldives/maldives-places-to-stay",
      },
      {
        source: "/us/destinations/indian-ocean/maldives/coco-bodu-hithi",
        destination:
          "/destinations/indian-ocean/maldives/maldives-places-to-stay",
      },
      {
        source: "/asia/destinations/indian-ocean/maldives/coco-bodu-hithi",
        destination:
          "/destinations/indian-ocean/maldives/maldives-places-to-stay",
      },
      {
        source: "/in/destinations/indian-ocean/maldives/coco-bodu-hithi",
        destination:
          "/destinations/indian-ocean/maldives/maldives-places-to-stay",
      },
      {
        source: "/destinations/indian-ocean/maldives/makunudu",
        destination:
          "/destinations/indian-ocean/maldives/maldives-places-to-stay",
      },
      {
        source: "/us/destinations/indian-ocean/maldives/makunudu",
        destination:
          "/destinations/indian-ocean/maldives/maldives-places-to-stay",
      },
      {
        source: "/asia/destinations/indian-ocean/maldives/makunudu",
        destination:
          "/destinations/indian-ocean/maldives/maldives-places-to-stay",
      },
      {
        source: "/in/destinations/indian-ocean/maldives/makunudu",
        destination:
          "/destinations/indian-ocean/maldives/maldives-places-to-stay",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/usa/the-american-southwest/mandarin-oriental",
        destination:
          "/destinations/north-america-and-caribbean/usa/the-american-southwest/waldorf-astoria-las-vegas",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/usa/the-american-southwest/mandarin-oriental",
        destination:
          "/destinations/north-america-and-caribbean/usa/the-american-southwest/waldorf-astoria-las-vegas",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/usa/the-american-southwest/mandarin-oriental",
        destination:
          "/destinations/north-america-and-caribbean/usa/the-american-southwest/waldorf-astoria-las-vegas",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/usa/the-american-southwest/mandarin-oriental",
        destination:
          "/destinations/north-america-and-caribbean/usa/the-american-southwest/waldorf-astoria-las-vegas",
      },
      {
        source:
          "/destinations/australasia-and-south-pacific/new-zealand/auckland-bay-of-islands-and-northland/cavalli-beach-house-retreat",
        destination:
          "/destinations/australasia-and-south-pacific/new-zealand/auckland-bay-of-islands-and-northland/auckland-bay-of-islands-and-northland-places-to-stay",
      },
      {
        source:
          "/us/destinations/australasia-and-south-pacific/new-zealand/auckland-bay-of-islands-and-northland/cavalli-beach-house-retreat",
        destination:
          "/destinations/australasia-and-south-pacific/new-zealand/auckland-bay-of-islands-and-northland/auckland-bay-of-islands-and-northland-places-to-stay",
      },
      {
        source:
          "/asia/destinations/australasia-and-south-pacific/new-zealand/auckland-bay-of-islands-and-northland/cavalli-beach-house-retreat",
        destination:
          "/destinations/australasia-and-south-pacific/new-zealand/auckland-bay-of-islands-and-northland/auckland-bay-of-islands-and-northland-places-to-stay",
      },
      {
        source:
          "/in/destinations/australasia-and-south-pacific/new-zealand/auckland-bay-of-islands-and-northland/cavalli-beach-house-retreat",
        destination:
          "/destinations/australasia-and-south-pacific/new-zealand/auckland-bay-of-islands-and-northland/auckland-bay-of-islands-and-northland-places-to-stay",
      },
      {
        source:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/damaraland/damaraland-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/damaraland/damaraland-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/damaraland/damaraland-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/swakopmund/swakopmund-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/swakopmund/swakopmund-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/swakopmund/swakopmund-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/swakopmund/swakopmund-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/swakopmund/swakopmund-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/swakopmund/swakopmund-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/swakopmund/swakopmund-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/swakopmund/swakopmund-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries",
      },
      {
        source:
          "/destinations/africa/africa-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/us/destinations/africa/africa-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/africa-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/in/destinations/africa/africa-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/damaraland/damaraland-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/damaraland/damaraland-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/damaraland/damaraland-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/namibia-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/namibia-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/namibia-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/namibia-itineraries/luxury-namibia-wing-safari-fly-in-holiday-to-etosha-national-park-damaraland-and-namibrand-nature-reserve",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/destinations/africa/africa-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/us/destinations/africa/africa-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/africa-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/in/destinations/africa/africa-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/swakopmund/swakopmund-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/swakopmund/swakopmund-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/swakopmund/swakopmund-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/swakopmund/swakopmund-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/swakopmund/swakopmund-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/swakopmund/swakopmund-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/swakopmund/swakopmund-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/swakopmund/swakopmund-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/damaraland/damaraland-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/damaraland/damaraland-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/damaraland/damaraland-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/namibia-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/namibia-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/namibia-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/namibia-itineraries/great-namibian-journey-introduction-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/destinations/africa/africa-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/us/destinations/africa/africa-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/africa-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/in/destinations/africa/africa-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/skeleton-coast-and-kaokaoveld/skeleton-coast-and-kaokaoveld-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination:
          "/destinations/africa/namibia/skeleton-coast-and-kaokaoveld/skeleton-coast-and-kaokaoveld-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/skeleton-coast-and-kaokaoveld/skeleton-coast-and-kaokaoveld-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination:
          "/destinations/africa/namibia/skeleton-coast-and-kaokaoveld/skeleton-coast-and-kaokaoveld-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/skeleton-coast-and-kaokaoveld/skeleton-coast-and-kaokaoveld-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination:
          "/destinations/africa/namibia/skeleton-coast-and-kaokaoveld/skeleton-coast-and-kaokaoveld-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/skeleton-coast-and-kaokaoveld/skeleton-coast-and-kaokaoveld-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination:
          "/destinations/africa/namibia/skeleton-coast-and-kaokaoveld/skeleton-coast-and-kaokaoveld-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination:
          "/destinations/africa/namibia/namib-naukluft-national-park-and-sossusvlei/namib-naukluft-national-park-and-sossusvlei-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/damaraland/damaraland-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/damaraland/damaraland-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/damaraland/damaraland-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/namibia-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/namibia-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/namibia-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/namibia-itineraries/desert-haze-luxury-namibia-honeymoon-safari",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/destinations/africa/africa-itineraries/nomadic-namibia-safari-mobile-camping-adventure-in-remote-north-westerly-koakoland",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/us/destinations/africa/africa-itineraries/nomadic-namibia-safari-mobile-camping-adventure-in-remote-north-westerly-koakoland",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/africa-itineraries/nomadic-namibia-safari-mobile-camping-adventure-in-remote-north-westerly-koakoland",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/in/destinations/africa/africa-itineraries/nomadic-namibia-safari-mobile-camping-adventure-in-remote-north-westerly-koakoland",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/skeleton-coast-and-kaokaoveld/skeleton-coast-and-kaokaoveld-itineraries/nomadic-namibia-safari-mobile-camping-adventure-in-remote-north-westerly-koakoland",
        destination:
          "/destinations/africa/namibia/skeleton-coast-and-kaokaoveld/skeleton-coast-and-kaokaoveld-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/skeleton-coast-and-kaokaoveld/skeleton-coast-and-kaokaoveld-itineraries/nomadic-namibia-safari-mobile-camping-adventure-in-remote-north-westerly-koakoland",
        destination:
          "/destinations/africa/namibia/skeleton-coast-and-kaokaoveld/skeleton-coast-and-kaokaoveld-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/skeleton-coast-and-kaokaoveld/skeleton-coast-and-kaokaoveld-itineraries/nomadic-namibia-safari-mobile-camping-adventure-in-remote-north-westerly-koakoland",
        destination:
          "/destinations/africa/namibia/skeleton-coast-and-kaokaoveld/skeleton-coast-and-kaokaoveld-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/skeleton-coast-and-kaokaoveld/skeleton-coast-and-kaokaoveld-itineraries/nomadic-namibia-safari-mobile-camping-adventure-in-remote-north-westerly-koakoland",
        destination:
          "/destinations/africa/namibia/skeleton-coast-and-kaokaoveld/skeleton-coast-and-kaokaoveld-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries/nomadic-namibia-safari-mobile-camping-adventure-in-remote-north-westerly-koakoland",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/damaraland/damaraland-itineraries/nomadic-namibia-safari-mobile-camping-adventure-in-remote-north-westerly-koakoland",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/damaraland/damaraland-itineraries/nomadic-namibia-safari-mobile-camping-adventure-in-remote-north-westerly-koakoland",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/damaraland/damaraland-itineraries/nomadic-namibia-safari-mobile-camping-adventure-in-remote-north-westerly-koakoland",
        destination:
          "/destinations/africa/namibia/damaraland/damaraland-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/namibia-itineraries/nomadic-namibia-safari-mobile-camping-adventure-in-remote-north-westerly-koakoland",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/namibia-itineraries/nomadic-namibia-safari-mobile-camping-adventure-in-remote-north-westerly-koakoland",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/namibia-itineraries/nomadic-namibia-safari-mobile-camping-adventure-in-remote-north-westerly-koakoland",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/namibia-itineraries/nomadic-namibia-safari-mobile-camping-adventure-in-remote-north-westerly-koakoland",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/namibia-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/namibia-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/namibia-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/namibia-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/destinations/africa/africa-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/us/destinations/africa/africa-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/africa-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/in/destinations/africa/africa-itineraries/the-ultimate-namibia-self-drive-luxury-safari-adventure-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/destinations/europe/italy/sicily-and-aeolian-islands/hotel-raya",
        destination:
          "/destinations/europe/italy/sicily-and-aeolian-islands/sicily-and-aeolian-islands-places-to-stay",
      },
      {
        source:
          "/us/destinations/europe/italy/sicily-and-aeolian-islands/hotel-raya",
        destination:
          "/destinations/europe/italy/sicily-and-aeolian-islands/sicily-and-aeolian-islands-places-to-stay",
      },
      {
        source:
          "/asia/destinations/europe/italy/sicily-and-aeolian-islands/hotel-raya",
        destination:
          "/destinations/europe/italy/sicily-and-aeolian-islands/sicily-and-aeolian-islands-places-to-stay",
      },
      {
        source:
          "/in/destinations/europe/italy/sicily-and-aeolian-islands/hotel-raya",
        destination:
          "/destinations/europe/italy/sicily-and-aeolian-islands/sicily-and-aeolian-islands-places-to-stay",
      },
      {
        source: "/why-us/our-people/alison-hentley",
        destination: "/why-us/our-people",
      },
      {
        source: "/us/why-us/our-people/alison-hentley",
        destination: "/why-us/our-people",
      },
      {
        source: "/asia/why-us/our-people/alison-hentley",
        destination: "/why-us/our-people",
      },
      {
        source: "/in/why-us/our-people/alison-hentley",
        destination: "/why-us/our-people",
      },
      {
        source:
          "/destinations/africa/mozambique/bazaruto-and-the-south-coast/indigo-bay",
        destination:
          "/destinations/africa/mozambique/bazaruto-and-the-south-coast/bazaruto-and-the-south-coast-places-to-stay",
      },
      {
        source:
          "/us/destinations/africa/mozambique/bazaruto-and-the-south-coast/indigo-bay",
        destination:
          "/destinations/africa/mozambique/bazaruto-and-the-south-coast/bazaruto-and-the-south-coast-places-to-stay",
      },
      {
        source:
          "/asia/destinations/africa/mozambique/bazaruto-and-the-south-coast/indigo-bay",
        destination:
          "/destinations/africa/mozambique/bazaruto-and-the-south-coast/bazaruto-and-the-south-coast-places-to-stay",
      },
      {
        source:
          "/in/destinations/africa/mozambique/bazaruto-and-the-south-coast/indigo-bay",
        destination:
          "/destinations/africa/mozambique/bazaruto-and-the-south-coast/bazaruto-and-the-south-coast-places-to-stay",
      },
      {
        source: "/why-us/our-people/peter-felix",
        destination: "/why-us/our-people",
      },
      {
        source: "/us/why-us/our-people/peter-felix",
        destination: "/why-us/our-people",
      },
      {
        source: "/asia/why-us/our-people/peter-felix",
        destination: "/why-us/our-people",
      },
      {
        source: "/in/why-us/our-people/peter-felix",
        destination: "/why-us/our-people",
      },
      {
        source:
          "/destinations/south-america/argentina/argentinian-patagonia/las-balsas",
        destination:
          "/destinations/south-america/argentina/argentinian-lake-district/las-balsas",
      },
      {
        source:
          "/us/destinations/south-america/argentina/argentinian-patagonia/las-balsas",
        destination:
          "/destinations/south-america/argentina/argentinian-lake-district/las-balsas",
      },
      {
        source:
          "/asia/destinations/south-america/argentina/argentinian-patagonia/las-balsas",
        destination:
          "/destinations/south-america/argentina/argentinian-lake-district/las-balsas",
      },
      {
        source:
          "/in/destinations/south-america/argentina/argentinian-patagonia/las-balsas",
        destination:
          "/destinations/south-america/argentina/argentinian-lake-district/las-balsas",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/usa/rocky-mountains/rocky-mountains-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/usa/rocky-mountains/rocky-mountains-itineraries",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/usa/rocky-mountains/rocky-mountains-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/usa/rocky-mountains/rocky-mountains-itineraries",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/usa/rocky-mountains/rocky-mountains-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/usa/rocky-mountains/rocky-mountains-itineraries",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/usa/rocky-mountains/rocky-mountains-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/usa/rocky-mountains/rocky-mountains-itineraries",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/north-america-and-caribbean-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/north-america-and-caribbean-itineraries",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/north-america-and-caribbean-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/north-america-and-caribbean-itineraries",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/north-america-and-caribbean-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/north-america-and-caribbean-itineraries",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/north-america-and-caribbean-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/north-america-and-caribbean-itineraries",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/usa/usa-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/usa/usa-itineraries",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/usa/usa-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/usa/usa-itineraries",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/usa/usa-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/usa/usa-itineraries",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/usa/usa-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/usa/usa-itineraries",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/usa/the-american-southwest/the-american-southwest-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/usa/the-american-southwest/the-american-southwest-itineraries",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/usa/the-american-southwest/the-american-southwest-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/usa/the-american-southwest/the-american-southwest-itineraries",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/usa/the-american-southwest/the-american-southwest-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/usa/the-american-southwest/the-american-southwest-itineraries",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/usa/the-american-southwest/the-american-southwest-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/usa/the-american-southwest/the-american-southwest-itineraries",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/usa/rocky-mountains/rocky-mountains-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/usa/rocky-mountains/rocky-mountains-itineraries",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/usa/rocky-mountains/rocky-mountains-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/usa/rocky-mountains/rocky-mountains-itineraries",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/usa/rocky-mountains/rocky-mountains-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/usa/rocky-mountains/rocky-mountains-itineraries",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/usa/rocky-mountains/rocky-mountains-itineraries/ultimate-road-trip-from-denver-to-las-vegas",
        destination:
          "/destinations/north-america-and-caribbean/usa/rocky-mountains/rocky-mountains-itineraries",
      },
      {
        source:
          "/destinations/africa/africa-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/us/destinations/africa/africa-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/africa-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/in/destinations/africa/africa-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/destinations/africa/botswana/botswana-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination: "/destinations/africa/botswana/botswana-itineraries",
      },
      {
        source:
          "/us/destinations/africa/botswana/botswana-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination: "/destinations/africa/botswana/botswana-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/botswana/botswana-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination: "/destinations/africa/botswana/botswana-itineraries",
      },
      {
        source:
          "/in/destinations/africa/botswana/botswana-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination: "/destinations/africa/botswana/botswana-itineraries",
      },
      {
        source:
          "/destinations/africa/zambia/zambia-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination: "/destinations/africa/zambia/zambia-itineraries",
      },
      {
        source:
          "/us/destinations/africa/zambia/zambia-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experiencee",
        destination: "/destinations/africa/zambia/zambia-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/zambia/zambia-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination: "/destinations/africa/zambia/zambia-itineraries",
      },
      {
        source:
          "/in/destinations/africa/zambia/zambia-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination: "/destinations/africa/zambia/zambia-itineraries",
      },
      {
        source:
          "/destinations/africa/botswana/chobe-and-linyanti/chobe-and-linyanti-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination:
          "/destinations/africa/botswana/chobe-and-linyanti/chobe-and-linyanti-itineraries",
      },
      {
        source:
          "/us/destinations/africa/botswana/chobe-and-linyanti/chobe-and-linyanti-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination:
          "/destinations/africa/botswana/chobe-and-linyanti/chobe-and-linyanti-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/botswana/chobe-and-linyanti/chobe-and-linyanti-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination:
          "/destinations/africa/botswana/chobe-and-linyanti/chobe-and-linyanti-itineraries",
      },
      {
        source:
          "/in/destinations/africa/botswana/chobe-and-linyanti/chobe-and-linyanti-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination:
          "/destinations/africa/botswana/chobe-and-linyanti/chobe-and-linyanti-itineraries",
      },
      {
        source:
          "/destinations/africa/botswana/okavango-delta-and-moremi/okavango-delta-and-moremi-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination:
          "/destinations/africa/botswana/okavango-delta-and-moremi/okavango-delta-and-moremi-itineraries",
      },
      {
        source:
          "/us/destinations/africa/botswana/okavango-delta-and-moremi/okavango-delta-and-moremi-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination:
          "/destinations/africa/botswana/okavango-delta-and-moremi/okavango-delta-and-moremi-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/botswana/okavango-delta-and-moremi/okavango-delta-and-moremi-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination:
          "/destinations/africa/botswana/okavango-delta-and-moremi/okavango-delta-and-moremi-itineraries",
      },
      {
        source:
          "/in/destinations/africa/botswana/okavango-delta-and-moremi/okavango-delta-and-moremi-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination:
          "/destinations/africa/botswana/okavango-delta-and-moremi/okavango-delta-and-moremi-itineraries",
      },
      {
        source:
          "/destinations/africa/zambia/livingstone-and-victoria-falls/livingstone-and-victoria-falls-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination:
          "/destinations/africa/zambia/livingstone-and-victoria-falls/livingstone-and-victoria-falls-itineraries",
      },
      {
        source:
          "/us/destinations/africa/zambia/livingstone-and-victoria-falls/livingstone-and-victoria-falls-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination:
          "/destinations/africa/zambia/livingstone-and-victoria-falls/livingstone-and-victoria-falls-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/zambia/livingstone-and-victoria-falls/livingstone-and-victoria-falls-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination:
          "/destinations/africa/zambia/livingstone-and-victoria-falls/livingstone-and-victoria-falls-itineraries",
      },
      {
        source:
          "/in/destinations/africa/zambia/livingstone-and-victoria-falls/livingstone-and-victoria-falls-itineraries/luxury-camping-safari-in-botswana-and-zambia-the-ultimate-wilderness-experience",
        destination:
          "/destinations/africa/zambia/livingstone-and-victoria-falls/livingstone-and-victoria-falls-itineraries",
      },
      {
        source:
          "/destinations/africa/namibia/the-caprivi-strip/impalila-island-lodge",
        destination:
          "/destinations/africa/namibia/the-caprivi-strip/ichingo-chobe-river-lodge",
      },
      {
        source:
          "/us/destinations/africa/namibia/the-caprivi-strip/impalila-island-lodge",
        destination:
          "/destinations/africa/namibia/the-caprivi-strip/ichingo-chobe-river-lodge",
      },
      {
        source:
          "/asia/destinations/africa/namibia/the-caprivi-strip/impalila-island-lodge",
        destination:
          "/destinations/africa/namibia/the-caprivi-strip/ichingo-chobe-river-lodge",
      },
      {
        source:
          "/in/destinations/africa/namibia/the-caprivi-strip/impalila-island-lodge",
        destination:
          "/destinations/africa/namibia/the-caprivi-strip/ichingo-chobe-river-lodge",
      },
      {
        source: "/destinations/africa/zambia/url/the-royal-livingstone",
        destination:
          "/destinations/africa/zambia/livingstone-and-victoria-falls/the-royal-livingstone",
      },
      {
        source: "/us/destinations/africa/zambia/url/the-royal-livingstone",
        destination:
          "/destinations/africa/zambia/livingstone-and-victoria-falls/the-royal-livingstone",
      },
      {
        source: "/asia/destinations/africa/zambia/url/the-royal-livingstone",
        destination:
          "/destinations/africa/zambia/livingstone-and-victoria-falls/the-royal-livingstone",
      },
      {
        source: "/in/destinations/africa/zambia/url/the-royal-livingstone",
        destination:
          "/destinations/africa/zambia/livingstone-and-victoria-falls/the-royal-livingstone",
      },
      {
        source:
          "/destinations/africa/zimbabwe/victoria-falls/the-victoria-falls-hotel",
        destination:
          "/destinations/africa/zimbabwe/victoria-falls-zimbabwe/the-victoria-falls-hotel",
      },
      {
        source:
          "/us/destinations/africa/zimbabwe/victoria-falls/the-victoria-falls-hotel",
        destination:
          "/destinations/africa/zimbabwe/victoria-falls-zimbabwe/the-victoria-falls-hotel",
      },
      {
        source:
          "/asia/destinations/africa/zimbabwe/victoria-falls/the-victoria-falls-hotel",
        destination:
          "/destinations/africa/zimbabwe/victoria-falls-zimbabwe/the-victoria-falls-hotel",
      },
      {
        source:
          "/in/destinations/africa/zimbabwe/victoria-falls/the-victoria-falls-hotel",
        destination:
          "/destinations/africa/zimbabwe/victoria-falls-zimbabwe/the-victoria-falls-hotel",
      },
      {
        source: "/destinations/mexico-and-central-america/cuba/havana/saratoga",
        destination:
          "/destinations/north-america-and-caribbean/cuba/havana/saratoga",
      },
      {
        source:
          "/us/destinations/mexico-and-central-america/cuba/havana/saratoga",
        destination:
          "/destinations/north-america-and-caribbean/cuba/havana/saratoga",
      },
      {
        source:
          "/asia/destinations/mexico-and-central-america/cuba/havana/saratoga",
        destination:
          "/destinations/north-america-and-caribbean/cuba/havana/saratoga",
      },
      {
        source:
          "/in/destinations/mexico-and-central-america/cuba/havana/saratoga",
        destination:
          "/destinations/north-america-and-caribbean/cuba/havana/saratoga",
      },
      {
        source: "/why-us/our-people/meet-the-specialists",
        destination: "/why-us/our-people",
      },
      {
        source: "/us/why-us/our-people/meet-the-specialists",
        destination: "/why-us/our-people",
      },
      {
        source: "/asia/why-us/our-people/meet-the-specialists",
        destination: "/why-us/our-people",
      },
      {
        source: "/in/why-us/our-people/meet-the-specialists",
        destination: "/why-us/our-people",
      },
      {
        source:
          "/destinations/indian-subcontinent/india/mumbai-and-western-india/abode",
        destination:
          "/destinations/indian-subcontinent/india/mumbai-and-western-india/mumbai-and-western-india-places-to-stay",
      },
      {
        source:
          "/us/destinations/indian-subcontinent/india/mumbai-and-western-india/abode",
        destination:
          "/destinations/indian-subcontinent/india/mumbai-and-western-india/mumbai-and-western-india-places-to-stay",
      },
      {
        source:
          "/asia/destinations/indian-subcontinent/india/mumbai-and-western-india/abode",
        destination:
          "/destinations/indian-subcontinent/india/mumbai-and-western-india/mumbai-and-western-india-places-to-stay",
      },
      {
        source:
          "/in/destinations/indian-subcontinent/india/mumbai-and-western-india/abode",
        destination:
          "/destinations/indian-subcontinent/india/mumbai-and-western-india/mumbai-and-western-india-places-to-stay",
      },
      {
        source:
          "/destinations/south-america/chile/chilean-lake-district/quincho-country-home",
        destination:
          "/destinations/south-america/chile/chilean-lake-district/chilean-lake-district-places-to-stay",
      },
      {
        source:
          "/us/destinations/south-america/chile/chilean-lake-district/quincho-country-home",
        destination:
          "/destinations/south-america/chile/chilean-lake-district/chilean-lake-district-places-to-stay",
      },
      {
        source:
          "/asia/destinations/south-america/chile/chilean-lake-district/quincho-country-home",
        destination:
          "/destinations/south-america/chile/chilean-lake-district/chilean-lake-district-places-to-stay",
      },
      {
        source:
          "/in/destinations/south-america/chile/chilean-lake-district/quincho-country-home",
        destination:
          "/destinations/south-america/chile/chilean-lake-district/chilean-lake-district-places-to-stay",
      },
      { source: "/contact-us/contact-details", destination: "/contact-us" },
      { source: "/us/contact-us/contact-details", destination: "/contact-us" },
      {
        source: "/asia/contact-us/contact-details",
        destination: "/contact-us",
      },
      { source: "/in/contact-us/contact-details", destination: "/contact-us" },
      {
        source:
          "/destinations/europe/italy/rome-umbria-and-central-italy/palazzo-terranova",
        destination:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-places-to-stay",
      },
      {
        source:
          "/us/destinations/europe/italy/rome-umbria-and-central-italy/palazzo-terranova",
        destination:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-places-to-stay",
      },
      {
        source:
          "/asia/destinations/europe/italy/rome-umbria-and-central-italy/palazzo-terranova",
        destination:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-places-to-stay",
      },
      {
        source:
          "/in/destinations/europe/italy/rome-umbria-and-central-italy/palazzo-terranova",
        destination:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-places-to-stay",
      },
      {
        source:
          "/destinations/indian-ocean/mauritius/the-hilton-mauritius-resort-and-spa",
        destination:
          "/destinations/indian-ocean/mauritius/mauritius-places-to-stay",
      },
      {
        source:
          "/us/destinations/indian-ocean/mauritius/the-hilton-mauritius-resort-and-spa",
        destination:
          "/destinations/indian-ocean/mauritius/mauritius-places-to-stay",
      },
      {
        source:
          "/asia/destinations/indian-ocean/mauritius/the-hilton-mauritius-resort-and-spa",
        destination:
          "/destinations/indian-ocean/mauritius/mauritius-places-to-stay",
      },
      {
        source:
          "/in/destinations/indian-ocean/mauritius/the-hilton-mauritius-resort-and-spa",
        destination:
          "/destinations/indian-ocean/mauritius/mauritius-places-to-stay",
      },
      {
        source:
          "/destinations/indian-ocean/mauritius/the-intercontinental-mauritius",
        destination:
          "/destinations/indian-ocean/mauritius/mauritius-places-to-stay",
      },
      {
        source:
          "/us/destinations/indian-ocean/mauritius/the-intercontinental-mauritius",
        destination:
          "/destinations/indian-ocean/mauritius/mauritius-places-to-stay",
      },
      {
        source:
          "/asia/destinations/indian-ocean/mauritius/the-intercontinental-mauritius",
        destination:
          "/destinations/indian-ocean/mauritius/mauritius-places-to-stay",
      },
      {
        source:
          "/in/destinations/indian-ocean/mauritius/the-intercontinental-mauritius",
        destination:
          "/destinations/indian-ocean/mauritius/mauritius-places-to-stay",
      },
      {
        source: "/destinations/indian-ocean/mauritius/le-meridien-ile-maurice",
        destination:
          "/destinations/indian-ocean/mauritius/mauritius-places-to-stay",
      },
      {
        source:
          "/us/destinations/indian-ocean/mauritius/le-meridien-ile-maurice",
        destination:
          "/destinations/indian-ocean/mauritius/mauritius-places-to-stay",
      },
      {
        source:
          "/asia/destinations/indian-ocean/mauritius/le-meridien-ile-maurice",
        destination:
          "/destinations/indian-ocean/mauritius/mauritius-places-to-stay",
      },
      {
        source:
          "/in/destinations/indian-ocean/mauritius/le-meridien-ile-maurice",
        destination:
          "/destinations/indian-ocean/mauritius/mauritius-places-to-stay",
      },
      {
        source:
          "/destinations/europe/uk/uk-itineraries/classic-england-honeymoon",
        destination: "/destinations/europe/uk/uk-itineraries",
      },
      {
        source:
          "/destinations/europe/europe-itineraries/classic-england-honeymoon",
        destination: "/destinations/europe/europe-itineraries",
      },
      {
        source:
          "/destinations/south-america/chile/chilean-lake-district/caleta-gonzalo",
        destination:
          "/destinations/south-america/chile/chilean-patagonia/caleta-gonzalo",
      },
      {
        source:
          "/us/destinations/south-america/chile/chilean-lake-district/caleta-gonzalo",
        destination:
          "/destinations/south-america/chile/chilean-patagonia/caleta-gonzalo",
      },
      {
        source:
          "/asia/destinations/south-america/chile/chilean-lake-district/caleta-gonzalo",
        destination:
          "/destinations/south-america/chile/chilean-patagonia/caleta-gonzalo",
      },
      {
        source:
          "/in/destinations/south-america/chile/chilean-lake-district/caleta-gonzalo",
        destination:
          "/destinations/south-america/chile/chilean-patagonia/caleta-gonzalo",
      },
      {
        source:
          "/destinations/europe/italy/italy-itineraries/italy-off-the-beaten-path",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source:
          "/us/destinations/europe/italy/italy-itineraries/italy-off-the-beaten-path",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source:
          "/asia/destinations/europe/italy/italy-itineraries/italy-off-the-beaten-path",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source:
          "/in/destinations/europe/italy/italy-itineraries/italy-off-the-beaten-path",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source:
          "/destinations/europe/italy/italy-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source:
          "/us/destinations/europe/italy/italy-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source:
          "/asia/destinations/europe/italy/italy-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source:
          "/in/destinations/europe/italy/italy-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source:
          "/destinations/europe/italy/italy-itineraries/digital-detox-escape-to-italy",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source:
          "/us/destinations/europe/italy/italy-itineraries/digital-detox-escape-to-italy",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source:
          "/asia/destinations/europe/italy/italy-itineraries/digital-detox-escape-to-italy",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source:
          "/in/destinations/europe/italy/italy-itineraries/digital-detox-escape-to-italy",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source:
          "/destinations/europe/italy/italy-itineraries/escape-to-rome-and-umbria",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source:
          "/us/destinations/europe/italy/italy-itineraries/escape-to-rome-and-umbria",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source:
          "/asia/destinations/europe/italy/italy-itineraries/escape-to-rome-and-umbria",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source:
          "/in/destinations/europe/italy/italy-itineraries/escape-to-rome-and-umbria",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source:
          "/destinations/europe/switzerland/zermatt/zermatt-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination:
          "/destinations/europe/switzerland/zermatt/zermatt-itineraries",
      },
      {
        source:
          "/us/destinations/europe/switzerland/zermatt/zermatt-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination:
          "/destinations/europe/switzerland/zermatt/zermatt-itineraries",
      },
      {
        source:
          "/asia/destinations/europe/switzerland/zermatt/zermatt-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination:
          "/destinations/europe/switzerland/zermatt/zermatt-itineraries",
      },
      {
        source:
          "/in/destinations/europe/switzerland/zermatt/zermatt-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination:
          "/destinations/europe/switzerland/zermatt/zermatt-itineraries",
      },
      {
        source:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries/italy-off-the-beaten-path",
        destination:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries",
      },
      {
        source:
          "/us/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries/italy-off-the-beaten-path",
        destination:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries",
      },
      {
        source:
          "/asia/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries/italy-off-the-beaten-path",
        destination:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries",
      },
      {
        source:
          "/in/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries/italy-off-the-beaten-path",
        destination:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries",
      },
      {
        source:
          "/destinations/europe/italy/florence-and-tuscany/florence-and-tuscany-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination:
          "/destinations/europe/italy/florence-and-tuscany/florence-and-tuscany-itineraries",
      },
      {
        source:
          "/us/destinations/europe/italy/florence-and-tuscany/florence-and-tuscany-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination:
          "/destinations/europe/italy/florence-and-tuscany/florence-and-tuscany-itineraries",
      },
      {
        source:
          "/asia/destinations/europe/italy/florence-and-tuscany/florence-and-tuscany-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination:
          "/destinations/europe/italy/florence-and-tuscany/florence-and-tuscany-itineraries",
      },
      {
        source:
          "/in/destinations/europe/italy/florence-and-tuscany/florence-and-tuscany-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination:
          "/destinations/europe/italy/florence-and-tuscany/florence-and-tuscany-itineraries",
      },
      {
        source:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries/digital-detox-escape-to-italy",
        destination:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries",
      },
      {
        source:
          "/us/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries/digital-detox-escape-to-italy",
        destination:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries",
      },
      {
        source:
          "/asia/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries/digital-detox-escape-to-italy",
        destination:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries",
      },
      {
        source:
          "/in/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries/digital-detox-escape-to-italy",
        destination:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries",
      },
      {
        source:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries/escape-to-rome-and-umbria",
        destination:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries",
      },
      {
        source:
          "/us/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries/escape-to-rome-and-umbria",
        destination:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries",
      },
      {
        source:
          "/asia/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries/escape-to-rome-and-umbria",
        destination:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries",
      },
      {
        source:
          "/in/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries/escape-to-rome-and-umbria",
        destination:
          "/destinations/europe/italy/rome-umbria-and-central-italy/rome-umbria-and-central-italy-itineraries",
      },
      {
        source:
          "/destinations/europe/switzerland/switzerland-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination: "/destinations/europe/switzerland/switzerland-itineraries",
      },
      {
        source:
          "/us/destinations/europe/switzerland/switzerland-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination: "/destinations/europe/switzerland/switzerland-itineraries",
      },
      {
        source:
          "/asia/destinations/europe/switzerland/switzerland-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination: "/destinations/europe/switzerland/switzerland-itineraries",
      },
      {
        source:
          "/in/destinations/europe/switzerland/switzerland-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination: "/destinations/europe/switzerland/switzerland-itineraries",
      },
      {
        source:
          "/destinations/europe/italy/venice-and-the-veneto/venice-and-the-veneto-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination:
          "/destinations/europe/italy/venice-and-the-veneto/venice-and-the-veneto-itineraries",
      },
      {
        source:
          "/us/destinations/europe/italy/venice-and-the-veneto/venice-and-the-veneto-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination:
          "/destinations/europe/italy/venice-and-the-veneto/venice-and-the-veneto-itineraries",
      },
      {
        source:
          "/asia/destinations/europe/italy/venice-and-the-veneto/venice-and-the-veneto-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination:
          "/destinations/europe/italy/venice-and-the-veneto/venice-and-the-veneto-itineraries",
      },
      {
        source:
          "/in/destinations/europe/italy/venice-and-the-veneto/venice-and-the-veneto-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination:
          "/destinations/europe/italy/venice-and-the-veneto/venice-and-the-veneto-itineraries",
      },
      {
        source:
          "/destinations/europe/italy/northern-italy/northern-italy-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination:
          "/destinations/europe/italy/northern-italy/northern-italy-itineraries",
      },
      {
        source:
          "/us/destinations/europe/italy/northern-italy/northern-italy-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination:
          "/destinations/europe/italy/northern-italy/northern-italy-itineraries",
      },
      {
        source:
          "/asia/destinations/europe/italy/northern-italy/northern-italy-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination:
          "/destinations/europe/italy/northern-italy/northern-italy-itineraries",
      },
      {
        source:
          "/in/destinations/europe/italy/northern-italy/northern-italy-itineraries/across-the-alps-by-train-from-switzerland-to-italy",
        destination:
          "/destinations/europe/italy/northern-italy/northern-italy-itineraries",
      },

      {
        source:
          "/destinations/africa/namibia/skeleton-coast-and-kaokoveld/serra-cafema",
        destination:
          "/destinations/africa/namibia/skeleton-coast-and-kaokaoveld/serra-cafema",
      },
      {
        source: "/destinations/africa/zambia/victoria-falls/tongabezi",
        destination:
          "/destinations/africa/zambia/livingstone-and-victoria-falls/tongabezi",
      },
      {
        source: "/destinations/africa/zimbabwe/victoria-falls/zambezi-sands",
        destination:
          "/destinations/africa/zimbabwe/victoria-falls-zimbabwe/zambezi-sands",
      },
      {
        source: "/destinations/asia/thailand/southern-thailand/soneva-kiri",
        destination:
          "/destinations/asia/thailand/koh-kood-and-koh-chang/soneva-kiri",
      },
      {
        source:
          "/destinations/australasia-and-south-pacific/new-zealand/marlborough-and-nelson/manakau-lodge",
        destination:
          "/destinations/australasia-and-south-pacific/new-zealand/christchurch-kaikoura-and-canterbury-district/manakau-lodge",
      },
      {
        source:
          "/destinations/australasia-and-south-pacific/new-zealand/otago-and-the-southern-alps/annandale",
        destination:
          "/destinations/australasia-and-south-pacific/new-zealand/christchurch-kaikoura-and-canterbury-district/annandale",
      },
      {
        source:
          "/destinations/australasia-and-south-pacific/new-zealand/otago-and-the-southern-alps/the-george",
        destination:
          "/destinations/australasia-and-south-pacific/new-zealand/christchurch-kaikoura-and-canterbury-district/the-george",
      },
      {
        source:
          "/destinations/europe/italy/emilia-romagna/grand-hotel-de-la-ville",
        destination:
          "/destinations/europe/italy/naples-amalfi-coast-and-capri/grand-hotel-de-la-ville",
      },
      {
        source:
          "/destinations/mexico-and-central-america/guatemala/antigua/el-convento",
        destination:
          "/destinations/mexico-and-central-america/guatemala/antigua-guatemala/el-convento",
      },
      {
        source:
          "/destinations/north-africa-and-middle-east/morocco/desert-morocco/la-maison-blanche",
        destination:
          "/destinations/north-africa-and-middle-east/morocco/northern-morocco/la-maison-blanche",
      },
      {
        source:
          "/destinations/south-america/ecuador-and-galapagos/url/galapagos-sea-star-journey",
        destination:
          "/destinations/south-america/ecuador-and-galapagos/galapagos-islands/galapagos-sea-star-journey",
      },
      {
        source:
          "/destinations/south-america/ecuador-and-galapagos/url/mv-santa-cruz",
        destination:
          "/destinations/south-america/ecuador-and-galapagos/galapagos-islands/mv-santa-cruz",
      },
      {
        source:
          "/destinations/south-america/argentina/the-pampas-and-the-estancias/la-candelaria-del-monte",
        destination:
          "/destinations/south-america/argentina/buenos-aires-and-pampas/la-candelaria-del-monte",
      },
      {
        source:
          "/destinations/australasia-and-south-pacific/new-zealand/southland-and-the-fiords/blanket-bay-lodge",
        destination:
          "/destinations/australasia-and-south-pacific/new-zealand/otago-and-the-southern-alps/blanket-bay-lodge",
      },
      {
        source:
          "/destinations/australasia-and-south-pacific/new-zealand/otago-and-the-southern-alps/otahuna-lodge",
        destination:
          "/destinations/australasia-and-south-pacific/new-zealand/christchurch-kaikoura-and-canterbury-district/otahuna-lodge",
      },
      {
        source:
          "/destinations/australasia-and-south-pacific/new-zealand/otago-and-the-southern-alps/arthurs-pass-wilderness-lodge",
        destination:
          "/destinations/australasia-and-south-pacific/new-zealand/christchurch-kaikoura-and-canterbury-district/arthurs-pass-wilderness-lodge",
      },
      {
        source:
          "/destinations/australasia-and-south-pacific/new-zealand/otago-and-the-southern-alps/lake-heron-station",
        destination:
          "/destinations/australasia-and-south-pacific/new-zealand/christchurch-kaikoura-and-canterbury-district/lake-heron-station",
      },
      {
        source:
          "/destinations/mexico-and-central-america/nicaragua/emerald-coast/mukul-beach",
        destination:
          "/destinations/mexico-and-central-america/nicaragua/emerald-coast/emerald-coast-places-to-stay",
      },
      {
        source:
          "/us/destinations/mexico-and-central-america/nicaragua/emerald-coast/mukul-beach",
        destination:
          "/destinations/mexico-and-central-america/nicaragua/emerald-coast/emerald-coast-places-to-stay",
      },
      {
        source:
          "/asia/destinations/mexico-and-central-america/nicaragua/emerald-coast/mukul-beach",
        destination:
          "/destinations/mexico-and-central-america/nicaragua/emerald-coast/emerald-coast-places-to-stay",
      },
      {
        source:
          "/in/destinations/mexico-and-central-america/nicaragua/emerald-coast/mukul-beach",
        destination:
          "/destinations/mexico-and-central-america/nicaragua/emerald-coast/emerald-coast-places-to-stay",
      },
      {
        source:
          "/destinations/mexico-and-central-america/costa-rica/central-and-southern-pacific-coast/copa-de-arbol",
        destination:
          "/destinations/mexico-and-central-america/costa-rica/central-and-southern-pacific-coast/central-and-southern-pacific-coast-places-to-stay",
      },
      {
        source:
          "/us/destinations/mexico-and-central-america/costa-rica/central-and-southern-pacific-coast/copa-de-arbol",
        destination:
          "/destinations/mexico-and-central-america/costa-rica/central-and-southern-pacific-coast/central-and-southern-pacific-coast-places-to-stay",
      },
      {
        source:
          "/asia/destinations/mexico-and-central-america/costa-rica/central-and-southern-pacific-coast/copa-de-arbol",
        destination:
          "/destinations/mexico-and-central-america/costa-rica/central-and-southern-pacific-coast/central-and-southern-pacific-coast-places-to-stay",
      },
      {
        source:
          "/in/destinations/mexico-and-central-america/costa-rica/central-and-southern-pacific-coast/copa-de-arbol",
        destination:
          "/destinations/mexico-and-central-america/costa-rica/central-and-southern-pacific-coast/central-and-southern-pacific-coast-places-to-stay",
      },
      {
        source:
          "/destinations/usa-and-canada/british-columbia/vancouver-and-the-sunshine-coast",
        destination:
          "/destinations/north-america-and-caribbean/canada/canada-regions",
      },
      {
        source:
          "/itineraries/africa/luxury-botswana-honeymoon-safari-sunset-on-the-okavango-delta",
        destination:
          "/destinations/africa/africa-itineraries/luxury-botswana-honeymoon-safari-sunset-on-the-okavango-delta",
      },
      {
        source:
          "/destinations/south-america/peru/peruvian-amazon/aqua-expeditions-mv-aqua",
        destination:
          "/destinations/south-america/peru/peruvian-amazon/peruvian-amazon-places-to-stay",
      },
      {
        source:
          "/us/destinations/south-america/peru/peruvian-amazon/aqua-expeditions-mv-aqua",
        destination:
          "/destinations/south-america/peru/peruvian-amazon/peruvian-amazon-places-to-stay",
      },
      {
        source:
          "/asia/destinations/south-america/peru/peruvian-amazon/aqua-expeditions-mv-aqua",
        destination:
          "/destinations/south-america/peru/peruvian-amazon/peruvian-amazon-places-to-stay",
      },
      {
        source:
          "/in/destinations/south-america/peru/peruvian-amazon/aqua-expeditions-mv-aqua",
        destination:
          "/destinations/south-america/peru/peruvian-amazon/peruvian-amazon-places-to-stay",
      },
      {
        source:
          "/destinations/indian-subcontinent/india/calcutta-and-northeast-india/pandaw-brahmaputra",
        destination:
          "/destinations/indian-subcontinent/india/calcutta-and-northeast-india/calcutta-and-northeast-india-places-to-stay",
      },
      {
        source:
          "/us/destinations/indian-subcontinent/india/calcutta-and-northeast-india/pandaw-brahmaputra",
        destination:
          "/destinations/indian-subcontinent/india/calcutta-and-northeast-india/calcutta-and-northeast-india-places-to-stay",
      },
      {
        source:
          "/asia/destinations/indian-subcontinent/india/calcutta-and-northeast-india/pandaw-brahmaputra",
        destination:
          "/destinations/indian-subcontinent/india/calcutta-and-northeast-india/calcutta-and-northeast-india-places-to-stay",
      },
      {
        source:
          "/in/destinations/indian-subcontinent/india/calcutta-and-northeast-india/pandaw-brahmaputra",
        destination:
          "/destinations/indian-subcontinent/india/calcutta-and-northeast-india/calcutta-and-northeast-india-places-to-stay",
      },
      {
        source:
          "/destinations/indian-subcontinent/india/rajasthan/savista-retreat",
        destination: "/destinations/indian-subcontinent/india/rajasthan",
      },
      {
        source:
          "/us/destinations/indian-subcontinent/india/rajasthan/savista-retreat",
        destination: "/destinations/indian-subcontinent/india/rajasthan",
      },
      {
        source:
          "/asia/destinations/indian-subcontinent/india/rajasthan/savista-retreat",
        destination: "/destinations/indian-subcontinent/india/rajasthan",
      },
      {
        source:
          "/in/destinations/indian-subcontinent/india/rajasthan/savista-retreat",
        destination: "/destinations/indian-subcontinent/india/rajasthan",
      },
      {
        source:
          "/destinations/europe/spain/basque-country/abadia-retuerta-l-domaine",
        destination:
          "/destinations/europe/spain/madrid/abadia-retuerta-l-domaine",
      },
      {
        source:
          "/us/destinations/europe/spain/basque-country/abadia-retuerta-l-domaine",
        destination:
          "/destinations/europe/spain/madrid/abadia-retuerta-l-domaine",
      },
      {
        source:
          "/asia/destinations/europe/spain/basque-country/abadia-retuerta-l-domaine",
        destination:
          "/destinations/europe/spain/madrid/abadia-retuerta-l-domaine",
      },
      {
        source:
          "/in/destinations/europe/spain/basque-country/abadia-retuerta-l-domaine",
        destination:
          "/destinations/europe/spain/madrid/abadia-retuerta-l-domaine",
      },
      {
        source:
          "/destinations/indian-subcontinent/india/the-himalaya/ultimate-travelling-camp-kohima-camp",
        destination:
          "/destinations/indian-subcontinent/india/calcutta-and-northeast-india/ultimate-travelling-camp-kohima-camp",
      },
      {
        source:
          "/us/destinations/indian-subcontinent/india/the-himalaya/ultimate-travelling-camp-kohima-camp",
        destination:
          "/destinations/indian-subcontinent/india/calcutta-and-northeast-india/ultimate-travelling-camp-kohima-camp",
      },
      {
        source:
          "/asia/destinations/indian-subcontinent/india/the-himalaya/ultimate-travelling-camp-kohima-camp",
        destination:
          "/destinations/indian-subcontinent/india/calcutta-and-northeast-india/ultimate-travelling-camp-kohima-camp",
      },
      {
        source:
          "/in/destinations/indian-subcontinent/india/the-himalaya/ultimate-travelling-camp-kohima-camp",
        destination:
          "/destinations/indian-subcontinent/india/calcutta-and-northeast-india/ultimate-travelling-camp-kohima-camp",
      },
      {
        source:
          "/destinations/australasia-and-south-pacific/french-polynesia/moorea-pearl-resort-and-spa",
        destination:
          "/destinations/australasia-and-south-pacific/french-polynesia/manava-beach-resort-and-spa-moorea",
      },
      {
        source:
          "/us/destinations/australasia-and-south-pacific/french-polynesia/moorea-pearl-resort-and-spa",
        destination:
          "/destinations/australasia-and-south-pacific/french-polynesia/manava-beach-resort-and-spa-moorea",
      },
      {
        source:
          "/asia/destinations/australasia-and-south-pacific/french-polynesia/moorea-pearl-resort-and-spa",
        destination:
          "/destinations/australasia-and-south-pacific/french-polynesia/manava-beach-resort-and-spa-moorea",
      },
      {
        source:
          "/in/destinations/australasia-and-south-pacific/french-polynesia/moorea-pearl-resort-and-spa",
        destination:
          "/destinations/australasia-and-south-pacific/french-polynesia/manava-beach-resort-and-spa-moorea",
      },
      {
        source:
          "/destinations/south-america/brazil/rio-de-janeiro/sofitel-rio-de-janeiro",
        destination:
          "/destinations/south-america/brazil/rio-de-janeiro/rio-de-janeiro-places-to-stay",
      },
      {
        source:
          "/us/destinations/south-america/brazil/rio-de-janeiro/sofitel-rio-de-janeiro",
        destination:
          "/destinations/south-america/brazil/rio-de-janeiro/rio-de-janeiro-places-to-stay",
      },
      {
        source:
          "/asia/destinations/south-america/brazil/rio-de-janeiro/sofitel-rio-de-janeiro",
        destination:
          "/destinations/south-america/brazil/rio-de-janeiro/rio-de-janeiro-places-to-stay",
      },
      {
        source:
          "/in/destinations/south-america/brazil/rio-de-janeiro/sofitel-rio-de-janeiro",
        destination:
          "/destinations/south-america/brazil/rio-de-janeiro/rio-de-janeiro-places-to-stay",
      },
      {
        source:
          "/destinations/europe/norway/central-norway-and-lofoten/little-island-lighthouse",
        destination:
          "/destinations/europe/norway/central-norway-and-lofoten/central-norway-and-lofoten-places-to-stay",
      },
      {
        source:
          "/us/destinations/europe/norway/central-norway-and-lofoten/little-island-lighthouse",
        destination:
          "/destinations/europe/norway/central-norway-and-lofoten/central-norway-and-lofoten-places-to-stay",
      },
      {
        source:
          "/asia/destinations/europe/norway/central-norway-and-lofoten/little-island-lighthouse",
        destination:
          "/destinations/europe/norway/central-norway-and-lofoten/central-norway-and-lofoten-places-to-stay",
      },
      {
        source:
          "/in/destinations/europe/norway/central-norway-and-lofoten/little-island-lighthouse",
        destination:
          "/destinations/europe/norway/central-norway-and-lofoten/central-norway-and-lofoten-places-to-stay",
      },
      {
        source:
          "/destinations/europe/norway/norway-itineraries/the-remote-splendour-of-arctic-norway",
        destination: "/destinations/europe/norway/norway-itineraries",
      },
      {
        source:
          "/us/destinations/europe/norway/norway-itineraries/the-remote-splendour-of-arctic-norway",
        destination: "/destinations/europe/norway/norway-itineraries",
      },
      {
        source:
          "/asia/destinations/europe/norway/norway-itineraries/the-remote-splendour-of-arctic-norway",
        destination: "/destinations/europe/norway/norway-itineraries",
      },
      {
        source:
          "/in/destinations/europe/norway/norway-itineraries/the-remote-splendour-of-arctic-norway",
        destination: "/destinations/europe/norway/norway-itineraries",
      },
      {
        source:
          "/destinations/europe/norway/arctic-norway-and-svalbard/arctic-norway-and-svalbard-itineraries/the-remote-splendour-of-arctic-norway",
        destination:
          "/destinations/europe/norway/arctic-norway-and-svalbard/arctic-norway-and-svalbard-itineraries",
      },
      {
        source:
          "/us/destinations/europe/norway/arctic-norway-and-svalbard/arctic-norway-and-svalbard-itineraries/the-remote-splendour-of-arctic-norway",
        destination:
          "/destinations/europe/norway/arctic-norway-and-svalbard/arctic-norway-and-svalbard-itineraries",
      },
      {
        source:
          "/asia/destinations/europe/norway/arctic-norway-and-svalbard/arctic-norway-and-svalbard-itineraries/the-remote-splendour-of-arctic-norway",
        destination:
          "/destinations/europe/norway/arctic-norway-and-svalbard/arctic-norway-and-svalbard-itineraries",
      },
      {
        source:
          "/in/destinations/europe/norway/arctic-norway-and-svalbard/arctic-norway-and-svalbard-itineraries/the-remote-splendour-of-arctic-norway",
        destination:
          "/destinations/europe/norway/arctic-norway-and-svalbard/arctic-norway-and-svalbard-itineraries",
      },
      {
        source:
          "/destinations/europe/norway/central-norway-and-lofoten/central-norway-and-lofoten-itineraries/the-remote-splendour-of-arctic-norway",
        destination:
          "/destinations/europe/norway/central-norway-and-lofoten/central-norway-and-lofoten-itineraries",
      },
      {
        source:
          "/us/destinations/europe/norway/central-norway-and-lofoten/central-norway-and-lofoten-itineraries/the-remote-splendour-of-arctic-norway",
        destination:
          "/destinations/europe/norway/central-norway-and-lofoten/central-norway-and-lofoten-itineraries",
      },
      {
        source:
          "/asia/destinations/europe/norway/central-norway-and-lofoten/central-norway-and-lofoten-itineraries/the-remote-splendour-of-arctic-norway",
        destination:
          "/destinations/europe/norway/central-norway-and-lofoten/central-norway-and-lofoten-itineraries",
      },
      {
        source:
          "/in/destinations/europe/norway/central-norway-and-lofoten/central-norway-and-lofoten-itineraries/the-remote-splendour-of-arctic-norway",
        destination:
          "/destinations/europe/norway/central-norway-and-lofoten/central-norway-and-lofoten-itineraries",
      },
      {
        source:
          "/destinations/europe/spain/spain-itineraries/sizzling-spain-cities-vineyards-and-coast-self-drive-holiday",
        destination:
          "/destinations/europe/spain/spain-itineraries/spain-gourmet-adventure",
      },
      {
        source:
          "/us/destinations/europe/spain/spain-itineraries/sizzling-spain-cities-vineyards-and-coast-self-drive-holiday",
        destination:
          "/destinations/europe/spain/spain-itineraries/spain-gourmet-adventure",
      },
      {
        source:
          "/asia/destinations/europe/spain/spain-itineraries/sizzling-spain-cities-vineyards-and-coast-self-drive-holiday",
        destination:
          "/destinations/europe/spain/spain-itineraries/spain-gourmet-adventure",
      },
      {
        source:
          "/in/destinations/europe/spain/spain-itineraries/sizzling-spain-cities-vineyards-and-coast-self-drive-holiday",
        destination:
          "/destinations/europe/spain/spain-itineraries/spain-gourmet-adventure",
      },
      {
        source:
          "/destinations/europe/spain/basque-country/basque-country-itineraries/sizzling-spain-cities-vineyards-and-coast-self-drive-holiday",
        destination:
          "/destinations/europe/spain/basque-country/basque-country-itineraries/spain-gourmet-adventure",
      },
      {
        source:
          "/us/destinations/europe/spain/basque-country/basque-country-itineraries/sizzling-spain-cities-vineyards-and-coast-self-drive-holiday",
        destination:
          "/destinations/europe/spain/basque-country/basque-country-itineraries/spain-gourmet-adventure",
      },
      {
        source:
          "/asia/destinations/europe/spain/basque-country/basque-country-itineraries/sizzling-spain-cities-vineyards-and-coast-self-drive-holiday",
        destination:
          "/destinations/europe/spain/basque-country/basque-country-itineraries/spain-gourmet-adventure",
      },
      {
        source:
          "/in/destinations/europe/spain/basque-country/basque-country-itineraries/sizzling-spain-cities-vineyards-and-coast-self-drive-holiday",
        destination:
          "/destinations/europe/spain/basque-country/basque-country-itineraries/spain-gourmet-adventure",
      },
      {
        source:
          "/destinations/europe/spain/madrid/madrid-itineraries/sizzling-spain-cities-vineyards-and-coast-self-drive-holiday",
        destination:
          "/destinations/europe/spain/madrid/madrid-itineraries/spain-gourmet-adventure",
      },
      {
        source:
          "/us/destinations/europe/spain/madrid/madrid-itineraries/sizzling-spain-cities-vineyards-and-coast-self-drive-holiday",
        destination:
          "/destinations/europe/spain/madrid/madrid-itineraries/spain-gourmet-adventure",
      },
      {
        source:
          "/asia/destinations/europe/spain/madrid/madrid-itineraries/sizzling-spain-cities-vineyards-and-coast-self-drive-holiday",
        destination:
          "/destinations/europe/spain/madrid/madrid-itineraries/spain-gourmet-adventure",
      },
      {
        source:
          "/in/destinations/europe/spain/madrid/madrid-itineraries/sizzling-spain-cities-vineyards-and-coast-self-drive-holiday",
        destination:
          "/destinations/europe/spain/madrid/madrid-itineraries/spain-gourmet-adventure",
      },
      {
        source:
          "/destinations/europe/europe-itineraries/sizzling-spain-cities-vineyards-and-coast-self-drive-holiday",
        destination:
          "/destinations/europe/europe-itineraries/spain-gourmet-adventure",
      },
      {
        source:
          "/us/destinations/europe/europe-itineraries/sizzling-spain-cities-vineyards-and-coast-self-drive-holiday",
        destination:
          "/destinations/europe/europe-itineraries/spain-gourmet-adventure",
      },
      {
        source:
          "/asia/destinations/europe/europe-itineraries/sizzling-spain-cities-vineyards-and-coast-self-drive-holiday",
        destination:
          "/destinations/europe/europe-itineraries/spain-gourmet-adventure",
      },
      {
        source:
          "/in/destinations/europe/europe-itineraries/sizzling-spain-cities-vineyards-and-coast-self-drive-holiday",
        destination:
          "/destinations/europe/europe-itineraries/spain-gourmet-adventure",
      },
      {
        source:
          "/destinations/africa/south-africa/kruger-and-private-reserves/garonga-safari-camp",
        destination:
          "/destinations/africa/south-africa/greater-kruger-and-panorama-region/garonga-safari-camp",
      },
      {
        source:
          "/us/destinations/africa/south-africa/kruger-and-private-reserves/garonga-safari-camp",
        destination:
          "/destinations/africa/south-africa/greater-kruger-and-panorama-region/garonga-safari-camp",
      },
      {
        source:
          "/asia/destinations/africa/south-africa/kruger-and-private-reserves/garonga-safari-camp",
        destination:
          "/destinations/africa/south-africa/greater-kruger-and-panorama-region/garonga-safari-camp",
      },
      {
        source:
          "/in/destinations/africa/south-africa/kruger-and-private-reserves/garonga-safari-camp",
        destination:
          "/destinations/africa/south-africa/greater-kruger-and-panorama-region/garonga-safari-camp",
      },
      {
        source:
          "/destinations/europe/norway/bergen-and-the-western-fjords/kongsvold-fjeldstue",
        destination:
          "/destinations/europe/norway/bergen-and-the-western-fjords/bergen-and-the-western-fjords-places-to-stay",
      },
      {
        source:
          "/us/destinations/europe/norway/bergen-and-the-western-fjords/kongsvold-fjeldstue",
        destination:
          "/destinations/europe/norway/bergen-and-the-western-fjords/bergen-and-the-western-fjords-places-to-stay",
      },
      {
        source:
          "/asia/destinations/europe/norway/bergen-and-the-western-fjords/kongsvold-fjeldstue",
        destination:
          "/destinations/europe/norway/bergen-and-the-western-fjords/bergen-and-the-western-fjords-places-to-stay",
      },
      {
        source:
          "/in/destinations/europe/norway/bergen-and-the-western-fjords/kongsvold-fjeldstue",
        destination:
          "/destinations/europe/norway/bergen-and-the-western-fjords/bergen-and-the-western-fjords-places-to-stay",
      },
      {
        source:
          "/destinations/europe/portugal-and-madeira/madeira/choupana-hills-resort-and-spa",
        destination:
          "/destinations/europe/portugal-and-madeira/madeira/madeira-places-to-stay",
      },
      {
        source:
          "/us/destinations/europe/portugal-and-madeira/madeira/choupana-hills-resort-and-spa",
        destination:
          "/destinations/europe/portugal-and-madeira/madeira/madeira-places-to-stay",
      },
      {
        source:
          "/asia/destinations/europe/portugal-and-madeira/madeira/choupana-hills-resort-and-spa",
        destination:
          "/destinations/europe/portugal-and-madeira/madeira/madeira-places-to-stay",
      },
      {
        source:
          "/in/destinations/europe/portugal-and-madeira/madeira/choupana-hills-resort-and-spa",
        destination:
          "/destinations/europe/portugal-and-madeira/madeira/madeira-places-to-stay",
      },
      {
        source:
          "/destinations/south-america/ecuador/amazon-in-ecuador/amazon-in-ecuador-itineraries/the-wildlife-of-ecuador-adventure-holiday-in-the-amazon-and-the-galapagos",
        destination:
          "/destinations/south-america/ecuador-and-galapagos/ecuadorian-amazon/ecuadorian-amazon-itineraries",
      },
      {
        source:
          "/us/destinations/south-america/ecuador/amazon-in-ecuador/amazon-in-ecuador-itineraries/the-wildlife-of-ecuador-adventure-holiday-in-the-amazon-and-the-galapagos",
        destination:
          "/destinations/south-america/ecuador-and-galapagos/ecuadorian-amazon/ecuadorian-amazon-itineraries",
      },
      {
        source:
          "/asia/destinations/south-america/ecuador/amazon-in-ecuador/amazon-in-ecuador-itineraries/the-wildlife-of-ecuador-adventure-holiday-in-the-amazon-and-the-galapagos",
        destination:
          "/destinations/south-america/ecuador-and-galapagos/ecuadorian-amazon/ecuadorian-amazon-itineraries",
      },
      {
        source:
          "/in/destinations/south-america/ecuador/amazon-in-ecuador/amazon-in-ecuador-itineraries/the-wildlife-of-ecuador-adventure-holiday-in-the-amazon-and-the-galapagos",
        destination:
          "/destinations/south-america/ecuador-and-galapagos/ecuadorian-amazon/ecuadorian-amazon-itineraries",
      },
      {
        source:
          "/destinations/south-america/peru/the-amazon-in-peru/the-amazon-in-peru-itineraries/highlights-of-peru-luxury-holiday",
        destination:
          "/destinations/south-america/peru/peruvian-amazon/peruvian-amazon-itineraries",
      },
      {
        source:
          "/us/destinations/south-america/peru/the-amazon-in-peru/the-amazon-in-peru-itineraries/highlights-of-peru-luxury-holiday",
        destination:
          "/destinations/south-america/peru/peruvian-amazon/peruvian-amazon-itineraries",
      },
      {
        source:
          "/asia/destinations/south-america/peru/the-amazon-in-peru/the-amazon-in-peru-itineraries/highlights-of-peru-luxury-holiday",
        destination:
          "/destinations/south-america/peru/peruvian-amazon/peruvian-amazon-itineraries",
      },
      {
        source:
          "/in/destinations/south-america/peru/the-amazon-in-peru/the-amazon-in-peru-itineraries/highlights-of-peru-luxury-holiday",
        destination:
          "/destinations/south-america/peru/peruvian-amazon/peruvian-amazon-itineraries",
      },
      {
        source: "/destinations/indian-ocean/indian-ocean-articles",
        destination: "/destinations/indian-ocean/indian-ocean-blog-posts",
      },
      {
        source: "/us/destinations/europe/uk/uk-articles",
        destination: "/destinations/europe/uk/uk-blog-posts",
      },
      {
        source: "/us/contact-us/enquiry-form",
        destination: "/make-an-enquiry",
      },
      {
        source: "/asia/destinations/africa/zimbabwe/zimbabwe-articles",
        destination: "/destinations/africa/zimbabwe/zimbabwe-blog-posts",
      },
      {
        source: "/asia/destinations/europe/uk/uk-articles",
        destination: "/destinations/europe/uk/uk-blog-posts",
      },
      {
        source:
          "/destinations/north-africa-and-middle-east/uae/jumeirah-beach-and-the-palm/jumeirah-beach-and-the-palm-articles",
        destination:
          "/destinations/north-africa-and-middle-east/uae/jumeirah-beach-and-the-palm/jumeirah-beach-and-the-palm-blog-posts",
      },
      {
        source:
          "/destinations/mexico-and-central-america/mexico/yucatan-and-campeche/hacienda-uayamon",
        destination:
          "/destinations/mexico-and-central-america/mexico/yucatan-and-campeche/yucatan-and-campeche-places-to-stay",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/canada/canada-articles",
        destination:
          "/destinations/north-america-and-caribbean/canada/canada-blog-posts",
      },
      {
        source: "/asia/luxury-foodie-weekend-wine-and-truffles-in-tuscany",
        destination:
          "/destinations/europe/italy/florence-and-tuscany/florence-and-tuscany-itineraries/tuscan-cookery-holiday-in-serious-style",
      },
      {
        source:
          "/us/itineraries/africa/south-africa-a-long-walk-to-freedom-with-nelson-mandela",
        destination:
          "/destinations/africa/south-africa/south-africa-itineraries",
      },
      {
        source:
          "/us/itineraries/europe/the-italian-job-luxury-holiday-in-italy",
        destination:
          "/destinations/europe/europe-itineraries/delicious-italy-in-a-mini-cooper",
      },
      {
        source: "/us/south-australia-food-and-wine/Adelaide.html",
        destination:
          "/destinations/australasia-and-south-pacific/australia/south-australia/south-australia-itineraries/south-australia-culinary-adventure",
      },
      {
        source:
          "/asia/itineraries/africa/luxury-botswana-honeymoon-safari-sunset-on-the-okavango-delta",
        destination:
          "/destinations/africa/africa-itineraries/luxury-botswana-honeymoon-safari-sunset-on-the-okavango-delta",
      },
      {
        source:
          "/us/itineraries/africa/luxury-botswana-honeymoon-safari-sunset-on-the-okavango-delta",
        destination:
          "/destinations/africa/africa-itineraries/luxury-botswana-honeymoon-safari-sunset-on-the-okavango-delta",
      },
      {
        source: "/us/hotels/Elsas-Kopje",
        destination:
          "/destinations/africa/kenya/laikipia-meru-and-central-kenya/elsas-kopje",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/canada/canada-articles",
        destination:
          "/destinations/north-america-and-caribbean/canada/canada-blog-posts",
      },
      {
        source:
          "/in/go-discover/CatchSomeCulture/details/Mekong-Meanders-Thailand-Cambodia-and-Laos-Holiday",
        destination: "/destinations/asia/asia-itineraries",
      },
      {
        source: "/destinations/europe/uk/uk-articles",
        destination: "/destinations/europe/uk/uk-blog-posts",
      },
      {
        source: "/itineraries/australasia/active-family-holiday-to-new-zealand",
        destination:
          "/destinations/australasia-and-south-pacific/australasia-and-south-pacific-itineraries/family-adventure-holiday-to-new-zealand",
      },
      {
        source:
          "/us/go-discover/CatchSomeCulture/details/Mekong-Meanders-Thailand-Cambodia-and-Laos-Holiday",
        destination: "/destinations/asia/asia-itineraries",
      },
      {
        source: "/in/south-australia-food-and-wine/Adelaide.html",
        destination:
          "/destinations/australasia-and-south-pacific/australia/south-australia/south-australia-itineraries/south-australia-culinary-adventure",
      },
      {
        source:
          "/us/itineraries/europe/the-cream-of-croatia-and-montenegro-luxury-couples'-self-drive-holiday",
        destination:
          "/destinations/europe/europe-itineraries/croatia-and-montenegro-in-classic-style",
      },
      {
        source: "/us/hotels/La-Coluccia",
        destination:
          "/destinations/europe/italy/sardinia/sardinia-places-to-stay",
      },
      {
        source:
          "/us/go-discover/railsandsails/details/Luxury-Honeymoon-in-Italy-and-Maldives-Cappuccinos-to-Cocoa-Island",
        destination: "/destinations/europe/italy/italy-itineraries",
      },
      {
        source: "/us/south-america/gourmet-holiday-in-argentina",
        destination:
          "/destinations/south-america/south-america-itineraries/seriously-stylish-gourmet-adventure-to-peru-chile-and-argentina",
      },
      {
        source:
          "/us/go-discover/railsandsails/details/Cigars-Classic-Cars-and-the-Mayan-Riviera-Cuba-and-Mexico-Holiday",
        destination:
          "/destinations/north-america-and-caribbean/cuba/cuba-itineraries",
      },
      {
        source: "/hotels/Elsas-Kopje",
        destination:
          "/destinations/africa/kenya/laikipia-meru-and-central-kenya/elsas-kopje",
      },
      {
        source: "/in/mexico-and-central-america/luxury-costa-rica-honeymoon",
        destination:
          "/destinations/mexico-and-central-america/costa-rica/costa-rica-itineraries/seriously-stylish-honeymoon-to-costa-rica",
      },
      {
        source: "/hotels/Mystique",
        destination: "/destinations/europe/greece/santorini/mystique",
      },
      {
        source:
          "/us/go-discover/wild-and-wonderful/details/Luxury-Cape-Adventure-in-South-Africa",
        destination:
          "/destinations/africa/south-africa/south-africa-itineraries",
      },
      {
        source: "/hotels/House-of-Jasmines",
        destination:
          "/destinations/south-america/argentina/salta-and-northwest-argentina/house-of-jasmines",
      },
      {
        source: "/in/hotels/House-of-Jasmines",
        destination:
          "/destinations/south-america/argentina/salta-and-northwest-argentina/house-of-jasmines",
      },
      {
        source: "/us/hotels/House-of-Jasmines",
        destination:
          "/destinations/south-america/argentina/salta-and-northwest-argentina/house-of-jasmines",
      },
      {
        source:
          "/in/itineraries/europe/the-cream-of-croatia-and-montenegro-luxury-couples'-self-drive-holiday",
        destination:
          "/destinations/europe/europe-itineraries/croatia-and-montenegro-in-classic-style",
      },
      {
        source: "/in/south-america/family-holiday-in-argentina",
        destination:
          "/destinations/south-america/south-america-itineraries/luxury-family-holiday-to-argentina",
      },
      {
        source: "/us/hotels/Mystique",
        destination: "/destinations/europe/greece/santorini/mystique",
      },
      {
        source: "/us/itineraries/europe/honeymoon-in-barcelona-and-ibiza",
        destination:
          "/destinations/europe/europe-itineraries/honeymoon-in-barcelona-and-ibiza",
      },
      {
        source: "/us/south-australia-food-and-wine/Kangaroo-Island.html",
        destination:
          "/destinations/australasia-and-south-pacific/australia/south-australia/south-australia-itineraries/south-australia-culinary-adventure",
      },
      {
        source: "/destinations/south-america/antarctica/antarctica-articles",
        destination:
          "/destinations/south-america/antarctica/antarctica-blog-posts",
      },
      {
        source:
          "/itineraries/africa/mountains-lakes-and-gorilla-trekking-luxury-uganda-safari",
        destination:
          "/destinations/africa/africa-itineraries/mountains-lakes-and-gorilla-trekking-luxury-uganda-safari",
      },
      {
        source: "/asia/contact-us/enquiry-form",
        destination: "/make-an-enquiry",
      },
      {
        source: "/us/hotels/Ol-Malo",
        destination:
          "/destinations/africa/kenya/laikipia-meru-and-central-kenya/ol-malo",
      },
      {
        source: "/destinations/africa/zimbabwe/zimbabwe-articles",
        destination: "/destinations/africa/zimbabwe/zimbabwe-blog-posts",
      },
      {
        source:
          "/destinations/usa-and-canada/new-york-state/new-york-city/the-viceroy",
        destination:
          "/destinations/north-america-and-caribbean/usa/new-york/the-viceroy-new-york",
      },
      {
        source: "/destinations/europe/europe-articles",
        destination: "/destinations/europe/europe-blog-posts",
      },
      {
        source:
          "/asia/itineraries/europe/the-italian-job-luxury-holiday-in-italy",
        destination:
          "/destinations/europe/europe-itineraries/delicious-italy-in-a-mini-cooper",
      },
      {
        source:
          "/Landing/Amazon-Rainforest-Holidays/Inkaterra-Reserva-Amazonica_copy1",
        destination:
          "/destinations/south-america/peru/peruvian-amazon/inkaterra-reserva-amazonica",
      },
      {
        source:
          "/asia/itineraries/africa/south-africa-a-long-walk-to-freedom-with-nelson-mandela",
        destination:
          "/destinations/africa/south-africa/south-africa-itineraries",
      },
      {
        source: "/us/luxury-foodie-weekend-wine-and-truffles-in-tuscany",
        destination:
          "/destinations/europe/italy/florence-and-tuscany/florence-and-tuscany-itineraries/tuscan-cookery-holiday-in-serious-style",
      },
      {
        source:
          "/us/destinations/usa-and-canada/california/california-itineraries/california-highlights-trip-cities-coast-and-yosemite-national-park",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-itineraries/california-in-classic-style",
      },
      {
        source: "/asia/destinations/europe/iceland/iceland-articles",
        destination: "/destinations/europe/iceland/iceland-blog-posts",
      },
      {
        source:
          "/in/Landing/Amazon-Rainforest-Holidays/Inkaterra-Reserva-Amazonica_copy1",
        destination:
          "/destinations/south-america/peru/peruvian-amazon/inkaterra-reserva-amazonica",
      },
      {
        source: "/us/destinations/asia/burma/inle-lake/villa-inle-resort",
        destination:
          "/destinations/asia/burma/inle-lake/villa-inle-resort-and-spa",
      },
      {
        source: "/us/mexico-and-central-america/luxury-costa-rica-honeymoon",
        destination:
          "/destinations/mexico-and-central-america/mexico-and-central-america-itineraries/seriously-stylish-honeymoon-to-costa-rica",
      },
      {
        source:
          "/asia/go-discover/wild-and-wonderful/details/Luxury-Cape-Adventure-in-South-Africa",
        destination:
          "/destinations/africa/south-africa/south-africa-itineraries",
      },
      {
        source:
          "/us/Landing/Amazon-Rainforest-Holidays/Inkaterra-Reserva-Amazonica_copy1",
        destination:
          "/destinations/south-america/peru/peruvian-amazon/inkaterra-reserva-amazonica",
      },
      {
        source:
          "/in/itineraries/south-america/brazil-luxury-tour-havaianas-and-hiking-boots",
        destination: "/destinations/south-america/brazil/brazil-itineraries",
      },
      {
        source:
          "/destinations/usa-and-canada/california/highway-one/the-canary",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/the-canary",
      },
      {
        source:
          "/destinations/usa-and-canada/california/highway-one/carmel-valley-ranch",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/carmel-valley-ranch",
      },
      {
        source: "/destinations/asia/Indonesia/UmaUbud",
        destination: "/destinations/asia/indonesia/bali/uma-by-como-ubud",
      },
      {
        source:
          "/destinations/usa-and-canada/yellowstone-and-the-rockies/the-grand-canyon-and-the-southern-national-parks",
        destination:
          "/destinations/north-america-and-caribbean/usa/usa-regions",
      },
      {
        source: "/us/asia/luxury-foodie-weekend-wine-and-truffles-in-tuscany",
        destination:
          "/destinations/europe/italy/florence-and-tuscany/florence-and-tuscany-itineraries/tuscan-cookery-holiday-in-serious-style",
      },
      {
        source: "/destinations/usa-and-canada/new-england/new-hampshire",
        destination:
          "/destinations/north-america-and-caribbean/usa/new-england",
      },
      {
        source: "/destinations/usa-and-canada/new-england/massachusetts",
        destination:
          "/destinations/north-america-and-caribbean/usa/new-england",
      },
      {
        source: "/asia/itineraries/europe/honeymoon-in-barcelona-and-ibiza",
        destination:
          "/destinations/europe/europe-itineraries/honeymoon-in-barcelona-and-ibiza",
      },
      {
        source:
          "/destinations/usa-and-canada/british-columbia/vancouver-and-the-sunshine-coast/",
        destination:
          "/destinations/north-america-and-caribbean/canada/canada-regions",
      },
      {
        source: "/us/mexico-and-central-america/classic-panama-holiday",
        destination:
          "/destinations/mexico-and-central-america/panama/panama-itineraries",
      },
      {
        source: "/asia/destinations/asia/burma/inle-lake/villa-inle-resort",
        destination:
          "/destinations/asia/burma/inle-lake/villa-inle-resort-and-spa",
      },
      {
        source: "/destinations/asia/Vietnam/Itineraries-Vietnam",
        destination: "/destinations/asia/vietnam/vietnam-itineraries",
      },
      {
        source: "/us/destinations/asia/Vietnam/Itineraries-Vietnam",
        destination: "/destinations/asia/vietnam/vietnam-itineraries",
      },
      {
        source: "/asia/destinations/asia/Vietnam/Itineraries-Vietnam",
        destination: "/destinations/asia/vietnam/vietnam-itineraries",
      },
      {
        source: "/in/destinations/asia/Vietnam/Itineraries-Vietnam",
        destination: "/destinations/asia/vietnam/vietnam-itineraries",
      },
      {
        source:
          "/asia/destinations/usa-and-canada/california/california-itineraries/california-highlights-trip-cities-coast-and-yosemite-national-park",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-itineraries/california-in-classic-style",
      },
      {
        source: "/itineraries/europe/the-italian-job-luxury-holiday-in-italy",
        destination:
          "/destinations/europe/europe-itineraries/delicious-italy-in-a-mini-cooper",
      },
      {
        source:
          "/south-america/giants-of-chile-easter-island-and-atacama-desert-holiday",
        destination:
          "/destinations/south-america/south-america-itineraries/giants-of-chile-easter-island-and-atacama-desert-holiday",
      },
      {
        source: "/mexico-and-central-america/classic-panama-holiday",
        destination:
          "/destinations/mexico-and-central-america/panama/panama-itineraries",
      },
      {
        source:
          "/itineraries/africa/luxury-botswana-honeymoon-safari-sunset-on-the-okavango-delta/",
        destination:
          "/destinations/africa/africa-itineraries/luxury-botswana-honeymoon-safari-sunset-on-the-okavango-delta",
      },
      {
        source: "/itineraries/europe/honeymoon-in-barcelona-and-ibiza",
        destination:
          "/destinations/europe/europe-itineraries/honeymoon-in-barcelona-and-ibiza",
      },
      {
        source: "/south-america/family-holiday-in-argentina",
        destination:
          "/destinations/south-america/south-america-itineraries/luxury-family-holiday-to-argentina",
      },
      {
        source:
          "/us/destinations/south-america/ecuador-itineraries/equestrian-ecuador-horse-riding-holiday-in-the-andes",
        destination:
          "/destinations/south-america/ecuador-and-galapagos/ecuador-and-galapagos-itineraries",
      },
      {
        source: "/us/landing/luxury-family-vacations-to-australia/",
        destination:
          "/destinations/australasia-and-south-pacific/australia/australia-itineraries",
      },
      {
        source:
          "/go-discover/CatchSomeCulture/details/Mekong-Meanders-Thailand-Cambodia-and-Laos-Holiday",
        destination: "/destinations/asia/asia-itineraries",
      },
      {
        source:
          "/itineraries/africa/south-africa-a-long-walk-to-freedom-with-nelson-mandela",
        destination:
          "/destinations/africa/south-africa/south-africa-itineraries",
      },
      {
        source:
          "/south-east-asia/the-ultimate-indonesia-holiday-luxury-island-hopping-adventure",
        destination: "/destinations/asia/indonesia/indonesia-itineraries",
      },
      {
        source: "/landing/riding-safaris-landing/",
        destination: "/destinations/africa/africa-itineraries",
      },
      {
        source:
          "/us/destinations/south-america/bolivia-itineraries/adventure-to-peru-and-bolivia",
        destination:
          "/destinations/south-america/bolivia/bolivia-itineraries/adventure-to-peru-and-bolivia",
      },
      {
        source:
          "/destinations/europe/spain/spain-itineraries/luxury-holiday-in-spain-oranges-and-olive-groves",
        destination: "/destinations/europe/spain/spain-itineraries",
      },
      {
        source:
          "/us/destinations/europe/spain/spain-itineraries/luxury-holiday-in-spain-oranges-and-olive-groves",
        destination: "/destinations/europe/spain/spain-itineraries",
      },
      {
        source:
          "/asia/destinations/europe/spain/spain-itineraries/luxury-holiday-in-spain-oranges-and-olive-groves",
        destination: "/destinations/europe/spain/spain-itineraries",
      },
      {
        source:
          "/in/destinations/europe/spain/spain-itineraries/luxury-holiday-in-spain-oranges-and-olive-groves",
        destination: "/destinations/europe/spain/spain-itineraries",
      },
      {
        source: "/destinations/europe/spain/andalucia/corral-del-rey",
        destination: "/destinations/europe/spain/seville/corral-del-rey",
      },
      {
        source: "/us/destinations/europe/spain/andalucia/corral-del-rey",
        destination: "/destinations/europe/spain/seville/corral-del-rey",
      },
      {
        source: "/asia/destinations/europe/spain/andalucia/corral-del-rey",
        destination: "/destinations/europe/spain/seville/corral-del-rey",
      },
      {
        source: "/in/destinations/europe/spain/andalucia/corral-del-rey",
        destination: "/destinations/europe/spain/seville/corral-del-rey",
      },
      {
        source:
          "/destinations/europe/spain/andalucia/hotel-hospes-las-casas-del-rey-de-baeza",
        destination:
          "/destinations/europe/spain/seville/hotel-hospes-las-casas-del-rey-de-baeza",
      },
      {
        source:
          "/us/destinations/europe/spain/andalucia/hotel-hospes-las-casas-del-rey-de-baeza",
        destination:
          "/destinations/europe/spain/seville/hotel-hospes-las-casas-del-rey-de-baeza",
      },
      {
        source:
          "/asia/destinations/europe/spain/andalucia/hotel-hospes-las-casas-del-rey-de-baeza",
        destination:
          "/destinations/europe/spain/seville/hotel-hospes-las-casas-del-rey-de-baeza",
      },
      {
        source:
          "/in/destinations/europe/spain/andalucia/hotel-hospes-las-casas-del-rey-de-baeza",
        destination:
          "/destinations/europe/spain/seville/hotel-hospes-las-casas-del-rey-de-baeza",
      },
      {
        source: "/destinations/europe/spain/andalucia/marbella-club",
        destination: "/destinations/europe/spain/costa-del-sol/marbella-club",
      },
      {
        source: "/us/destinations/europe/spain/andalucia/marbella-club",
        destination: "/destinations/europe/spain/costa-del-sol/marbella-club",
      },
      {
        source: "/asia/destinations/europe/spain/andalucia/marbella-club",
        destination: "/destinations/europe/spain/costa-del-sol/marbella-club",
      },
      {
        source: "/in/destinations/europe/spain/andalucia/marbella-club",
        destination: "/destinations/europe/spain/costa-del-sol/marbella-club",
      },
      {
        source:
          "/destinations/europe/spain/andalucia/villa-padierna-palace-hotel",
        destination:
          "/destinations/europe/spain/costa-del-sol/villa-padierna-palace-hotel",
      },
      {
        source:
          "/us/destinations/europe/spain/andalucia/villa-padierna-palace-hotel",
        destination:
          "/destinations/europe/spain/costa-del-sol/villa-padierna-palace-hotel",
      },
      {
        source:
          "/asia/destinations/europe/spain/andalucia/villa-padierna-palace-hotel",
        destination:
          "/destinations/europe/spain/costa-del-sol/villa-padierna-palace-hotel",
      },
      {
        source:
          "/in/destinations/europe/spain/andalucia/villa-padierna-palace-hotel",
        destination:
          "/destinations/europe/spain/costa-del-sol/villa-padierna-palace-hotel",
      },
      {
        source:
          "/destinations/europe/italy/sicily-and-aeolian-islands/hotel-gutkowski",
        destination:
          "/destinations/europe/italy/sicily-and-aeolian-islands/sicily-and-aeolian-islands-places-to-stay",
      },
      {
        source:
          "/us/destinations/europe/italy/sicily-and-aeolian-islands/hotel-gutkowski",
        destination:
          "/destinations/europe/italy/sicily-and-aeolian-islands/sicily-and-aeolian-islands-places-to-stay",
      },
      {
        source:
          "/asia/destinations/europe/italy/sicily-and-aeolian-islands/hotel-gutkowski",
        destination:
          "/destinations/europe/italy/sicily-and-aeolian-islands/sicily-and-aeolian-islands-places-to-stay",
      },
      {
        source:
          "/in/destinations/europe/italy/sicily-and-aeolian-islands/hotel-gutkowski",
        destination:
          "/destinations/europe/italy/sicily-and-aeolian-islands/sicily-and-aeolian-islands-places-to-stay",
      },
      {
        source:
          "/destinations/mexico-and-central-america/belize/forest-and-jungle-lodges/belcampo",
        destination:
          "/destinations/mexico-and-central-america/belize/forest-and-jungle-lodges/copal-tree-lodge",
      },
      {
        source:
          "/us/destinations/mexico-and-central-america/belize/forest-and-jungle-lodges/belcampo",
        destination:
          "/destinations/mexico-and-central-america/belize/forest-and-jungle-lodges/copal-tree-lodge",
      },
      {
        source:
          "/asia/destinations/mexico-and-central-america/belize/forest-and-jungle-lodges/belcampo",
        destination:
          "/destinations/mexico-and-central-america/belize/forest-and-jungle-lodges/copal-tree-lodge",
      },
      {
        source:
          "/in/destinations/mexico-and-central-america/belize/forest-and-jungle-lodges/belcampo",
        destination:
          "/destinations/mexico-and-central-america/belize/forest-and-jungle-lodges/copal-tree-lodge",
      },
      {
        source:
          "/destinations/europe/greece/central-and-northern-greece/sani-resort",
        destination:
          "/destinations/europe/greece/central-and-northern-greece/sani-beach-hotel",
      },
      {
        source:
          "/us/destinations/europe/greece/central-and-northern-greece/sani-resort",
        destination:
          "/destinations/europe/greece/central-and-northern-greece/sani-beach-hotel",
      },
      {
        source:
          "/asia/destinations/europe/greece/central-and-northern-greece/sani-resort",
        destination:
          "/destinations/europe/greece/central-and-northern-greece/sani-beach-hotel",
      },
      {
        source:
          "/in/destinations/europe/greece/central-and-northern-greece/sani-resort",
        destination:
          "/destinations/europe/greece/central-and-northern-greece/sani-beach-hotel",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/canada/canada-itineraries/family-road-trip-to-british-columbia",
        destination:
          "/destinations/north-america-and-caribbean/canada/canada-itineraries/western-canada-road-trip-for-families",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/canada/canada-itineraries/family-road-trip-to-british-columbia",
        destination:
          "/destinations/north-america-and-caribbean/canada/canada-itineraries/western-canada-road-trip-for-families",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/canada/canada-itineraries/family-road-trip-to-british-columbia",
        destination:
          "/destinations/north-america-and-caribbean/canada/canada-itineraries/western-canada-road-trip-for-families",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/canada/canada-itineraries/family-road-trip-to-british-columbia",
        destination:
          "/destinations/north-america-and-caribbean/canada/canada-itineraries/western-canada-road-trip-for-families",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/canada/canada-itineraries/heli-hiking-escape-to-the-canadian-rockies",
        destination:
          "/destinations/north-america-and-caribbean/canada/canada-itineraries",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/canada/canada-itineraries/heli-hiking-escape-to-the-canadian-rockies",
        destination:
          "/destinations/north-america-and-caribbean/canada/canada-itineraries",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/canada/canada-itineraries/heli-hiking-escape-to-the-canadian-rockies",
        destination:
          "/destinations/north-america-and-caribbean/canada/canada-itineraries",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/canada/canada-itineraries/heli-hiking-escape-to-the-canadian-rockies",
        destination:
          "/destinations/north-america-and-caribbean/canada/canada-itineraries",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/canada/canada-itineraries/cultural-escape-to-canadas-mystical-haida-gwaii",
        destination:
          "/destinations/north-america-and-caribbean/canada/canada-itineraries",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/canada/canada-itineraries/cultural-escape-to-canadas-mystical-haida-gwaii",
        destination:
          "/destinations/north-america-and-caribbean/canada/canada-itineraries",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/canada/canada-itineraries/cultural-escape-to-canadas-mystical-haida-gwaii",
        destination:
          "/destinations/north-america-and-caribbean/canada/canada-itineraries",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/canada/canada-itineraries/cultural-escape-to-canadas-mystical-haida-gwaii",
        destination:
          "/destinations/north-america-and-caribbean/canada/canada-itineraries",
      },
      {
        source:
          "/destinations/mexico-and-central-america/mexico/mexico-city-and-around/condesa-df",
        destination:
          "/destinations/mexico-and-central-america/mexico/mexico-city-and-around/mexico-city-and-around-places-to-stay",
      },
      {
        source:
          "/us/destinations/mexico-and-central-america/mexico/mexico-city-and-around/condesa-df",
        destination:
          "/destinations/mexico-and-central-america/mexico/mexico-city-and-around/mexico-city-and-around-places-to-stay",
      },
      {
        source:
          "/asia/destinations/mexico-and-central-america/mexico/mexico-city-and-around/condesa-df",
        destination:
          "/destinations/mexico-and-central-america/mexico/mexico-city-and-around/mexico-city-and-around-places-to-stay",
      },
      {
        source:
          "/in/destinations/mexico-and-central-america/mexico/mexico-city-and-around/condesa-df",
        destination:
          "/destinations/mexico-and-central-america/mexico/mexico-city-and-around/mexico-city-and-around-places-to-stay",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/usa/california/the-inn-at-furnace-creek",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/the-inn-at-death-valley",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/usa/california/the-inn-at-furnace-creek",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/the-inn-at-death-valley",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/usa/california/the-inn-at-furnace-creek",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/the-inn-at-death-valley",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/usa/california/the-inn-at-furnace-creek",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/the-inn-at-death-valley",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/usa/california/the-ranch-at-furnace-creek",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/the-ranch-at-death-valley",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/usa/california/the-ranch-at-furnace-creek",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/the-ranch-at-death-valley",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/usa/california/the-ranch-at-furnace-creek",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/the-ranch-at-death-valley",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/usa/california/the-ranch-at-furnace-creek",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/the-ranch-at-death-valley",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/usa/california/the-georgian",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/usa/california/the-georgian",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/usa/california/the-georgian",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/usa/california/the-georgian",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/usa/california/the-redbury",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/usa/california/the-redbury",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/usa/california/the-redbury",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/usa/california/the-redbury",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/usa/california/shade-manhattan-beach",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/usa/california/shade-manhattan-beach",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/usa/california/shade-manhattan-beach",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/usa/california/shade-manhattan-beach",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/usa/california/luxe-rodeo-drive",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/usa/california/luxe-rodeo-drive",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/usa/california/luxe-rodeo-drive",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/usa/california/luxe-rodeo-drive",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/usa/california/chateau-du-sureau",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/usa/california/chateau-du-sureau",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/usa/california/chateau-du-sureau",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/usa/california/chateau-du-sureau",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/usa/california/the-clift",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/usa/california/the-clift",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/usa/california/the-clift",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/usa/california/the-clift",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/usa/california/the-ace",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/usa/california/the-ace",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/usa/california/the-ace",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/usa/california/the-ace",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/usa/california/olea-hotel",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/usa/california/olea-hotel",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/usa/california/olea-hotel",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/usa/california/olea-hotel",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/destinations/north-america-and-caribbean/usa/california/timber-cove-inn",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/us/destinations/north-america-and-caribbean/usa/california/timber-cove-inn",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/asia/destinations/north-america-and-caribbean/usa/california/timber-cove-inn",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/in/destinations/north-america-and-caribbean/usa/california/timber-cove-inn",
        destination:
          "/destinations/north-america-and-caribbean/usa/california/california-places-to-stay",
      },
      {
        source:
          "/destinations/asia/china/beijing-and-northern-china/the-red-wall-garden",
        destination:
          "/destinations/asia/china/beijing-and-northern-china/beijing-and-northern-china-places-to-stay",
      },
      {
        source:
          "/us/destinations/asia/china/beijing-and-northern-china/the-red-wall-garden",
        destination:
          "/destinations/asia/china/beijing-and-northern-china/beijing-and-northern-china-places-to-stay",
      },
      {
        source:
          "/asia/destinations/asia/china/beijing-and-northern-china/the-red-wall-garden",
        destination:
          "/destinations/asia/china/beijing-and-northern-china/beijing-and-northern-china-places-to-stay",
      },
      {
        source:
          "/in/destinations/asia/china/beijing-and-northern-china/the-red-wall-garden",
        destination:
          "/destinations/asia/china/beijing-and-northern-china/beijing-and-northern-china-places-to-stay",
      },
      {
        source:
          "/destinations/africa/namibia/etosha-national-park/andersson-s-camp",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-places-to-stay",
      },
      {
        source:
          "/us/destinations/africa/namibia/etosha-national-park/andersson-s-camp",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-places-to-stay",
      },
      {
        source:
          "/asia/destinations/africa/namibia/etosha-national-park/andersson-s-camp",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-places-to-stay",
      },
      {
        source:
          "/in/destinations/africa/namibia/etosha-national-park/andersson-s-camp",
        destination:
          "/destinations/africa/namibia/etosha-national-park/etosha-national-park-places-to-stay",
      },
      {
        source:
          "/destinations/africa/namibia/namibia-itineraries/diverse-namibia-safari-small-guided-group-tour-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/us/destinations/africa/namibia/namibia-itineraries/diverse-namibia-safari-small-guided-group-tour-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/asia/destinations/africa/namibia/namibia-itineraries/diverse-namibia-safari-small-guided-group-tour-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },
      {
        source:
          "/in/destinations/africa/namibia/namibia-itineraries/diverse-namibia-safari-small-guided-group-tour-to-sossusvlei-swakopmund-damaraland-and-etosha-national-park",
        destination: "/destinations/africa/namibia/namibia-itineraries",
      },

      ///////////////////////////////////////////////////////////////////////////////////////////////////////
      //index page
      { source: "/uk", destination: "/" },
      { source: "/us", destination: "/" },
      { source: "/asia", destination: "/" },
      { source: "/in", destination: "/" },

      // pdf/bookingforms
      { source: "/pdf/bookingforms", destination: "/pdf/bookingforms" },
      { source: "/us/pdf/bookingforms", destination: "/pdf/bookingforms" },
      { source: "/asia/pdf/bookingforms", destination: "/pdf/bookingforms" },
      { source: "/in/pdf/bookingforms", destination: "/pdf/bookingforms" },

      // destinations
      { source: "/destinations", destination: "/destinations" },
      { source: "/us/destinations", destination: "/destinations" },
      { source: "/asia/destinations", destination: "/destinations" },
      { source: "/in/destinations", destination: "/destinations" },

      // continent
      { source: "/destinations/:continent", destination: "/continent" },
      { source: "/us/destinations/:continent", destination: "/continent" },
      { source: "/asia/destinations/:continent", destination: "/continent" },
      { source: "/in/destinations/:continent", destination: "/continent" },

      // continentcountries
      {
        source: "/destinations/:continent/:continentSlug-countries",
        destination: "/continent",
      },
      {
        source: "/us/destinations/:continent/:continentSlug-countries",
        destination: "/continent",
      },
      {
        source: "/asia/destinations/:continent/:continentSlug-countries",
        destination: "/continent",
      },
      {
        source: "/in/destinations/:continent/:continentSlug-countries",
        destination: "/continent",
      },

      // continentexperiences
      {
        source: "/continentexperiences",
        destination: "/continentexperiences",
      },
      {
        source: "/us/continentexperiences",
        destination: "/continentexperiences",
      },
      {
        source: "/asia/continentexperiences",
        destination: "/continentexperiences",
      },
      {
        source: "/in/continentexperiences",
        destination: "/continentexperiences",
      },

      // continentitineraries
      {
        source: "/destinations/:continent/:continentSlug-itineraries",
        destination: "/continent",
      },
      {
        source: "/us/destinations/:continent/:continentSlug-itineraries",
        destination: "/continent",
      },
      {
        source: "/asia/destinations/:continent/:continentSlug-itineraries",
        destination: "/continent",
      },
      {
        source: "/in/destinations/:continent/:continentSlug-itineraries",
        destination: "/continent",
      },

      // continentplacetostay
      {
        source: "/destinations/:continent/:continentSlug-places-to-stay",
        destination: "/continent",
      },
      {
        source: "/us/destinations/:continent/:continentSlug-places-to-stay",
        destination: "/continent",
      },
      {
        source: "/asia/destinations/:continent/:continentSlug-places-to-stay",
        destination: "/continent",
      },
      {
        source: "/in/destinations/:continent/:continentSlug-places-to-stay",
        destination: "/continent",
      },

      // country
      {
        source: "/destinations/:continent/:country",
        destination: "/country",
      },
      {
        source: "/us/destinations/:continent/:country",
        destination: "/country",
      },
      {
        source: "/asia/destinations/:continent/:country",
        destination: "/country",
      },
      {
        source: "/in/destinations/:continent/:country",
        destination: "/country",
      },

      // countryregions
      {
        source: "/destinations/:continent/:country/:countrySlug-regions",
        destination: "/country",
      },
      {
        source: "/us/destinations/:continent/:country/:countrySlug-regions",
        destination: "/country",
      },
      {
        source: "/asia/destinations/:continent/:country/:countrySlug-regions",
        destination: "/country",
      },
      {
        source: "/in/destinations/:continent/:country/:countrySlug-regions",
        destination: "/country",
      },

      // countryitineraries
      {
        source: "/destinations/:continent/:country/:countrySlug-itineraries",
        destination: "/country",
      },
      {
        source: "/us/destinations/:continent/:country/:countrySlug-itineraries",
        destination: "/country",
      },
      {
        source:
          "/asia/destinations/:continent/:country/:countrySlug-itineraries",
        destination: "/country",
      },
      {
        source: "/in/destinations/:continent/:country/:countrySlug-itineraries",
        destination: "/country",
      },

      // countrywhentogo
      {
        source: "/destinations/:continent/:country/:countrySlug-when-to-go",
        destination: "/country",
      },
      {
        source: "/us/destinations/:continent/:country/:countrySlug-when-to-go",
        destination: "/country",
      },
      {
        source:
          "/asia/destinations/:continent/:country/:countrySlug-when-to-go",
        destination: "/country",
      },
      {
        source: "/in/destinations/:continent/:country/:countrySlug-when-to-go",
        destination: "/country",
      },

      // countryplacestostay
      {
        source: "/destinations/:continent/:country/:countrySlug-places-to-stay",
        destination: "/country",
      },
      {
        source:
          "/us/destinations/:continent/:country/:countrySlug-places-to-stay",
        destination: "/country",
      },
      {
        source:
          "/asia/destinations/:continent/:country/:countrySlug-places-to-stay",
        destination: "/country",
      },
      {
        source:
          "/in/destinations/:continent/:country/:countrySlug-places-to-stay",
        destination: "/country",
      },

      // country_details
      {
        source: "/destinations/:continent/:country",
        destination: "/country_details",
      },
      {
        source: "/us/destinations/:continent/:country",
        destination: "/country_details",
      },
      {
        source: "/asia/destinations/:continent/:country",
        destination: "/country_details",
      },
      {
        source: "/in/destinations/:continent/:country",
        destination: "/country_details",
      },

      // region_details
      {
        source: "/destinations/:continent/:country/:region",
        destination: "/regions",
      },
      {
        source: "/us/destinations/:continent/:country/:region",
        destination: "/regions",
      },
      {
        source: "/asia/destinations/:continent/:country/:region",
        destination: "/regions",
      },
      {
        source: "/in/destinations/:continent/:country/:region",
        destination: "/regions",
      },

      // holiday-types
      { source: "/holiday-types", destination: "/holiday-types" },
      { source: "/us/holiday-types", destination: "/holiday-types" },
      { source: "/asia/holiday-types", destination: "/holiday-types" },
      { source: "/in/holiday-types", destination: "/holiday-types" },

      // holidaytypeitineraries
      {
        source:
          "/holiday-types/:holidaytypeitineraries/:holidaytypeitineraries-itineraries",
        destination: "/holidaytypeitineraries",
      },
      {
        source:
          "/us/holiday-types/:holidaytypeitineraries/:holidaytypeitineraries-itineraries",
        destination: "/holidaytypeitineraries",
      },
      {
        source:
          "/asia/holiday-types/:holidaytypeitineraries/:holidaytypeitineraries-itineraries",
        destination: "/holidaytypeitineraries",
      },
      {
        source:
          "/in/holiday-types/:holidaytypeitineraries/:holidaytypeitineraries-itineraries",
        destination: "/holidaytypeitineraries",
      },

      // holidaytypeideas
      {
        source: "/holiday-types/:holidaytypeitineraries/:holidaytypeideas",
        destination: "/holidaytypeideas",
      },
      {
        source: "/us/holiday-types/:holidaytypeitineraries/:holidaytypeideas",
        destination: "/holidaytypeideas",
      },
      {
        source: "/asia/holiday-types/:holidaytypeitineraries/:holidaytypeideas",
        destination: "/holidaytypeideas",
      },
      {
        source: "/in/holiday-types/:holidaytypeitineraries/:holidaytypeideas",
        destination: "/holidaytypeideas",
      },

      // holidaytypegroups
      {
        source: "/holiday-types/:holidaytypegroup",
        destination: "/holidaytypegroup",
      },
      {
        source: "/us/holiday-types/:holidaytypegroup",
        destination: "/holidaytypegroup",
      },
      {
        source: "/asia/holiday-types/:holidaytypegroup",
        destination: "/holidaytypegroup",
      },
      {
        source: "/in/holiday-types/:holidaytypegroup",
        destination: "/holidaytypegroup",
      },

      // special-offers
      { source: "/special-offers", destination: "/special-offers" },
      { source: "/us/special-offers", destination: "/special-offers" },
      { source: "/asia/special-offers", destination: "/special-offers" },
      { source: "/in/special-offers", destination: "/special-offers" },

      // itinerarydetail
      {
        source:
          "/destinations/:continent/itinerary/:country/:itineraries/:itineraryName?",
        destination: "/itinerarydetail",
      },
      {
        source:
          "/us/destinations/:continent/itinerary/:country/:itineraries/:itineraryName?",
        destination: "/itinerarydetail",
      },
      {
        source:
          "/asia/destinations/:continent/itinerary/:country/:itineraries/:itineraryName?",
        destination: "/itinerarydetail",
      },
      {
        source:
          "/in/destinations/:continent/itinerary/:country/:itineraries/:itineraryName?",
        destination: "/itinerarydetail",
      },

      //
      {
        source:
          "/destinations/:continent/:country/:itineraries/:itineraryName?",
        destination: "/itinerarydetail",
      },
      {
        source:
          "/us/destinations/:continent/:country/:itineraries/:itineraryName?",
        destination: "/itinerarydetail",
      },
      {
        source:
          "/asia/destinations/:continent/:country/:itineraries/:itineraryName?",
        destination: "/itinerarydetail",
      },
      {
        source:
          "/in/destinations/:continent/:country/:itineraries/:itineraryName?",
        destination: "/itinerarydetail",
      },
      // advance search
      { source: "/advance-search", destination: "/advance-search" },
      { source: "/us/advance-search", destination: "/advance-search" },
      { source: "/asia/advance-search", destination: "/advance-search" },
      { source: "/in/advance-search", destination: "/advance-search" },

      //Why-Us advance search
      { source: "/advance-search", destination: "/advance-search" },
      {
        source: "/why-us/advance-search",
        destination: "/us/advance-search",
      },
      { source: "/why-us/advance-search", destination: "/asia/advance-search" },
      { source: "/why-us/advance-search", destination: "/in/advance-search" },

      // contact-us
      { source: "/contact-us", destination: "/contact-us" },
      { source: "/us/contact-us", destination: "/contact-us" },
      { source: "/asia/contact-us", destination: "/contact-us" },
      { source: "/in/contact-us", destination: "/contact-us" },

      // make-an-enquiry
      { source: "/make-an-enquiry", destination: "/make-an-enquiry" },
      { source: "/us/make-an-enquiry", destination: "/make-an-enquiry" },
      { source: "/asia/make-an-enquiry", destination: "/make-an-enquiry" },
      { source: "/in/make-an-enquiry", destination: "/make-an-enquiry" },

      // client-reviews
      { source: "/why-us/client-reviews", destination: "/client-reviews" },
      { source: "/us/why-us/client-reviews", destination: "/client-reviews" },
      { source: "/asia/why-us/client-reviews", destination: "/client-reviews" },
      { source: "/in/why-us/client-reviews", destination: "/client-reviews" },

      // special-offers

      // hotel-detail
      {
        source: "/destinations/:continent/hotels/:country/:location/:hotelName",
        destination: "/hotel-detail",
      },
      {
        source:
          "/us/destinations/:continent/hotels/:country/:location/:hotelName",
        destination: "/hotel-detail",
      },
      {
        source:
          "/asia/destinations/:continent/hotels/:country/:location/:hotelName",
        destination: "/hotel-detail",
      },
      {
        source:
          "/in/destinations/:continent/hotels/:country/:location/:hotelName",
        destination: "/hotel-detail",
      },

      // Blog
      { source: "/blog", destination: "/blog" },
      { source: "/us/blog", destination: "/blog" },
      { source: "/asia/blog", destination: "/blog" },
      { source: "/in/blog", destination: "/blog" },

      // blog-detail
      { source: "/blog/:blogdetail", destination: "/blog-detail" },
      { source: "/us/blog/:blogdetail", destination: "/blog-detail" },
      { source: "/asia/blog/:blogdetail", destination: "/blog-detail" },
      { source: "/in/blog/:blogdetail", destination: "/blog-detail" },

      // blog-detail
      { source: "/blog/:blogdetail", destination: "/blog-detail" },
      { source: "/us/blog/:blogdetail", destination: "/blog-detail" },
      { source: "/asia/blog/:blogdetail", destination: "/blog-detail" },
      { source: "/in/blog/:blogdetail", destination: "/blog-detail" },

      // why-us
      { source: "/why-us", destination: "/why-us" },
      { source: "/us/why-us", destination: "/why-us" },
      { source: "/asia/why-us", destination: "/why-us" },
      { source: "/in/why-us", destination: "/why-us" },

      // our people
      { source: "/why-us/our-people", destination: "/why-us/our-people" },
      { source: "/us/why-us/our-people", destination: "/why-us/our-people" },
      { source: "/asia/why-us/our-people", destination: "/why-us/our-people" },
      { source: "/in/why-us/our-people", destination: "/why-us/our-people" },

      // our people detail
      {
        source: "/why-us/our-people/:executiveName",
        destination: "/why-us/our-people/travel-expert-detail",
      },
      {
        source: "/us/why-us/our-people/:executiveName",
        destination: "/why-us/our-people/travel-expert-detail",
      },
      {
        source: "/asia/why-us/our-people/:executiveName",
        destination: "/why-us/our-people/travel-expert-detail",
      },
      {
        source: "/in/why-us/our-people/:executiveName",
        destination: "/why-us/our-people/travel-expert-detail",
      },

      // where-to-go-detail
      {
        source: "/where-to-go/:where-to-go-detail",
        destination: "/where-to-go/where-to-go-detail",
      },
      {
        source: "/us/where-to-go/:where-to-go-detail",
        destination: "/where-to-go/where-to-go-detail",
      },
      {
        source: "/asia/where-to-go/:where-to-go-detail",
        destination: "/where-to-go/where-to-go-detail",
      },
      {
        source: "/in/where-to-go/:where-to-go-detail",
        destination: "/where-to-go/where-to-go-detail",
      },

      // about-us
      { source: "/about-us", destination: "/about-us" },
      { source: "/us/about-us", destination: "/about-us" },
      { source: "/asia/about-us", destination: "/about-us" },
      { source: "/in/about-us", destination: "/about-us" },

      // where-to-go
      { source: "/where-to-go", destination: "/where-to-go" },
      { source: "/us/where-to-go", destination: "/where-to-go" },
      { source: "/asia/where-to-go", destination: "/where-to-go" },
      { source: "/in/where-to-go", destination: "/where-to-go" },

      // careers
      { source: "/about-us/careers", destination: "/about-us/careers" },
      { source: "/us/about-us/careers", destination: "/about-us/careers" },
      { source: "/asia/about-us/careers", destination: "/about-us/careers" },
      { source: "/in/about-us/careers", destination: "/about-us/careers" },

      // search
      { source: "/search", destination: "/search" },
      { source: "/us/search", destination: "/search" },
      { source: "/asia/search", destination: "/search" },
      { source: "/in/search", destination: "/search" },

      // creating-your-trip
      {
        source: "/about-us/creating-your-trip",
        destination: "/about-us/creating-your-trip",
      },
      {
        source: "/us/about-us/creating-your-trip",
        destination: "/about-us/creating-your-trip",
      },
      {
        source: "/asia/about-us/creating-your-trip",
        destination: "/about-us/creating-your-trip",
      },
      {
        source: "/in/about-us/creating-your-trip",
        destination: "/about-us/creating-your-trip",
      },

      // gift-list
      {
        source: "/about-us/about-gift-list",
        destination: "/about-us/about-gift-list",
      },
      {
        source: "/us/about-us/about-gift-list",
        destination: "/about-us/about-gift-list",
      },
      {
        source: "/asia/about-us/about-gift-list",
        destination: "/about-us/about-gift-list",
      },
      {
        source: "/in/about-us/about-gift-list",
        destination: "/about-us/about-gift-list",
      },

      // referral
      {
        source: "/about-us/friend-referral-offer",
        destination: "/about-us/friend-referral-offer",
      },
      {
        source: "/us/about-us/friend-referral-offer",
        destination: "/about-us/friend-referral-offer",
      },
      {
        source: "/asia/about-us/friend-referral-offer",
        destination: "/about-us/friend-referral-offer",
      },
      {
        source: "/in/about-us/friend-referral-offer",
        destination: "/about-us/friend-referral-offer",
      },

      // Thank you
      {
        source: "/make-an-enquiry/thankyou",
        destination: "/make-an-enquiry/thankyou",
      },
      {
        source: "/us/make-an-enquiry/thankyou",
        destination: "/make-an-enquiry/thankyou",
      },
      {
        source: "/asia/make-an-enquiry/thankyou",
        destination: "/make-an-enquiry/thankyou",
      },
      {
        source: "/in/make-an-enquiry/thankyou",
        destination: "/make-an-enquiry/thankyou",
      },

      // Contact-Us Thank you
      {
        source: "/contact-us/thankyou",
        destination: "/contact-us/thankyou",
      },
      {
        source: "/us/contact-us/thankyou",
        destination: "/contact-us/thankyou",
      },
      {
        source: "/asia/contact-us/thankyou",
        destination: "/contact-us/thankyou",
      },
      {
        source: "/in/contact-us/thankyou",
        destination: "/contact-us/thankyou",
      },

      // privacy-policy
      { source: "/privacy-policy", destination: "/privacy-policy" },
      { source: "/us/privacy-policy", destination: "/privacy-policy" },
      { source: "/asia/privacy-policy", destination: "/privacy-policy" },
      { source: "/in/privacy-policy", destination: "/privacy-policy" },

      // terms-and-condition
      { source: "/terms-and-conditions", destination: "/terms-and-conditions" },
      {
        source: "/us/terms-and-conditions",
        destination: "/terms-and-conditions",
      },
      {
        source: "/asia/terms-and-conditions",
        destination: "/terms-and-conditions",
      },
      {
        source: "/in/terms-and-conditions",
        destination: "/terms-and-conditions",
      },

      // travel information
      {
        source: "/useful_links",
        destination: "/useful_links",
      },
      {
        source: "/us/useful_links",
        destination: "/useful_links",
      },
      {
        source: "/asiauseful_links",
        destination: "/useful_links",
      },
      {
        source: "/in/useful_links",
        destination: "/useful_links",
      },

      // travel information
      {
        source: "/about-us/useful-links",
        destination: "/travel_information",
      },
      {
        source: "/us/about-us/useful-links",
        destination: "/travel_information",
      },
      {
        source: "/asia/about-us/useful-links",
        destination: "/travel_information",
      },
      {
        source: "/in/about-us/useful-links",
        destination: "/travel_information",
      },

      // coronavirus_information
      {
        source: "/landing/coronavirus",
        destination: "/coronavirus_information",
      },
      {
        source: "/us/landing/coronavirus",
        destination: "/coronavirus_information",
      },
      {
        source: "/asia/landing/coronavirus",
        destination: "/coronavirus_information",
      },
      {
        source: "/in/landing/coronavirus",
        destination: "/coronavirus_information",
      },
      // Define a custom error page for 404 errors
      {
        source: "/:path*",
        destination: "/404",
      },

      // Add more custom routes as needed
    ];
  },
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  serverRuntimeConfig: {
    dbConfig: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "2204", // @@@
      database: "next-js-registration-login-example",
    },
    secret:
      "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? // ? 'https://e922710a-cb11-401b-ae5b-ef73740e1501.mock.pstmn.io' // development api
          // : 'https://e922710a-cb11-401b-ae5b-ef73740e1501.mock.pstmn.io' // production api
          // ? 'http://localhost:4000' // development api
          // : 'http://localhost:4000' // production api
          // ? 'https://mock.apidog.com/m1/379394-0-default' // development api
          // : 'https://mock.apidog.com/m1/379394-0-default' // production api
          //     ? 'http://13.233.122.205:1337' // development api
          //     : 'http://13.233.122.205:1337' // production api

          "https://cms-api.excelleresolutions.com" // development api
        : "https://cms-api.excelleresolutions.com", // production api
    apiUrl1:
      process.env.NODE_ENV === "development"
        ? "http://3.110.223.197:1337" // client data development api
        : "http://3.110.223.197:1337", // client data production api
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

(module.exports = nextConfig),
  withImages({
    // Configure the options for next-images
    images: {
      // Define the directory where your images are stored (default: 'public')
      path: "/public",
    },
  });
