import React from 'react';
import { useNavigate } from 'react-router-dom';

const HotlineButton = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="fixed bottom-32 left-6 z-50 flex items-center gap-2 bg-highlight text-white rounded-full shadow-lg cursor-pointer hover:scale-105 transition-all">
                <button onClick={() => navigate('/dat-lich')}
                    className="font-bold px-6 py-4 rounded-full bg-highlight border border-transparent hover:bg-blue-800 hover:bg-transparent transition-all duration-300">
                    Đặt lịch khám ngay
                </button>
            </div>
            <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-logo text-white px-4 py-2 rounded-full shadow-lg cursor-pointer hover:scale-105 transition-all">

                <div className="relative w-10 h-10 flex items-center justify-center">
                    <div className="absolute w-full h-full rounded-full bg-white opacity-20 animate-ping"></div>

                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/002/261/151/small_2x/phone-icon-symbol-sign-isolate-on-white-background-illustration-free-vector.jpg"
                        alt="Hotline"
                        className="w-8 h-8 rounded-full animate-shake relative z-10"
                    />
                </div>

                <span className="font-semibold">0984 234 207</span>
            </div>
        </div>

    );
};

export default HotlineButton;