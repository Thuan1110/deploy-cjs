import React, { useState } from "react";
import Header from "../../../header/Header";
import ReporterDetail_body from "../body/ReporterDetail_body";
import Sidebar from "../slidebar/Slidebar";
import { useHistory } from "react-router-dom";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@emotion/react";

function ReporterDetail_page() {
    const history = useHistory();
    const [isFormChanged, setFormChangedState] = useState(false);
    const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const onSideBarClick = (link) => {
        if (isFormChanged) {
            setOpenConfirm(true);
        } else history.push(link);
    };
    //confirm dialog
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    const handleGoBack = (e) => {
        history.goBack();
    };

    return (
        <div>
            <Header />
            <Sidebar onSideBarClick={onSideBarClick} />
            {/* <Sidebar /> */}
            <ReporterDetail_body
                isFormChanged={isFormChanged}
                setFormChangedState={setFormChangedState}
            />

            {/* confirm dialog */}
            <Dialog
                // fullScreen={fullScreen}
                open={openConfirm}
                // onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Leave without saving?
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseConfirm}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Any unsaved changes will be lost
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus color="primary" onClick={handleGoBack}>
                        Leave Page
                    </Button>
                    <Button onClick={handleCloseConfirm} color="error">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ReporterDetail_page;
