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

export {concatData, sortCity};