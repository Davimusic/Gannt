"use client"

import { ApuMicro } from "./apuMicro";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import counterReducer from "@/funciones/redux/counterReducer";
const store = createStore(counterReducer);

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ApuMicro></ApuMicro>
    </Provider>
  );
}
