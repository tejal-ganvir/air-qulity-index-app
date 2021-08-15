import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import useWebSocket from 'react-use-websocket';
import { concatData } from '../utilies/helpers';

/**
* @author
* @function Main
**/

const Main = (props) => {

  const [data, setData] =  useState([]);
  const [citiesData, setCitiesData] =  useState([]);

  const dataLimit = 8;
  const socketUrl = 'ws://city-ws.herokuapp.com';

  const {
    lastJsonMessage,
    readyState,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log('opened'),
    onError: (error) => console.log(error),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });

  useEffect(() => {

    if(readyState === 1){

      setCitiesData((olddata) => concatData(olddata, lastJsonMessage));

      setData((currentData) => {
        if(currentData.length >= dataLimit)
        {
          currentData.shift();
        }
        return [...currentData , lastJsonMessage];
      })
    }

  },[lastJsonMessage])

  return(
    <React.Fragment>
      <Header />
      <div className="m-4">
        <table border="1" width="100%">
          <tr>
            {
              (citiesData.length > 0) ? citiesData.map((item, idx) => {
                return(
                  <td key={`cities-${idx}`}>
                    {item.city}
                    <p>{item.aqi}</p>
                  </td>
                )
              }) 
              :
              'loading....'
            }
          </tr>
        </table>
      </div>
      <Footer />

    </React.Fragment>
   )

 }

export default Main 