import { useState } from 'react';
import MapViewContext from './MapViewContext';
import MyMap from '../../components/Map/MyMap';
import './MapView.css';

function MapView() {
    let defaultState = { countiesEnabled: false, statesEnabled: false };
    const [mapState, setMapState] = useState(defaultState);

    function onCheckedChange(e) {
        setMapState({ ...mapState, [e.target.value]: e.target.checked});
    }

    return (
        <MapViewContext.Provider value={mapState}>
            <div className="mapview">
                <label>
                    <input type="checkbox" id="states" name="selected[]" value="statesEnabled" checked={mapState.statesEnabled} onChange={onCheckedChange} />
                    <span>States</span>
                </label>
                <label>
                    <input type="checkbox" id="counties" name="selected[]" value="countiesEnabled" checked={mapState.countiesEnabled} onChange={onCheckedChange} />
                    <span>Counties</span>
                </label>
            </div>
            <MyMap></MyMap>
        </MapViewContext.Provider>
    );
}

export default MapView;
