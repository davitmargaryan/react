import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc } from "firebase/firestore/lite";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import db from "../firebase/config";
import { STUDENTS_TABLE_COLUMNS } from "../constants/studetns";
import { STUDENTS_COL } from "../constants/firebase";
import AddStudentDialog from "./AddStudent";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const getStudents = async () => {
    const studentsCol = collection(db, STUDENTS_COL);
    const studentsSnapshot = await getDocs(studentsCol);
    const studentsList = studentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(studentsList);
    setStudents(studentsList);
  };

  useEffect(() => {
    getStudents();
  }, []);

  const onAddBtnClick = () => setShowAddDialog(true);

  const handleCloseAddDialog = () => setShowAddDialog(false);

  const addStudent = async (name, surname, gender) => {
    const studentsRef = collection(db, STUDENTS_COL);

    await setDoc(doc(studentsRef), {
      name,
      surname,
      gender,
    });

    setShowAddDialog(false);
    getStudents();
  };

  return (
    <>
      <Button
        onClick={onAddBtnClick}
        size="large"
        variant="contained"
        sx={{ margin: 1 }}
      >
        Add
      </Button>
      <TableContainer component={Paper}>
        <Table
          component="div"
          sx={{ minWidth: 650, margin: 1 }}
          aria-label="simple table"
        >
          <TableHead component="div">
            <TableRow component="div">
              {STUDENTS_TABLE_COLUMNS.map(({ key, label }) => (
                <TableCell component="div" key={key}>
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody component="div">
            {students.map((student) => (
              <TableRow
                component="div"
                key={student.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {STUDENTS_TABLE_COLUMNS.map(({ key, cellRenderer }) => (
                  <TableCell component="div" key={key}>
                    {cellRenderer ? cellRenderer(student[key]) : student[key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddStudentDialog
        onSave={addStudent}
        open={showAddDialog}
        onClose={handleCloseAddDialog}
      />
    </>
  );
};

export default StudentsTable;
