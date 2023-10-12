import React from "react";
import '../App.css';

const BanList = ({ banList }) => {
    return(
        <div className="ban-list">
            <h2>Banned Names:</h2>
            <ul>
                {banList.map((trait, index) => (
                <li key={index}>{trait}</li>
                ))}
            </ul>
        </div>
    )
}

export default BanList;