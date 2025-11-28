import React from 'react'
import { MissionSection } from '@/components/organisms/MissionSection'
import { Heading } from '@/components/atoms'

const MisiTujuan = () => {
  return (
    <div className="px-64 w-full">
      <div>
        <Heading level={1} className="text-red-600 text-4xl py-4 text-center font-bold mb-2">Misi</Heading>
        <MissionSection />
      </div>
      <div className="mt-8">
        <Heading level={1} className="text-red-600 text-4xl py-4 text-center font-bold mb-2">Tujuan</Heading>
        <MissionSection />
      </div>  
    </div>
  )
}

export default MisiTujuan