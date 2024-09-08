import React from "react"
import useCounter from "./useCounter"
import { Button } from "primereact/button"
import "./counter.scss"

const Counter = () => {
  const { count, incrementCount, decrementCount } = useCounter()

  return (
    <div>
      <h1 className="counter">Counter: 2</h1>
      <Button
        label="Decrement"
        severity="danger"
  
        className="btn-style"
      />
      <Button
        label="Increment"
        severity="success"
        className="btn-style"
      />
    </div>
  )
}

export default Counter
