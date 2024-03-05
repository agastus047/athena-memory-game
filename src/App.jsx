import { useEffect, useState,useRef } from 'react'
import './App.css'

const pattern = [false,false,true,false,true,false,true,false,false];

function Preview({initTime,pattern}) {
  const [time,setTime] = useState(initTime);

  useEffect(()=> {
    const timer = setInterval(() => {
      setTime((time) => time-1);
    },1000);

    return () => clearInterval(timer);
  },[time]);
  return(
    <div className='mb-10'>
      <div>Game starts in</div>
      <div>{time}</div>
      <div className='grid grid-cols-3'>
      {pattern.map((val,index) => (
        <div className="h-8 border border-black" key={index}>{val==true?"x":" "}</div>
      ))}
      </div>
    </div>
  );
}

function App() {
  const [arr,setArr] = useState(new Array(9).fill(false));

  const [preview,setPreview] = useState("preview");

  const previewRef = useRef(preview);

  useEffect(() => {
    previewRef.current = preview;
  }, [preview]);

  const handleClick = (index) => {
    const newArr = [...arr];
    newArr[index] = !newArr[index]; 
    setArr(newArr);
  }

  useEffect(()=> {
    //timer to start game
    const timer = setTimeout(() => {
      setPreview((prevPreview) => (prevPreview === "preview" ? "play" : prevPreview));
    },5000);


    //timer to end game
    const timer2 = setTimeout(() => {
      if(previewRef.current==="play") {
        setPreview("timeout");
      }
    },10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  },[]);

  useEffect(() => {
    checkEquality(arr, pattern);
  },[arr]);

  const checkEquality = (arr1,arr2) => {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return;
      }
    }
    setPreview("won");
  }

  return (
    <>
      <h1 className='mb-5'>Memory Game</h1>
      {preview==="preview" && <Preview initTime={5} pattern={pattern}/>} 
      {preview==="play" && 
        <div className='grid grid-cols-3'>
        {arr.map((val,index) => (
          <div onClick={() => handleClick(index)} className="h-8 border border-black" key={index}>{val==true?"x":" "}</div>
        ))}
        </div>
      }
      {preview==="timeout" &&
        <div>
          <div>Timed Out!</div>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      }
      {preview==="won" &&
        <div>
          You Won!
        </div>
      }
    </>
  )
}

export default App
