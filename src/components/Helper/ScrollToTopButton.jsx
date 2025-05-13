import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-50 p-3 bg-logo text-white rounded-full shadow-lg transition-opacity duration-300 hover:bg-opacity-80 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            aria-label="Lên đầu trang"
        >
            <ArrowUp size={20} />
        </button>
    );
}
