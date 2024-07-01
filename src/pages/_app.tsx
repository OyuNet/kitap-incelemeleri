import { AppProps } from 'next/app';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const cookies = parseCookies();
        const token = cookies.token;

        if (token) {
            fetch('/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setUser(data);
                }
            })
            .catch(() => {
                setUser(null);
            });
        }
    }, []);

    return <Component {...pageProps} user={user} />;
}

export default MyApp;