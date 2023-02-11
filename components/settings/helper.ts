import React from "react";
import { IUser } from "../provider/helper";

export type SettingComponents = {
  name?: string;
  component?: React.ReactNode;
  icon?: React.ReactNode;
  key: number;
  onPress?: Function;
};

export type SelectorType = {
  user: IUser;
};
