import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import DogCard from './components/DogCard';
import BanList from './components/BanList';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {

  const API_BREED = `http://api.thedogapi.com/v1/breeds/`;
  const API_IMAGE = `https://api.thedogapi.com/v1/images/search?breed_ids=`;

  const [breedList, setBreedList] = useState([]);
  const [dogPic, setDogPic] = useState('');
  const [breedName, setBreedName] = useState('');
  const [breedFor, setBreedFor] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [lifeSpan, setLifeSpan] = useState('');
  const [temperament, setTemperament] = useState('');

  const [banList, setBanList] = useState([]);

  const breedListInitialize = async () =>{
    try{
      const response = await axios.get(API_BREED, {headers: {'x-api-key': ACCESS_KEY}});
      setBreedList(response.data);
    } catch(err){
      console.log(err);
    }
  }  
  useEffect(() => {
    breedListInitialize(); // Call the breedList function when the component mounts
  }, []);

  const dogBreed = async () =>{
    try{
      // Get random dog breed
      const randomNumber = Math.floor(Math.random() * (breedList.length-1) + 1);
      // Get pictures
      const responseImg = await axios.get(API_IMAGE + randomNumber.toString(), {headers: {'x-api-key': ACCESS_KEY}});
      
      // Loop if there is any breed with no picture
      if(responseImg.data.length === 0){
        await dogBreed();
        return;
      }

      // Get the breed information
      const responseBreed = await axios.get(API_BREED + randomNumber.toString(), {headers: {'x-api-key': ACCESS_KEY}});
      
      if(banList.includes(responseBreed.data.name)){
        await dogBreed();
        return;
      }

      // Get the image url
      const imageUrl = responseImg.data[0].url;
      setDogPic(imageUrl);
      
      // Get name
      setBreedName(responseBreed.data.name);
      setBreedFor(responseBreed.data.bred_for);
      setWeight(responseBreed.data.weight.imperial + " lbs");
      setHeight(responseBreed.data.height.imperial + " inches");
      setLifeSpan(responseBreed.data.life_span);
      setTemperament(responseBreed.data.temperament);
    } catch (err){
      console.log(err);
    }
  }

  const handleBanList = (name) => {
    if(!banList.includes(name)){
      setBanList((prevBanList) => [...prevBanList, name]);
    }
  }

  return (
    <div>
      <h1>Dog Breeds</h1>
      <button className='explore-button' onClick={dogBreed}>Explore!</button>
      <DogCard dogImage ={dogPic} dogBreed = {breedName} breedFor = {breedFor} weight = {weight} height = {height} lifeSpan = {lifeSpan} temperament = {temperament} handleBanList={handleBanList}></DogCard>
      <BanList banList={banList} />
    </div>
  )
}

export default App;
