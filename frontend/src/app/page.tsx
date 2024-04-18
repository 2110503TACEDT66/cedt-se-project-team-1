import Banner from '@/components/Banner'
import TextContainer from '@/components/TextContainer'
import TextHeader from '@/components/TextHeader'

export default function Home() {
  return (
    <main className='flex flex-col' >
        <Banner />
        <TextContainer Header='Our Service' contant='พวกเราคือ ธุรกิจอาบ อบ นวด ที่ให้บริการด้านการดูแลสุขภาพ และความงาม โดยมีทีมงานที่มีประสบการณ์และคุณภาพ พร้อมให้บริการท่านอย่างเป็นมืออาชีพ เพราะว่าพวกเราเชื่อว่าการดูแลสุขภาพ และความงาม คือสิ่งสำคัญที่ทุกคนควรใส่ใจ' />
        
        <div className='relative flex justify-between text-sm mt-48 mx-4 mb-0'>
          <h2>KTSRJ 2024 © All rights reserved.</h2>
          <h2 className=''>Developed by KruTakSinRubJob</h2>
        </div> 
    </main>
  )
}