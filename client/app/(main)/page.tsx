'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axiosClient from '@/lib/axiosClient'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, ArrowUpRight, Clipboard, EllipsisVertical } from "lucide-react"
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const fetchPatients = async (page: number) => {
  try {
    const { data } = await axiosClient.get(`/api/patients/get-patients?page=${page}&limit=10`)
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch patients')
  }
}

type Patient = {
  _id: string
  name: string
  age: number
  condition: string
  contactNo: string
}

type SortConfig = {
  key: keyof Patient
  direction: 'ascending' | 'descending'
}

export default function ListPatients() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'ascending' })

  const { data, error, isLoading } = useQuery({
    queryKey: ['patients', page],
    queryFn: () => fetchPatients(page)
  })

  if (isLoading) return <div className="text-center py-4">Loading...</div>
  if (error instanceof Error) return <div className="text-center py-4 text-red-500">Error: {error.message}</div>

  const sortedPatients = [...(data?.patients || [])].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1
    return 0
  })

  const filteredPatients = sortedPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.age.toString().includes(searchTerm)
  )

  const handleSort = (key: keyof Patient) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'ascending' ? 'descending' : 'ascending',
    }))
  }

  return (
    <div className="container mx-auto p-4">
      <div className=' flex justify-between flex-col md:flex-row'>
        <h1 className="text-2xl font-bold mb-4">Patients</h1>
        <Input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 bg-white border-none max-w-sm"
        />
      </div>
      <div className=' bg-white p-4 rounded-md'>
        <Table>
          <TableHeader>
            <TableRow className='min-h-16'>
              <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                Name <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort('age')} className="cursor-pointer hidden md:table-cell">
                Age <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead onClick={() => handleSort('condition')} className="cursor-pointer">
                Condition <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="cursor-pointer hidden md:table-cell">
                contactNo
              </TableHead>
              <TableHead className="cursor-pointer md:hidden">
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient: Patient) => (
              <TableRow key={patient._id} className='h-16 cursor-pointer' >
                <TableCell><Link href={`/patients/${patient._id}/view-details`} className=' text-blue-800' >{patient.name}</Link></TableCell>
                <TableCell className='hidden md:table-cell'>{patient.age}</TableCell>
                <TableCell>{patient.condition}</TableCell>
                <TableCell className=" ">
                  <div className='flex flex-row-reverse md:flex-row justify-between items-center'>
                    <span className='hidden md:table-cell'>{patient.contactNo}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger><EllipsisVertical className="h-4 w-4" /></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className=' md:hidden'>Age: {patient.age}</DropdownMenuItem>
                        <DropdownMenuItem className=' md:hidden'>ContactNo: {patient.contactNo}</DropdownMenuItem>
                        <DropdownMenuSeparator className='md:hidden' />
                        <DropdownMenuItem asChild>
                          <button className=' flex space-x-2 w-full text-left' onClick={
                            () => navigator.clipboard.writeText(patient._id)
                          }>
                           <Clipboard/> Copy Id
                          </button>
                          
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/patients/${patient._id}/view-details`}><ArrowUpRight /> View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/patients/${patient._id}/prior-authorization-form`}><ArrowUpRight /> prior-authorization-form</Link>
                          </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span>Page {page} of {data.totalPages}</span>
          <Button
            onClick={() => setPage((old) => (!data || !data.totalPages || old === data.totalPages ? old : old + 1))}
            disabled={page === data.totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}