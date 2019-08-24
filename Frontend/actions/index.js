import axios from "axios";

// fetch everything from the server
export const fetchAll = () => async (dispatch) => {

    try {
        const response = await axios.get('http://127.0.0.1:8080/fileManage/fetchAll');

        dispatch({
            type: 'FETCH_ALL',
            payload: response.data
        })

        console.log("FETCHING COMPLETE");
    } catch(err) {
        console.log("WE HAVE AN ERROR");
    }
}