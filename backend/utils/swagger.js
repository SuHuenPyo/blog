/**
 * author: ejback
 * description: swagger 사용을 위한 기본 세팅
 */

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    // swagger 설정
    swaggerDefinition: {
        // 기본 정보
        info: {
            title: 'Miary API',
            version: '1.0.0',
            description: 'Miary API들'
        },
        host: 'localhost:3300',
        basePath: '/'
    },
    // 설정한 api들의 파일 위치, swagger 설정위치
    apis:['./apis/*/index.js','./swagger/*']
}

const specs = swaggerJsDoc(options);

module.exports = {
    swaggerUI,
    specs
}