import React, { useReducer } from 'react'
import { Button } from '@material-ui/core'

type Action = {
  type: 'increment' | 'decrement'
  value: number
}

type State = number

const counterReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return state + action.value
    case 'decrement':
      return state - action.value
  }
}

const Hello = (): JSX.Element => {
  const [counter, dispatch] = useReducer(counterReducer, 0)

  const increment = () => dispatch({ type: 'increment', value: 1 })
  const decrement = () => dispatch({ type: 'decrement', value: 1 })

  return (
    <div>
      <Button onClick={increment}>increment</Button>
      <Button onClick={decrement}>decrement</Button>
      <p>{`You've pressed the button ${counter} times.`}</p>
    </div>
  )
}

export default Hello
