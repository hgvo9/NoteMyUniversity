import axios from "axios";

class UniversityService {
    get() {
        return axios.get('http://127.0.0.1:8000/University/')
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export default new UniversityService();