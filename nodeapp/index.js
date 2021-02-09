var oracledb = require('oracledb');

async function run() {
    let connection;
    
    try {
        
        let sql, binds, options, result;
        
        connection = await oracledb.getConnection(  {
            user          : 'admin',
            password      : 'mypasswordhere',
            connectString : 'myconnectstringhere_medium'
        });
        
        
        await connection.execute(
            `BEGIN
            EXECUTE IMMEDIATE 'DROP TABLE mycloudtab';
            EXCEPTION
            WHEN OTHERS THEN
            IF SQLCODE NOT IN (-00942) THEN
            RAISE;
            END IF;
            END;`
        );
            
        await connection.execute(`CREATE TABLE mycloudtab (id NUMBER, data VARCHAR2(20))`);
        
        
        sql = `INSERT INTO mycloudtab VALUES (:1, :2)`;
        binds = [ [101, "Alpha" ], [102, "Beta" ], [103, "Gamma" ] ];
        options = {
            autoCommit: true,
            bindDefs: [
                { type: oracledb.NUMBER },
                { type: oracledb.STRING, maxSize: 20 }
            ]
        };
        
        await connection.executeMany(sql, binds, options);
        
        
        sql = `SELECT * FROM mycloudtab`;
        binds = {};
        options = {};
        
        result = await connection.execute(sql, binds, options);
        console.log(result.rows);
        
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

run();
    