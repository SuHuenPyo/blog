/**
 * author ejback
 * description : 파라미터를 검사하기 위한 모듈
 */

class RegexHelper {
  
  /**
   * 값이 있는지 확인 하는 모듈
   * @param {string} data 검사할 값
   * @param {string} name 검사값 이름
   * @returns 값이 있으면 true, 없으면 false를 리턴한다.
   */

  value(data, name) {
    
    if (!data) {
      throw { name: "No Value", message: `[${name}] 값이 없습니다.` };
    }

    return;
  }

  /**
   * 데이터 길이 검사값
   * @param {string} data 검사값
   * @param {int} min 최소 길이
   * @param {int} max 최대 길이
   * @param {string} name 검사값 이름
   * @returns 길이가 최소,최대 길이보다 작거나 크면 false를 반환
   */
  length(data, min, max, name) {
    const length = data.length;

    if (length > max) {
      throw {
        name: "Value is too long",
        message: `[${name}] 길이가 ${max}값보다 깁니다.`,
      };

      return;
    } else if (length < min) {
      throw {
        name: "Value is too short",
        message: `[${name}] 길이가 ${min}값보다 짧습니다.`,
      };

      return;
    }

    return;
  }

  /**
   * 숫자 데이터인지 확인하는 모듈
   * @param {number} data 검사값
   * @param {string} name 이름
   * @returns 
   */

  number(data, name) {
    if (Number.isNaN(data)) {
      throw {
        name: "Data is not a Number",
        message: `[${name}] 숫자가 아닙니다.`,
      };
    }

    return;
  }

  /**
   * 이메일 형식인지 검사하는 함수
   * @param {string} data 검사값
   * @param {string} name 검사값 이름
   * @returns 이메일 형식이면 true, 아니면 false
   */

  email(data, name) {
    const regex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!regex.test(data)) {
      throw {
        name: "Value is not email",
        message: `[${name}] 이메일 형식이 아닙니다.`,
      };
    }

    return;
  }

  /**
   * 영문,숫자,특수문자 조합의 패스워드인지 검사하는 함수
   * @param {string} data 검사값
   * @returns 맞으면 true 틀리면 false
   */
  pwTest(data, name) {
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).*$/;

    if (!regex.test(data)) {
      throw {
        name: "Value didn't passed Regex",
        message: `[${name}] 정규식을 통과하지 못했습니다.`,
      };
    }
    return;
  }

  /**
   * 영문,숫자가 포함되어 있는지 확인하는 함수
   * @param {string} data 검사값
   * @returns 맞으면 true 틀리면 false
   */

  idTest(data, name) {
    const regex = /^[a-z]+[a-z0-9]*$/g;

    if (!regex.test(data)) {
      throw {
        name: "Value didn't passed Regex",
        message: `[${name}] 정규식을 통과하지 못했습니다.`,
      };
    }
    return;
  }
}

module.exports = RegexHelper;
