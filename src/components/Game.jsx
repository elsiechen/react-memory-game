import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import ScoreBoard from './ScoreBoard';
import Overlay from './Overlay';

const list = [
    'pikachu',
    'charmander',
    'bulbasaur',
    'squirtle',
    'psyduck',
    'meowth',
    'eevee',
    'snorlax',
    'gengar',
    'butterfree'
  ];

const capitalizeFirst = (word) => {
    return word.slice(0,1).toUpperCase() + word.slice(1);
}
export default function Game() {
    const [ pokemons, setPokemons ] = useState([]);
    const [ currentScore, setCurrentScore ] = useState(0);
    const [ highestScore, setHighestScore ] = useState(0);
    const [ clickedPokemons, setClickedPokemons ] = useState([]);
    const [ overlay, setOverlay ] = useState(false);
    const [ animation, setAnimation ] = useState(false);

    const handleClick = (e) => {
        const clicked = e.target.id;
        console.log(clicked)
        console.log(e.target)
        console.log(clickedPokemons)
        // Update clickedPokemons, current score if click rightly
        if (!clickedPokemons.includes(clicked)) {
            console.log(currentScore, pokemons.length);
            let updatedClickedPokemons = [...clickedPokemons, clicked];
            setClickedPokemons(() => updatedClickedPokemons);
            let updatedScore = currentScore + 1;
            setCurrentScore(() => updatedScore);
            console.log(currentScore, pokemons.length);
        } else {
            console.log(currentScore, pokemons.length);
            lose();
        }
        // Copy original array and shuffle the array and then
        // set the state with the shuffled array
        const shuffledPokemons = [...pokemons];
        shuffleArray(shuffledPokemons);
        setPokemons(shuffledPokemons);
    }

    const win = () => {
        console.log('congratulation, you win!');
        setOverlay(true);
    }

    const lose = () => {
        console.log('Sorry, you lose!');
        setOverlay(true);
    }

    const restart = () => {
        setClickedPokemons([]);
        setCurrentScore(0);
        setOverlay(false);
    }

    const shuffleArray = (array) => {
        for (let i = 0; i < array.length; i++) {
          const j = Math.floor(Math.random() * i);
          [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const fetchPokemon = async (name) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            if(!response.ok) {
                throw new Error('Network response was not ok!');
            }
            const data = await response.json();
            const pokemon = { id: uuidv4(), name: data.species.name, imgUrl: data.sprites.front_default};
            return pokemon;
        } catch (error) {
            console.error("There has been a problem:", error);
        }
    }

    useEffect(() => {
        const fetchAllPokemon = async () => {
            try {
                const pokemonArray = await Promise.all(list.map((item) => fetchPokemon(item)));
                setPokemons(pokemonArray);
            } catch (error) {
                console.error("There has been a problem with fetchAllPokemon:", error);
            }
        }
        fetchAllPokemon();
    }, []);

    useEffect(() => {
        // Update highest score
        if(currentScore > highestScore) setHighestScore(currentScore);
    }, [currentScore]);

    useEffect(() => {
        // Win condition
        if(currentScore > 0 && currentScore === pokemons.length) win();
    }, [currentScore]);

    useEffect(() => {
        setAnimation(true);
        const timer = setTimeout(() => {
            setAnimation(false);
        }, 2000);

        return () => {
            clearTimeout(timer);
        }
    }, [currentScore])

    return (
        <div className='gameContainer'>
            <ScoreBoard currentScore={currentScore} 
                highestScore={highestScore} animation={animation}/>
            <div className='cardContainer'>
                { Object.keys(pokemons).length > 0 && pokemons.map(item => (
                    <div className="card" key={item.id} id={item.name} 
                        onClick={handleClick} value={item.name}>
                        <img src={item.imgUrl} alt={item.name} id={item.name}/>
                        <div className="name" id={item.name}>{capitalizeFirst(item.name)}</div>
                    </div>
                ))}
            </div>
            { overlay && <Overlay restart={restart} currentScore={currentScore} pokemons={pokemons}/> }
        </div>
        
    )
}