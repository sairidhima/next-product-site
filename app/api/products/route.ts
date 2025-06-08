import { NextResponse } from 'next/server';
import smallProducts from '@/src/mock/small/products.json' assert { type: 'json' };
import { Product } from '@/src/type/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name')?.toLowerCase() || '';
  const category = searchParams.get('category')?.toLowerCase() || '';

  let results: Product[] = smallProducts as unknown as Product[];

  if (name.length >= 5) {
    results = results.filter((p) => p.name.toLowerCase().includes(name));
  }

  if (category) {
    results = results.filter((p) => p.category.toLowerCase() === category);
  }

  return NextResponse.json(results);
}
