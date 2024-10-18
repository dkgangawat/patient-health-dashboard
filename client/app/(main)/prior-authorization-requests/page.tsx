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

const fetchRequests = async (page: number) => {
  try {
    const { data } = await axiosClient.get(`/api/prior-authorization-form/get-requests?page=${page}&limit=10`)
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch patients')
  }
}

type Requests = {
  _id: string
  patientName: string
    status: string
    patientId: string
    updatedAt: string
    doctorName: string
}

type SortConfig = {
  key: keyof Requests
  direction: 'ascending' | 'descending'
}

export default function ListRequests() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'patientName', direction: 'ascending' })

  const { data, error, isLoading } = useQuery({
    queryKey: ['requests', page],
    queryFn: () => fetchRequests(page)
  })

  if (isLoading) return <div className="text-center py-4">Loading...</div>
  if (error instanceof Error) return <div className="text-center py-4 text-red-500">Error: {error.message}</div>

  const sortedRequests = [...(data?.requests || [])].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1
    return 0
  })

  const filteredRequests = sortedRequests.filter(req =>
    req.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSort = (key: keyof Requests) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'ascending' ? 'descending' : 'ascending',
    }))
  }

  return (
    <div className="container mx-auto p-4">
      <div className=' flex justify-between flex-col md:flex-row'>
        <h1 className="text-2xl font-bold mb-4">Prior Authorization Requests</h1>
        <Input
          type="text"
          placeholder="Search requests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 bg-white border-none max-w-sm"
        />
      </div>
      <div className=' bg-white p-4 rounded-md'>
        <Table>
          <TableHeader>
            <TableRow className='min-h-16'>
              <TableHead onClick={() => handleSort('patientName')} className="cursor-pointer">
                Patient Name <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead className="cursor-pointer hidden md:table-cell">
                Doctor Name 
              </TableHead>
              <TableHead className="cursor-pointer">
                Status 
              </TableHead>
              <TableHead className="cursor-pointer hidden md:table-cell">
                Updated At
              </TableHead>
              <TableHead className="cursor-pointer md:hidden">
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests?.map((request: Requests) => (
              <TableRow key={request._id} className='h-16 cursor-pointer' >
                <TableCell><Link href={`/prior-authorization-requests/${request._id}`} className=' text-blue-800' >{request?.patientName}</Link></TableCell>
                <TableCell className='hidden md:table-cell'>{request?.doctorName}</TableCell>
                <TableCell>{request?.status}</TableCell>
                <TableCell className=" ">
                  <div className='flex flex-row-reverse md:flex-row justify-between items-center'>
                    <span className='hidden md:table-cell'>{request?.updatedAt}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger><EllipsisVertical className="h-4 w-4" /></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className=' md:hidden'>Doctor Name: {request?.doctorName}</DropdownMenuItem>
                        <DropdownMenuItem className=' md:hidden'>ContactNo: {request?.updatedAt}</DropdownMenuItem>
                        <DropdownMenuSeparator className='md:hidden' />
                        <DropdownMenuItem asChild>
                          <button className=' flex space-x-2 w-full text-left' onClick={
                            () => navigator.clipboard.writeText(request._id)
                          }>
                           <Clipboard/> Copy Id
                          </button>
                          
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/prior-authorization-requests/${request._id}`}><ArrowUpRight /> View Details</Link>
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