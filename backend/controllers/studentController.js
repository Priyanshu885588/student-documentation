const db = require("../db/db");

const getAllBatches = async (req, res) => {
  try {
    const [rows] = await db
      .promise()
      .query(
        "SELECT table_name FROM information_schema.tables WHERE table_name LIKE 'student_%'"
      );
    const batches = rows.map((row) => row.TABLE_NAME.replace("student_", ""));

    res.status(200).json({ batches });
  } catch (error) {
    console.error("Error executing the query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getStudentData = async (req, res) => {
  try {
    const { batch } = req.query;
    const [rows] = await db
      .promise()
      .query(`SELECT * FROM student_${batch.batch}`);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error executing the query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const studentAuth = async (req,res)=>{

    const {uniqueid,name}=req.body;
    if(!uniqueid || !name){
       return res.status(400).json({
        msg:"Enter unique id and student name"
       })
    }
    console.log(uniqueid,name);

    try{
        const data=await db.promise().query('SELECT * FROM student_2026 WHERE name like ? AND unique_Id like ?',[name,uniqueid])
        console.log(data[0][0]);
        if(data[0].length>0)
        {
          res.cookie({
            UID:uniqueid,
            Name:name
          })
            res.status(400).json({msg:"Student logged in successfully"})
           console.log(req.cookie);
            
        }
        else{
            res.status(400).json({msg:"Invalid credentials"})
        }

    }
    catch(error)
    {
        res.status(200).json({
            msg:"Internal Error occured"
        })

    }
}


module.exports = {
  getStudentData,
  getAllBatches,
  studentAuth
};
