import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

class MyPageCalendar extends Component {
    render() {
        return (
            <div className="App">
                <FullCalendar
                    defaultView="dayGridMonth"
                    plugins={[dayGridPlugin]}
                    events={[
                        { title: '요가의 기초', date: '2023-02-01' },
                        { title: '요가의 정석', date: '2023-02-01' },
                        { title: '아침 요가', date: '2023-02-02' }
                    ]}
                />
            </div>
        );
    }
}

export default MyPageCalendar;