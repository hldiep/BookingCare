import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function AppointmentSuccess() {
    return (
        <div className="min-h-screen pt-28 bg-main flex justify-center items-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-10 rounded max-w-lg text-center shadow-md">
                <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-green-500 text-6xl mb-4"
                />
                <h2 className="text-2xl font-bold mb-2">ĐẶT LỊCH THÀNH CÔNG</h2>
                <p>Hệ thống đã nhận lịch hẹn khám bệnh của bạn.</p>
                <p>Chúng tôi sẽ phản hồi qua email sớm nhất.</p>
                <Link to={'/'} className='italic text-black'>Quay lại trang chủ</Link>
            </div>
        </div>
    );
}

export default AppointmentSuccess;
