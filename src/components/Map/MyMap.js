import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { GeoJSON } from 'react-leaflet/GeoJSON'
import './MyMap.css'
import Gis from '../../services/data/Gis'
import Constants from '../../services/Constants'
import MapViewContext from '../../views/MapView/MapViewContext';

function MyMap() {
    const MAPCENTER = [38.5042075,-97.3662048]; // roughly the center of the US
    const DEFAULTZOOM = 5;
    let [counties, setCounties] = useState(null);
    let [states, setStates] = useState(null);
    let [water, setWater] = useState(null);
    let mapState = useContext(MapViewContext);

    // retrieve all US counties 
    useEffect(function(){
        Gis.getUSCounties()
            .then(setCounties);
    }, [setCounties]);

    // retrieve all US states 
    useEffect(function(){
        Gis.getUSStates()
            .then(setStates);
    }, [setStates]);

    // retrieve all US bodies of water 
    useEffect(function(){
        Gis.getUSBodiesOfWater()
            .then(setWater);
    }, [setWater]);

    return (
        <div className="MyMap">
            <MapContainer className="MyMap" center={MAPCENTER} zoom={DEFAULTZOOM} scrollWheelZoom={false}>
                <TileLayer
                    url={Constants.ApiUrls.GETBASEMAPTILES}
                />

                { states && mapState.statesEnabled && 
                    <GeoJSON 
                        data={states} 
                        style={{ weight: 1, color: 'green'}} 
                    />
                }

                { counties && mapState.countiesEnabled && 
                    <GeoJSON 
                        data={counties} 
                        style={{ weight: 1, color: 'green'}} 
                    />
                }

                { water && mapState.waterEnabled && 
                    <GeoJSON 
                        data={water} 
                        style={{ weight: 1, color: 'blue'}} 
                    />
                }
            </MapContainer>
        </div>
    );
}

export default MyMap;
