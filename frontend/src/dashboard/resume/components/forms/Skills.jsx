import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'


function Skills() {
    const [skillsList, setSkillsList] = useState([])
    const { resumeId } = useParams();
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);


    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        })
    }, [skillsList])


    const handleChange = (index, skill, value) => {
        const newEntries = skillsList?.slice();
        newEntries[index][skill] = value;
        setSkillsList(newEntries);
    }

    const AddNewSkills = () => {
        setSkillsList([...skillsList, {
            skill: '',
            rating: ''
        }]);

        setLoading(true);

        const data = {
            skills: skillsList?.map(({ id, ...rest }) => rest)
        }

        const skillData = {
            skill: data?.skills[0]?.skill,
            rating: data?.skills[0]?.rating,
            resumeId
        }

        data.skills.length && GlobalApi.updateResumeSkill(resumeId, skillData).then(resp => {
            if (resp) {
                setLoading(false);
                toast('Details updated !')
            }
        }, (error) => {
            setLoading(false);
            console.log(error.message);
            toast('Server Error, Try again!')
        })
    };

    const RemoveSkills = () => {
        setSkillsList(skillsList => skillsList?.slice(0, -1))
    }

    const onSave = () => {
        setLoading(true);

        const data = {
            skills: skillsList?.map(({ id, ...rest }) => rest)
        }

        const skillData = {
            skill: data?.skills[0]?.skill,
            rating: data?.skills[0]?.rating,
            resumeId
        }

        GlobalApi.updateResumeSkill(resumeId, skillData).then(resp => {
            if (resp) {
                toast('Details updated !')
            }
        }, (error) => {
            toast('Server Error, Try again!')
        })
        setLoading(false);
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        })
    }, [skillsList])

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add Your top professional key skills</p>

            <div>
                {skillsList?.map((item, index) => (
                    <div className='flex justify-between mb-2 border rounded-lg p-3 ' key={index}>
                        <div>
                            <label className='text-xs'>Skill</label>
                            <Input className="w-full"
                                defaultValue={item.name}
                                onChange={(e) => handleChange(index, 'skill', e.target.value)} />
                        </div>
                        <Rating style={{ maxWidth: 120 }} value={item.rating}
                            onChange={(v) => handleChange(index, 'rating', v)} />
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</Button>
                    <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>

                </div>
                <Button disabled={loading} onClick={() => onSave()}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    )
}

export default Skills