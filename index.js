import {AppRegistry} from "react-native";
import "react-native-gesture-handler";
import React, {Component} from "react";
import { enableScreens } from 'react-native-screens';
import ChartsListScreen from "./app/ChartsListScreen";
import {name as appName} from './app.json';

enableScreens();

const Example = () => (
  <ChartsListScreen>
  </ChartsListScreen>
)


export default Example;

AppRegistry.registerComponent(appName, () => Example);

