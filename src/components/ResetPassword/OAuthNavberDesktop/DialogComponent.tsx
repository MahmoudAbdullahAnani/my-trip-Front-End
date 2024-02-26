import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sidBar from "../../../data/RecoilState/Sidebar";
import { useRecoilState } from "recoil";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../data/Features/LoggedUser";
import { SignOutState } from "../../../data/RecoilState/AuthStatePages/Auth";
import Modal from "@mui/material/Modal";

interface ComponentInterface {
  stylesBtn?: string;
  isMobile?: boolean;
  iconOut?: JSX.Element;
}
function DialogComponent({ stylesBtn, isMobile, iconOut }: ComponentInterface) {
  const [, setToggle] = useRecoilState(sidBar);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);

  const [signOutState, setSignOutState] = useRecoilState(SignOutState);
  const handleCloseMobile = () => setSignOutState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleNot = () => {
    setOpen(false);
    setSignOutState(false);
  };
  const handleYes = () => {
    setSignOutState(false);
    setOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("verifyCodeEmail");
    setToggle(false);
    dispatch(userLoggedOut());
    navigate("/");
  };

  if (isMobile) {
    return (
      <Modal
        open={signOutState}
        onClose={handleCloseMobile}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={`relative`}
      >
        <div
          className={`flex flex-col absolute top-[30%] bg-white rounded-[16px] w-[90%] mx-auto left-[50%] translate-x-[-50%] p-5 text-end items-end`}
        >
          <h2 className={`text-[#000] text-lg`}>هل تريد حقا تسجيل الخروج؟</h2>
          <h4 className={`text-[#00000acb] text-sm`}>
            {" "}
            .بمجرد تسجيل الخروج، سيتم إعادة توجيهك إلى الصفحة الرئيسية
          </h4>
          <div className={`flex gap-5`}>
            <Button onClick={handleNot}>أنا لا أريد</Button>
            <Button onClick={handleYes} autoFocus>
              نعم
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
  return (
    <React.Fragment>
      <button onClick={handleClickOpen} className={stylesBtn}>
        <span>{iconOut}</span>
        <span>تسجيل خروج</span>
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle dir="rtl" id="alert-dialog-title">
          {"هل تريد حقا تسجيل الخروج؟؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            .بمجرد تسجيل الخروج، سيتم إعادة توجيهك إلى الصفحة الرئيسية
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNot}>أنا لا أريد</Button>
          <Button onClick={handleYes} autoFocus>
            نعم
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DialogComponent;
