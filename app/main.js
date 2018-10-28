import { AppComponent, Base } from "./components/app";
import { App } from "./App";

class MyApp2 {}

const myApp = new App(document.body, AppComponent);
myApp.start();
