export const AboutPage = ({ }) => {

  return (
    <div className="py-20 flex flex-col gap-14 max-w-[1200px] mx-auto">
      {/* Above */}
      <div className='flex'>
        <div className='flex flex-col justify-center w-1/2 px-6 gap-6'>
          <h1 className='font-bold text-3xl'>Về chúng tôi</h1>
          <p className=''>Chúng tôi là Fitness, một trung tâm thể hình hiện đại, nơi hội tụ của đam mê, sức khỏe và phong cách sống năng động. Với đội ngũ huấn luyện viên chuyên nghiệp, trang thiết bị tiên tiến và không gian luyện tập thân thiện, chúng tôi cam kết mang đến trải nghiệm fitness toàn diện cho mọi đối tượng khách hàng.</p>
        </div>
        <div className='flex w-1/2 flex-wrap'>
          <img src="https://cdn.unityfitness.vn/2025/08/Gym-va-fitness-la-gi-1.jpg" alt="" className="w-1/2 rounded-tr-full rounded-bl-full"/>
          <img src="https://media.istockphoto.com/id/2075354173/photo/fitness-couple-is-doing-kettlebell-twist-in-a-gym-togehter.jpg?s=612x612&w=0&k=20&c=lfs1V1d0YB33tn72myi6FElJnylPJYYM9lW5ZhlnYqY=" alt="" className="w-1/2 rounded-tl-full rounded-br-full"/>
          <img src="https://media.istockphoto.com/id/2075354173/photo/fitness-couple-is-doing-kettlebell-twist-in-a-gym-togehter.jpg?s=612x612&w=0&k=20&c=lfs1V1d0YB33tn72myi6FElJnylPJYYM9lW5ZhlnYqY=" alt="" className="w-1/2 rounded-tl-full rounded-br-full"/>
          <img src="https://cdn.unityfitness.vn/2025/08/Gym-va-fitness-la-gi-1.jpg" alt="" className="w-1/2 rounded-tr-full rounded-bl-full"/>
        </div>
      </div>
      {/* Below */}
      <div className='flex gap-[26px]'>
        <div className='flex flex-col gap-6 px-6'>
          <h2 className="font-bold text-3xl">Tầm nhìn</h2>
          <p>Trở thành thương hiệu thể hình hàng đầu tại Việt Nam, nơi truyền cảm hứng cho cộng đồng sống khỏe mạnh, tích cực và bền vững. Chúng tôi hướng đến việc xây dựng một hệ sinh thái fitness kết nối con người với mục tiêu nâng cao chất lượng cuộc sống thông qua vận động và dinh dưỡng khoa học.</p>
        </div>
        <div className='flex flex-col gap-6 px-6'>
          <h2 className="font-bold text-3xl">Sứ mệnh</h2>
          <p>Cung cấp dịch vụ luyện tập chất lượng cao, phù hợp với từng cá nhân. Tạo môi trường thân thiện, truyền cảm hứng và thúc đẩy sự phát triển thể chất lẫn tinh thần. Đồng hành cùng khách hàng trên hành trình chinh phục sức khỏe và hình thể lý tưởng. Lan tỏa giá trị sống khỏe - sống đẹp đến cộng đồng.</p>
        </div>
      </div>
    </div>
  );
};