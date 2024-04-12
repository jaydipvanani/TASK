import axios from "axios"


let get_data = async (base_url, endpoint) => {
    let res = await axios.get(base_url + endpoint);
    return res
}

let add_data = async (base_url, endpoint, data) => {
    let res = await axios.post(base_url + endpoint, data);
    return res
}

export { get_data, add_data };
