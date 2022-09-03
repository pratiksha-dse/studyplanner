import React, { useState, useRef, useEffect } from "react";
import SessionService from "../../Services/SessionService";

export default ({
    SEID = "",
    user={},
}) => {
    const [newSession, setnewSession]=useState(null);
    console.log(SEID)
    console.log(user)
    const [message, setMessage] = useState(null);
    useEffect(() => {
        SessionService.getSessionByID(SEID).then((data) => {
            var session1 =data.session
            session1.currStudents.push(user.email);
            setnewSession(session1);
           console.log("sess",session1);
           console.log("new sess",newSession)
        });
    }, []);
        console.log("new session",newSession)
        SessionService.editSession(newSession,SEID).then((data) => {
            message  = data;
            setMessage(message);
            if (!message.msgError) {
               console.log(message.msgError)
            }
        });
        console.log("updated session")
    

    return (<></>);

};

