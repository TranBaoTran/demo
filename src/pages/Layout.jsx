import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import SmallHeader from "../components/SmallHeader/SmallHeader";
import { Outlet } from "react-router-dom";
import { useRef } from "react";

const Layout = () => {
    const footerRef = useRef(null);

    const scrollToFooter = () => {
        footerRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Header onGoToFooterClick={scrollToFooter} />
            <SmallHeader />
            <main>
                <Outlet />
            </main>
            <Footer ref={footerRef}/>
        </>
    );
};

export default Layout