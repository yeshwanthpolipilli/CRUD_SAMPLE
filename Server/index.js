const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.listen(4500,()=>{
    console.log("running port  with 4500")
})

app.use(cors());

app.get("/hello",async (req,res)=>{
    try {
        const allTodo = await pool.query("SELECT * FROM todo")
        res.json(allTodo.rows)
    } catch (error) {
        console.log(error.message)
    }
})

// getting based on id

app.get("/hello/:id",async (req,res)=>{

try {
    const {id} = req.params;
    const todo = await  pool.query("SELECT * FROM todo WHERE todo_id= $1",[id])
    res.json(todo.rows[0])

} catch (error) {
    console.log(error.message)
}
})

//  delete based on id

app.delete("/delete/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const todo1 = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id])
        res.json(todo1.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})

app.put("/todo/:id",async(req,res)=>
{
    try {
        const {id}=req.params;
   const {description,name,age} =req.body;

   const updateTodo = await pool.query(
    "UPDATE todo SET description = $1, name = $2, age = $3 WHERE todo_id = $4",
    [description, name, age, id]
);
   res.json(updateTodo.rows)
        
    } catch (error) {
        
        console.log(error.message)
        
    }
})

// app.post("/todos",async(req,res)=>{
//     try {
//         const { description } = req.body;
//         const newTodo = await pool.query(
//             "INSERT INTO todo (description) VALUES($1) RETURNING *",
//             [description]
//         );
//         res.json(newTodo.rows[0])
//     } catch (error) {
//         console.log(error.message)
//     }
// })

app.post("/todos",async(req,res)=>{
    try {
        const { description } = req.body;
        const { name } = req.body;
        const { age } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description,name,age)  VALUES($1,$2,$3) RETURNING *",
            [description,name,age]
        );
        res.json(newTodo.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})



// app.delete("/delete",(req,res)=>{
//     res.send("delete api is calling")
//     console.log("delete api")
// })