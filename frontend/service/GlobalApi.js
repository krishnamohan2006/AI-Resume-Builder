import axios from "axios";


const axiosClient=axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL+"/api/",
    headers:{
        'Content-Type':'application/json',
        // 'Authorization':`Bearer ${API_KEY}`
    }
})

const CreateNewUser=(data)=>axiosClient.post('/user/signUp',data);

const CreateNewResume=(data)=>axiosClient.post('/user-resumes',data);

const GetUserResumes=(userEmail)=>axiosClient.get('/user-resumes?filters[userEmail][$eq]='+userEmail);

const UpdateResumeDetail=(id,data)=>axiosClient.put('/user-resumes/'+id,data)

const updateResumeExperience=(id,data)=>axiosClient.put(`/user-resumes/${id}/experience`,data)

const updateResumeEducation=(id,data)=>axiosClient.put(`/user-resumes/${id}/education`,data)

const updateResumeSkill=(id,data)=>axiosClient.put(`/user-resumes/${id}/skill`,data)

const GetResumeById=(id)=>axiosClient.get('/user-resumes/'+id)

const DeleteResumeById=(id)=>axiosClient.delete('/user-resumes/'+id)
export default{
    CreateNewUser,
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById,
    updateResumeExperience,
    updateResumeEducation,
    updateResumeSkill
}