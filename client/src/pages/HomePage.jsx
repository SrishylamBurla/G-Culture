import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="">
      <section
        className="
          relative aspect-[9/16] md:aspect-[16/9]
    bg-[url('/images/homeImages/home1.png')]
    bg-cover bg-center bg-no-repeat
    flex flex-col items-center justify-center
    px-4
        "
      >
        <Link
          to="/shop"
          className="absolute bottom-60 px-8 py-3 bg-black/80 text-white rounded hover:bg-black transition"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
}
