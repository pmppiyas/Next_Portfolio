
export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='container mx-auto min-h-[calc(100vh_-_70px)]'>
        {children}
      </div>
    </div>
  )
}
