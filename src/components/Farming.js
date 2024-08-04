import { useEffect, useState, useRef } from "react"
import { ArtifactsApi } from "artifacts-api-client"

function Farming({ farm, token, nickname, isFarming }) {
  const [data, setData] = useState({})
  const isFarmingRef = useRef(isFarming)
  const farmRef = useRef(farm)
  const timeoutRef = useRef(null)

  useEffect(() => {
    isFarmingRef.current = isFarming
  }, [isFarming])

  useEffect(() => {
    farmRef.current = farm
  }, [farm])

  useEffect(() => {
    if (farmRef.current === 0 || isFarmingRef.current === false) return

    const artifactsApi = ArtifactsApi.create({
      token: token,
    })

    const move = async () => {
      try {
        let response
        if (farmRef.current === 1) {
          response = await artifactsApi.myCharacters.move(nickname, {
            x: -1,
            y: 0,
          })
        } else if (farmRef.current === 2) {
          response = await artifactsApi.myCharacters.move(nickname, {
            x: 4,
            y: 2,
          })
        }
        console.log("Move Success:", response)
        let remainingSeconds =
          response.data.cooldown.remaining_seconds > 0
            ? response.data.cooldown.remaining_seconds * 1000
            : 5000
        timeoutRef.current = setTimeout(startFarm, remainingSeconds)
      } catch (error) {
        console.error("Move Error:", error)
        timeoutRef.current = setTimeout(startFarm, 5000)
      }
    }

    const startFarm = async () => {
      if (isFarmingRef.current === false) return
      try {
        let response
        if (farmRef.current === 1) {
          response = await artifactsApi.myCharacters.gathering(nickname)
        } else if (farmRef.current === 2) {
          response = await artifactsApi.myCharacters.gathering(nickname)
        }
        console.log("Gathering Success:", response)
        setData({ status: "Success", response: JSON.stringify(response) })

        const remainingSeconds = response.data.cooldown.remaining_seconds * 1000
        timeoutRef.current = setTimeout(startFarm, remainingSeconds)
      } catch (error) {
        console.error("Gathering Error:", error)
        setData({ status: "Error", message: error.message })
        timeoutRef.current = setTimeout(startFarm, 5000)
      }
    }

    move()

    return () => clearTimeout(timeoutRef.current)
  }, [farm, token, nickname])

  return (
    <div>
      <h1>
        {data.status}: {data.response || data.message}
      </h1>
    </div>
  )
}

export default Farming
