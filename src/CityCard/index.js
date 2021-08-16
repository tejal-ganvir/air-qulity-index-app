import React from 'react';
import {Card} from 'react-bootstrap';
import styles from './citycard.module.css'

/**
* @author
* @function CityCard
**/

const CityCard = (props) => {
    const {city, aqi} = props;
    const textColor = (aqi >= 0 && aqi <= 50) ? styles.text_good : (aqi >= 51 && aqi <= 100) ? styles.text_satisfactory : (aqi >= 101 && aqi <= 200) ? styles.text_moderate : (aqi >= 201 && aqi <= 300) ? styles.text_poor : (aqi >= 301 && aqi <= 400) ? styles.text_verypoor : styles.text_sever;
    
    return(
        <Card
            bg="dark"
            text={'white'}
            style={{ width: '18rem' }}
            className="mb-2"
        >
            <Card.Header>Header</Card.Header>
            <Card.Body>
            <Card.Title> {city} </Card.Title>
            <Card.Text className={textColor}>
                <b>{aqi.toFixed(2)}</b>
            </Card.Text>
            </Card.Body>
        </Card>
    )

 }

export default CityCard