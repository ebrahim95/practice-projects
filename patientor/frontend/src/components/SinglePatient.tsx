import { useParams } from "react-router-dom"
import { Diagnosis, Patient, Entry, OccupationalHealthcareEntry, HospitalEntry, HealthCheckEntry, EntryWithoutId, SickLeave, Discharge } from "../types"
import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react"
import PatientService from "../services/patients"
import DiagnosisService from "../services/diagnosis"
import { Button, Box, CardContent, Card, FormControl, MenuItem, Select, SelectChangeEvent, TextField, RadioGroup, FormControlLabel, Radio, Typography, Alert, AlertTitle } from '@mui/material'
import axios from "axios"
import SendIcon from '@mui/icons-material/Send';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union memeber: ${JSON.stringify(value)}`
  )
}

interface Occupation {
  entries: OccupationalHealthcareEntry
}

interface Health {
  entries: HealthCheckEntry
}

interface HospitalCheck {
  entries: HospitalEntry
}

const Hospital = (props: HospitalCheck) => {

  const { entries } = props
  return (
    <Card sx={{ mb: 4, maxWidth: 500 }}>
      <CardContent>
        <Typography variant="h6">{entries.date}</Typography>
        <br />
        <Typography variant="body1"> {entries.description}</Typography>
        <Typography variant="body1">
          <p>
            Discharge  <br />
            {`Date: ${entries.discharge?.date}`}<br />
            {`Criteria: ${entries.discharge?.criteria}`}
          </p>
        </Typography>
        <Typography variant="body2">Diagnosed by {entries.specialist}</ Typography>
      </CardContent>
    </Card>
  )
}


const Occupational = (props: Occupation) => {
  const { entries } = props

  return (
    <Card sx={{ mb: 4, maxWidth: 500 }}>
      <CardContent>
        <Typography variant="h6">{entries.date}</Typography>
        <br />
        <Typography variant="body1"> {entries.description}</Typography>
        <br />
        <Typography variant="body1"> Employed By: {entries.employerName}</Typography>
        <Typography variant="body1">
          <p>
            Sick Leave <br />
            {`Start Date: ${entries.sickLeave?.startDate}`}<br />
            {`End Date: ${entries.sickLeave?.endDate}`}
          </p>
        </Typography>
        <br />
        <Typography variant="body2">Diagnosed by {entries.specialist}</ Typography>
      </CardContent>
    </Card >
  )
}

const HealthCheck = (props: Health) => {
  const { entries } = props
  return (
    <Card sx={{ mb: 4, maxWidth: 500 }}>
      <CardContent>
        <Typography variant="h6">{entries.date}</Typography>
        <br />
        <Typography variant="body1"> {entries.description}</Typography>
        <br />
        <Typography variant="body2">Diagnosed by {entries.specialist}</ Typography>
      </CardContent>
    </Card>

  )
}



const EntryDetails = ({ entries }: { entries: Entry }) => {
  switch (entries.type) {
    case "Hospital":
      return <Hospital entries={entries} />

    case "OccupationalHealthcare":
      return <Occupational entries={entries} />

    case "HealthCheck":
      return <HealthCheck entries={entries} />
    default:
      return assertNever(entries)

  }
}


const SinglePatient = () => {

  const [singlePatient, setSinglePatient] = useState<Patient>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();
  const [visible, setVisible] = useState<Boolean>(false);
  const [addEntry, setEntry] = useState<EntryWithoutId>({
    date: "",
    description: "",
    specialist: "",
    type: "Hospital",


  } as EntryWithoutId);

  const [formType, setType] = useState<string>("")
  const [formDiagnosis, setFormDiagnosis] = useState<string[]>([])
  const [discharge, setDischarge] = useState<Discharge>({
    date: "",
    criteria: ""
  })
  const [sickLeave, setSickleave] = useState<SickLeave>({
    startDate: "",
    endDate: ""
  })
  const [notification, setNotification] = useState<String>("")

  const { id } = useParams()
  useEffect(() => {
    const fetchPatient = async () => {
      if (id !== undefined) {
        const patient = await PatientService.getSingle(id);
        setSinglePatient(patient);
        const get_diagnosis = await DiagnosisService.getDiagnosis()
        setDiagnosis(get_diagnosis);
      }

    }

    void fetchPatient();
  }, [id])
  const hideOrShow = () => {
    setVisible(!visible);
  }

  const onSubmit = (id: string) => {
    const addTheEntry = async () => {
      try {
        const entry = await PatientService.create_entry(id, addEntry);
        console.log(entry)
        if (singlePatient && 'id' in singlePatient && singlePatient.entries) {
          setSinglePatient({ ...singlePatient, entries: [...singlePatient.entries, entry] })
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.data && typeof error.response?.data === 'string') {
            console.log(error.response?.data);
            setNotification(error.response?.data)

            setTimeout(() => setNotification(""), 5000)

          } else {
            console.error(error)
          }
        }
      }
    }

    void addTheEntry();
  }

  const submitEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (id !== undefined) {
      onSubmit(id);
    }
  }
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target?.value

    setEntry({
      ...addEntry,
      [event.target.name]: value
    });
  }
  const handleDischarge = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target?.value

    setDischarge({
      ...discharge,
      [event.target.name]: value
    })

    if (addEntry.type === 'Hospital') {
      setEntry({
        ...addEntry,
        discharge: discharge
      })

    }
  }

  const handleSickLeave = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target?.value

    setSickleave({
      ...sickLeave,
      [event.target.name]: value
    })

    if (addEntry.type === "OccupationalHealthcare") {
      setEntry({
        ...addEntry,
        sickLeave: sickLeave
      })
    }
  }



  const handleRadio = (event: ChangeEvent<HTMLInputElement>) => {

    const value = event.target?.value
    setType(value)
    setEntry({
      ...addEntry,
      [event.target.name]: value
    })
  }

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target
    if (Array.isArray(value)) {
      setFormDiagnosis(value)
    }

    setEntry({
      ...addEntry,
      diagnosisCodes: formDiagnosis
    })
  }

  // TODO: might add a reset 
  let render_textfields;
  if (formType === 'Hospital') {
    render_textfields =
      <>
        <TextField onChange={handleDischarge} placeholder="Date" name="date" type="date" />
        <TextField onChange={handleDischarge} placeholder="Criteria" name="criteria" type="text" />
      </>
  } else if (formType === 'OccupationalHealthcare') {
    render_textfields =
      <>

        <TextField onChange={handleInput} placeholder="Employer Name" name="employerName" type="text" />
        <TextField onChange={handleSickLeave} placeholder="Start Date" name="startDate" type="date" />
        <TextField onChange={handleSickLeave} placeholder="End Date" name="endDate" type="date" />
      </>

  } else {
    render_textfields =
      <>
        <TextField onChange={handleInput} placeholder="Health Check Rating" name="healthCheckRating" type="number" />
      </>
  }


  return (
    <div>

      {notification !== "" ?
        <Alert sx={{ my: 6 }} severity="error">
          <AlertTitle>Error</AlertTitle>
          {notification}
        </Alert> : null}

      <Typography sx={{ mt: 2 }} variant="h4"> {singlePatient?.name} </Typography>

      <Typography variant="subtitle1">
        <p> ssh: {singlePatient?.ssn} <br />
          occupation: {singlePatient?.occupation}
        </p>
      </Typography>

      <Typography variant="h5"> New Entries </Typography>
      {visible ?
        <FormControl sx={{ m: 2 }} >
          <TextField onChange={handleInput} placeholder="Description" name="description" type='text' />

          <TextField onChange={handleInput} name="date" type="date" />
          <TextField onChange={handleInput} placeholder="Specialist" name="specialist" type="text" />

          <Select multiple
            value={formDiagnosis}
            onChange={handleSelectChange}
          >
            {diagnosis ? diagnosis.map(obj => (
              <MenuItem
                key={obj.name}
                value={obj.code}
              > {obj.code} </MenuItem>
            )) : ""}
          </Select>


          <RadioGroup onChange={handleRadio} name="type" row>
            <FormControlLabel key='HealthCheck'
              value='HealthCheck'
              control={<Radio size="small" />}
              label="Health Check" />
            <FormControlLabel key='OccupationalHealthcare'
              value='OccupationalHealthcare'
              control={<Radio size="small" />}
              label="OccupationalHealthcare" />
            <FormControlLabel key='Hospital'
              value='Hospital'
              control={<Radio size="small" />}
              label="Hospital" />
          </RadioGroup>
          {render_textfields}
          <Box textAlign='center'>
            <Button sx={{ my: 4, minHeight: 50 }} onClick={submitEntry} variant="contained" endIcon={<SendIcon />} type="submit"> Submit </Button>
          </Box>
        </FormControl> : null}
      <br />
      <Button variant="outlined" onClick={hideOrShow} >{visible ? "Hide" : "Add a new Entry"} </Button>

      <Typography variant="h5" sx={{ my: 2 }}>  Entries </Typography>

      <div>
        {singlePatient?.entries !== undefined ? singlePatient?.entries.map(obj => {
          return <EntryDetails key={obj.id} entries={obj} />
        })
          : null}

      </div>

    </div>
  )
}

export default SinglePatient


