import React from 'react';

export default (props) => {
    const { columnSize = 6, result, title } = props;
    const prepositions = ['with', 'at', 'by', 'to', 'in', 'for', 'from', 'of', 'on', 'and', 'or', 'as']
    const titleCase = title => title
    .split(/ /g).map(word =>
        !prepositions.includes(word)?`${word.substring(0,1).toUpperCase()}${word.substring(1)}`:word)
    .join(" ");
    return (
        <div className={`col-sm-${columnSize > 3 ? columnSize : 3}`}>
            <div className="description-block">
                <div className="description-percentage text-success">
                    <h5>{result}</h5>
                </div>
                <div className="description-text" style={{ textTransform: 'none' }}>
                    {titleCase(title)}
                </div>
            </div>
        </div>
    )
}