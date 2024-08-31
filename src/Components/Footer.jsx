import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='px-4 h-12 md:h-24 lg:px-20 xl:px-40 text-red-900 flex justify-between items-center bg-gray-500 rounded-b-lg uppercase'>
      <Link href="/" className='text-xl md:font-bold'>fiasta</Link>
      <p>@ all right reserved.</p>
    </div>
  )
}

export default Footer;

