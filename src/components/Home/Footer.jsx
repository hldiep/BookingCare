import { NavLink, Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
const Footer = () => {
    return (
        <div>
            <footer className="bg-footer text-black p-6 shadow-lg font-sans flex justify-center">
                <div className="container">
                    <div className="mx-auto grid grid-cols-3 gap-3">
                        <div>
                            <div className="text-3xl font-bold">
                                <div>
                                    <img src="https://img.pikbest.com/origin/09/19/05/37upIkbEsTQ4z.png!sw800" alt="logo" className='w-[50px] h-[50px]' />
                                </div>
                                <Link to="/home" className="flex items-center space-x-2">
                                    <span className="text-2xl text-black font-georgia">Trung tâm khám bệnh</span>
                                    <span className="text-logo uppercase font-georgia">Star</span>
                                </Link>
                            </div>
                            <div className="flex space-x-3 mt-3 text-center items-center">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-800 transition duration-300">
                                    <FaFacebook className="w-4 h-4" />
                                </a>
                                <button className="ml-2">
                                    Truy cập Facebook để theo dõi thêm
                                </button>
                            </div>
                        </div>
                        <div className=''>
                            <h2 className="font-bold text-lg uppercase text-center font-georgia">Trung tâm khám bệnh Star</h2>
                            <p><strong>Địa chỉ:</strong> 97 Đường Man Thiện, Phường Hiệp Phú, Quận 9, TP. Hồ Chí Minh</p>
                            <p><strong>Điện thoại:</strong> 0923 456 453</p>
                            <p><strong>Email:</strong> khambenhstar@gmail.com</p>
                            <div className="w-full mt-3">
                                <iframe
                                    title="Map"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.251179265748!2d106.79068231533486!3d10.867279692251713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752706b5d29765%3A0x64a249f6e6c99a20!2zOTcgTWFuIFRoaeG7hW4sIFBoxrDhu51uZyBIaeG7h3AgUGjDuiwgUXXhuq1uIDksIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1715349940984!5m2!1svi!2s"
                                    className="w-full h-56 rounded-md border-2 border-white"
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>

                        <div>
                            <h2 className="font-bold text-lg uppercase text-center font-georgia">GIỜ LÀM VIỆC</h2>
                            <ul className="ml-4 list-disc">
                                <li>Thứ 2 - 6: 09h00 đến 21h30</li>
                                <li>Thứ 7: 08h00 đến 21h30</li>
                                <li>Chủ nhật: 08h00 đến 13h30</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </footer>
            <div className="bg-[#006c94] py-4 text-center text-xs">
                Copyright © 2025 <a href="https://khambenhstar.com" className="underline hover:text-gray-300">khambenhstar.com</a>
            </div>
        </div>
    )
}

export default Footer