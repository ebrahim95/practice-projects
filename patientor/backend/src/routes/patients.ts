import express from 'express';
import patientsService from '../services/patientsService';
import checkNewPatientEntry from '../utils/utils';
import { checkNewEntries } from '../utils/utils';
const router = express.Router();

router.get('/', (_req, res) => {
  return res.send(patientsService.getPatientsData());
});

router.post('/', (req, res) => {
  const newPatient = checkNewPatientEntry(req.body);
  const addEntry = patientsService.addPatient(newPatient);
  res.json(addEntry);
});


router.post('/:id/entries', (req, res) => {
  const newEntry = checkNewEntries(req.body);
  const addEntry = patientsService.addEntries(newEntry, req.params.id);
  res.json(addEntry);
});

router.get('/:id', (req, res) => {
  return res.send(patientsService.getPatientsDataId(req.params.id));
});
export default router;
