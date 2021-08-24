import React from "react";
import { css } from "@emotion/react";
import { SyncLoader, ClipLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  text-align: center;
`;
export const syncLoader = (
  <SyncLoader css={override} size={20} color={"#3A73B3"} />
);
export const clipLoader = <ClipLoader size={32} color={"#01579B"} />;
