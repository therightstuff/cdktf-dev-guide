import { App } from "cdktf";
import { AppStack } from "./lib/AppStack";
import { StateStack } from "./lib/StateStack";

const STACK_STATE_NAME = "cdktf-state";

const app = new App();

new StateStack(app, STACK_STATE_NAME);
new AppStack(app, "sample-app", {
  region: "eu-north-1",
});

app.synth();
