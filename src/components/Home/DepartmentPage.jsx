import React, { useEffect, useState } from 'react';
import { fetchAllSpecialty } from '../util/specialtyApi';

// const departments = [
//     {
//         name: "Nội tổng quát",
//         desc: "Chẩn đoán và điều trị các bệnh lý nội khoa như tim mạch, tiêu hóa, nội tiết,...",
//         doctors: ["BS. Nguyễn Văn A", "TS.BS. Trần Thị B", "ThS.BS. Lê Văn C"],
//         achievements: [
//             "Tiếp nhận và điều trị hơn 10,000 bệnh nhân mỗi năm",
//             "Triển khai thành công mô hình quản lý bệnh mãn tính",
//         ],
//         image: "https://www.umcclinic.com.vn/Data/Sites/1/media/y-hoc-thuong-thuc/kh%C3%A1m-t%E1%BB%95ng-qu%C3%A1t/khoa-n%E1%BB%99i-t%E1%BB%95ng-qu%C3%A1t-l%C3%A0-g%C3%AC/khoa-noi-tong-quat-la-mot-khoa-dac-biet.jpg",
//     },
//     {
//         name: "Ngoại tổng quát",
//         desc: "Phẫu thuật tiêu hóa, gan mật, tuyến giáp, và các bệnh lý ngoại khoa khác.",
//         doctors: ["BS.CKI. Phạm Văn D", "BS. Nguyễn Thị E"],
//         achievements: [
//             "Thực hiện hơn 2,000 ca phẫu thuật mỗi năm",
//             "Ứng dụng thành công kỹ thuật nội soi tiên tiến",
//         ],
//         image: "https://benhvienbacha.vn/wp-content/uploads/2023/04/kham-ngoai-02-725x407-1.jpg",
//     },
//     {
//         name: "Sản phụ khoa",
//         desc: "Khám và điều trị các vấn đề về sức khỏe sinh sản nữ giới.",
//         doctors: ["BS.CKII. Võ Thị F", "BS. Lý Minh G"],
//         achievements: [
//             "Hơn 5,000 ca sinh an toàn mỗi năm",
//             "Triển khai chương trình sàng lọc ung thư cổ tử cung",
//         ],
//         image: "https://vanphuc.com/Data/Sites/1/News/khoa-san-phu-khoa-1090x640px.jpg",
//     },
//     {
//         name: "Nhi khoa",
//         desc: "Chăm sóc và điều trị bệnh lý cho trẻ sơ sinh và trẻ nhỏ.",
//         doctors: ["BS. Nguyễn Hữu H", "ThS.BS. Đặng Thị I"],
//         achievements: [
//             "Chăm sóc hơn 3,000 trẻ sơ sinh/năm",
//             "Tham gia các chương trình tiêm chủng mở rộng và dinh dưỡng trẻ em",
//         ],
//         image: "https://medlatec.vn/media/2793/content/20230116_goc-kham-pha-bac-si-khoa-nhi-co-nhiem-vu-gi-trong-benh-vien-.jpg",
//     },
// ];

const DepartmentPage = () => {
    const [specialty, setSpecialty] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadSpecialty = async () => {
            try {
                const data = await fetchAllSpecialty();
                setSpecialty(data);
            } catch (error) {
                console.error("Lỗi tải danh sách chuyên khoa:", error);
            }
            finally {
                setLoading(false);
            }
        }
        loadSpecialty();
    }, []);
    return (
        <div className="min-h-screen bg-main flex justify-center">
            <div className='container flex justify-center items-center p-5'>
                <div className='w-full max-w-5xl px-4'>
                    <section className="px-4 bg-white mb-10">
                        <h2 className="text-3xl font-bold mb-8 font-georgia text-center uppercase text-highlight">
                            Giới thiệu chuyên khoa
                        </h2>
                        {loading ? (
                            <div className="text-center text-gray-700 py-10">Đang tải dữ liệu...</div>
                        ) : (
                            <div className="max-w-6xl mx-auto space-y-16">
                                {specialty.length === 0 ? (
                                    <div className="text-center text-gray-500 py-8">Không có chuyên khoa nào.</div>
                                ) : (
                                    <div>
                                        {specialty.map((sp, index) => (
                                            <div
                                                key={index}
                                                className={`flex rounded-xl shadow-lg bg-gray-100 flex-col md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                                                    } items-stretch gap-6 h-[320px]`}
                                            >
                                                <div className="md:w-1/2">
                                                    <img
                                                        src={sp.image}
                                                        alt={sp.name}
                                                        className="h-full w-full object-cover rounded-xl shadow-lg"
                                                    />
                                                </div>
                                                <div className="md:w-1/2 p-6 overflow-auto h-full flex flex-col justify-center text-justify">
                                                    <h3 className="text-2xl font-semibold text-highlight mb-2">{sp.name}</h3>
                                                    <p className="text-gray-700 mb-2">{sp.desc}</p>
                                                    <p className="font-medium text-black">Các bác sĩ:</p>
                                                    <ul className="list-disc list-inside text-gray-800 mb-2">
                                                        {sp.doctors.map((doctor, i) => (
                                                            <li key={i}>{doctor}</li>
                                                        ))}
                                                    </ul>
                                                    <p className="font-medium text-black">Thành tựu:</p>
                                                    <ul className="list-disc list-inside text-gray-800">
                                                        {sp.achievements.map((achievement, i) => (
                                                            <li key={i}>{achievement}</li>
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
        </div>
    );
};

export default DepartmentPage;
