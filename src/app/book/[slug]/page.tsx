import Image from 'next/image';
import { notFound } from 'next/navigation';

type Book = {
    id: number;
    title: string;
    author: string;
    summary: string;
    imageUrl: string;
    rating: number;
};

type Review = {
    id: number;
    content: string;
    rating: number;
    bookId: number;
    userId: number;
};

async function fetchBook(slug: string): Promise<Book | null> {
    const res = await fetch(`http://localhost:3001/api/books/get/${slug}`, { cache: 'no-store' });
    
    if (!res.ok) {
        return null;
    }

    return res.json();
}

async function fetchReviews(slug: number): Promise<Review[]> {
    const res = await fetch(`http://localhost:3001/api/reviews/get/${slug}`, { cache: 'no-store' });
    
    if (!res.ok) {
        return [];
    }

    return res.json();
}

export default async function BookPage({ params }: { params: { slug: string } }) {
    const book = await fetchBook(params.slug);

    if (!book) {
        return notFound();
    }

    const reviews = await fetchReviews(book.id);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <div className="flex">
                <img src={book.imageUrl} alt={book.title} width={200} height={300} className="mr-4" />
                <div>
                    <p className="mb-4">{book.summary}</p>
                    <h2 className="text-2xl font-bold mb-2">İncelemeler</h2>
                    {reviews.length > 0 ? (
                        <ul>
                            {reviews.map((review) => (
                                <li key={review.id} className="mb-4">
                                    <p className="font-bold">{review.content}</p>
                                    <p>Puan: {review.rating}/5</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Henüz inceleme yok.</p>
                    )}
                </div>
            </div>
        </div>
    );
}