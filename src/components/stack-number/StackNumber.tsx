import { useState, ChangeEvent, useEffect } from 'react';

import styles from './styles.module.css';

export default function StackNumber() {
  const [inputNumber, setInputNumber] = useState(0);
  const [arrayNumber, setArrayNumber] = useState<number[]>([]);
  const [startCounter, setStartCounter] = useState(false);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputNumber(e.target.value as unknown as number);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (arrayNumber.length > 0 && startCounter) {
        let item = arrayNumber[0];
        item -= 1;
        if (item === 0) {
          if (arrayNumber.length === 1) {
            setStartCounter(false);
          }
          setArrayNumber(arrayNumber.slice(1));
          return;
        }
        setArrayNumber([item, ...arrayNumber.slice(1)]);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <>
      <h1>Stack Countdown</h1>
      <input
        type="number"
        value={inputNumber}
        onChange={handleValueChange}
      ></input>
      <button
        onClick={() => {
          const localArray = [...arrayNumber];
          localArray.unshift(inputNumber);
          setArrayNumber(localArray);
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          setStartCounter(true);
        }}
      >
        Start Countdown
      </button>
      <div className={styles.container}>
        {arrayNumber.map((value: number, index: number) => (
          <span key={index}>{value.toString()}</span>
        ))}
      </div>
    </>
  );
}
