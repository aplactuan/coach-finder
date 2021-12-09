export default {
    async addCoach(context, payload) {
        const userId = context.rootGetters.userId;
        const coachData = {
            id: context.rootGetters.userId,
            firstName: payload.first,
            lastName: payload.last,
            description: payload.desc,
            hourlyRate: payload.rate,
            areas: payload.areas
        }

        const response = await fetch(`https://find-coach-fa3be-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        })

        //const responseData = await response.json();

        if (!response.ok) {
            //error
        }

        context.commit('addCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context) {
        const response = await fetch(`https://find-coach-fa3be-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`);
        const responseData = await response.json();
        if (!response.ok) {
            //....
        }

        const coaches = [];
        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            };
            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);
    }
}