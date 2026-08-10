import Hero from "../Components/Hero";
import FeaturedDestination from "../Components/FeaturedDestinantion";
import ExclusiveOffers from "../Components/ExclusiveOffers";
import Testimonial from "../Components/Testimonial";
import NewsLetter from "../Components/NewsLetter";
import RecommendedHotels from "../Components/RecommendedHotels";

const Home=()=>{
    return(
        <>
            <Hero/>
            <RecommendedHotels/>
            <FeaturedDestination/>
            <ExclusiveOffers/>
            <Testimonial/>
            <NewsLetter/>
        </>
    )
}

export default Home;