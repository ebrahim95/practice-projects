import diagnose from '../data/diagnoses';
import { Diagnosis } from '../types';


const getDiagnoseData = (): Diagnosis[] => {
  return diagnose;
};

export default { getDiagnoseData };
