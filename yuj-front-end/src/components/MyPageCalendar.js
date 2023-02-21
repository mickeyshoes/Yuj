import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const MyPageCalendar = (props) => {

    const { lectureEvents } = props;
    const color = {
        0: '#90859A',
        1: '#B7AFBD',
    };

    return (
        <div className="App max-w-full">
            <FullCalendar
                defaultView="dayGridMonth"
                plugins={[dayGridPlugin]}
                events={lectureEvents.map((event, index) => {
                    return {
                        ...event,
                        title: event.title.substr(0, 13),
                        backgroundColor: color[index % Object.keys(color).length],
                        borderColor: color[index % Object.keys(color).length],
                        url: "/studio",
                        state: {
                            lectureId: event.lectureId,
                        },
                    }
                })}
            />
        </div>
    );
}

export default MyPageCalendar;