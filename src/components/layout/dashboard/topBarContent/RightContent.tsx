import React, {useState, useEffect} from 'react'
import {Button} from '@/components/ui/button'
//import {ModalOne} from '@/components/modals/modalOne'
import { CirclePlus } from 'lucide-react'
import path from 'path'



export default function RightContent({pathname}: {pathname?: string}) {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [mounted, setMounted] = useState<boolean>(false)
    const openModal: () => void = () => setIsOpen(true)

    useEffect(() => {
      setMounted(true)
    }, [])

  if (pathname == "/dashboard") 
  return (
    <div className='flex gap-4'>
        <Button className='bg-amber-600 hover:bg-amber-600/90 cursor-pointer'>Barquisimeto</Button>
        <Button className='bg-blue-600 hover:bg-blue-600/90 cursor-pointer'>Portuguesa</Button>
        <Button className='bg-green-600 hover:bg-green-600/90 cursor-pointer'>Trujillo</Button>
        <Button className='bg-red-600 hover:bg-red-600/90 cursor-pointer'>Caracas</Button>
    </div>
  )
    
  
  if (pathname == "/dashboard/customers") 
  return (
    <div>
        {/* Trigger Button */}
        <div>
          <div className="hidden lg:block">
            <Button
                onClick={openModal}
              >
                <span className="truncate hidden lg:block">Triguer Modal</span>
            </Button>
          </div>
          <CirclePlus onClick={openModal} className={`lg:hidden h-10 w-10 text-primary  transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}/>
        </div>
    </div>
  )
}
