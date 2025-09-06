import PriceDisplay from "@/components/PriceDisplay";
import ProductActions from "@/components/ProductActions";
import { GET_PRODUCT_BY_SLUG } from "@/graphql/queries";
import client from "@/lib/apollo";
import Image from "next/image";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  image: {
    sourceUrl: string;
    altText: string;
  } | null;
}

interface ProductData {
  product: Product;
}

async function getProduct(slug: string) {
  try {
    const { data } = await client.query<ProductData>({
      query: GET_PRODUCT_BY_SLUG,
      variables: { slug },
      context: {
        fetchOptions: {
          next: { revalidate: 60 },
        },
      },
    });
    return data?.product || null;
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
    id: product.id,
    name: product.name,
    price: product.price,
    slug: product.slug,
    image: product.image?.sourceUrl || null,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.image?.sourceUrl || "/placeholder.svg"}
            alt={product.image?.altText || product.name}
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
