import BookCard from "@/components/BookCard";

export default function Page() {
    const topRatedBooks = [
        { id: 1, title: 'Kitap 1', image: '/path/to/image1.jpg', rating: 9.5 },
        { id: 2, title: 'Kitap 2', image: '/path/to/image2.jpg', rating: 9.3 },
        { id: 3, title: 'Kitap 3', image: '/path/to/image3.jpg', rating: 9.1 },
        { id: 4, title: 'Kitap 4', image: '/path/to/image4.jpg', rating: 9.0 },
        { id: 5, title: 'Kitap 5', image: '/path/to/image5.jpg', rating: 8.9 },
    ];

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold text-orange-500 mb-8">En Yüksek Puanlı Kitaplar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topRatedBooks.map(book => (
                    <BookCard
                        book={book}
                    />
                ))}
            </div>
        </div>
    );
}