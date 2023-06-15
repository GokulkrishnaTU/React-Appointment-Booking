import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  background-image: url("/assets/hosp.webp");
  background-size: cover;
        background-position: 'center';
        background-repeat :no-repeat;
        height: 500px;
        width: 100%;
        opacity: 0.8;

`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const TimeSlotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const TimeSlot = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? '#ccc' : 'transparent')};
`;

const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  width: 300px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;



const CreateAppointment = styled.button`
height: 50px;
width: 300px;
color: white;
background-color: blue;
border-radius: 20px;

`;
const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 5px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 5px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const AppointmentsContainer = styled.div`
  margin-bottom: 20px;
`;

const Appointment = styled.li`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  gap: 15px;
  align-items: center;
  font-size: 22px;
`;

const Scheduler = () => {
  const [appointments, setAppointments] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [doctor, setDoctor] = useState('');
  const [patient, setPatient] = useState('');

  const timeSlots = [
    { id: 1, time: '10:00 AM' },
    { id: 2, time: '11:00 AM' },
    { id: 3, time: '12:00 PM' },
    { id: 4, time: '01:00 PM' },
    { id: 5, time: '02:00 PM' },
    { id: 6, time: '03:00 PM' },
    { id: 7, time: '04:00 PM' }
  ];

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setPopupVisible(true);
  };

  const handlePopupSubmit = (e) => {
    e.preventDefault();

    // Create a new appointment object
    const newAppointment = {
      startTime,
      endTime,
      doctor,
      patient
    };

    // Update the appointments list
    setAppointments([...appointments, newAppointment]);

    // Reset form values
    setStartTime('');
    setEndTime('');
    setDoctor('');
    setPatient('');

    // Hide the popup
    setPopupVisible(false);
  };

  return (
    <Container>
{/* <img src="/assets/hosp.webp" alt="img"  className='img'/> */}
      <Title>Available Slots</Title>

      <TimeSlotsContainer>



        {timeSlots.map((timeSlot) => (
          <TimeSlot
            key={timeSlot.id}
            selected={selectedTimeSlot === timeSlot}
            onClick={() => handleTimeSlotClick(timeSlot)}
          >
            {timeSlot.time}
          </TimeSlot>
        ))}

      </TimeSlotsContainer>
      <CreateAppointment  onClick={() => handleTimeSlotClick()}>Create Appointment</CreateAppointment>

      {popupVisible && (
        <ModalContainer>
          <ModalContent>
            <Form onSubmit={handlePopupSubmit}>
              <Label>Start Time:</Label>
              <Input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />

              <Label>End Time:</Label>
              <Input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />

              <Label>Doctor:</Label>
              <Select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
                <option value="">Select Doctor</option>
                <option value="Dr. sanjay">Dr. Sanjay</option>
                <option value="Dr. arun">Dr. Arun</option>
                <option value="Dr. Gokul">Dr. Gokul</option>
                <option value="Dr. pradeep">Dr. Pradeep</option>

              </Select>

              <Label>Patient Name:</Label>
              <Input
                type="text"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
              />

              <Button type="submit">Create Appointment</Button>
            </Form>
          </ModalContent>
        </ModalContainer>
      )}

      <AppointmentsContainer>
        <h2>Appointments:</h2>
        {appointments.length === 0 ? (
          <p>You can create appointment by clicking the Create Appointment Button</p>
        ) : (
          <ul>
            {appointments.map((appointment, index) => (
              <Appointment key={index}>

                <h4>Slot Booked From</h4>{appointment.startTime} - <h4>to</h4> {appointment.endTime} <h4>For Doctor</h4>: {appointment.doctor} <h4>By</h4> - {appointment.patient}
              </Appointment>
            ))}
          </ul>
        )}
      </AppointmentsContainer>
    </Container>
  );
};

export default Scheduler;
