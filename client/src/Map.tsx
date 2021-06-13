import React, {useEffect, useState} from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import UniversityService from './services/university'

const containerStyle = {
  width: '70vw',
  height: '70vh',
};

const center = {
  lat: 35.6804,
  lng: 139.769,
};

interface IUniversity {
  city: string;
  country: string;
  description: string;
  latitude: string;
  longtitude: string;
  name: string;
  pk: number;
  website: string;
}

function Map() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    });

    const [universities, setUniversities] = useState<IUniversity[]>();

    useEffect(() => {
      UniversityService.get()
      .then((res) => {
        setUniversities(res);
      })
    }, [])


    function universityMarkers() {
      var jsx: JSX.Element[] = [];

      if (universities !== undefined) {
        Object.keys(universities).forEach((value: string, index: number) => {
          const university: IUniversity = universities[index]
          jsx.push(<Marker position={{lat: parseFloat(university.latitude), lng: parseFloat(university.longtitude)}} key={university.pk} />)
        });
      }
      return jsx;
    }
    

    if (loadError || !isLoaded) {
        return (
            <p>Error</p>
        );
    }
    
    return (
      <div className="App">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={3}
        >
          {
            universities && universities.length > 0 ? universityMarkers() : null
          }
        </GoogleMap>
      </div>
    );
}

export default Map;