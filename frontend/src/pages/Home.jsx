import React, { useState } from 'react';
import { ChevronDown, MapPin, Building2, Home as HomeIcon, Ruler, IndianRupee, Users, Shield, Dumbbell, Waves, Leaf, Baby, Grid3x3, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const carouselRef = React.useRef(null);

  const heroImage = 'https://images.unsplash.com/photo-1758193431355-54df41421657';
  
  const galleryImages = [
    'https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwwfHx8fDE3NjEwMzY4NDF8MA&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1715985160020-d8cd6fdc8ba9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwwfHx8fDE3NjEwMzY4NDF8MA&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1751998816160-0bdb329a3b9f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwwfHx8fDE3NjEwMzY4NDF8MA&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1751998816246-c63d182770c0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwwfHx8fDE3NjEwMzY4NDF8MA&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1543489822-c49534f3271f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxpbmZpbml0eSUyMHBvb2x8ZW58MHx8fHwxNzYxMDM2ODQ4fDA&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1521750465-672a0f580901?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxpbmZpbml0eSUyMHBvb2x8ZW58MHx8fHwxNzYxMDM2ODQ4fDA&ixlib=rb-4.1.0&q=85',
    'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg',
    'https://images.unsplash.com/photo-1758448756350-3d0eec02ba37?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBneW18ZW58MHx8fHwxNzYxMDM2ODU1fDA&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1760031670160-4da44e9596d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBneW18ZW58MHx8fHwxNzYxMDM2ODU1fDA&ixlib=rb-4.1.0&q=85',
    'https://images.pexels.com/photos/4944975/pexels-photo-4944975.jpeg',
    'https://images.unsplash.com/photo-1668854824157-c4143ea7ca6b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxsYW5kc2NhcGVkJTIwZ2FyZGVufGVufDB8fHx8MTc2MTAzNjg2M3ww&ixlib=rb-4.1.0&q=85',
    'https://images.pexels.com/photos/34380469/pexels-photo-34380469.jpeg',
    'https://images.pexels.com/photos/33217719/pexels-photo-33217719.jpeg',
    'https://images.unsplash.com/photo-1758526116322-52919e89b3c3'
  ];

  const stats = [
    { label: 'Towers', value: '3', icon: Building2 },
    { label: 'Floors', value: '15 each', icon: HomeIcon },
    { label: 'Total Flats', value: '206', icon: Users },
    { label: 'Unit Types', value: '3 & 4.5 BHK', icon: Ruler },
    { label: 'Location', value: 'Whitefield, Bangalore', icon: MapPin },
    { label: 'Starting Price', value: '₹8.62 Cr Onwards', icon: IndianRupee }
  ];

  const amenities = [
    { icon: Waves, title: 'Infinity Pool & Sun Deck' },
    { icon: Dumbbell, title: 'State-of-the-Art Gym' },
    { icon: Leaf, title: 'Yoga Deck & Wellness Studio' },
    { icon: Sparkles, title: 'Concierge & Smart Home Automation' },
    { icon: Baby, title: "Children's Play Zone" },
    { icon: Shield, title: '24/7 Security & Surveillance' },
    { icon: Grid3x3, title: 'Landscaped Terraces & Sky Gardens' },
    { icon: HomeIcon, title: 'Premium Clubhouse Spaces' }
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
        const response = await axios.post(`${API}/leads`, leadData);
        if (response.status === 200) {
          toast.success('Thank you! Our team will contact you shortly.');
          setFormData({ name: '', email: '', phone: '', bhk3: false, bhk4: false, brochure: false });
        }
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

  // Auto-scroll carousel effect
  React.useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollInterval;
    let isUserScrolling = false;
    let userScrollTimeout;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isUserScrolling && carousel) {
          const maxScroll = carousel.scrollWidth - carousel.clientWidth;
          const currentScroll = carousel.scrollLeft;
          
          if (currentScroll >= maxScroll - 10) {
            // Reset to beginning for seamless loop
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            carousel.scrollBy({ left: 1.5, behavior: 'auto' });
          }
        }
      }, 20);
    };

    const handleUserScroll = () => {
      isUserScrolling = true;
      clearTimeout(userScrollTimeout);
      userScrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 2000);
    };

    carousel.addEventListener('touchstart', handleUserScroll);
    carousel.addEventListener('touchmove', handleUserScroll);
    startAutoScroll();

    return () => {
      clearInterval(scrollInterval);
      clearTimeout(userScrollTimeout);
      if (carousel) {
        carousel.removeEventListener('touchstart', handleUserScroll);
        carousel.removeEventListener('touchmove', handleUserScroll);
      }
    };
  }, []);

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
          {/* Left Half - Image */}
          <div className="relative h-[50vh] lg:h-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
            <img src={heroImage} alt="Brigade Avalon" className="w-full h-full object-cover" />
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 lg:px-12">
              <h1 className="text-4xl lg:text-6xl font-display text-white mb-4 animate-fade-in">Brigade Avalon — Homes Crafted for the Few.</h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8 animate-fade-in-delay">3 & 4.5 BHK Luxury Residences in Whitefield | Starting at ₹8.62 Cr Onwards.</p>
              <div>
                <Button onClick={scrollToForm} size="lg" className="bg-gold hover:bg-gold-dark text-white rounded-full px-8 text-lg">Book a Site Visit</Button>
              </div>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
              <ChevronDown className="text-white w-8 h-8" />
            </div>
          </div>

          {/* Right Half - At a Glance */}
          <div className="bg-charcoal text-white p-6 lg:p-12 flex items-center">
            <div className="w-full">
              <h2 className="text-3xl lg:text-4xl font-display mb-8 text-gold">At a Glance</h2>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={idx} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all hover:scale-105">
                      <CardContent className="p-6">
                        <Icon className="w-10 h-10 text-gold mb-3" />
                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                        <div className="text-sm text-white/70">{stat.label}</div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 lg:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-display text-center mb-8 lg:mb-16 text-charcoal">Gallery</h2>
          
          {/* Mobile Carousel - Infinite Loop */}
          <div className="lg:hidden relative">
            <div 
              ref={carouselRef}
              className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-4 -mx-4" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Triple the images for seamless loop */}
              {[...galleryImages, ...galleryImages, ...galleryImages].map((img, idx) => (
                <div 
                  key={idx} 
                  className="flex-shrink-0 w-[280px] h-[280px] snap-center"
                  onClick={() => openLightbox(img)}
                >
                  <div className="relative overflow-hidden rounded-xl h-full shadow-lg">
                    <img src={img} alt={`Gallery ${(idx % galleryImages.length) + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <span className="text-white text-sm font-medium">Tap to view</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 gap-1">
              <div className="px-3 py-1 bg-gold/20 rounded-full">
                <span className="text-xs text-gold font-medium">Swipe to explore →</span>
              </div>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer" onClick={() => openLightbox(img)}>
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <CheckCircle2 className="text-white w-12 h-12" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 lg:mt-12">
            <Button onClick={scrollToForm} size="lg" className="bg-gold hover:bg-gold-dark text-white rounded-full px-8">Book a Site Visit</Button>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-display text-center mb-4 text-charcoal">A Lifestyle Beyond Ordinary</h2>
          <div className="grid lg:grid-cols-2 gap-12 mt-16">
            <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-auto">
              <img src={galleryImages[4]} alt="Amenities" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              {amenities.map((amenity, idx) => {
                const Icon = amenity.icon;
                return (
                  <Card key={idx} className="border-gold/20 hover:border-gold transition-all hover:shadow-lg hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <Icon className="w-12 h-12 text-gold mx-auto mb-3" />
                      <p className="text-sm font-medium">{amenity.title}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="text-center mt-12">
            <Button onClick={scrollToForm} size="lg" className="bg-gold hover:bg-gold-dark text-white rounded-full px-8">Book a Site Visit</Button>
          </div>
        </div>
      </section>

      {/* Floor Plans Section */}
      <section id="floor-plans" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-display text-center mb-4 text-charcoal">Floor Plans & Configurations</h2>
          <p className="text-center text-lg text-gray-600 mb-12">Choose from spacious 3 BHK and 4.5 BHK residences crafted for modern living.</p>
          <Tabs defaultValue="3bhk" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="3bhk" className="text-lg">3 BHK</TabsTrigger>
              <TabsTrigger value="4bhk" className="text-lg">4.5 BHK</TabsTrigger>
            </TabsList>
            <TabsContent value="3bhk">
              <Card className="border-gold/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-display mb-4">3 BHK Residence</h3>
                  <p className="text-gray-600 mb-4">Spacious 3-bedroom configuration with modern amenities</p>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-6">
                    <p className="text-gray-400">Floor Plan Illustration</p>
                  </div>
                  <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white rounded-full">View Floor Plan</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="4bhk">
              <Card className="border-gold/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-display mb-4">4.5 BHK Residence</h3>
                  <p className="text-gray-600 mb-4">Ultra-spacious 4.5-bedroom configuration with premium finishes</p>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-6">
                    <p className="text-gray-400">Floor Plan Illustration</p>
                  </div>
                  <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white rounded-full">View Floor Plan</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <div className="text-center mt-12">
            <Button onClick={scrollToForm} size="lg" className="bg-gold hover:bg-gold-dark text-white rounded-full px-8">Book a Site Visit</Button>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-display text-center mb-16 text-charcoal">Perfectly Located in Whitefield</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="rounded-2xl overflow-hidden h-[400px] bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62208.12345678901!2d77.7499!3d12.9698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWhitefield%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Brigade Avalon Location"
              />
            </div>
            <div>
              <Accordion type="single" collapsible className="space-y-4">
                {proximities.map((prox, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border border-gold/20 rounded-lg px-4">
                    <AccordionTrigger className="text-left font-medium hover:text-gold">{prox.title}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{prox.description}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button onClick={scrollToForm} size="lg" className="bg-gold hover:bg-gold-dark text-white rounded-full px-8">Book a Site Visit</Button>
          </div>
        </div>
      </section>

      {/* Final CTA + Form Section */}
      <section id="book-visit" className="relative py-24 lg:py-40">
        <div className="absolute inset-0">
          <img src={galleryImages[0]} alt="Book Visit" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl lg:text-6xl font-display mb-6">Ready to Experience Brigade Avalon?</h2>
            <p className="text-xl lg:text-2xl mb-12">Book a private tour and our team will get in touch.</p>
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-10 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-left">
                    <label className="block text-white font-medium mb-2 text-lg">Full Name *</label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-white/90 border-white/30 h-14 text-lg"
                      required
                    />
                  </div>
                  
                  <div className="text-left">
                    <label className="block text-white font-medium mb-2 text-lg">Email</label>
                    <Input
                      type="email"
                      placeholder="Enter your email (optional)"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/90 border-white/30 h-14 text-lg"
                    />
                  </div>
                  
                  <div className="text-left">
                    <label className="block text-white font-medium mb-2 text-lg">Phone Number *</label>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-white/90 border-white/30 h-14 text-lg"
                      required
                    />
                  </div>
                  
                  <div className="text-left">
                    <label className="block text-white font-medium mb-4 text-lg">Preferred Options</label>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-4 cursor-pointer bg-white/5 hover:bg-white/10 p-4 rounded-lg transition-all">
                        <input
                          type="checkbox"
                          checked={formData.bhk3}
                          onChange={(e) => setFormData({ ...formData, bhk3: e.target.checked })}
                          className="w-5 h-5 rounded border-white/30 text-gold focus:ring-gold focus:ring-offset-0"
                        />
                        <span className="text-white text-lg">3 BHK</span>
                      </label>
                      
                      <label className="flex items-center space-x-4 cursor-pointer bg-white/5 hover:bg-white/10 p-4 rounded-lg transition-all">
                        <input
                          type="checkbox"
                          checked={formData.bhk4}
                          onChange={(e) => setFormData({ ...formData, bhk4: e.target.checked })}
                          className="w-5 h-5 rounded border-white/30 text-gold focus:ring-gold focus:ring-offset-0"
                        />
                        <span className="text-white text-lg">4.5 BHK</span>
                      </label>
                      
                      <label className="flex items-center space-x-4 cursor-pointer bg-white/5 hover:bg-white/10 p-4 rounded-lg transition-all">
                        <input
                          type="checkbox"
                          checked={formData.brochure}
                          onChange={(e) => setFormData({ ...formData, brochure: e.target.checked })}
                          className="w-5 h-5 rounded border-white/30 text-gold focus:ring-gold focus:ring-offset-0"
                        />
                        <span className="text-white text-lg">Send me brochure and project plan</span>
                      </label>
                    </div>
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full bg-gold hover:bg-gold-dark text-white rounded-full h-14 text-lg font-semibold mt-8" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                  </Button>
                  <p className="text-sm text-white/70 text-center mt-4">Your information is secure and will only be used to contact you about Brigade Avalon.</p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-display font-bold mb-2 text-gold">Brigade Avalon</div>
              <p className="text-white/70 text-sm">Luxury residences crafted for discerning homeowners</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#gallery" className="text-white/70 hover:text-gold transition-colors">Gallery</a></li>
                <li><a href="#amenities" className="text-white/70 hover:text-gold transition-colors">Amenities</a></li>
                <li><a href="#floor-plans" className="text-white/70 hover:text-gold transition-colors">Floor Plans</a></li>
                <li><a href="#location" className="text-white/70 hover:text-gold transition-colors">Location</a></li>
                <li><a href="#book-visit" className="text-white/70 hover:text-gold transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Phone: +91 80 1234 5678</li>
                <li>Email: info@brigadeavalonwhitefield.com</li>
                <li>Address: Whitefield, Bangalore, Karnataka</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-sm text-white/50">
            <p>&copy; 2025 Brigade Avalon. All rights reserved. | <a href="#" className="hover:text-gold">Privacy Policy</a></p>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-4 right-4 text-white text-4xl hover:text-gold">&times;</button>
          <img src={lightboxImage} alt="Gallery" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </div>
  );
};

export default Home;