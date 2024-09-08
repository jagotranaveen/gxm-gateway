import React,{useState} from 'react';
import styled from 'styled-components';
import MenuBar from "./components/menu-bar/MenuBar"
import SideNav from "./components/side-nav/SideNav"
import BreadCrumb from "./components/bread-crumb/BreadCrumb"

// Define styled components for layout structure
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: var(--lara-light-global-shade-100);
`;

const Button = styled.button`
  background-color: #188A42;
  border: none;
  outline:none;
  border-radius: 50%;
  width:24px;
  height:24px;
  display:none;
  justify-content:center;
  align-items: center;
  position: absolute;
  right: 0;
  margin-right: -12px;
  top: 38px;
`;


const Layout = ({ children }) => {
  
  const [isPanelCollapsed, setIsCollapsed] = useState(false);

  const SidePanel = styled.div`
    width: ${isPanelCollapsed ? '94px' : '316px'};
    padding: 20px;
    border-right: 1px solid #DFE7EF;
    flex-shrink: 0; 
    position:relative;
  
    &:hover ${Button} {
      display: flex;
    }
  `;

  return (
    <div>
    <MenuBar />
    <Container>
      <SidePanel>
        <Button onClick={() => setIsCollapsed(!isPanelCollapsed)}><i className="pi pi-angle-left" style={{ color: 'white' }}/></Button>
        <SideNav isPanelCollapsed={isPanelCollapsed} />
      </SidePanel>
      <Content>
        <BreadCrumb />
        {children}
      </Content>
    </Container>
    </div>
  );
};

export default Layout;
