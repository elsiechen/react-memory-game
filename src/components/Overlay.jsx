export default function Overlay({restart, currentScore, pokemons}) {
    return (
        <>
            <iframe src={currentScore > 0 && currentScore === pokemons.length ? "https://giphy.com/embed/cQNRp4QA8z7B6": "https://giphy.com/embed/Pok6284jGzyGA"} 
                        width="100%" height="100%" frameBorder="0" className="giphy-embed" allowFullScreen>
            </iframe>
            <div className="gifContainer">  
                <div className="result">{currentScore > 0 && currentScore === pokemons.length ? 'You Win!': 'You Lose!'}</div>
                <button type="button" className="restartBtn" onClick={restart}>Restart</button>    
            </div>
        </>
    )
}