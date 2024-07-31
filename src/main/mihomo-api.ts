import { ipcMain } from 'electron'
import axios, { AxiosInstance } from 'axios'

let axiosIns: AxiosInstance = null!

/// initialize some information
/// enable force update axiosIns
export const getAxios = async (force: boolean = false): Promise<AxiosInstance> => {
  if (axiosIns && !force) return axiosIns

  const server = '127.0.0.1:9097'
  const secret = ''

  axiosIns = axios.create({
    baseURL: `http://${server}`,
    proxy: false,
    headers: secret ? { Authorization: `Bearer ${secret}` } : {},
    timeout: 15000
  })
  axiosIns.interceptors.response.use((r) => r.data)
  return axiosIns
}

async function mihomoVersion(): Promise<IMihomoVersion> {
  const instance = await getAxios()
  return instance.get('/version') as Promise<IMihomoVersion>
}

export function registerIpcMainHandlers(): void {
  ipcMain.handle('mihomoVersion', mihomoVersion)
}