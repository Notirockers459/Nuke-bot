import React, { useState } from 'react';
import { ChevronDown, MapPin, Building2, Home as HomeIcon, Ruler, IndianRupee, Users, Shield, Dumbbell, Waves, Leaf, Baby, Grid3x3, Sparkles, CheckCircle2, X, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    bhk3: false,
    bhk4: false,
    brochure: false
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const carouselRef = React.useRef(null);

  const heroImage = 'https://images.unsplash.com/photo-1758193431355-54df41421657?w=800&q=75';
  
  // Gallery images - Your actual Brigade Avalon photos (15 images total)
  const galleryImages = [
    'https://customer-assets.emergentagent.com/job_brigade-avalon/artifacts/oy07hf21_image.png',
    'https://customer-assets.emergentagent.com/job_brigade-avalon/artifacts/h3eg75p6_image.png',
    'https://customer-assets.emergentagent.com/job_brigade-avalon/artifacts/se2yja4h_image.png',
    'https://customer-assets.emergentagent.com/job_brigade-avalon/artifacts/ej5x1fei_image.png',
    'https://customer-assets.emergentagent.com/job_brigade-avalon/artifacts/1bg1fo2p_image.png',
    'https://customer-assets.emergentagent.com/job_brigade-avalon/artifacts/f7a4gbvw_image.png',
    'https://customer-assets.emergentagent.com/job_brigade-avalon/artifacts/9c0nx2gq_image.png',
    'https://customer-assets.emergentagent.com/job_brigade-avalon/artifacts/q04tpa4x_image.png',
    'https://customer-assets.emergentagent.com/job_brigade-avalon/artifacts/w2ns81ry_image.png',
    'https://customer-assets.emergentagent.com/job_brigade-avalon/artifacts/rs2yopo9_image.png',
    'https://customer-assets.emergentagent.com/job_brigade-avalon/artifacts/8eu6wtsz_image.png',
    'https://customer-assets.emergentagent.com/job_brigade-avalon/artifacts/3zan03sc_image.png',
    'https://customer-assets.emergentagent.com/job_brigade-avalon/artifacts/qym8mkon_image.png',
    'https://customer-assets.emergentagent.com/job_brigade-avalon/artifacts/ksh5tcht_image.png',
    'https://customer-assets.emergentagent.com/job_brigade-avalon/artifacts/9drrefc1_image.png'
  ];

  const stats = [
    { 
      label: 'Towers', 
      value: '3', 
      icon: Building2,
      link: '#gallery'
    },
    { 
      label: 'Floors', 
      value: '15 each', 
      icon: HomeIcon,
      link: '#gallery'
    },
    { 
      label: 'Total Flats', 
      value: '206', 
      icon: Users,
      link: '#gallery'
    },
    { 
      label: 'Unit Types', 
      value: '3 & 4.5 BHK', 
      icon: Ruler,
      link: '#floor-plans'
    },
    { 
      label: 'Location', 
      value: 'Whitefield, Bangalore', 
      icon: MapPin,
      link: '#location'
    },
    { 
      label: 'Starting Price', 
      value: '₹4.62 Cr Onwards', 
      icon: IndianRupee,
      link: '#floor-plans'
    }
  ];

  const amenities = [
    { 
      icon: Waves, 
      title: 'Infinity Pool & Sun Deck',
      image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&q=75'
    },
    { 
      icon: Dumbbell, 
      title: 'State-of-the-Art Gym',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=75'
    },
    { 
      icon: Leaf, 
      title: 'Yoga Deck & Wellness',
      image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&q=75'
    },
    { 
      icon: Sparkles, 
      title: 'Smart Home Tech',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75'
    },
    { 
      icon: Baby, 
      title: "Children's Play Zone",
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=75'
    },
    { 
      icon: Shield, 
      title: '24/7 Security',
      image: 'https://images.unsplash.com/photo-1496368077930-c1e31b4e5b44?w=600&q=75'
    },
    { 
      icon: Grid3x3, 
      title: 'Sky Gardens',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=75'
    },
    { 
      icon: HomeIcon, 
      title: 'Premium Clubhouse',
      image: 'https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=600&q=75'
    },
    { 
      icon: Users, 
      title: 'Banquet Hall',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c9eb?w=600&q=75'
    },
    { 
      icon: Dumbbell, 
      title: 'Tennis Court',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=75'
    },
    { 
      icon: Waves, 
      title: 'Jogging Track',
      image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=75'
    },
    { 
      icon: Leaf, 
      title: 'Meditation Garden',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=75'
    }
  ];

  const floorPlans = [
    {
      type: '3 BHK',
      sqft: '2,933',
      price: '₹4.62 Cr Onwards',
      image: 'https://customer-assets.emergentagent.com/job_brigade-avalon/artifacts/fwaxxscl_image.png',
      description: 'Spacious 3-bedroom layout with modern amenities and elegant finishes'
    },
    {
      type: '4.5 BHK',
      sqft: '3,862',
      price: '₹8 Cr Onwards',
      image: 'https://customer-assets.emergentagent.com/job_brigade-avalon/artifacts/b6i51ubm_image.png',
      description: 'Luxurious 4.5-bedroom configuration with premium fixtures and expansive living areas'
    }
  ];

  const proximities = [
    { title: '5 min to Metro Station', description: 'Seamless connectivity to the city with the nearest metro station just 5 minutes away.' },
    { title: '10 min to ITPL Tech Park', description: 'One of Bangalore\'s premier IT hubs is just 10 minutes from your doorstep.' },
    { title: '15 min to Phoenix Marketcity', description: 'Premium shopping, dining, and entertainment options within easy reach.' },
    { title: '20 min to Airport Access Road', description: 'Quick access to the airport for your business and leisure travel needs.' },
    { title: 'Top Schools & Hospitals Nearby', description: 'Renowned educational institutions and healthcare facilities in close proximity.' }
  ];

  const scrollToForm = () => {
    document.getElementById('book-visit')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setLoading(true);
      try {
        const preferences = [];
        if (formData.bhk3) preferences.push('3 BHK');
        if (formData.bhk4) preferences.push('4.5 BHK');
        if (formData.brochure) preferences.push('Brochure');

        // Split name into first and last
        const nameParts = formData.name.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        const leadData = {
          name: formData.name,
          email: formData.email || 'Not provided',
          phone: formData.phone,
          preferences: {
            bhk3: formData.bhk3,
            bhk4: formData.bhk4,
            brochure: formData.brochure
          }
        };

        // Save to our backend
        await axios.post(`${API}/leads`, leadData);

        // Send to CRM
        const crmData = {
          rep_id: 'Varsha@buildnestrealty.com',
          channel_id: 'LP_Brigade',
          subject: 'Lead from Brigade Avalon Website',
          f_name: firstName,
          l_name: lastName,
          email: formData.email || '',
          phonefax: formData.phone,
          notes: `Interested in: ${preferences.join(', ') || 'General Inquiry'}`,
          project: 'Brigade Avalon',
          alert_client: 0,
          alert_rep: 0
        };

        await axios.post(`${API}/crm/submit`, crmData);
        
        setShowSuccess(true);
        setFormData({ name: '', email: '', phone: '', bhk3: false, bhk4: false, brochure: false });
        
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } catch (error) {
        console.error('Error submitting lead:', error);
        toast.error('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please fill in all required fields (Name and Phone).');
    }
  };

  const openLightbox = (image) => {
    setLightboxImage(image);
    setLightboxOpen(true);
  };

  return (
    <div className="brigade-avalon">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="text-2xl font-display font-bold text-charcoal">Brigade Avalon</div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#gallery" className="text-sm font-medium hover:text-gold transition-colors">Gallery</a>
              <a href="#amenities" className="text-sm font-medium hover:text-gold transition-colors">Amenities</a>
              <a href="#floor-plans" className="text-sm font-medium hover:text-gold transition-colors">Floor Plans</a>
              <a href="#location" className="text-sm font-medium hover:text-gold transition-colors">Location</a>
              <Button onClick={scrollToForm} className="bg-gold hover:bg-gold-dark text-white rounded-full px-6">Book a Site Visit</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section relative pt-20">
        <div className="grid lg:grid-cols-2 min-h-[90vh]">
          <div className="relative h-[50vh] lg:h-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
            <img src={heroImage} alt="Brigade Avalon" className="w-full h-full object-cover" loading="eager" />
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 lg:px-12">
              <h1 className="text-4xl lg:text-6xl font-display text-white mb-4 animate-fade-in">Discover Brigade Avalon</h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-2 animate-fade-in-delay">Where Calm Meets Excellence</p>
              <p className="text-base lg:text-lg text-white/80 mb-8">3 & 4.5 BHK Luxury Residences in Whitefield | Starting at ₹4.62 Cr</p>
              <div>
                <Button onClick={scrollToForm} size="lg" className="bg-gold hover:bg-gold-dark text-white rounded-full px-8 text-lg">Book a Site Visit</Button>
              </div>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
              <ChevronDown className="text-white w-8 h-8" />
            </div>
          </div>

          {/* At a Glance with Clickable Navigation Cards */}
          <div className="bg-charcoal text-white p-6 lg:p-12 flex items-center">
            <div className="w-full">
              <h2 className="text-3xl lg:text-4xl font-display mb-8 text-gold">At a Glance</h2>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <a 
                      key={idx} 
                      href={stat.link}
                      className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold/50 transition-all cursor-pointer rounded-lg p-4 lg:p-6 block group"
                    >
                      <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-gold mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-xl lg:text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-xs lg:text-sm text-white/70">{stat.label}</div>
                      <div className="text-xs text-gold/0 group-hover:text-gold/100 mt-2 transition-colors">View Details →</div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-display text-center mb-6 lg:mb-12 text-charcoal">Gallery</h2>
          
          <div className="lg:hidden relative">
            <div 
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 px-4 -mx-4" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx} 
                  className="flex-shrink-0 w-[85vw] h-[85vw] max-w-[340px] max-h-[340px] snap-center"
                  onClick={() => openLightbox(img)}
                >
                  <div className="relative overflow-hidden rounded-2xl h-full shadow-xl">
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-white text-sm font-semibold">Tap to view full size</span>
                        <span className="text-white/70 text-xs">{idx + 1}/{galleryImages.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 gap-2">
              {galleryImages.map((_, idx) => (
                <div key={idx} className="w-2 h-2 rounded-full bg-gold/30"></div>
              ))}
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer" onClick={() => openLightbox(img)}>
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <CheckCircle2 className="text-white w-10 h-10" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button onClick={scrollToForm} size="lg" className="bg-gold hover:bg-gold-dark text-white rounded-full px-8">Book a Site Visit</Button>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-display text-center mb-3 text-charcoal">A Lifestyle Beyond Ordinary</h2>
          <p className="text-center text-gray-600 mb-8 lg:mb-12">Modern luxury set amidst 80% open spaces and timeless tranquility</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 max-w-6xl mx-auto">
            {amenities.map((amenity, idx) => {
              const Icon = amenity.icon;
              return (
                <div 
                  key={idx} 
                  className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={() => openLightbox(amenity.image)}
                >
                  <img 
                    src={amenity.image} 
                    alt={amenity.title} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-white">
                    <Icon className="w-8 h-8 lg:w-10 lg:h-10 mb-2 text-gold" />
                    <h3 className="text-xs lg:text-sm font-bold text-center uppercase tracking-wide">{amenity.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button onClick={scrollToForm} size="lg" className="bg-gold hover:bg-gold-dark text-white rounded-full px-8">Book a Site Visit</Button>
          </div>
        </div>
      </section>

      {/* Floor Plans Section */}
      <section id="floor-plans" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-display text-center mb-3 text-charcoal">Floor Plans & Configurations</h2>
          <p className="text-center text-base lg:text-lg text-gray-600 mb-8 lg:mb-12">Choose from spacious residences crafted for modern living</p>
          
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {floorPlans.map((plan, idx) => (
              <Card key={idx} className="border-gold/20 hover:border-gold transition-all overflow-hidden">
                <div className="relative h-[250px] lg:h-[300px] bg-gray-100">
                  <img src={plan.image} alt={`${plan.type} Floor Plan`} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute top-4 left-4 bg-gold text-white px-4 py-2 rounded-full font-bold">
                    {plan.type}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl lg:text-2xl font-display font-bold">{plan.type} Residence</h3>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Area</div>
                      <div className="text-lg font-bold text-gold">{plan.sqft} sq.ft</div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-gray-500 mb-1">Starting Price</div>
                    <div className="text-xl font-bold text-charcoal">{plan.price}</div>
                  </div>
                  <p className="text-sm lg:text-base text-gray-600 mb-4">{plan.description}</p>
                  <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-white rounded-full">View Detailed Plan</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button onClick={scrollToForm} size="lg" className="bg-gold hover:bg-gold-dark text-white rounded-full px-8">Book a Site Visit</Button>
          </div>
        </div>
      </section>

      {/* Master Plan Section */}
      <section id="master-plan" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-display text-center mb-3 text-charcoal">Master Plan</h2>
          <p className="text-center text-base lg:text-lg text-gray-600 mb-8 lg:mb-12">A meticulously planned community designed for modern living</p>
          
          <div className="max-w-5xl mx-auto">
            <Card className="border-gold/20 overflow-hidden">
              <div className="relative bg-gray-100 aspect-[16/10] lg:aspect-[16/9]">
                <img 
                  src="https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1200&q=80" 
                  alt="Brigade Avalon Master Plan" 
                  className="w-full h-full object-contain p-4 lg:p-8 cursor-pointer hover:scale-105 transition-transform duration-300" 
                  loading="lazy"
                  onClick={() => openLightbox('https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1200&q=80')}
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-charcoal">
                  Click to enlarge
                </div>
              </div>
              <CardContent className="p-6 lg:p-8">
                <p className="text-center text-gray-600 text-sm lg:text-base">
                  Explore the comprehensive layout of Brigade Avalon showcasing 3 towers, expansive green spaces, premium amenities, and thoughtfully planned access points.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button onClick={scrollToForm} size="lg" className="bg-gold hover:bg-gold-dark text-white rounded-full px-8">Book a Site Visit</Button>
          </div>
        </div>
      </section>

      {/* Terrace Plan Section */}
      <section id="terrace-plan" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-display text-center mb-3 text-charcoal">Terrace Plan</h2>
          <p className="text-center text-base lg:text-lg text-gray-600 mb-8 lg:mb-12">Exclusive terrace layouts with breathtaking views and premium outdoor spaces</p>
          
          <div className="max-w-5xl mx-auto">
            <Card className="border-gold/20 overflow-hidden">
              <div className="relative bg-gray-100 aspect-[16/10] lg:aspect-[16/9]">
                <img 
                  src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80" 
                  alt="Brigade Avalon Terrace Plan" 
                  className="w-full h-full object-contain p-4 lg:p-8 cursor-pointer hover:scale-105 transition-transform duration-300" 
                  loading="lazy"
                  onClick={() => openLightbox('https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80')}
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-charcoal">
                  Click to enlarge
                </div>
              </div>
              <CardContent className="p-6 lg:p-8">
                <p className="text-center text-gray-600 text-sm lg:text-base">
                  Discover the luxurious terrace configurations featuring landscaped gardens, seating areas, and panoramic views of Whitefield skyline.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button onClick={scrollToForm} size="lg" className="bg-gold hover:bg-gold-dark text-white rounded-full px-8">Book a Site Visit</Button>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-display text-center mb-8 lg:mb-12 text-charcoal">At the Heart of Whitefield</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden h-[300px] lg:h-[400px] bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9647614!2d77.745827!3d12.9647614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae0fbce8c3b737%3A0x35d54209821e8964!2sBrigade%20Avalon!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Brigade Avalon Location"
              />
            </div>
            <div>
              <Accordion type="single" collapsible className="space-y-3">
                {proximities.map((prox, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border border-gold/20 rounded-lg px-4">
                    <AccordionTrigger className="text-left text-sm lg:text-base font-medium hover:text-gold">{prox.title}</AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">{prox.description}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button onClick={scrollToForm} size="lg" className="bg-gold hover:bg-gold-dark text-white rounded-full px-8">Book a Site Visit</Button>
          </div>
        </div>
      </section>

      {/* Final CTA + Form Section */}
      <section id="book-visit" className="relative py-20 lg:py-32">
        <div className="absolute inset-0">
          <img src={galleryImages[0]} alt="Book Visit" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-6xl font-display mb-4 lg:mb-6">Ready to Experience Brigade Avalon?</h2>
            <p className="text-lg lg:text-2xl mb-8 lg:mb-12">Book a private tour and our team will get in touch</p>
            
            {showSuccess ? (
              <Card className="bg-white/95 backdrop-blur-md border-white/20">
                <CardContent className="p-12 text-center">
                  <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 animate-bounce-in">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-charcoal mb-3">Thank You!</h3>
                  <p className="text-gray-700 mb-2">Your inquiry has been submitted successfully.</p>
                  <p className="text-gray-600 text-sm">Our team will contact you shortly to schedule your site visit.</p>
                  <Button 
                    onClick={() => setShowSuccess(false)} 
                    className="mt-6 bg-gold hover:bg-gold-dark text-white rounded-full px-8"
                  >
                    Submit Another Inquiry
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-8 lg:p-12">
                  <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-6">
                    <div className="text-left">
                      <label className="block text-white font-medium mb-2 text-base lg:text-lg">Full Name *</label>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white/90 border-white/30 h-12 lg:h-14 text-base lg:text-lg"
                        required
                      />
                    </div>
                    
                    <div className="text-left">
                      <label className="block text-white font-medium mb-2 text-base lg:text-lg">Email</label>
                      <Input
                        type="email"
                        placeholder="Enter your email (optional)"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/90 border-white/30 h-12 lg:h-14 text-base lg:text-lg"
                      />
                    </div>
                    
                    <div className="text-left">
                      <label className="block text-white font-medium mb-2 text-base lg:text-lg">Phone Number *</label>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-white/90 border-white/30 h-12 lg:h-14 text-base lg:text-lg"
                        required
                      />
                    </div>
                    
                    <div className="text-left">
                      <label className="block text-white font-medium mb-3 lg:mb-4 text-base lg:text-lg">Preferred Options</label>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3 lg:space-x-4 cursor-pointer bg-white/5 hover:bg-white/10 p-3 lg:p-4 rounded-lg transition-all">
                          <input
                            type="checkbox"
                            checked={formData.bhk3}
                            onChange={(e) => setFormData({ ...formData, bhk3: e.target.checked })}
                            className="w-5 h-5 rounded border-white/30 text-gold focus:ring-gold focus:ring-offset-0"
                          />
                          <span className="text-white text-base lg:text-lg">3 BHK (2,933 sq.ft)</span>
                        </label>
                        
                        <label className="flex items-center space-x-3 lg:space-x-4 cursor-pointer bg-white/5 hover:bg-white/10 p-3 lg:p-4 rounded-lg transition-all">
                          <input
                            type="checkbox"
                            checked={formData.bhk4}
                            onChange={(e) => setFormData({ ...formData, bhk4: e.target.checked })}
                            className="w-5 h-5 rounded border-white/30 text-gold focus:ring-gold focus:ring-offset-0"
                          />
                          <span className="text-white text-base lg:text-lg">4.5 BHK (3,862 sq.ft)</span>
                        </label>
                        
                        <label className="flex items-center space-x-3 lg:space-x-4 cursor-pointer bg-white/5 hover:bg-white/10 p-3 lg:p-4 rounded-lg transition-all">
                          <input
                            type="checkbox"
                            checked={formData.brochure}
                            onChange={(e) => setFormData({ ...formData, brochure: e.target.checked })}
                            className="w-5 h-5 rounded border-white/30 text-gold focus:ring-gold focus:ring-offset-0"
                          />
                          <span className="text-white text-base lg:text-lg">Send me brochure and project plan</span>
                        </label>
                      </div>
                    </div>
                    
                    <Button type="submit" size="lg" className="w-full bg-gold hover:bg-gold-dark text-white rounded-full h-12 lg:h-14 text-base lg:text-lg font-semibold mt-6 lg:mt-8" disabled={loading}>
                      {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                    <p className="text-xs lg:text-sm text-white/70 text-center mt-3 lg:mt-4">Your information is secure and will only be used to contact you about Brigade Avalon.</p>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-10 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
            <div>
              <div className="text-xl lg:text-2xl font-display font-bold mb-2 text-gold">Brigade Avalon</div>
              <p className="text-white/70 text-sm">For those who thought they had everything</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 lg:mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#gallery" className="text-white/70 hover:text-gold transition-colors">Gallery</a></li>
                <li><a href="#amenities" className="text-white/70 hover:text-gold transition-colors">Amenities</a></li>
                <li><a href="#floor-plans" className="text-white/70 hover:text-gold transition-colors">Floor Plans</a></li>
                <li><a href="#location" className="text-white/70 hover:text-gold transition-colors">Location</a></li>
                <li><a href="#book-visit" className="text-white/70 hover:text-gold transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 lg:mb-4">Contact Info</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Phone: +91 80 1234 5678</li>
                <li>Email: info@brigadeavalonwhitefield.com</li>
                <li>Address: Whitefield, Bangalore, Karnataka</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-xs lg:text-sm text-white/50">
            <p>&copy; 2025 Brigade Avalon. All rights reserved. | <a href="#" className="hover:text-gold">Privacy Policy</a></p>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-4 right-4 text-white text-4xl hover:text-gold">&times;</button>
          <img src={lightboxImage} alt="Gallery" className="max-w-full max-h-full object-contain" loading="lazy" />
        </div>
      )}
    </div>
  );
};

export default Home;