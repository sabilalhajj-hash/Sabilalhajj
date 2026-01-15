import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

const resources = {
  en: {
    translation: {
      navigation: {
        umrah: 'Umrah',
        hajj: 'Hajj',
        flights: 'Flights',
        hotels: 'Hotels',
        visa: 'Visa',
        about: 'About us',
        overview: 'Overview',
        package_options: 'Package Options',
        madinah_itinerary: 'Madinah Itinerary',
        makkah_itinerary: 'Makkah Itinerary',
        terms_policies: 'Terms & Policies',
        responsibility_policy: 'Responsibility Policy',
        options_short: 'Options',
        madinah_short: 'Madinah',
        makkah_short: 'Makkah',
        policies_short: 'Policies',
        responsibility_short: 'Responsibility',
        hajj_info: 'Hajj Information',
        requirements: 'Requirements',
        packages: 'Packages'
      },
      hero: {
        title1: 'Welcome to Sabil Al-Hajj',
        subtitle1: 'Your trusted partner for Hajj and Umrah pilgrimage services. Experience a spiritual journey filled with peace, devotion, and unforgettable memories.',
        cta1_primary: 'Book Your Pilgrimage',
        cta1_secondary: 'Learn More',
        title2: 'Experience Sacred Hajj',
        subtitle2: 'Embark on the most sacred pilgrimage with our expert guidance. Every step of your journey is carefully planned for spiritual fulfillment.',
        cta2_primary: 'Plan Hajj Journey',
        cta2_secondary: 'View Packages',
        title3: 'Discover Umrah Blessings',
        subtitle3: 'Find inner peace through Umrah pilgrimage. Our comprehensive services ensure a meaningful and comfortable spiritual experience.',
        cta3_primary: 'Book Umrah Now',
        cta3_secondary: 'Explore Options',
        title4: 'Premium Accommodations',
        subtitle4: 'Stay in the most convenient and comfortable accommodations near the Holy Sites. Luxury meets spirituality in our premium hotels.',
        cta4_primary: 'View Hotels',
        cta4_secondary: 'Check Availability'
      },
      services: {
        title: 'Our Services',
        hajj: {
          title: 'Hajj Pilgrimage',
          description: 'Complete Hajj packages with premium accommodations and expert guidance.'
        },
        umrah: {
          title: 'Umrah Services',
          description: 'Flexible Umrah packages tailored to your schedule and preferences.'
        },
        visa: {
          title: 'Visa Processing',
          description: 'Fast and reliable visa processing services for Saudi Arabia with expert guidance.'
        },
        transportation: {
          title: 'Transportation',
          description: 'Safe and comfortable transportation arrangements throughout your pilgrimage journey.'
        }
      },
      about: {
        title: 'About Us',
        description1: 'Welcome to Sabil Al-Hajj, your trusted partner for spiritual journeys and pilgrimage services.',
        description2: 'We specialize in providing comprehensive Hajj and Umrah services, ensuring that your spiritual journey is comfortable, meaningful, and memorable. Our experienced team is dedicated to making your pilgrimage experience as smooth as possible.',
        description3: 'With years of experience in the pilgrimage industry, we understand the importance of every detail in your journey. From visa processing to accommodation arrangements, transportation, and spiritual guidance, we handle everything so you can focus on your worship.'
      },
      contact: {
        title: 'Contact Us',
        get_in_touch: 'Get In Touch',
        send_message: 'Send us a Message',
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message',
        placeholder_name: 'Your full name',
        placeholder_email: 'your@email.com',
        placeholder_subject: 'How can we help?',
        placeholder_message: 'Tell us about your pilgrimage needs...',
        address: 'Address',
        phone: 'Phone',
        email_label: 'Email'
      },
      footer: {
        description: 'Your trusted partner for Hajj and Umrah pilgrimage services. Experience a spiritual journey filled with peace, devotion, and unforgettable memories.',
        services: 'Our Services',
        company: 'Company',
        contact_info: 'Contact Info',
        newsletter_title: 'Stay Updated',
        newsletter_description: 'Subscribe to our newsletter for the latest Hajj and Umrah updates.',
        subscribe: 'Subscribe',
        copyright: '© {{year}} Sabil Al-Hajj. All rights reserved.',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        cookies: 'Cookie Policy'
      },
      languages: {
        english: 'English',
        french: 'Français',
        italian: 'Italiano',
        arabic: 'العربية',
        language: 'Language',
        language_arabic: 'اللغة'
      },
      pages: {
        about: {
          title: 'About Us',
          subtitle: 'Learn more about our mission and commitment to your spiritual journey',
          description1: 'Welcome to Sabil Al-Hajj, your trusted partner for spiritual journeys and pilgrimage services.',
          description2: 'We specialize in providing comprehensive Hajj and Umrah services, ensuring that your spiritual journey is comfortable, meaningful, and memorable. Our experienced team is dedicated to making your pilgrimage experience as smooth as possible.',
          description3: 'With years of experience in the pilgrimage industry, we understand the importance of every detail in your journey. From visa processing to accommodation arrangements, transportation, and spiritual guidance, we handle everything so you can focus on your worship.'
        },
        services: {
          title: 'Our Services',
          hajj: {
            title: 'Hajj Pilgrimage',
            description: 'Complete Hajj packages with premium accommodations and expert guidance.'
          },
          umrah: {
            title: 'Umrah Services',
            description: 'Flexible Umrah packages tailored to your schedule and preferences.'
          },
          visa: {
            title: 'Visa Processing',
            description: 'Fast and reliable visa processing services for Saudi Arabia with expert guidance.'
          },
          transportation: {
            title: 'Transportation',
            description: 'Safe and comfortable transportation arrangements throughout your pilgrimage journey.'
          },
          accommodation: {
            title: 'Accommodation',
            description: 'Premium hotel accommodations in Makkah and Madinah with all modern amenities.'
          },
          spiritual: {
            title: 'Spiritual Guidance',
            description: 'Experienced scholars and guides to assist you throughout your spiritual journey.'
          }
        },
        hajj: {
          title: 'Hajj Pilgrimage',
          subtitle: 'Embark on the most sacred pilgrimage of Islam',
          description1: 'The Hajj pilgrimage is one of the Five Pillars of Islam and a profound spiritual journey that every Muslim who is physically and financially able must undertake at least once in their lifetime.',
          description2: 'Our comprehensive Hajj packages ensure that your pilgrimage is not only spiritually fulfilling but also comfortable and well-organized. We handle every aspect of your journey, from visa processing to accommodation and transportation.',
          description3: 'Join thousands of pilgrims who have entrusted us with their sacred journey. Our experienced team provides 24/7 support throughout your Hajj pilgrimage.'
        },
        umrah: {
          title: 'Umrah Pilgrimage',
          subtitle: 'Experience the blessings of Umrah at any time of the year',
          description1: 'Umrah is a sacred pilgrimage to Makkah that can be performed at any time of the year, offering Muslims the opportunity to seek spiritual closeness to Allah.',
          description2: 'Our Umrah packages are designed to provide a meaningful and comfortable pilgrimage experience. We offer flexible scheduling options to accommodate your needs and budget.',
          description3: 'Experience the peace and spirituality of Umrah with our expert guidance and premium services. Every detail is carefully planned to ensure your spiritual journey is unforgettable.'
        },
        flights: {
          title: 'Flight Services',
          subtitle: 'Convenient and comfortable air travel for your pilgrimage',
          description1: 'We provide comprehensive flight services for your Hajj and Umrah journeys, ensuring you reach your destination safely and comfortably.',
          description2: 'Our partnerships with leading airlines offer you the best rates and most convenient schedules for your pilgrimage travel.',
          description3: 'From airport transfers to in-flight services, we ensure your journey begins and ends smoothly.'
        },
        hotels: {
          title: 'Hotel Accommodations',
          subtitle: 'Premium accommodations near the Holy Sites',
          description1: 'Stay in comfort and convenience with our premium hotel accommodations strategically located near the Holy Sites in Makkah and Madinah.',
          description2: 'Our hotel partners provide modern amenities, excellent service, and easy access to the Haram Mosque and Prophet\'s Mosque.',
          description3: 'Choose from various accommodation options to suit your preferences and budget, all while maintaining the highest standards of comfort and cleanliness.'
        },
        blog: {
          title: 'Blog',
          subtitle: 'Insights, guides, and stories from the world of pilgrimage and spiritual journeys',
          posts: {
            hajj_rituals: {
              title: 'Understanding the Rituals of Hajj',
              excerpt: 'A comprehensive guide to the five pillars of Hajj and their spiritual significance.'
            },
            umrah_prep: {
              title: 'Preparing for Your Umrah Journey',
              excerpt: 'Essential tips and preparations for a meaningful Umrah pilgrimage experience.'
            },
            kaaba_history: {
              title: 'The History and Significance of the Kaaba',
              excerpt: 'Exploring the sacred history and spiritual importance of the House of Allah.'
            },
            modern_pilgrimage: {
              title: 'Modern Pilgrimage: Technology and Tradition',
              excerpt: 'How technology enhances the pilgrimage experience while preserving sacred traditions.'
            }
          },
          load_more: 'Load More Articles',
          min_read: 'min read'
        },
        contact: {
          title: 'Contact Us',
          subtitle: 'Get in touch with our team for personalized assistance',
          get_in_touch: 'Get In Touch',
          send_message: 'Send us a Message',
          name: 'Name',
          email: 'Email',
          subject: 'Subject',
          message: 'Message',
          send: 'Send Message',
          placeholder_name: 'Your full name',
          placeholder_email: 'your@email.com',
          placeholder_subject: 'How can we help?',
          placeholder_message: 'Tell us about your pilgrimage needs...',
          address: 'Address',
          phone: 'Phone',
          email_label: 'Email',
          location: '123 Pilgrimage Street, Makkah, Saudi Arabia',
          phone_number: '+966 12 345 6789',
          email_address: 'info@sabilalhajj.com'
        }
      },
      common: {
        read_more: 'Read More',
        learn_more: 'Learn More',
        contact_us: 'Contact Us',
        book_now: 'Book Now',
        view_details: 'View Details'
      },
      whatsapp: {
        message: 'Hello! I would like to inquire about Hajj/Umrah services.',
        tooltip: 'Chat with us on WhatsApp'
      },
      booking: {
        back_to_package: 'Back to Package Details',
        complete_booking_title: 'Complete Your Umrah Booking',
        program_label: 'Program',
        room_label: 'Room',
        visa_label: 'Visa',
        performer_count_title: 'Number of Umrah Performers',
        adults_label: 'Adults',
        contact_info_title: 'Contact Information',
        phone_label: 'Phone Number',
        email_label: 'Email Address',
        performer_info_title: 'Umrah Performer 1 Information - Adult',
        first_name_label: 'First Name',
        last_name_label: 'Last Name',
        nationality_label: 'Nationality',
        document_type_label: 'Select travel document type',
        select_document_option: 'Select travel document type',
        passport_option: 'Passport',
        national_id_option: 'National ID',
        submit_button: 'Submit Booking Request',
        confirm_book_now: 'Confirm & Book Now',
        complete_selection_message: 'Please complete your Program, Room, and Visa selection above to continue.',
        package_details: 'Package Details',
        ramadan_title: 'Ramadan Umrah 2026 — Full Month of Ramadan',
        selected_program: 'Selected Program (Select to see details and undo anytime)',
        selected_room: 'Selected Room Type (Select to see details and undo anytime)',
        selected_visa: 'Selected Visa Type (Select to see details and undo anytime)',
        change: 'Change',
        duration: 'Duration:',
        departure: 'Departure:',
        return: 'Return:',
        from: 'From:',
        to: 'To:',
        capacity: 'Capacity:',
        view: 'View:',
        size: 'Size:',
        validity: 'Validity:',
        stay_duration: 'Stay Duration:',
        processing: 'Processing:',
        highlights: 'Highlights:',
        includes: 'Includes:',
        features: 'Features:',
        amenities: 'Amenities:',
        requirements: 'Requirements:',
        benefits: 'Benefits:',
        nights_total: '9 Nights Total',
        nights_madinah: '3 Nights Madinah',
        nights_makkah: '6 Nights Makkah',
        direct_flights: 'Direct Flights',
        vip_transfers: 'VIP Transfers',
        description: 'At SabilAlHajj, we facilitate every detail — from Umrah visas to hotel stays — so you can perform your rituals with peace of mind. Experience a spiritual journey that unites faith and peace of mind.',
        why_choose_title: 'Why choose sabilalhajj?',
        feature_1: 'Professional organization & management',
        feature_2: 'Balanced spiritual programs',
        feature_3: 'Reliable scholarly accompaniment',
        feature_4: 'High-level service & attention to detail',
        error: {
          submission_failed: 'Failed to submit booking. Please try again or contact support.'
        }
      },
      umrah: {
        back_to_umrah: 'Back to Umrah',
        choose_package_title: 'Choose Your Ideal Umrah Package',
        choose_package_subtitle: 'Explore a range of Umrah packages carefully designed to match your needs and budget.',
        ramadan_package_title: 'Ramadan Umrah 2026',
        select_program: 'Select Your Ideal Program',
        makkah_hotels: 'Makkah & Madinah (4★ Hotels)',
        direct_flights: 'Direct Flights from Milan/Rome',
        comfortable_transfers: 'Comfortable Transfers',
        guided_visits: 'Guided Visits to Holy Sites',
        registering_now: '{{count}} Someone is registering now',
        view_details: 'View Details',
        share: 'Share',
        coming_soon_title: 'More Packages Coming Soon',
        coming_soon_description: 'Exciting new Umrah packages are being prepared for you',
        premium: 'Premium',
        coming_soon: 'Coming Soon',
        more_packages: 'More Packages Coming Soon',
        stay_tuned: 'Stay tuned for exciting new packages!',
        select_residence: 'Select Your Residence',
        residence_subtitle: 'Tailoring the best packages for your location',
        search_country: 'Search your country...',
        round_trip_flights: 'Round-trip Flights',
        round_trip_detail: 'Direct premium flights to Jeddah or Medina',
        luxury_stay: 'Luxury Stay',
        luxury_detail: '5-star hotels steps away from the Haram',
        visa_concierge: 'Visa Concierge',
        visa_detail: 'End-to-end processing and documentation',
        expert_guides: 'Expert Guides',
        expert_detail: 'Scholarly guidance through all rituals',
        journey_title: 'The Journey',
        day1_title: 'Arrival in Makkah',
        day1_desc: 'VIP transfer and Ihram assistance.',
        day24_title: 'Rituals & Devotion',
        day24_desc: 'Guided Umrah and deep spiritual lectures.',
        day5_title: 'The Prophet\'s City',
        day5_desc: 'High-speed train transfer to Medina.',
        day68_title: 'Ziyarat & Prayers',
        day68_desc: 'Visiting historic sites and Rawdah access.',
        day9_title: 'Final Departure',
        day9_desc: 'Final prayers and transfer to airport.',
        reserve_spot: 'Reserve Your Spot',
        join_group: 'Join 40 other pilgrims on this exclusive group journey departing next month.',
        group_support: '24/7 Group Support',
        vip_transfers: 'Private VIP Transfers',
        holy_fees: 'Holy Site Entrance Fees',
        book_plan: 'Book This Plan',
        back_to_plans: 'Back to Plans',
        customize_title: 'Customize Your Umrah',
        customize_subtitle: 'Personalize every aspect of your spiritual journey',
        flexible_duration: 'Flexible Duration',
        flexible_desc: 'Choose your preferred length of stay in Makkah and Medina',
        hotel_selection: 'Hotel Selection',
        hotel_desc: 'Pick from various hotel categories and locations',
        flight_options: 'Flight Options',
        flight_desc: 'Select your preferred airlines and flight times',
        group_size: 'Group Size',
        group_desc: 'Travel with your family or in small groups',
        customize_duration: 'Customize Your Duration',
        days_makka: 'Days in Makkah',
        days_madina: 'Days in Medina',
        total_duration: 'Total Duration',
        choose_package: 'Choose Your Package',
        essential_package: 'Essential Package',
        premium_package: 'Premium Package',
        luxury_package: 'Luxury Package',
        starting_from: 'Starting from',
        select_package: 'Select Package',
        start_planning: 'Start Planning'
      },
      packages: {
        choose_package: 'Choose Your Perfect Package',
        explore_packages: 'Discover our carefully crafted travel packages designed to make your journey unforgettable',
        umrah_packages: 'Umrah Packages',
        hajj: 'HAJJ',
        flight_booking: 'Flight Booking',
        hotel_booking: 'Hotel Booking',
        visa_services: 'Visa Services',
        personalized_umrah: 'Personalized Umrah',
        personalized_subtitle: 'Personalize your days in Makkah & Madinah',
        flight: 'Flight',
        hotels: 'Hotels',
        visa: 'Visa',
        guide: 'Guide',
        view_more: 'View more'
      },
      flights: {
        title: 'The Best Platform to Book Flight Tickets!',
        subtitle: 'Fast | Reliable and affordable | Straight from the Official Source',
        trip_types: {
          one_way: 'One Way Trip',
          round_trip: 'Round Trip',
          multi_route: 'Multi Route'
        },
        search: 'Search',
        from: 'From',
        to: 'To',
        departure: 'Departure',
        return: 'Return',
        passengers: 'Passengers',
        class: 'Class',
        economy: 'Economy',
        business: 'Business',
        first: 'First',
        search_flights: 'Search Flights',
        select_airport: 'Select Airport',
        enter_city: 'Enter city or airport'
      },
      umrah_plan: {
        collective: 'Umrah Collective',
        personalized: 'Personalized Umrah',
        personalized_subtitle: 'Personalize your days in Makkah & Madinah',
        flight: 'Flight',
        hotels: 'Hotels',
        visa: 'Visa',
        guide: 'Guide',
        reserve_flight: 'Reserve your flight',
        reserve_hotels: 'Reserve your hotels',
        explore: 'Explore',
        coming_soon: 'Coming Soon',
        plan_title: 'Plan Your Perfect Umrah with Sabilalhajj',
        plan_subtitle: 'Discover the perfect Umrah for you — whether in a peaceful group setting or a personalized experience crafted exclusively to your needs.'
      },
      testimonials: {
        title: 'What Our Pilgrims Say',
        subtitle: 'Read testimonials from thousands of satisfied customers who trusted us with their sacred journey',
        name1: 'Mouad',
        location1: 'Italy',
        text1: 'I am pleased with the services provided by the sabillhajj platform. The support team was always available, and the accommodation and transportation were comfortable and clean.',
        name2: 'Mouad',
        location2: 'Italy',
        text2: 'I am pleased with the services provided by the sabillhajj platform. The support team was always available, and the accommodation and transportation were comfortable and clean.',
        name3: 'Mouad',
        location3: 'Italy',
        text3: 'I am pleased with the services provided by the sabillhajj platform. The support team was always available, and the accommodation and transportation were comfortable and clean.',
        questions: {
          secure_booking: 'Is the booking process secure?',
          secure_booking_answer: 'Yes, we use advanced encryption to ensure all your personal and payment data is kept secure throughout the booking process.',
          support_247: 'Do you offer 24/7 support during the trip?',
          support_247_answer: 'Absolutely. Our dedicated support team is available day and night to assist you before, during, and after your spiritual journey.',
          customize_package: 'Can I customize my pilgrimage package?',
          customize_package_answer: 'Yes, we offer personalized services and handpicked hotels to tailor your package specifically to your needs.'
        },
        common_questions: 'Common Questions'
      },
      whyChooseUs: {
        title: 'Why Choose Us',
        subtitle: 'Discover what makes us the trusted choice for your spiritual journey',
        trusted_partner_title: 'Why sabilhajj is Your Trusted Partner',
        trusted_partner_subtitle: 'Embark on your spiritual journey with confidence, knowing you\'re in the hands of experts who understand the sacred nature of your pilgrimage.',
        excellence_title: '15+ Years of Excellence',
        excellence_description: 'Over a decade and a half of dedicated service...',
        guidance_title: 'Personalized Spiritual Guidance',
        guidance_description: 'Our experienced Islamic scholars provide support...',
        certified_title: 'Certified & Licensed',
        certified_description: 'Fully licensed by Saudi authorities...',
        care_title: 'Unmatched Customer Care',
        care_description: 'Our dedicated team ensures every detail is arranged...',
        reserve_button: 'Reserve with Sabil AlHajj →',
        features: {
          secure_trusted: {
            title: 'Secure & Trusted',
            description: 'Advanced encryption keeps your data secure.'
          },
          fast_processing: {
            title: 'Fast Processing',
            description: 'Instant booking confirmations.'
          },
          support_journey: {
            title: 'With You Throughout the Journey',
            description: 'Support before, during, and after your trip.'
          },
          support_247: {
            title: '24/7 Support',
            description: 'Help anytime, day or night.'
          },
          premium_quality: {
            title: 'Premium Quality',
            description: 'Handpicked hotels and premium services.'
          },
          expert_team: {
            title: 'Expert Team',
            description: 'Experienced scholars and guides.'
          }
        },
        stats: {
          happy_pilgrims: 'Happy Pilgrims',
          years_experience: 'Years of Experience',
          destinations: 'Destinations Covered',
          support_languages: 'Support Languages'
      },
      sticky_cta: {
        price_per_person: 'Price per person',
        book_package: 'Book Package'
        },
      gallery: {
        title: 'Spiritual Gallery',
        subtitle: 'Visual glimpses of your upcoming journey'
      },
      visa: {
        hero: {
          title: 'Umrah Visa',
          subtitle: 'Organized Religious Journey',
          description: 'Embark on a spiritual journey to Makkah and Madinah with our comprehensive Umrah visa service.'
        },
        services: {
          title: 'Visa Services',
          subtitle: 'Complete guide to Umrah and Tourist visas for your spiritual journey.',
          umrah: 'Umrah',
          tourist: 'Tourist'
        },
        umrah_section: {
          title: 'Umrah Visa : Organized Religious Journey to Makkah and Madinah',
          description1: 'The Umrah visa is issued for travelers who wish to visit Makkah Al-Mukarramah and Madinah Al-Munawwarah to perform Umrah and Ziyarah.',
          description2: 'It is generally granted as part of a complete travel package, which includes:',
          services: {
            flights: 'Flights',
            accommodation: 'Accommodation in Makkah and Madinah',
            transportation: 'Transportation and transfers',
            coordination: 'Full coordination and follow-up'
          },
          documents: {
            title: 'Required Documents for the Umrah Visa',
            subtitle: 'The required documents may vary depending on the applicant\'s European residency status.',
            residence_permit_title: 'For holders of a European residence permit:',
            passport_title: 'For European passport holders:',
            additional_note: 'Additional documents may be required depending on the country of residence or nationality.',
            passport: 'Passport',
            residence_permit: 'Residence permit card',
            personal_photo: 'Recent personal photo',
            address: 'Address of residence in the applicant\'s country'
          },
          processing: {
            title: 'Umrah Visa Processing Time',
            time: '24 hours to 3 working days',
            note: 'Processing time may vary depending on the country of application and the traveler\'s nationality.'
          }
        },
        tourist_section: {
          title: 'Tourist Visa — Flexible Travel with Umrah Possibility',
          description: 'The Saudi tourist visa is issued for purposes such as visits, tourism, and general travel. Holders of a tourist visa may perform Umrah, provided they comply with the applicable regulations within the Kingdom.',
          documents: {
            title: 'Required Documents for the Tourist Visa',
            subtitle: 'Simple and straightforward documentation process.'
          },
          processing: {
            title: 'Tourist Visa Processing Time',
            time: '5 minutes to 48 hours',
            note: 'This depends on the passport type and issuing country.'
          }
        }
      }
    }
  },
  fr: {
    translation: {
      navigation: {
        umrah: 'Omra',
        hajj: 'Hajj',
        flights: 'Vols',
        hotels: 'Hôtels',
        visa: 'Visa',
        about: 'À propos',
        overview: 'Aperçu',
        package_options: 'Options de Forfait',
        madinah_itinerary: 'Itinéraire Médine',
        makkah_itinerary: 'Itinéraire La Mecque',
        terms_policies: 'Termes et Politiques',
        responsibility_policy: 'Politique de Responsabilité',
        options_short: 'Options',
        madinah_short: 'Médine',
        makkah_short: 'La Mecque',
        policies_short: 'Politiques',
        responsibility_short: 'Responsabilité',
        hajj_info: 'Informations Hajj',
        requirements: 'Exigences',
        packages: 'Forfaits'
      },
      hero: {
        title1: 'Bienvenue chez Sabil Al-Hajj',
        subtitle1: 'Votre partenaire de confiance pour les services de pèlerinage Hajj et Omra. Vivez un voyage spirituel rempli de paix, de dévotion et de souvenirs inoubliables.',
        cta1_primary: 'Réservez votre pèlerinage',
        cta1_secondary: 'En savoir plus',
        title2: 'Découvrez le Hajj sacré',
        subtitle2: 'Embarquez pour le pèlerinage le plus sacré avec notre guidance d\'experts. Chaque étape de votre voyage est soigneusement planifiée pour l\'accomplissement spirituel.',
        cta2_primary: 'Planifier le voyage du Hajj',
        cta2_secondary: 'Voir les forfaits',
        title3: 'Découvrez les bénédictions de l\'Omra',
        subtitle3: 'Trouvez la paix intérieure à travers le pèlerinage de l\'Omra. Nos services complets garantissent une expérience spirituelle significative et confortable.',
        cta3_primary: 'Réservez l\'Omra maintenant',
        cta3_secondary: 'Explorer les options',
        title4: 'Hébergements premium',
        subtitle4: 'Séjournez dans les hébergements les plus pratiques et confortables près des Lieux Saints. Le luxe rencontre la spiritualité dans nos hôtels premium.',
        cta4_primary: 'Voir les hôtels',
        cta4_secondary: 'Vérifier la disponibilité'
      },
      services: {
        title: 'Nos Services',
        hajj: {
          title: 'Pèlerinage du Hajj',
          description: 'Forfaits Hajj complets avec hébergements premium et guidance d\'experts.'
        },
        umrah: {
          title: 'Services Omra',
          description: 'Forfaits Omra flexibles adaptés à votre emploi du temps et vos préférences.'
        },
        visa: {
          title: 'Traitement des visas',
          description: 'Services de traitement des visas rapides et fiables pour l\'Arabie Saoudite avec guidance d\'experts.'
        },
        transportation: {
          title: 'Transport',
          description: 'Arrangements de transport sûrs et confortables tout au long de votre voyage de pèlerinage.'
        }
      },
      about: {
        title: 'À propos de nous',
        description1: 'Bienvenue chez Sabil Al-Hajj, votre partenaire de confiance pour les voyages spirituels et les services de pèlerinage.',
        description2: 'Nous nous spécialisons dans la fourniture de services complets Hajj et Omra, assurant que votre voyage spirituel est confortable, significatif et mémorable. Notre équipe expérimentée se consacre à rendre votre expérience de pèlerinage aussi fluide que possible.',
        description3: 'Avec des années d\'expérience dans l\'industrie du pèlerinage, nous comprenons l\'importance de chaque détail dans votre voyage. Du traitement des visas aux arrangements d\'hébergement, du transport et de la guidance spirituelle, nous gérons tout pour que vous puissiez vous concentrer sur votre adoration.'
      },
      contact: {
        title: 'Contactez-nous',
        get_in_touch: 'Entrer en contact',
        send_message: 'Envoyez-nous un message',
        name: 'Nom',
        email: 'Email',
        subject: 'Sujet',
        message: 'Message',
        send: 'Envoyer le message',
        placeholder_name: 'Votre nom complet',
        placeholder_email: 'votre@email.com',
        placeholder_subject: 'Comment pouvons-nous aider ?',
        placeholder_message: 'Parlez-nous de vos besoins de pèlerinage...',
        address: 'Adresse',
        phone: 'Téléphone',
        email_label: 'Email'
      },
      footer: {
        description: 'Votre partenaire de confiance pour les services de pèlerinage Hajj et Omra. Vivez un voyage spirituel rempli de paix, de dévotion et de souvenirs inoubliables.',
        services: 'Nos Services',
        company: 'Entreprise',
        contact_info: 'Informations de contact',
        newsletter_title: 'Restez informé',
        newsletter_description: 'Abonnez-vous à notre newsletter pour les dernières mises à jour Hajj et Omra.',
        subscribe: 'S\'abonner',
        copyright: '© {{year}} Sabil Al-Hajj. Tous droits réservés.',
        privacy: 'Politique de confidentialité',
        terms: 'Conditions d\'utilisation',
        cookies: 'Politique des cookies'
      },
      languages: {
        english: 'English',
        french: 'Français',
        italian: 'Italiano',
        arabic: 'العربية',
        language: 'Langue',
        language_arabic: 'اللغة'
      },
      pages: {
        about: {
          title: 'À propos de nous',
          subtitle: 'En savoir plus sur notre mission et notre engagement envers votre voyage spirituel',
          description1: 'Bienvenue chez Sabil Al-Hajj, votre partenaire de confiance pour les voyages spirituels et les services de pèlerinage.',
          description2: 'Nous nous spécialisons dans la fourniture de services complets Hajj et Omra, assurant que votre voyage spirituel est confortable, significatif et mémorable. Notre équipe expérimentée se consacre à rendre votre expérience de pèlerinage aussi fluide que possible.',
          description3: 'Avec des années d\'expérience dans l\'industrie du pèlerinage, nous comprenons l\'importance de chaque détail dans votre voyage. Du traitement des visas aux arrangements d\'hébergement, du transport et de la guidance spirituelle, nous gérons tout pour que vous puissiez vous concentrer sur votre adoration.'
        },
        services: {
          title: 'Nos Services',
          hajj: {
            title: 'Pèlerinage du Hajj',
            description: 'Forfaits Hajj complets avec hébergements premium et guidance d\'experts.'
          },
          umrah: {
            title: 'Services Omra',
            description: 'Forfaits Omra flexibles adaptés à votre emploi du temps et vos préférences.'
          },
          visa: {
            title: 'Traitement des visas',
            description: 'Services de traitement des visas rapides et fiables pour l\'Arabie Saoudite avec guidance d\'experts.'
          },
          transportation: {
            title: 'Transport',
            description: 'Arrangements de transport sûrs et confortables tout au long de votre voyage de pèlerinage.'
          },
          accommodation: {
            title: 'Hébergement',
            description: 'Hébergements hôteliers premium à La Mecque et Médine avec toutes les commodités modernes.'
          },
          spiritual: {
            title: 'Guidance Spirituelle',
            description: 'Savants et guides expérimentés pour vous assister tout au long de votre voyage spirituel.'
          }
        },
        hajj: {
          title: 'Pèlerinage du Hajj',
          subtitle: 'Embarquez pour le pèlerinage le plus sacré de l\'Islam',
          description1: 'Le pèlerinage du Hajj est l\'un des Cinq Piliers de l\'Islam et un voyage spirituel profond que chaque musulman physiquement et financièrement capable doit entreprendre au moins une fois dans sa vie.',
          description2: 'Nos forfaits Hajj complets garantissent que votre pèlerinage est non seulement spirituellement enrichissant mais aussi confortable et bien organisé. Nous gérons chaque aspect de votre voyage, du traitement des visas à l\'hébergement et au transport.',
          description3: 'Rejoignez des milliers de pèlerins qui nous ont confié leur voyage sacré. Notre équipe expérimentée fournit un support 24/7 tout au long de votre pèlerinage du Hajj.'
        },
        umrah: {
          title: 'Pèlerinage de l\'Omra',
          subtitle: 'Découvrez les bénédictions de l\'Omra à tout moment de l\'année',
          description1: 'L\'Omra est un pèlerinage sacré à La Mecque qui peut être effectué à tout moment de l\'année, offrant aux musulmans l\'opportunité de rechercher une proximité spirituelle avec Allah.',
          description2: 'Nos forfaits Omra sont conçus pour fournir une expérience de pèlerinage significative et confortable. Nous offrons des options de planification flexibles pour répondre à vos besoins et à votre budget.',
          description3: 'Découvrez la paix et la spiritualité de l\'Omra avec notre guidance experte et nos services premium. Chaque détail est soigneusement planifié pour assurer que votre voyage spirituel est inoubliable.'
        },
        flights: {
          title: 'Services de Vol',
          subtitle: 'Voyage aérien pratique et confortable pour votre pèlerinage',
          description1: 'Nous fournissons des services de vol complets pour vos voyages Hajj et Omra, assurant que vous atteignez votre destination en toute sécurité et confortablement.',
          description2: 'Nos partenariats avec les principales compagnies aériennes vous offrent les meilleurs tarifs et les horaires les plus pratiques pour votre voyage de pèlerinage.',
          description3: 'Des transferts aéroport aux services en vol, nous assurons que votre voyage commence et se termine en douceur.'
        },
        hotels: {
          title: 'Hébergements Hôteliers',
          subtitle: 'Hébergements premium près des Lieux Saints',
          description1: 'Séjournez dans le confort et la commodité avec nos hébergements hôteliers premium stratégiquement situés près des Lieux Saints à La Mecque et Médine.',
          description2: 'Nos partenaires hôteliers fournissent des commodités modernes, un excellent service et un accès facile à la Mosquée du Haram et à la Mosquée du Prophète.',
          description3: 'Choisissez parmi diverses options d\'hébergement pour répondre à vos préférences et à votre budget, tout en maintenant les plus hauts standards de confort et de propreté.'
        },
        blog: {
          title: 'Blog',
          subtitle: 'Perspectives, guides et histoires du monde du pèlerinage et des voyages spirituels',
          posts: {
            hajj_rituals: {
              title: 'Comprendre les Rituels du Hajj',
              excerpt: 'Un guide complet des cinq piliers du Hajj et leur signification spirituelle.'
            },
            umrah_prep: {
              title: 'Préparation pour votre Voyage d\'Omra',
              excerpt: 'Conseils essentiels et préparations pour une expérience significative de pèlerinage Omra.'
            },
            kaaba_history: {
              title: 'L\'Histoire et l\'Importance de la Kaaba',
              excerpt: 'Explorer l\'histoire sacrée et l\'importance spirituelle de la Maison d\'Allah.'
            },
            modern_pilgrimage: {
              title: 'Pèlerinage Moderne : Technologie et Tradition',
              excerpt: 'Comment la technologie améliore l\'expérience de pèlerinage tout en préservant les traditions sacrées.'
            }
          },
          load_more: 'Charger Plus d\'Articles',
          min_read: 'min de lecture'
        },
        contact: {
          title: 'Contactez-nous',
          subtitle: 'Entrez en contact avec notre équipe pour une assistance personnalisée',
          get_in_touch: 'Entrer en contact',
          send_message: 'Envoyez-nous un message',
          name: 'Nom',
          email: 'Email',
          subject: 'Sujet',
          message: 'Message',
          send: 'Envoyer le message',
          placeholder_name: 'Votre nom complet',
          placeholder_email: 'votre@email.com',
          placeholder_subject: 'Comment pouvons-nous aider ?',
          placeholder_message: 'Parlez-nous de vos besoins de pèlerinage...',
          address: 'Adresse',
          phone: 'Téléphone',
          email_label: 'Email',
          location: '123 Pilgrimage Street, Makkah, Saudi Arabia',
          phone_number: '+966 12 345 6789',
          email_address: 'info@sabilalhajj.com'
        }
      },
      common: {
        read_more: 'Lire Plus',
        learn_more: 'En Savoir Plus',
        contact_us: 'Contactez-nous',
        book_now: 'Réservez Maintenant',
        view_details: 'Voir les Détails'
      },
      whatsapp: {
        message: 'Bonjour ! Je souhaite m\'informer sur les services Hajj/Omra.',
        tooltip: 'Discutez avec nous sur WhatsApp'
      },
      booking: {
        back_to_package: 'Retour aux Détails du Forfait',
        complete_booking_title: 'Complétez votre Réservation Omra',
        program_label: 'Programme',
        room_label: 'Chambre',
        visa_label: 'Visa',
        performer_count_title: 'Nombre de Pèlerins Omra',
        adults_label: 'Adultes',
        contact_info_title: 'Informations de Contact',
        phone_label: 'Numéro de Téléphone',
        email_label: 'Adresse Email',
        performer_info_title: 'Informations du Pèlerin Omra 1 - Adulte',
        first_name_label: 'Prénom',
        last_name_label: 'Nom de Famille',
        nationality_label: 'Nationalité',
        document_type_label: 'Sélectionnez le type de document de voyage',
        select_document_option: 'Sélectionnez le type de document de voyage',
        passport_option: 'Passeport',
        national_id_option: 'Carte d\'Identité Nationale',
        submit_button: 'Soumettre la Demande de Réservation',
        confirm_book_now: 'Confirmer et Réserver Maintenant',
        complete_selection_message: 'Veuillez compléter votre sélection de Programme, Chambre et Visa ci-dessus pour continuer.',
        package_details: 'Détails du Forfait',
        ramadan_title: 'Omra Ramadan 2026 — Mois Complet de Ramadan',
        selected_program: 'Programme Sélectionné (Sélectionnez pour voir les détails et annuler à tout moment)',
        selected_room: 'Type de Chambre Sélectionnée (Sélectionnez pour voir les détails et annuler à tout moment)',
        selected_visa: 'Type de Visa Sélectionné (Sélectionnez pour voir les détails et annuler à tout moment)',
        change: 'Changer',
        duration: 'Durée :',
        departure: 'Départ :',
        return: 'Retour :',
        from: 'De :',
        to: 'À :',
        capacity: 'Capacité :',
        view: 'Vue :',
        size: 'Taille :',
        validity: 'Validité :',
        stay_duration: 'Durée du Séjour :',
        processing: 'Traitement :',
        highlights: 'Points Forts :',
        includes: 'Comprend :',
        features: 'Caractéristiques :',
        amenities: 'Équipements :',
        requirements: 'Exigences :',
        benefits: 'Avantages :',
        nights_total: '9 Nuits Total',
        nights_madinah: '3 Nuits Madinah',
        nights_makkah: '6 Nuits Makkah',
        direct_flights: 'Vols Directs',
        vip_transfers: 'Transferts VIP',
        description: 'Chez SabilAlHajj, nous facilitons chaque détail — des visas Omra aux séjours hôteliers — afin que vous puissiez effectuer vos rituels l\'esprit tranquille. Vivez un voyage spirituel qui unit foi et tranquillité d\'esprit.',
        why_choose_title: 'Pourquoi choisir sabilalhajj ?',
        feature_1: 'Organisation et gestion professionnelle',
        feature_2: 'Programmes spirituels équilibrés',
        feature_3: 'Accompagnement savant fiable',
        feature_4: 'Service et attention aux détails de haut niveau',
        error: {
          submission_failed: 'Échec de la soumission de la réservation. Veuillez réessayer ou contacter le support.'
        }
      },
      umrah: {
        back_to_umrah: 'Retour à Omra',
        choose_package_title: 'Choisissez Votre Forfait Omra Idéal',
        choose_package_subtitle: 'Explorez une gamme de forfaits Omra conçus avec soin pour répondre à vos besoins et à votre budget.',
        ramadan_package_title: 'Omra Ramadan 2026',
        select_program: 'Sélectionnez Votre Programme Idéal',
        makkah_hotels: 'La Mecque & Médine (Hôtels 4★)',
        direct_flights: 'Vols Directs de Milan/Rome',
        comfortable_transfers: 'Transferts Confortables',
        guided_visits: 'Visites Guidées des Lieux Saints',
        registering_now: '{{count}} Quelqu\'un s\'inscrit maintenant',
        view_details: 'Voir les Détails',
        share: 'Partager',
        coming_soon_title: 'Plus de Forfaits Bientôt Disponibles',
        coming_soon_description: 'De nouveaux forfaits Omra passionnants sont en préparation pour vous',
        premium: 'Premium',
        coming_soon: 'Bientôt Disponible',
        more_packages: 'Plus de Forfaits Bientôt Disponibles',
        stay_tuned: 'Restez à l\'affût pour de nouveaux forfaits passionnants !',
        select_residence: 'Sélectionnez Votre Résidence',
        residence_subtitle: 'Adapter les meilleurs forfaits à votre emplacement',
        search_country: 'Rechercher votre pays...',
        round_trip_flights: 'Vols Aller-Retour',
        round_trip_detail: 'Vols premium directs vers Djeddah ou Médine',
        luxury_stay: 'Séjour de Luxe',
        luxury_detail: 'Hôtels 5 étoiles à quelques pas du Haram',
        visa_concierge: 'Conciergerie Visa',
        visa_detail: 'Traitement et documentation de bout en bout',
        expert_guides: 'Guides Experts',
        expert_detail: 'Guidance savante à travers tous les rituels',
        journey_title: 'Le Voyage',
        day1_title: 'Arrivée à La Mecque',
        day1_desc: 'Transfert VIP et assistance Ihram.',
        day24_title: 'Rituels et Dévotion',
        day24_desc: 'Omra guidée et conférences spirituelles profondes.',
        day5_title: 'La Ville du Prophète',
        day5_desc: 'Transfert en train à grande vitesse vers Médine.',
        day68_title: 'Ziyarat et Prières',
        day68_desc: 'Visite des sites historiques et accès à Rawdah.',
        day9_title: 'Départ Final',
        day9_desc: 'Prières finales et transfert vers l\'aéroport.',
        reserve_spot: 'Réservez Votre Place',
        join_group: 'Rejoignez 40 autres pèlerins sur ce voyage de groupe exclusif partant le mois prochain.',
        group_support: 'Support Groupe 24/7',
        vip_transfers: 'Transferts VIP Privés',
        holy_fees: 'Frais d\'Entrée aux Lieux Saints',
        book_plan: 'Réserver Ce Plan',
        back_to_plans: 'Retour aux Plans',
        customize_title: 'Personnalisez Votre Omra',
        customize_subtitle: 'Personnalisez chaque aspect de votre voyage spirituel',
        flexible_duration: 'Durée Flexible',
        flexible_desc: 'Choisissez la durée de séjour préférée à La Mecque et Médine',
        hotel_selection: 'Sélection d\'Hôtel',
        hotel_desc: 'Choisissez parmi diverses catégories d\'hôtels et emplacements',
        flight_options: 'Options de Vol',
        flight_desc: 'Sélectionnez vos compagnies aériennes et horaires préférés',
        group_size: 'Taille du Groupe',
        group_desc: 'Voyagez avec votre famille ou en petits groupes',
        customize_duration: 'Personnalisez Votre Durée',
        days_makka: 'Jours à La Mecque',
        days_madina: 'Jours à Médine',
        total_duration: 'Durée Totale',
        choose_package: 'Choisissez Votre Forfait',
        essential_package: 'Forfait Essentiel',
        premium_package: 'Forfait Premium',
        luxury_package: 'Forfait de Luxe',
        starting_from: 'À partir de',
        select_package: 'Sélectionner le Forfait',
        start_planning: 'Commencer la Planification'
      },
      packages: {
        choose_package: 'Choisissez Votre Forfait Parfait',
        explore_packages: 'Découvrez nos forfaits de voyage soigneusement élaborés pour rendre votre voyage inoubliable',
        umrah_packages: 'Forfaits Omra',
        hajj: 'HAJJ',
        flight_booking: 'Réservation de Vol',
        hotel_booking: 'Réservation d\'Hôtel',
        visa_services: 'Services de Visa',
        personalized_umrah: 'Omra Personnalisée',
        personalized_subtitle: 'Personnalisez vos journées à La Mecque et Médine',
        flight: 'Vol',
        hotels: 'Hôtels',
        visa: 'Visa',
        guide: 'Guide',
        view_more: 'Voir plus'
      },
      flights: {
        title: 'La meilleure plateforme pour réserver des billets d\'avion !',
        subtitle: 'Rapide | Fiable et abordable | Directement de la source officielle',
        trip_types: {
          one_way: 'Voyage simple',
          round_trip: 'Aller-retour',
          multi_route: 'Multi-itinéraires'
        },
        search: 'Rechercher',
        from: 'De',
        to: 'À',
        departure: 'Départ',
        return: 'Retour',
        passengers: 'Passagers',
        class: 'Classe',
        economy: 'Économique',
        business: 'Affaires',
        first: 'Première',
        search_flights: 'Rechercher des vols',
        select_airport: 'Sélectionner l\'aéroport',
        enter_city: 'Entrez la ville ou l\'aéroport'
      },
      umrah_plan: {
        collective: 'Omra Collective',
        personalized: 'Omra Personnalisée',
        personalized_subtitle: 'Personnalisez vos journées à La Mecque et Médine',
        flight: 'Vol',
        hotels: 'Hôtels',
        visa: 'Visa',
        guide: 'Guide',
        reserve_flight: 'Réservez votre vol',
        reserve_hotels: 'Réservez vos hôtels',
        explore: 'Explorer',
        coming_soon: 'Bientôt disponible',
        plan_title: 'Planifiez votre Omra parfaite avec Sabilalhajj',
        plan_subtitle: 'Découvrez l\'Omra parfaite pour vous — que ce soit dans un cadre de groupe paisible ou une expérience personnalisée conçue exclusivement selon vos besoins.'
      },
      testimonials: {
        title: 'Ce que Disent Nos Pèlerins',
        subtitle: 'Lisez les témoignages de milliers de clients satisfaits qui nous ont fait confiance pour leur voyage sacré',
        name1: 'Mouad',
        location1: 'Italie',
        text1: 'Je suis satisfait des services fournis par la plateforme sabillhajj. L\'équipe de support était toujours disponible, et l\'hébergement et le transport étaient confortables et propres.',
        name2: 'Mouad',
        location2: 'Italie',
        text2: 'Je suis satisfait des services fournis par la plateforme sabillhajj. L\'équipe de support était toujours disponible, et l\'hébergement et le transport étaient confortables et propres.',
        name3: 'Mouad',
        location3: 'Italie',
        text3: 'Je suis satisfait des services fournis par la plateforme sabillhajj. L\'équipe de support était toujours disponible, et l\'hébergement et le transport étaient confortables et propres.',
        questions: {
          secure_booking: 'Le processus de réservation est-il sécurisé ?',
          secure_booking_answer: 'Oui, nous utilisons un cryptage avancé pour garantir que toutes vos données personnelles et de paiement sont gardées en sécurité tout au long du processus de réservation.',
          support_247: 'Offrez-vous un support 24/7 pendant le voyage ?',
          support_247_answer: 'Absolument. Notre équipe de support dédiée est disponible jour et nuit pour vous assister avant, pendant et après votre voyage spirituel.',
          customize_package: 'Puis-je personnaliser mon forfait de pèlerinage ?',
          customize_package_answer: 'Oui, nous proposons des services personnalisés et des hôtels sélectionnés pour adapter votre forfait spécifiquement à vos besoins.'
        },
        common_questions: 'Questions Fréquentes'
      },
      whyChooseUs: {
        title: 'Pourquoi Nous Choisir',
        subtitle: 'Découvrez ce qui fait de nous le choix de confiance pour votre voyage spirituel',
        trusted_partner_title: 'Pourquoi sabilhajj est Votre Partenaire de Confiance',
        trusted_partner_subtitle: 'Embarquez pour votre voyage spirituel avec confiance, sachant que vous êtes entre les mains d\'experts qui comprennent la nature sacrée de votre pèlerinage.',
        excellence_title: '15+ Années d\'Excellence',
        excellence_description: 'Plus d\'une décennie et demie de service dédié...',
        guidance_title: 'Guidance Spirituelle Personnalisée',
        guidance_description: 'Nos savants islamiques expérimentés fournissent un soutien...',
        certified_title: 'Certifié et Licencié',
        certified_description: 'Entièrement licencié par les autorités saoudiennes...',
        care_title: 'Service Client Inégalé',
        care_description: 'Notre équipe dédiée s\'assure que chaque détail est arrangé...',
        reserve_button: 'Réserver avec Sabil AlHajj →',
        features: {
          secure_trusted: {
            title: 'Sécurisé et Fiable',
            description: 'Le cryptage avancé garde vos données en sécurité.'
          },
          fast_processing: {
            title: 'Traitement Rapide',
            description: 'Confirmations de réservation instantanées.'
          },
          support_journey: {
            title: 'Avec Vous Tout au Long du Voyage',
            description: 'Support avant, pendant et après votre voyage.'
          },
          support_247: {
            title: 'Support 24/7',
            description: 'Aide à tout moment, jour et nuit.'
          },
          premium_quality: {
            title: 'Qualité Premium',
            description: 'Hôtels sélectionnés et services premium.'
          },
          expert_team: {
            title: 'Équipe d\'Experts',
            description: 'Savants et guides expérimentés.'
          }
        },
        stats: {
          happy_pilgrims: 'Pèlerins Heureux',
          years_experience: 'Années d\'Expérience',
          destinations: 'Destinations Couvertes',
          support_languages: 'Langues de Support'
      },
      sticky_cta: {
        price_per_person: 'Prix par personne',
        book_package: 'Réserver le Forfait'
        },
      gallery: {
        title: 'Galerie Spirituelle',
        subtitle: 'Aperçus visuels de votre prochain voyage'
      },
      visa: {
        hero: {
          title: 'Visa Omra',
          subtitle: 'Voyage Religieux Organisé',
          description: 'Embarquez pour un voyage spirituel vers La Mecque et Médine avec notre service complet de visa Omra.'
        },
        services: {
          title: 'Services de Visa',
          subtitle: 'Guide complet pour les visas Omra et Touriste pour votre voyage spirituel.',
          umrah: 'Omra',
          tourist: 'Touriste'
        },
        umrah_section: {
          title: 'Visa Omra : Voyage Religieux Organisé vers La Mecque et Médine',
          description1: 'Le visa Omra est délivré aux voyageurs qui souhaitent visiter La Mecque Al-Mukarramah et Médine Al-Munawwarah pour effectuer l\'Omra et la Ziyarah.',
          description2: 'Il est généralement accordé dans le cadre d\'un forfait de voyage complet, qui comprend :',
          services: {
            flights: 'Vols',
            accommodation: 'Hébergement à La Mecque et Médine',
            transportation: 'Transport et transferts',
            coordination: 'Coordination complète et suivi'
          },
          documents: {
            title: 'Documents Requis pour le Visa Omra',
            subtitle: 'Les documents requis peuvent varier selon le statut de résidence européen du demandeur.',
            residence_permit_title: 'Pour les titulaires d\'un permis de résidence européen :',
            passport_title: 'Pour les titulaires de passeport européen :',
            additional_note: 'Des documents supplémentaires peuvent être requis selon le pays de résidence ou la nationalité.',
            passport: 'Passeport',
            residence_permit: 'Carte de permis de séjour',
            personal_photo: 'Photo personnelle récente',
            address: 'Adresse de résidence dans le pays du demandeur'
          },
          processing: {
            title: 'Délai de Traitement du Visa Omra',
            time: '24 heures à 3 jours ouvrables',
            note: 'Le délai de traitement peut varier selon le pays de demande et la nationalité du voyageur.'
          }
        },
        tourist_section: {
          title: 'Visa Touriste — Voyage Flexible avec Possibilité d\'Omra',
          description: 'Le visa touristique saoudien est délivré pour des fins telles que visites, tourisme et voyages généraux. Les titulaires d\'un visa touristique peuvent effectuer l\'Omra, à condition de se conformer aux réglementations applicables dans le Royaume.',
          documents: {
            title: 'Documents Requis pour le Visa Touriste',
            subtitle: 'Processus de documentation simple et direct.'
          },
          processing: {
            title: 'Délai de Traitement du Visa Touriste',
            time: '5 minutes à 48 heures',
            note: 'Cela dépend du type de passeport et du pays émetteur.'
          }
        }
      }
    }
  },
  it: {
    translation: {
      navigation: {
        umrah: 'Umra',
        hajj: 'Hajj',
        flights: 'Voli',
        hotels: 'Hotel',
        visa: 'Visto',
        about: 'Chi siamo',
        overview: 'Panoramica',
        package_options: 'Opzioni Pacchetto',
        madinah_itinerary: 'Itinerario Medina',
        makkah_itinerary: 'Itinerario Mecca',
        terms_policies: 'Termini e Politiche',
        responsibility_policy: 'Politica di Responsabilità',
        options_short: 'Opzioni',
        madinah_short: 'Medina',
        makkah_short: 'Mecca',
        policies_short: 'Politiche',
        responsibility_short: 'Responsabilità',
        hajj_info: 'Informazioni Hajj',
        requirements: 'Requisiti',
        packages: 'Pacchetti'
      },
      hero: {
        title1: 'Benvenuti in Sabil Al-Hajj',
        subtitle1: 'Il vostro partner di fiducia per i servizi di pellegrinaggio Hajj e Umrah. Vivete un viaggio spirituale pieno di pace, devozione e ricordi indimenticabili.',
        cta1_primary: 'Prenota il tuo pellegrinaggio',
        cta1_secondary: 'Scopri di più',
        title2: 'Sperimenta il Sacro Hajj',
        subtitle2: 'Intraprendi il pellegrinaggio più sacro con la nostra guida esperta. Ogni passo del tuo viaggio è pianificato con cura per la realizzazione spirituale.',
        cta2_primary: 'Pianifica viaggio Hajj',
        cta2_secondary: 'Vedi pacchetti',
        title3: 'Scopri le benedizioni dell\'Umrah',
        subtitle3: 'Trova pace interiore attraverso il pellegrinaggio Umrah. I nostri servizi completi garantiscono un\'esperienza spirituale significativa e confortevole.',
        cta3_primary: 'Prenota Umrah ora',
        cta3_secondary: 'Esplora opzioni',
        title4: 'Sistemazioni premium',
        subtitle4: 'Soggiorna nelle sistemazioni più convenienti e confortevoli vicino ai Luoghi Santi. Il lusso incontra la spiritualità nei nostri hotel premium.',
        cta4_primary: 'Vedi hotel',
        cta4_secondary: 'Controlla disponibilità'
      },
      services: {
        title: 'I nostri servizi',
        hajj: {
          title: 'Pellegrinaggio Hajj',
          description: 'Pacchetti Hajj completi con sistemazioni premium e guida esperta.'
        },
        umrah: {
          title: 'Servizi Umrah',
          description: 'Pacchetti Umrah flessibili adattati al vostro programma e preferenze.'
        },
        visa: {
          title: 'Elaborazione visti',
          description: 'Servizi di elaborazione visti rapidi e affidabili per l\'Arabia Saudita con guida esperta.'
        },
        transportation: {
          title: 'Trasporti',
          description: 'Arrangiamenti di trasporto sicuri e confortevoli durante tutto il vostro viaggio di pellegrinaggio.'
        }
      },
      about: {
        title: 'Chi siamo',
        description1: 'Benvenuti in Sabil Al-Hajj, il vostro partner di fiducia per viaggi spirituali e servizi di pellegrinaggio.',
        description2: 'Ci specializziamo nella fornitura di servizi completi Hajj e Umrah, garantendo che il vostro viaggio spirituale sia confortevole, significativo e memorabile. Il nostro team esperto si dedica a rendere la vostra esperienza di pellegrinaggio il più fluida possibile.',
        description3: 'Con anni di esperienza nel settore del pellegrinaggio, comprendiamo l\'importanza di ogni dettaglio nel vostro viaggio. Dal processamento visti agli accordi di alloggio, trasporto e guida spirituale, gestiamo tutto così che possiate concentrarvi sulla vostra adorazione.'
      },
      contact: {
        title: 'Contattaci',
        get_in_touch: 'Mettiti in contatto',
        send_message: 'Inviaci un messaggio',
        name: 'Nome',
        email: 'Email',
        subject: 'Oggetto',
        message: 'Messaggio',
        send: 'Invia messaggio',
        placeholder_name: 'Il tuo nome completo',
        placeholder_email: 'tua@email.com',
        placeholder_subject: 'Come possiamo aiutare?',
        placeholder_message: 'Parlaci delle tue esigenze di pellegrinaggio...',
        address: 'Indirizzo',
        phone: 'Telefono',
        email_label: 'Email'
      },
      footer: {
        description: 'Il vostro partner di fiducia per i servizi di pellegrinaggio Hajj e Umrah. Vivete un viaggio spirituale pieno di pace, devozione e ricordi indimenticabili.',
        services: 'I nostri servizi',
        company: 'Azienda',
        contact_info: 'Informazioni di contatto',
        newsletter_title: 'Rimani aggiornato',
        newsletter_description: 'Iscriviti alla nostra newsletter per gli ultimi aggiornamenti Hajj e Umrah.',
        subscribe: 'Iscriviti',
        copyright: '© {{year}} Sabil Al-Hajj. Tutti i diritti riservati.',
        privacy: 'Informativa sulla privacy',
        terms: 'Termini di servizio',
        cookies: 'Politica sui cookie'
      },
      languages: {
        english: 'English',
        french: 'Français',
        italian: 'Italiano',
        arabic: 'العربية',
        language: 'Lingua',
        language_arabic: 'اللغة'
      },
      pages: {
        about: {
          title: 'Chi Siamo',
          subtitle: 'Scopri di più sulla nostra missione e impegno verso il tuo viaggio spirituale',
          description1: 'Benvenuti in Sabil Al-Hajj, il vostro partner di fiducia per viaggi spirituali e servizi di pellegrinaggio.',
          description2: 'Ci specializziamo nella fornitura di servizi completi Hajj e Umrah, garantendo che il vostro viaggio spirituale sia confortevole, significativo e memorabile. Il nostro team esperto si dedica a rendere la vostra esperienza di pellegrinaggio il più fluida possibile.',
          description3: 'Con anni di esperienza nel settore del pellegrinaggio, comprendiamo l\'importanza di ogni dettaglio nel vostro viaggio. Dal processamento visti agli accordi di alloggio, trasporto e guida spirituale, gestiamo tutto così che possiate concentrarvi sulla vostra adorazione.'
        },
        services: {
          title: 'I Nostri Servizi',
          hajj: {
            title: 'Pellegrinaggio Hajj',
            description: 'Pacchetti Hajj completi con sistemazioni premium e guida esperta.'
          },
          umrah: {
            title: 'Servizi Umrah',
            description: 'Pacchetti Umrah flessibili adattati al vostro programma e preferenze.'
          },
          visa: {
            title: 'Elaborazione Visti',
            description: 'Servizi di elaborazione visti rapidi e affidabili per l\'Arabia Saudita con guida esperta.'
          },
          transportation: {
            title: 'Trasporto',
            description: 'Arrangiamenti di trasporto sicuri e confortevoli durante tutto il vostro viaggio di pellegrinaggio.'
          },
          accommodation: {
            title: 'Alloggio',
            description: 'Sistemazioni alberghiere premium a La Mecca e Medina con tutte le comodità moderne.'
          },
          spiritual: {
            title: 'Guida Spirituale',
            description: 'Studiosi e guide esperti per assistervi durante tutto il vostro viaggio spirituale.'
          }
        },
        hajj: {
          title: 'Pellegrinaggio Hajj',
          subtitle: 'Intraprendete il pellegrinaggio più sacro dell\'Islam',
          description1: 'Il pellegrinaggio del Hajj è uno dei Cinque Pilastri dell\'Islam e un profondo viaggio spirituale che ogni musulmano fisicamente e finanziariamente capace deve intraprendere almeno una volta nella vita.',
          description2: 'I nostri pacchetti Hajj completi garantiscono che il vostro pellegrinaggio sia non solo spiritualmente arricchente ma anche confortevole e ben organizzato. Gestiamo ogni aspetto del vostro viaggio, dal processamento visti all\'alloggio e trasporto.',
          description3: 'Unitevi a migliaia di pellegrini che ci hanno affidato il loro viaggio sacro. Il nostro team esperto fornisce supporto 24/7 durante tutto il vostro pellegrinaggio del Hajj.'
        },
        umrah: {
          title: 'Pellegrinaggio Umrah',
          subtitle: 'Sperimentate le benedizioni dell\'Umrah in qualsiasi momento dell\'anno',
          description1: 'L\'Umrah è un pellegrinaggio sacro alla Mecca che può essere effettuato in qualsiasi momento dell\'anno, offrendo ai musulmani l\'opportunità di cercare vicinanza spirituale ad Allah.',
          description2: 'I nostri pacchetti Umrah sono progettati per fornire un\'esperienza di pellegrinaggio significativa e confortevole. Offriamo opzioni di pianificazione flessibili per adattarci alle vostre esigenze e budget.',
          description3: 'Sperimentate la pace e la spiritualità dell\'Umrah con la nostra guida esperta e servizi premium. Ogni dettaglio è pianificato con cura per assicurare che il vostro viaggio spirituale sia indimenticabile.'
        },
        flights: {
          title: 'Servizi di Volo',
          subtitle: 'Viaggio aereo conveniente e confortevole per il vostro pellegrinaggio',
          description1: 'Forniamo servizi di volo completi per i vostri viaggi Hajj e Umrah, assicurando che raggiungiate la vostra destinazione in sicurezza e comfort.',
          description2: 'Le nostre partnership con le principali compagnie aeree vi offrono le migliori tariffe e i programmi più convenienti per il vostro viaggio di pellegrinaggio.',
          description3: 'Dai trasferimenti aeroportuali ai servizi in volo, assicuriamo che il vostro viaggio inizi e finisca senza problemi.'
        },
        hotels: {
          title: 'Sistemazioni Alberghiere',
          subtitle: 'Sistemazioni premium vicino ai Luoghi Santi',
          description1: 'Soggiornate nel comfort e nella convenienza con le nostre sistemazioni alberghiere premium strategicamente situate vicino ai Luoghi Santi alla Mecca e Medina.',
          description2: 'I nostri partner alberghieri forniscono comodità moderne, eccellente servizio e facile accesso alla Moschea del Haram e alla Moschea del Profeta.',
          description3: 'Scegliete tra varie opzioni di alloggio per adattarsi alle vostre preferenze e budget, mantenendo sempre i più alti standard di comfort e pulizia.'
        },
        blog: {
          title: 'Blog',
          subtitle: 'Approfondimenti, guide e storie dal mondo del pellegrinaggio e dei viaggi spirituali',
          posts: {
            hajj_rituals: {
              title: 'Comprendere i Rituali del Hajj',
              excerpt: 'Una guida completa ai cinque pilastri del Hajj e il loro significato spirituale.'
            },
            umrah_prep: {
              title: 'Preparazione per il vostro Viaggio Umrah',
              excerpt: 'Consigli essenziali e preparazioni per un\'esperienza significativa di pellegrinaggio Umrah.'
            },
            kaaba_history: {
              title: 'La Storia e l\'Importanza della Kaaba',
              excerpt: 'Esplorando la storia sacra e l\'importanza spirituale della Casa di Allah.'
            },
            modern_pilgrimage: {
              title: 'Pellegrinaggio Moderno: Tecnologia e Tradizione',
              excerpt: 'Come la tecnologia migliora l\'esperienza di pellegrinaggio preservando le tradizioni sacre.'
            }
          },
          load_more: 'Carica Altri Articoli',
          min_read: 'min di lettura'
        },
        contact: {
          title: 'Contattaci',
          subtitle: 'Mettiti in contatto con il nostro team per assistenza personalizzata',
          get_in_touch: 'Mettiti in Contatto',
          send_message: 'Inviaci un Messaggio',
          name: 'Nome',
          email: 'Email',
          subject: 'Oggetto',
          message: 'Messaggio',
          send: 'Invia Messaggio',
          placeholder_name: 'Il tuo nome completo',
          placeholder_email: 'tua@email.com',
          placeholder_subject: 'Come possiamo aiutare?',
          placeholder_message: 'Parlaci delle tue esigenze di pellegrinaggio...',
          address: 'Indirizzo',
          phone: 'Telefono',
          email_label: 'Email',
          location: '123 Pilgrimage Street, Makkah, Saudi Arabia',
          phone_number: '+966 12 345 6789',
          email_address: 'info@sabilalhajj.com'
        }
      },
      common: {
        read_more: 'Leggi di Più',
        learn_more: 'Scopri di Più',
        contact_us: 'Contattaci',
        book_now: 'Prenota Ora',
        view_details: 'Vedi Dettagli'
      },
      whatsapp: {
        message: 'Salve! Vorrei informazioni sui servizi Hajj/Umrah.',
        tooltip: 'Chatta con noi su WhatsApp'
      },
      booking: {
        back_to_package: 'Torna ai Dettagli del Pacchetto',
        complete_booking_title: 'Completa la Tua Prenotazione Umrah',
        program_label: 'Programma',
        room_label: 'Camera',
        visa_label: 'Visto',
        performer_count_title: 'Numero di Partecipanti Umrah',
        adults_label: 'Adulti',
        contact_info_title: 'Informazioni di Contatto',
        phone_label: 'Numero di Telefono',
        email_label: 'Indirizzo Email',
        performer_info_title: 'Informazioni Partecipante Umrah 1 - Adulto',
        first_name_label: 'Nome',
        last_name_label: 'Cognome',
        nationality_label: 'Nazionalità',
        document_type_label: 'Seleziona il tipo di documento di viaggio',
        select_document_option: 'Seleziona il tipo di documento di viaggio',
        passport_option: 'Passaporto',
        national_id_option: 'Carta d\'Identità Nazionale',
        submit_button: 'Invia Richiesta di Prenotazione',
        confirm_book_now: 'Conferma e Prenota Ora',
        complete_selection_message: 'Si prega di completare la selezione del Programma, Camera e Visto sopra per continuare.',
        package_details: 'Dettagli del Pacchetto',
        ramadan_title: 'Umrah Ramadan 2026 — Mese Completo di Ramadan',
        selected_program: 'Programma Selezionato (Seleziona per vedere i dettagli e annullare in qualsiasi momento)',
        selected_room: 'Tipo di Camera Selezionato (Seleziona per vedere i dettagli e annullare in qualsiasi momento)',
        selected_visa: 'Tipo di Visto Selezionato (Seleziona per vedere i dettagli e annullare in qualsiasi momento)',
        change: 'Cambia',
        duration: 'Durata:',
        departure: 'Partenza:',
        return: 'Ritorno:',
        from: 'Da:',
        to: 'A:',
        capacity: 'Capacità:',
        view: 'Vista:',
        size: 'Dimensione:',
        validity: 'Validità:',
        stay_duration: 'Durata del Soggiorno:',
        processing: 'Elaborazione:',
        highlights: 'Punti Salienti:',
        includes: 'Include:',
        features: 'Caratteristiche:',
        amenities: 'Servizi:',
        requirements: 'Requisiti:',
        benefits: 'Benefici:',
        nights_total: '9 Notti Totali',
        nights_madinah: '3 Notti Madinah',
        nights_makkah: '6 Notti Makkah',
        direct_flights: 'Voli Diretti',
        vip_transfers: 'Trasferimenti VIP',
        description: 'A SabilAlHajj, facilitiamo ogni dettaglio — dai visti Umrah ai soggiorni in hotel — così puoi eseguire i tuoi riti con tranquillità d\'animo. Vivi un viaggio spirituale che unisce fede e tranquillità d\'animo.',
        why_choose_title: 'Perché scegliere sabilalhajj?',
        feature_1: 'Organizzazione e gestione professionale',
        feature_2: 'Programmi spirituali equilibrati',
        feature_3: 'Accompagnamento dottrinale affidabile',
        feature_4: 'Servizio di alto livello e attenzione ai dettagli',
        error: {
          submission_failed: 'Invio della prenotazione fallito. Riprova o contatta il supporto.'
        }
      },
      umrah: {
        back_to_umrah: 'Torna a Umrah',
        choose_package_title: 'Scegli il Tuo Pacchetto Umrah Ideale',
        choose_package_subtitle: 'Esplora una gamma di pacchetti Umrah progettati con cura per soddisfare le tue esigenze e il tuo budget.',
        ramadan_package_title: 'Umrah Ramadan 2026',
        select_program: 'Seleziona il Tuo Programma Ideale',
        makkah_hotels: 'La Mecca & Medina (Hotel 4★)',
        direct_flights: 'Voli Diretti da Milano/Roma',
        comfortable_transfers: 'Trasferimenti Confortevoli',
        guided_visits: 'Visite Guidate ai Luoghi Santi',
        registering_now: '{{count}} Qualcuno si sta registrando ora',
        view_details: 'Vedi Dettagli',
        share: 'Condividi',
        coming_soon_title: 'Altri Pacchetti Presto Disponibili',
        coming_soon_description: 'Nuovi pacchetti Umrah emozionanti sono in preparazione per te',
        premium: 'Premium',
        coming_soon: 'Presto Disponibile',
        more_packages: 'Altri Pacchetti Presto Disponibili',
        stay_tuned: 'Resta sintonizzato per nuovi pacchetti emozionanti!',
        select_residence: 'Seleziona la Tua Residenza',
        residence_subtitle: 'Adattando i migliori pacchetti alla tua posizione',
        search_country: 'Cerca il tuo paese...',
        round_trip_flights: 'Voli di Andata e Ritorno',
        round_trip_detail: 'Voli premium diretti a Jeddah o Medina',
        luxury_stay: 'Soggiorno di Lusso',
        luxury_detail: 'Hotel 5 stelle a pochi passi dall\'Haram',
        visa_concierge: 'Conciergerie Visa',
        visa_detail: 'Elaborazione e documentazione end-to-end',
        expert_guides: 'Guide Esperti',
        expert_detail: 'Guida erudita attraverso tutti i rituali',
        journey_title: 'Il Viaggio',
        day1_title: 'Arrivo alla Mecca',
        day1_desc: 'Trasferimento VIP e assistenza Ihram.',
        day24_title: 'Rituali e Devozione',
        day24_desc: 'Umrah guidata e profonde conferenze spirituali.',
        day5_title: 'La Città del Profeta',
        day5_desc: 'Trasferimento in treno ad alta velocità a Medina.',
        day68_title: 'Ziyarat e Preghiere',
        day68_desc: 'Visita dei siti storici e accesso a Rawdah.',
        day9_title: 'Partenza Finale',
        day9_desc: 'Preghiere finali e trasferimento all\'aeroporto.',
        reserve_spot: 'Prenota il Tuo Posto',
        join_group: 'Unisciti a 40 altri pellegrini in questo viaggio di gruppo esclusivo che partirà il mese prossimo.',
        group_support: 'Supporto Gruppo 24/7',
        vip_transfers: 'Trasferimenti VIP Privati',
        holy_fees: 'Tariffe di Ingresso ai Luoghi Santi',
        book_plan: 'Prenota Questo Piano',
        back_to_plans: 'Torna ai Piani',
        customize_title: 'Personalizza la Tua Umrah',
        customize_subtitle: 'Personalizza ogni aspetto del tuo viaggio spirituale',
        flexible_duration: 'Durata Flessibile',
        flexible_desc: 'Scegli la durata di soggiorno preferita alla Mecca e Medina',
        hotel_selection: 'Selezione Hotel',
        hotel_desc: 'Scegli tra varie categorie di hotel e posizioni',
        flight_options: 'Opzioni di Volo',
        flight_desc: 'Seleziona le tue compagnie aeree e orari preferiti',
        group_size: 'Dimensione del Gruppo',
        group_desc: 'Viaggia con la tua famiglia o in piccoli gruppi',
        customize_duration: 'Personalizza la Tua Durata',
        days_makka: 'Giorni alla Mecca',
        days_madina: 'Giorni a Medina',
        total_duration: 'Durata Totale',
        choose_package: 'Scegli il Tuo Pacchetto',
        essential_package: 'Pacchetto Essenziale',
        premium_package: 'Pacchetto Premium',
        luxury_package: 'Pacchetto di Lusso',
        starting_from: 'A partire da',
        select_package: 'Seleziona Pacchetto',
        start_planning: 'Inizia la Pianificazione'
      },
      packages: {
        choose_package: 'Scegli il Tuo Pacchetto Perfetto',
        explore_packages: 'Scopri i nostri pacchetti di viaggio attentamente realizzati per rendere il tuo viaggio indimenticabile',
        umrah_packages: 'Pacchetti Umrah',
        hajj: 'HAJJ',
        flight_booking: 'Prenotazione Volo',
        hotel_booking: 'Prenotazione Hotel',
        visa_services: 'Servizi Visa',
        personalized_umrah: 'Umrah Personalizzata',
        personalized_subtitle: 'Personalizza i tuoi giorni alla Mecca e Medina',
        flight: 'Volo',
        hotels: 'Hotel',
        visa: 'Visa',
        guide: 'Guida',
        view_more: 'Vedi di più'
      },
      flights: {
        title: 'La migliore piattaforma per prenotare biglietti aerei!',
        subtitle: 'Veloce | Affidabile e conveniente | Direttamente dalla fonte ufficiale',
        trip_types: {
          one_way: 'Viaggio di sola andata',
          round_trip: 'Andata e ritorno',
          multi_route: 'Multi-percorso'
        },
        search: 'Cerca',
        from: 'Da',
        to: 'A',
        departure: 'Partenza',
        return: 'Ritorno',
        passengers: 'Passeggeri',
        class: 'Classe',
        economy: 'Economica',
        business: 'Business',
        first: 'Prima',
        search_flights: 'Cerca voli',
        select_airport: 'Seleziona aeroporto',
        enter_city: 'Inserisci città o aeroporto'
      },
      umrah_plan: {
        collective: 'Umrah Collettiva',
        personalized: 'Umrah Personalizzata',
        personalized_subtitle: 'Personalizza i tuoi giorni alla Mecca e Medina',
        flight: 'Volo',
        hotels: 'Hotel',
        visa: 'Visa',
        guide: 'Guida',
        reserve_flight: 'Prenota il tuo volo',
        reserve_hotels: 'Prenota i tuoi hotel',
        explore: 'Esplora',
        coming_soon: 'Presto disponibile',
        plan_title: 'Pianifica la tua Umrah perfetta con Sabilalhajj',
        plan_subtitle: 'Scopri l\'Umrah perfetta per te — sia in un\'impostazione di gruppo pacifica che in un\'esperienza personalizzata creata esclusivamente per le tue esigenze.'
      },
      testimonials: {
        title: 'Cosa Dicono I Nostri Pellegrini',
        subtitle: 'Leggi le testimonianze di migliaia di clienti soddisfatti che ci hanno affidato il loro viaggio sacro',
        name1: 'Mouad',
        location1: 'Italia',
        text1: 'Sono soddisfatto dei servizi forniti dalla piattaforma sabillhajj. Il team di supporto era sempre disponibile, e l\'alloggio e il trasporto erano confortevoli e puliti.',
        name2: 'Mouad',
        location2: 'Italia',
        text2: 'Sono soddisfatto dei servizi forniti dalla piattaforma sabillhajj. Il team di supporto era sempre disponibile, e l\'alloggio e il trasporto erano confortevoli e puliti.',
        name3: 'Mouad',
        location3: 'Italia',
        text3: 'Sono soddisfatto dei servizi forniti dalla piattaforma sabillhajj. Il team di supporto era sempre disponibile, e l\'alloggio e il trasporto erano confortevoli e puliti.',
        questions: {
          secure_booking: 'Il processo di prenotazione è sicuro?',
          secure_booking_answer: 'Sì, utilizziamo una crittografia avanzata per garantire che tutti i tuoi dati personali e di pagamento siano mantenuti sicuri durante tutto il processo di prenotazione.',
          support_247: 'Offrite supporto 24/7 durante il viaggio?',
          support_247_answer: 'Assolutamente. Il nostro team di supporto dedicato è disponibile giorno e notte per assisterti prima, durante e dopo il tuo viaggio spirituale.',
          customize_package: 'Posso personalizzare il mio pacchetto di pellegrinaggio?',
          customize_package_answer: 'Sì, offriamo servizi personalizzati e hotel selezionati per adattare il tuo pacchetto specificamente alle tue esigenze.'
        },
        common_questions: 'Domande Frequenti'
      },
      whyChooseUs: {
        title: 'Perché Sceglierci',
        subtitle: 'Scopri cosa ci rende la scelta affidabile per il tuo viaggio spirituale',
        trusted_partner_title: 'Perché sabilhajj è Il Tuo Partner di Fiducia',
        trusted_partner_subtitle: 'Intraprendi il tuo viaggio spirituale con fiducia, sapendo di essere nelle mani di esperti che comprendono la natura sacra del tuo pellegrinaggio.',
        excellence_title: '15+ Anni di Eccellenza',
        excellence_description: 'Più di un decennio e mezzo di servizio dedicato...',
        guidance_title: 'Guida Spirituale Personalizzata',
        guidance_description: 'I nostri studiosi islamici esperti forniscono supporto...',
        certified_title: 'Certificato e Licenziato',
        certified_description: 'Completamente licenziato dalle autorità saudite...',
        care_title: 'Cura del Cliente Ineguagliabile',
        care_description: 'Il nostro team dedicato assicura che ogni dettaglio sia organizzato...',
        reserve_button: 'Prenota con Sabil AlHajj →',
        features: {
          secure_trusted: {
            title: 'Sicuro e Affidabile',
            description: 'La crittografia avanzata mantiene i tuoi dati sicuri.'
          },
          fast_processing: {
            title: 'Elaborazione Veloce',
            description: 'Conferme di prenotazione istantanee.'
          },
          support_journey: {
            title: 'Con Te Durante Tutto il Viaggio',
            description: 'Supporto prima, durante e dopo il tuo viaggio.'
          },
          support_247: {
            title: 'Supporto 24/7',
            description: 'Aiuto in qualsiasi momento, giorno e notte.'
          },
          premium_quality: {
            title: 'Qualità Premium',
            description: 'Hotel selezionati e servizi premium.'
          },
          expert_team: {
            title: 'Team di Esperti',
            description: 'Studiosi e guide esperti.'
          }
        },
        stats: {
          happy_pilgrims: 'Pellegrini Felici',
          years_experience: 'Anni di Esperienza',
          destinations: 'Destinazioni Coperte',
          support_languages: 'Lingue di Supporto'
      },
      sticky_cta: {
        price_per_person: 'Prezzo per persona',
        book_package: 'Prenota Pacchetto'
        },
      gallery: {
        title: 'Galleria Spirituale',
        subtitle: 'Spunti visivi del vostro prossimo viaggio'
      },
      visa: {
        hero: {
          title: 'Visto Umra',
          subtitle: 'Viaggio Religioso Organizzato',
          description: 'Intraprendi un viaggio spirituale verso La Mecca e Medina con il nostro servizio completo di visto Umra.'
        },
        services: {
          title: 'Servizi Visti',
          subtitle: 'Guida completa per i visti Umra e Turistici per il tuo viaggio spirituale.',
          umrah: 'Umra',
          tourist: 'Turistico'
        },
        umrah_section: {
          title: 'Visto Umra: Viaggio Religioso Organizzato verso La Mecca e Medina',
          description1: 'Il visto Umra viene rilasciato ai viaggiatori che desiderano visitare La Mecca Al-Mukarramah e Medina Al-Munawwarah per effettuare l\'Umra e la Ziyarah.',
          description2: 'Generalmente viene concesso come parte di un pacchetto di viaggio completo, che include:',
          services: {
            flights: 'Voli',
            accommodation: 'Sistemazione a La Mecca e Medina',
            transportation: 'Trasporti e trasferimenti',
            coordination: 'Coordinamento completo e follow-up'
          },
          documents: {
            title: 'Documenti Richiesti per il Visto Umra',
            subtitle: 'I documenti richiesti possono variare a seconda dello status di residenza europea del richiedente.',
            residence_permit_title: 'Per i titolari di permesso di residenza europeo:',
            passport_title: 'Per i titolari di passaporto europeo:',
            additional_note: 'Potrebbero essere richiesti documenti aggiuntivi a seconda del paese di residenza o della nazionalità.',
            passport: 'Passaporto',
            residence_permit: 'Carta di permesso di soggiorno',
            personal_photo: 'Foto personale recente',
            address: 'Indirizzo di residenza nel paese del richiedente'
          },
          processing: {
            title: 'Tempo di Elaborazione del Visto Umra',
            time: '24 ore a 3 giorni lavorativi',
            note: 'Il tempo di elaborazione può variare a seconda del paese di richiesta e della nazionalità del viaggiatore.'
          }
        },
        tourist_section: {
          title: 'Visto Turistico — Viaggio Flessibile con Possibilità di Umra',
          description: 'Il visto turistico saudita viene rilasciato per scopi quali visite, turismo e viaggi generali. I titolari di visto turistico possono effettuare l\'Umra, a condizione che rispettino le normative applicabili nel Regno.',
          documents: {
            title: 'Documenti Richiesti per il Visto Turistico',
            subtitle: 'Processo di documentazione semplice e diretto.'
          },
          processing: {
            title: 'Tempo di Elaborazione del Visto Turistico',
            time: '5 minuti a 48 ore',
            note: 'Dipende dal tipo di passaporto e dal paese emittente.'
          }
        }
      }
    }
  },
  ar: {
    translation: {
      navigation: {
        umrah: 'العمرة',
        hajj: 'الحج',
        flights: 'الرحلات',
        hotels: 'الفنادق',
        visa: 'التأشيرة',
        about: 'من نحن',
        overview: 'نظرة عامة',
        package_options: 'خيارات الباقة',
        madinah_itinerary: 'مسار المدينة',
        makkah_itinerary: 'مسار مكة',
        terms_policies: 'الشروط والسياسات',
        responsibility_policy: 'سياسة المسؤولية',
        options_short: 'خيارات',
        madinah_short: 'المدينة',
        makkah_short: 'مكة',
        policies_short: 'السياسات',
        responsibility_short: 'المسؤولية',
        hajj_info: 'معلومات الحج',
        requirements: 'المتطلبات',
        packages: 'الباقات'
      },
      hero: {
        title1: 'مرحباً بكم في سبيل الحج',
        subtitle1: 'شريككم الموثوق لخدمات الحج والعمرة. اختبروا رحلة روحية مليئة بالسلام والإخلاص والذكريات التي لا تُنسى.',
        cta1_primary: 'احجزوا حجكم',
        cta1_secondary: 'اعرفوا المزيد',
        title2: 'اختبروا الحج المقدس',
        subtitle2: 'انطلقوا في أقدس الحج مع إرشادنا الخبير. كل خطوة في رحلتكم مخططة بعناية للإنجاز الروحي.',
        cta2_primary: 'خططوا رحلة الحج',
        cta2_secondary: 'عرض الباقات',
        title3: 'اكتشفوا بركات العمرة',
        subtitle3: 'اجدوا السلام الداخلي من خلال حج العمرة. خدماتنا الشاملة تضمن تجربة روحية ذات معنى ومريحة.',
        cta3_primary: 'احجزوا العمرة الآن',
        cta3_secondary: 'استكشفوا الخيارات',
        title4: 'أماكن إقامة فاخرة',
        subtitle4: 'أقيموا في أكثر الأماكن راحة وملائمة قرب الأماكن المقدسة. يلتقي الترف بالروحانية في فنادقنا الفاخرة.',
        cta4_primary: 'عرض الفنادق',
        cta4_secondary: 'التحقق من التوفر'
      },
      services: {
        title: 'خدماتنا',
        hajj: {
          title: 'حج الحج',
          description: 'باقات الحج الكاملة مع أماكن إقامة فاخرة وإرشاد خبير.'
        },
        umrah: {
          title: 'خدمات العمرة',
          description: 'باقات العمرة المرنة المصممة وفق جدولكم وتفضيلاتكم.'
        },
        visa: {
          title: 'معالجة التأشيرات',
          description: 'خدمات معالجة التأشيرات السريعة والموثوقة للمملكة العربية السعودية مع إرشاد خبير.'
        },
        transportation: {
          title: 'النقل',
          description: 'ترتيبات النقل الآمنة والمريحة طوال رحلة حجكم.'
        }
      },
      about: {
        title: 'من نحن',
        description1: 'مرحباً بكم في سبيل الحج، شريككم الموثوق للرحلات الروحية وخدمات الحج.',
        description2: 'نتخصص في تقديم خدمات الحج والعمرة الشاملة، مما يضمن أن رحلتكم الروحية مريحة وذات معنى وتُستحضر. فريقنا ذو الخبرة مكرس لجعل تجربة حجكم سلسة قدر الإمكان.',
        description3: 'مع سنوات من الخبرة في صناعة الحج، نحن نفهم أهمية كل تفصيل في رحلتكم. من معالجة التأشيرات إلى ترتيبات الإقامة، النقل، والإرشاد الروحي، نحن ندير كل شيء حتى تتمكنوا من التركيز على عبادتكم.'
      },
      contact: {
        title: 'اتصلوا بنا',
        get_in_touch: 'تواصلوا معنا',
        send_message: 'أرسلوا لنا رسالة',
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        subject: 'الموضوع',
        message: 'الرسالة',
        send: 'إرسال الرسالة',
        placeholder_name: 'اسمكم الكامل',
        placeholder_email: 'بريدكم@الإلكتروني.com',
        placeholder_subject: 'كيف يمكننا المساعدة؟',
        placeholder_message: 'أخبرونا عن احتياجات حجكم...',
        address: 'العنوان',
        phone: 'الهاتف',
        email_label: 'البريد الإلكتروني'
      },
      footer: {
        description: 'شريككم الموثوق لخدمات الحج والعمرة. اختبروا رحلة روحية مليئة بالسلام والإخلاص والذكريات التي لا تُنسى.',
        services: 'خدماتنا',
        company: 'الشركة',
        contact_info: 'معلومات الاتصال',
        newsletter_title: 'ابقوا على اطلاع',
        newsletter_description: 'اشتركوا في نشرتنا الإخبارية للحصول على آخر تحديثات الحج والعمرة.',
        subscribe: 'اشتراك',
        copyright: '© {{year}} سبيل الحج. جميع الحقوق محفوظة.',
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الخدمة',
        cookies: 'سياسة ملفات تعريف الارتباط'
      },
      languages: {
        english: 'English',
        french: 'Français',
        italian: 'Italiano',
        arabic: 'العربية',
        language: 'اللغة',
        language_arabic: 'اللغة'
      },
      pages: {
        about: {
          title: 'من نحن',
          subtitle: 'تعرف أكثر على رسالتنا والتزامنا برحلتك الروحية',
          description1: 'مرحباً بكم في سبيل الحج، شريككم الموثوق للرحلات الروحية وخدمات الحج.',
          description2: 'نتخصص في تقديم خدمات الحج والعمرة الشاملة، مما يضمن أن رحلتكم الروحية مريحة وذات معنى وتُستحضر. فريقنا ذو الخبرة مكرس لجعل تجربة حجكم سلسة قدر الإمكان.',
          description3: 'مع سنوات من الخبرة في صناعة الحج، نحن نفهم أهمية كل تفصيل في رحلتكم. من معالجة التأشيرات إلى ترتيبات الإقامة، النقل، والإرشاد الروحي، نحن ندير كل شيء حتى تتمكنوا من التركيز على عبادتكم.'
        },
        services: {
          title: 'خدماتنا',
          hajj: {
            title: 'حج الحج',
            description: 'باقات الحج الكاملة مع أماكن إقامة فاخرة وإرشاد خبير.'
          },
          umrah: {
            title: 'خدمات العمرة',
            description: 'باقات العمرة المرنة المصممة وفق جدولكم وتفضيلاتكم.'
          },
          visa: {
            title: 'معالجة التأشيرات',
            description: 'خدمات معالجة التأشيرات السريعة والموثوقة للمملكة العربية السعودية مع إرشاد خبير.'
          },
          transportation: {
            title: 'النقل',
            description: 'ترتيبات النقل الآمنة والمريحة طوال رحلة الحج الخاصة بكم.'
          },
          accommodation: {
            title: 'الإقامة',
            description: 'أماكن إقامة فندقية فاخرة في مكة والمدينة مع جميع وسائل الراحة الحديثة.'
          },
          spiritual: {
            title: 'الإرشاد الروحي',
            description: 'علماء ومرشدون ذوو خبرة لمساعدتكم طوال رحلتكم الروحية.'
          }
        },
        hajj: {
          title: 'حج الحج',
          subtitle: 'انطلقوا في أقدس الحج في الإسلام',
          description1: 'حج الحج هو أحد أركان الإسلام الخمسة ورحلة روحية عميقة يجب على كل مسلم قادر بدنياً ومالياً القيام بها مرة واحدة على الأقل في حياته.',
          description2: 'باقاتنا الشاملة للحج تضمن أن حجكم ليس فقط مرضياً روحياً بل مريحاً ومنظماً جيداً أيضاً. نحن نتولى كل جانب من جوانب رحلتكم، من معالجة التأشيرات إلى الإقامة والنقل.',
          description3: 'انضموا إلى آلاف الحجاج الذين ائتمنونا على رحلتهم المقدسة. فريقنا ذو الخبرة يقدم دعماً على مدار 24/7 طوال حجكم.'
        },
        umrah: {
          title: 'عمرة العمرة',
          subtitle: 'اختبروا بركات العمرة في أي وقت من السنة',
          description1: 'العمرة هي حج مقدس إلى مكة يمكن أداؤه في أي وقت من السنة، مما يوفر للمسلمين فرصة البحث عن القرب الروحي من الله.',
          description2: 'باقات عمرنا مصممة لتوفير تجربة حج ذات معنى ومريحة. نحن نقدم خيارات جدولة مرنة لتلبية احتياجاتكم وميزانيتكم.',
          description3: 'اختبروا السلام والروحانية للعمرة مع إرشادنا الخبير وخدماتنا الفاخرة. كل تفصيل مخطط بعناية لضمان أن رحلتكم الروحية لا تُنسى.'
        },
        flights: {
          title: 'خدمات الطيران',
          subtitle: 'سفر جوي مناسب ومريح لحجكم',
          description1: 'نحن نقدم خدمات طيران شاملة لرحلات الحج والعمرة الخاصة بكم، مما يضمن وصولكم إلى وجهتكم بأمان وراحة.',
          description2: 'شراكاتنا مع شركات الطيران الرائدة توفر لكم أفضل الأسعار والجداول الأكثر ملائمة لسفر الحج الخاص بكم.',
          description3: 'من نقل المطار إلى الخدمات أثناء الرحلة، نحن نضمن أن رحلتكم تبدأ وتنتهي بسلاسة.'
        },
        hotels: {
          title: 'أماكن الإقامة الفندقية',
          subtitle: 'أماكن إقامة فاخرة بالقرب من الأماكن المقدسة',
          description1: 'أقيموا في الراحة والملائمة مع أماكن إقامتنا الفندقية الفاخرة الموجودة استراتيجياً بالقرب من الأماكن المقدسة في مكة والمدينة.',
          description2: 'شركاؤنا الفندقيون يقدمون وسائل راحة حديثة، خدمة ممتازة، ووصولاً سهلاً إلى المسجد الحرام ومسجد النبي.',
          description3: 'اختروا من بين خيارات إقامة متنوعة لتناسب تفضيلاتكم وميزانيتكم، مع الحفاظ دائماً على أعلى معايير الراحة والنظافة.'
        },
        blog: {
          title: 'المدونة',
          subtitle: 'رؤى ودليل وقصص من عالم الحج والرحلات الروحية',
          posts: {
            hajj_rituals: {
              title: 'فهم طقوس الحج',
              excerpt: 'دليل شامل لأركان الحج الخمسة وأهميتها الروحية.'
            },
            umrah_prep: {
              title: 'الاستعداد لرحلة العمرة الخاصة بكم',
              excerpt: 'نصائح أساسية واستعدادات لتجربة حج عمرة ذات معنى.'
            },
            kaaba_history: {
              title: 'تاريخ الكعبة وأهميتها',
              excerpt: 'استكشاف التاريخ المقدس وأهمية بيت الله الروحية.'
            },
            modern_pilgrimage: {
              title: 'الحج الحديث: التكنولوجيا والتقاليد',
              excerpt: 'كيف تعزز التكنولوجيا تجربة الحج مع الحفاظ على التقاليد المقدسة.'
            }
          },
          load_more: 'تحميل المزيد من المقالات',
          min_read: 'دقيقة للقراءة'
        },
        contact: {
          title: 'اتصلوا بنا',
          subtitle: 'تواصلوا مع فريقنا للحصول على مساعدة شخصية',
          get_in_touch: 'تواصلوا معنا',
          send_message: 'أرسلوا لنا رسالة',
          name: 'الاسم',
          email: 'البريد الإلكتروني',
          subject: 'الموضوع',
          message: 'الرسالة',
          send: 'إرسال الرسالة',
          placeholder_name: 'اسمكم الكامل',
          placeholder_email: 'بريدكم@الإلكتروني.com',
          placeholder_subject: 'كيف يمكننا المساعدة؟',
          placeholder_message: 'أخبرونا عن احتياجات حجكم...',
          address: 'العنوان',
          phone: 'الهاتف',
          email_label: 'البريد الإلكتروني',
          location: '123 شارع الحج، مكة، المملكة العربية السعودية',
          phone_number: '+966 12 345 6789',
          email_address: 'info@sabilalhajj.com'
        }
      },
      common: {
        read_more: 'اقرأ المزيد',
        learn_more: 'اعرف المزيد',
        contact_us: 'اتصلوا بنا',
        book_now: 'احجز الآن',
        view_details: 'عرض التفاصيل'
      },
      whatsapp: {
        message: 'مرحباً! أود الاستفسار عن خدمات الحج والعمرة.',
        tooltip: 'تواصل معنا عبر واتساب'
      },
      booking: {
        back_to_package: 'العودة إلى تفاصيل الباقة',
        complete_booking_title: 'أكمل حجز عمرةك',
        program_label: 'البرنامج',
        room_label: 'الغرفة',
        visa_label: 'التأشيرة',
        performer_count_title: 'عدد المعتمرين',
        adults_label: 'البالغين',
        contact_info_title: 'معلومات الاتصال',
        phone_label: 'رقم الهاتف',
        email_label: 'البريد الإلكتروني',
        performer_info_title: 'معلومات المعتمر 1 - بالغ',
        first_name_label: 'الاسم الأول',
        last_name_label: 'اسم العائلة',
        nationality_label: 'الجنسية',
        document_type_label: 'اختر نوع وثيقة السفر',
        select_document_option: 'اختر نوع وثيقة السفر',
        passport_option: 'جواز سفر',
        national_id_option: 'بطاقة الهوية الوطنية',
        submit_button: 'إرسال طلب الحجز',
        confirm_book_now: 'تأكيد والحجز الآن',
        complete_selection_message: 'يرجى إكمال اختيار البرنامج والغرفة والتأشيرة أعلاه للمتابعة.',
        package_details: 'تفاصيل الباقة',
        ramadan_title: 'عمرة رمضان 2026 — شهر رمضان كامل',
        selected_program: 'البرنامج المختار (اختر لرؤية التفاصيل والإلغاء في أي وقت)',
        selected_room: 'نوع الغرفة المختار (اختر لرؤية التفاصيل والإلغاء في أي وقت)',
        selected_visa: 'نوع التأشيرة المختار (اختر لرؤية التفاصيل والإلغاء في أي وقت)',
        change: 'تغيير',
        duration: 'المدة:',
        departure: 'المغادرة:',
        return: 'العودة:',
        from: 'من:',
        to: 'إلى:',
        capacity: 'السعة:',
        view: 'الإطلالة:',
        size: 'الحجم:',
        validity: 'الصلاحية:',
        stay_duration: 'مدة الإقامة:',
        processing: 'المعالجة:',
        highlights: 'النقاط البارزة:',
        includes: 'يشمل:',
        features: 'الميزات:',
        amenities: 'المرافق:',
        requirements: 'المتطلبات:',
        benefits: 'المزايا:',
        nights_total: '9 ليالٍ إجمالاً',
        nights_madinah: '3 ليالٍ المدينة',
        nights_makkah: '6 ليالٍ مكة',
        direct_flights: 'رحلات مباشرة',
        vip_transfers: 'نقل VIP',
        description: 'في سبيل الحج، نحن نسهل كل تفصيل — من تأشيرات العمرة إلى إقامات الفنادق — حتى تتمكن من أداء مناسكك براحة بال. اختبر رحلة روحية تجمع بين الإيمان والهدوء النفسي.',
        why_choose_title: 'لماذا تختار سبيل الحج؟',
        feature_1: 'تنظيم وإدارة مهنية',
        feature_2: 'برامج روحية متوازنة',
        feature_3: 'مرافقة علمية موثوقة',
        feature_4: 'خدمة عالية المستوى واهتمام بالتفاصيل',
        error: {
          submission_failed: 'فشل في إرسال الحجز. يرجى المحاولة مرة أخرى أو الاتصال بالدعم.'
        }
      },
      umrah: {
        back_to_umrah: 'العودة إلى العمرة',
        choose_package_title: 'اختر باقتك المثالية للعمرة',
        choose_package_subtitle: 'استكشف مجموعة من باقات العمرة المصممة بعناية لتتناسب مع احتياجاتك وميزانيتك.',
        ramadan_package_title: 'عمرة رمضان 2026',
        select_program: 'اختر برنامجك المثالي',
        makkah_hotels: 'مكة والمدينة (فنادق 4★)',
        direct_flights: 'رحلات مباشرة من ميلانو/روما',
        comfortable_transfers: 'نقل مريح',
        guided_visits: 'زيارات موجهة للأماكن المقدسة',
        registering_now: '{{count}} شخص يسجل الآن',
        view_details: 'عرض التفاصيل',
        share: 'مشاركة',
        coming_soon_title: 'باقات أخرى قريباً',
        coming_soon_description: 'باقات عمرة مثيرة جديدة قيد التحضير لك',
        premium: 'مميز',
        coming_soon: 'قريباً',
        more_packages: 'باقات أخرى قريباً',
        stay_tuned: 'ابق على اطلاع للباقات الجديدة المثيرة!',
        select_residence: 'اختر إقامتك',
        residence_subtitle: 'تخصيص أفضل الباقات لموقعك',
        search_country: 'ابحث عن بلدك...',
        round_trip_flights: 'رحلات ذهاب وعودة',
        round_trip_detail: 'رحلات فاخرة مباشرة إلى جدة أو المدينة',
        luxury_stay: 'إقامة فاخرة',
        luxury_detail: 'فنادق 5 نجوم على بعد خطوات من الحرم',
        visa_concierge: 'خدمة التأشيرات',
        visa_detail: 'معالجة وتوثيق شاملة من البداية إلى النهاية',
        expert_guides: 'مرشدون خبراء',
        expert_detail: 'إرشاد علمي من خلال جميع الطقوس',
        journey_title: 'الرحلة',
        day1_title: 'الوصول إلى مكة',
        day1_desc: 'نقل VIP ومساعدة إحرام.',
        day24_title: 'الطقوس والعبادة',
        day24_desc: 'عمرة موجهة ومحاضرات روحية عميقة.',
        day5_title: 'مدينة النبي',
        day5_desc: 'نقل بالقطار فائق السرعة إلى المدينة.',
        day68_title: 'الزيارات والصلوات',
        day68_desc: 'زيارة المواقع التاريخية والوصول إلى الروضة.',
        day9_title: 'المغادرة النهائية',
        day9_desc: 'الصلوات النهائية والنقل إلى المطار.',
        reserve_spot: 'احجز مكانك',
        join_group: 'انضم إلى 40 حاجاً آخرين في هذه الرحلة الجماعية الحصرية المغادرة الشهر المقبل.',
        group_support: 'دعم جماعي على مدار 24/7',
        vip_transfers: 'نقل VIP خاص',
        holy_fees: 'رسوم دخول الأماكن المقدسة',
        book_plan: 'احجز هذا الخطة',
        back_to_plans: 'العودة إلى الخطط',
        customize_title: 'خصص عمرةك',
        customize_subtitle: 'خصص كل جانب من جوانب رحلتك الروحية',
        flexible_duration: 'مدة مرنة',
        flexible_desc: 'اختر مدة الإقامة المفضلة لديك في مكة والمدينة',
        hotel_selection: 'اختيار الفندق',
        hotel_desc: 'اختر من بين فئات فنادق مختلفة ومواقع',
        flight_options: 'خيارات الرحلات',
        flight_desc: 'اختر شركات الطيران والأوقات المفضلة لديك',
        group_size: 'حجم المجموعة',
        group_desc: 'سافر مع عائلتك أو في مجموعات صغيرة',
        customize_duration: 'خصص مدتك',
        days_makka: 'أيام في مكة',
        days_madina: 'أيام في المدينة',
        total_duration: 'المدة الإجمالية',
        choose_package: 'اختر باقتك',
        essential_package: 'الباقة الأساسية',
        premium_package: 'الباقة المميزة',
        luxury_package: 'باقة الترف',
        starting_from: 'ابتداءً من',
        select_package: 'اختر الباقة',
        start_planning: 'ابدأ التخطيط'
      },
      packages: {
        choose_package: 'اختر باقتك المثالية',
        explore_packages: 'اكتشف باقات السفر المصممة بعناية لجعل رحلتك لا تُنسى',
        umrah_packages: 'باقات العمرة',
        hajj: 'الحج',
        flight_booking: 'حجز الرحلات',
        hotel_booking: 'حجز الفنادق',
        visa_services: 'خدمات التأشيرة',
        personalized_umrah: 'عمرة مخصصة',
        personalized_subtitle: 'خصص أيامك في مكة والمدينة',
        flight: 'رحلة',
        hotels: 'فنادق',
        visa: 'تأشيرة',
        guide: 'مرشد',
        view_more: 'عرض المزيد'
      },
      flights: {
        title: 'أفضل منصة لحجز تذاكر الطيران!',
        subtitle: 'سريع | موثوق ومناسب | مباشرة من المصدر الرسمي',
        trip_types: {
          one_way: 'رحلة ذهاب فقط',
          round_trip: 'رحلة ذهاب وعودة',
          multi_route: 'رحلات متعددة'
        },
        search: 'بحث',
        from: 'من',
        to: 'إلى',
        departure: 'المغادرة',
        return: 'العودة',
        passengers: 'الركاب',
        class: 'الدرجة',
        economy: 'اقتصادية',
        business: 'رجال أعمال',
        first: 'درجة أولى',
        search_flights: 'البحث عن رحلات',
        select_airport: 'اختر المطار',
        enter_city: 'أدخل المدينة أو المطار'
      },
      umrah_plan: {
        collective: 'عمرة جماعية',
        personalized: 'عمرة مخصصة',
        personalized_subtitle: 'خصص أيامك في مكة والمدينة',
        flight: 'رحلة',
        hotels: 'فنادق',
        visa: 'تأشيرة',
        guide: 'مرشد',
        reserve_flight: 'احجز رحلتك',
        reserve_hotels: 'احجز فنادقك',
        explore: 'استكشف',
        coming_soon: 'قريباً',
        plan_title: 'خطط لعمرة مثالية مع سبيل الحج',
        plan_subtitle: 'اكتشف العمرة المثالية لك — سواء في إعداد جماعي هادئ أو تجربة مخصصة مصممة خصيصاً لاحتياجاتك.'
      },
      testimonials: {
        title: 'ماذا يقول حجاجنا',
        subtitle: 'اقرأ شهادات الآلاف من العملاء الراضين الذين ائتمنونا على رحلتهم المقدسة',
        name1: 'معاذ',
        location1: 'إيطاليا',
        text1: 'أنا راضٍ عن الخدمات المقدمة من منصة سبيل الحج. كان فريق الدعم متاحاً دائماً، والإقامة والنقل مريحين ونظيفين.',
        name2: 'معاذ',
        location2: 'إيطاليا',
        text2: 'أنا راضٍ عن الخدمات المقدمة من منصة سبيل الحج. كان فريق الدعم متاحاً دائماً، والإقامة والنقل مريحين ونظيفين.',
        name3: 'معاذ',
        location3: 'إيطاليا',
        text3: 'أنا راضٍ عن الخدمات المقدمة من منصة سبيل الحج. كان فريق الدعم متاحاً دائماً، والإقامة والنقل مريحين ونظيفين.',
        questions: {
          secure_booking: 'هل عملية الحجز آمنة؟',
          secure_booking_answer: 'نعم، نحن نستخدم تشفير متقدم لضمان الحفاظ على جميع بياناتك الشخصية وبيانات الدفع آمنة طوال عملية الحجز.',
          support_247: 'هل تقدمون دعماً على مدار 24/7 أثناء الرحلة؟',
          support_247_answer: 'بالتأكيد. فريق الدعم المخصص لدينا متاح على مدار الساعة لمساعدتك قبل وأثناء وبعد رحلتك الروحية.',
          customize_package: 'هل يمكنني تخصيص باقة حجي؟',
          customize_package_answer: 'نعم، نحن نقدم خدمات مخصصة وفنادق مختارة بعناية لتخصيص باقتك خصيصاً لاحتياجاتك.'
        },
        common_questions: 'الأسئلة الشائعة'
      },
      whyChooseUs: {
        title: 'لماذا تختارنا',
        subtitle: 'اكتشف ما يجعلنا الخيار الموثوق لرحلتك الروحية',
        trusted_partner_title: 'لماذا سبيل الحج هو شريكك الموثوق',
        trusted_partner_subtitle: 'انطلق في رحلتك الروحية بثقة، عالماً أنك في أيدي خبراء يفهمون الطبيعة المقدسة لحجك.',
        excellence_title: '15+ سنة من التميز',
        excellence_description: 'أكثر من عقد ونصف من الخدمة المخصصة...',
        guidance_title: 'إرشاد روحي مخصص',
        guidance_description: 'علماؤنا الإسلاميون ذوو الخبرة يقدمون الدعم...',
        certified_title: 'معتمد ومرخص',
        certified_description: 'مرخص بالكامل من قبل السلطات السعودية...',
        care_title: 'رعاية عملاء لا مثيل لها',
        care_description: 'فريقنا المخصص يضمن ترتيب كل تفصيل...',
        reserve_button: 'احجز مع حجاج البيت →',
        features: {
          secure_trusted: {
            title: 'آمن وموثوق',
            description: 'التشفير المتقدم يحافظ على أمان بياناتك.'
          },
          fast_processing: {
            title: 'معالجة سريعة',
            description: 'تأكيدات الحجز الفورية.'
          },
          support_journey: {
            title: 'معك طوال الرحلة',
            description: 'دعم قبل وأثناء وبعد رحلتك.'
          },
          support_247: {
            title: 'دعم 24/7',
            description: 'مساعدة في أي وقت، نهاراً وليلاً.'
          },
          premium_quality: {
            title: 'جودة ممتازة',
            description: 'فنادق مختارة وخدمات ممتازة.'
          },
          expert_team: {
            title: 'فريق خبراء',
            description: 'علماء ومرشدون ذوو خبرة.'
          }
        },
        stats: {
          happy_pilgrims: 'حجاج سعداء',
          years_experience: 'سنوات من الخبرة',
          destinations: 'الوجهات المغطاة',
          support_languages: 'لغات الدعم'
      },
      sticky_cta: {
        price_per_person: 'السعر لكل شخص',
        book_package: 'احجز الباقة'
        },
      gallery: {
        title: 'المعرض الروحي',
        subtitle: 'لمحات بصرية لرحلتكم القادمة'
      },
      visa: {
        hero: {
          title: 'تأشيرة العمرة',
          subtitle: 'رحلة دينية منظمة',
          description: 'انطلق في رحلة روحية إلى مكة والمدينة مع خدمة تأشيرة العمرة الشاملة لدينا.'
        },
        services: {
          title: 'خدمات التأشيرة',
          subtitle: 'دليل شامل لتأشيرات العمرة والسياحة لرحلتك الروحية.',
          umrah: 'عمرة',
          tourist: 'سياحية'
        },
        umrah_section: {
          title: 'تأشيرة العمرة: رحلة دينية منظمة إلى مكة والمدينة',
          description1: 'يتم إصدار تأشيرة العمرة للمسافرين الذين يرغبون في زيارة مكة المكرمة والمدينة المنورة لأداء العمرة والزيارة.',
          description2: 'يتم منحها عادةً كجزء من حزمة سفر كاملة، والتي تشمل:',
          services: {
            flights: 'الرحلات',
            accommodation: 'الإقامة في مكة والمدينة',
            transportation: 'النقل والتنقلات',
            coordination: 'التنسيق الكامل والمتابعة'
          },
          documents: {
            title: 'الوثائق المطلوبة لتأشيرة العمرة',
            subtitle: 'قد تختلف الوثائق المطلوبة حسب حالة الإقامة الأوروبية للمتقدم.',
            residence_permit_title: 'لحاملي تصريح الإقامة الأوروبي:',
            passport_title: 'لحاملي جواز السفر الأوروبي:',
            additional_note: 'قد تكون هناك حاجة لوثائق إضافية حسب بلد الإقامة أو الجنسية.',
            passport: 'جواز السفر',
            residence_permit: 'بطاقة تصريح الإقامة',
            personal_photo: 'صورة شخصية حديثة',
            address: 'عنوان الإقامة في بلد المتقدم'
          },
          processing: {
            title: 'وقت معالجة تأشيرة العمرة',
            time: '24 ساعة إلى 3 أيام عمل',
            note: 'قد يختلف وقت المعالجة حسب بلد الطلب وجنسية المسافر.'
          }
        },
        tourist_section: {
          title: 'التأشيرة السياحية — سفر مرن مع إمكانية العمرة',
          description: 'يتم إصدار التأشيرة السياحية السعودية لأغراض مثل الزيارات والسياحة والسفر العام. يمكن لحاملي التأشيرة السياحية أداء العمرة، شريطة الامتثال للأنظمة المعمول بها في المملكة.',
          documents: {
            title: 'الوثائق المطلوبة للتأشيرة السياحية',
            subtitle: 'عملية توثيق بسيطة ومباشرة.'
          },
          processing: {
            title: 'وقت معالجة التأشيرة السياحية',
            time: '5 دقائق إلى 48 ساعة',
            note: 'يعتمد ذلك على نوع جواز السفر وبلد الإصدار.'
          }
        }
      }
    }
  }}}}}
 
};



i18n
  .use(LanguageDetector)
  // .use(initReactI18next) // This passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    // In Next.js/SSR, don't set 'lng' explicitly if using a detector 
    // unless you are handling hydration manually.
    lng: typeof window !== 'undefined' ? undefined : 'en', 
    
    debug: false,
    interpolation: {
      escapeValue: false, 
    },
    detection: {
      // Re-enable detection but prioritize localStorage for consistency
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;