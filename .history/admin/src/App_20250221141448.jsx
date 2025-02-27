import { useState } from 'react'
import './App.css'

import { Button } from "@heroui/react";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <Button color="primary">Button</Button>
    </div>
    </>
  )
}

export default App
