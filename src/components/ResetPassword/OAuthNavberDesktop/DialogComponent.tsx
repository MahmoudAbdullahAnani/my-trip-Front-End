import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import sidBar from "../../../data/RecoilState/Sidebar";
import { useRecoilState } from "recoil";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../data/Features/LoggedUser";
import { SignOutState } from "../../../data/RecoilState/AuthStatePages/Auth";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";

interface ComponentInterface {
  stylesBtn?: string;
  isMobile?: boolean;
  iconOut?: JSX.Element;
}
function DialogComponent({ stylesBtn, isMobile, iconOut }: ComponentInterface) {
  const [, setToggle] = useRecoilState(sidBar);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [open, setOpen] = useState<boolean>(false);

  const [signOutState, setSignOutState] = useRecoilState(SignOutState);
  const handleCloseMobile = () => setSignOutState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleMobilClickOpen = () => {
    setSignOutState(true);
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

  // Lang
  const { t, i18n } = useTranslation();

  if (isMobile) {
    return (
      <div className={`${pathname === "/" && "hidden"}`}>
        <button onClick={handleMobilClickOpen} className={stylesBtn}>
          <span>{iconOut}</span>
          {/* <span>{t("تسجيل خروج")}</span> */}
        </button>
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
            <h2 className={`text-[#000] text-lg`}>
              {t("هل تريد حقا تسجيل الخروج؟")}
            </h2>
            <h4 className={`text-[#00000acb] text-sm`}>
              {t(".بمجرد تسجيل الخروج، سيتم إعادة توجيهك إلى الصفحة الرئيسية")}
            </h4>
            <div className={`flex gap-5`}>
              <Button onClick={handleNot}>{t("أنا لا أريد")}</Button>
              <Button onClick={handleYes} autoFocus>
                {t("نعم")}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
  return (
    <React.Fragment>
      <button onClick={handleClickOpen} className={stylesBtn}>
        <span>{iconOut}</span>
        <span>{t("تسجيل خروج")}</span>
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          id="alert-dialog-title"
        >
          {t("هل تريد حقا تسجيل الخروج؟")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t(".بمجرد تسجيل الخروج، سيتم إعادة توجيهك إلى الصفحة الرئيسية")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNot}>{t("أنا لا أريد")}</Button>
          <Button onClick={handleYes} autoFocus>
            {t("نعم")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DialogComponent;
