import { useState } from 'react';
import { useEffect } from 'react';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { GeoJSON } from 'react-leaflet/GeoJSON'
import './MyMap.css'
import Gis from '../../services/data/Gis'
import Constants from '../../services/Constants'

function MyMap() {
    const MAPCENTER = [38.5042075,-97.3662048]; // roughly the center of the US
    const DEFAULTZOOM = 5;
    let [counties, setCounties] = useState(null);

    // retrieve all US counties 
    useEffect(function(){
        Gis.getUSCounties()
            .then(function(c){
                console.log('retrieved counties', c);

                setCounties(c);
            });
    }, [setCounties]);

    return (
        <div className="MyMap">
            <MapContainer className="MyMap" center={MAPCENTER} zoom={DEFAULTZOOM} scrollWheelZoom={false}>
                <TileLayer
                    url={Constants.ApiUrls.GETBASEMAPTILES}
                />

                { counties && 
                    <GeoJSON 
                        data={counties} 
                        style={{ weight: 1, color: 'green'}} 
                    />
                }
            </MapContainer>
        </div>
    );
}

export default MyMap;
