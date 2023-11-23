import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import db from "../firebase/config";
import { STUDENTS_COL } from "../constants/firebase";
import AddStudentDialog from "./AddStudent";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const getStudents = useCallback(async () => {
    const studentsCol = collection(db, STUDENTS_COL);
    const studentsSnapshot = await getDocs(studentsCol);
    const studentsList = studentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(studentsList);
    setStudents(studentsList);
  }, []);

  const onDeleteStudenClick = useCallback(
    async (id) => {
      await deleteDoc(doc(db, STUDENTS_COL, id));
      getStudents();
    },
    [getStudents]
  );

  const columns = useMemo(
    () => [
      { key: "name", label: "Name" },
      { key: "surname", label: "Surname" },
      {
        key: "gender",
        label: "Gender",
      },
      {
        key: "dob",
        label: "Date of Birth",
        cellRenderer: (data) =>
          data ? new Date(data * 1000).toLocaleDateString() : "-",
      },
      {
        key: "actions",
        label: "Action",
        cellRenderer: (data, student) => (
          <div>
            <IconButton
              onClick={() => onDeleteStudenClick(student.id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    [onDeleteStudenClick]
  );

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
              {columns.map(({ key, label }) => (
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
                {columns.map(({ key, cellRenderer }) => (
                  <TableCell component="div" key={key}>
                    {cellRenderer
                      ? cellRenderer(student[key], student)
                      : student[key]}
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
