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
    const { kraid, objective, projectid, output, plannedtarget, targettype, targetdescription, timeline, physicalaccomplishment, accomplishmentdescription, accomplishment1, accomplishment2, withinTimeframe,
        gaingap, financialrequirement, amountutilized, balance, utilizationrate, fundingsource, budgetstructure, score, scoredescription, opsissue, policyissue,
        recommendation, others, correctiveaction, userId
    } = req.body;
    const queryString = `CALL InsertMajorOutput(${kraid},  ${projectid}, '${objective}', '${output}', 
    ${plannedtarget}, '${targettype}', '${targetdescription}', '${timeline}', ${physicalaccomplishment}, '${accomplishmentdescription}', ${accomplishment1}, ${accomplishment2}, ${withinTimeframe},
        '${gaingap}', ${financialrequirement}, ${amountutilized}, ${balance}, ${utilizationrate}, '${fundingsource}', 
        '${budgetstructure}', '${score}', '${scoredescription}','${opsissue}', '${policyissue}',
        '${recommendation}', '${others}', '${correctiveaction}', ${userId})`;
    console.log(queryString)
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

const editMajorOutput = asyncHander(async (req, res) => {
    const { outputmajorheaderid, objective, output, plannedtarget, targettype, targetdescription, timeline, physicalaccomplishment, accomplishmentdescription, accomplishment1, accomplishment2, withinTimeframe,
        gaingap, financialrequirement, amountutilized, balance, utilizationrate, fundingsource, budgetstructure, score, scoredescription, opsissue, policyissue,
        recommendation, others, correctiveaction, userId
    } = req.body;
    const queryString = `CALL EditMajorOutput(${outputmajorheaderid}, '${objective}', '${output}', 
    ${plannedtarget}, '${targettype ? targettype : ''}', '${targetdescription ? targetdescription : ''}', '${timeline}', ${physicalaccomplishment}, ${accomplishmentdescription}, ${accomplishment1}, ${accomplishment2}, ${withinTimeframe},
        '${gaingap}', ${financialrequirement}, ${amountutilized}, ${balance}, ${utilizationrate}, '${fundingsource}', 
        '${budgetstructure}', '${score}', '${scoredescription}','${opsissue}', '${policyissue}',
        '${recommendation}', '${others}', '${correctiveaction}', ${userId})`;
    console.log(queryString)
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
    const { kraid, objective, projectid, output, target, accomplishment, targetcompletion, agency, timeline, withinTimeframe, opsissue,
        policyissue, recommendation, others, score, scoredescription, correctiveaction, userId
    } = req.body;
    const queryString = `CALL InsertMinorOutput('${kraid}', '${objective}', '${projectid}', '${output}', '${target}', '${accomplishment}', ${targetcompletion},
        '${agency}', '${timeline}', ${withinTimeframe},'${opsissue}','${policyissue}', '${recommendation}', '${others}', '${score}', '${scoredescription}', '${correctiveaction}', ${userId})`;
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

const editMinorOutput = asyncHander(async (req, res) => {
    const { outputminorheaderid, objective, output, target, accomplishment, targetcompletion, agency, timeline, withinTimeframe, opsissue,
        policyissue, recommendation, others, score, scoredescription, correctiveaction, userId
    } = req.body;
    const queryString = `CALL EditMinorOutput('${outputminorheaderid}', '${objective}', '${output}', '${target}', '${accomplishment}', ${targetcompletion},
        '${agency}', '${timeline}', ${withinTimeframe},'${opsissue}','${policyissue}', '${recommendation}', '${others}', '${score}', '${scoredescription}', '${correctiveaction}', ${userId})`;
        console.log(queryString)
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

const insertContributoryOutput = asyncHander(async (req, res) => {
    const { projectid, outputs, indicators, userId } = req.body;
    console.log(req.body)
    pool.getConnection((err, connection) => {
        if (err) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            return;
        }
        try {
            indicators.map(i => {
                const queryString = `CALL InsertContributoryOutput(${i.id}, ${projectid}, '${i.value}', '${outputs}', ${userId})`;
                console.log(queryString)
                connection.query(queryString)
            })
            res.json({ result: 'Success', message: 'Contributory Outputs saved!' });
            res.end();
        } catch (error) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            res.end();
        }
        connection.release();
    });
});



const searchMajorOutput = asyncHander(async (req, res) => {
    const { } = req.params;
    const queryString = `CALL searchMajorOutput()`;
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
                    var qResult = JSON.parse(JSON.stringify(results[0]));
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
const searchMinorOutput = asyncHander(async (req, res) => {
    const { } = req.params;
    const queryString = `CALL searchMinorOutput()`;
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
                    var qResult = JSON.parse(JSON.stringify(results[0]));
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

const searchContributoryOutput = asyncHander(async (req, res) => {
    const { } = req.params;
    const queryString = `CALL SearchContributoryOutput()`;
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
                    var qResult = JSON.parse(JSON.stringify(results[0]));
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

const ListIndicatorsByDepartmentId = asyncHander(async (req, res) => {
    const { departmentid } = req.params;
    const queryString = `CALL ListIndicatorsByDepartmentId(${departmentid})`;
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
                    var qResult = JSON.parse(JSON.stringify(results[0]));
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

const editOutputStatus = asyncHander(async (req, res) => {
    const { outputtype, headerid, statusid } = req.body;
    const queryString = `CALL EditOutputStatus(${outputtype},${headerid},${statusid})`;
    console.log(queryString)
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
module.exports = { insertMajorOutput, editMajorOutput, insertMinorOutput, editMinorOutput, insertContributoryOutput, searchMajorOutput, searchMinorOutput, searchContributoryOutput, ListIndicatorsByDepartmentId, editOutputStatus };
