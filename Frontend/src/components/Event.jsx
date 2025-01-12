import React, { useEffect } from 'react';

import { useState } from 'react';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import attemptService from '../services/attemptService';
import questionService from '../services/questionService';
import competitionService from '../services/competitionService';
import { formatTime } from '../utils/timeUtils';

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
          questions.forEach((question) => {
            answers.set(question.title, question.correctChoiceIndex); // Create a map of questions to answers
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
            scoreMap.set(
              attempt.studentEmail,
              `${score} / ${questions.length}`
            );
          });
          console.log(scoreMap, eventName, competitionID);
          navigate('/results', {
            state: { scoreMap, eventName, competitionID },
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
    <div className={isLoggedIn ? 'event-box' : 'alert alert-info event-name'}>
      {isLoggedIn ? (
        <div className="event-content alert-info alert">
          <div className="event-name">
            <p className="text-break">Event: {eventName}</p>
            <p className="text-break">Date: {eventDate}</p>
            <p className="text-break">Description: {eventDescription}</p>
            <p className="text-break">Competition: {competitionID}</p>
            <p className="text-break">
              {`Competition Start Time: ${startTime}`}
            </p>

            <p className="text-break">{`Competition End Time: ${endTime}`}</p>

            <button
              className="btn join-button mx-2"
              id={`${eventName}-join-button`}
              onClick={handleButtonClick}>
              {isJoined ? 'Joined!' : 'Join'}
            </button>

            {competitionID && (
              <button
                className="btn join-button mx-2"
                id={`${eventName}-enter-button`}
                onClick={() =>
                  navigate('/competition', { state: { competitionID } })
                }
                disabled={
                  !checkIfOngoing() ||
                  !currentUser.eventsJoined.includes(event.name)
                }>
                {currentUser.competitionsJoined &&
                currentUser.competitionsJoined.includes(competitionID)
                  ? 'Competition Finished'
                  : 'Enter Competition'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <p className="text-break">Event: {eventName}</p>
          <p className="text-break">Date: {eventDate}</p>
          <p className="text-break">Description: {eventDescription}</p>
          <p className="text-break">Competition: {competitionID}</p>

          {currentUser && adminUserName === currentUser.email && (
            <button
              onClick={handleResultClick}
              className="btn btn-primary">
              Generate Results
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Event;
