import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";


const Slider = () => {

    const promotions = [
        { id: 1, image: "https://digimedical.vn/wp-content/uploads/2023/08/bai-viet-quang-cao-phong-kham-san-phu-khoa.jpg", link: "/promo1" },
        { id: 2, image: "https://digimedical.vn/wp-content/uploads/2023/08/mau-bai-viet-quang-cao-phong-kham-da-khoa-1.jpg", link: "/promo2" },
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