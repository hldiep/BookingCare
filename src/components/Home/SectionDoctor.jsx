import React from 'react'

const SectionDoctor = () => {
    return (
        <div><section className="py-10 px-4">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-highlight text-3xl font-bold text-center mb-8">Đội ngũ bác sĩ</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-4 text-center hover:scale-105 transition-all duration-300">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv4x9bbvd_WFTCb7x4rAZedVRwZ-iQ2V8yWg&s"
                            alt="Bác sĩ 1"
                            className="mx-auto h-40 w-40 object-cover rounded-full mb-4 "
                        />
                        <h3 className="text-xl font-semibold">TS.BS Nguyễn Văn A</h3>
                        <p className="text-sm text-gray-500">Chuyên khoa: Nội khoa</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 text-center hover:scale-105 transition-all duration-300">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgklHeb3cxOFzD49dK3idxfPKaz2cUrym1xg&s"
                            alt="Bác sĩ 2"
                            className="mx-auto h-40 w-40 object-cover rounded-full mb-4"
                        />
                        <h3 className="text-xl font-semibold">BS Trần Thị B</h3>
                        <p className="text-sm text-gray-500">Chuyên khoa: Ngoại khoa</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 text-center hover:scale-105 transition-all duration-300">
                        <img
                            src="https://benhvientantao.com/wp-content/uploads/2022/07/chi-co-bac-si-moi-giup-duoc-e93.jpg"
                            alt="Bác sĩ 3"
                            className="mx-auto h-40 w-40 object-cover rounded-full mb-4"
                        />
                        <h3 className="text-xl font-semibold">BS Lê Văn C</h3>
                        <p className="text-sm text-gray-500">Chuyên khoa: Y học cổ truyền</p>
                    </div>
                </div>
            </div>
        </section></div>
    )
}

export default SectionDoctor