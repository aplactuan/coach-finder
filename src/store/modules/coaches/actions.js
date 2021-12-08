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
    }
}