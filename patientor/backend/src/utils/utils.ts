import { Diagnosis, Gender, newPatientNoID, Entry, HealthCheckRating, SickLeave, Discharge, EntryWithoutId } from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(p => p.toString()).includes(param);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('incorrent gender' + gender);
  }

  return gender;
};


const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('name is incorrect or missing');
  }

  return name;
};
const parseDateOfBirth = (DOB: unknown): string => {
  if (!DOB || !isString(DOB)) {
    throw new Error('DOB is incorrect or missing');
  }

  return DOB;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect Date:' + date);
  }

  return date;
};


const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('ssn is incorrect or missing');
  }

  return ssn;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('occupation is incorrect or missing');
  }

  return occupation;
};


const isType = (entries: object): entries is Entry[] => {
  if (Array.isArray(entries) && entries.length !== 0) {

    const type_array = entries.map(obj => {
      if (obj && typeof obj === 'object' && 'type' in obj && obj.type && typeof obj.type === 'string') {
        return obj.type as string;
      }
      throw new Error('type is incorrect or missing');
    });


    for (const value of type_array) {
      if (!value && isString(value) && !['Hospital', 'HealthCheck', 'OccupationalHealthcare'].includes(value)) {
        return false;
      }
    }
  }
  return true;
};

const parseEntry = (entries: unknown): Entry[] => {

  if (!entries || !Array.isArray(entries) || !isType(entries)) {
    throw new Error('entries is incorrect or missing');
  }

  return entries;
};

const checkNewPatientEntry = (object: unknown): newPatientNoID => {
  if (!object || typeof object !== 'object') {
    throw new Error('incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
    const newEntry: newPatientNoID = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntry(object.entries)
    };

    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};


const parseString = (value: unknown, identifier: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`${identifier} is incorrect or missing`);
  }

  return value;
};


const isHealthCheck = (check: number): check is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(check);
};

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' || value instanceof Number;
};
const parseHealthCheck = (value: unknown): HealthCheckRating => {
  let conv_value;
  if (typeof value === 'string') {
    conv_value = +value;

  }

  if (conv_value === undefined || conv_value === null || !isNumber(conv_value) || !isHealthCheck(conv_value)) {
    throw new Error(`${typeof value}  Health Check Rating is incorrect or missing`);
  }

  return conv_value;
};


const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (object && typeof object === 'object' &&
    'sickLeave' in object &&
    object.sickLeave &&
    typeof object.sickLeave === 'object' &&
    "startDate" in object.sickLeave &&
    "endDate" in object.sickLeave
  ) {
    return {
      startDate: parseDate(object.sickLeave.startDate),
      endDate: parseDate(object.sickLeave.endDate)
    };

  }

  return {
    startDate: "",
    endDate: "",
  };

};

const parseDischarge = (object: unknown): Discharge => {
  if (object && typeof object === 'object' &&
    'discharge' in object &&
    object.discharge &&
    typeof object.discharge === 'object' &&
    "date" in object.discharge &&
    "criteria" in object.discharge
  ) {
    return {
      date: parseDate(object.discharge.date),
      criteria: parseString(object.discharge.criteria, "criteria")
    };
  }

  return {
    date: "",
    criteria: ""
  };

};

export const checkNewEntries = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('incorrent or missing data');
  }

  if ('type' in object && 'description' in object && 'date' in object && 'specialist' in object) {

    if (object.type === "HealthCheck" && "healthCheckRating" in object) {
      console.log(object);
      let newEntry: EntryWithoutId = {
        description: parseString(object.description, "description"),
        date: parseDate(object.date),
        specialist: parseString(object.specialist, "specialist"),
        type: object.type,
        healthCheckRating: parseHealthCheck(object.healthCheckRating)
      };

      if ('diagnosisCodes' in object) {
        newEntry = { ...newEntry, diagnosisCodes: parseDiagnosisCodes(object) };
      }
      return newEntry;


    } else if (object.type === "OccupationalHealthcare" && "employerName" in object) {
      let newEntry: EntryWithoutId = {
        description: parseString(object.description, "description"),
        date: parseDate(object.date),
        specialist: parseString(object.specialist, "specialist"),
        type: object.type,
        employerName: parseString(object.employerName, "employerName")
      };

      if ("sickLeave" in object && object.sickLeave) {
        newEntry = {
          ...newEntry, sickLeave: parseSickLeave(object)
        };
      }
      return newEntry;
    } else if (object.type === "Hospital" && 'discharge' in object) {

      let newEntry: EntryWithoutId = {
        description: parseString(object.description, "description"),
        date: parseDate(object.date),
        specialist: parseString(object.specialist, "specialist"),
        type: object.type,

        discharge: parseDischarge(object)
      };


      if ('diagnosisCodes' in object && !object.diagnosisCodes) {
        newEntry = { ...newEntry, diagnosisCodes: parseDiagnosisCodes(object) };
      }
      return newEntry;
    }
  }

  throw new Error("fix your entries");
};


export default checkNewPatientEntry;
