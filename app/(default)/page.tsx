export const metadata = {
  title: "Home - Open PRO",
  description: "Page description",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";
import Package from "@/components/package";
// import AuthStatus from "@/components/authStatus"; 

export default function Home() {
  return (
    <>
      {/* <AuthStatus /> */}
      <PageIllustration />
      <Hero />
      <Package />
      <Features />
      <Testimonials />
      <Cta />
    </>
  );
}
