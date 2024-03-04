import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const pattern = [false,false,true,false,true,false,true,false,false];
  const [arr,setArr] = useState(new Array(9).fill(false));

  const handleClick = (index) => {
    const newArr = [...arr];
    newArr[index] = !newArr[index]; 
    setArr(newArr);
  }

  useEffect(() => {
    checkEquality(arr, pattern);
  },[arr]);

  const checkEquality = (arr1,arr2) => {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return;
      }
    }
    console.log('Arrays are equal');
  }

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
      <div className='grid grid-cols-3'>
      {arr.map((val,index) => (
        <div onClick={() => handleClick(index)} className="h-8 border border-black" key={index}>{val==true?"x":" "}</div>
      ))}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
