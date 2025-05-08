// LivousLifestylePage.jsx
import Head from 'next/head';
import CompanyPage from '../components/CompanyPage';

const LivousLifestylePage = () => {
  const livousData = {
    companyName: "Livous Lifestyle Limited",
    logo: "/images/livous-logo.png", // Update with your actual logo path
    description: "Livous Lifestyle Limited is dedicated to creating premium lifestyle products and experiences that enhance everyday living with elegance and functionality.",
    
    mission: "To transform everyday living through innovative lifestyle products that combine aesthetics, functionality, and sustainability.",
    
    vision: "To be the leading lifestyle brand known for quality, design excellence, and commitment to enhancing people's daily experiences.",
    
    services: [
      {
        title: "Premium Home Decor",
        description: "Curated selection of high-quality home decor items that blend style, comfort, and functionality.",
        icon: <i className="bi bi-house-heart fs-1"></i>
      },
      {
        title: "Lifestyle Accessories",
        description: "Thoughtfully designed accessories that add convenience and style to everyday activities.",
        icon: <i className="bi bi-bag-heart fs-1"></i>
      },
      {
        title: "Sustainable Living Solutions",
        description: "Eco-friendly products that support sustainable living without compromising on quality or design.",
        icon: <i className="bi bi-tree fs-1"></i>
      },
      {
        title: "Custom Design Services",
        description: "Personalized design services for clients seeking unique lifestyle products tailored to their preferences.",
        icon: <i className="bi bi-palette fs-1"></i>
      }
    ],
    
    contactInfo: {
      email: "info@livouslifestyle.com",
      phone: "+880 1XXX-XXXXXX",
      address: "123 Lifestyle Avenue, Dhaka, Bangladesh",
      website: "www.livouslifestyle.com"
    },
    
    socialMedia: {
      facebook: "https://facebook.com/livouslifestyle",
      instagram: "https://instagram.com/livouslifestyle",
      linkedin: "https://linkedin.com/company/livouslifestyle"
    },
    
    teamMembers: [
      {
        name: "Sarah Johnson",
        position: "Founder & Creative Director",
        image: "/images/team/sarah.jpg", // Update with actual image path
        bio: "With over 15 years in lifestyle product design, Sarah leads the creative vision of Livous."
      },
      {
        name: "Rahim Ahmed",
        position: "Head of Product Development",
        image: "/images/team/rahim.jpg", // Update with actual image path
        bio: "Rahim brings technical expertise to turn creative concepts into refined products."
      },
      {
        name: "Mina Patel",
        position: "Sustainability Director",
        image: "/images/team/mina.jpg", // Update with actual image path
        bio: "Mina ensures our commitment to environmental responsibility in all products."
      }
    ],
    
    businessHours: [
      { days: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
      { days: "Saturday", hours: "10:00 AM - 4:00 PM" },
      { days: "Sunday", hours: "Closed" }
    ]
  };

  return (
    <>
      <Head>
        <title>Livous Lifestyle Limited - Premium Lifestyle Products</title>
        <meta name="description" content="Livous Lifestyle Limited creates premium lifestyle products that enhance everyday living with elegance and functionality." />
      </Head>
      
      <CompanyPage {...livousData} />5
    </>
  );
};

export default LivousLifestylePage;