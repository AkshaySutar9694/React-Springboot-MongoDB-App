import { Employee } from "../types";

export const getAllEmployeesAPi = async () => {
  let data = await fetch("http://localhost:8080/api/employee/getAll")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
  return data;
};

export const getEmployeeByIdAPi = async (id: number) => {
  let data = await fetch("http://localhost:8080/api/employee/" + id)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
  return data;
};

export const updateEmployeeByIdApi = async (employee: Employee) => {
  let data = await fetch(
    "http://localhost:8080/api/employee/update/" + employee._id,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};

export const saveRecordsApi = async (employees: Array<Employee>) => {
  let data = await fetch("http://localhost:8080/api/employee/save", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employees),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};

export const deleteEmployeeByIdApi = async (employee: Employee) => {
  let data = await fetch(
    "http://localhost:8080/api/employee/delete/" + employee._id,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }
  )
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};
