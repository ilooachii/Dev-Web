import React from "react";

interface UserCardProps {
    name: string;
    age: number;
}

const UserCard: React.FC<UserCardProps> = ({ name, age }) => {
    return (
        <div>
            <h2>{name}</h2> 
            <p>Age: {age}</p>
        </div>
    );
};

export default UserCard;