import React, { useState } from 'react';
import MajorView from './_components/MajorOutput';
import MinorView from './_components/MinorOutput';

export default () => {

    const [outputType, setOutputType] = useState('minor');

    const RenderOutputVIew = () => {
        return outputType === 'minor' ? <MinorView /> : <MajorView />
    }
    const handleOutputTypeChange = (type) => {
        setOutputType(type);
    }

    return (
        <div>
            <form onSubmit={}>
                <label>
                   Select Output Type:
                    <select value={} onChange={}>           
                        <option value="Minor">Minor</option>
                        <option value="Major">Major</option>
                        <option value="OO">OO</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
            <RenderOutputVIew />
        </div>
    )
}