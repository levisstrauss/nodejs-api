import { Router } from 'express';
import { createPatient, deletePatient, getPatients, updatePatient, getPatient } from '../controller/patient.controller';

const patientRoutes = Router();

// Calling the functions created in the controller
// Getting all patients route
// Creating a new patient
// This is basically /patient but because we already set this in app that is why we are only using /
patientRoutes.route('/')
        .get(getPatients)
        .post(createPatient);

// Get, update, delete one patient with an ID
patientRoutes.route('/:patientId')
        .get(getPatient)
        .put(updatePatient)
        .delete(deletePatient);
         
export default patientRoutes;