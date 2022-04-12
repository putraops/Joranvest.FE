import React from 'react';
import { Row, Col } from 'reactstrap';
import { Tag } from 'antd';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [
                { title: 'Tutorial', date: '2022-03-01' },
                { title: 'Private Mentoring', 
                    start: '2022-03-01T14:30:00',
                    // date: '2022-03-01' 
                },
                { title: 'event 3', date: '2022-04-02' },
                { title: 'event 1', allDay: true, start: '2022-03-29T14:30:00', end: '2022-03-30T14:30:00' },
                { 
                    id: 3, 
                    title: 'event 3', 
                    start: '2022-03-17', 
                    end: '2022-03-20' 
                },
            ]
        };
    }

    handleDateClick = (arg) => { // bind with an arrow function
        // alert(arg.dateStr)
        console.log(arg);

        const { events } = this.state;

        var temp = events;
        temp.push({ title: 'newest', allDay: false, start: '2022-03-02', end: '2022-03-05' },)

        this.setState({
            ...this.state,
            events: temp,
        })

        console.log(this.state);
        FullCalendar.refetchEvents();
    }

    handleAddEventClick = (arg) => { // bind with an arrow function
        // alert(arg.dateStr)
        
    }

    render() {
        const {events} = this.state;
        function renderEventContent(eventInfo) {
            return (
                <>
                    <b className='mr-1'> {eventInfo.timeText}</b>
                    <i> {eventInfo.event.title} </i>
                </>
            )
        }

        return (
            <React.Fragment>
                <section className="section bg-light-about bg-light" id="about">
                    <div className="container">
                        <Row>
                            <Col lg="4">
                                <div className="title-heading mb-5">
                                    <h3 className="text-dark mb-1 font-weight-light text-uppercase">About Us</h3>
                                    {/* <div className="title-border-simple position-relative"></div> */}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12">
                            <FullCalendar
                                plugins={[ dayGridPlugin, interactionPlugin ]}
                                initialView="dayGridMonth"
                                events={events}
                                eventContent={renderEventContent}
                                dateClick={(Calendar) => this.handleDateClick()}
                                eventAdd={this.handleAddEventClick}
                                eventClick={(e) => alert(Calendar)}
                                // eventDidMount={}
                                customButtons={{
                                    new: {
                                      text: 'New Event',
                                      click: () => alert('new event'),
                                    },
                                }}
                            />
                            </Col>
                        </Row>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default Calendar;