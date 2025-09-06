import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-pink-100">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Find Your Perfect Style
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Explore our collection of premium wigs and hair pieces.
          </p>
          <Link
            href="/products"
            className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full hover:bg-pink-600 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </>
  );
}
