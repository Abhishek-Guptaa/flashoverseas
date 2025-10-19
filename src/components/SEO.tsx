import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: any;
  localBusiness?: boolean;
  pageType?: 'home' | 'services' | 'destinations' | 'about' | 'contact' | 'testimonials' | 'blog' | 'visa-assistance' | 'test-preparation' | 'financial-assistance' | 'blog-post' | 'admission-guidance';
}

const SEO: React.FC<SEOProps> = ({
  title = "Flash Overseas - Study Abroad Consultants in Hyderabad | Best Overseas Education Consultants",
  description = "Leading study abroad consultants in Hyderabad, Secunderabad, Telangana. Expert guidance for USA, UK, Canada, Australia, Germany, Singapore. University selection, visa assistance, IELTS/TOEFL coaching. Free consultation available.",
  keywords = "study abroad consultants hyderabad, overseas education hyderabad, study abroad consultants secunderabad, study abroad consultants telangana, study abroad consultants vizag, overseas education vizag, study abroad consultants visakhapatnam, best study abroad consultants andhra pradesh, USA study consultants hyderabad, UK study consultants hyderabad, Canada study consultants hyderabad, Australia study consultants hyderabad, Germany study consultants hyderabad, Singapore study consultants hyderabad, IELTS coaching hyderabad, TOEFL coaching hyderabad, GRE coaching hyderabad, GMAT coaching hyderabad, visa assistance hyderabad, university selection hyderabad, study abroad guidance hyderabad, international education consultants hyderabad, overseas education guidance hyderabad, study abroad visa consultants hyderabad",
  image = "/Logo.png",
  url = "https://flashoverseas.com",
  type = "website",
  structuredData,
  localBusiness = true,
  pageType = 'home'
}) => {
  // Base structured data for organization
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Flash Overseas",
    "alternateName": "Flash Overseas Study Abroad Consultants",
    "description": "Leading study abroad consultants providing expert guidance for international education in USA, UK, Canada, Australia, Germany, Singapore and more countries.",
    "url": "https://flashoverseas.com",
    "logo": "https://flashoverseas.com/Logo.png",
    "image": "https://flashoverseas.com/Logo.png",
    "telephone": "+91-XXXXXXXXXX",
    "email": "info@flashoverseas.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "DSL Abacus IT Park, Industrial Development Area, Uppal",
      "addressLocality": "Secunderabad",
      "addressRegion": "Telangana",
      "postalCode": "500039",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.4065",
      "longitude": "78.4772"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Hyderabad",
        "containedInPlace": {
          "@type": "State",
          "name": "Telangana"
        }
      },
      {
        "@type": "City",
        "name": "Secunderabad",
        "containedInPlace": {
          "@type": "State",
          "name": "Telangana"
        }
      },
      {
        "@type": "City",
        "name": "Visakhapatnam",
        "containedInPlace": {
          "@type": "State",
          "name": "Andhra Pradesh"
        }
      },
      {
        "@type": "Country",
        "name": "India"
      }
    ],
    "serviceType": [
      "Study Abroad Consulting",
      "University Selection",
      "Visa Assistance",
      "IELTS Coaching",
      "TOEFL Coaching",
      "GRE Coaching",
      "GMAT Coaching",
      "Test Preparation",
      "Application Guidance",
      "Scholarship Assistance"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Study Abroad Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "USA Study Abroad Guidance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "UK Study Abroad Guidance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Canada Study Abroad Guidance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Australia Study Abroad Guidance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Germany Study Abroad Guidance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Singapore Study Abroad Guidance"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/flashoverseas",
      "https://www.instagram.com/flashoverseas",
      "https://www.linkedin.com/company/flashoverseas",
      "https://twitter.com/flashoverseas"
    ]
  };

  // Local Business structured data
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://flashoverseas.com/#localbusiness",
    "name": "Flash Overseas - Study Abroad Consultants",
    "image": "https://flashoverseas.com/Logo.png",
    "description": "Premier study abroad consultants in Visakhapatnam providing comprehensive guidance for international education.",
    "url": "https://flashoverseas.com",
    "telephone": "+91-XXXXXXXXXX",
    "email": "info@flashoverseas.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "DSL Abacus IT Park, Industrial Development Area, Uppal",
      "addressLocality": "Secunderabad",
      "addressRegion": "Telangana",
      "postalCode": "500039",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.4065",
      "longitude": "78.4772"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "16:00"
      }
    ],
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    }
  };

  // FAQ structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the best study abroad consultants in Hyderabad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flash Overseas is one of the leading study abroad consultants in Hyderabad and Secunderabad, providing expert guidance for USA, UK, Canada, Australia, Germany, Singapore and other countries with comprehensive visa assistance and university selection services."
        }
      },
      {
        "@type": "Question",
        "name": "Who can benefit from study abroad consulting services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our study abroad consulting services are designed for three main target audiences: Students aspiring to pursue higher education abroad (UG, PG, PhD), Parents looking for reliable guidance for their children's international education, and Working professionals planning skill enhancement or global career opportunities."
        }
      },
      {
        "@type": "Question",
        "name": "How much does it cost to study abroad from India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Study abroad costs vary by country and university. USA: $30,000-60,000/year, UK: £11,000-35,000/year, Canada: $20,000-40,000/year, Australia: $25,000-45,000/year, Germany: €0-20,000/year, Singapore: $15,000-35,000/year. Contact us for detailed cost analysis."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide IELTS coaching in Vizag?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide comprehensive IELTS coaching in Visakhapatnam with experienced trainers, mock tests, and personalized guidance to help you achieve your target band score."
        }
      },
      {
        "@type": "Question",
        "name": "Which countries offer the best study abroad opportunities for Indian students?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Top study abroad destinations for Indian students include USA (world-class universities), UK (shorter programs), Canada (post-study work opportunities), Australia (beautiful lifestyle), Germany (free/low-cost education), and Singapore (Asian hub). Each offers unique advantages."
        }
      }
    ]
  };

  const finalStructuredData = structuredData || baseStructuredData;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Flash Overseas" />
      
      {/* Local SEO Meta Tags */}
      <meta name="geo.region" content="IN-TG" />
      <meta name="geo.placename" content="Hyderabad" />
      <meta name="geo.position" content="17.4065;78.4772" />
      <meta name="ICBM" content="17.4065, 78.4772" />
      <meta name="DC.title" content={title} />
      <meta name="DC.description" content={description} />
      <meta name="DC.subject" content="Study Abroad Consultants, Overseas Education, Visa Assistance" />
      <meta name="DC.creator" content="Flash Overseas" />
      <meta name="DC.publisher" content="Flash Overseas" />
      <meta name="DC.contributor" content="Flash Overseas" />
      <meta name="DC.date" content={new Date().toISOString()} />
      <meta name="DC.type" content="Text" />
      <meta name="DC.format" content="text/html" />
      <meta name="DC.identifier" content={url} />
      <meta name="DC.language" content="en" />
      <meta name="DC.coverage" content="India, Hyderabad, Secunderabad, Telangana, Visakhapatnam, Andhra Pradesh" />
      <meta name="DC.rights" content="Copyright Flash Overseas" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Flash Overseas" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="hi_IN" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:site" content="@flashoverseas" />
      <meta property="twitter:creator" content="@flashoverseas" />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={url} />
      
      {/* Language and Region */}
      <meta httpEquiv="content-language" content="en-IN" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN-TG" />
      <meta name="geo.placename" content="Hyderabad" />
      
      {/* Mobile and App */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Flash Overseas" />
      
      {/* Theme and Colors */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {localBusiness && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessData)}
        </script>
      )}
      
      {pageType === 'home' && (
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      )}
      
      {/* Additional Meta Tags for Better SEO */}
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.pexels.com" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
};

export default SEO;
