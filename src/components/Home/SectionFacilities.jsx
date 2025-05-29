import React from 'react'

const SectionFacilities = () => {
    return (
        <div className='container p-5 mb-10 px-4 md:px-20'>
            <h2 className="text-highlight text-3xl font-bold text-center mb-8">Cơ sở vật chất</h2>
            <div className='space-y-4'>

                <div className='flex flex-wrap gap-4 justify-center'>
                    <img src="https://benhvienphuongdong.vn/public/uploads/tin-tuc/bai-viet/phong-mo.jpg" alt="" className='w-full max-w-[320px] h-[200px] hover:scale-[1.02] transition-all duration-300' />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjg7t0QSaHkj96slgccPysIuScsElqDw7UsQ&s" alt="" className='w-full max-w-[320px] h-[200px] hover:scale-[1.02] transition-all duration-300' />
                    <img src="https://media.benhvienhathanh.vn/media/gioi_thieu/nh_2.jpg" alt="" className='w-full max-w-[320px] h-[200px] hover:scale-[1.02] transition-all duration-300' />
                </div>

                <div className='flex flex-col md:flex-row gap-4 items-center justify-center'>
                    <img src="https://www.studytienganh.vn/upload/2021/04/97615.jpg" alt="" className='w-full md:w-[500px] h-[300px] hover:scale-[1.02] transition-all duration-300' />
                    <img src="https://benhvienungbuouhungviet.vn/wp-content/uploads/Phong-dieu-tri.jpg" alt="" className='w-full md:w-[500px] h-[300px] hover:scale-[1.02] transition-all duration-300' />
                </div>
            </div>
        </div>

    )
}

export default SectionFacilities