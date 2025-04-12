import React from 'react'

function SkillsPreview({ resumeInfo }) {
    return (resumeInfo?.skill &&
        (<div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}
            >Skill</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />
            {resumeInfo?.skill?.map((skill, index) => (
                <div div key={index} className='grid grid-cols-2 gap-3 my-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-xs'>{skill?.skill}</h2>
                        <div className='h-2 bg-gray-200 w-[120px]'>
                            <div className='h-2'
                                style={{
                                    backgroundColor: skill.themeColor,
                                    width: skill?.rating * 20 + '%'
                                }}
                            >
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div >)
    )
}

export default SkillsPreview