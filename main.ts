import { App } from "cdktf";
import { AppStack } from "./lib/AppStack";
import { StateStack } from "./lib/StateStack";

const STACK_STATE_NAME = "cdktf-state";
const APP_NAME = "my-app";


const app = new App();

new StateStack(app, STACK_STATE_NAME);
new AppStack(app, APP_NAME);

app.synth();
