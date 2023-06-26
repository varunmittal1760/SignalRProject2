import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import signalRServiceInstance from './signalr';

const TestApp = () => {
    const [instrumentIDs, setInstrumentIDs] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        signalRServiceInstance.registerDataUpdateCallback(onDataUpdate);
        return () => {
            signalRServiceInstance.deregisterDataUpdateCallback();
        };
    }, []);

    const onDataUpdate = (updatedData) => {
        setData(updatedData);
    };

    const handleInputChange = (event) => {
        setInstrumentIDs([...instrumentIDs, event.target.value]);
    };

    const addInstrument = () => {
        signalRServiceInstance.subscribeInstrument(instrumentIDs[instrumentIDs.length - 1], 'clientID');
    };

    return (
        <div>
            <label htmlFor="instrumentID">ID</label>
            <input
                type="number"
                name="instrumentID"
                id="instrumentID"
                value={instrumentIDs[instrumentIDs.length - 1] || ''}
                className="scanner-input-field"
                onChange={handleInputChange}
            />
            <button onClick={addInstrument}>Add Instrument</button>

            <Link to="/">
                <button className="route-to-landing-page" role="button">
                    Return Home
                </button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th>Instrument ID</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {instrumentIDs.map((id, index) => (
                        <tr key={index}>
                            <td>{id}</td>
                            <td>{data[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestApp;