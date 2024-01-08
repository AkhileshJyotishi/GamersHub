/**
 * @module newsRouter
 * @description Defines an Express router that handles various routes related to news and categories.
 *
 * @Routes
 * - POST /news/add: Adds a new category to the news. Requires authentication with 'manageUsers' permission.
 * - GET /category: Retrieves all categories.
 * - GET /category/:id: Retrieves a specific category by its ID.
 * - PATCH /category/:id: Updates a specific category by its ID. Requires authentication with 'manageUsers' permission.
 * - DELETE /category/:id: Deletes a specific category by its ID. Requires authentication with 'manageUsers' permission.
 * - GET /: Retrieves all help questions.
 * - POST /add: Adds a new help question. Requires authentication with 'manageUsers' permission.
 * - GET /:id: Retrieves a specific help question by its ID.
 * - PATCH /:id: Updates a specific help question by its ID. Requires authentication with 'manageUsers' permission.
 * - DELETE /:id: Deletes a specific help question by its ID. Requires authentication with 'manageUsers' permission.
 *
 * @Middleware
 * - auth: Middleware that handles authentication and authorization. Requires specific permissions for certain routes.
 * - validate: Middleware that validates request parameters, query, and body against predefined schemas.
 *
 * @Controllers
 * - newsController: Controller functions that handle the logic for each route.
 *
 * @exports router as default module.
 */

import express from 'express'
import validate from '../../middlewares/validate'
import auth from '../../middlewares/auth'
import { newsValidation } from '../../validations'
import { newsController } from '../../controllers'

const router = express.Router()

/**
 * @function addNewsCategoryRoute
 * @async
 * @desc Handles the route for adding a new category to the news.
 * @middleware auth('manageUsers') - Requires authentication with 'manageUsers' permission.
 * @middleware validate(newsValidation.newNewsCategoryValidation) - Validates the request against a predefined schema.
 * @controller newsController.addNewsCategory - Controller function for adding a new category.
 */
router.post(
  '/news/add',
  auth('manageUsers'),
  validate(newsValidation.newNewsCategoryValidation),
  newsController.addNewsCategory
)

/**
 * @function getAllCategoriesRoute
 * @async
 * @desc Handles the route for retrieving all news categories.
 * @controller newsController.getAllNewsCategory - Controller function for getting all news categories.
 */
router.get('/category', newsController.getAllNewsCategory)

/**
 * @function categoryByIdRoute
 * @desc Sub-router for routes related to a specific news category identified by its ID.
 */
router
  .route('/category/:id')
  /**
   * @function getCategoryByIdRoute
   * @async
   * @desc Handles the route for retrieving a specific news category by its ID.
   * @middleware validate(newsValidation.paramsValidation) - Validates the request parameters.
   * @controller newsController.getCategoryById - Controller function for getting a news category by ID.
   */
  .get(validate(newsValidation.paramsValidation), newsController.getCategoryById)
  /**
   * @function updateCategoryByIdRoute
   * @async
   * @desc Handles the route for updating a specific news category by its ID.
   * @middleware auth('manageUsers') - Requires authentication with 'manageUsers' permission.
   * @middleware validate(newsValidation.updateCategoryValidation) - Validates the request against a predefined schema.
   * @controller newsController.updateNewsCategoryById - Controller function for updating a news category by ID.
   */
  .patch(
    auth('manageUsers'),
    validate(newsValidation.updateNewsCategoryValidation),
    newsController.updateNewsCategoryById
  )
  /**
   * @function deleteCategoryByIdRoute
   * @async
   * @desc Handles the route for deleting a specific news category by its ID.
   * @middleware auth('manageUsers') - Requires authentication with 'manageUsers' permission.
   * @middleware validate(newsValidation.paramsValidation) - Validates the request parameters.
   * @controller newsController.deleteNewsCategoryById - Controller function for deleting a news category by ID.
   */
  .delete(
    auth('manageUsers'),
    validate(newsValidation.paramsValidation),
    newsController.deleteNewsCategoryById
  )

/**
 * @function getAllNewsRoute
 * @async
 * @desc Handles the route for retrieving all help questions.
 * @controller newsController.getAllQuestions - Controller function for getting all help questions.
 */
router.get('/', newsController.getAllNews)

/**
 * @function addNewsRoute
 * @async
 * @desc Handles the route for adding a new help question.
 * @middleware auth('manageUsers') - Requires authentication with 'manageUsers' permission.
 * @middleware validate(newsValidation.newQuestionValidation) - Validates the request against a predefined schema.
 * @controller newsController.addNews - Controller function for adding a new help question.
 */
router.post(
  '/add',
  auth('manageUsers'),
  validate(newsValidation.newNewsValidation),
  newsController.addNews
)

/**
 * @function newsByIdRoute
 * @desc Sub-router for routes related to a specific help question identified by its ID.
 */
router
  .route('/:id')
  /**
   * @function getNewsByIdRoute
   * @async
   * @desc Handles the route for retrieving a specific help question by its ID.
   * @middleware validate(newsValidation.paramsValidation) - Validates the request parameters.
   * @controller newsController.getNewsById - Controller function for getting a help question by ID.
   */
  .get(validate(newsValidation.paramsValidation), newsController.getNewsById)
  /**
   * @function updateNewsByIdRoute
   * @async
   * @desc Handles the route for updating a specific help question by its ID.
   * @middleware auth('manageUsers') - Requires authentication with 'manageUsers' permission.
   * @middleware validate(newsValidation.updateQuestionValidation) - Validates the request against a predefined schema.
   * @controller newsController.updateNewsById - Controller function for updating a help question by ID.
   */
  .patch(
    auth('manageUsers'),
    validate(newsValidation.updateNewsValidation),
    newsController.updateNewsById
  )
  /**
   * @function deleteNewsRoute
   * @async
   * @desc Handles the route for deleting a specific help question by its ID.
   * @middleware auth('manageUsers') - Requires authentication with 'manageUsers' permission.
   * @middleware validate(newsValidation.paramsValidation) - Validates the request parameters.
   * @controller newsController.deleteNews - Controller function for deleting a help question by ID.
   */
  .delete(auth('manageUsers'), validate(newsValidation.paramsValidation), newsController.deleteNews)

export default router
