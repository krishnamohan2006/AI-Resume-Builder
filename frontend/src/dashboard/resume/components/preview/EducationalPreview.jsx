import { formatDate } from '@/lib/utils';
import React from 'react'

function EducationalPreview({ resumeInfo }) {
    return (
        resumeInfo?.education &&
        (<div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}
            >Education</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />

            {resumeInfo?.education &&
                resumeInfo?.education?.map((e, idx) => (
                    <div key={idx} className='my-5'>
                        <h2 className='text-sm font-bold'
                            style={{
                                color: resumeInfo?.themeColor
                            }}
                        >{e?.universityName}</h2>
                        <h2 className='text-xs flex justify-between'>{e?.degree} | {e?.major}
                            <span>{formatDate(e?.startDate)}  to {formatDate(e?.endDate)}</span>
                        </h2>
                        <p className='text-xs my-2'>
                            {e?.description}
                        </p>
                    </div>
                ))
            }





        </div>)
    )
}

export default EducationalPreview