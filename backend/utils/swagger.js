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
            description: 'API for Miary'
        },
        host: 'localhost:2800',
        basePath: '/'
    },
    // 설정한 api들의 파일 위치, swagger 설정위치
    apis:['./routes/*.js','./swagger/*']
}

const specs = swaggerJsDoc(options);

module.exports = {
    swaggerUI,
    specs
}