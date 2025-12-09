import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Banner from '@/components/Banner';
import SpecialOffers from '@/components/SpecialOffers';
import FeaturedProduct from '@/components/FeaturedProduct';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      
        <Hero />
        <Categories />
        <SpecialOffers />
        <Banner />
        <FeaturedProduct />
        <FAQ />
      
      
    </div>
  );
}
