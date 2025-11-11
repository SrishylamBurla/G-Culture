import { Link } from 'react-router-dom';

export default function HomePage(){
  return (
    <div className="mt-20">
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">ClothStore — Premium Clothing</h1>
        <p className="text-gray-600 mb-6">A starter MERN fashion store inspired by thehouseofrare.com</p>
        <Link to="/shop" className="px-6 py-3 bg-black text-white rounded">Shop Now</Link>
      </section>
    </div>
  );
}
