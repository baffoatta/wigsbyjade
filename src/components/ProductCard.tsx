import Image from 'next/image';
import Link from 'next/link';
import AddToWishlistButton from './AddToWishlistButton';
import PriceDisplay from './PriceDisplay';

interface Product {
  id: string;
  name: string;
  slug: string;
  price?: string; // Add price as optional
  image: {
    sourceUrl: string;
    altText: string;
  } | null;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const placeholderImage = '/placeholder.svg';

  const productForWishlist = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price || '0', // Default price if not available
    image: product.image?.sourceUrl || null,
  };

  return (
    <Link href={`/products/${product.slug}`} className="group relative">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105">
        <div className="relative w-full aspect-square">
          <Image
            src={product.image?.sourceUrl || placeholderImage}
            alt={product.image?.altText || product.name}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-opacity duration-300 group-hover:opacity-90"
          />
          <AddToWishlistButton product={productForWishlist} />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
          <PriceDisplay priceString={product.price} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
