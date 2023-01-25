export const swaggerConfig = {
  openapi:"3.0.0",
  info:{
    title:'Survey API',
    version:'1.0.0',
    description:'Esta API llamada survey permite generan encuestas por medio de preguntas abierta y/o cerradas y a su vez descargarlas en formato pdf.',
    contact: {
      name: 'Neider Lopez',
      email: 'neider86@protonmail.com'
    }
  },
  servers:[
    {
      // url:'http://localhost:3000/v1'
      url:'https://survey-production.up.railway.app/v1'
    }
  ],
  tags: [
    {
      name: 'Surveys',
      description: 'Survey EndPoints' 
    },
    {
      name: 'Users',
      description: 'Users EndPoints' 
    }
  ],
  /* COMPONENTES REUTILIZABLES */
  components:{
    schemas:{
      Survey: {
        type: 'object',
        properties: {
          id:{
            type: 'string',
            description: 'Survey id Autogenerated',
            example: '638f98822903d2b9dccc7474'
          },
          titleSurvey: {
            type: 'string',
            description: 'Title survey',
            example: 'Lenguajes de programacion con mas demanda 2022'
          },
          description:{
            type: 'string',
            description: 'Description survey',
            example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
          },
          question:{
            type: 'array',
            items: {
              type: 'object',
              properties: {
                titleQuestion: {
                  type: 'string',
                  description: 'string',
                  example: 'Que proyectos haz realizado con TypeScript'
                },
                typeQuestion:{
                  type: 'string',
                  description: 'Type question QUESTION_OPEN or QUESTION_MULTIPLE',
                  example: 'QUESTION_OPEN'
                },
                answerO:{
                  type: 'string',
                  description:'Answer question open (QUESTION_OPEN)',
                  example: 'Duis aute irure dolor in reprehenderit in voluptate'
                },
                answerM: {
                  type: 'object',
                  properties:{
                    options:{
                      type: 'array',
                      items:{
                        type: 'string',
                        example: 'JQUERY',
                      }
                    },
                    answer: {
                      type: 'string',
                      example: 'HELLO WORLD'
                    }
                  }
                }
              }
            }
          },
          createAt:{
            type: 'string',
            description: 'Survey creation date',
            example: '2022-12-06T19:28:26.890Z'
          },
          state:{
            type: 'string',
            description: 'If true, the survey is active',
            example: true
          }
        },
        required:[
          'id','titleSurvey'
        ]
      },
      User: {
        type: 'object',
        properties:{
          id:{
            type: 'string',
            description: 'User id Autogenerated',
            example: '62e590a694c881cb4b43f190'
          },
          name:{
            type: 'string',
            description: 'Name of user',
            example: 'Neider'
          },
          email:{
            type:'string',
            description:'Email of user',
            example: "neider86@protonmail.com",
          },
          password:{
            type: 'string',
            description: 'Password of user',
            example: 'holaMundo*34'
          },
          img:{
            type: 'string',
            description: 'Avatar or image of user',
            example: 'https://res.cloudinary.com/dqhme1rod/image/upload/v1659453300/api-survey/pn1wwo1fqe3e8o6whhg8.jpg'
          },
          role:{
            type:'string',
            description: 'Role of user',
            example: 'ADMIN_ROLE'
          },
          facebook:{
            type: 'boolean',
            description: 'User authenticated with facebook',
            default:false
          },
          google:{
            type: 'boolean',
            description: 'User authenticated with google',
            default:false
          },
          createAt:{
            type:'string',
            description: 'date of create',
            example:'2022-07-30T20:11:06.751Z'
          },
          state:{
            type:'boolean',
            description: 'true o false',
            example: false
          }
        },
        required:[
          'name'
        ]
      },
      SurveyNotFound:{
        type: 'object',
        properties:{
          message:{
            type: 'string',
            description: 'Survey was not found'
          }
        },
        example:{
          message: 'Survey was not found'
        }
      },
      UserNotFound:{
        type: 'object',
        properties:{
          message:{
            type: 'string',
            description: 'User was not found'
          }
        },
        example:{
          message: 'User was not found'
        }
      },
      QuestionNotFound:{
        type: 'object',
        properties:{
          message:{
            type: 'string',
            description: 'Question was not found',
          }
        },
        example:{
          message: 'Question was not found'
        }
      }
    },
    parameters:{
      surveyId: {
        name: 'id', 
        in:'path',
        description: 'Id from survey',
        required: true,
        schema:{
          type: 'string'
        }
      },
      surveyID: {
        name: 'idSurvey', 
        in:'path',
        description: 'Id from survey',
        required: true,
        schema:{
          type: 'string'
        }
      },
      questionID: {
        name: 'idQuestion', 
        in:'path',
        description: 'Id from question',
        required: true,
        schema:{
          type: 'string'
        }
      },
      userId:{
        name: 'id',
        in:'path',
        description:'Id from user',
        required:true,
        schema:{
          type:'string'
        }
      },
      /* x-token */
      'tokenHeader':{
        name: 'x-token',
        in:'header',
        description: 'token header',
        required: true,
        schema:{
          type: 'string'
        }
      },
      'holaMundo':{
        name: 'idUser',
        in:'path',
        description: "In this field is the id of the user who wants to reset the password, the complete link is sent to the user's email address.",
        required:true,
        schema:{
          type:'string'
        }
      }
    },
    /* security */
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
 /* DIFERENTES RUTAS DE LA API REST*/
 // OBTENER TODAS LAS ENCUESTAS
  paths: {
    "/surveys": {
      get: {
        summary: 'Return all surveys',
        tags: ["Surveys"],
        responses: {
          '200': {
            description: 'Lists of surveys',
            content: {
              "application/json":{
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Survey'
                  }
                }
              }
            }
          },
          '500':{
            description:'Error in the server',
            content: {
              "application/json":{
                schema: {
                  $ref: '#/components/schemas/SurveyNotFound'
                }
              }
            }
          }
        }
      }
    },
    /* OBTENER UNA ENCUESTA POR ID */
    "/survey/{id}":{
      get: {
        summary: 'Get one survey by ID',
        tags: ['Surveys'],
        parameters: [
          {
            $ref: '#/components/parameters/surveyId'
          }
        ],
        responses:{
          '200':{
            description: 'Survey was found',
            content: {
              "application/json":{
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Survey'
                  }
                }
              }
            }
          },
          '500':{
            description:'Error in the server',
            content: {
              "application/json":{
                schema: {
                  $ref: '#/components/schemas/SurveyNotFound'
                }
              }
            }
          }
        }
      },
      /* ACTUALIZAR UNA ENCUESTA */
      put: {
        summary: 'Update survey',
        tags: ['Surveys'],
        parameters:[
          {
            $ref: '#/components/parameters/surveyId'
          }
        ],
        requestBody:{
          required:true,
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/Survey'
              }
            }
          }
        },
        responses:{
          '200':{
            description: 'Survey update',
            content: {
              "application/json":{
                schema: {
                  $ref: '#/components/schemas/Survey'
                }
              }
            }
          },
          '500':{
            description:'Error in the server',
            content: {
              "application/json":{
                schema: {
                  $ref: '#/components/schemas/SurveyNotFound'
                }
              }
            }
          }
        }
      },
      /* ELIMINAR UNA ENCUESTA */
      delete: {
        summary: 'Delete survey by ID',
        tags: ['Surveys'],
        parameters:[
          {
            $ref: '#/components/parameters/surveyId'
          }
        ],
        responses:{
          '200':{
            description: 'Survey was delete successfully',
            content: {
              "application/json":{
                schema: {
                  $ref: '#/components/schemas/Survey'
                }
              }
            }
          },
          '500':{
            description:'Error in the server',
            content: {
              "application/json":{
                schema: {
                  $ref: '#/components/schemas/SurveyNotFound'
                }
              }
            }
          }
        }
      }
    },
    /* OBTENER UNA PREGUNTA DE UNA ENCUESTA */
    "/survey/{idSurvey}/{idQuestion}": {
      get: {
        summary: 'Get a question from a survey',
        tags: ['Surveys'],
        parameters:[
          {
            $ref: '#/components/parameters/surveyID'
          },
          {
            $ref: '#/components/parameters/questionID'
          }
        ],
        responses:{
          '200':{
            description: 'Question was found',
            content: {
              "application/json":{
                schema: {
                  $ref: '#/components/schemas/Survey'
                }
              }
            }
          },
          '500':{
            description:'Error in the server',
            content: {
              "application/json":{
                schema: {
                  $ref: '#/components/schemas/QuestionNotFound'
                }
              }
            }
          }
        }
      },
      /* ELIMINAR UNA PREGUNTA DE UNA ENCUESTA */
      'delete':{
        summary:'Delete a question from a survey',
        tags:['Surveys'],
        parameters:[
          {
            $ref: '#/components/parameters/surveyID'
          },
          {
            $ref:'#/components/parameters/questionID'
          }
        ],
        responses:{
          '200':{
            description: 'Delete a question from a survey',
            content: {
              "application/json":{
                schema:{
                  $ref: '#/components/schemas/Survey'
                }
              }
            }
          },
          '500':{
            description:'Server error',
            content:{
              "application/json":{
                schema:{
                  $ref:'#/components/schemas/QuestionNotFound'
                }
              }
            }
          }
        }
      }
    },
    '/survey':{
      post:{
        summary: 'Create new survey',
        tags: ['Surveys'],
        requestBody: {
          description: 'lorem ipsum dolir voluptate',
          required: true,
          content: {
            'application/json':{
              schema: {
                $ref: '#/components/schemas/Survey'
              }
            }
          }
        },
        responses:{
          '201':{
            description: 'Survey created succcesfully',
            content:{
              'application/json':{
                schema: {
                  $ref: '#/components/schemas/Survey'
                }
              }
            }
          },
          '500':{
            description: 'Server error'
          }
        }
      }
    },
    /* ACTUALIZAR UNA PREGUNTA DE UNA ENCUESTA - Responder una pregunta */
    '/sub-question/{id}/{idQuestion}':{
      put:{
        summary: 'Update a question from a survey - Answer a question',
        tags: ['Surveys'],
        parameters:[
          {
            $ref: '#/components/parameters/surveyId'
          },
          {
            $ref: '#/components/parameters/questionID'
          }
        ],
        requestBody:{
          required: true,
          content:{
            'application/json':{
              schema:{
                $ref: '#/components/schemas/Survey'
              }
            }
          }
        },
        responses:{
          '200':{
            description: 'Question was found',
            content:{
              'application/json':{
                schema: {
                  $ref: '#/components/schemas/Survey'
                }
              }
            }
          },
          '404': {
            description: 'Dont exist question with this ID',
            content:{
              'application/json':{
                schema: {
                  $ref: '#/components/schemas/Survey'
                }
              }
            }
          },
          '500':{
            description: 'Server error',
            content: {
              'application/json':{
                schema: {
                  $ref: '#/components/schemas/QuestionNotFound'
                }
              }
            }
          }
        }
      }
    },
    /* ACTUALIZAR LAS OPCIONES DE UNA PREGUNTA tipo OPTION_MULTIPLE QUE PERTENECE A UNA ENCUESTA */
    '/question/option/{id}/{idQuestion}':{
      put: {
        summary:'Actualizar las opciones de una pregunta tipo QUESTION_MULTIPLE',
        tags: ['Surveys'],
        parameters:[
          {
            $ref: '#/components/parameters/surveyId'
          },
          {
            $ref: '#/components/parameters/questionID'
          }
        ],
        requestBody:{
          required: true,
          content:{
            'application/json':{
              schema:{
                $ref: '#/components/schemas/Survey'
              }
            }
          }
        },
        responses:{
          '200':{
            description: 'Question was found',
            content:{
              'application/json':{
                schema: {
                  $ref: '#/components/schemas/Survey'
                }
              }
            }
          },
          '404': {
            description: 'Dont exist question with this ID',
            content:{
              'application/json':{
                schema: {
                  $ref: '#/components/schemas/Survey'
                }
              }
            }
          },
          '500':{
            description: 'Server error',
            content: {
              'application/json':{
                schema: {
                  $ref: '#/components/schemas/QuestionNotFound'
                }
              }
            }
          }
        }
      }
    },
    /* AGREGAR UNA PREGUNTA A UNA ENCUESTA */
    '/push-question/{idSurvey}':{
      put: {
        summary: 'Add a question to the survey',
        tags: ['Surveys'],
        parameters:[
          {
            $ref: '#/components/parameters/surveyID'
          }
        ],
        requestBody:{
          required: true,
          content: {
            'application/json':{
              schema: {
                $ref: '#/components/schemas/Survey'
              }
            }
          }
        },
        responses:{
          '200':{
            description: 'Question was found',
            content:{
              'application/json':{
                schema: {
                  $ref: '#/components/schemas/Survey'
                }
              }
            }
          },
          '500':{
            description: 'Server error',
            content: {
              'application/json':{
                schema: {
                  $ref: '#/components/schemas/QuestionNotFound'
                }
              }
            }
          }
        }
      }
    },
    /* PATH USERS */
    '/users': {
      get:{
        summary: 'Return all users',
        // security: [
        //   {
        //     bearerAuth: []
        //   }
        // ],
        parameters:[
          {
            $ref: '#/components/parameters/tokenHeader'
          }
        ],
        tags:['Users'],
        responses:{
          '200': {
            description:'List of users',
            content:{
              'application/json':{
                schema:{
                  type: 'array',
                  items:{
                    $ref: '#/components/schemas/User'
                  }
                }
              }
            }
          },
          '500':{
            description: 'Error in the server',
            content:{
              "application/json":{
                schema:{
                  $ref: '#/components/schemas/UserNotFound'
                }
              }
            }
          }
        }
      }
    },
    /* USER BY ID */
    '/user/{id}':{
      get:{
        summary:'Get one user by ID',
        tags:['Users'],
        parameters:[
          {
            $ref: '#/components/parameters/userId'
          }
        ],
        responses:{
          '200':{
            description: 'User was found',
            content: {
              "application/json":{
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User'
                  }
                }
              }
            }
          },
          '500':{
            description:'Error in the server',
            content: {
              "application/json":{
                schema: {
                  $ref: '#/components/schemas/UserNotFound'
                }
              }
            }
          }
        }
      },
      /* UPDATE USER */
      put:{
        summary: 'Update one user by ID',
        tags: ['Users'],
        parameters:[
          {
            $ref: '#/components/parameters/userId'
          }
        ],
        requestBody:{
          required:true,
          content:{
            'application/json':{
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        responses:{
          '200':{
            description: 'User was updated succesfully',
            content:{
              'application/json':{
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          '500':{
            description: 'Error in the server',
            content:{
              'application/json':{
                schema: {
                  $ref: '#/components/schemas/UserNotFound'
                }
              }
            }
          }
        }
      },
      /* DELETE ONE USER */
      delete:{
        summary: 'Delete one user',
        tags: ['Users'],
        parameters:[
          {
            $ref: '#/components/parameters/userId'
          }
        ],
        responses:{
          '200':{
            description: 'User was delete successfully',
            content:{
              'application/json':{
                schema:{
                  type: 'object',
                  properties:{
                    msg: {
                      type: 'string',
                      description: 'Message succesfully delete',
                      example: 'User delete successfully'
                    }
                  }
                }
              }
            }
          },
          '500':{
            description: 'Error in the server',
            content:{
              'text/plain':{
                schema:{
                  type: 'string',
                  example: 'Server error'
                }
              }
            }
          }
        }
      }
    },
    /* CREATE USER */
    '/user': {
      post: {
        summary: 'Create a new user',
        tags: ['Users'],
        requestBody:{
          required: true,
          content:{
            'application/json':{
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        responses:{
          '200': {
            description:'User create succesfully',
            content:{
              'application/json':{
                schema:{
                  type: 'array',
                  items:{
                    $ref: '#/components/schemas/User'
                  }
                }
              }
            }
          },
          '500':{
            description: 'Some server error',
            content:{
              'text/plain':{
                schema:{
                  type:'string',
                  example: 'Server error'
                }
              }
            }
          }
        }
      }
    },
    /* LOGIN USER */
    '/user/login':{
      post:{
        summary: 'Login User',
        tags: ['Users'],
        requestBody:{
          required: true,
          content: {
            'application/json':{
              /* schema: {
                $ref: '#/components/schemas/User'
              } */
              /* NOTA: SE PUEDE CREAR UN ESQUEMAS EN LOS COMPONENTES QUE SEA REUTILIZABLE */
              schema:{
                type: 'object',
                properties:{
                  email: {
                    type:'string',
                    description: 'Email of user',
                    example: 'neider86@protonmail.com'
                  },
                  password:{
                    type:'string',
                    description:'Password of user',
                    example:'viernestrece13'
                  }
                }
              }
            }
          }
        },
        responses:{
          '200':{
            description: 'Successful login',
            content:{
              'application/json':{
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            }
          },
          '500':{
            description:'Error in the server'
          }
        }
      }
    },
    /* RESTORE PASSWORD - link send to email user */
    '/restore-password':{
      post:{
        summary: 'Link to restore user password',
        tags: ['Users'],
        requestBody:{
          description: 'Restore password user',
          required:true,
          content:{
            'application/json':{
              schema:{
                type: 'object',
                properties:{
                  email: {
                    type: 'string',
                    description: 'Email to which the link to reset the password will be sent',
                    example: 'neider86@protonmail.com'
                  }
                }
              }
            }
          }
        },
        responses:{
          '200':{
            description: 'Email send succcesfully',
            content:{
              'application/json':{
                schema:{
                  // $ref: '#/components/schemas/User'
                  type: 'object',
                  properties:{
                    msg: {
                      type: 'string',
                      description: 'Message successfully',
                      example: 'Email send successfully'
                    },
                    info:{
                      type: 'string',
                      description: 'Message auto nodemailer',
                      example: '250 2.0.0 OK  1671743176 t204-20020a1faad5000000b003bd94c3a733sm189493vke.0 - gsmtp'
                    }
                  }
                }
              }
            }
          },
          '404':{
            description: 'Resource was not found',
            content:{
              'text/plain':{
                schema:{
                  type: 'string',
                  example: "Don't exist and user with this email in the database"
                }
              }
            }
          },
          '500':{
            description: 'Error in the server',
            content:{
              'text/plain':{
                schema:{
                  type: 'string',
                  example: 'Server error'
                }
              }
            }
          }
        }
      }
    },
    /* ADD NEW PASSWORD */
    '/password-reset/{idUser}':{
      post:{
        summary: 'Add new user password',
        tags:['Users'],
        parameters:[
          {
            $ref:'#/components/parameters/holaMundo'
          }
        ],
        requestBody:{
          description: 'Change password',
          required: true,
          content:{
            'application/json':{
              schema:{
                type: 'object',
                properties:{
                  password:{
                    type:'string',
                    description:'New password',
                    example:'miNewPassword123'
                  }
                }
              }
            }
          }
        },
        responses:{
          '200':{
            description:'Message password update',
            content:{
              'application/json':{
                schema:{
                  type: 'object',
                  properties:{
                    msg: {
                      type: 'string',
                      description: 'Message successfully',
                      example: 'Password update successfully'
                    }
                  }
                }
              }
            }
          },
          '404':{
            description: 'Resource was not found',
            content:{
              'text/plain':{
                schema:{
                  type: 'string',
                  example: 'Invalid link or expired'
                }
              }
            }
          },
          '500':{
            description: 'Error in the server',
            content:{
              'text/plain':{
                schema:{
                  type:'string',
                  example: 'Server error'
                }
              }
            }
          }
        }
      }
    },
    /* AUTH FACEBOOK */
    '/auth/facebook':{
      get:{
        summary: 'Sign Up Facebook',
        description: 'Copy and paste this path in your browser to create a facebook user',
        tags: ['Users'],
        responses:{
          '200':{
            description: 'Message sign up succesfully',
            content:{
              'application/json':{
                schema:{
                  type: 'object',
                  properties:{
                    msg: {
                      type: 'string',
                      description: 'Message succesfully',
                      example: 'Login facebook ok'
                    }
                  }
                }
              }
            }
          },
          '500':{
            description: 'Error in the server',
            content:{
              'text/plain':{
                schema:{
                  type: 'string',
                  example: 'Server error'
                }
              }
            }
          }
        }
      }
    },
    /* LOGOUT FACEBOOK */
    '/logout/facebook':{
      get:{
        summary: 'Logout Facebook',
        description: 'This endpoint logout facebook',
        tags: ['Users'],
        responses:{
          '200':{
            description: 'Message logout succesfully',
            content:{
              'application/json':{
                schema:{
                  type: 'object',
                  properties:{
                    msg: {
                      type: 'string',
                      description: 'Message succesfully',
                      example: 'Not Logged In'
                    }
                  }
                }
              }
            }
          },
          '500':{
            description: 'Error in the server',
            content:{
              'text/plain':{
                schema:{
                  type: 'string',
                  example: 'Server error'
                }
              }
            }
          }
        }
      }
    },
    /* AUTH GOOGLE */
    '/auth/google':{
      get:{
        summary: 'Sign Up Google',
        description: 'Copy and paste this path in your browser to create a google user',
        tags: ['Users'],
        responses:{
          '200':{
            description: 'Message sign up succesfully',
            content:{
              'application/json':{
                schema:{
                  type: 'object',
                  properties:{
                    msg: {
                      type: 'string',
                      description: 'Message succesfully',
                      example: 'Login google ok'
                    }
                  }
                }
              }
            }
          },
          '500':{
            description: 'Error in the server',
            content:{
              'text/plain':{
                schema:{
                  type: 'string',
                  example: 'Server error'
                }
              }
            }
          }
        }
      }
    },
    /* LOGOUT FACEBOOK */
    '/logout/google':{
      get:{
        summary: 'Logout Google',
        description: 'This endpoint logout Google',
        tags: ['Users'],
        responses:{
          '200':{
            description: 'Message logout succesfully',
            content:{
              'application/json':{
                schema:{
                  type: 'object',
                  properties:{
                    msg: {
                      type: 'string',
                      description: 'Message succesfully',
                      example: 'Not Logged In'
                    }
                  }
                }
              }
            }
          },
          '500':{
            description: 'Error in the server',
            content:{
              'text/plain':{
                schema:{
                  type: 'string',
                  example: 'Server error'
                }
              }
            }
          }
        }
      }
    }
  }
}