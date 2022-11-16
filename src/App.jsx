import React, { useState, useEffect } from 'react'
// import { Kafka } from 'kafkajs'
import logo from './logo.svg';
import './App.scss';

const App = () => {

  // if(process.env.NODE_ENV === 'development'){
  //   setDebugLevel(1)
  // }

  // const kafka = new Kafka({
  //   clientId: 'temp-simulation',
  //   brokers: ['lab10.alumchat.fun:9092'],
  // })

  // const producer = kafka.producer()

  const directions = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE']

  const [tempData, setTempData] = useState([])


  // const initKafka = async() => {
  //   await producer.connect()  
  // }

  function boxMullerTransform() {
    const u1 = Math.random();
    const u2 = Math.random();
    
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
    
    return { z0, z1 };
  }

  function getNormallyDistributedRandomNumber(mean, stddev) {
    const { z0, _ } = boxMullerTransform();
    
    return z0 * stddev + mean;
  }

  const genNewData = async () => {
    const newData = {
      temp: Math.round(getNormallyDistributedRandomNumber(50, 10) * 100) / 100,
      moisture: `${parseInt(getNormallyDistributedRandomNumber(50, 10))}%`,
      wind_direction: directions[Math.round(Math.random() * directions.length)]
    }
    setTempData((prevArray) => [...prevArray, newData])

    // await producer.send({
    //   topic: '19365',
    //   value: JSON.stringify(newData),
    // })
  }

  // useEffect(() => {
  //   const generator = setInterval(() => {
  //     const newData = {
  //       temp: Math.round(getNormallyDistributedRandomNumber(50, 10) * 100) / 100,
  //       moisture: `${parseInt(getNormallyDistributedRandomNumber(50, 10))}%`,
  //       wind_direction: directions[Math.round(Math.random() * directions.length)]
  //     }
  //     setTempData((prevArray) => [...prevArray, newData])
  //   }, 15000)
  // }, [])

  // useEffect(()=>{
  //   initKafka()
  //   return(
  //     producer.disconnect()
  //   )
  // }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => genNewData()}>Generate New Data</button>
        <div>
          {tempData.map((elem, ind) => {
            return (
              <div key={`${ind}-${elem.temp}`}>{`${ind+1}. Temp: ${elem.temp} - Moist: ${elem.moisture} - Wind: ${elem.wind_direction}`}</div>
            )
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
