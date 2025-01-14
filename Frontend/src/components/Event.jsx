import React, { useEffect } from 'react';

import { useState } from 'react';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import attemptService from '../services/attemptService';
import questionService from '../services/questionService';
import competitionService from '../services/competitionService';
import { formatTime } from '../utils/timeUtils';
import { Container, Row, Col } from 'react-bootstrap';

const Event = ({
  event,
  isLoggedIn,
  users,
  setUsers,
  currentUser,
  setCurrentUser,
}) => {
  const navigate = useNavigate();
  const [isJoined, setIsJoined] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startIsoTime, setStartIsoTime] = useState(null);
  const [endIsoTime, setEndIsoTime] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const eventName = event.name;
  const eventDate = event.date;
  const eventDescription = event.description;
  const competitionID = event.competitionId;
  const adminUserName = import.meta.env.VITE_ADMIN_USERNAME;
  const isCompetitionFinished = event.isFinished;

  console.log(currentUser);
  console.log(event);
  console.log(startIsoTime, endIsoTime);

  const checkIfOngoing = () => {
    const currentTime = new Date();
    console.log('Current Time:', currentTime);
    const start = new Date(startIsoTime);
    const end = new Date(endIsoTime);

    console.log('Start Time:', start);
    console.log('End Time:', end);
    if (currentTime > start && currentTime < end) {
      console.log('Competition is ongoing');
      return true;
    } else {
      console.log('Competition is not ongoing');
      return false;
    }
  };

  useEffect(() => {
    competitionService.getOne(event.competitionId).then((competition) => {
      console.log('Competition:', competition.startDate, competition.endDate);
      setStartIsoTime(competition.startDate);
      setEndIsoTime(competition.endDate);
      setStartTime(
        `${competition.startDate.split('T')[0]}  ${formatTime(
          competition.startDate.split('T')[1]
        )}`
      );
      setEndTime(
        `${competition.endDate.split('T')[0]}  ${formatTime(
          competition.endDate.split('T')[1]
        )}`
      );
    });
  }, [event]);

  console.log('Start Time:', startTime);
  console.log('End Time:', endTime);

  const handleResultClick = () => {
    console.log('Generating results for', eventName);
    const answers = new Map();
    attemptService
      .getAll()
      .then((attempts) => {
        const eventAttempts = attempts.filter((attempt) => {
          return attempt.competitionId === competitionID;
        });
        console.log('Event Attempts:', eventAttempts[0].attempts);

        const questionPromises = Object.keys(eventAttempts[0].attempts).map(
          (questionId) => {
            return questionService.getOne(questionId);
          }
        );

        Promise.all(questionPromises).then((questions) => {
          console.log('Questions:', questions);
          questions.forEach((question) => {
            answers.set(question.title, question.correctChoiceIndex);
          });
          console.log('Answers:', answers);
          console.log('Event Attempts:', eventAttempts);
          const scoreMap = new Map();
          eventAttempts.forEach((attempt) => {
            let score = 0;
            Object.keys(attempt.attempts).forEach((questionId) => {
              if (attempt.attempts[questionId] === answers.get(questionId)) {
                score++;
              }
            });

            competitionService.getOne(competitionID).then((competition) => {
              scoreMap.set(
                attempt.studentEmail,
                `${score} / ${competition.questionIds.length}`
              );
              console.log(scoreMap, eventName, competitionID);
              navigate('/results', {
                state: { scoreMap, eventName, competitionID },
              });
            });
          });
        });
      })
      .catch((error) => {
        console.log(error);
        const scoreMap = new Map();
        scoreMap.set('Error', 'No attempts found');
      });
  };

  const handleButtonClick = () => {
    if (isJoined) return;
    const user = users.find((user) => user.email === currentUser.email);
    const updatedUser = {
      ...currentUser,
      eventsJoined: [...currentUser.eventsJoined, eventName],
    };

    console.log(updatedUser);

    userService.update(currentUser.email, updatedUser).then((updatedUser) => {
      setUsers(
        users.map((user) =>
          user.email === currentUser.email ? updatedUser : user
        )
      );
    });
    setCurrentUser(updatedUser);

    setIsJoined(true);
  };

  useEffect(() => {
    if (currentUser) {
      const user = users.find((user) => user.email === currentUser.email);
      if (user && user.eventsJoined.includes(eventName)) {
        setIsJoined(true);
      }
    }
  }, [users, currentUser, eventName]);

  return (
    <>
      <div
        className="card my-3 px-4 py-3"
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          width: currentUser ? 'auto' : '100%',
        }}>
        <Row className="align-items-start g-0">
          <Col xs={8}>
            <h2 className="text-start mb-2">{eventName}</h2>
            <p className="mb-1 text-start">Date: {eventDate}</p>
            <p className="mb-2 text-start">Description: {eventDescription}</p>
          </Col>
          {isLoggedIn && (
            <Col
              xs={4}
              className="d-flex flex-column align-items-end justify-content-start align-buttons"
              style={{ height: '100%' }}>
              <button
                className="btn btn-primary mb-2 mt-1"
                onClick={handleButtonClick}>
                {isJoined ? 'Joined!' : 'Join'}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setShowDetails(!showDetails)}
                disabled={!competitionID}>
                {showDetails ? 'Show Less ▲' : 'Show More ▼'}
              </button>
            </Col>
          )}
        </Row>
        {showDetails && competitionID && (
          <>
            <p className="text-break">Competition: {competitionID}</p>
            <p className="text-break">
              {`Competition Start Time: ${startTime}`}
            </p>

            <p className="text-break">{`Competition End Time: ${endTime}`}</p>

            {competitionID && (
              <button
                className="btn join-button mx-2"
                id={`${eventName}-enter-button`}
                onClick={() =>
                  navigate('/competition', { state: { competitionID } })
                }
                disabled={
                  !checkIfOngoing() ||
                  !currentUser.eventsJoined.includes(event.name) ||
                  (currentUser.competitionsJoined &&
                    currentUser.competitionsJoined.includes(competitionID))
                }>
                {currentUser.competitionsJoined &&
                currentUser.competitionsJoined.includes(competitionID)
                  ? 'Competition Finished'
                  : 'Enter Competition'}
              </button>
            )}
          </>
        )}

        {currentUser && adminUserName === currentUser.email && (
          <button
            onClick={handleResultClick}
            className="btn btn-primary">
            Generate Results
          </button>
        )}
      </div>
    </>
  );

  // return (
  //   <Container>
  //     <div className={isLoggedIn ? 'event-box' : 'alert alert-info event-name'}>
  //       {isLoggedIn ? (
  //         <div className="event-content alert-info alert">
  //           <div className="">
  //             <Row className="align-items-start">
  //               <Col xs={6}>
  //                 <p className="text-break text-start fw-bold fs-3">
  //                   {eventName}
  //                 </p>
  //                 <p className="text-break text-start">
  //                   Description: {eventDescription}
  //                 </p>
  //               </Col>

  //               <Col
  //                 className="d-flex align-items-start justify-content-start"
  //                 xs={4}>
  //                 <button
  //                   className="btn text-btn btn-lg mt-0"
  //                   onClick={() => setShowDetails(!showDetails)}>
  //                   {showDetails ? 'Show Less ▲' : 'Show More ▼'}
  //                 </button>
  //               </Col>
  //             </Row>

  //             <p className="text-break">Date: {eventDate}</p>

  //           </div>
  //         </div>
  //       ) : (
  //         <>
  //           <p className="text-break">Event: {eventName}</p>
  //           <p className="text-break">Date: {eventDate}</p>
  //           <p className="text-break">Description: {eventDescription}</p>
  //           <p className="text-break">Competition: {competitionID}</p>

  //           {currentUser && adminUserName === currentUser.email && (
  //             <button
  //               onClick={handleResultClick}
  //               className="btn btn-primary">
  //               Generate Results
  //             </button>
  //           )}
  //         </>
  //       )}
  //     </div>
  //   </Container>
  // );
};

export default Event;
