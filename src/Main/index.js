import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import CityCard from '../CityCard';
import useWebSocket from 'react-use-websocket';
import { concatData, divideArray } from '../utilies/helpers';
import { Row, Col } from 'react-bootstrap';
import AllChart from './AllChart';

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

  },[lastJsonMessage]);

  const viewArray = divideArray(citiesData);

  return(
    <React.Fragment>
      <Header />
      <div className="m-4">
      <Row>
        <Col xs={{ span: 12, order: 2 }} md={{ span: 3, order: 1 }}>
          { viewArray[0] && viewArray[0].map((val,idx) => (
            <CityCard {...val} key={`city0-${idx}`} />
          ))}
        </Col>

        <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 2 }}>
            <AllChart data={citiesData} />
        </Col>

        <Col xs={{ span: 12, order: 3 }} md={{ span: 3, order: 3 }}>
          { viewArray[1] && viewArray[1].map((val,idx) => (
            <CityCard {...val} key={`city1-${idx}`} />
          ))}
        </Col>
      </Row>
      </div>
    </React.Fragment>
   )

 }

export default Main 