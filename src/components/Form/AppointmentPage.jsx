import React from 'react';

function AppointmentPage() {
    return (
        <div className="min-h-screen pt-28 bg-main flex justify-center">
            <div className='container flex justify-center pt-20 p-5'>
                <div className='w-full max-w-5xl px-4'>
                    <h2 className="text-2xl font-bold mb-6 text-center font-georgia text-highlight">ĐẶT LỊCH KHÁM BỆNH TRONG NGÀY</h2>
                    <form >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className='mb-2'>Họ và tên</p>
                                <input type="text" placeholder="Tên của bạn *" className="w-full border p-2 rounded outline-none" />
                            </div>
                            <div>
                                <p className='mb-2'>Điện thoại</p>
                                <input type="tel" placeholder="Điện thoại *" className="w-full border p-2 rounded outline-none" />
                            </div>
                            <div>
                                <p className='mb-2'>Email</p>
                                <input type="email" placeholder="Email" className="w-full border p-2 rounded outline-none" />
                            </div>
                            <div>
                                <p className='mb-2'>Ngày sinh</p>
                                <input type="date" placeholder="Ngày sinh" className="w-full border p-2 rounded outline-none" />
                            </div>
                            <div>
                                <p className='mb-2'>CMND/CCCD</p>
                                <input type="text" placeholder="CMND/CCCD" className="w-full border p-2 rounded outline-none" />
                            </div>
                            <div>
                                <p className='mb-2'>Giới tính</p>
                                <div className="flex items-center gap-4">
                                    <label><input type="radio" name="gender" value="Nam" /> Nam</label>
                                    <label><input type="radio" name="gender" value="Nữ" /> Nữ</label>
                                    <label><input type="radio" name="gender" value="Khác" /> Khác</label>
                                </div>
                            </div>
                            <div>
                                <p className='mb-2'>Dịch vụ</p>
                                <select className="w-full border p-2 rounded outline-none">
                                    <option>Hồ Chí Minh</option>
                                </select>
                            </div>
                            <div>
                                <p className='mb-2'>Dịch vụ</p>
                                <select className="w-full border p-2 rounded outline-none">
                                    <option>Hồ Chí Minh</option>
                                </select>
                            </div>

                            <div>
                                <p className='mb-2'>Chọn ngày khám</p>
                                <input type="date" placeholder="Ngày đặt hẹn" className="w-full border p-2 rounded outline-none" />
                            </div>
                            <div>
                                <p className='mb-2'>Chọn khung giờ</p>
                                <select className="w-full border p-2 rounded outline-none">
                                    <option>-- Chọn khung giờ --</option>
                                </select>
                            </div>
                            <textarea
                                placeholder="Ghi chú"
                                className="border p-3 rounded col-span-2 outline-none w-full h-32 resize-none"
                            />
                        </div>
                        <div className='text-center items-center'>
                            <button
                                type="submit"
                                className=" mt-4 mb-10 font-bold text-white px-3 py-2 rounded-full bg-logo border border-transparent hover:border-logo hover:bg-transparent hover:text-logo transition-all duration-300"
                            >
                                ĐẶT LỊCH NGAY
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default AppointmentPage;
