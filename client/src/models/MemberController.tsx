import axios from 'axios'
import { useLoginDataStore } from '@stores/LoginDataStore'
import { setFillingCmykColor } from 'pdf-lib'

interface AddMemberData {
  householdId: string
  title: string
  firstName: string
  lastName: string
  citizenId: string
  relationship: string
}
interface EditMemberData {
  id: string
  title: string
  firstName: string
  lastName: string
  profileURI: string
}

class MemberController {
  static addMember = async (memberData: AddMemberData) => {
    const token = useLoginDataStore.getState().user?.token
    const userId = useLoginDataStore.getState().user?.id
    const setFamilyMembers = useLoginDataStore.getState().setFamilyMembers
    const householdId = useLoginDataStore.getState().user?.householdId
    let response = await axios.post(
      `${process.env.VITE_API_ENDPOINT}/member`,
      { ...memberData, householdId: householdId },
      {
        headers: {
          token: token,
          'user-id': userId,
        },
      }
    )
    if (response.status === 200) {
      let updatedMember = await axios.get(
        `${process.env.VITE_API_ENDPOINT}/member`,
        {
          headers: {
            token: token,
            'user-id': userId,
            'household-id': householdId,
          },
        }
      )
      setFamilyMembers(updatedMember.data)
      window.location.reload()
    }

    return response.data
  }

  static deleteMember = async (memberId: string) => {
    const token = useLoginDataStore.getState().user?.token
    const userId = useLoginDataStore.getState().user?.id
    const setFamilyMembers = useLoginDataStore.getState().setFamilyMembers
    const householdId = useLoginDataStore.getState().user?.householdId

    let response = await axios.delete(
      `${process.env.VITE_API_ENDPOINT}/member/${memberId}`,
      {
        headers: {
          token: token,
          'user-id': userId,
        },
      }
    )
    if (response.status === 200) {
      let updatedMember = await axios.get(
        `${process.env.VITE_API_ENDPOINT}/member`,
        {
          headers: {
            token: token,
            'user-id': userId,
            'household-id': householdId,
          },
        }
      )
      setFamilyMembers(updatedMember.data)
      window.location.reload()
    }
    return response.data
  }

  static editMember = async (memberId: string, memberData: EditMemberData) => {
    const token = useLoginDataStore.getState().user?.token
    const userId = useLoginDataStore.getState().user?.id
    const setFamilyMembers = useLoginDataStore.getState().setFamilyMembers
    const householdId = useLoginDataStore.getState().user?.householdId

    let response = await axios.put(
      `${process.env.VITE_API_ENDPOINT}/member/${memberId}`,
      memberData,
      {
        headers: {
          token: token,
          'user-id': userId,
        },
      }
    )
    if (response.status === 200) {
      let updatedMember = await axios.get(
        `${process.env.VITE_API_ENDPOINT}/member`,
        {
          headers: {
            token: token,
            'user-id': userId,
            'household-id': householdId,
          },
        }
      )
      console.log(updatedMember.data)
      setFamilyMembers(updatedMember.data)
      window.location.reload()
    }
    return response.data
  }

  static getAvailableUploadedFile = async (fileId: string) => {
    const token = useLoginDataStore.getState().user?.token
    const userId = useLoginDataStore.getState().user?.id
    const householdId = useLoginDataStore.getState().user?.householdId

    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/member/available-uploadedFile/${fileId}`,
      {
        headers: {
          token: token,
          'user-id': userId,
        },
      }
    )
    return response.data
  }
}

export default MemberController
