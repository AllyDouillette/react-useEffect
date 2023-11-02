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
  const [allSongs, setSongCount] = useState(177)
  const [displayedData, setData] = useState([])
  const [song, setSong] = useState({})

  const baseURL = "https://taylor-swift-api.sarbo.workers.dev"
  
  const getSongTotal = () => {
    const endpoint = "/songs"
    fetch(baseURL + endpoint)
      .then(response => response.json())
      .then(data => setSongCount(data.length))
  }

  getSongTotal()

  const getSongTitle = (id) => {
    fetch(baseURL + /songs/ + id)
      .then(response => response.json())
      .then(data => setSong(data))
      .then(() => console.log(song))
  }

  const reload = () => {
    const id = parseInt(Math.random() * allSongs)
    getSongTitle(id)
    const endpoint = `/lyrics/${id}`
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
        <h1>{song.song_title}</h1>
        {displayedData.map(element => <Display item={element}/>)}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
