import { useState } from "react"
import Farming from "./components/Farming"
import "./App.css"

function App() {
  const token = ""
  const nickname = "Alex_1699"
  const [farm, setFarm] = useState(0)
  const [isFarming, setIsFarming] = useState(false)

  return (
    <div className='App'>
      <button
        className={`${isFarming ? "disabled" : ""}`}
        disabled={isFarming}
        onClick={() => {
          setIsFarming(true)
          setFarm(1)
          console.log("Start Farm Ash Wood")
        }}
      >
        Farm Ash Wood
      </button>
      <button
        className={`${isFarming ? "disabled" : ""}`}
        disabled={isFarming}
        onClick={() => {
          setIsFarming(true)
          setFarm(2)
          console.log("Start Farm Gudgeon Fish")
        }}
      >
        Farm Gudgeon Fish
      </button>
      <button
        className={`${!isFarming ? "disabled" : ""}`}
        disabled={!isFarming}
        onClick={() => {
          setIsFarming(false)
          setFarm(0)
          console.log("Stop Farm")
        }}
      >
        Stop Farm
      </button>
      {isFarming && (
        <>
          <h2>Farming</h2>
          <Farming
            farm={farm}
            token={token}
            nickname={nickname}
            isFarming={isFarming}
          />
        </>
      )}
    </div>
  )
}

export default App
