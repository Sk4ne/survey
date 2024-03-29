"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateJwt_1 = require("../../middlewares/validateJwt");
const express_validator_1 = require("express-validator");
/* check() is a middleware used to validate the incoming data as per the fields */
const surveyController_1 = require("../../controllers/surveyController");
const validateFields_1 = require("../../middlewares/validateFields");
const fieldQuestUnique_1 = require("../../helpers/fieldQuestUnique");
const surveyController_2 = require("../../controllers/surveyController");
const validId_1 = require("../../helpers/validId");
const router = (0, express_1.Router)();
/**
 * EXISTEN DOS FORMAS DE UTILIZAR SWAGGER
 * Usando swaggerJsDoc (EN ESTE ARCHIVO ESTA UN EJEMPLO DE swaggerJsDoc)
 * O utilizando un archivo json.
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    Survey:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: Survey id AUTOGENERATED
 *          example: 638f98822903d2b9dccc7474
 *        titleSurvey:
 *          type: string
 *          description: Title survey
 *          example: Lenguajes de programacion con mas demanda 2022
 *        description:
 *          type: string
 *          description: Description survey
 *          example: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
 *        question:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              titleQuestion:
 *                type: string
 *                description: Title question
 *                example: Que proyectos haz realizado con TypeScript
 *              typeQuestion:
 *                type: string
 *                description: Type question QUESTION_OPEN or QUESTION_MULTIPLE
 *                example: QUESTION_OPEN
 *              answerO:
 *                type: string
 *                description: Answer question open (QUESTION_OPEN)
 *                example: Duis aute irure dolor in reprehenderit in voluptate
 *              answerM:
 *                type: object
 *                properties:
 *                  options:
 *                    type: array
 *                    example: PROJECT1,PROJECT2,PROJECTN
 *                  answer:
 *                    type: string
 *                    description: Answer QUESTION_MULTIPLE
 *                    example: PROJECT2
 *        createAt:
 *          type: string
 *          description: Survey creation date
 *        state:
 *          type: boolean
 *          description: If true, the survey is active
 *      required:
 *        - titleSurvey
 *        - description
 *    SurveyNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: a messsage for the not found survey
 *      example:
 *       message: Survey was not found
 *    QuestionNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: a message for the not found question
 *      example:
 *        message: Question was not found
 *  parameters:
 *    surveyId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: Id from survey
 *    surveyID:
 *        in: path
 *        name: idSurvey
 *        required: true
 *        schema:
 *          type: string
 *        description: Id from Survey
 *    questionID:
 *        in: path
 *        name: idQuestion
 *        required: true
 *        schema:
 *          type: string
 *        description: Id from Question
 */
/**
 * @swagger
 * tags:
 *  - name: Surveys
 *    description: Survey EndPoints
 *  - name: Users
 *    description: Operation about user - EndPoints
 */
/**
 * @swagger
 * /surveys:
 *  get:
 *    summary: Return all surveys
 *    tags: [Surveys]
 *    responses:
 *      200:
 *        description: Lists of surveys
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Survey'
 *
 */
/**
 * validateJwt - Verify that a token is included in the request.
 * validateFields - validates errors generated by express-validator
 */
/* OBTENER TODAS LAS ENCUESTAS */
router.get('/surveys', validateJwt_1.validateJwt, surveyController_1.getSurveys);
/**
 *
 * @swagger
 * /survey/{id}:
 *  get:
 *    summary: Get one survey by ID
 *    tags: [Surveys]
 *    parameters:
 *      - $ref: '#/components/parameters/surveyId'
 *    responses:
 *      200:
 *        description: Survey was found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Survey'
 *      500:
 *        description: Error in the server
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SurveyNotFound'
 */
/* OBTENER UNA ENCUESTA POR ID  */
router.get('/survey/:id', [
    (0, express_validator_1.check)('id', 'Is not a valid ID').isMongoId(),
    (0, express_validator_1.check)('id').custom(validId_1.existMongoId),
    validateFields_1.validateFields
], validateJwt_1.validateJwt, surveyController_1.getSurvey);
/**
 *
 * @swagger
 * /survey/{idSurvey}/{idQuestion}:
 *  get:
 *    summary: Get a question from a survey
 *    tags: [Surveys]
 *    parameters:
 *      - $ref: '#/components/parameters/surveyID'
 *      - $ref: '#/components/parameters/questionID'
 *    responses:
 *      200:
 *        description: Question was found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Survey'
 *      404:
 *        description: Dont exist question with this ID
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Survey'
 *      500:
 *        description: Server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/QuestionNotFound'
 *
 */
/* OBTENER UNA PREGUNTA DE UNA ENCUESTA */
router.get('/survey/:idSurvey/:idQuestion', [
    (0, express_validator_1.check)('idSurvey', 'Is not a valid ID').isMongoId(),
    (0, express_validator_1.check)('idSurvey').custom(validId_1.existMongoId),
    (0, express_validator_1.check)('idQuestion', 'Is not a valid ID').isMongoId(),
    validateFields_1.validateFields
], validateJwt_1.validateJwt, surveyController_1.getSurveyQuestion);
/**
 * @swagger
 * /survey/{idSurvey}/{idQuestion}:
 *  delete:
 *    summary: Delete a question from a survey
 *    tags: [Surveys]
 *    parameters:
 *      - $ref: '#/components/parameters/surveyID'
 *      - $ref: '#/components/parameters/questionID'
 *    responses:
 *      200:
 *        description: Delete a question from a survey
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/Schemas/Survey'
 *      500:
 *        description: Server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/QuestionNotFound'
 */
/* ELIMINAR UNA PREGUNTA DE UNA ENCUESTA */
router.delete('/survey/:idSurvey/:idQuestion', [
    (0, express_validator_1.check)('idSurvey', 'Is not a valid ID').isMongoId(),
    (0, express_validator_1.check)('idSurvey').custom(validId_1.existMongoId),
    (0, express_validator_1.check)('idQuestion', 'Is not a valid ID').isMongoId(),
    validateFields_1.validateFields
], validateJwt_1.validateJwt, surveyController_2.deleteQuestion);
/**
 * @swagger
 * /survey:
 *  post:
 *    summary: Create new survey
 *    tags: [Surveys]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Survey'
 *    responses:
 *      201:
 *        description: Survey created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Survey'
 *      500:
 *        description: Server error
 */
/* CREAR UNA ENCUESTA */
router.post('/survey', [
    (0, express_validator_1.check)('question.*.typeQuestion').custom(typeQuestion => {
        if (typeQuestion !== 'QUESTION_OPEN' && typeQuestion !== 'QUESTION_MULTIPLE') {
            throw new Error(`${typeQuestion} Is not a valid question type. Please choose another type`);
        }
        return true;
    }),
    (0, express_validator_1.check)('titleSurvey').custom(fieldQuestUnique_1.titleSurveyUn),
    (0, express_validator_1.check)('titleSurvey', 'titleSurvey is required')
        .not().isEmpty(),
    (0, express_validator_1.check)('description', 'description is required')
        .not().isEmpty(),
    (0, express_validator_1.check)('question.*.titleQuestion', 'titleQuestion is required')
        .not().isEmpty(),
    (0, express_validator_1.check)('question.*.typeQuestion', 'typeQuestion is required')
        .not().isEmpty(),
    (0, express_validator_1.check)('user', 'User is required')
        .not().isEmpty(),
    validateFields_1.validateFields
], validateJwt_1.validateJwt, surveyController_1.addSurvey);
/**
 * @swagger
 * /survey/{id}:
 *  put:
 *    summary: Update survey
 *    tags: [Surveys]
 *    parameters:
 *      - $ref: '#/components/parameters/surveyId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Survey'
 *    responses:
 *      200:
 *        description: Survey update
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Survey'
 *      500:
 *        description: Server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SurveyNotFound'
 */
/* ACTUALIZAR UNA ENCUESTA */
router.put('/survey/:id', [
    (0, express_validator_1.check)('id', 'Is not a valid ID').isMongoId(),
    (0, express_validator_1.check)('id').custom(validId_1.existMongoId),
    validateFields_1.validateFields
], validateJwt_1.validateJwt, surveyController_1.updateSurvey);
/**
 * @swagger
 * /sub-question/{id}/{idQuestion}:
 *  put:
 *    summary: Update a question from a survey (Answer a question)
 *    tags: [Surveys]
 *    parameters:
 *      - $ref: '#/components/parameters/surveyId'
 *      - $ref: '#/components/parameters/questionID'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Survey'
 *    responses:
 *      200:
 *        description: Question was found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Survey'
 *      404:
 *        description: Dont exist question with this ID
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Survey'
 *      500:
 *        description: Server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/QuestionNotFound'
 */
/* ACTUALIZAR UNA PREGUNTA DE UNA ENCUESTA (responder la pregunta) */
router.put('/sub-question/:id/:idQuestion', [
    (0, express_validator_1.check)('id', 'Is not a valid ID').isMongoId(),
    (0, express_validator_1.check)('id').custom(validId_1.existMongoId),
    (0, express_validator_1.check)('idQuestion', 'Is not a valid ID').isMongoId(),
    validateFields_1.validateFields
], validateJwt_1.validateJwt, surveyController_1.updateSubQuestion);
/**
 * @swagger
 * /question/option/{id}/{idQuestion}:
 *  put:
 *    summary: Actualizar las opciones de una pregunta tipo QUESTION_MULTIPLE
 *    tags: [Surveys]
 *    parameters:
 *      - $ref: '#/components/parameters/surveyId'
 *      - $ref: '#/components/parameters/questionID'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Survey'
 *    responses:
 *      200:
 *        description: Question was found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Survey'
 *      404:
 *        description: Dont exist question with this ID
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Survey'
 *      500:
 *        description: Server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/QuestionNotFound'
 *
 */
/* ACTUALIZAR LAS OPCIONES DE UNA PREGUNTA tipo OPTION_MULTIPLE QUE PERTENECE A UNA ENCUESTA */
router.put('/question/option/:id/:idQuestion', [
    (0, express_validator_1.check)('id', 'Is not a valid ID').isMongoId(),
    (0, express_validator_1.check)('id').custom(validId_1.existMongoId),
    (0, express_validator_1.check)('idQuestion', 'Is not a valid ID').isMongoId(),
    validateFields_1.validateFields
], surveyController_1.updateSubQuestionOption);
/**
 * @swagger
 * /survey/{id}:
 *  delete:
 *    summary: Delete survey by ID
 *    tags: [Surveys]
 *    parameters:
 *      - $ref: '#/components/parameters/surveyId'
 *    responses:
 *      200:
 *        description: Survey was delete succesfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Survey'
 *      500:
 *        description: Server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SurveyNotFound'
 *
 */
/* ELIMINAR UNA ENCUESTA */
router.delete('/survey/:id', [
    (0, express_validator_1.check)('id', 'Is not a valid ID').isMongoId(),
    (0, express_validator_1.check)('id').custom(validId_1.existMongoId),
    validateFields_1.validateFields
], validateJwt_1.validateJwt, surveyController_1.deleteSurvey);
/**
 * @swagger
 * /push-question/{idSurvey}:
 *  put:
 *    summary: Add a question to the survey
 *    tags: [Surveys]
 *    parameters:
 *      - $ref: '#/components/parameters/surveyID'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Survey'
 *    responses:
 *      200:
 *        description: Question was found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Survey'
 *      500:
 *        description: Server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/QuestionNotFound'
 */
/* AGREGAR UNA PREGUNTA A UNA ENCUESTA */
router.put('/push-question/:idSurvey', [
    (0, express_validator_1.check)('idSurvey', 'Is not a valid ID').isMongoId(),
    (0, express_validator_1.check)('idSurvey').custom(validId_1.existMongoId),
    (0, express_validator_1.check)('question.*.titleQuestion', 'El titulo de la pregunta es requerido!!!')
        .not().isEmpty(),
    validateFields_1.validateFields
], validateJwt_1.validateJwt, surveyController_1.pushQuestion);
/* ESTA RUTA ES DE PRUEBA... */
router.delete('/survey', surveyController_1.deleteAllSurvey);
exports.default = router;
