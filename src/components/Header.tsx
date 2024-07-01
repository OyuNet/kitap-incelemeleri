"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            fetch('http://localhost:3001/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Token geçersiz');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if (data && data.username) {
                    setIsLoggedIn(true);
                    setUsername(data.username);
                } else {
                    throw new Error('Geçersiz kullanıcı verisi');
                }

                if (data && data.isAdmin) {
                    setIsAdmin(true);
                }
            })
            .catch((error) => {
                console.error('Hata:', error);
                setIsLoggedIn(false);
            });
        }
    }, []);

    const handleLogout = () => {
        setIsAdmin(false);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <header className="bg-black text-white">
            <div className="container mx-auto flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold text-orange-500"><Link href="/">Kitap İncelemeleri</Link></h1>
                <nav className="hidden md:flex space-x-4">
                    <Link href="/">
                        Ana Sayfa
                    </Link>
                    <Link href="/top-rated">
                        En Yüksek Puanlı Kitaplar
                    </Link>
                    {isAdmin && <Link href="/admin">
                        Admin Paneli
                    </Link>}
                    {isLoggedIn ? (
                        <>
                            <span>{username}</span>
                            <button onClick={handleLogout}>Çıkış Yap</button>
                        </>
                    ) : (
                        <Link href="/login">
                            Giriş Yap
                        </Link>
                    )}
                </nav>
                <button id="menu-button" className="md:hidden">
                    <span className="text-white">☰</span>
                </button>
            </div>
            <div id="mobile-menu" className="hidden md:hidden">
                <nav className="flex flex-col space-y-2 p-4">
                    <Link href="/">
                        Ana Sayfa
                    </Link>
                    <Link href="/top-rated">
                        En Yüksek Puanlı Kitaplar
                    </Link>
                    <Link href="/admin">
                        Admin Paneli
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <span>{username}</span>
                            <button onClick={handleLogout}>Çıkış Yap</button>
                        </>
                    ) : (
                        <Link href="/login">
                            Giriş Yap
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}