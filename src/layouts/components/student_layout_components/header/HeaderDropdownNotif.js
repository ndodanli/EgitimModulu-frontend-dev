import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { EMBadge, EMIcon } from "../../../../components";

const HeaderDropdownNotif = () => {
  const itemsCount = 3;
  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <EMIcon name="cil-bell" size="xl" />
        <EMBadge shape="pill" color="danger">
          {itemsCount}
        </EMBadge>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong> {itemsCount} adet bildirimin var!</strong>
        </CDropdownItem>
        <CDropdownItem><CIcon name="cil-chevron-right" className="mr-2" />Matematik test sonucun açıklandı</CDropdownItem>
        <CDropdownItem><CIcon name="cil-hand-point-right" className="mr-2" />Yeni Ödev Bildirimi</CDropdownItem>
        <CDropdownItem><CIcon name="cil-hand-point-right" className="mr-2" />Ders programı güncellendi</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default HeaderDropdownNotif;
