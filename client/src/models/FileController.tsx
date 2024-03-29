import axios from 'axios'
import { useLoginDataStore } from '@stores/LoginDataStore'
import Field from '@models/Field'
interface RegisterForm {
  title: string
  firstName: string
  lastName: string
  sex: string
  birthDate: string
  citizenId: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

interface loginForm {
  phoneNumber: string
  password: string
}
class FileController {
  static getTypeName = (type: string) => {
    switch (type) {
      case '1':
        return 'generatedFile'
      case '2':
        return 'uploadedFile'
      case '3':
        return 'sharedFile'
      default:
        return 'userFreeUploadFile'
    }
  }

  static async getFileById(
    id: string,
    type: string,
    isSharedFile: boolean = false
  ) {
    if (isSharedFile) {
      let response = await axios.get(
        `${
          process.env.VITE_API_ENDPOINT
        }/file/get-shared-file/${this.getTypeName(type)}/${id}`,
        {
          headers: {
            'user-id': useLoginDataStore.getState()?.user?.id,
            token: useLoginDataStore.getState()?.user?.token,
          },
        }
      )

      console.log('file', response.data)
      return response.data
    } else {
      let response = await axios.get(
        `${process.env.VITE_API_ENDPOINT}/file/get-by-id/${this.getTypeName(
          type
        )}/${id}`,
        {
          headers: {
            'user-id': useLoginDataStore.getState()?.user?.id,
            token: useLoginDataStore.getState()?.user?.token,
          },
        }
      )

      console.log('file', response.data)
      return response.data
    }
  }

  static async getLatestFile(type: string = 'generatedFile') {
    console.log('typetype', type)
    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/file/latest-files/${type}`,
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
    return response.data
  }

  static async search(name: any) {
    let response = await axios.get(
      `${process.env.VITE_API_ENDPOINT}/file/search/${name}`,
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
    return response.data
  }

  static async saveGeneratedFile(fileId: string | undefined, fields: Field[]) {
    let response = await axios.post(
      `${process.env.VITE_API_ENDPOINT}/file/new/generatedFile/${fileId}`,
      {
        fields: fields,
      },
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
    return response.data
  }

  static newUploadedFile = async (
    fileId: string | undefined,
    URI: string,
    note: string,
    expiredDate: Date | null
  ) => {
    console.log('newUploadedFile', fileId, URI, note, expiredDate)
    let response = await axios.post(
      `${process.env.VITE_API_ENDPOINT}/file/new/uploadedFile/${fileId}`,
      {
        URI: URI,
        note: note,
        expiredDate: expiredDate != null ? expiredDate?.toISOString() : null,
      },
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
    window.location.reload()
    return response.data
  }

  static async editNote(
    content: string,
    type: string | undefined,
    id: string | undefined
  ) {
    console.log('editNote', content, type, id)
    let response = await axios.put(
      `${process.env.VITE_API_ENDPOINT}/file/add-note/${type}/${id}`,
      {
        note: content,
      },
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
    window.location.reload()
    return response.data
  }

  static async deleteFile(type: string | undefined, id: string | undefined) {
    let response = await axios.delete(
      `${process.env.VITE_API_ENDPOINT}/file/delete/${type}/${id}`,
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
    window.location.reload()
    return response.data
  }

  static async shareFile(type: string | undefined, id: string | undefined) {
    let response = await axios.put(
      `${process.env.VITE_API_ENDPOINT}/file/share/${type}/${id}`,
      {},
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
    window.location.reload()
    return response.data
  }

  static async unshareFile(type: string | undefined, id: string | undefined) {
    let response = await axios.put(
      `${process.env.VITE_API_ENDPOINT}/file/unshare/${type}/${id}`,
      {},
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
    window.location.reload()
    return response.data
  }

  static async newUserFreeUploadedFile(
    officialName: string,
    URI: string,
    expiredDate: Date | null,
    note: string
  ) {
    console.log('newUserFreeUploadedFile', officialName, URI, expiredDate, note)
    let response = await axios.post(
      `${process.env.VITE_API_ENDPOINT}/file/new/userFreeUploadFile`,
      {
        officialName: officialName,
        URI: URI,
        expiredDate: expiredDate,
        note: note,
      },
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
    return response.data
    window.location.reload()
  }
}

export default FileController
