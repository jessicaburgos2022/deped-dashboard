const mysql = require("mysql");
const asyncHander = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();
const mysql_real_escape_string = require("../utils/sqlhelper");

const pool = mysql.createPool({
    database: process.env.DB_CISD,
    user: process.env.DB_CISD_USER,
    password: process.env.DB_CISD_PASSWORD,
    host: process.env.DB_CISD_HOST,
    connectionLimit: process.env.DB_CISD_CONNECTION_LIMT,
    timeout: process.env.DB_CISD_TIMEOUT,
});


const insertMajorOutput = asyncHander(async (req, res) => {
    const { kraid, objective, projectid, quarter, output, outputindicator, activity, plannedtarget, targettype, targetdescription, timeline, physicalaccomplishment, accomplishmentdescription, accomplishment1, accomplishment2, withinTimeframe,
        gaingap, financialrequirement, amountutilized, balance, utilizationrate, fundingSource, budgetstructure, score, scoredescription, opsissue, policyissue,
        recommendation, others, correctiveaction, userId, targets , otherFundingSource
    } = req.body;
    console.log(req.body)
    const queryString =
        `CALL InsertMajorOutput(
        '${mysql_real_escape_string(kraid)}', 
        '${mysql_real_escape_string(projectid)}',
        '${mysql_real_escape_string(quarter)}',
        '${mysql_real_escape_string(objective)}', 
        '${mysql_real_escape_string(output)}', 
        '${mysql_real_escape_string(outputindicator)}', 
        '${mysql_real_escape_string(activity)}', 
        '${mysql_real_escape_string(timeline)}', 
        '${mysql_real_escape_string(accomplishment1)}', 
        '${mysql_real_escape_string(accomplishment2)}', 
        '${mysql_real_escape_string(withinTimeframe)}',
        '${mysql_real_escape_string(gaingap)}', 
        '${mysql_real_escape_string(financialrequirement)}', 
        '${mysql_real_escape_string(amountutilized)}', 
        '${mysql_real_escape_string(balance)}', 
        '${mysql_real_escape_string(utilizationrate)}', 
        '${mysql_real_escape_string(fundingSource)}', 
        '${mysql_real_escape_string(otherFundingSource)}', 
        '${mysql_real_escape_string(budgetstructure)}', 
        '${mysql_real_escape_string(score)}', 
        '${mysql_real_escape_string(scoredescription)}',
        '${mysql_real_escape_string(opsissue)}', 
        '${mysql_real_escape_string(policyissue)}',
        '${mysql_real_escape_string(recommendation)}', 
        '${mysql_real_escape_string(others)}', 
        '${mysql_real_escape_string(correctiveaction)}',
         ${userId})`;
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
                    if (qResult.result === 'Success') {
                        targets.map(t => {
                            var InsertMajorOutput = `CALL InsertPhysicalTarget('${mysql_real_escape_string(results[1][0].HeadId)}','${mysql_real_escape_string(t.PlannedTarget)}','${mysql_real_escape_string(t.TargetType)}','${mysql_real_escape_string(t.TargetDescription)}','${mysql_real_escape_string(t.Accomplishment)}','${mysql_real_escape_string(t.AccomplishmentDescription)}', '${userId}')`
                            connection.query(InsertMajorOutput)
                        })
                    }
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

const deletePhysicalTarget = asyncHander(async (req, res) => {
    const { targetid } = req.params;
    const queryString = `CALL DeletePhysicalTarget(${targetid})`;
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
    const { outputmajorheaderid, objective, output, timeline, accomplishment1, accomplishment2, withinTimeframe,
        gaingap, financialrequirement, amountutilized, balance, utilizationrate, fundingsource, budgetstructure, score, scoredescription, opsissue, policyissue,
        recommendation, others, correctiveaction, userId, targets
    } = req.body;
    const queryString =
        `CALL EditMajorOutput(
        ${mysql_real_escape_string(outputmajorheaderid)}, 
        '${mysql_real_escape_string(objective)}', 
        '${mysql_real_escape_string(output)}', 
        '${mysql_real_escape_string(timeline)}', 
        ${mysql_real_escape_string(accomplishment1)}, 
        ${mysql_real_escape_string(accomplishment2)}, 
        ${mysql_real_escape_string(withinTimeframe)},
        '${mysql_real_escape_string(gaingap)}', 
        ${mysql_real_escape_string(financialrequirement)}, 
        ${mysql_real_escape_string(amountutilized)}, 
        ${mysql_real_escape_string(balance)}, 
        ${mysql_real_escape_string(utilizationrate)}, 
        '${mysql_real_escape_string(fundingsource)}', 
        '${mysql_real_escape_string(budgetstructure)}', 
        '${mysql_real_escape_string(score)}', 
        '${mysql_real_escape_string(scoredescription)}',
        '${mysql_real_escape_string(opsissue)}', 
        '${mysql_real_escape_string(policyissue)}',
        '${mysql_real_escape_string(recommendation)}', 
        '${mysql_real_escape_string(others)}', 
        '${mysql_real_escape_string(correctiveaction)}', 
        ${userId})`;
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
                    targets.map(t => {
                        const EditMajorOutput = `CALL EditPhysicalTarget(${mysql_real_escape_string(t.TargetId)},'${mysql_real_escape_string(t.PlannedTarget)}','${mysql_real_escape_string(t.TargetType)}','${mysql_real_escape_string(t.TargetDescription)}','${mysql_real_escape_string(t.Accomplishment)}','${mysql_real_escape_string(t.AccomplishmentDescription)}', '${userId}')`;
                        const InsertMajorOutput = `CALL InsertPhysicalTarget('${mysql_real_escape_string(outputmajorheaderid)}','${mysql_real_escape_string(t.PlannedTarget)}','${mysql_real_escape_string(t.TargetType)}','${mysql_real_escape_string(t.TargetDescription)}','${mysql_real_escape_string(t.Accomplishment)}','${mysql_real_escape_string(t.AccomplishmentDescription)}', '${userId}')`
                        console.log(t.TargetId ? EditMajorOutput : InsertMajorOutput)
                        connection.query(t.TargetId ? EditMajorOutput : InsertMajorOutput)
                    })
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
    const queryString = `CALL InsertMinorOutput('${mysql_real_escape_string(kraid)}', '${mysql_real_escape_string(objective)}', '${mysql_real_escape_string(projectid)}', '${mysql_real_escape_string(output)}', '${mysql_real_escape_string(target)}', '${mysql_real_escape_string(accomplishment)}', ${mysql_real_escape_string(targetcompletion)},
        '${mysql_real_escape_string(agency)}', '${mysql_real_escape_string(timeline)}', ${mysql_real_escape_string(withinTimeframe)},'${mysql_real_escape_string(opsissue)}','${mysql_real_escape_string(policyissue)}', '${mysql_real_escape_string(recommendation)}', '${mysql_real_escape_string(others)}', '${mysql_real_escape_string(score)}', '${mysql_real_escape_string(scoredescription)}', '${mysql_real_escape_string(correctiveaction)}', ${userId})`;
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

const editMinorOutput = asyncHander(async (req, res) => {
    const { outputminorheaderid, objective, output, target, accomplishment, targetcompletion, agency, timeline, withinTimeframe, opsissue,
        policyissue, recommendation, others, score, scoredescription, correctiveaction, userId
    } = req.body;
    const queryString = `CALL EditMinorOutput('${mysql_real_escape_string(outputminorheaderid)}', '${mysql_real_escape_string(objective)}', '${mysql_real_escape_string(output)}', '${mysql_real_escape_string(target)}', '${mysql_real_escape_string(accomplishment)}', ${mysql_real_escape_string(targetcompletion)},
        '${mysql_real_escape_string(agency)}', '${mysql_real_escape_string(timeline)}', ${mysql_real_escape_string(withinTimeframe)},'${mysql_real_escape_string(opsissue)}','${mysql_real_escape_string(policyissue)}', '${mysql_real_escape_string(recommendation)}', '${mysql_real_escape_string(others)}', '${mysql_real_escape_string(score)}', '${mysql_real_escape_string(scoredescription)}', '${mysql_real_escape_string(correctiveaction)}', ${userId})`;
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
    pool.getConnection((err, connection) => {
        if (err) {
            res.json({ result: 'Failed', message: 'Query Failed' });
            return;
        }
        try {
            indicators.map(i => {
                const queryString = `CALL InsertContributoryOutput(${mysql_real_escape_string(i.id)}, ${mysql_real_escape_string(projectid)},'${mysql_real_escape_string(i.quarter)}', '${mysql_real_escape_string(i.value)}', '${mysql_real_escape_string(outputs)}', ${userId})`;
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
    const { departmentid, kraname, krayear } = req.body;
    const queryString = `CALL searchMajorOutput(${mysql_real_escape_string(krayear)}, ${mysql_real_escape_string(departmentid)},'${mysql_real_escape_string(kraname)}')`;
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
    const { krayear, departmentid, kraname } = req.body;
    const queryString = `CALL searchMinorOutput(${mysql_real_escape_string(krayear)}, ${mysql_real_escape_string(departmentid)},'${mysql_real_escape_string(kraname)}')`;
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
    const { krayear, departmentid, outcometypeid, title } = req.body;
    const queryString = `CALL SearchContributoryOutput(${mysql_real_escape_string(krayear)}, '${mysql_real_escape_string(departmentid)}','${mysql_real_escape_string(outcometypeid)}','${mysql_real_escape_string(title)}')`;
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
    const queryString = `CALL ListIndicatorsByDepartmentId(${mysql_real_escape_string(departmentid)})`;
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
    const queryString = `CALL EditOutputStatus(${mysql_real_escape_string(outputtype)},${mysql_real_escape_string(headerid)},${mysql_real_escape_string(statusid)})`;
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


const getTargetById = asyncHander(async (req, res) => {
    const { outputid } = req.params;
    const queryString = `CALL GetTargetByOutputId(${mysql_real_escape_string(outputid)})`;
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

module.exports = { insertMajorOutput, editMajorOutput, insertMinorOutput, editMinorOutput, insertContributoryOutput, searchMajorOutput, searchMinorOutput, searchContributoryOutput, ListIndicatorsByDepartmentId, editOutputStatus, getTargetById, deletePhysicalTarget };
