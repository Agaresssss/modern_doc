import axios from 'axios'
import { useLoginDataStore } from '@stores/LoginDataStore'
class FolderController {
  static async getLatestFolder() {
    let response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/folder/latest-folders`,
      {
        headers: {
          'user-id': useLoginDataStore.getState()?.user?.id,
          token: useLoginDataStore.getState()?.user?.token,
        },
      }
    )
    return response.data
  }
}

export default FolderController