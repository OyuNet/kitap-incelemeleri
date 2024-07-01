"use client";
import { useRouter } from "next/navigation";

interface BookProp {
    id: number;
    title: string;
    imageUrl: string;
    rating: number;
}

export default function BookCard({
    book,
}: {
    book: BookProp;
}) {
    const router = useRouter();

    return (
        <button key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden" onClick={() => {
            router.push(`/book/${book.id}`);
        }}>
            <img src={book.imageUrl} alt={book.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-bold text-black">{book.title}</h3>
                <p className="text-orange-500">Puan: {book.rating}/5</p>
            </div>
        </button>
    );
}