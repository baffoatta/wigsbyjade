import { notFound } from "next/navigation";
import { transformWooCommerceProduct } from "../../../lib/transformers/productTransformer";
import { wcAPI } from "../../../lib/woocommerce";
import ProductPageClient from "./ProductPageClient";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPageRoute({ params }: ProductPageProps) {
  const { slug } = await params;

  // Fetch product from WooCommerce
  const wooProduct = await wcAPI.getProductBySlug(slug);

  if (!wooProduct) {
    notFound();
  }

  // Transform WooCommerce product to internal format
  const product = transformWooCommerceProduct(wooProduct);

  return <ProductPageClient product={product} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;

  // Fetch product from WooCommerce
  const wooProduct = await wcAPI.getProductBySlug(slug);

  if (!wooProduct) {
    return {
      title: "Product Not Found",
    };
  }

  // Transform WooCommerce product to internal format
  const product = transformWooCommerceProduct(wooProduct);

  return {
    title: `${product.title} | Wigs by Jade`,
    description: product.description.content,
    openGraph: {
      title: product.title,
      description: product.description.content,
      images: product.images.map((img) => ({
        url: img.url,
        alt: img.alt,
      })),
    },
  };
}
