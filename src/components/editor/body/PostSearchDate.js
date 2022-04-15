import TextField from "@material-ui/core/TextField";
import "date-fns";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";

PostSearchDate.propTypes = {
  onSubmit: PropTypes.func,
};
PostSearchDate.defaultProps = {
  onSubmit: null,
};

function PostSearchDate(props) {
  const { onSubmit } = props;
  const [searchDate, setSearchDate] = useState("");
  const typingTimeoutRef = useRef(null);

  const handleSearchDateChange = (e) => {
    const value = e.target.value;
    setSearchDate(value);

    if (!onSubmit) return;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchDate: value,
      };
      onSubmit(formValues);
    }, 300);
  };
  return (
    <TextField
      id="date"
      label="Filter by date"
      type="date"
      size="small"
      InputLabelProps={{
        shrink: true,
      }}
      name="Date"
      variant="outlined"
      value={searchDate}
      onChange={handleSearchDateChange}
      style={{ backgroundColor: "white", marginTop: "15px" }}
    />
  );
}

export default PostSearchDate;
