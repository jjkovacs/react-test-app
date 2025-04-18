import { useState } from 'react';
import MapViewContext from './MapViewContext';
import MyMap from '../../components/Map/MyMap';
import './MapView.css';

function MapView() {
    let [mapState, setMapState] = useState({ countiesEnabled: true });

    function onCheckedChange(e) {
        setMapState({ countiesEnabled: e.target.checked });
    }

    return (
        <MapViewContext.Provider value={mapState}>
            <div className="mapview">
                <form>
                    <label>
                        <input type="checkbox" id="counties" name="Counties" value="counties" checked={mapState.countiesEnabled} onChange={onCheckedChange} />
                        <span>Counties</span>
                    </label>
                </form>
            </div>
            <MyMap></MyMap>
        </MapViewContext.Provider>
    );
}

export default MapView;
