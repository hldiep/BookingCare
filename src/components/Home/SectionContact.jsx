import { Mail, PhoneCall, Truck } from 'lucide-react'
import React from 'react'

const SectionContact = () => {
    return (
        <div className='container'>
            <section className="py-10 px-4">
                <div className="rounded-xl p-12 bg-[#f9f0eb] grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="flex items-start gap-4 hover:scale-105 transition-all duration-300">
                        <PhoneCall size={32} className="text-logo mt-1" />
                        <div>
                            <h3 className="text-lg font-bold">0984 234 207</h3>
                            <p>Hotline liên hệ 24/7</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 hover:scale-105 transition-all duration-300">
                        <Mail size={32} className="text-logo mt-1" />
                        <div>
                            <h3 className="text-lg font-bold">hlthcare@gmail.com</h3>
                            <p>Email liên hệ</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 hover:scale-105 transition-all duration-300">
                        <Truck size={54} className="text-logo mt-1" />
                        <div>
                            <h3 className="text-lg font-bold">Trung tâm khám bệnh HealthCare</h3>
                            <p>97 Đường Man Thiện, Phường Hiệp Phú, Quận 9, TP. Hồ Chí Minh</p>
                        </div>
                    </div>

                </div>
            </section>
        </div>

    )
}

export default SectionContact