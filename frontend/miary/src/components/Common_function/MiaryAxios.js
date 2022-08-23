/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-27 18:21:30
 * @modify date 2022-08-23 22:29:46
 * @desc [Axios 요청을 위한 간편 모듈]
 */

import axios from "axios"

export const ServerUrl = "http://172.30.1.29:3300/"

export const MiaryGetAxios = async(url, log="", errLog="" , query={}) =>{
  let response, returnResult = null;

  console.log(JSON.stringify(query));
  try{
    response = await axios.get(url, {params: query});
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
    //handle error
    console.error(response); 
  }

  return response;
}