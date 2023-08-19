export default function ScoreBoard({currentScore, highestScore, animation}) {
    return (
        <div className={animation ? "scoreBoard boardAnimation": "scoreBoard"}>
                <div>Highest Score: {highestScore}</div>
                <div>Current Score: {currentScore}</div>
        </div>
    )
}