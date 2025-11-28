import React from 'react'
import { HomeTemplate } from '../../components/template'

type ProgramType = {
  id: number;
  name: string;
  description: string;
}

const Beranda = () => {
  const programs: ProgramType[] = [
    // Tambahkan data program di sini
  ]

  return (
    <div className="w-full min-h-screen">
      <HomeTemplate programs={programs} />
    </div>
  )
}

export default Beranda