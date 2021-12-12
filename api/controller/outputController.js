const mysql = require("mysql");
const asyncHander = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();


const pool = mysql.createPool({
    database: process.env.DB_CISD,
    user: process.env.DB_CISD_USER,
    password: process.env.DB_CISD_PASSWORD,
    host: process.env.DB_CISD_HOST,
    connectionLimit: process.env.DB_CISD_CONNECTION_LIMT,
    timeout: process.env.DB_CISD_TIMEOUT,
});


const insertMajorOutput = asyncHander(async (req, res) => {
    const { kraid, objective, projectId, output, plannedtarget, timeline, physicalaccomplishment, accomplishment1, accomplishment2,
        gaingap, financialrequirement, amountutilized, balance, utilizationrate, fundingsource, budgetstructure, score, scoredescription, opsissue, policyissue,
        recommendation, others, correctiveaction, userId
    } = req.body;
    const queryString = `CALL InsertMajorOutput(${kraid}, '${objective}', ${projectId}, '${output}', 
    ${plannedtarget}, '${timeline}', ${physicalaccomplishment}, ${accomplishment1}, ${accomplishment2}, 
        ${gaingap}, ${financialrequirement}, ${amountutilized}, ${balance}, ${utilizationrate}, '${fundingsource}', 
        '${budgetstructure}', ${score}, '${scoredescription}','${opsissue}', '${policyissue}',
        '${recommendation}', '${others}', '${correctiveaction}', ${userId})`;
    pool.getConnection((err, connection) => {
        if (err) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            return;
        }
        try {
            connection.query(queryString, (error, results) => {
                if (error) {
                    res.json({ result: 'Failed', message: 'Query Failed' });
                }
                else {
                    var qResult = JSON.parse(JSON.stringify(results[0][0]));
                    res.json(qResult);
                    res.end();
                }

            })
        } catch (error) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            res.end();
        }
        connection.release();
    });
});

const insertMinorOutput = asyncHander(async (req, res) => {
    const { kraid, objective, projectId, output, target, accomplishment, agency, timeline, opsissue,
        policyissue, recommendation, others, score, scoredescription, correctiveaction, userId
    } = req.body;
    const queryString = `CALL InsertMinorOutput(${kraid}, '${objective}', ${projectId}, '${output}', ${target}, '${accomplishment}', 
        '${agency}', '${timeline}', '${opsissue}','${policyissue}', '${recommendation}', '${others}', ${score}, '${scoredescription}', '${correctiveaction}', ${userId})`;

    pool.getConnection((err, connection) => {
        if (err) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            return;
        }
        try {
            connection.query(queryString, (error, results) => {
                if (error) {
                    res.json({ result: 'Failed', message: 'Query Failed' });
                }
                else {
                    var qResult = JSON.parse(JSON.stringify(results[0][0]));
                    res.json(qResult);
                    res.end();
                }
            })
        } catch (error) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            res.end();
        }
        connection.release();
    });
});
module.exports = { insertMajorOutput, insertMinorOutput };
