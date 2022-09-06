import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAndStore } from "../reducer/employeeReducer";
import { Input, Select } from "antd";
import { sagaActions } from "../redux-sagas/employeeSagaActions";
const { Option } = Select;
type Props = {};

const HeaderSearch: React.FC<Props> = (props: Props) => {
  const [serachOption, setSearchOption] = useState<string>("id");
  const dispatch = useDispatch();
  const handleChange = (value: string) => setSearchOption(value);

  const onSearch = (value: string) => {
    if (serachOption === "id") {
      if (value !== "") {
        dispatch({
          type: sagaActions.SEARCH_EMPLOYEES_BY_ID,
          idObj: { id: value },
        });
      } else {
        dispatch({ type: sagaActions.FETCH_ALL_EMPLOYEES });
      }
    } else if (serachOption === "name") {
    } else {
    }
  };

  return (
    <Input.Group>
      <Select
        defaultValue="id"
        className="searchSelect"
        onChange={handleChange}
      >
        <Option value="id">Search By Id</Option>
        <Option value="name">Search By Name</Option>
        <Option value="place">Search By Place</Option>
      </Select>
      <Input.Search className="searchInput" allowClear onSearch={onSearch} />
    </Input.Group>
  );
};

export default HeaderSearch;
