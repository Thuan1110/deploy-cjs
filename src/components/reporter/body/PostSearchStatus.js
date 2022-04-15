import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

PostSearchStatus.propTypes = {
  onSubmit: PropTypes.func,
};
PostSearchStatus.defaultProps = {
  onSubmit: null,
};

function PostSearchStatus(props) {
  const { onSubmit } = props;
  const [searchStatus, setSearchStatus] = useState("");
  const typingTimeoutRef = useRef(null);

  const handleSearchStatusChange = (e) => {
    const value = e.target.value;
    setSearchStatus(value);

    if (!onSubmit) return;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchStatus: value,
      };
      onSubmit(formValues);
    }, 300);
  };
  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel style={{ marginTop: "8px" }}>Search Status</InputLabel>
      <Select
        value={searchStatus}
        label="Search Status"
        onChange={handleSearchStatusChange}
        style={{
          backgroundColor: "white",
          marginTop: "15px",
          marginRight: "15px",
          height: "40px",
        }}
      >
        <MenuItem value={0}>All status</MenuItem>
        <MenuItem value={1}>Draft</MenuItem>
        <MenuItem value={2}>Created</MenuItem>
        <MenuItem value={3}>Approved</MenuItem>
        <MenuItem value={4}>Denied</MenuItem>
      </Select>
    </FormControl>

    // <TextField
    //   size="small"
    //   label="Search status"
    //   sx={{ width: 200 }}
    //   select
    //   value={searchStatus}
    //   onChange={handleSearchStatusChange}
    //   style={{
    //     backgroundColor: "white",
    //     marginTop: "15px",
    //     marginRight: "15px",
    //   }}
    // >
    //   <MenuItem value={0}>
    //     <em>None</em>
    //   </MenuItem>
    //   <MenuItem value={2}>Created</MenuItem>
    //   <MenuItem value={3}>Approved</MenuItem>
    //   <MenuItem value={4}>Denied</MenuItem>
    // </TextField>
  );
}

export default PostSearchStatus;
