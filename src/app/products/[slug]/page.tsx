import PriceDisplay from "@/components/PriceDisplay";
import ProductActions from "@/components/ProductActions";
import { wcAPI } from "@/lib/woocommerce";
import Image from "next/image";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}


async function getProduct(slug: string) {
  try {
    const product = await wcAPI.getProductBySlug(slug);
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">Product not found.</div>
    );
  }

  const productForCart = {
    id: product.id.toString(),
    name: product.name,
    price: product.price,
    slug: product.slug,
    image: product.images?.[0]?.src || null,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.images?.[0]?.src || "/placeholder.svg"}
            alt={product.images?.[0]?.alt || product.name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <PriceDisplay
            priceString={product.price}
            className="text-2xl font-semibold text-pink-500 mb-4"
          />
          <div
            className="text-gray-700 mb-6 prose"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          <ProductActions product={productForCart} />
        </div>
      </div>
    </div>
  );
}
