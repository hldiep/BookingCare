import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";


const Slider = () => {

    const promotions = [
        { id: 1, image: "https://hn.medcare.vn/wp-content/uploads/sites/4/2022/03/Banner-Kham-benh-hieu-qua-scaled.jpg", link: "/promo1" },
        { id: 2, image: "https://bizweb.dktcdn.net/100/378/435/themes/755692/assets/slider_1.png?1663489820792", link: "/promo2" },
    ];

    return (
        <>
            <div className="rounded-lg mt-10 p-3 m-[20px]">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    autoplay={{ delay: 3000, disableOnInteraction: false }} // Thêm autoplay với delay 5 giây
                    modules={[Navigation, Autoplay]}
                    className="my-8 max-h-[150px] md:max-h-[200px] lg:max-h-[400px]"
                >
                    {promotions.map((promo) => (
                        <SwiperSlide key={promo.id}>
                            <img
                                src={promo.image}
                                alt={`Promotion ${promo.id}`}
                                className="w-full rounded-sm h-auto object-cover md:max-h-[200px] lg:max-h-[400px] sm:max-h-[150px]"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default Slider;