import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchAllDoctors } from '../util/doctorApi';
// const doctors = [
//     {
//         name: "Tiến sĩ, Bác sĩ Trần Thị A",
//         image: "https://anhcute.net/wp-content/uploads/2024/10/cropped-Hinh-chibi-bac-si-nhan-vat-hoat-hinh-cute.jpg",
//         description: [
//             "Nguyên giảng viên Bộ môn Da liễu, Đại học Y khoa Phạm Ngọc Thạch",
//             "Tiến sĩ, Bác sĩ chuyên ngành Da liễu",
//             "Kinh nghiệm hơn 30 năm trong ngành Da liễu",
//             "Chuyên điều trị bệnh lý ngoài da, thẩm mỹ nội khoa",
//             "Luôn tận tâm, nhiệt tình"
//         ],
//         footer: "Tiến sĩ, Bác sĩ Trần Ngọc Ánh"
//     },
//     {
//         name: "Bác sĩ Lê Văn Nam",
//         image: "https://suckhoe123.vn/uploads/suc-khoe/bac-si-gia-dinh.png",
//         description: [
//             "Bác sĩ chuyên khoa Nội tổng quát, Bệnh viện Chợ Rẫy",
//             "Hơn 15 năm kinh nghiệm trong điều trị bệnh mãn tính",
//             "Đào tạo chuyên sâu tại Pháp",
//             "Chuyên tư vấn sức khỏe định kỳ, bệnh lý người lớn tuổi",
//             "Tận tâm, lắng nghe bệnh nhân"
//         ],
//         footer: "Bác sĩ Lê Văn Nam"
//     },
//     {
//         name: "Thạc sĩ, Bác sĩ Nguyễn Thị Hồng",
//         image: "https://anhcute.net/wp-content/uploads/2024/10/Hinh-anh-chibi-nu-bac-si-hoat-hinh-cute.jpg",
//         description: [
//             "Bác sĩ chuyên khoa Nhi, Bệnh viện Nhi Đồng",
//             "Thạc sĩ y học tại Đại học Y Dược TP.HCM",
//             "Kinh nghiệm 10+ năm chăm sóc sức khỏe trẻ em",
//             "Thân thiện với trẻ nhỏ, hướng dẫn chi tiết cho phụ huynh",
//             "Chuyên tư vấn dinh dưỡng và tiêm chủng"
//         ],
//         footer: "Thạc sĩ, Bác sĩ Nguyễn Thị Hồng"
//     }
// ];
const Doctors = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetDoctor = async () => {
            try {
                const data = await fetchAllDoctors();
                setDoctors(data);
            } catch (err) {
                console.log("Lỗi tải bác sĩ", err);
            } finally {
                setLoading(false);
            }
        }
        fetDoctor();
    }, []);
    return (
        <div className="min-h-screen bg-main flex justify-center">
            <div className='container flex justify-center items-center p-5'>
                <div className='w-full max-w-5xl px-4'>
                    <section className="px-4 bg-white mb-10">
                        <h2 className="text-3xl font-bold mb-8 font-georgia text-center uppercase text-highlight">Danh sách bác sĩ</h2>
                        {loading ? (
                            <div className="text-center text-gray-700 py-10">Đang tải dữ liệu...</div>
                        ) : (
                            <div>
                                {doctors.length === 0 ? (
                                    <div className="text-center text-gray-500 py-8">Không có bác sĩ nào.</div>
                                ) : (
                                    <div className=" max-w-6xl mx-auto space-y-16">
                                        {doctors.map((doc, index) => (
                                            <div
                                                key={index}
                                                onClick={() => navigate(`/doctor/edit/${doc.id}`)}
                                                className="flex rounded-xl shadow-lg bg-gray-100 flex-col md:flex-row items-stretch gap-0 h-[300px] overflow-hidden"
                                            >
                                                <div className="md:w-1/3 w-full h-full">
                                                    <img src={doc.account?.avatar || 'https://via.placeholder.com/40'}
                                                        alt="avatar"
                                                        className="w-full h-full object-cover" />
                                                </div>
                                                <div className="md:w-2/3 p-6 overflow-auto h-full flex flex-col justify-center text-justify">
                                                    <h2 className="text-2xl font-bold text-logo mb-4">{doc.name}</h2>
                                                    <ul className="list-disc list-inside text-gray-800 space-y-1 text-sm md:text-base leading-relaxed">
                                                        {doc.description.map((item, i) => (
                                                            <li key={i}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                    </section>
                </div>
            </div>
        </div >
    )
}

export default Doctors