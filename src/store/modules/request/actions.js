export default {
    async contactCoach(context, payload) {
        const newRequest = {

            userEmail: payload.email,
            message: payload.message
        };

        const response = await fetch(`https://find-coach-fa3be-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        })

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to load request');
            throw error;
        }

        newRequest.id = responseData.name;
        newRequest.coachId =  payload.coachId;
        context.commit('addRequest', newRequest);
    },
    async fetchRequests(context) {
        const coachID = context.rootGetters.userId;
        const token = context.rootGetters.token;
        const response = await fetch(`https://find-coach-fa3be-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachID}.json?auth=${token}`);

        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch requests');
            throw error;
        }

        const requests = [];

        for (const key in responseData) {
            const request = {
                id: key,
                coachId: coachID,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            };
            requests.push(request);
        }

        context.commit('setRequests', requests);
    }
}