import { useHistory } from "react-router-dom"

const Doctorlist = ({ doctor }) => {

    const history = useHistory()
    return (

        

        <>
        <div
          className="card m-2"
          style={{ cursor: "pointer" }}

          onClick={()=>{history.push(`/doctor/book-appointment/${doctor._id}`)}}
          
          
        >
          <div className="card-header">
            Dr. {doctor.firstname} {doctor.lastname}
          </div>
          <div className="card-body">
            <p>
              <b>Specialization</b> {doctor.specialization}
            </p>
            <p>
              <b>Experience</b> {doctor.experience}
            </p>
            <p>
              <b>Fees Per Cunsaltation</b> {doctor.feesPerConsultation}
            </p>
            <p>
              <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
            </p>
          </div>
        </div>
      </>
    );
}

export default Doctorlist;