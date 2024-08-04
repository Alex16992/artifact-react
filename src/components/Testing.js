import { useEffect, useRef } from "react"

function Testing({ test }) {
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log("Testing")
    }, 2000)

    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <div>
      <h1>Testing</h1>
    </div>
  )
}

export default Testing
