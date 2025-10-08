
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import RecentListings from "@/components/home/RecentListings";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <HowItWorks />
      <RecentListings />
      <Stats />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default Index;
