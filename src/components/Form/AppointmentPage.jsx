import React from 'react';

function AppointmentPage() {
    return (
        <div className="min-h-screen pt-28 bg-main flex justify-center">
            <div className='container flex justify-center pt-20 p-5'>
                <div className='w-full max-w-5xl px-4'>
                    <h2 className="text-2xl font-bold mb-6 text-center font-georgia text-highlight">ĐẶT LỊCH KHÁM BỆNH TRONG NGÀY</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Tên của bạn *" className="border p-2 rounded outline-none" />
                        <input type="tel" placeholder="Điện thoại *" className="border p-2 rounded outline-none" />
                        <input type="email" placeholder="Email" className="border p-2 rounded outline-none" />
                        <input type="date" placeholder="Ngày sinh" className="border p-2 rounded outline-none" />
                        <input type="text" placeholder="CMND/CCCD" className="border p-2 rounded outline-none" />

                        <div className="flex items-center gap-4">
                            <label><input type="radio" name="gender" value="Nam" /> Nam</label>
                            <label><input type="radio" name="gender" value="Nữ" /> Nữ</label>
                            <label><input type="radio" name="gender" value="Khác" /> Khác</label>
                        </div>

                        <select className="border p-2 rounded outline-none">
                            <option>Hồ Chí Minh</option>
                        </select>
                        <select className="border p-2 rounded outline-none">
                            <option>Quận 1</option>
                        </select>

                        <input type="text" placeholder="Địa chỉ" className="border p-2 rounded col-span-2 outline-none" />
                        <input type="text" placeholder="Chi nhánh" className="border p-2 rounded col-span-2 outline-none" />
                        <input type="date" placeholder="Ngày đặt hẹn" className="border p-2 rounded outline-none" />
                        <select className="border p-2 rounded outline-none">
                            <option>-- Chọn khung giờ --</option>
                        </select>

                        <button
                            type="submit"
                            className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 col-span-2"
                        >
                            ĐẶT LỊCH NGAY
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AppointmentPage;
