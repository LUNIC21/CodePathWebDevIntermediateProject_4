import React from "react";
import '../App.css';

const DogCard = ({dogImage, dogBreed, weight, height, lifeSpan, temperament, breedFor, handleBanList}) =>{
    return(
        <div className="dog-card">
            <h3>Let's learn about different dog breeds</h3>
            {dogImage && <img src={dogImage} width={600} height={350} alt="dog"></img>}
            <div className="trait-container">
                {dogBreed && <label className="trait-labels" >Breed Name: </label>}
                {dogBreed && <button className="traits" onClick={() => handleBanList(dogBreed)} >{dogBreed}</button>}
                {breedFor && <label className="trait-labels">Breed For: </label>}
                {breedFor && <button className="traits">{breedFor}</button>}
                {dogBreed && <br></br>}
                {weight && <label className="trait-labels">Weight: </label>}
                {weight && <button className="traits">{weight}</button>}
                {height && <label className="trait-labels">Height: </label>}
                {height && <button className="traits">{height}</button>}
                {lifeSpan && <label className="trait-labels">Life Span: </label>}
                {lifeSpan && <button className="traits">{lifeSpan}</button>}
                {temperament && <br></br>}
                {temperament && <label className="trait-labels">Temperament: </label>}
                {temperament && <button className="traits">{temperament}</button>}
            </div>
            

        </div>
    )
}

export default DogCard;