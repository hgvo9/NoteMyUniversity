import React, {useEffect, useState} from 'react';
import UniversityService from './services/university'
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'

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
          jsx.push(
            <Marker position={[parseFloat(university.latitude), parseFloat(university.longtitude)]} key={university.pk}>
              <Popup>
                {university.name}
              </Popup>
            </Marker>
          )
        });
      }
      return jsx;
    }
    
    return (
      <div className="App">
        <MapContainer 
          center={[37.0902, -95.7129]} 
          zoom={3} 
          zoomControl={false} 
          style={{ height: '100vh', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            universities && universities.length > 0 ? universityMarkers() : null
          }
        </MapContainer>
      </div>
    );
}

export default Map;