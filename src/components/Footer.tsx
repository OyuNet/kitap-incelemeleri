"use client";
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <footer className="bg-black text-white mt-8">
            <div className="container mx-auto p-4 flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left">
                    <h2 className="text-xl font-bold text-orange-500">Kitap İncelemeleri</h2>
                    <p className="mt-2">&copy; {new Date().getFullYear()} Kitap İncelemeleri. Tüm hakları saklıdır.</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <nav className="flex space-x-4 justify-center md:justify-start">
                        <Link href="/">
                            Ana Sayfa
                        </Link>
                        <Link href="/top-rated">
                            En Yüksek Puanlı Kitaplar
                        </Link>
                        {isAdmin && <Link href="/admin">
                            Admin Paneli
                        </Link>}
                    </nav>
                </div>
            </div>
        </footer>
    );
}