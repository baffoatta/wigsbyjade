import { NextRequest, NextResponse } from 'next/server';
import { wcAPI } from '../../../lib/woocommerce';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const params: Record<string, string | number> = {};
    
    // Extract query parameters
    if (searchParams.get('per_page')) {
      params.per_page = parseInt(searchParams.get('per_page')!);
    }
    if (searchParams.get('orderby')) {
      params.orderby = searchParams.get('orderby')!;
    }
    if (searchParams.get('order')) {
      params.order = searchParams.get('order')!;
    }
    if (searchParams.get('status')) {
      params.status = searchParams.get('status')!;
    }
    if (searchParams.get('search')) {
      params.search = searchParams.get('search')!;
    }
    if (searchParams.get('category')) {
      params.category = searchParams.get('category')!;
    }

    const products = await wcAPI.getProducts(params);
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}