import {
  Center,
  Checkbox,
  Flex,
  HStack,
  Text,
  VStack
} from '@chakra-ui/react'
import DocumentBox from '@components/DocumentBox'
import SearchBox from '@components/SearchBox'
import { useSearchDocumentStore } from '@stores/SearchDocument'
import {useState } from 'react'
import { useParams } from 'react-router-dom'

const SearchPage = () => {

  const { search, setSearch, searchResult } = useSearchDocumentStore()
  const [showFile, setShowFile] = useState(true)
  const [showFolder, setShowFolder] = useState(true)
  const keyword = useParams()
  let layout = {
    padding: '24px 0',
    gap: '32px',
    flexDirection: 'column',
    width: '1280px',
  }

  let childrenFlex = {
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: '32px',
  }

  console.log(keyword)
  return (
    <VStack marginTop="4px">
      <VStack align="start">
        <Center>
          <SearchBox />
          {/* งง ไม่เข้าใจบันทัดบน */}
        </Center> 
      </VStack>
      <Center>
        <VStack align="start">
          <Flex sx={layout}>
            <Checkbox defaultChecked onChange={(e) => setShowFolder(e.target.checked)}>
              <Text
                fontSize="18px"
                fontWeight="bold"
                margin={['auto', null, null, 0]}
              >
                ผลการค้นหาแฟ้ม
              </Text>
            </Checkbox>
            {
              showFolder ?
              <Flex sx={childrenFlex}>
                <DocumentBox
                  title="จ้างงานคนพิการ"
                  type="generatedFolder"
                  showDate
                  colorBar="#FF9898"
                />
                <DocumentBox
                  title="จ้างงานคนพิการ"
                  type="generatedFolder"
                  showDate
                  createdDate={new Date('12/08/2021')}
                />
                <DocumentBox
                  title="ขึ้นทะเบียนคนพิการ"
                  type="generatedFolder"
                  showDate
                  createdDate={new Date('12/08/2021')}
                />
              </Flex>
              : <Text>กดเพื่อแสดงผลการค้นหา</Text>
            }
          </Flex>

          <Flex sx={layout}>
            <Checkbox defaultChecked onChange={(e) => setShowFile(e.target.checked)}>
              <Text
                fontSize="18px"
                fontWeight="bold"
                margin={['auto', null, null, 0]}
              >
                ผลการค้นหาเอกสาร
              </Text>
            </Checkbox>
            {
              showFile ?
              <Flex sx={childrenFlex}>
                <DocumentBox
                  title="หนังสือมอบอำนาจ"
                  type="generatedFile"
                  showDate
                  colorBar="#FF9898"
                />
                <DocumentBox
                  title="เอกสารผู้ดูแลคนพิการ"
                  type="generatedFile"
                  showDate
                  createdDate={new Date('12/08/2021')}
                />
                <DocumentBox
                  title="บัตรคนพิการ"
                  type="uploadedFile"
                  showDate
                  createdDate={new Date('12/08/2021')}
                  colorBar="#FF9898"
                />
                <DocumentBox
                  title="จ้างงานคนพิการ"
                  type="generatedFile"
                  showDate
                  createdDate={new Date('12/08/2021')}
                  colorBar="#FF9898"
                />
                <DocumentBox
                  title="ขึ้นทะเบียนคนพิการ"
                  type="generatedFile"
                  showDate
                  createdDate={new Date('12/08/2021')}
                  colorBar="#FF9898"
                />
              </Flex>
              : <Text>กดเพื่อแสดงผลการค้นหา</Text>
            }
          </Flex>
        </VStack>
      </Center>
    </VStack>
  )
}

export default SearchPage
