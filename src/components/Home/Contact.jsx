import React from 'react'

const Contact = () => {
    return (
        <div className="min-h-screen pt-28 bg-main flex justify-center">
            <div className='container justify-center items-center pt-20 p-5'>
                <div className='flex space-x-4'>
                    <div>
                        <h2 className="font-bold text-3xl text-highlight uppercase text-center font-georgia mb-5">Trung tâm khám bệnh Star</h2>
                        <p><strong>Địa chỉ:</strong> 97 Đường Man Thiện, Phường Hiệp Phú, Quận 9, TP. Hồ Chí Minh</p>
                        <p><strong>Điện thoại:</strong> 0923 456 453</p>
                        <p><strong>Email:</strong> khambenhstar@gmail.com</p>
                    </div>
                    <div className="">
                        <h2 className='font-bold text-3xl uppercase text-highlight text-center font-georgia'>Liên hệ với chúng tôi</h2>
                        <form className="p-10">
                            <input
                                type="text"
                                name="ten"
                                placeholder="Nhập họ và tên *"
                                required
                                className="border rounded-full px-4 py-2 w-full text-black outline-none"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Nhập email *"
                                required
                                className="mt-5 border rounded-full px-4 py-2 w-full text-black outline-none"
                            />
                            <input
                                type="text"
                                name="noiDung"
                                placeholder="Nhập nội dung"
                                className="mt-5 border rounded-full px-4 py-2 w-full text-black outline-none"
                            />
                            <div className='text-center mt-10'>
                                <button className='px-3 py-2 border border-nav rounded-full hover:bg-nav hover:text-white transition-all duration-500 hover:animate-button-hover'>GỬI NGAY</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-3">
                    <iframe
                        title="Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.251179265748!2d106.79068231533486!3d10.867279692251713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752706b5d29765%3A0x64a249f6e6c99a20!2zOTcgTWFuIFRoaeG7hW4sIFBoxrDhu51uZyBIaeG7h3AgUGjDuiwgUXXhuq1uIDksIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1715349940984!5m2!1svi!2s"
                        className="w-full max-w-3xl h-96 rounded-md border-2 border-white"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export default Contact