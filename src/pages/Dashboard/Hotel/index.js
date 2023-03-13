import { Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import RoomChoiceContainer from '../../../components/HotelsComponents/RoomChoiceContainer';
import NoHotelDetected from '../../../components/NoHotel';
import { useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import { getTicket } from '../../../services/ticketApi';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import { getBooking } from '../../../services/bookingApi';
import NoEnrollmentDetected from '../../../components/NoEnrollment';
import CardHotelsContainer from '../../../components/HotelsCardContainer';

export default function Hotel() {
  const [onlineTicket, setOnlineTicket] = useState(false);
  const [enrollment, setEnrollment] = useState(false);
  const [pickedHotel, setPickedHotel] = useState(false);
  const [hotelId, setHotelId] = useState([]);
  const token = useToken();

  useEffect(() => {
    getTicket(token)
      .then((res) => {
        if (res.TicketType.includesHotel === false) {
          setOnlineTicket(true);
        }
      })
      .catch((err) => {});

    getPersonalInformations(token)
      .then((res) => {
        setEnrollment(true);
      })
      .catch((err) => {
        console.log(err);
      });

    getBooking(token)
      .then((res) => {
        //setBooleanoDaPagina(true)
      })
      .catch((err) => {
        console.log(err);
      });
  });

  if (onlineTicket) {
    return <NoHotelDetected />;
  }

  if (!enrollment) {
    return <NoEnrollmentDetected />;
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {pickedHotel ? <RoomChoiceContainer hotelId={hotelId} /> : <CardHotelsContainer setHotelId={setHotelId} setPickedHotel={setPickedHotel}/>}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
