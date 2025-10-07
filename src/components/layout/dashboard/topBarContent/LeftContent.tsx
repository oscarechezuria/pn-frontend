import React, {useState} from 'react'
import {Button} from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'



export default function LeftContent({pathname}: {pathname?: string}) {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const openModal: () => void = () => setIsOpen(true)


  if (pathname == "/dashboard") 
  return (
    <div className='gap-4 hidden lg:flex'>
        <Button className='bg-yellow-600/40 text-yellow-600 hover:bg-yellow-600/50 cursor-pointer'>Barquisimeto</Button>
        <Button className='bg-blue-300 text-blue-600 hover:bg-blue-600/40 cursor-pointer'>Portuguesa</Button>
        <Button className='bg-purple-300 text-purple-600 hover:bg-purple-600/40 cursor-pointer'>Trujillo</Button>
        <Button className='bg-green-300 text-green-600 hover:bg-green-600/40 cursor-pointer'>Caracas</Button>
    </div>
  )
    
  
  if (pathname == "/dashboard/customers") 
  return (
      <div>
          <div className="hidden lg:block">
            <Button
                onClick={openModal}
              >
                <span className="truncate hidden lg:block">Triguer Modal</span>
            </Button>
          </div>
          <CirclePlus onClick={openModal} className={`lg:hidden h-10 w-10 text-primary transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}/>
      </div>
  )

  return null

}
