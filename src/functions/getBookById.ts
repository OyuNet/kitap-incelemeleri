interface BookData {
    id: number;
    title: string;
    author: string;
    summary: string;
    imageUrl: string;
    rating: number;
}

export const getBookById = async (id: number): Promise<BookData> => {
    const res = await fetch('http://localhost:3001/api/books/get/' + id);
    return res.json();
}