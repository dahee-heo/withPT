import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { getCookie, setCookie } from "./cookie";


export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    withCredentials: true,
  }
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getCookie("access");

    if (config.headers && accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
      return config;
    } else {
      return config;
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
)

api.interceptors.response.use(
  async (response) => {
    // if (!(response.status === 200 || response.status === 201 || response.status === 204))
    //   throw new Error();

    // if (response.data.errors) throw new Error(response.data.errors);
    return response;
  },
  async (error) => {
    // console.log('error: ', error);
    if (error.response.status === 401) {
      error.config._retry = true;

      const token = getCookie('access');
      const refreshToken = getCookie('refreshToken');
<<<<<<< Updated upstream
      window.location.href = "/member/login"

=======
      
      console.log('refreshToken: ', refreshToken);
>>>>>>> Stashed changes
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/oauth/reissue`, {
        refresh: refreshToken
      }, {
        headers: { Authorization: `Bearer ${token}` }
<<<<<<< Updated upstream
      }).then( (response) => {
      if (response.status === 200 && response.data.accessToken) {
        setCookie("access", response.data.accessToken, { path: "/" })
        const accesstoken = getCookie("access")
        error.config.headers["Authorization"] = `${accesstoken}`;
        return api(error.config)
      } else if (response.status === 401) {
        window.location.href = "/member/login"
      }
      })
=======
      }).then(async (response) => {
        console.log('response: ', response);
        if (response.status === 200 && response.data.accessToken) {
          setCookie("access", response.data.accessToken, { path: "/" })
          const accesstoken = getCookie("access")
          error.config.headers["Authorization"] = `${accesstoken}`;
          return api(error.config)
        } else if (response.status === 401) {
          window.location.href = "/member/login"
        }
      })

      
      console.log('token response: ', response);
>>>>>>> Stashed changes

      error.config.header = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }

      // 중단된 요청 새로운 토큰으로 재전송
      const originalResponse = await api.request(error.config)
      return originalResponse

    }
  }
)