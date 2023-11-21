export const STUDENTS_TABLE_COLUMNS = [
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
];
