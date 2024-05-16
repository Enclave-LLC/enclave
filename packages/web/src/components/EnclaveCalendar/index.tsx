import { Calendar, CalendarProps } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "../../assets/styles/calendar/main.scss"

interface EnclaveCalendarProps extends CalendarProps {}

const EnclaveCalendar = (props: EnclaveCalendarProps) => {
  return (
    <div>
      <Calendar events={[]} startAccessor="start" endAccessor="end" {...props} />
    </div>
  )
}

export default EnclaveCalendar
