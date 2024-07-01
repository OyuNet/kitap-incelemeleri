"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Book = {
    id: number;
    title: string;
    author: string;
    summary: string;
    imageUrl: string;
    rating: number;
};

export default function AdminPanel() {
    const router = useRouter();
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [summary, setSummary] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    const [bookId, setBookId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            fetchBooks(token);
        }
    }, [router]);

    const fetchBooks = async (token: string) => {
        const res = await fetch('http://localhost:3001/api/books/getAll', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await res.json();
        setBooks(data);
    };

    const handleAddBook = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            return console.error("Token bulunamadı.")
        }

        try {
            await fetch('http://localhost:3001/api/books/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title, author, summary, imageUrl }),
            });
            fetchBooks(token);
            setTitle('');
            setAuthor('');
            setSummary('');
            setImageUrl('');
        } catch (error) {
            console.error('Kitap eklenemedi.', error);
        }
    };

    const handleDeleteBook = async (id: number) => {
        const token = localStorage.getItem('token');

        if (!token) {
            return console.error("Token bulunamadı.");
        }

        try {
            await fetch(`http://localhost:3001/api/books/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            fetchBooks(token);
        } catch (error) {
            console.error('Kitap silinemedi.', error);
        }
    };

    const handleAddReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            return console.error("Token bulunamadı.");
        }

        try {
            await fetch('http://localhost:3001/api/reviews/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ content: reviewContent, rating: reviewRating, bookId }),
            });
            fetchBooks(token);
            setReviewContent('');
            setReviewRating(0);
            setBookId('');
        } catch (error) {
            console.error('İnceleme eklenemedi.', error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Admin Paneli</h1>

            <form onSubmit={handleAddBook} className="mb-6">
                <h2 className="text-xl font-bold mb-4">Kitap Ekle</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Başlık</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Yazar</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Özet</label>
                    <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Görsel URL</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <button type="submit" className="bg-orange-500 text-white p-2 rounded">
                    Kitap Ekle
                </button>
            </form>

            <form onSubmit={handleAddReview} className="mb-6">
                <h2 className="text-xl font-bold mb-4">İnceleme Ekle</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Kitap</label>
                    <select
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    >
                        <option value="">Kitap Seçin</option>
                        {books.map((book: Book) => (
                            <option key={book.id} value={book.id}>
                                {book.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">İçerik</label>
                    <textarea
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Puan</label>
                    <input
                        type="number"
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        required
                        min="0"
                        max="5"
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>
                <button type="submit" className="bg-orange-500 text-white p-2 rounded">
                    İnceleme Ekle
                </button>
            </form>

            <h2 className="text-xl font-bold mb-4">Kitaplar</h2>
            <ul>
                {books.map((book: Book) => (
                    <li key={book.id} className="mb-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold">{book.title}</p>
                                <p className="text-sm text-gray-600">{book.author}</p>
                            </div>
                            <button
                                onClick={() => handleDeleteBook(book.id)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Sil
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}