/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-27 18:21:30
 * @modify date 2022-08-16 23:00:21
 * @desc [Axios 요청을 위한 간편 모듈]
 */

import axios from "axios"

export const MiaryGetAxios = async(url, log="", errLog="") =>{
  let response, returnResult = null;
  try{
    response = await axios.get(url)
    returnResult = response.data;

    console.log(log + "OK");
  }catch(err){
    console.error(errLog + '\n\n' + err);
  }
  
  return returnResult;
}

export const MiaryPostAxios = async(url, form) =>{
  let response = null;
  try{
      response = await axios({
      method: 'post',
      url: url,
      data: form,
      header: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }catch{
    console.error(response);
  }

  return response.data;
}