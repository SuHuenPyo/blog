/**
 * @author Shun
 * @email vytngms@gmail.com
 * @create date 2022-06-27 18:21:30
 * @modify date 2022-10-03 17:52:13
 * @desc [Axios 요청을 위한 간편 모듈]
 */

import axios from "axios"

//export const ServerUrl = "http://172.30.1.27:3300/"
export const ServerUrl = "https://miary.duckdns.org/api/"

/**
 * 
 * @param {string} url MiaryAxios.ServerUrl or URL
 * @param {string} log 성공로그출력을 원할때 default null
 * @param {string} errLog 에러로그 출력을 원할때 default null
 * @param {Object} query  Object key:value ,...
 * @returns 
 */
export const MiaryGetAxios = async(url, log="", errLog="" , query={}) =>{
  let response = null;

  //console.log(JSON.stringify(query));
  try{
    response = await axios.get(url, {params: query}); 
    //if(log) console.log(log);
  }catch(err){
    console.error(errLog + '\n\n' + err);
    return err;
  }finally{
    //console.log("결과 : "+ url + " == "+ response.status);
    
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
    console.error(err);
    response = err;
    

  }finally{
    //console.log("결과 : "+ url + " == "+ response.status);

  }

  return response;

}
/**
 * 
 * @param {string} url  `Miary.ServerUrl + {사용하고자 할 api 라우터 주소}`
 * @param {* & FormData} form `{data} - urlencoded 방식으로 전송하려면 {...} 입력. MultipartForm 방식 전송이라면 FormData 객체를 전송해준다.`
 * @param {boolean} contentType `multipartForm 방식전송은 true or 1, urlencoded방식은 0 or false   - default 0(false);`
 * @returns axios result
 * @returns 
 */
export const MiaryPutAxios = async(url,form, contentType=0) =>{
  let response = null;

  contentType = contentType ? 'multipart/form-data' : 'application/x-www-form-urlencoded;charset=UTF-8';
  try{
      response = await axios({
      method: 'put',
      url: url,
      data: form,
      header: {
        'Content-Type': contentType,
      },
    });
  }catch(err){
    console.error(err);
    response = err;
    

  }finally{
    //console.log("결과 : "+ url + " == "+ response.status);

  }

  return response;
}