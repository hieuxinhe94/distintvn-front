import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import SellbyPartnerProducts from "@modules/home/components/sell-by-partner"
import SuggestionProducts from "@modules/home/components/suggest-products"
import CustomProduct from "@modules/layout/components/custom-product"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UNIQUE",
  description:
    "Shop all available models only at the ACME. Worldwide Shipping. Secure Payment.",
}

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CustomProduct />
      <SuggestionProducts />
      <SellbyPartnerProducts />
    </>
  )
}

export default Home
