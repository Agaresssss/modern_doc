import { DefaultIcon } from '@chakra-ui/react'
import Relationship from '@models/Relationship'

const getRelationshipText = (relationship: Relationship):string => {
  switch (relationship) {
    case 'householder':
      return 'เจ้าของบัญชี'
    case 'father':
      return 'บิดา'
    case 'mother':
      return 'มารดา'
    case 'children':
      return 'ลูก'
    case 'cousin':
      return 'พี่น้อง'
    case 'spouse':
      return 'คู่สมรส'
    case 'other':
      return 'อื่นๆ'
  }
}

export default getRelationshipText