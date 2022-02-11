import React from 'react';

export default (props) => {
    const { columnSize = 6, result, title } = props;
    return (
        <div className={`col-sm-${columnSize}`}>
            <div className="description-block">
                <div className="description-percentage text-success">
                    <h3>{result}</h3>
                </div>
                <div className="description-text">
                    {title}
                </div>
            </div>
        </div>
    )
}