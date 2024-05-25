const Pool  = require("pg").Pool

const pool = new Pool({
    user:"postgres",
    password:"Mani@90140",
    host:"localhost",
    port:"5432",
    database:"perntodo",
});

module.exports=pool;