import { App } from "./app";

// Creating the start function to call the app function
const start = (): void => {
    const app = new App();
    app.listen();
}

// Call the function
start();