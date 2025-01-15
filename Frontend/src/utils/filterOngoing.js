import competitionService from '../services/competitionService';

export const filterOngoing = async (events, setFilteredEvents) => {
  try {
    const competitions = await Promise.all(
      events.map((event) => {
        if (event.competitionId) {
          return competitionService.getOne(event.competitionId);
        }

        return null;
      })
    );

    const filtered = events.filter((event, index) => {
      const competition = competitions[index];
      if (!competition) {
        return false;
      }
      const now = new Date();
      const start = new Date(competition.startDate);
      const end = new Date(competition.endDate);
      return now > start && now < end;
    });

    setFilteredEvents(filtered);
  } catch (error) {
    console.error(error);
  }
};
