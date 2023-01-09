import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
// import Forms from './Forms'
import NewForm from './NewForm'


function App() {
  const [count, setCount] = useState(0)

  return (
    <NewForm></NewForm>
  )
}

export default App
