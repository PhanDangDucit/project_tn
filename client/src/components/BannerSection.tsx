type BannerProps = {
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
};

export default function BannerSection({ title, subtitle, image, buttonText }: BannerProps) {
  return (
    <section className="relative h-[400px] overflow-hidden my-16">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white max-w-2xl px-4">
          <h2 className="text-5xl font-bold mb-4">{title}</h2>
          <p className="text-xl mb-6">{subtitle}</p>
          <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}

