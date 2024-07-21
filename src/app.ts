import express, { Application } from "express";
import ip from 'ip';
import cors from 'cors';
import { Code } from "./enum/code.enum";
import { HttpResponse } from "./domain/response";
import { Status } from "./enum/status.enum";
import patientRoutes from "./routes/patient.routes";

export class App {
    private readonly app: Application;
    private readonly APPLICATION_RUNNING = 'application is running on';
    private readonly ROUTE_NOT_FOUND = 'Route does not exist on the server';

    // Contructor
    constructor(private readonly port: (string | number) = process.env.SERVER_PORT || 3000){
        this.app = express();
        this.middleware();
        this.routes();
    }

    // Listen method
    listen(): void {
        this.app.listen(this.port);
        console.info(`${this.APPLICATION_RUNNING} ${ip.address()}: ${this.port}`);
    }

    private middleware(): void {
        this.app.use(cors({ origin: '*'}));
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use('/patients', patientRoutes);
        this.app.get('/', (req, res) => res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, 'Welcome to the Patients API v1.0')));
        this.app.all('*', (req, res) => res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, this.ROUTE_NOT_FOUND)));
    }
    
}

