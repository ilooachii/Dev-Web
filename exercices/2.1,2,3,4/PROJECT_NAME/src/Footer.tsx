import React from 'react';

type FooterProps = {
    logoUrl: string;
    children: React.ReactNode;
};

const Footer = ({ logoUrl, children }: FooterProps) => {
    return (
        <footer>
            <img src={logoUrl} alt="Logo" />
            {children}
        </footer>
    );
};

export default Footer;