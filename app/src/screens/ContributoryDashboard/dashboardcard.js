import React from 'react';

export default (props) => {
    const { columnSize = 6, result, title } = props;
    return (
        <div className={`col-sm-${columnSize > 3 ? columnSize : 3}`}>
            <div className="description-block">
                <div className="description-percentage text-success">
                    <h5>{result}</h5>
                </div>
                <div className="description-text" style={{ textTransform: 'capitalize' }}>
                    {title}
                </div>
            </div>
        </div>
    )
}