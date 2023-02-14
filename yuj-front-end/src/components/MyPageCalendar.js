import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const MyPageCalendar = (props) => {

    const { lectureEvents } = props;

    return (
        <div className="App">
            <FullCalendar
                defaultView="dayGridMonth"
                plugins={[dayGridPlugin]}
                events={lectureEvents}
            />
        </div>
    );
}

export default MyPageCalendar;