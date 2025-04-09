import { use, useEffect, useState } from 'react'
import './App.css'


const Card = ({title, rating}) => {
    const [hasliked, sethasliked] = useState(false)
    // const [variable, setvariable] = useState(false) --> variable is a boolean so useState has a inital value of false
    var [yourrating, setyourrating] = useState(0)
    const [movieClicked, setmovieClicked] = useState(0)

    useEffect(() => {
        console.log(`${title} has been liked: ${hasliked}`)
    }, [hasliked])

    useEffect(() => {
        console.log(`the rating has changed to: ${yourrating}`)
    }, [yourrating])

    useEffect(() => {
        console.log(`${title} has been clicked ${movieClicked} times`)
    }, [movieClicked])

    return (
        <div id = "card1" onClick={() => {
            setmovieClicked((prevState) => prevState + 1)
        }}>
        <h2>{title}</h2>
        <h3>Rating: {rating} </h3>
        <button onClick={() => {sethasliked((prevState) => !prevState)}}>
            
            {hasliked ? '💖' : '❤️'}
        </button>
        <div className = "rating">
            <button className='rating-increase' onClick={() => {
                if (yourrating > 0) {
                    setyourrating((prevState) => prevState - 1)
                }
                else{
                    yourrating = 0
                }
                }}>
                -
            </button>
            <h>rating: {yourrating}</h>
            <button className='rating-decrease' onClick={() => {
                if (yourrating < 5) {
                    setyourrating((prevState) => prevState + 1)
                }
                else{
                    yourrating = 5
                }
                }}>
                +
            </button>
        </div>

        </div>
    )
}

const App = () => {
    

    return (
        <div className = "card-container">
        <h1> Movie list </h1>
        <Card title="Star wars" rating = {5} />
        <Card title="Lion King" rating = {4}/>
        <Card title="US" rating = {4}/>
        </div>
    )
}

export default App
