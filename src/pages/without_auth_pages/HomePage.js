import {
  CNavbar,
  CToggler,
  CNavbarBrand,
  CNavbarNav,
  CInput,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CNavLink,
  CNav,
  CNavItem,
  CContainer,
} from "@coreui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CCollapse } from "@coreui/react";
import { EMButton, EMForm, EMIcon } from "../../components";
import { Button, Nav, Navbar, NavLink } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import EMToggler from "../../components/toggler_components/EMToggler";
import EMDropdown from "../../components/dropdown_components/EMDropdown";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <CNavbar expandable="md" fixed="top" color="light" className="homenav">
      <EMToggler inNavbar onClick={() => setIsOpen(!isOpen)} />
      <CNavbarBrand to="/" className="ml-2">
        <h4 className="text-dark">eğitimmodülü</h4>
      </CNavbarBrand>
      <CNavbarNav className="ml-auto">
        <CNavItem>
          <EMButton size="sm" className="signbtn shadow-none mr-2 mb-2">
            <CNavLink to="/school-signup" className="font-weight-bold px-2">
              Kayıt Ol
            </CNavLink>
          </EMButton>
        </CNavItem>
        <CDropdown inNav>
          <EMButton
            size="sm"
            className="loginbtn  shadow-none font-weight-bold"
          >
         <CDropdownToggle className="text-dark pl-1 ">Giriş Yap</CDropdownToggle>
          </EMButton>
          <CDropdownMenu className="mt-2 ml-2">
            <CDropdownItem to="/school-login"> Kurum Girişi</CDropdownItem>
            <CDropdownItem to="/teacher-login">Öğretmen Girişi</CDropdownItem>
            <CDropdownItem to="/student-login">Öğrenci Girişi</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CNavbarNav>
    </CNavbar>
  );
}

export default HomePage;

// return (
//   <div>
//     HomePage without authentication.
//     <br />
//     <Link to="/school-login">Go to School Login</Link>
//     <br />
//     <Link to="/teacher-login">Go to Teacher Login</Link>
//     <br />
//     <Link to="/school-signup">Go to Signup</Link>
//   </div>
// );
