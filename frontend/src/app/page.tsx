import Banner from '@/components/Banner'
import TextContainer from '@/components/TextContainer'
import TextHeader from '@/components/TextHeader'

export default function Home() {
  return (
    <main >
        <Banner />
        <TextContainer Header='Our Service' contant='พวกเราคือ ธุรกิจอาบ อบ นวด ที่ให้บริการด้านการดูแลสุขภาพ และความงาม โดยมีทีมงานที่มีประสบการณ์และคุณภาพ พร้อมให้บริการท่านอย่างเป็นมืออาชีพ เพราะว่าพวกเราเชื่อว่าการดูแลสุขภาพ และความงาม คือสิ่งสำคัญที่ทุกคนควรใส่ใจ' />

        <div className='flex flex-col justify-center items-end mt-20 mr-6 mb-4'>
            <h2 className='font-semibold text-lg flex flex-col justify-center items-center border-b-2 border-[#426B1F] w-[150px] pb-4 text-[#426B1F] mb-5'>Made by</h2>
            <div className='text-sm flex-col flex justify-center items-center w-[150px] text-center text-[#426B1F]'>Get a good rest api</div>
        </div> 
    </main>
  )
}