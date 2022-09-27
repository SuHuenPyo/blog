
 export class RegexHelper {
  
    /**
     * 값이 있는지 확인 하는 모듈
     * @param {string} data 검사할 값
     * @returns 값이 있으면 true, 없으면 false를 리턴한다.
     */
  
    value = data => { return data ? true : false;}

    /**
     * 데이터 길이 검사값
     * @param {string} data 검사값
     * @param {int} min 최소 길이
     * @param {int} max 최대 길이
     * @returns {boolean} true: 통과, string: 실패사유
     */
    length = (data, min, max) => {
  
      return (min <= data.length <= max) ? true : false;
    }
  
    /**
     * 숫자 데이터인지 확인하는 모듈
     * @param {number} data 검사값
     * @returns {boolean} true: typeof숫자 false: !typeof숫자
     */
    number = (data) => { return Number.isNaN(data) ? false : true; }
  
    /**
     * 이메일 형식인지 검사하는 함수
     * @param {string} data 검사값
     * @returns {boolean} 이메일 형식이면 true, 아니면 false
     */
  
    email = (data) => {
      const regex =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

      return !regex.test(data) ? false : true;
    }
  
    /**
     * 영문,숫자,특수문자 조합의 패스워드인지 검사하는 함수
     * @param {string} data 검사값
     * @returns {boolean} true : 통과 false : X
     */
    pwTest = (data) => {
      const regex =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).*$/;
  
      return !regex.test(data) ? false : true;
    }
  
    /**
     * 영문,숫자가 포함되어 있는지 확인하는 함수
     * @param {string} data 검사값
     * @returns {boolean} 맞으면 true 틀리면 false
     */
  
    idTest = (data) => {
      const regex = /^[a-z]+[a-z0-9]*$/g;

      return !regex.test(data) ? false : true;
    }
  }
  
export default RegexHelper;
  