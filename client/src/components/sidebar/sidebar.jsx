import React from "react";
import ProfileComponent from "../profile/profile";
import { SidebarContainer, SidebarItem, SidebarWrapper } from "./sidebar.style";

const SidebarComponent = () => {
  return (
    <SidebarWrapper>
      <ProfileComponent />
      <SidebarContainer>
        <SidebarItem>📄 Entries</SidebarItem>
        <SidebarItem>📢 advertisements</SidebarItem>
        <SidebarItem>🕜 History</SidebarItem>
        <SidebarItem>👤 Profile</SidebarItem>
      </SidebarContainer>
    </SidebarWrapper>
  );
};

export default SidebarComponent;
