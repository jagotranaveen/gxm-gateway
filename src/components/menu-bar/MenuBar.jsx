import { useState } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import styled from "styled-components";
import hspLogo from "../../assets/hsp-logo.svg";
import notification from "../../assets/notification.svg";
import "./MenuBar.scss";

export default function MenuBar() {
  const EndContainer = styled.div`
    display: flex;
    align-items: center;
  `;

  const InputContainer = styled.div`
    margin-right: 24px;
  `;

  const NotiContainer = styled.div`
    margin-right: 24px;
  `;

  const start = <img alt="logo" src={hspLogo} className="mr-2"></img>;
  const end = (
    <EndContainer className="flex align-items-center gap-2">
      <InputContainer>
        <InputText className="input-field" placeholder="Search" type="text" />
      </InputContainer>
      <NotiContainer>
        <img alt="logo" src={notification} width="21px" height="21px"></img>
      </NotiContainer>
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
      />
    </EndContainer>
  );

  return (
    <div className="card">
      <Menubar className="bg-white" model={undefined} start={start} end={end} />
    </div>
  );
}
