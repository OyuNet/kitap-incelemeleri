"use client";
import BookCard from "@/components/BookCard";
import ReviewCard from "@/components/ReviewCard";
import { useEffect } from "react";
import { useState } from "react";
import { getBookById } from "@/functions/getBookById";

export default function Home() {
    const [books, setBooks] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const res = await fetch('http://localhost:3001/api/books/getAll', {
                headers: {
                    'Authorization': `Bearer ${document.cookie.split('token=')[1]}`,
                },
            });
            const data = await res.json();
            setBooks(data);
        };

        const fetchReviews = async () => {
            const res = await fetch('http://localhost:3001/api/reviews/getAll', {
                headers: {
                    'Authorization': `Bearer ${document.cookie.split('token=')[1]}`,
                },
            });
            const data = await res.json();
            setReviews(data);
        };

        fetchBooks();
        fetchReviews();
    }, []);

  return (
      <div className="container mx-auto p-4">
          <section className="my-8">
              <h2 className="text-3xl font-bold text-orange-500 mb-4">Popüler Kitaplar</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {books?.map((book) => (
                        <BookCard 
                            book={book}
                        />
                    ))}
              </div>
          </section>

          <section className="my-8">
              <h2 className="text-3xl font-bold text-orange-500 mb-4">Son İncelemeler</h2>
              <div className="space-y-4">
                    {reviews?.map((review: {
                        id: number;
                        Book: {
                            title: string;
                        }
                        content: string;
                    }) => (
                        <ReviewCard 
                            title={review.Book.title}
                            review={review.content}
                            id={review.id}
                        />
                    ))}
              </div>
          </section>
      </div>
  );
}
