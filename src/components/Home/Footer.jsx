import { Link } from "react-router-dom";
import { FaFacebook } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            <footer className="bg-[#dce5ef] text-black px-4 py-6 shadow-lg font-sans flex justify-center">
                <div className="container">
                    <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
                        <div>
                            <div className="flex items-center space-x-3 mb-5">
                                <img
                                    src="https://img.pikbest.com/origin/09/19/05/37upIkbEsTQ4z.png!sw800"
                                    alt="logo"
                                    className='w-[50px] h-[50px]'
                                />
                                <Link to="/" className="flex items-center space-x-2 font-georgia text-center">
                                    <p className="text-3xl font-bold text-highlight">Health<strong className='uppercase text-3xl text-logo'>Care</strong></p>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-highlight uppercase text-center font-georgia mb-5">Trung tâm HealthCare</h2>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-highlight uppercase text-center font-georgia mb-5">GIỜ LÀM VIỆC</h2>
                        </div>
                    </div>
                    <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex space-x-3 text-center items-center hover:scale-105 transition-all duration-300">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-800 transition duration-300">
                                    <FaFacebook className="w-4 h-4" />
                                </a>
                                <button className="ml-2 text-sm ">Truy cập Facebook để theo dõi thêm</button>
                            </div>
                            <div className="w-full mt-3">
                                <iframe
                                    title="Map"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.251179265748!2d106.79068231533486!3d10.867279692251713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752706b5d29765%3A0x64a249f6e6c99a20!2zOTcgTWFuIFRoaeG7hW4sIFBoxrDhu51uZyBIaeG7h3AgUGjDuiwgUXXhuq1uIDksIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1715349940984!5m2!1svi!2s"
                                    className="w-full h-[200px] rounded-md border-2 border-white"
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>

                        <div className="text-justify">
                            <p><strong>Địa chỉ:</strong> 97 Đường Man Thiện, Phường Hiệp Phú, Quận 9, TP. Hồ Chí Minh</p>
                            <p><strong>Điện thoại:</strong> 0923 456 453</p>
                            <p><strong>Email:</strong> khambenhhealthcare@gmail.com</p>

                        </div>

                        <div>
                            <ul className="ml-4 list-disc">
                                <li>Thứ 2 - 6: 08h00 đến 21h30</li>
                                <li>Thứ 7: 08h00 đến 21h30</li>
                                <li>Chủ nhật: 08h00 đến 13h30</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="bg-highlight py-2 text-center text-xs text-white">
                Copyright © 2025 <a href="https://khambenhstar.com" className="underline hover:text-gray-300">khambenhhealthcare.com</a>
            </div>
        </div>
    )
}

export default Footer;
