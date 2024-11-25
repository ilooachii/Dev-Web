import React from 'react';

interface HeaderProps {
    logoUrl: string;
    children: React.ReactNode;
}

const Header = (props: HeaderProps) => {
    return (
        <header>
            <img src={props.logoUrl} alt="Logo" />
            {props.children}
        </header>
    );
};

export default Header;