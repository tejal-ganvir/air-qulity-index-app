function sortCity( a, b ) {
    if ( a.city < b.city ){
      return -1;
    }
    if ( a.city > b.city ){
      return 1;
    }
    return 0;
  }

const concatData = (olddata, latestdata) =>{
    if(latestdata){
      let virtualData = olddata;

      latestdata.forEach((val) => {
          const existingCity = virtualData && virtualData.find((cityItem) => cityItem.city === val.city);
          
          if (existingCity) {
            existingCity.aqi = val.aqi;
          } else {
            const newCity = { city: val.city, aqi: val.aqi};
            virtualData.push(newCity)
          }
      });

      return virtualData.sort(sortCity);
    }
    return [];
}

const divideArray = (array) =>{
    let middle = Math.ceil(array.length / 2);
    let first = array.slice(0, middle);
    let second = array.slice(middle);
    
    return [first, second];
}

export {concatData, sortCity, divideArray};