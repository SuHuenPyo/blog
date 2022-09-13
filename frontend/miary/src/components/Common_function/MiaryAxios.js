/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-27 18:21:30
 * @modify date 2022-09-14 03:16:22
 * @desc [Axios 요청을 위한 간편 모듈]
 */

import axios from "axios"

//export const ServerUrl = "http://172.30.1.29:3300/"
export const ServerUrl = "http://localhost:3300/"

export const MiaryGetAxios = async(url, log="", errLog="" , query={}) =>{
  let response = null;

  //console.log(JSON.stringify(query));
  try{
    response = await axios.get(url, {params: query}); 
    console.log(log);
  }catch(err){
    console.error(errLog + '\n\n' + err);
    return err;
  }finally{
    console.log("결과 : "+ url + " == "+ response.status);
    
  }
  return response;
}
/**
 * 
 * @param {string} url  `Miary.ServerUrl + {사용하고자 할 api 라우터 주소}`
 * @param {* & FormData} form `{data} - urlencoded 방식으로 전송하려면 {...} 입력. MultipartForm 방식 전송이라면 FormData 객체를 전송해준다.`
 * @param {boolean} contentType `multipartForm 방식전송은 true or 1, urlencoded방식은 0 or false   - default 0(false);`
 * @returns axios result
 */
export const MiaryPostAxios = async(url,form, contentType=0) =>{
  let response = null;


  contentType = contentType ? 'multipart/form-data' : 'application/x-www-form-urlencoded;charset=UTF-8';
  try{
      response = await axios({
      method: 'post',
      url: url,
      data: form,
      header: {
        'Content-Type': contentType,
      },
    });
  }catch(err){
    //console.error(err);
    throw err;

  }finally{
    console.log("결과 : "+ url + " == "+ response.status);

  }

  return response;

}