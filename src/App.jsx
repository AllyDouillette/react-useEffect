import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Display ({item}) {
  return (
    <p>{item}</p>
  )
}

function App() {
  const [count, setCount] = useState(1)
  const [displayedData, setData] = useState([])

  const baseURL = "https://taylor-swift-api.sarbo.workers.dev/"
  const endpoint = `lyrics?shouldRandomizeLyrics=true&numberOfParagraphs=1`
  
  const reload = () => {
    fetch(baseURL + endpoint)
      .then(res => res.json())
      .then(data => {
        const lyricArr = String(data.lyrics).split("\n")
        setData(lyricArr)
      })
  }

  useEffect(reload, [count])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Refresh-Count: {count}
        </button>
        {displayedData.map(element => <Display item={element}/>)}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
