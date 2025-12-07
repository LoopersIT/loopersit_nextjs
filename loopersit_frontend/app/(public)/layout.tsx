import '@/styles/base.css';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export const metadata = {
    title: {
        default: 'LoopersIT - Your brand, our efforts',
        template: '%s | LoopersIT',
    },
    description: 'We create responsive, custom websites and implement digital marketing strategies to drive business growth online.',
};

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <div className="base-container">
                {children}
            </div>
            <Footer />
        </>
    );
}
