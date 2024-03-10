import { useEffect, useState,useRef } from 'react'
import './App.css'

const patterns =[
                 [false,false,false,false,false,true,true,false,false,false,false,false,false,true,false,false,true,false,true,false,false,false,false,false,false],
                 [false,false,false,false,true,false,false,true,false,false,false,false,false,true,true,false,false,false,false,false,true,false,false,false,false],
                 [false,false,false,false,true,false,false,false,false,false,true,false,false,false,true,false,false,true,false,false,false,false,true,false,false],
                 [false,false,false,false,false,false,false,false,true,false,false,true,false,false,false,false,false,true,true,false,false,false,true,false,false],
                 [true,false,false,false,true,false,false,true,false,false,true,false,true,false,false,false,false,false,false,false,false,false,false,false,false],
                 [false,false,false,false,false,false,true,false,false,true,true,false,false,false,true,false,false,true,false,false,false,false,false,false,false]
                ];

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
      <div className='grid grid-cols-5'>
      {pattern.map((val,index) => (
        <div className="h-14 border border-black flex justify-center items-center text-xl" key={index}>{val==true?"x":" "}</div>
      ))}
      </div>
    </div>
  );
}

function App() {

  const [randomNum,setRandomNum] = useState(Math.floor(Math.random() * 6));
  const pattern = patterns[randomNum];

  const [arr,setArr] = useState(new Array(25).fill(false));

  const [preview,setPreview] = useState("preview");

  const previewRef = useRef(preview);

  useEffect(() => {
    previewRef.current = preview;
  }, [preview]);

  const handleClick = (index) => {
    setArr((prevArr) => {
      const newArr = [...prevArr];
      newArr[index] = !newArr[index];
      return newArr;
    });
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
    },15000);

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
        <div className='grid grid-cols-5'>
        {arr.map((val,index) => (
          <div onClick={() => handleClick(index)} className="h-14 border border-black flex justify-center items-center text-xl" key={index}>{val==true?"x":" "}</div>
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
