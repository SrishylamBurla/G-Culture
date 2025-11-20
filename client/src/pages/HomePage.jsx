import { Link } from "react-router-dom";

export default function HomePage() {
  const categories = [
    {
      name: "Street Wear",
      path: "/streetwear",
      bg: "bg-[url('/images/HomeImgs/streetwear.png')]",
    },
    {
      name: "Casual Wear",
      path: "/casualwear",
      bg: "bg-[url('/images/HomeImgs/casualwear.png')]",
    },
    {
      name: "Chest Bags",
      path: "/chestbags",
      bg: "bg-[url('/images/HomeImgs/chestbags.png')]",
    },
    {
      name: "Caps",
      path: "/caps",
      bg: "bg-[url('/images/HomeImgs/caps.png')]",
    },
  ];

  return (
    <div>
      <section className="min-h-screen bg-gray-200 text-black pt-[5rem] md:pt-[6rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 p-2 md:p-4">

          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className={`
                relative h-80 md:h-100 shadow-md overflow-hidden
                bg-cover bg-center bg-no-repeat
                ${cat.bg}
                group hover:scale-[1.03] transition duration-300
              `}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                {/* <h2 className="text-white text-2xl md:text-3xl font-bold tracking-wide drop-shadow-lg">
                  {cat.name}
                </h2> */}
              </div>
            </Link>
          ))}

        </div>
      </section>
    </div>
  );
}
