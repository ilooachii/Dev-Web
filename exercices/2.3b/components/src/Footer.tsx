import React from 'react';

interface FooterProps {
    text: string;
}

const Footer: React.FC<FooterProps> = ({ text }) => {
    return <footer>{text}</footer>;
};

export default Footer;