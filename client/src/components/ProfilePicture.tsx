import {
  Avatar,
  Box,
  Image,
  Text,
  Center,
  VStack,
  Icon,
  Input,
  FormControl,
} from '@chakra-ui/react'
import { useState } from 'react'
import { AiOutlineUpload } from 'react-icons/ai'
import { useMyProfileStore } from '@stores/MyProfilePageStore'

type propTypes = {
  url: string | undefined
}

const ProfilePicture = ({ url }: propTypes) => {
  const { isEdit, setEdit } = useMyProfileStore()

  return (
    <VStack gap="34px">
      <Box sx={uploadImagelayout}>
        <VStack>
          <Image
            src={url || 'https://via.placeholder.com/365x365'}
            boxSize="365px"
            borderRadius="8px"
            position="absolute"
          ></Image>

          <Box
            width="365px"
            height="365px"
            borderRadius="8px"
            sx={isEdit ? backgroundHover : { opacity: 0 }}
          >
            //------------api for upload image----- 
            //-----------but i dont know how to provide api interface
            <Input
              type="file"
              position="absolute"
              height="100%"
              opacity="0"
              aria-hidden="true"
              display={isEdit ? 'block' : 'none'}
              accept="image/*"
            />

            <Icon
              as={AiOutlineUpload}
              top="157.5px"
              left="157.5px"
              position="absolute"
              boxSize="60px"
              color="white"
              aria-hidden="true"
            />
          </Box>
          <Text size="14px">อัปโหลดรูปขนาดไม่เกิน 5 MB</Text>
        </VStack>
      </Box>
    </VStack>
  )
}

export default ProfilePicture

let submitButton = {
  height: '40px',
  backgroundColor: 'accent.blue',
  color: 'white',
  variant: 'outline',
  _hover: {
    backgroundColor: 'hover.blue',
  },
  _active: {
    backgroundColor: 'hover.white',
  },
}

let uploadImagelayout = {
  width: '365px',
  height: '365px',
  position: 'relative',
}

let backgroundHover = {
  opacity: 0,
  _hover: {
    cursor: 'pointer',
    opacity: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-10px)',
    transition: 'all 0.2s ease-in-out',
    _active: {
      cursor: 'pointer',
      backgroundColor: 'hover.white',
    },
  },
}

let boxLayout = {
  backgroundColor: 'background.white',
  margin: 'auto',
  borderRadius: '8px',
  position: 'relative',
  padding: '20px',
  width: '909px',
}

/** <Box sx={uploadImagelayout}>
            <Image
              src="https://bit.ly/sage-adebayo"
              boxSize="206px"
              borderRadius="8px"
              position="absolute"
            ></Image>

            <Box
              width="206px"
              height="206px"
              sx={
                isAdd
                  ? backgroundHover
                  : isEdit
                  ? backgroundHover
                  : { opacity: 0 }
              }
            >
              <Input
                type="file"
                position="absolute"
                height="100%"
                opacity="0"
                aria-hidden="true"
                display={isAdd ? 'block' : isEdit ? 'block' : 'none'}
                accept="image/*"
              />
              <Icon
                as={AiOutlineUpload}
                top="71.5px"
                left="71.5px"
                position="absolute"
                boxSize="60px"
                color="white"
                aria-hidden="true"
              />
            </Box>
          </Box> */
