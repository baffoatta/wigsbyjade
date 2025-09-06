import Image from 'next/image';
import Link from 'next/link';
import AddToWishlistButton from './AddToWishlistButton';
import PriceDisplay from './PriceDisplay';

interface Product {
  id: number | string;
  name: string;
  slug: string;
  price?: string;
  images?: Array<{
    src: string;
    alt: string;
  }>;
  image?: {
    sourceUrl: string;
    altText: string;
  } | null;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const placeholderImage = '/placeholder.svg';

  // Handle both old GraphQL format and new WooCommerce format
  const imageUrl = product.images?.[0]?.src || product.image?.sourceUrl;
  const imageAlt = product.images?.[0]?.alt || product.image?.altText || product.name;

  const productForWishlist = {
    id: product.id.toString(),
    name: product.name,
    slug: product.slug,
    price: product.price || '0',
    image: imageUrl || null,
  };

  return (
    <Link href={`/products/${product.slug}`} className="group relative">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105">
        <div className="relative w-full aspect-square">
          <Image
            src={imageUrl || placeholderImage}
            alt={imageAlt}
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
