import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sidBar from "../data/RecoilState/Sidebar";
import { useRecoilState } from "recoil";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../data/Features/LoggedUser";
interface ComponentInterface {
  stylesBtn?: string;
}
function DialogComponent({ stylesBtn }: ComponentInterface) {
  const [, setToggle] = useRecoilState(sidBar);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleNot = () => {
    setOpen(false);
  };
  const handleYes = () => {
    setOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("verifyCodeEmail");
    setToggle(false);
    dispatch(userLoggedOut());
    navigate("/");
  };
  return (
    <React.Fragment>
      <button onClick={handleClickOpen} className={stylesBtn}>
        Sign Out
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to log out??"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you log out, you will be redirected to the home page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNot}>I don't want</Button>
          <Button onClick={handleYes} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DialogComponent;
