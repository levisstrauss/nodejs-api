import { Request, Response } from "express";
import { Patient } from "../interface/patient";
import { connection } from "../config/mysql.config"
import { QUERY } from "../query/patient.query";
import { Code } from "../enum/code.enum";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/status.enum";
import { FieldPacket, OkPacket, OkPacketParams, ResultSetHeader, RowDataPacket } from "mysql2";

type resultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

// Get all the patients
export const getPatients = async (req: Request, rest: Response): Promise<Response<Patient[]>> => {
    console.info(`[${new Date().toLocaleString}] Incomming ${req.method} ${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try{
        const pool = await connection(); 
        const result: resultSet = await pool.query(QUERY.SELECT_PATIENTS);
        return rest.status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, 'Patients Retrieved', result[0]));
    }catch(error: unknown){
        console.error(error);
        return rest.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
}

// Get one Patient
export const getPatient = async (req: Request, rest: Response): Promise<Response<Patient[]>> => {
    console.info(`[${new Date().toLocaleString}] Incomming ${req.method} ${req.originalUrl} Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    try{
        const pool = await connection(); 
        const result: resultSet = await pool.query(QUERY.SELECT_PATIENT, [req.params.patientId]);
        return rest.status(Code.OK)
            .send(new HttpResponse(Code.OK, Status.OK, 'Patients Retrieved', result[0]));
    }catch(error: unknown){
        console.error(error);
        return rest.status(Code.INTERNAL_SERVER_ERROR)
            .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred'));
    }
}