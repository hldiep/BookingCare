import React from 'react'

const SectionIntro = () => {
    return (
        <div>
            <div className="py-16 px-4 lg:px-20 flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0">
                {/* Left text */}
                <div className="lg:w-1/2 space-y-4">
                    <p className="text-lg text-highlight mr-5">
                        Phòng khám là Hệ Thống Y Tế chất lượng khám theo tiêu chuẩn Châu Âu.
                        Có hỗ trợ khám và điều trị tại Singapore.
                    </p>
                </div>

                {/* Center logo */}
                <div className="lg:w-1/4 flex justify-center">
                    <div className="rounded-full border-2 border-nav w-52 h-52 flex flex-col items-center justify-center">
                        <img
                            src="https://img.pikbest.com/origin/09/19/05/37upIkbEsTQ4z.png!sw800"
                            alt="Logo"
                            className="h-28 object-contain"
                        />
                        <p className="text-highlight font-bold mt-2 text-lg">HealthCare</p>
                    </div>
                </div>

                {/* Right info */}
                <div className="lg:w-1/3 space-y-6 text-highlight">
                    <div className="flex items-center space-x-3">
                        <img src="https://sudospaces.com/karofi-com/images/content/content_s609.jpg" alt="Standard" className="w-20 h-20 rounded-full border border-nav" />
                        <p>Khám theo tiêu chuẩn quốc tế.</p>
                    </div>

                    <div className="ml-14 flex items-start space-x-3">
                        <img src="https://free.vector6.com/wp-content/uploads/2020/04/Corona-qbvngz0056.jpg" alt="Doctors" className="w-20 h-20 rounded-full object-cover border border-nav" />
                        <p>Đội ngũ bác sĩ trên 15 năm kinh nghiệm từng tu nghiệp nước ngoài.</p>
                    </div>

                    <div className="ml-14 flex items-start space-x-3">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmC2muMHXlURBAisAMdwz8SR8f0DfXMGM0gg&s" alt="Facility" className="w-20 h-20 rounded-full object-cover border border-nav" />
                        <p>Cơ sở vật chất khang trang, không gian thoáng đãng.</p>
                    </div>

                    <div className="flex items-start space-x-3">
                        <img src="https://indochinapost.com/wp-content/uploads/van-chuyen-may-moc-thiet-bi-y-te.jpg" alt="Equipment" className="w-20 h-20 rounded-full object-cover border border-nav" />
                        <p>Máy móc, Thiết bị tối tân được nhập khẩu từ Nhật và Hoa Kỳ.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionIntro