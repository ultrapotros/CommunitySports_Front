import axios from "axios";
    
const getAllEvents = async (id) => {

  try {
    console.log("en helper")
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/event/allevents`);
    console.log(response.data)
    return response.data
  }
  catch(err) {
    console.log(err)
  }
}

export default getAllEvents;