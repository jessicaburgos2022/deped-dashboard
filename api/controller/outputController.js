const mysql = require("mysql");
const asyncHander = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
    database: process.env.DB_CISD,
    user: process.env.DB_CISD_USER,
    password: process.env.DB_CISD_PASSWORD,
    host: process.env.DB_CISD_HOST,
    connectionLimit: process.env.DB_CISD_CONNECTION_LIMT,
    timeout: process.env.DB_CISD_TIMEOUT,
});
const insertMajorOutput = asyncHander(async (req, res) => {
    const { kraid, objective, program, output, plannedtarget, timeline, physicalaccomplishment, accomplishment1, accomplishment2,
        gaingap, financialrequirement, amountutilized, balance, utilizationrate, fundingsource, budgetstructure, opsissue, policyissue,
        recommendation, others, correctiveaction
    } = req.body;
    const queryString = `CALL InsertMajorOutput(${kraid}, '${objective}', '${program}', '${output}', 
    ${plannedtarget}, '${timeline}', ${physicalaccomplishment}, ${accomplishment1}, ${accomplishment2}, 
        ${gaingap}, ${financialrequirement}, ${amountutilized}, ${balance}, ${utilizationrate}, '${fundingsource}', 
        '${budgetstructure}', '${opsissue}', '${policyissue}',
        '${recommendation}', '${others}', '${correctiveaction}')`;
    connection.query(queryString, (error, results) => {
        if (error) {
            res.json({ result: 'Failed', message: 'Query Failed' });
        }
        else {
            var qResult = JSON.parse(JSON.stringify(results[0][0]));
            res.json(qResult);
        }

    })
});

const insertMinorOutput = asyncHander(async (req, res) => {
    const { kraid, objective, program, output, target, accomplishment, agency, timeline, opsissue,
        policyissue, recommendation, others, score, descriptiveequivalent
    } = req.body;
    const queryString = `CALL InsertMinorOutput(${kraid}, '${objective}', '${program}', '${output}', ${target}, '${accomplishment}', 
        '${agency}', '${timeline}', '${opsissue}','${policyissue}', '${recommendation}', '${others}', ${score}, '${descriptiveequivalent}')`;
        console.log(queryString)
    connection.query(queryString, (error, results) => {
        if (error) {
            res.json({ result: 'Failed', message: 'Query Failed' });
        }
        else {
            var qResult = JSON.parse(JSON.stringify(results[0][0]));
            res.json(qResult);
        }

    })
});
module.exports = { insertMajorOutput, insertMinorOutput };
