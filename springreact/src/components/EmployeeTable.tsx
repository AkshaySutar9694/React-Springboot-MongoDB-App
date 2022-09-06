import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { RootState } from "../store";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { sagaActions } from "../redux-sagas/employeeSagaActions";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Employee } from "../types";
import { message, Popconfirm } from "antd";

type Props = {};

const EmployeeTable: React.FC<Props> = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const employeeData = useSelector((state: RootState) => {
    return state.employees.records;
  });

  const [editedRow, setEditedRow] = useState<number | null>(null);
  const [employeeRecords, setEmployeeRecords] =
    useState<Array<Employee>>(employeeData);
  const toast = useToast();

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_ALL_EMPLOYEES });
  }, [dispatch]);

  useEffect(() => {
    onClose();
    setEditedRow(null);
    setEmployeeRecords(employeeData);
  }, [employeeData]);

  const handleChange = (
    param: string,
    item: Employee,
    value: string | number
  ) => {
    let updatedRecord = employeeRecords.map((mapitem, index) => {
      if (mapitem._id === item._id) {
        return { ...mapitem, [param]: value };
      }
      return mapitem;
    });
    setEmployeeRecords(updatedRecord);
  };

  const deleteRecord = (
    e: React.MouseEvent<HTMLElement> | undefined,
    empObj: Employee
  ) => {
    let ifAnyNew = employeeRecords.some((element) => {
      return element.newlyAdded === true;
    });
    if (ifAnyNew !== true) {
      dispatch({ type: sagaActions.DELETE_RECORD, empObj: empObj });
      message.success({
        content: "Record Deleted Successfully.",
        style: {
          fontSize: "22px",
        },
      });
    } else {
      toast({
        title: "Cannot Delete.",
        position: "top-right",
        containerStyle: {
          fontSize: "24px",
        },
        description:
          "Cannot delete clicked row. Plase complete add a new row operation and then proceed",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  if (Array.isArray(employeeRecords[0])) {
    return (
      <Alert status="warning" style={{ fontSize: "25px" }}>
        <AlertIcon />
        No Data
      </Alert>
    );
  } else {
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className="modalTitle">Update Record</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="modalBody">
              Want to update record in derver ?
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                style={{
                  marginRight: "20px",
                  fontSize: "20px",
                  boxShadow: "0px 0px 17px -6px rgba(0, 0, 0, 0.73)",
                }}
                onClick={() => {
                  let employeeToUpdate = employeeRecords.filter(
                    (item) => item._id === editedRow
                  )[0];
                  dispatch({
                    type: sagaActions.UPDATE_RECORD,
                    empObj: employeeToUpdate,
                  });
                  message.success({
                    content: "Updated Record Successfully.",
                    style: {
                      fontSize: "22px",
                    },
                  });
                }}
              >
                Update
              </Button>
              <Button
                mr={3}
                colorScheme="red"
                style={{
                  fontSize: "20px",
                  boxShadow: "0px 0px 17px -6px rgba(0, 0, 0, 0.73)",
                }}
                onClick={onClose}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <TableContainer className="tableWrapper">
          <Table variant="simple">
            <TableCaption className="tableCaption">
              <div className="captionWrapper">
                <div>
                  You can add, edit or delete the records from above table
                </div>
                <div>
                  <Button
                    colorScheme="whatsapp"
                    onClick={() => {
                      let existringRecords = [...employeeRecords];
                      existringRecords = existringRecords.filter((fItem) => {
                        if (fItem.newlyAdded === true) {
                          return fItem;
                        }
                      });

                      let existEmptyFields = existringRecords.some(
                        (item) =>
                          item.name === "" ||
                          item.email === "" ||
                          item.place === "" ||
                          item.age === ""
                      );
                      if (existEmptyFields) {
                        toast({
                          title: "Cannot Save.",
                          position: "top-right",
                          containerStyle: {
                            fontSize: "24px",
                          },
                          description:
                            "Please provide inputs for all fields data and then save",
                          status: "error",
                          duration: 2000,
                          isClosable: true,
                        });
                      } else {
                        dispatch({
                          type: sagaActions.SAVE_RECORDS,
                          empArray: existringRecords,
                        });
                        message.success({
                          content: "Saved Records Successfully.",
                          style: {
                            fontSize: "22px",
                          },
                        });
                      }
                    }}
                    style={{
                      fontSize: "20px",
                      boxShadow: "0px 0px 17px -6px rgba(0, 0, 0, 0.73)",
                      marginRight: "20px",
                      display: employeeRecords.some(
                        (value) => value.newlyAdded === true
                      )
                        ? "inline-block"
                        : "none",
                    }}
                  >
                    Save Added Records
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      let existringRecords = [...employeeRecords];
                      existringRecords.sort((a, b) => {
                        return a._id - b._id;
                      });
                      let exsistingIds: Array<number> = [];
                      existringRecords.forEach((fItem, index) => {
                        exsistingIds.push(Number(fItem._id));
                      });
                      let maxIdNumber = null;
                      let missingIds: Array<number> = [];
                      if (exsistingIds.length !== 0) {
                        maxIdNumber = Math.max(...exsistingIds);
                        for (let i = 1; i <= maxIdNumber; i++) {
                          if (i !== exsistingIds[i - 1]) {
                            missingIds.push(i);
                          }
                        }
                      }
                      if (missingIds.length === 0) {
                        existringRecords.push({
                          _id: existringRecords.length + 1,
                          name: "",
                          email: "",
                          place: "",
                          age: "",
                          newlyAdded: true,
                        });
                      } else {
                        existringRecords.push({
                          _id: missingIds[0],
                          name: "",
                          email: "",
                          place: "",
                          age: "",
                          newlyAdded: true,
                        });
                      }
                      setEmployeeRecords(existringRecords);
                    }}
                    style={{
                      fontSize: "20px",
                      boxShadow: "0px 0px 17px -6px rgba(0, 0, 0, 0.73)",
                    }}
                  >
                    Add New Record
                  </Button>
                </div>
              </div>
            </TableCaption>
            <Thead>
              <Tr className="tableHeaderRow">
                <Th>Employee Id</Th>
                <Th>Name</Th>
                <Th>Email Id</Th>
                <Th>Place</Th>
                <Th>Age</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employeeRecords.map((item, index) => {
                if (item._id === editedRow || item?.newlyAdded === true) {
                  return (
                    <Tr className="tableBodyRow" key={item._id}>
                      <Td>{item._id}</Td>
                      <Td>
                        <Input
                          className="tableRowInput"
                          width="150px"
                          onChange={(e) => {
                            handleChange("name", item, e.target.value);
                          }}
                          value={item.name}
                        />
                      </Td>
                      <Td>
                        <Input
                          className="tableRowInput"
                          width="auto"
                          value={item.email}
                          onChange={(e) => {
                            handleChange("email", item, e.target.value);
                          }}
                        />
                      </Td>
                      <Td>
                        <Input
                          className="tableRowInput"
                          width="130px"
                          value={item.place}
                          onChange={(e) => {
                            handleChange("place", item, e.target.value);
                          }}
                        />
                      </Td>
                      <Td>
                        <Input
                          className="tableRowInput"
                          width="60px"
                          value={item.age}
                          onChange={(e) => {
                            handleChange("age", item, Number(e.target.value));
                          }}
                        />
                      </Td>
                      <Td>
                        {item.newlyAdded === true ? null : (
                          <CheckIcon
                            color="green"
                            style={{
                              margin: "0px 10px 0px 0px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              let employeeoUpdate = employeeRecords.filter(
                                (item) => item._id === editedRow
                              );
                              let existEmptyFields = employeeoUpdate.some(
                                (item) =>
                                  item.name === "" ||
                                  item.email === "" ||
                                  item.place === "" ||
                                  item.age === ""
                              );
                              if (existEmptyFields) {
                                toast({
                                  title: "Cannot Save.",
                                  position: "top-right",
                                  containerStyle: {
                                    fontSize: "24px",
                                  },
                                  description:
                                    "Please provide inputs for all fields data and then save",
                                  status: "error",
                                  duration: 2000,
                                  isClosable: true,
                                });
                              } else {
                                onOpen();
                              }
                            }}
                          />
                        )}
                        {item.newlyAdded === true ? (
                          <Button
                            mr={3}
                            colorScheme="red"
                            style={{
                              fontSize: "20px",
                              boxShadow:
                                "0px 0px 17px -6px rgba(0, 0, 0, 0.73)",
                            }}
                            onClick={() => {
                              let existringRecords = [...employeeRecords];
                              existringRecords = existringRecords.filter(
                                (fItem) => {
                                  if (
                                    fItem._id !== item._id ||
                                    fItem.newlyAdded !== true
                                  ) {
                                    return fItem;
                                  }
                                }
                              );
                              existringRecords.forEach((item, index) => {
                                if (item.newlyAdded == true) {
                                  item._id = index + 1;
                                }
                              });
                              setEmployeeRecords(existringRecords);
                            }}
                          >
                            Cancel
                          </Button>
                        ) : (
                          <CloseIcon
                            color="tomato"
                            style={{
                              margin: "0px 10px 0px 10px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setEditedRow(null);
                              setEmployeeRecords(employeeData);
                            }}
                          />
                        )}
                      </Td>
                    </Tr>
                  );
                } else {
                  return (
                    <Tr className="tableBodyRow" key={item._id}>
                      <Td>{item._id}</Td>
                      <Td>{item.name}</Td>
                      <Td style={{ color: "#1793ff" }}>{item.email}</Td>
                      <Td>{item.place}</Td>
                      <Td>{item.age}</Td>
                      <Td>
                        <EditIcon
                          color="#3e90e5"
                          style={{
                            margin: "0px 10px 0px 0px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            let ifAnyNew = employeeRecords.some((element) => {
                              return element.newlyAdded === true;
                            });
                            if (ifAnyNew !== true) {
                              setEditedRow(item._id);
                            } else {
                              toast({
                                title: "Cannot Edit.",
                                position: "top-right",
                                containerStyle: {
                                  fontSize: "24px",
                                },
                                description:
                                  "Cannot edit clicked row. Plase complete add a new row operation and then proceed",
                                status: "warning",
                                duration: 2000,
                                isClosable: true,
                              });
                            }
                          }}
                        />
                        <Popconfirm
                          title="Are you sure？"
                          icon={
                            <QuestionCircleOutlined style={{ color: "red" }} />
                          }
                          style={{
                            fontSize: "22px",
                          }}
                          onConfirm={(e) => deleteRecord(e, item)}
                        >
                          <DeleteIcon
                            color="tomato"
                            style={{
                              margin: "0px 10px 0px 10px",
                              cursor: "pointer",
                            }}
                          />
                        </Popconfirm>
                      </Td>
                    </Tr>
                  );
                }
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </>
    );
  }
};

export default EmployeeTable;
