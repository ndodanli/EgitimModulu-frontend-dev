import { CJumbotron } from "@coreui/react";
import React from "react";
import {EMContainer} from "../../../../components";
function HomeJumbotron() {
  return (
    <div>
      <CJumbotron>
        <EMContainer>
          <h1 className="display-6">Hello!</h1>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
            <br /> eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </EMContainer>
      </CJumbotron>
    </div>
  );
}

export default React.memo(HomeJumbotron);
