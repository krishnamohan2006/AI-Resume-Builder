import React from 'react'

function ExperiencePreview({ resumeInfo }) {
    return (resumeInfo?.experience &&
        (<div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}
            >Professional Experience</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />

            {
                resumeInfo?.experience?.map((e, idx) =>
                    <div className='my-5' key={idx}>
                        <h2 className='text-sm font-bold'
                            style={{
                                color: resumeInfo?.themeColor
                            }}>{e?.title}</h2>
                        <h2 className='text-xs flex justify-between'>{e?.companyName},
                            {e?.city},
                            {e?.state}
                            <span>{e?.startDate} To {e ?. endDate} </span>
                        </h2>
                        <div className='text-xs my-2' dangerouslySetInnerHTML={{ __html: e.workSummery }} />
                    </div>
                )
            }


        </div>)
    )
}

export default ExperiencePreview