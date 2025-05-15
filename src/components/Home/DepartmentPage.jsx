import React from 'react';

const departments = [
    {
        name: "Nội tổng quát",
        desc: "Chẩn đoán và điều trị các bệnh lý nội khoa như tim mạch, tiêu hóa, nội tiết,...",
        doctors: ["BS. Nguyễn Văn A", "TS.BS. Trần Thị B", "ThS.BS. Lê Văn C"],
        achievements: [
            "Tiếp nhận và điều trị hơn 10,000 bệnh nhân mỗi năm",
            "Triển khai thành công mô hình quản lý bệnh mãn tính",
        ],
        image: "https://www.umcclinic.com.vn/Data/Sites/1/media/y-hoc-thuong-thuc/kh%C3%A1m-t%E1%BB%95ng-qu%C3%A1t/khoa-n%E1%BB%99i-t%E1%BB%95ng-qu%C3%A1t-l%C3%A0-g%C3%AC/khoa-noi-tong-quat-la-mot-khoa-dac-biet.jpg",
    },
    {
        name: "Ngoại tổng quát",
        desc: "Phẫu thuật tiêu hóa, gan mật, tuyến giáp, và các bệnh lý ngoại khoa khác.",
        doctors: ["BS.CKI. Phạm Văn D", "BS. Nguyễn Thị E"],
        achievements: [
            "Thực hiện hơn 2,000 ca phẫu thuật mỗi năm",
            "Ứng dụng thành công kỹ thuật nội soi tiên tiến",
        ],
        image: "https://benhvienbacha.vn/wp-content/uploads/2023/04/kham-ngoai-02-725x407-1.jpg",
    },
    {
        name: "Sản phụ khoa",
        desc: "Khám và điều trị các vấn đề về sức khỏe sinh sản nữ giới.",
        doctors: ["BS.CKII. Võ Thị F", "BS. Lý Minh G"],
        achievements: [
            "Hơn 5,000 ca sinh an toàn mỗi năm",
            "Triển khai chương trình sàng lọc ung thư cổ tử cung",
        ],
        image: "https://vanphuc.com/Data/Sites/1/News/khoa-san-phu-khoa-1090x640px.jpg",
    },
    {
        name: "Nhi khoa",
        desc: "Chăm sóc và điều trị bệnh lý cho trẻ sơ sinh và trẻ nhỏ.",
        doctors: ["BS. Nguyễn Hữu H", "ThS.BS. Đặng Thị I"],
        achievements: [
            "Chăm sóc hơn 3,000 trẻ sơ sinh/năm",
            "Tham gia các chương trình tiêm chủng mở rộng và dinh dưỡng trẻ em",
        ],
        image: "https://medlatec.vn/media/2793/content/20230116_goc-kham-pha-bac-si-khoa-nhi-co-nhiem-vu-gi-trong-benh-vien-.jpg",
    },
];

const DepartmentPage = () => {
    return (
        <div className="min-h-screen pt-28 bg-main flex justify-center">
            <div className="container flex justify-center items-center pt-20 p-5">
                <div className="w-full max-w-5xl px-4 mb-10">
                    <section className="px-4 bg-white">
                        <h2 className="text-3xl font-bold mb-8 font-georgia text-highlight text-center uppercase">
                            Giới thiệu chuyên khoa
                        </h2>
                        <div className="px-32 max-w-6xl mx-auto space-y-16">
                            {departments.map((dept, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""} items-center gap-6`}
                                >
                                    <div className="md:w-1/2">
                                        <img
                                            src={dept.image}
                                            alt={dept.name}
                                            className="h-64 rounded-xl shadow-lg w-full object-cover hover:scale-105 transition-all duration-300"
                                        />
                                    </div>
                                    <div className="md:w-1/2">
                                        <h3 className="text-2xl font-semibold text-highlight mb-2">{dept.name}</h3>
                                        <p className="text-gray-700 mb-2">{dept.desc}</p>
                                        <p className="font-medium text-black">Các bác sĩ:</p>
                                        <ul className="list-disc list-inside text-gray-800 mb-2">
                                            {dept.doctors.map((doctor, i) => (
                                                <li key={i}>{doctor}</li>
                                            ))}
                                        </ul>
                                        <p className="font-medium text-black">Thành tựu:</p>
                                        <ul className="list-disc list-inside text-gray-800">
                                            {dept.achievements.map((achievement, i) => (
                                                <li key={i}>{achievement}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DepartmentPage;
