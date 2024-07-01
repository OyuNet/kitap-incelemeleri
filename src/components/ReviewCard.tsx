import { useRouter } from "next/navigation";

export default function ReviewCard({
    review,
    title,
    id
}: {
    review: string;
    title: string;
    id: number;
}) {
    const router = useRouter();

    return (
        <button key={id} className="bg-white rounded-lg shadow-md p-4 w-full" onClick={() => {
            router.push(`/book/${id}`);
        }}>
            <h3 className="text-xl font-bold text-black">{title}</h3>
            <p className="text-black">{review}</p>
        </button>
    );
}   