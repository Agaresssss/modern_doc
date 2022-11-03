import {
  Box,
  Button,
  chakra,
  Flex,
  Image,
  Text,
  VStack,
  Icon,
  useToast,
} from '@chakra-ui/react'
import FormInput from '@components/FormInput'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useLoginPageStore } from '@stores/LoginPageStore'
import { AiFillPhone, AiFillLock } from 'react-icons/ai'
import { useMutation } from '@tanstack/react-query'
import axios, { Axios, AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'
import User from '@models/User'
import { useLoginDataStore } from '@stores/LoginDataStore'

const Login = () => {
  let layout = {
    width: '100%',
    margin: 'auto',
  }

  let logoBar = {
    justifyContent: 'space-around',
    marginBottom: '28px',
  }

  let providerLogo = {
    width: '48px',
    height: '48px',
    cursor: 'pointer',
    borderRadius: '100%',
  }

  let submitButton = {
    width: '102px',
    height: '40px',
    backgroundColor: 'accent.blue',
    color: 'white',
    margin: 'auto',
    _hover: {
      backgroundColor: 'hover.blue',
    },
    _active: {
      backgroundColor: 'hover.blue',
    },
  }

  const toast = useToast()
  const { setLoginData } = useLoginDataStore()
  const { setTabIndex } = useLoginPageStore()

  const loginSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'กรุณากรอกเฉพาะตัวเลข')
      .length(10, 'เบอร์โทรศัพท์จำเป็นต้องมี 10 หลัก')
      .required('จำเป็นต้องกรอก'),
    password: Yup.string().required('จำเป็นต้องกรอก'),
  })

  interface loginType {
    phoneNumber: string
    password: string
  }

  const { mutate } = useMutation(
    async ({ phoneNumber, password }: loginType) => {
      let response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/user/login`,
        {
          phoneNumber: phoneNumber,
          password: password,
        }
      )
      return response.data
    },
    {
      onSuccess: (data: any) => {
        console.log(data)
        toast({
          title: 'เข้าสู่ระบบสำเร็จ',
          description: `ยินดีต้อนรับสู่ระบบนะคุณ ${data.firstName}`,
          status: 'success',
          duration: 5000,
        })
        setLoginData({
          userId: data.userId,
          householdId: data.householdId,
          title: data.title,
          firstName: data.firstName,
          lastName: data.lastName,
          citizenId: data.citizenId,
          phoneNumber: data.phoneNumber,
          sex: data.sex,
          token: data.token,
        })
        setTimeout(() => {
          window.location.href = '/home'
        }, 1500)
      },
      onError: (error: AxiosError) => {
        console.log(error.message)
        toast({
          title: 'เข้าสู่ระบบไม่สำเร็จ',
          description: 'กรุณาตรวจสอบเบอร์โทรศัพท์หรือรหัสผ่าน',
          status: 'error',
          duration: 5000,
        })
      },
    }
  )

  const onLogin = async ({ phoneNumber, password }: loginType) => {
    mutate({ phoneNumber, password })
  }

  return (
    <Box sx={layout}>
      <Formik
        initialValues={{
          phoneNumber: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          console.log('ไอห่า')
          onLogin({
            phoneNumber: values.phoneNumber,
            password: values.password,
          })
        }}
      >
        <Form>
          <VStack marginBottom="48px">
            <FormInput
              label="เบอร์โทรศัพท์"
              name="phoneNumber"
              type="tel"
              placeholder="กรอกเบอร์โทรศัพท์"
              rightElement={<Icon as={AiFillPhone} />}
              format="XXX-XXX-XXXX"
            />
            <FormInput
              label="รหัสผ่าน"
              name="password"
              type="password"
              placeholder="กรอกรหัสผ่าน"
              rightElement={<Icon as={AiFillLock} />}
            >
              <Text
                color="accent.gray"
                fontSize="14px"
                marginTop="4px"
                textAlign="right"
              >
                หรือไม่มีบัญชีผู้ใช้ ?{' '}
                <chakra.span color="accent.blue" cursor="pointer">
                  รีเซ็ตรหัสผ่าน
                </chakra.span>
              </Text>
            </FormInput>
          </VStack>

          <VStack margin="auto" gap="8px">
            <Button sx={submitButton} type="submit">
              เข้าสู่ระบบ
            </Button>
            <Text color="accent.gray" fontSize="14px">
              หรือไม่มีบัญชีผู้ใช้ ?{' '}
              <chakra.span
                color="accent.blue"
                cursor="pointer"
                onClick={() => setTabIndex(1)}
              >
                ลงทะเบียน
              </chakra.span>
            </Text>
          </VStack>
        </Form>
      </Formik>
    </Box>
  )
}

export default Login
